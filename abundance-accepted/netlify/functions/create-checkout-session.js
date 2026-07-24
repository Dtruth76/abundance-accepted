// netlify/functions/create-checkout-session.js
//
// Env vars needed (Netlify dashboard -> Site configuration -> Environment variables):
//   STRIPE_SECRET_KEY   = sk_test_...
//   SITE_URL            = https://your-site.netlify.app

const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Fill in the two "annual" IDs once you've created those prices in Stripe.
const PRICE_IDS = {
  "abundance-plus": {
    monthly: "price_1TvT6bE1ZQ0yoHJiiRthasAQ",
    annual: "price_REPLACE_WITH_ANNUAL_ABUNDANCE_PLUS",
  },
  "vip-circle": {
    monthly: "price_1TvTRkE1ZQ0yoHJirsep9gQV",
    annual: "price_REPLACE_WITH_ANNUAL_VIP_CIRCLE",
  },
};

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { tier, billing } = JSON.parse(event.body || "{}");
    const tierPrices = PRICE_IDS[tier];

    if (!tierPrices) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: `Unknown tier: ${tier}` }),
      };
    }

    const priceId = billing === "annual" ? tierPrices.annual : tierPrices.monthly;

    if (!priceId || priceId.includes("REPLACE_WITH")) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: `No ${billing} price configured yet for ${tier}.`,
        }),
      };
    }

    const siteUrl = process.env.SITE_URL || "http://localhost:8888";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout-cancelled`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error("Stripe checkout session error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong creating checkout." }),
    };
  }
};