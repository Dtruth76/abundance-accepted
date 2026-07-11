# Abundance Accepted

React + TypeScript + Tailwind site for Abundance Accepted LLC.

## Run it in StackBlitz (no local setup needed)

1. Push this folder to a new GitHub repo (see below).
2. Go to https://stackblitz.com, choose **Import from GitHub**, and paste your repo URL.
3. StackBlitz will install dependencies and start the dev server automatically.

## Push to GitHub

```bash
cd abundance-accepted
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/<your-username>/abundance-accepted.git
git push -u origin main
```

## Run locally

```bash
npm install
npm run dev
```

## What's included

- **No top banner** — the header is a plain nav bar; the hero is typography-led, no promo strip.
- **Logo** — `public/logo.png` is your uploaded mark, used in the header, footer, and About section.
- **Books section** (`src/components/Books.tsx`) — both books link out to their real Amazon
  listings. Swap `BookCover` for real cover photography whenever you have it (drop the images in
  `public/` and replace the placeholder `<BookCover />` with an `<img>`).
- **BioFit™ teaser** and **newsletter capture** (`src/components/Newsletter.tsx`) — the form is
  client-side only right now (it just confirms in the UI). Wire the `handleSubmit` function up to
  your email provider (ConvertKit, Mailchimp, Beehiiv) or a serverless function before launch.
- **Membership tiers** (`src/components/Membership.tsx`) — placeholder pricing/features, edit
  freely.
- **Affiliate shop** (`src/components/AffiliateShop.tsx`) — placeholder product grid with an
  affiliate-disclosure line already in place; swap in real product photos and links.
- **Display ad slot** (`src/components/AdSlot.tsx`) — one reserved slot below the BioFit™ section.
  Replace the placeholder `<div>` with your ad network's real embed once approved (e.g. Google
  AdSense) — add more `<AdSlot />` instances anywhere you want additional inventory.

## A couple of notes on the content

- The "Are You Up For The Challenge?" title on Amazon uses **"For"** rather than **"to"** — the
  site uses the real published title so the link and cover text match what buyers will see.
- The natural-vs-medical framing in `Philosophy.tsx` is written to state your approach and
  philosophy honestly, without overstating it as a claim that natural methods outperform medical
  ones — current research on bariatric surgery and GLP-1 medications shows they often produce
  larger, more durable weight loss for people who are candidates for them. Keeping the language
  as "our approach" rather than "the proven superior method" protects you from misleading-claims
  issues down the line while still being a strong, honest pitch for the natural path.
