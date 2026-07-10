import { useEffect, useRef } from 'react'

/**
 * A scroll-drawn infinity loop echoing the woven "A" in the Abundance
 * Accepted mark. Used sparingly as the page's single signature moment
 * rather than a decorative motif repeated everywhere.
 */
export default function LoopDivider({ tone = 'gold' }: { tone?: 'gold' | 'ink' }) {
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const el = pathRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view')
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const stroke = tone === 'gold' ? 'url(#loopGoldStroke)' : '#1B1712'

  return (
    <div className="flex justify-center py-10 sm:py-14" aria-hidden="true">
      <svg width="180" height="64" viewBox="0 0 180 64" fill="none">
        <defs>
          <linearGradient id="loopGoldStroke" x1="0" y1="0" x2="180" y2="0">
            <stop offset="0%" stopColor="#F2C94C" />
            <stop offset="50%" stopColor="#C99A2E" />
            <stop offset="100%" stopColor="#8A5E1B" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          className="loop-path"
          d="M20 32c0-11 9-20 20-20s20 9 20 20-9 20-20 20c-6 0-11-3-14-7m14 7c11 0 20-9 20-20s9-20 20-20 20 9 20 20-9 20-20 20c-6 0-11-3-14-7"
          stroke={stroke}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
