export default function Membership() {
  const plans = [
    {
      name: 'Free',
      price: 'Free',
      period: 'forever',
      color: '#7DAF6E',
      highlight: false,
      features: [
        'Daily wellness tips',
        'Access to all articles',
        'Basic Wake Up & Win™ access through the PWA',
      ],
      cta: 'Join Free',
      action: () => {
        document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' })
      },
    },
  ]

  return (
    <section id="membership" className="bg-parchment py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="eyebrow">Membership</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl text-moss">
            Free Wake Up & Win™ PWA Access
          </h2>
          <p className="mt-4 text-moss/70 text-lg max-w-xl mx-auto">
            Get basic health and fitness guidance in the installable PWA. The full app and paid subscription will be announced after the app-store launch.
          </p>
        </div>

        <div className="grid gap-8">
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
                className="w-full rounded-full border-2 py-3 px-6 text-sm font-semibold transition-all hover:opacity-80"
                style={
                  { borderColor: plan.color, color: plan.color }
                }
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-moss/50 text-xs mt-12">
          Free PWA access includes general information only and does not constitute medical advice.
          © 2026 Abundance Accepted LLC. All Rights Reserved.
        </p>
      </div>
    </section>
  )
}