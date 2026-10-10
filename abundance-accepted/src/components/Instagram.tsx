import { useEffect, useRef } from 'react'

const BEHOLD_FEED_ID = 'aQJy1OmmnnKRPr5sauiL'
const BEHOLD_SCRIPT_ID = 'behold-widget-script'

export default function Instagram() {
  const widgetContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const widgetContainer = widgetContainerRef.current
    if (!widgetContainer) return

    const widget = document.createElement('behold-widget')
    widget.setAttribute('feed-id', BEHOLD_FEED_ID)
    widgetContainer.appendChild(widget)

    let script = document.getElementById(BEHOLD_SCRIPT_ID) as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.id = BEHOLD_SCRIPT_ID
      script.type = 'module'
      script.src = 'https://w.behold.so/widget.js'
      script.async = true
      document.head.appendChild(script)
    }

    return () => widget.remove()
  }, [])

  return (
    <section id="instagram" aria-labelledby="instagram-heading" className="bg-ink-900 px-4 py-20 text-center sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow-light">Instagram</p>
        <h2 id="instagram-heading" className="mt-4 font-display text-3xl font-semibold leading-tight text-parchment sm:text-4xl">
          Latest from Instagram
        </h2>
        <p className="mt-3 text-parchment/75">
          Follow along{' '}
          <a
            href="https://www.instagram.com/abundance_accepted/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gold-light underline decoration-gold-light/50 underline-offset-4 hover:decoration-gold-light"
          >
            @abundance_accepted
          </a>
        </p>

        <div className="mx-auto mt-10 w-full max-w-6xl" ref={widgetContainerRef} />
      </div>
    </section>
  )
}