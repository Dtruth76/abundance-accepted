export type ContentPlan = {
  articleTitle: string
  summary: string
  newsletterSubject: string
  seoKeywords: string[]
  socialCaptions: Record<string, string>
}

export function buildContentPlan(topic?: string): ContentPlan
export function buildSitemapXml(urls?: string[]): string
