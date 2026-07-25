export default function CheckoutCancelled() {
return (
<section className="flex min-h-[60vh] flex-col items-center justify-center bg-stone-50 px-6 text-center">
<h1 className="font-serif text-3xl text-stone-900">No charge made</h1>
<p className="mt-3 max-w-md text-stone-600">
Checkout was cancelled and you haven't been charged. Whenever you're ready, your membership is right here.
</p>
<a href="/#membership" className="mt-6 rounded-full bg-stone-900 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-700" >
View membership tiers
</a>
</section>
);
}