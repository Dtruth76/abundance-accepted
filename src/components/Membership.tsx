import { useState } from 'react'

const TIERS = [
  {
    name: 'Community',
    price: 'Free',
    tagline: 'Start here',
    monthlyPrice: 'Free',
    annualPrice: 'Free',
    features: ['Weekly workout of the week', 'Newsletter with tips & recipes', 'Blog & recipe library'],
    featured: false,
  },
  {
    name: 'Abundance+',
    tagline: 'For the daily habit-builder',
    monthlyPrice: '$9.99/mo',
    annualPrice: '$89.99/yr',
    annualNote: 'Save ~25%',
    features: [
      'Everything in Community',
      'Full workout plan library',
      'Meal plan templates & recipes',
      'Monthly new content drops',
    ],
    featured: true,
  },
  {
    name: 'VIP Circle',
    tagline: 'For hands-on support',
    monthlyPrice: '$24.99/mo',
    annualPrice: '$249.99/yr',
    annualNote: 'Save ~17%',
    features: [
      'Everything in Abundance+',
      'Personalized plan adjustments',
      'Early access to BioFit™ app features',
      'Priority email access to Deidra',
    ],
    featured: false,
  },
]

export default function Membership() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')

  return (
    <section id="membership" className="bg-parchment">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="eyebrow">Membership</p>
        <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold leading-tight text-ink-900 sm:text-4xl">
          Pick your level of support
        </h2>

        <div className="mt-8 inline-flex items-center rounded-full border border-ink-900/10 bg-white p-1">
          <button
            onClick={() => setBilling('monthly')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              billing === 'monthly' ? 'bg-ink-900 text-parchment' : 'text-ink-600'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling('annual')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              billing === 'annual' ? 'bg-ink-900 text-parchment' : 'text-ink-600'
            }`}
          >
            Annual
          </button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col rounded-3xl p-8 ${
                tier.featured
                  ? 'bg-ink-900 text-parchment shadow-[0_24px_48px_-16px_rgba(27,23,18,0.35)]'
                  : 'card text-ink-900'
              }`}
            >
              <span className={`eyebrow ${tier.featured ? 'eyebrow-light' : ''}`}>{tier.tagline}</span>
              <h3 className="mt-3 font-display text-2xl font-semibold">{tier.name}</h3>
              <p className={`mt-1 text-2xl font-semibold ${tier.featured ? 'text-gold-light' : 'text-gold-dark'}`}>
                {billing === 'monthly' ? tier.monthlyPrice : tier.annualPrice}
              </p>
              {tier.annualNote && billing === 'annual' && (
                <p className={`text-xs ${tier.featured ? 'text-parchment/60' : 'text-ink-400'}`}>
                  {tier.annualNote}
                </p>
              )}
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span
                      className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                        tier.featured ? 'bg-gold-light' : 'bg-gold-dark'
                      }`}
                    />
                    <span className={tier.featured ? 'text-parchment/80' : 'text-ink-600'}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#newsletter"
                className={`mt-8 ${tier.featured ? 'btn-primary' : 'btn-ghost'}`}
              >
                {tier.monthlyPrice === 'Free' ? 'Join Free' : 'Get Started'}
              </a>
            </div>
          ))}
        </div>
        
        <p className="mt-6 text-xs text-ink-400">
          Payment processing coming soon — "Get Started" currently links to the newsletter signup.
        </p>
      </div>
    </section>
  )
}