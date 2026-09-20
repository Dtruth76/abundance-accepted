export function buildContentPlan(topic = 'Natural Weight Loss') {
  const cleanTopic = String(topic || 'Natural Weight Loss').trim()
  const safeTopic = cleanTopic || 'Natural Weight Loss'
  const lowerTopic = safeTopic.toLowerCase()

  const articleTitle = `${safeTopic} for Busy Women Who Want Real, Sustainable Results`
  const summary = `Learn the simple habits behind ${safeTopic.toLowerCase()} without extreme restrictions, crash diets, or fake shortcuts. This article keeps the focus on real food, consistent movement, daily accountability, and sustainable progress.`

  const newsletterSubject = `This Week's Abundant Health News: ${safeTopic}`
  const seoKeywords = [
    'intermittent fasting',
    lowerTopic,
    `${lowerTopic} tips`,
    `${lowerTopic} naturally`,
    'natural weight loss strategies',
    'whole foods lifestyle',
    'intermittent fasting for beginners',
    'healthy habits for weight loss',
  ]

  const socialCaptions = {
    instagram: `🌿 ${safeTopic} starts with simple habits, not perfection. Real food, movement, rest, and consistency are what actually change the scale — and your life. 💛\n\nWhat small shift can you make this week?`,
    tiktok: `Here’s the honest truth about ${safeTopic.toLowerCase()}: it’s not about extreme rules. It’s about building a lifestyle that actually lasts. Simple habits win.`,
    facebook: `If you’re trying to improve ${safeTopic.toLowerCase()}, start with systems you can sustain. Whole foods, daily movement, sleep, and accountability matter more than any fad diet.`,
    pinterest: `Pin this for your next healthy reset: the natural path to ${safeTopic.toLowerCase()} is built on simple, repeatable habits — not deprivation.`,
    linkedin: `Sustainable health change is rarely dramatic. It’s built from consistent habits, practical routine, and self-accountability. That’s the real path to ${safeTopic.toLowerCase()}.`,
    youtube: `In this video, we break down how ${safeTopic.toLowerCase()} can work in real life — no gimmicks, no pills, no extremes, just realistic habits that support long-term results.`,
  }

  return {
    articleTitle,
    summary,
    newsletterSubject,
    seoKeywords,
    socialCaptions,
  }
}

export function buildSitemapXml(urls = []) {
  const validUrls = Array.from(new Set(urls.filter(Boolean)))
  const urlEntries = validUrls
    .map((url) => `  <url>\n    <loc>${url}</loc>\n  </url>`)
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`
}

export default {
  buildContentPlan,
  buildSitemapXml,
}
