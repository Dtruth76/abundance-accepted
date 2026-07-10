import { FormEvent, useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email) return
    // TODO: wire this up to your email provider (ConvertKit, Mailchimp, Beehiiv, etc.)
    // or a serverless function before going live — this just confirms in the UI for now.
    setSubmitted(true)
  }

  return (
    <section id="newsletter" className="bg-ink-900 text-parchment">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="eyebrow-light">Stay in the loop</p>
        <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">
          Get early access to BioFit™ and new drops from Deidra
        </h2>
        <p className="mt-4 text-[17px] leading-relaxed text-parchment/70">
          One email, roughly twice a month. No fads, no spam — just what's working.
        </p>

        {submitted ? (
          <p className="mt-8 font-eyebrow text-sm uppercase tracking-[0.1em] text-gold-light">
            You're on the list — welcome in.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 rounded-full border border-parchment/20 bg-parchment/5 px-5 py-3 text-sm text-parchment placeholder:text-parchment/40 focus:border-gold-light focus:outline-none"
            />
            <button type="submit" className="btn-primary">
              Join the List
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
