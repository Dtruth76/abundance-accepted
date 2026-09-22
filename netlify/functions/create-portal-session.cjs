exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) }
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY
  if (!stripeSecretKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Stripe key not configured' }),
    }
  }

  try {
    const body = JSON.parse(event.body || '{}')
    const sessionId = body.sessionId || ''
    const customerId = body.customerId || ''

    let resolvedCustomerId = customerId

    if (!resolvedCustomerId && sessionId) {
      const sessionResponse = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + stripeSecretKey,
        },
      })

      const sessionData = await sessionResponse.json()
      if (!sessionResponse.ok) {
        return {
          statusCode: sessionResponse.status,
          body: JSON.stringify({ error: sessionData.error ? sessionData.error.message : 'Session lookup failed' }),
        }
      }

      resolvedCustomerId = sessionData.customer || ''
    }

    if (!resolvedCustomerId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'A valid Stripe customer is required to open the billing portal.' }),
      }
    }

    const params = new URLSearchParams()
    params.append('customer', resolvedCustomerId)
    params.append('return_url', 'https://abundance-accepted.com/subscription-cancelled')

    const response = await fetch('https://api.stripe.com/v1/billing_portal/sessions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + stripeSecretKey,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data.error ? data.error.message : 'Portal error' }),
      }
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: data.url }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error: ' + error.message }),
    }
  }
}
