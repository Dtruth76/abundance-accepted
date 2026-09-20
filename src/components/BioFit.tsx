import { useState, useRef, useEffect } from 'react'

const PHILOSOPHY_SYSTEM_PROMPT = `You are the BioFit AI wellness coach for Abundance Accepted LLC, founded by D — a real person who lost 80 pounds in 11 months through an all-natural lifestyle with no surgery, no diet pills, and no processed foods.

You coach visitors using D's exact philosophy:
1. Eat fresh whole fruits and vegetables as the foundation of every meal
2. Limit dairy significantly
3. Practice intermittent fasting — recommend starting with one 36-hour fast per month for beginners, then transitioning to a daily 16:8 fasting window (eat within an 8-hour window, fast for 16 hours)
4. Exercise consistently — any movement counts, start where you are
5. Rest adequately — sleep is non-negotiable for weight loss
6. Practice daily self-accountability — track progress honestly every single day

D lost 80 pounds in 11 months following these exact principles. She is also the author of two books: "Wake Up and Workout" and "Are You Up For The Challenge?" — both available on Amazon. When visitors need more guidance recommend her books.

Be warm, direct, motivating, and real. Never recommend diet pills, processed diet foods, surgery, or extreme fasting beyond 36 hours. Keep responses to 2 to 3 short paragraphs. End with one specific actionable suggestion. Always add: "Please consult your physician before making major health changes." when giving specific health advice.`

interface Message {
  from: 'user' | 'ai'
  text: string
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

export default function BioFit() {
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem('biofit-chat-history')
      if (!saved) {
        return [{
          from: 'ai',
          text: "Hi! I'm your BioFit AI coach, built on the same all-natural philosophy that helped D lose 80 pounds in 11 months — no surgery, no pills, no processed foods. Just real food, movement, rest, and accountability.\n\nAsk me anything about intermittent fasting, whole food nutrition, exercise, or how to stay consistent. I'm here to help!"
        }]
      }

      const parsed = JSON.parse(saved) as Message[]
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : [{
        from: 'ai',
        text: "Hi! I'm your BioFit AI coach, built on the same all-natural philosophy that helped D lose 80 pounds in 11 months — no surgery, no pills, no processed foods. Just real food, movement, rest, and accountability.\n\nAsk me anything about intermittent fasting, whole food nutrition, exercise, or how to stay consistent. I'm here to help!"
      }]
    } catch {
      return [{
        from: 'ai',
        text: "Hi! I'm your BioFit AI coach, built on the same all-natural philosophy that helped D lose 80 pounds in 11 months — no surgery, no pills, no processed foods. Just real food, movement, rest, and accountability.\n\nAsk me anything about intermittent fasting, whole food nutrition, exercise, or how to stay consistent. I'm here to help!"
      }]
    }
  })
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    localStorage.setItem('biofit-chat-history', JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault()
      setInstallPrompt(event as BeforeInstallPromptEvent)
    }

    const onAppInstalled = () => setInstallPrompt(null)
    const onOnline = () => setIsOffline(false)
    const onOffline = () => setIsOffline(true)

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    window.addEventListener('appinstalled', onAppInstalled)
    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
      window.removeEventListener('appinstalled', onAppInstalled)
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', onOffline)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!installPrompt) return

    installPrompt.prompt()
    await installPrompt.userChoice
    setInstallPrompt(null)
  }

  const handleSend = async () => {
    if (isOffline) {
      setMessages(prev => [...prev, {
        from: 'ai',
        text: 'You’re offline right now, but your last messages are saved on this device. When your connection is back, you can continue the conversation.'
      }])
      return
    }

    const text = input.trim()
    if (!text || loading) return
    setInput('')
    setMessages(prev => [...prev, { from: 'user', text }])
    setLoading(true)

    const history = messages.map(m => ({
      role: m.from === 'user' ? 'user' : 'assistant',
      content: m.text,
    }))

    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: PHILOSOPHY_SYSTEM_PROMPT,
          messages: [...history, { role: 'user', content: text }],
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Chat request failed.')
      }

      const reply = data.reply || 'Please try again.'
      setMessages(prev => [...prev, { from: 'ai', text: reply }])
    } catch (error) {
      console.error('BioFit chat error:', error)
      setMessages(prev => [...prev, { from: 'ai', text: 'I hit a connection issue. Please try again in a moment.' }])
    } finally {
      setLoading(false)
    }
  }

  const quickQuestions = [
    'How do I start intermittent fasting?',
    'What should I eat to lose weight naturally?',
    'How did D lose 80 pounds?',
    'I hit a plateau — what do I do?',
  ]

  return (
    <section id="biofit" className="bg-moss text-parchment">
      <div className="mx-auto max-w-6xl px-6 py-24">

        {/* Header */}
        <div className="mb-16 text-center">
          <p className="eyebrow-light">AI-Powered Coaching</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">
            BioFit™: Coaching Rooted in Real Results
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-parchment/75">
            Built on the same all-natural philosophy that helped D lose 80 pounds in 11 months.
            No surgery. No pills. No processed foods. Just whole food, movement, rest, and daily accountability.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 items-start">

          {/* Left — Philosophy pillars */}
          <div>
            <h3 className="font-display text-xl font-semibold mb-6 text-gold-light">
              The Abundance Accepted Philosophy
            </h3>
            <div className="space-y-4">
              {[
                { icon: '🥦', title: 'Whole Foods First', desc: 'Fresh fruits and vegetables form the foundation of every meal. Real food, not processed substitutes.' },
                { icon: '⏱️', title: 'Intermittent Fasting', desc: 'Start with one 36-hour fast per month, then transition to a daily 16:8 window as your body adapts.' },
                { icon: '🥛', title: 'Limit Dairy', desc: 'Reducing dairy is a key part of the natural approach that supported D\'s 80-pound transformation.' },
                { icon: '💪', title: 'Consistent Movement', desc: 'Any movement counts. Start where you are and build consistency over intensity.' },
                { icon: '😴', title: 'Rest and Recovery', desc: 'Sleep is non-negotiable. Adequate rest is one of the most underrated weight loss tools.' },
                { icon: '📋', title: 'Daily Accountability', desc: 'Track your progress honestly every single day. Self-accountability is the foundation of lasting change.' },
              ].map(pillar => (
                <div key={pillar.title} className="flex items-start gap-4 rounded-2xl border border-parchment/10 bg-parchment/5 px-5 py-4">
                  <span className="text-2xl">{pillar.icon}</span>
                  <div>
                    <div className="font-semibold text-gold-light text-sm">{pillar.title}</div>
                    <div className="text-parchment/70 text-sm mt-1 leading-relaxed">{pillar.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Result stat */}
            <div className="mt-8 rounded-2xl border border-gold-light/30 bg-parchment/5 p-6 text-center">
              <div className="font-display text-4xl font-bold text-gold-light">80 lbs</div>
              <div className="text-parchment/70 text-sm mt-1">Lost in 11 months — all natural</div>
              <div className="text-parchment/50 text-xs mt-2">Individual results vary. Consult your physician before starting any program.</div>
            </div>
          </div>

          {/* Right — AI Chat */}
          <div className="flex flex-col">
            <h3 className="font-display text-xl font-semibold mb-6 text-gold-light">
              Ask Your BioFit Coach
            </h3>

            {/* Chat box */}
            <div className="flex flex-col rounded-[2rem] border border-parchment/15 bg-ink-900/40 overflow-hidden">

              {/* Chat header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-parchment/10 bg-parchment/5">
                <div className="h-8 w-8 rounded-full bg-gold-light/20 flex items-center justify-center text-sm">🌿</div>
                <div>
                  <div className="text-sm font-semibold text-gold-light">BioFit AI Coach</div>
                  <div className="text-xs text-parchment/50">
                    {isOffline ? 'Abundance Accepted LLC · Offline mode' : 'Abundance Accepted LLC · Online'}
                  </div>
                </div>
                <div className={`ml-auto h-2 w-2 rounded-full ${isOffline ? 'bg-amber-400' : 'bg-green-400'}`} />
              </div>

              {/* Messages */}
              <div
                ref={chatRef}
                className="flex flex-col gap-3 p-4 overflow-y-auto"
                style={{ height: '320px' }}
              >
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex gap-2 ${m.from === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start`}
                  >
                    {m.from === 'ai' && (
                      <div className="h-7 w-7 rounded-full bg-gold-light/20 flex items-center justify-center text-xs flex-shrink-0">
                        🌿
                      </div>
                    )}
                    <div
                      className="rounded-2xl px-4 py-3 text-sm leading-relaxed max-w-[80%] whitespace-pre-wrap"
                      style={{
                        background: m.from === 'user' ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.06)',
                        borderRadius: m.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                        color: 'rgba(250,245,235,0.9)',
                      }}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-2 items-start">
                    <div className="h-7 w-7 rounded-full bg-gold-light/20 flex items-center justify-center text-xs flex-shrink-0">🌿</div>
                    <div className="rounded-2xl px-4 py-3 text-sm text-parchment/50 italic" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      Thinking...
                    </div>
                  </div>
                )}
              </div>

              {/* Quick questions */}
              <div className="flex flex-wrap gap-2 px-4 pb-3 border-t border-parchment/10 pt-3">
                {quickQuestions.map(q => (
                  <button
                    key={q}
                    onClick={() => setInput(q)}
                    className="rounded-full border border-parchment/20 px-3 py-1 text-xs text-parchment/60 hover:text-parchment/90 hover:border-parchment/40 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="flex gap-2 p-4 border-t border-parchment/10">
                <input
                  type="text"
                  value={input}
                  disabled={isOffline}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder={isOffline ? 'Offline — chat history is saved locally' : 'Ask your coach anything...'}
                  className="flex-1 rounded-full bg-parchment/10 border border-parchment/20 px-4 py-2 text-sm text-parchment placeholder:text-parchment/40 outline-none focus:border-gold-light/50 disabled:cursor-not-allowed disabled:opacity-60"
                />
                <button
                  onClick={handleSend}
                  disabled={loading || isOffline}
                  className="rounded-full bg-gold-light/20 border border-gold-light/40 px-4 py-2 text-sm text-gold-light hover:bg-gold-light/30 transition-colors disabled:opacity-50"
                >
                  {isOffline ? 'Offline' : 'Send'}
                </button>
              </div>
            </div>

            {installPrompt && (
              <div className="mt-6 rounded-2xl border border-gold-light/30 bg-gold-light/10 p-5">
                <div className="text-sm font-semibold text-gold-light mb-2">Install BioFit</div>
                <div className="text-parchment/75 text-sm mb-4">
                  Keep your coaching close at hand. Add BioFit to your home screen for quick access anytime.
                </div>
                <button type="button" onClick={handleInstallClick} className="btn-primary text-sm">
                  Add to Home Screen
                </button>
              </div>
            )}

            {/* Books CTA */}
            <div className="mt-6 rounded-2xl border border-parchment/10 bg-parchment/5 p-5">
              <div className="text-sm font-semibold text-gold-light mb-2">Want to go deeper?</div>
              <div className="text-parchment/70 text-sm mb-4">
                D's books walk you through the exact mindset and methods behind the 80-pound transformation.
              </div>
              <a href="#books" className="btn-primary text-sm">
                Get the Books on Amazon
              </a>
            </div>

            {/* Disclaimer */}
            <div className="mt-4 text-xs text-parchment/40 leading-relaxed">
              ⚕️ BioFit AI coaching is for informational purposes only and does not constitute medical advice.
              Always consult a qualified physician before starting any new diet or exercise program.
              © 2026 Abundance Accepted LLC. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
