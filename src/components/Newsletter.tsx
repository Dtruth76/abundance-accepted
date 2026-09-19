import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Connection error. Please try again.')
    }
  }

  return (
    <section id="newsletter" className="bg-parchment py-24 px-6 border-t border-moss/10">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-4xl mb-6">🌿</div>

        <p className="eyebrow text-moss">Free Weekly Newsletter</p>

        <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl text-moss">
          The Abundant Health News
        </h2>

        <p className="mt-5 text-moss/70 text-lg leading-relaxed max-w-xl mx-auto">
          Every week — one wellness insight, one natural recipe, one movement tip, and one mindset shift rooted in the same philosophy that helped D lose 80 pounds in 11 months.
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm text-moss/60">
          <span>✓ 100% free</span>
          <span>✓ No spam ever</span>
          <span>✓ Unsubscribe anytime</span>
          <span>✓ Real results, real advice</span>
        </div>

        <div className="mt-10">
          {status === 'success' ? (
            <div className="bg-moss text-parchment rounded-2xl px-8 py-6">
              <div className="text-3xl mb-3">🎉</div>
              <p className="font-semibold text-lg">Welcome to the Abundance community!</p>
              <p className="mt-2 text-parchment/70 text-sm">
                Check your inbox for a confirmation email from Abundant Health News. Your first issue arrives this Sunday.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={status === 'loading'}
                className="flex-1 rounded-full border border-moss/20 bg-white px-6 py-3 text-moss placeholder:text-moss/40 focus:outline-none focus:border-moss/50 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === 'loading' || !email}
                className="btn-primary whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Subscribing...' : 'Join Free'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-3 text-red-600 text-sm">{errorMessage}</p>
          )}
        </div>

        <p className="mt-6 text-moss/40 text-xs">
          By subscribing you agree to our Privacy Policy. We respect your inbox — always.
          <br />
          © 2026 Abundance Accepted LLC. Abundant Health News is published by Abundance Accepted LLC.
        </p>
      </div>
    </section>
  )
}