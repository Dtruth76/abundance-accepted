export default function CheckoutSuccess() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center bg-stone-50 px-6 text-center">
      <h1 className="font-serif text-3xl text-stone-900">
        You're in! 🎉
      </h1>
      <p className="mt-3 max-w-md text-stone-600">
        Thanks for joining Abundance Accepted. A confirmation email is on its way — check your inbox to get started.
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
