type AdSlotProps = {
  label?: string
  slot?: string
  format?: string
  responsive?: boolean
}

export default function AdSlot({
  label = 'Advertisement',
  slot = '0000000000',
  format = 'auto',
  responsive = true,
}: AdSlotProps) {
  const client = 'ca-pub-4723216634077095'

  if (typeof window === 'undefined') {
    return null
  }

  const adsbygoogle = (window as Window & { adsbygoogle?: unknown[] }).adsbygoogle || []

  if (adsbygoogle.length === 0) {
    ;(window as Window & { adsbygoogle?: unknown[] }).adsbygoogle = []
  }

  const handleAdReady = () => {
    const googleAds = (window as Window & { adsbygoogle?: unknown[] }).adsbygoogle || []
    if (googleAds) {
      googleAds.push({})
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4">
      <div className="rounded-xl border border-stone-200 bg-white/80 p-3 shadow-sm">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
          {label}
        </p>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', minHeight: '90px' }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
          onLoad={handleAdReady}
        />
      </div>
    </div>
  )
}
