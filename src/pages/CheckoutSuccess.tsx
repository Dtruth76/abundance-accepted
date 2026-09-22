import { useEffect, useState } from 'react'

export default function CheckoutSuccess() {
  const [sessionId, setSessionId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setSessionId(params.get('session_id') || '')
  }, [])

  const handleManageSubscription = async () => {
    if (!sessionId) {
      setError('This session does not include a Stripe checkout id yet.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/.netlify/functions/create-portal-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Unable to open the billing portal.')
      }

      if (data.url) {
        window.location.href = data.url
        return
      }

      throw new Error('No billing portal URL returned.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to open the billing portal.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center bg-stone-50 px-6 text-center">
      <h1 className="font-serif text-3xl text-stone-900">
        You're in! 🎉
      </h1>
      <p className="mt-3 max-w-md text-stone-600">
        Thanks for joining Abundance Accepted. A confirmation email is on its way — check your inbox to get started.
      </p>

      {error && (
        <p className="mt-4 max-w-md text-sm text-red-600">{error}</p>
      )}

      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
        <a
          href="/"
          className="rounded-full bg-stone-900 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-700"
        >
          Back to home
        </a>
        <button
          type="button"
          disabled={loading || !sessionId}
          onClick={handleManageSubscription}
          className="rounded-full border border-stone-300 bg-white px-6 py-2 text-sm font-medium text-stone-700 transition-colors hover:border-stone-400 hover:text-stone-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Opening Stripe Billing...' : 'Manage subscription'}
        </button>
      </div>
    </section>
  )
}
