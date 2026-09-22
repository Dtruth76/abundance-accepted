export default function SubscriptionCancelled() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center bg-stone-50 px-6 text-center">
      <h1 className="font-serif text-3xl text-stone-900">
        Subscription management complete
      </h1>
      <p className="mt-3 max-w-lg text-stone-600">
        You have been returned to Abundance Accepted after managing your Stripe subscription. If you canceled,
        your membership will remain active through the end of your current billing period unless Stripe confirms
        otherwise.
      </p>
      <a
        href="/"
        className="mt-6 rounded-full bg-stone-900 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-700"
      >
        Back to home
      </a>
    </section>
  )
}
