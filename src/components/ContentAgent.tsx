import { useMemo, useState } from 'react'
import type { ContentPlan } from '../lib/contentAgent'
import { buildContentPlan } from '../lib/contentAgent'

export default function ContentAgent() {
  const [topic, setTopic] = useState('Intermittent Fasting Basics')
  const [plan, setPlan] = useState<ContentPlan>(() => buildContentPlan('Intermittent Fasting Basics'))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const socialEntries = useMemo(
    () => Object.entries(plan.socialCaptions) as [string, string][],
    [plan.socialCaptions],
  )

  const generatePlan = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/.netlify/functions/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Unable to generate content plan.')
      }

      if (data.plan) {
        setPlan(data.plan)
        return
      }

      setPlan(buildContentPlan(topic))
    } catch (err) {
      console.error(err)
      setPlan(buildContentPlan(topic))
      setError('The local generator is running instead of the live AI endpoint. Review the draft and publish it when ready.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="content-agent" className="bg-white py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-moss">AI Content Agent</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink-900 sm:text-4xl">
            Weekly wellness content, ready to publish
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-700">
            Generate the article headline, newsletter draft, SEO keywords, and platform captions in one pass.
          </p>
        </div>

        <div className="mt-10 rounded-[2rem] border border-moss/15 bg-parchment p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <label className="flex-1 text-sm font-medium text-ink-700">
              Content topic
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="mt-2 w-full rounded-full border border-moss/20 bg-white px-4 py-3 text-sm text-ink-900 outline-none focus:border-moss/50"
                placeholder="Intermittent Fasting Basics"
              />
            </label>
            <button
              type="button"
              onClick={generatePlan}
              disabled={loading}
              className="btn-primary whitespace-nowrap disabled:opacity-60"
            >
              {loading ? 'Generating...' : 'Generate plan'}
            </button>
          </div>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <div className="rounded-2xl bg-moss/5 p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-moss/60">Article title</div>
                <h3 className="mt-3 font-display text-2xl text-ink-900">{plan.articleTitle}</h3>
              </div>

              <div className="rounded-2xl border border-moss/10 bg-white p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-moss/60">Newsletter draft</div>
                <div className="mt-3 rounded-xl bg-ink-900 p-4 text-parchment">
                  <div className="text-xs uppercase tracking-[0.18em] text-gold-light">{plan.newsletterSubject}</div>
                  <p className="mt-3 text-sm leading-relaxed text-parchment/80">{plan.summary}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-moss/10 bg-white p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-moss/60">SEO keywords</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {plan.seoKeywords.map((keyword: string) => (
                    <span key={keyword} className="rounded-full border border-moss/15 bg-moss/5 px-3 py-1 text-xs text-ink-700">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-moss/10 bg-white p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-moss/60">Social captions</div>
              <div className="mt-4 space-y-4">
                {socialEntries.map(([platform, caption]: [string, string]) => (
                  <div key={platform} className="rounded-xl border border-moss/10 bg-parchment p-4">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-moss/70">{platform}</div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-700 whitespace-pre-line">{String(caption)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
