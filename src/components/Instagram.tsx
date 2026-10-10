import { useEffect } from 'react'

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void
      }
    }
  }
}

const INSTAGRAM_POST_URL = 'https://www.instagram.com/p/DePbPRfDXGx/'
const INSTAGRAM_SCRIPT_ID = 'instagram-embed-script'

export default function Instagram() {
  useEffect(() => {
    const processEmbeds = () => window.instgrm?.Embeds.process()

    if (window.instgrm) {
      processEmbeds()
      return
    }

    let script = document.getElementById(INSTAGRAM_SCRIPT_ID) as HTMLScriptElement | null

    if (!script) {
      script = document.createElement('script')
      script.id = INSTAGRAM_SCRIPT_ID
      script.src = 'https://www.instagram.com/embed.js'
      script.async = true
      document.body.appendChild(script)
    }

    script.addEventListener('load', processEmbeds)
    return () => script?.removeEventListener('load', processEmbeds)
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

        <div className="mt-10 flex justify-center overflow-x-auto">
          <blockquote
            className="instagram-media"
            data-instgrm-captioned=""
            data-instgrm-permalink={INSTAGRAM_POST_URL}
            data-instgrm-version="14"
            style={{
              background: '#fff',
              border: 0,
              borderRadius: 3,
              margin: 0,
              maxWidth: 540,
              minWidth: 326,
              width: '100%',
            }}
          >
            <p className="p-6 text-sm text-ink-600">
              <a href={INSTAGRAM_POST_URL} target="_blank" rel="noopener noreferrer">
                View this post on Instagram
              </a>
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  )
}