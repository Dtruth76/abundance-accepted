const PWA_COACH_SYSTEM_PROMPT = `You are the free Wake Up & Win™ PWA coach for Abundance Accepted LLC. Identify yourself only as the Wake Up & Win™ PWA coach, never as BioFit.

Answer only basic, general health and fitness questions in concise, practical language. Do not diagnose, prescribe treatment, create personalized meal or exercise plans, recommend supplements or medication, or advise extended fasting. Do not promise specific results. For personal or complex medical questions, recommend consulting a qualified health professional.

The full Wake Up & Win app is not yet available in Google Play or the App Store. When a user asks for detailed coaching or the full app, explain that its store launch is pending and invite them to check back. Do not claim it can be downloaded, do not offer a subscription or price, and do not direct users to a payment flow until the app-store launch is ready.`

const handleRequest = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'No API key' }) }
  }
  try {
    const { messages } = JSON.parse(event.body || '{}')
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        system: PWA_COACH_SYSTEM_PROMPT,
        messages,
      }),
    })
    const data = await r.json()
    const text = data?.content?.[0]?.text || 'Please try again.'
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply: text }),
    }
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to connect' }) }
  }
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

export const handler = async (event: any) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' }
  }

  const response = await handleRequest(event)
  return { ...response, headers: { ...corsHeaders, ...response.headers } }
}