export default function BioFit() {
  return (
    <section id="biofit" className="bg-moss text-parchment">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2">
        <div>
          <p className="eyebrow-light">Coming soon</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">
            BioFit™: your habits, tracked without the guesswork
          </h2>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-parchment/75">
            BioFit™ is the AI-powered companion we're building to bring the Abundance Accepted
            approach into your day-to-day — food, movement, sleep, and mindset in one place,
            guided by the same natural-first philosophy behind Deidra's books.
          </p>
          <a href="#newsletter" className="btn-primary mt-8">
            Get Early Access
          </a>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-xs rounded-[2.5rem] border border-parchment/15 bg-ink-900/40 p-6">
            <div className="rounded-3xl bg-parchment/5 p-5">
              <p className="eyebrow-light">Today</p>
              <div className="mt-4 space-y-3">
                {['Morning walk logged', 'Meals on track', 'Wind-down reminder at 9:30pm'].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl bg-parchment/5 px-4 py-3">
                    <span className="h-2 w-2 rounded-full bg-gold-light" />
                    <span className="text-sm text-parchment/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
