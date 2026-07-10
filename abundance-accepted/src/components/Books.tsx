type Book = {
  title: string
  subtitle: string
  description: string
  amazonUrl: string
  spineLabel: string
}

const BOOKS: Book[] = [
  {
    title: 'Wake Up and Workout',
    subtitle: 'How I Lost Nearly 100 lbs in a Year',
    description:
      "Deidra's personal account of losing weight and staying healthy — the routines and diet changes that made the difference, without gimmicks or surgery. No grueling workouts, just a realistic path and a few recipes to get you started.",
    amazonUrl: 'https://www.amazon.com/Wake-Up-Workout-Deidra-Ward/dp/B08XZGQ8Z2',
    spineLabel: 'Book One',
  },
  {
    title: 'Are You Up For The Challenge?',
    subtitle: 'A Guide to Losing 100 lbs in a Year',
    description:
      'The follow-up to Wake Up and Workout, written as a guide to help readers do what Deidra did. Step-by-step insight into what causes weight gain, how to lose it in a healthy way, and how to keep it off for good.',
    amazonUrl: 'https://www.amazon.com/dp/B0C3ZP3DYS',
    spineLabel: 'Book Two',
  },
]

function BookCover({ label, title }: { label: string; title: string }) {
  return (
    <div className="relative aspect-[2/3] w-full max-w-[220px] overflow-hidden rounded-md bg-gold-gradient shadow-[0_20px_40px_-16px_rgba(27,23,18,0.45)]">
      <div className="absolute inset-0 bg-ink-900/10" />
      <div className="absolute inset-4 flex flex-col justify-between border border-parchment/40 p-4">
        <span className="font-eyebrow text-[10px] uppercase tracking-[0.2em] text-ink-900/70">
          {label}
        </span>
        <span className="font-display text-xl font-semibold leading-tight text-ink-900">
          {title}
        </span>
        <span className="font-eyebrow text-[10px] uppercase tracking-[0.2em] text-ink-900/70">
          Deidra Ward
        </span>
      </div>
    </div>
  )
}

export default function Books() {
  return (
    <section id="books" className="bg-parchment">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="eyebrow">By Deidra Ward</p>
        <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold leading-tight text-ink-900 sm:text-4xl">
          The books that started Abundance Accepted
        </h2>

        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          {BOOKS.map((book) => (
            <article key={book.title} className="card flex flex-col gap-6 p-8 sm:flex-row">
              <BookCover label={book.spineLabel} title={book.title} />
              <div className="flex flex-col">
                <h3 className="font-display text-2xl font-semibold text-ink-900">{book.title}</h3>
                <p className="mt-1 text-sm font-medium text-gold-dark">{book.subtitle}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink-600">{book.description}</p>
                <a
                  href={book.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-6 w-fit"
                >
                  Buy on Amazon
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-xs leading-relaxed text-ink-400">
          As an Amazon Associate, Abundance Accepted LLC may earn from qualifying purchases made
          through these links, at no extra cost to you.
        </p>
      </div>
    </section>
  )
}
