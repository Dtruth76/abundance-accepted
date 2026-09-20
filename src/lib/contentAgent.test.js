import test from 'node:test'
import assert from 'node:assert/strict'
import { buildContentPlan, buildSitemapXml } from './contentAgent.js'

test('buildContentPlan includes article, newsletter, captions, and keywords', () => {
  const plan = buildContentPlan('Intermittent Fasting Basics')

  assert.match(plan.articleTitle, /Intermittent Fasting/i)
  assert.ok(plan.newsletterSubject.length > 0)
  assert.ok(plan.socialCaptions.instagram.length > 0)
  assert.ok(plan.socialCaptions.tiktok.length > 0)
  assert.ok(plan.seoKeywords.includes('intermittent fasting'))
})

test('buildSitemapXml includes pages and valid XML tags', () => {
  const xml = buildSitemapXml([
    'https://abundance-accepted.com/',
    'https://abundance-accepted.com/disclaimer',
  ])

  assert.match(xml, /<urlset/i)
  assert.match(xml, /https:\/\/abundance-accepted.com\//)
  assert.match(xml, /https:\/\/abundance-accepted.com\/disclaimer/)
})
