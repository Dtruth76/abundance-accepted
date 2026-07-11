export default function About() {
  return (
    <section id="about" className="bg-parchment-200">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <p className="eyebrow">The founder</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink-900 sm:text-4xl">
              Deidra Ward
            </h2>
            <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-ink-600">
              <p>
                Deidra founded Abundance Accepted LLC after losing nearly 100 pounds in a year
                through daily movement and changed eating habits — no fad diets, no surgery. She
                wrote it all down so other people wouldn't have to figure it out alone.
              </p>
              <p>
                That story became her first book, <em>Wake Up and Workout</em>, followed by{' '}
                <em>Are You Up For The Challenge?</em>, a step-by-step guide to help readers build
                the same habits. Today she's building BioFit™, an AI-powered companion for the
                next chapter of that work.
              </p>
            </div>
            <a href="#books" className="btn-ghost mt-8">
              Explore the books
            </a>
          </div>

          <div className="order-1 flex items-center justify-center md:order-2">
            <div className="card flex aspect-square w-full max-w-sm items-center justify-center p-10">
              <img src="/logo.png" alt="Abundance Accepted mark" className="w-full max-w-[220px] object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
