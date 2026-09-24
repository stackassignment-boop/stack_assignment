'use client'

import { useState } from 'react'
import { Sparkles, RotateCcw, Eye, EyeOff, ChevronRight } from 'lucide-react'

type Mode = 'cloze' | 'definition' | 'recall'

interface Question {
  id: number
  mode: Mode
  prompt: string
  answer: string
  context: string
}

const STOPWORDS = new Set([
  'the','a','an','and','or','but','if','then','than','that','this','these','those','is','are','was',
  'were','be','been','being','have','has','had','do','does','did','will','would','should','could',
  'may','might','must','can','of','in','on','at','to','for','with','by','from','as','into','about',
  'it','its','they','them','their','he','she','his','her','we','our','you','your','i','not','no',
  'which','who','whom','what','when','where','how','why','also','more','most','such','some','any',
  'there','here','while','during','between','both','each','other','because','however','therefore',
])

function sentences(text: string): string[] {
  return text
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .map((s) => s.trim())
    .filter((s) => s.split(/\s+/).length >= 6)
}

/** Score a word by how "key-term-like" it is. */
function termScore(word: string, freq: Map<string, number>): number {
  const clean = word.replace(/[^A-Za-z-]/g, '')
  if (clean.length < 4) return 0
  const lower = clean.toLowerCase()
  if (STOPWORDS.has(lower)) return 0
  let score = clean.length
  if (/^[A-Z]/.test(clean)) score += 4           // proper noun / defined term
  if (/-/.test(clean)) score += 3                 // hyphenated technical term
  score += Math.min(6, (freq.get(lower) ?? 0) * 2) // recurring = important
  return score
}

function buildQuestions(text: string, count: number): Question[] {
  const sents = sentences(text)
  if (!sents.length) return []

  const freq = new Map<string, number>()
  for (const w of text.toLowerCase().match(/[a-z-]{4,}/g) ?? []) {
    if (!STOPWORDS.has(w)) freq.set(w, (freq.get(w) ?? 0) + 1)
  }

  const out: Question[] = []
  const usedAnswers = new Set<string>()
  let id = 0

  // 1) Definition questions from "X is/are/refers to ..." patterns
  for (const s of sents) {
    if (out.length >= count) break
    const m = s.match(/^(.{3,60}?)\s+(?:is|are|refers to|is defined as|means)\s+(.{15,})$/i)
    if (m) {
      const term = m[1].replace(/^(the|a|an)\s+/i, '').trim()
      if (term && !usedAnswers.has(term.toLowerCase())) {
        usedAnswers.add(term.toLowerCase())
        out.push({
          id: id++, mode: 'definition',
          prompt: `Define or explain: ${term}`,
          answer: m[2].replace(/\.$/, '').trim(),
          context: s,
        })
      }
    }
  }

  // 2) Cloze (fill-the-gap) on the highest-value term in a sentence
  for (const s of sents) {
    if (out.length >= count) break
    const words = s.split(/\s+/)
    let best = ''
    let bestScore = 0
    for (const w of words) {
      const sc = termScore(w, freq)
      const clean = w.replace(/[^A-Za-z-]/g, '')
      if (sc > bestScore && !usedAnswers.has(clean.toLowerCase())) {
        bestScore = sc; best = clean
      }
    }
    if (best && bestScore >= 8) {
      usedAnswers.add(best.toLowerCase())
      out.push({
        id: id++, mode: 'cloze',
        prompt: s.replace(new RegExp(`\\b${best}\\b`), '__________'),
        answer: best,
        context: s,
      })
    }
  }

  // 3) Short-answer recall prompts from remaining substantial sentences
  for (const s of sents) {
    if (out.length >= count) break
    if (out.some((q) => q.context === s)) continue
    const words = s.split(/\s+/)
    let best = ''
    let bestScore = 0
    for (const w of words) {
      const sc = termScore(w, freq)
      if (sc > bestScore) { bestScore = sc; best = w.replace(/[^A-Za-z-]/g, '') }
    }
    if (best) {
      out.push({
        id: id++, mode: 'recall',
        prompt: `What does your material say about "${best}"?`,
        answer: s,
        context: s,
      })
    }
  }

  return out.slice(0, count)
}

const MODE_LABEL: Record<Mode, string> = {
  cloze: 'Fill the gap',
  definition: 'Definition',
  recall: 'Short answer',
}

export default function QuizGenerator() {
  const [text, setText] = useState('')
  const [count, setCount] = useState(10)
  const [questions, setQuestions] = useState<Question[] | null>(null)
  const [revealed, setRevealed] = useState<Set<number>>(new Set())
  const [index, setIndex] = useState(0)
  const [notEnough, setNotEnough] = useState(false)

  const generate = () => {
    const qs = buildQuestions(text, count)
    setNotEnough(qs.length === 0)
    setQuestions(qs.length ? qs : null)
    setRevealed(new Set())
    setIndex(0)
  }

  const toggle = (id: number) =>
    setRevealed((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const reset = () => { setQuestions(null); setRevealed(new Set()); setIndex(0); setNotEnough(false) }

  const current = questions?.[index]

  return (
    <div className="space-y-8">
      {!questions && (
        <>
          <div>
            <label htmlFor="notes" className="block font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Paste your lecture notes, readings or summary
            </label>
            <textarea
              id="notes"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={12}
              placeholder="Paste a few paragraphs of study material. The more structured your notes are — definitions, key terms, explanations — the better the questions will be."
              className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 p-4 text-slate-900 dark:text-slate-100 leading-relaxed focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              {text.trim() ? `${text.trim().split(/\s+/).length} words` : 'Nothing pasted yet'}
            </div>
          </div>

          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label htmlFor="count" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Number of questions
              </label>
              <select
                id="count"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {[5, 10, 15, 20].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <button
              type="button"
              onClick={generate}
              disabled={text.trim().split(/\s+/).length < 40}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Sparkles className="h-4 w-4" /> Generate questions
            </button>
            {text.trim() && text.trim().split(/\s+/).length < 40 && (
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Paste at least 40 words to generate a useful set.
              </span>
            )}
          </div>

          {notEnough && (
            <p className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-500/10 p-4 text-sm text-amber-800 dark:text-amber-200">
              Could not find enough complete sentences to build questions from. Try pasting more
              material, or notes written in full sentences rather than bullet fragments.
            </p>
          )}
        </>
      )}

      {questions && current && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              Question {index + 1} of {questions.length}
            </div>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <RotateCcw className="h-4 w-4" /> Start over with new notes
            </button>
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className="h-full bg-indigo-600 transition-all"
              style={{ width: `${((index + 1) / questions.length) * 100}%` }}
            />
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6">
            <span className="inline-block rounded-full bg-indigo-100 dark:bg-indigo-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-indigo-700 dark:text-indigo-300 mb-4">
              {MODE_LABEL[current.mode]}
            </span>
            <p className="text-lg text-slate-900 dark:text-slate-100 leading-relaxed mb-5">
              {current.prompt}
            </p>

            <button
              type="button"
              onClick={() => toggle(current.id)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {revealed.has(current.id) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {revealed.has(current.id) ? 'Hide answer' : 'Show answer'}
            </button>

            {revealed.has(current.id) && (
              <div className="mt-5 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-500/10 p-4">
                <div className="text-xs font-bold uppercase tracking-wide text-green-700 dark:text-green-300 mb-1.5">
                  Answer
                </div>
                <p className="text-slate-900 dark:text-slate-100 leading-relaxed">{current.answer}</p>
                {current.mode !== 'recall' && (
                  <p className="mt-3 border-t border-green-200 dark:border-green-800 pt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    <span className="font-semibold">From your notes:</span> {current.context}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-between gap-3">
            <button
              type="button"
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
              className="rounded-lg border border-slate-300 dark:border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setIndex((i) => Math.min(questions.length - 1, i + 1))}
              disabled={index === questions.length - 1}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-40"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </>
      )}

      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-700 pt-5">
        Questions are generated from the text you paste, in your browser — nothing is uploaded or
        stored. This builds active-recall practice from your own material; it does not know your
        syllabus, and it is not a prediction of what will be on your exam.
      </p>
    </div>
  )
}
