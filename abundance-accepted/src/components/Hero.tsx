export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink-900 text-parchment">
      {/* Faint watermark echo of the mark's infinity loop — the page's one ambient flourish */}
      <svg
        className="pointer-events-none absolute -right-24 -top-24 opacity-[0.08] sm:-right-10"
        width="520"
        height="520"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M40 100c0-22 18-40 40-40s40 18 40 40-18 40-40 40c-12 0-22-6-28-14m28 14c22 0 40-18 40-40s18-40 40-40 40 18 40 40-18 40-40 40c-12 0-22-6-28-14"
          stroke="url(#heroLoop)"
          strokeWidth="6"
        />
        <defs>
          <linearGradient id="heroLoop" x1="0" y1="0" x2="200" y2="0">
            <stop offset="0%" stopColor="#F2C94C" />
            <stop offset="100%" stopColor="#8A5E1B" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-16 sm:pb-32 sm:pt-24">
        <p className="eyebrow-light">Natural weight loss, built to last</p>

        <h1 className="mt-5 max-w-3xl font-display text-[2.6rem] font-semibold leading-[1.08] tracking-tight sm:text-6xl">
          Your body already knows how to heal.
          <span className="block text-transparent bg-clip-text bg-gold-gradient">
            We help you listen to it.
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-parchment/75">
          Abundance Accepted was built on one woman's real journey of losing nearly 100 pounds
          without gimmicks, fads, or surgery — and it's grown into a home for anyone who wants to
          build a healthier body through food, movement, sleep, and consistency, not shortcuts.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a href="#books" className="btn-primary">
            Read Deidra's Story
          </a>
          <a href="#approach" className="btn-ghost-light">
            See the Approach
          </a>
        </div>

        <p className="mt-10 max-w-xl text-xs leading-relaxed text-parchment/50">
          General wellness information shared here is based on personal experience and publicly
          available research — it isn't medical advice. Always loop in your own doctor before
          changing your diet, exercise, or treatment plan.
        </p>
      </div>
    </section>
  )
}
