import { useState, useRef, useEffect } from 'react'
import { functionUrl } from '../lib/functionUrl'

interface Message {
  from: 'user' | 'ai'
  text: string
}

const DEFAULT_GREETING: Message = {
  from: 'ai',
  text: "Hi! I'm the Wake Up & Win™ free PWA coach. I can help with basic, general health and fitness questions. The full app is not available in app stores yet; check back for its launch. For personal medical guidance, please consult a qualified health professional.",
}

function loadMessages(): Message[] {
  try {
    const saved = localStorage.getItem('biofit-chat-history')
    if (!saved) return [DEFAULT_GREETING]

    const parsed: unknown = JSON.parse(saved)
    if (!Array.isArray(parsed)) return [DEFAULT_GREETING]

    const messages = parsed.filter((message): message is Message =>
      typeof message === 'object' &&
      message !== null &&
      ((message as Message).from === 'user' || (message as Message).from === 'ai') &&
      typeof (message as Message).text === 'string'
    )

    const migrated = messages.map((message) =>
      message.from === 'ai'
        ? { ...message, text: message.text.replace(/BioFit™?/gi, 'Wake Up & Win™') }
        : message
    )

    return migrated.length > 0 ? migrated : [DEFAULT_GREETING]
  } catch {
    return [DEFAULT_GREETING]
  }
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

export default function BioFit() {
  const [messages, setMessages] = useState<Message[]>(loadMessages)
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
      const response = await fetch(functionUrl('chat'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
      console.error('Wake Up & Win™ chat error:', error)
      setMessages(prev => [...prev, { from: 'ai', text: 'I hit a connection issue. Please try again in a moment.' }])
    } finally {
      setLoading(false)
    }
  }

  const quickQuestions = [
    'What are some beginner-friendly ways to move more?',
    'What does a balanced meal generally include?',
    'How can I build a consistent sleep routine?',
    'How can I make exercise a habit?',
  ]

  return (
    <section id="biofit" className="bg-moss text-parchment">
      <div className="mx-auto max-w-6xl px-6 py-24">

        {/* Header */}
        <div className="mb-16 text-center">
          <p className="eyebrow-light">Free PWA Support</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">
            Basic Health & Fitness Guidance
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-parchment/75">
            Ask general questions about everyday nutrition, movement, sleep, and healthy habits.
            For personalized coaching, look for the full Wake Up & Win™ app when it launches in app stores.
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
                { icon: '🥦', title: 'Everyday Nutrition', desc: 'Learn general ways to include a variety of nourishing foods in everyday meals.' },
                { icon: '💪', title: 'Gentle Movement', desc: 'Explore beginner-friendly ways to add movement that fit your abilities and routine.' },
                { icon: '😴', title: 'Rest and Recovery', desc: 'Understand how consistent sleep and rest can support general wellbeing.' },
                { icon: '📋', title: 'Healthy Habits', desc: 'Find simple, realistic ways to build consistency without all-or-nothing rules.' },
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
              Ask the Wake Up & Win™ PWA Coach
            </h3>

            {/* Chat box */}
            <div className="flex flex-col rounded-[2rem] border border-parchment/15 bg-ink-900/40 overflow-hidden">

              {/* Chat header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-parchment/10 bg-parchment/5">
                <div className="h-8 w-8 rounded-full bg-gold-light/20 flex items-center justify-center text-sm">🌿</div>
                <div>
                  <div className="text-sm font-semibold text-gold-light">Wake Up & Win™ PWA Coach</div>
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
                <div className="text-sm font-semibold text-gold-light mb-2">Install the free PWA</div>
                <div className="text-parchment/75 text-sm mb-4">
                  Add basic Wake Up & Win™ PWA access to your home screen. The full app will be announced when it is available in app stores.
                </div>
                <button type="button" onClick={handleInstallClick} className="btn-primary text-sm">
                  Add to Home Screen
                </button>
              </div>
            )}

            {/* Full app launch status */}
            <div className="mt-6 rounded-2xl border border-parchment/10 bg-parchment/5 p-5">
              <div className="text-sm font-semibold text-gold-light mb-2">Full app coming soon</div>
              <div className="text-parchment/70 text-sm mb-4">
                Wake Up & Win™ is not available in Google Play or the App Store yet. Download details and subscription options will be shared after launch.
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-4 text-xs text-parchment/40 leading-relaxed">
              ⚕️ Wake Up & Win™ AI coaching is for informational purposes only and does not constitute medical advice.
              Always consult a qualified physician before starting any new diet or exercise program.
              © 2026 Abundance Accepted LLC. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
