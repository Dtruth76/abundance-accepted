export default function Footer() {
  return (
    <footer className="bg-parchment-200 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Abundance Accepted" className="h-10 w-10 object-contain" />
            <div>
              <p className="font-display text-lg font-semibold text-ink-900">Abundance Accepted</p>
              <p className="text-sm text-ink-400">Abundance Accepted LLC</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm text-ink-600 sm:grid-cols-3">
            <a href="#approach" className="hover:text-gold-dark">Our Approach</a>
            <a href="#books" className="hover:text-gold-dark">Books</a>
            <a href="#biofit" className="hover:text-gold-dark">BioFit™</a>
            <a href="#membership" className="hover:text-gold-dark">Membership</a>
            <a href="#shop" className="hover:text-gold-dark">Shop</a>
            <a href="#newsletter" className="hover:text-gold-dark">Newsletter</a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-ink-900/8 pt-8 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Abundance Accepted LLC. All rights reserved.</p>
          <p className="max-w-xl">
            Content on this site is for general educational purposes and reflects personal
            experience and publicly available research. It is not a substitute for professional
            medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>
    </footer>
  )
}
