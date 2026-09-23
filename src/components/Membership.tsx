import { useState } from 'react'

const PLUS_PRICE_ID = 'price_1UIjNkCveE8X0WZ1hmhwAB86'
const ELITE_PRICE_ID = 'price_1TvpEfCveE8X0WZ1thApv17k'
const STRIPE_SESSION_KEY = 'abundanceAcceptedStripeSessionId'

export default function Membership() {
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = async (priceId: string, planName: string) => {
    setLoading(planName)
    setError(null)
    try {
      const response = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError('Unable to start checkout. Please try again.')
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  const handleManageSubscription = async () => {
    const sessionId = window.localStorage.getItem(STRIPE_SESSION_KEY)

    if (!sessionId) {
      setError('No active Stripe checkout session was found. Please complete a purchase first, then use the confirmation page to manage your subscription.')
      return
    }

    setLoading('Manage subscription')
    setError(null)

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
      setLoading(null)
    }
  }

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      color: '#7DAF6E',
      highlight: false,
      features: [
        'Daily wellness tips',
        'Access to free articles',
        'BioFit basic coaching',
        'Community access',
      ],
      cta: 'Join Free',
      action: () => {
        document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' })
      },
    },
    {
      name: 'Abundance Plus',
      price: '$14.99',
      period: 'per month',
      color: '#C9A84C',
      highlight: true,
      features: [
        'Everything in Free',
        'Full BioFit AI coaching',
        'Premium article library',
        'Weekly meal prep guides',
        'Ad-free experience',
        'Priority support',
      ],
      cta: loading === 'Abundance Plus' ? 'Loading...' : 'Start 7-Day Free Trial',
      action: () => handleCheckout(PLUS_PRICE_ID, 'Abundance Plus'),
    },
    {
      name: 'Elite',
      price: '$39.99',
      period: 'per month',
      color: '#E8C46A',
      highlight: false,
      features: [
        'Everything in Abundance Plus',
        '1-on-1 AI health coaching',
        'Custom supplement guidance',
        'Monthly group calls',
        'Early access to new content',
      ],
      cta: loading === 'Elite' ? 'Loading...' : 'Join Elite',
      action: () => handleCheckout(ELITE_PRICE_ID, 'Elite'),
    },
  ]

  return (
    <section id="membership" className="bg-parchment py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="eyebrow">Membership</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl text-moss">
            Choose Your Abundance Level
          </h2>
          <p className="mt-4 text-moss/70 text-lg max-w-xl mx-auto">
            From free access to elite coaching — there is a plan for every stage of your wellness journey.
            Abundance Plus includes a 7-day free trial before the first monthly charge begins.
          </p>
        </div>

        {error && (
          <div className="mb-8 text-center text-red-600 bg-red-50 border border-red-200 rounded-xl px-6 py-4 max-w-md mx-auto">
            {error}
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 flex flex-col ${
                plan.highlight
                  ? 'bg-moss text-parchment shadow-2xl scale-105'
                  : 'bg-white text-moss border border-moss/10'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-light text-moss text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-6">
                <h3
                  className="font-display text-xl font-semibold mb-2"
                  style={{ color: plan.highlight ? '#C9A84C' : '#0A2E1A' }}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span
                    className="font-display text-4xl font-bold"
                    style={{ color: plan.color }}
                  >
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.highlight ? 'text-parchment/60' : 'text-moss/50'}`}>
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span style={{ color: plan.color }} className="mt-0.5 font-bold flex-shrink-0">
                      ✓
                    </span>
                    <span className={`text-sm ${plan.highlight ? 'text-parchment/80' : 'text-moss/70'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={plan.action}
                disabled={loading === plan.name}
                className={`w-full rounded-full py-3 px-6 text-sm font-semibold transition-all ${
                  plan.highlight
                    ? 'bg-gold-light text-moss hover:opacity-90'
                    : 'border-2 hover:opacity-80'
                } ${loading === plan.name ? 'opacity-60 cursor-not-allowed' : ''}`}
                style={
                  !plan.highlight
                    ? { borderColor: plan.color, color: plan.color }
                    : {}
                }
              >
                {plan.cta}
              </button>

              {plan.name !== 'Free' && (
                <button
                  type="button"
                  onClick={handleManageSubscription}
                  className="mt-3 w-full rounded-full border border-parchment/20 bg-transparent px-4 py-2 text-xs font-medium text-moss/70 transition hover:text-moss"
                >
                  Manage subscription
                </button>
              )}

              {plan.name !== 'Free' && (
                <p className={`text-xs text-center mt-3 ${plan.highlight ? 'text-parchment/50' : 'text-moss/40'}`}>
                  {plan.name === 'Abundance Plus' ? '7-day free trial. Cancel anytime before billing begins.' : 'Cancel anytime. No hidden fees.'}
                </p>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-moss/50 text-xs mt-12">
          Payments processed securely by Stripe. By subscribing you agree to our Terms of Service.
          <br />
          ⚕️ Membership content is for informational purposes only and does not constitute medical advice.
          © 2026 Abundance Accepted LLC. All Rights Reserved.
        </p>
      </div>
    </section>
  )
}