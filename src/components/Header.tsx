import { useEffect, useState } from 'react'

const LINKS = [
  { href: '#approach', label: 'Our Approach' },
  { href: '#books', label: 'Books' },
  { href: '#biofit', label: 'BioFit™' },
  { href: '#membership', label: 'Membership' },
  { href: '#shop', label: 'Shop' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-parchment-100/90 backdrop-blur border-b border-ink-900/8' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3">
          <img src="/logo.png" alt="Abundance Accepted" className="h-11 w-11 object-contain" />
          <span className="font-display text-lg font-semibold tracking-tight text-ink-900">
            Abundance Accepted
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-eyebrow text-[12px] tracking-[0.12em] uppercase text-ink-600 transition-colors hover:text-gold-dark"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#newsletter" className="btn-primary hidden md:inline-flex">
          Join the List
        </a>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/15 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            <span className="h-[1.5px] w-4 bg-ink-900" />
            <span className="h-[1.5px] w-4 bg-ink-900" />
          </div>
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-900/8 bg-parchment-100 px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-eyebrow text-[12px] tracking-[0.12em] uppercase text-ink-600"
              >
                {l.label}
              </a>
            ))}
            <a href="#newsletter" onClick={() => setOpen(false)} className="btn-primary mt-2">
              Join the List
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
