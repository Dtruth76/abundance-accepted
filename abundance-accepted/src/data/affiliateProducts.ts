// src/data/affiliateProducts.ts
//
// Add or edit products here — the Affiliate Shop section reads directly from this file.
// No component code needs to change when you add a new product or a new link source.

export type AffiliateSource =
  | "amazon"
  | "thrive-market"
  | "bookshop"
  | "sharesale"
  | "impact"
  | "rakuten"
  | "direct";

export type Category =
  | "Fitness Gear"
  | "Nutrition & Kitchen"
  | "Books & Resources";

export interface AffiliateProduct {
  id: string;
  name: string;
  description: string;
  category: Category;
  image: string; // path or URL to product image
  price?: string; // optional display price, e.g. "$24.99"
  priceValue?: number; // optional numeric price (cents or decimal) for sorting/filtering
  source: AffiliateSource;
  url: string; // the actual affiliate link
  featured?: boolean; // set true to highlight (e.g. your own books)
}

// Human-readable labels + badge styling per source.
// Add a new source here first, then reference it in AffiliateSource above.
export const sourceMeta: Record<
  AffiliateSource,
  { label: string; badgeClass: string }
> = {
  amazon: {
    label: "Amazon",
    badgeClass: "bg-[#FF9900]/10 text-[#B45F06] border-[#FF9900]/30",
  },
  "thrive-market": {
    label: "Thrive Market",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  bookshop: {
    label: "Bookshop.org",
    badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  sharesale: {
    label: "ShareASale",
    badgeClass: "bg-sky-50 text-sky-700 border-sky-200",
  },
  impact: {
    label: "Impact",
    badgeClass: "bg-violet-50 text-violet-700 border-violet-200",
  },
  rakuten: {
    label: "Rakuten",
    badgeClass: "bg-rose-50 text-rose-700 border-rose-200",
  },
  direct: {
    label: "Direct",
    badgeClass: "bg-stone-100 text-stone-700 border-stone-300",
  },
};

// Replace these placeholder entries with your real products + affiliate links.
export const affiliateProducts: AffiliateProduct[] = [
  {
    id: "wake-up-workout-book",
    name: "Wake Up and Workout",
    description:
      "My first book — simple morning movement habits that stick, even on your busiest days.",
    category: "Books & Resources",
    image: "/images/affiliate/wake-up-workout.jpg",
    price: "$14.99",
    priceValue: 14.99,
    source: "amazon",
    url: "https://www.amazon.com/YOUR-AFFILIATE-LINK-HERE",
    featured: true,
  },
  {
    id: "up-for-challenge-book",
    name: "Are You Up For The Challenge?",
    description:
      "My second book — a practical guide to building consistency around real food and movement.",
    category: "Books & Resources",
    image: "/images/affiliate/up-for-challenge.jpg",
    price: "$14.99",
    priceValue: 14.99,
    source: "bookshop",
    url: "https://bookshop.org/YOUR-AFFILIATE-LINK-HERE",
    featured: true,
  },
  {
    id: "resistance-bands-set",
    name: "Resistance Bands Set",
    description: "My go-to for at-home strength days when I don't want to load up on equipment.",
    category: "Fitness Gear",
    image: "/images/affiliate/resistance-bands.jpg",
    price: "$19.99",
    priceValue: 19.99,
    source: "amazon",
    url: "https://www.amazon.com/YOUR-AFFILIATE-LINK-HERE",
  },
  {
    id: "glass-meal-prep-containers",
    name: "Glass Meal Prep Containers",
    description: "What I use every Sunday to keep real-food prep simple during the week.",
    category: "Nutrition & Kitchen",
    image: "/images/affiliate/meal-prep-containers.jpg",
    price: "$32.99",
    priceValue: 32.99,
    source: "thrive-market",
    url: "https://thrivemarket.com/YOUR-AFFILIATE-LINK-HERE",
  },
];
