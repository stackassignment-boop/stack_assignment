'use client'

import { useMemo, useState } from 'react'
import { AlertTriangle, CheckCircle2, Info } from 'lucide-react'

interface Check {
  id: string
  label: string
  status: 'good' | 'warn' | 'info'
  detail: string
}

const SYLLABLE_RE = /[aeiouy]+/g

function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, '')
  if (w.length <= 3) return 1
  const m = w.replace(/e$/, '').match(SYLLABLE_RE)
  return Math.max(1, m ? m.length : 1)
}

/** Hedging/filler phrases that usually weaken academic prose. */
const FILLER = [
  'a lot of', 'lots of', 'very', 'really', 'basically', 'actually', 'kind of',
  'sort of', 'in order to', 'due to the fact that', 'it is important to note that',
  'in today\'s world', 'since the dawn of', 'thing', 'things', 'stuff', 'huge',
  'nowadays', 'obviously', 'clearly',
]

/**
 * First-person markers. Matched as whole words, so `i` already covers `i've`
 * and `i'm` — an apostrophe is a non-word character, which puts a word boundary
 * right after the `i`. Listing the contractions separately, as this once did,
 * counted each of them twice and inflated the tally the student is shown.
 */
const FIRST_PERSON = ['i', 'my', 'me', 'we', 'our', 'us']

const CONTRACTIONS = /\b(can't|won't|don't|doesn't|isn't|aren't|wasn't|weren't|it's|that's|there's|they're|we're|you're|didn't|couldn't|shouldn't|wouldn't|hasn't|haven't)\b/gi

export default function DraftReview() {
  const [text, setText] = useState('')
  const [target, setTarget] = useState('')

  const stats = useMemo(() => {
    const trimmed = text.trim()
    if (!trimmed) return null

    const words = trimmed.split(/\s+/).filter(Boolean)
    const sentences = trimmed.split(/[.!?]+(?:\s|$)/).map((s) => s.trim()).filter(Boolean)
    const paragraphs = trimmed.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
    const chars = trimmed.length

    const syllables = words.reduce((n, w) => n + countSyllables(w), 0)
    const avgWordsPerSentence = words.length / Math.max(1, sentences.length)
    const avgSyllablesPerWord = syllables / Math.max(1, words.length)

    // Flesch Reading Ease
    const flesch = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord
    // Flesch–Kincaid grade level
    const fkGrade = 0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59

    const lower = ` ${trimmed.toLowerCase()} `

    const fillerHits = FILLER.filter((f) => lower.includes(` ${f}`)).slice(0, 8)
    const firstPersonCount = FIRST_PERSON.reduce(
      (n, p) => n + (lower.match(new RegExp(`\\b${p}\\b`, 'g'))?.length ?? 0), 0
    )
    const contractionMatches = trimmed.match(CONTRACTIONS) ?? []

    // Rough citation detection: (Author, 2020) / (Author 2020) / [1] / footnote markers
    const citations =
      (trimmed.match(/\([A-Z][A-Za-z&.\-\s]+,?\s+(?:19|20)\d{2}[a-z]?(?:,\s*p{1,2}\.\s*\d+)?\)/g)?.length ?? 0) +
      (trimmed.match(/\[\d{1,3}\]/g)?.length ?? 0)

    const longSentences = sentences.filter((s) => s.split(/\s+/).length > 35)
    const shortParagraphs = paragraphs.filter((p) => p.split(/\s+/).length < 40)

    // Passive voice (approximate): be-verb + past participle
    const passive = trimmed.match(/\b(is|are|was|were|be|been|being)\s+\w+(ed|en)\b/gi) ?? []

    return {
      words: words.length, sentences: sentences.length, paragraphs: paragraphs.length, chars,
      flesch, fkGrade, avgWordsPerSentence, fillerHits, firstPersonCount,
      contractions: contractionMatches.length, citations, longSentences: longSentences.length,
      shortParagraphs: shortParagraphs.length, passive: passive.length,
    }
  }, [text])

  const checks: Check[] = useMemo(() => {
    if (!stats) return []
    const out: Check[] = []
    const t = parseInt(target, 10)

    if (t && t > 0) {
      const pct = (stats.words / t) * 100
      if (pct < 90)
        out.push({ id: 'len', label: 'Word count', status: 'warn',
          detail: `You're at ${stats.words} of ${t} words (${pct.toFixed(0)}%). Most markers expect to land within 10% of the target.` })
      else if (pct > 110)
        out.push({ id: 'len', label: 'Word count', status: 'warn',
          detail: `You're at ${stats.words} of ${t} words (${pct.toFixed(0)}%) — over the usual +10% tolerance. Some units penalise this.` })
      else
        out.push({ id: 'len', label: 'Word count', status: 'good',
          detail: `${stats.words} of ${t} words — comfortably within the usual ±10% range.` })
    }

    out.push(
      stats.citations === 0
        ? { id: 'cite', label: 'Citations', status: 'warn',
            detail: 'No in-text citations detected. Most academic assessments expect sources to be cited in the body, not just listed at the end. (Footnote styles like AGLC4 will not be picked up here.)' }
        : { id: 'cite', label: 'Citations', status: 'good',
            detail: `${stats.citations} in-text citation${stats.citations === 1 ? '' : 's'} detected — roughly ${(stats.words / stats.citations).toFixed(0)} words per citation.` }
    )

    if (stats.longSentences > 0)
      out.push({ id: 'long', label: 'Sentence length', status: 'warn',
        detail: `${stats.longSentences} sentence${stats.longSentences === 1 ? '' : 's'} over 35 words. Long sentences are where arguments usually become hard to follow — consider splitting them.` })
    else
      out.push({ id: 'long', label: 'Sentence length', status: 'good',
        detail: `Average ${stats.avgWordsPerSentence.toFixed(1)} words per sentence, with none over 35. That reads comfortably.` })

    if (stats.fillerHits.length)
      out.push({ id: 'filler', label: 'Filler and vague wording', status: 'warn',
        detail: `Found: ${stats.fillerHits.map((f) => `"${f.trim()}"`).join(', ')}. These usually weaken academic prose — most can be cut or replaced with something specific.` })
    else
      out.push({ id: 'filler', label: 'Filler and vague wording', status: 'good',
        detail: 'No common filler phrases detected.' })

    if (stats.contractions > 0)
      out.push({ id: 'contract', label: 'Contractions', status: 'warn',
        detail: `${stats.contractions} contraction${stats.contractions === 1 ? '' : 's'} (e.g. "don't", "it's"). Most academic writing expects these written out in full.` })

    if (stats.firstPersonCount > 0)
      out.push({ id: 'person', label: 'First person', status: 'info',
        detail: `${stats.firstPersonCount} first-person usage${stats.firstPersonCount === 1 ? '' : 's'} ("I", "we", "our"). Fine for reflective writing; check your unit guide if this is a formal report or essay.` })

    if (stats.passive > 0) {
      const rate = (stats.passive / Math.max(1, stats.sentences)) * 100
      out.push({ id: 'passive', label: 'Passive voice', status: rate > 40 ? 'warn' : 'info',
        detail: `Roughly ${stats.passive} passive construction${stats.passive === 1 ? '' : 's'} (~${rate.toFixed(0)}% of sentences). Passive voice is standard in scientific method sections but can make argument-led writing feel indirect.` })
    }

    if (stats.paragraphs > 1 && stats.shortParagraphs > stats.paragraphs / 2)
      out.push({ id: 'para', label: 'Paragraph development', status: 'warn',
        detail: `${stats.shortParagraphs} of ${stats.paragraphs} paragraphs are under 40 words. Short paragraphs often signal a point that has been raised but not developed or evidenced.` })

    out.push({ id: 'read', label: 'Readability', status: 'info',
      detail: `Flesch Reading Ease ${stats.flesch.toFixed(0)} (approx. grade ${Math.max(1, stats.fkGrade).toFixed(0)}). Academic writing typically sits between 30 and 50 — lower is denser, not necessarily better.` })

    return out
  }, [stats, target])

  const icon = (s: Check['status']) =>
    s === 'good' ? <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
    : s === 'warn' ? <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
    : <Info className="h-5 w-5 text-indigo-500 flex-shrink-0" />

  return (
    <div className="space-y-8">
      <div>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-3">
          <label htmlFor="draft" className="block font-semibold text-gray-900 dark:text-slate-100">
            Paste your draft
          </label>
          <div className="flex items-center gap-2">
            <label htmlFor="target" className="text-sm text-gray-600 dark:text-slate-400">
              Target word count
            </label>
            <input
              id="target"
              type="number"
              min={0}
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="2000"
              className="w-28 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-1.5 text-sm text-gray-900 dark:text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
        <textarea
          id="draft"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={14}
          placeholder="Paste your essay, report or draft here. Nothing is uploaded — the analysis runs entirely in your browser."
          className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 p-4 text-gray-900 dark:text-slate-100 leading-relaxed focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {stats && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Words', value: stats.words.toLocaleString() },
              { label: 'Sentences', value: stats.sentences.toLocaleString() },
              { label: 'Paragraphs', value: stats.paragraphs.toLocaleString() },
              { label: 'Characters', value: stats.chars.toLocaleString() },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 text-center">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{s.value}</div>
                <div className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          <div>
            <h2 className="font-bold text-lg text-gray-900 dark:text-slate-100 mb-4">
              What this draft looks like structurally
            </h2>
            <ul className="space-y-3">
              {checks.map((c) => (
                <li key={c.id} className="flex gap-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
                  {icon(c.status)}
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-slate-100">{c.label}</div>
                    <p className="text-sm text-gray-700 dark:text-slate-300 leading-relaxed mt-0.5">{c.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed border-t border-gray-200 dark:border-slate-700 pt-5">
        This tool measures structural and stylistic patterns only — it cannot judge whether your
        argument is sound, whether your sources are appropriate, or whether you have answered the
        question set. It is a proofreading aid, not a mark predictor, and it does not check
        originality. Your text stays in your browser and is never uploaded.
      </p>
    </div>
  )
}
