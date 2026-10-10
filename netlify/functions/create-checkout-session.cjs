const Stripe = require('stripe')

const handleRequest = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) }
  }

  if (!process.env.WAKE_UP_WIN_APP_STORE_URL) {
    return {
      statusCode: 503,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Wake Up & Win app checkout will open after the app-store launch.' }),
    }
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY
  if (!stripeSecretKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Stripe key not configured' }),
    }
  }

  const stripe = Stripe(stripeSecretKey)

  try {
    const body = JSON.parse(event.body || '{}')
    const priceId = body.priceId

    if (!priceId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Price ID is required' }),
      }
    }

    if (priceId !== 'price_1UP7OWCveE8X0WZ1KgnQEF7s') {
      return {
        statusCode: 503,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Wake Up & Win app checkout will open after the app-store launch.' }),
      }
    }

    const siteUrl = process.env.URL || process.env.DEPLOY_URL || 'http://localhost:8888'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      ui_mode: 'hosted_page',
      success_url: `${siteUrl}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout-cancelled`,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      billing_address_collection: 'auto',
      payment_method_collection: 'always',
      allow_promotion_codes: true,
      submit_type: 'auto',
      integration_identifier: 'hosted_web_0002',
      origin_context: 'web',
    })

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: session.url }),
    }
  } catch (error) {
    const message = error && error.message ? error.message : 'Server error'
    return {
      statusCode: 500,
      body: JSON.stringify({ error: message }),
    }
  }
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' }
  }

  const response = await handleRequest(event)
  return { ...response, headers: { ...corsHeaders, ...response.headers } }
}