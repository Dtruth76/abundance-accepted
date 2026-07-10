const PLACEHOLDER_PRODUCTS = [
  { name: 'Resistance band set', category: 'Movement' },
  { name: 'Insulated water bottle', category: 'Hydration' },
  { name: 'Cast iron skillet', category: 'Real food' },
  { name: 'Sleep mask & wind-down kit', category: 'Recovery' },
]

export default function AffiliateShop() {
  return (
    <section id="shop" className="bg-parchment-200">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="eyebrow">Shop</p>
        <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold leading-tight text-ink-900 sm:text-4xl">
          Tools Deidra actually uses
        </h2>
        <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-ink-600">
          A running list of the everyday products behind the approach — swap these placeholders
          for your real affiliate links and photos before launch.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PLACEHOLDER_PRODUCTS.map((product) => (
            <div key={product.name} className="card flex flex-col overflow-hidden">
              <div className="flex aspect-square items-center justify-center bg-ink-900/5">
                <span className="font-eyebrow text-[11px] uppercase tracking-[0.2em] text-ink-400">
                  Product photo
                </span>
              </div>
              <div className="p-5">
                <span className="eyebrow">{product.category}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-ink-900">
                  {product.name}
                </h3>
                <a href="#" className="btn-ghost mt-4 w-full text-center text-[11px]">
                  Add Affiliate Link
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs leading-relaxed text-ink-400">
          As an Amazon Associate and affiliate partner, Abundance Accepted LLC may earn commission
          on qualifying purchases made through links in this shop, at no extra cost to you.
        </p>
      </div>
    </section>
  )
}
