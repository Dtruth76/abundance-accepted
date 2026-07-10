const PILLARS = [
  {
    name: 'Real food over rules',
    detail:
      "Build meals around vegetables, fruit, whole grains, and lean protein, and go easy on heavily processed food. It's less about banning anything and more about crowding your plate with things closer to their natural state.",
  },
  {
    name: 'Move most days',
    detail:
      'Consistent movement beats occasional intensity. A daily walk, a few strength sessions a week, and taking the stairs add up to more than sporadic all-out workouts most people can\'t sustain.',
  },
  {
    name: 'Protect your sleep',
    detail:
      'Sleep regulates the hormones that control hunger and fullness. Short, poor-quality sleep makes appetite harder to manage no matter how disciplined your meals are.',
  },
  {
    name: 'Manage the stress, not just the scale',
    detail:
      'Chronic stress raises cortisol and drives a lot of the eating that has nothing to do with hunger. Sustainable weight loss usually means dealing with the stress too, not only the food.',
  },
  {
    name: 'Aim for steady, not fast',
    detail:
      "About one to two pounds a week is a pace most bodies can sustain — and weight lost slowly through habits is more likely to stay off than weight lost quickly through extremes.",
  },
]

export default function Approach() {
  return (
    <section id="approach" className="bg-ink-900 text-parchment">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="eyebrow-light">The approach</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">
            Not a program with a finish line. A loop you keep returning to.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-parchment/70">
            These aren't sequential steps you complete once — they're habits you keep circling
            back to, informed by guidance from sources like Mayo Clinic, Harvard's School of
            Public Health, and the CDC on what sustainable weight management actually requires.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-parchment/10 bg-parchment/10 sm:grid-cols-2 lg:grid-cols-5">
          {PILLARS.map((p) => (
            <div key={p.name} className="flex flex-col gap-3 bg-ink-900 p-7">
              <span className="h-8 w-8 rounded-full bg-gold-gradient" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold text-parchment">{p.name}</h3>
              <p className="text-sm leading-relaxed text-parchment/65">{p.detail}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-xs leading-relaxed text-parchment/45">
          This is general educational information, not a personalized medical or nutrition plan.
          Individual needs vary — check with your healthcare provider before making major changes.
        </p>
      </div>
    </section>
  )
}
