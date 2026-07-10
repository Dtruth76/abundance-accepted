const TIERS = [
  {
    name: 'Community',
    price: 'Free',
    tagline: 'Start here',
    features: ['Weekly newsletter', 'Blog & recipe library', 'Public community threads'],
    featured: false,
  },
  {
    name: 'Abundance+',
    price: '$14/mo',
    tagline: 'For the daily habit-builder',
    features: [
      'Everything in Community',
      'Full BioFit™ app access',
      'Monthly live Q&A with Deidra',
      'Printable habit trackers',
    ],
    featured: true,
  },
  {
    name: 'VIP Circle',
    price: '$39/mo',
    tagline: 'For hands-on support',
    features: [
      'Everything in Abundance+',
      '1:1 monthly check-in',
      'Early access to new books & drops',
      'Private member community',
    ],
    featured: false,
  },
]

export default function Membership() {
  return (
    <section id="membership" className="bg-parchment">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="eyebrow">Membership</p>
        <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold leading-tight text-ink-900 sm:text-4xl">
          Pick your level of support
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
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
                {tier.price}
              </p>
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
                {tier.price === 'Free' ? 'Join Free' : 'Get Started'}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
