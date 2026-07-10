/**
 * Placeholder for a display ad unit. Swap the inner div for your ad
 * network's real embed (e.g. an AdSense <ins> tag or a script-based
 * unit) once your account is approved — this keeps the layout space
 * reserved so nothing shifts when ads go live.
 */
export default function AdSlot({ label = 'Advertisement' }: { label?: string }) {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="flex h-24 items-center justify-center rounded-2xl border border-dashed border-ink-900/15 bg-ink-900/[0.03] sm:h-28">
        <span className="font-eyebrow text-[11px] uppercase tracking-[0.2em] text-ink-400">
          {label}
        </span>
      </div>
    </div>
  )
}
