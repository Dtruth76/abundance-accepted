const API_KEY = process.env.ANTHROPIC_API_KEY

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    }
  }

  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing ANTHROPIC_API_KEY environment variable.' }),
    }
  }

  try {
    const { systemPrompt, messages } = JSON.parse(event.body || '{}')

    if (!systemPrompt || !Array.isArray(messages) || messages.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing chat payload.' }),
      }
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Anthropic chat error:', data)
      return {
        statusCode: response.status || 500,
        body: JSON.stringify({
          error: data.error?.message || 'Failed to generate a chat response.',
        }),
      }
    }

    const reply = data.content?.[0]?.text || 'Please try again.'

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    }
  } catch (error) {
    console.error('Server chat error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Something went wrong while generating the response.' }),
    }
  }
}
