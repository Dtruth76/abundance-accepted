import type { Handler } from '@netlify/functions'

const LOCAL_PLAN = (topic: string) => ({
  articleTitle: `${topic || 'Natural Weight Loss'} for Busy Women Who Want Real, Sustainable Results`,
  summary: `Learn the practical habits behind ${String(topic || 'natural weight loss').toLowerCase()} without extreme restrictions, fake shortcuts, or all-or-nothing thinking. This piece stays grounded in whole-food nutrition, daily movement, rest, and accountability.`,
  newsletterSubject: `This Week's Abundant Health News: ${topic || 'Natural Weight Loss'}`,
  seoKeywords: [
    'intermittent fasting',
    String(topic || 'natural weight loss').toLowerCase(),
    `${String(topic || 'natural weight loss').toLowerCase()} tips`,
    'whole foods lifestyle',
    'healthy weight loss habits',
    'intermittent fasting beginners',
  ],
  socialCaptions: {
    instagram: `🌿 ${topic || 'Natural weight loss'} is built from simple, repeatable habits — not perfection. Start with real food, movement, rest, and consistency. What is your first step this week?`,
    tiktok: `Here’s the honest truth about ${String(topic || 'natural weight loss').toLowerCase()}: the best path is the one you can keep.`,
    facebook: `If you’re trying to improve ${String(topic || 'natural weight loss').toLowerCase()}, focus on sustainable support: whole foods, daily movement, sleep, and accountability.`,
    pinterest: `Pin this for your next healthy reset: ${String(topic || 'natural weight loss').toLowerCase()} works best when it fits real life.`,
    linkedin: `Sustainable change is rarely dramatic. It comes from realistic habits and consistent self-accountability — the foundation of ${String(topic || 'natural weight loss').toLowerCase()}.`,
    youtube: `In this video, we look at the simple rhythm behind ${String(topic || 'natural weight loss').toLowerCase()} and why lifestyle change wins over quick fixes.`,
  },
})

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) }
  }

  try {
    const { topic = 'Intermittent Fasting Basics' } = JSON.parse(event.body || '{}')

    const apiKey = process.env.ANTHROPIC_API_KEY
 if (apiKey) {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1200,
          system: `You are the AI content editor for Abundance Accepted LLC. Use D's real philosophy: whole foods, intermittent fasting, movement, rest, daily accountability. Keep tone warm, empowering, evidence-based, and realistic. Return JSON with keys: articleTitle, summary, newsletterSubject, seoKeywords, socialCaptions, where socialCaptions has instagram, tiktok, facebook, pinterest, linkedin, youtube.`,
          messages: [{ role: 'user', content: `Create a weekly wellness content plan for the topic: ${topic}. Include a concise article title, a newsletter summary, SEO keywords, and social captions for Instagram, TikTok, Facebook, Pinterest, LinkedIn, and YouTube. Keep all advice grounded in natural, sustainable health habits and include a disclaimer notice at the end of the summary: 'Consult your physician before making major health changes.'` }],
        }),
      })

      const data = await response.json()
      const text = data?.content?.[0]?.text || ''

      if (!text) {
        return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ plan: LOCAL_PLAN(topic) }) }
      }

      const cleanedText = text.replace(/```json|```/g, '').trim()
      const json = JSON.parse(cleanedText)

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: json }),
      }
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: LOCAL_PLAN(topic) }),
    }
  } catch (error) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: LOCAL_PLAN(JSON.parse(event.body || '{}').topic || 'Intermittent Fasting Basics') }),
    }
  }
}
