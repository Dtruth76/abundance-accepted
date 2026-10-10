export default function Membership() {
  const benefits = [
    'Daily wellness tips',
    'Access to all articles',
    'Basic Wake Up & Win™ access through the PWA',
  ]

  return (
    <section id="membership" className="bg-parchment">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="eyebrow">Membership</p>
        <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold leading-tight text-ink-900 sm:text-4xl">
          Free Wake Up & Win™ PWA Access
        </h2>
        <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-ink-600">
          Get basic health and fitness guidance in the installable PWA. The full app and paid subscription will be announced after its app-store launch.
        </p>

        <div className="mt-10 max-w-xl">
          <div className="card flex flex-col p-8">
            <span className="eyebrow">Start here</span>
            <h3 className="mt-3 font-display text-2xl font-semibold text-ink-900">Free</h3>
            <ul className="mt-6 flex-1 space-y-3 text-sm text-ink-600">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-dark" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <a href="#newsletter" className="btn-ghost mt-8 w-fit">
              Join Free
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
