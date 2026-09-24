'use client'

import { useState } from 'react'
import { Copy, Check, Trash2, Plus } from 'lucide-react'

type Style = 'apa7' | 'harvard' | 'agcl4' | 'vancouver'
type SourceType = 'journal' | 'book' | 'website' | 'chapter'

interface Fields {
  authors: string
  year: string
  title: string
  container: string
  volume: string
  issue: string
  pages: string
  publisher: string
  url: string
  accessed: string
}

const EMPTY: Fields = {
  authors: '', year: '', title: '', container: '', volume: '',
  issue: '', pages: '', publisher: '', url: '', accessed: '',
}

const STYLES: { id: Style; label: string; note: string }[] = [
  { id: 'apa7', label: 'APA 7th', note: 'Common in psychology, education, health and business.' },
  { id: 'harvard', label: 'Harvard (AU)', note: 'Widely set across Australian business and IT faculties.' },
  { id: 'agcl4', label: 'AGLC4', note: 'Australian Guide to Legal Citation — law units.' },
  { id: 'vancouver', label: 'Vancouver', note: 'Numbered style used in nursing, medicine and some sciences.' },
]

const TYPES: { id: SourceType; label: string }[] = [
  { id: 'journal', label: 'Journal article' },
  { id: 'book', label: 'Book' },
  { id: 'chapter', label: 'Book chapter' },
  { id: 'website', label: 'Website / web page' },
]

/** Split "Smith, J.; Doe, A." or "Smith, J. and Doe, A." into parts. */
function splitAuthors(raw: string): string[] {
  return raw
    .split(/;| and (?=[A-Z])|&/)
    .map((a) => a.trim())
    .filter(Boolean)
}

/** "Smith, John" -> "Smith, J." ; leaves already-initialised names alone. */
function toInitials(author: string): string {
  const [surname, ...rest] = author.split(',').map((s) => s.trim())
  if (!rest.length) return surname
  const initials = rest
    .join(' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((n) => (n.endsWith('.') ? n : `${n.charAt(0).toUpperCase()}.`))
    .join(' ')
  return initials ? `${surname}, ${initials}` : surname
}

function joinApa(authors: string[]): string {
  const a = authors.map(toInitials)
  if (a.length === 0) return ''
  if (a.length === 1) return a[0]
  return `${a.slice(0, -1).join(', ')}, & ${a[a.length - 1]}`
}

function joinHarvard(authors: string[]): string {
  const a = authors.map(toInitials)
  if (a.length === 0) return ''
  if (a.length === 1) return a[0]
  return `${a.slice(0, -1).join(', ')} & ${a[a.length - 1]}`
}

/** Vancouver: "Smith J" (no comma, no full stops on initials). */
function joinVancouver(authors: string[]): string {
  return authors
    .map((author) => {
      const [surname, ...rest] = author.split(',').map((s) => s.trim())
      if (!rest.length) return surname
      const initials = rest.join(' ').split(/\s+/).filter(Boolean)
        .map((n) => n.replace(/\./g, '').charAt(0).toUpperCase()).join('')
      return `${surname} ${initials}`
    })
    .join(', ')
}

function italic(s: string) {
  // Plain-text output: mark titles that should be italicised so students know.
  return s
}

function buildReference(style: Style, type: SourceType, f: Fields): string {
  const authorList = splitAuthors(f.authors)
  const year = f.year.trim()
  const title = f.title.trim()
  const container = f.container.trim()
  const vol = f.volume.trim()
  const issue = f.issue.trim()
  const pages = f.pages.trim()
  const publisher = f.publisher.trim()
  const url = f.url.trim()
  const accessed = f.accessed.trim()

  if (style === 'apa7') {
    const a = joinApa(authorList)
    const y = year ? ` (${year}).` : ' (n.d.).'
    if (type === 'journal') {
      const volIssue = vol ? `, ${vol}${issue ? `(${issue})` : ''}` : ''
      return `${a}${y} ${title}. ${italic(container)}${volIssue}${pages ? `, ${pages}` : ''}.${url ? ` ${url}` : ''}`.trim()
    }
    if (type === 'book') {
      return `${a}${y} ${italic(title)}. ${publisher}.${url ? ` ${url}` : ''}`.trim()
    }
    if (type === 'chapter') {
      return `${a}${y} ${title}. In ${italic(container)}${pages ? ` (pp. ${pages})` : ''}. ${publisher}.`.trim()
    }
    return `${a}${y} ${italic(title)}. ${container}.${url ? ` ${url}` : ''}`.trim()
  }

  if (style === 'harvard') {
    const a = joinHarvard(authorList)
    const y = year ? ` ${year},` : ' n.d.,'
    if (type === 'journal') {
      const volIssue = vol ? `, vol. ${vol}${issue ? `, no. ${issue}` : ''}` : ''
      return `${a}${y} '${title}', ${italic(container)}${volIssue}${pages ? `, pp. ${pages}` : ''}.`.trim()
    }
    if (type === 'book') {
      return `${a}${y} ${italic(title)}, ${publisher}.`.trim()
    }
    if (type === 'chapter') {
      return `${a}${y} '${title}', in ${italic(container)}, ${publisher}${pages ? `, pp. ${pages}` : ''}.`.trim()
    }
    return `${a}${y} ${italic(title)}, ${container}${accessed ? `, viewed ${accessed}` : ''}${url ? `, <${url}>` : ''}.`.trim()
  }

  if (style === 'vancouver') {
    const a = joinVancouver(authorList)
    if (type === 'journal') {
      const volIssue = vol ? `;${vol}${issue ? `(${issue})` : ''}` : ''
      return `${a}. ${title}. ${container}. ${year}${volIssue}${pages ? `:${pages}` : ''}.`.trim()
    }
    if (type === 'book') {
      return `${a}. ${title}. ${publisher}; ${year}.`.trim()
    }
    if (type === 'chapter') {
      return `${a}. ${title}. In: ${container}. ${publisher}; ${year}${pages ? `. p. ${pages}` : ''}.`.trim()
    }
    return `${a}. ${title} [Internet]. ${container}; ${year} [cited ${accessed || 'date'}]. Available from: ${url}`.trim()
  }

  // AGLC4 (simplified — always verify against the official guide)
  const aglcAuthors = authorList.join(' and ')
  if (type === 'journal') {
    return `${aglcAuthors}, '${title}' (${year}) ${vol}${issue ? `(${issue})` : ''} ${container} ${pages}.`.trim()
  }
  if (type === 'book') {
    return `${aglcAuthors}, ${italic(title)} (${publisher}, ${year}).`.trim()
  }
  if (type === 'chapter') {
    return `${aglcAuthors}, '${title}' in ${container} (${publisher}, ${year}) ${pages}.`.trim()
  }
  return `${aglcAuthors}, '${title}', ${container} (Web Page, ${year}) <${url}>.`.trim()
}

function buildInText(style: Style, f: Fields): string {
  const authors = splitAuthors(f.authors)
  const year = f.year.trim() || 'n.d.'
  const surnames = authors.map((a) => a.split(',')[0].trim()).filter(Boolean)
  if (!surnames.length) return ''

  if (style === 'vancouver') return '(1)  — Vancouver numbers sources in order of first appearance'

  let name = surnames[0]
  if (surnames.length === 2) name = `${surnames[0]} ${style === 'apa7' ? '&' : '&'} ${surnames[1]}`
  else if (surnames.length > 2) name = `${surnames[0]} et al.`

  if (style === 'apa7') return `(${name}, ${year})`
  if (style === 'harvard') return `(${name} ${year})`
  return `${name} (n ${year})` // AGLC uses footnotes; this is indicative only
}

export default function ReferencingFormatter() {
  const [style, setStyle] = useState<Style>('apa7')
  const [type, setType] = useState<SourceType>('journal')
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [saved, setSaved] = useState<string[]>([])
  const [copied, setCopied] = useState<string | null>(null)

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFields((p) => ({ ...p, [k]: e.target.value }))

  const reference = fields.title || fields.authors ? buildReference(style, type, fields) : ''
  const inText = fields.authors ? buildInText(style, fields) : ''

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch {
      /* clipboard unavailable — user can select manually */
    }
  }

  const showField = (name: keyof Fields): boolean => {
    if (type === 'journal') return !['publisher', 'accessed'].includes(name)
    if (type === 'book') return !['container', 'volume', 'issue', 'pages', 'accessed'].includes(name)
    if (type === 'chapter') return !['volume', 'issue', 'accessed', 'url'].includes(name)
    return !['volume', 'issue', 'pages', 'publisher'].includes(name)
  }

  const labels: Partial<Record<keyof Fields, string>> = {
    authors: 'Author(s) — "Surname, First" separated by semicolons',
    year: 'Year',
    title: type === 'book' ? 'Book title' : 'Title of article / page / chapter',
    container: type === 'journal' ? 'Journal name' : type === 'chapter' ? 'Book title' : 'Website / publisher name',
    volume: 'Volume',
    issue: 'Issue',
    pages: 'Pages (e.g. 45–61)',
    publisher: 'Publisher',
    url: 'URL or DOI',
    accessed: 'Date viewed (e.g. 14 March 2026)',
  }

  return (
    <div className="space-y-8">
      {/* Style picker */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">
          1. Choose the style your unit guide specifies
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {STYLES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setStyle(s.id)}
              className={`text-left rounded-xl border p-4 transition ${
                style === s.id
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 ring-1 ring-indigo-500'
                  : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300'
              }`}
            >
              <div className="font-bold text-slate-900 dark:text-slate-100">{s.label}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">{s.note}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Source type */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">
          2. What are you citing?
        </h2>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setType(t.id)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                type === t.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Fields */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">
          3. Enter the source details
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {(Object.keys(EMPTY) as (keyof Fields)[])
            .filter(showField)
            .map((name) => (
              <div key={name} className={name === 'authors' || name === 'title' ? 'sm:col-span-2' : ''}>
                <label htmlFor={`ref-${name}`} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  {labels[name]}
                </label>
                <input
                  id={`ref-${name}`}
                  type="text"
                  value={fields[name]}
                  onChange={set(name)}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            ))}
        </div>
      </div>

      {/* Output */}
      {reference && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-6 space-y-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Reference list entry</h3>
              <button
                type="button"
                onClick={() => copy(reference, 'ref')}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                {copied === 'ref' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied === 'ref' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 text-slate-900 dark:text-slate-100 leading-relaxed break-words">
              {reference}
            </p>
          </div>

          {inText && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-900 dark:text-slate-100">In-text citation</h3>
                <button
                  type="button"
                  onClick={() => copy(inText, 'intext')}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {copied === 'intext' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied === 'intext' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 text-slate-900 dark:text-slate-100">
                {inText}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => { setSaved((s) => [...s, reference]); setFields(EMPTY) }}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" /> Add to reference list
            </button>
            <button
              type="button"
              onClick={() => setFields(EMPTY)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Clear fields
            </button>
          </div>
        </div>
      )}

      {/* Saved list */}
      {saved.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-slate-900 dark:text-slate-100">
              Your reference list ({saved.length})
            </h2>
            <button
              type="button"
              onClick={() => copy(saved.slice().sort().join('\n\n'), 'all')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {copied === 'all' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied === 'all' ? 'Copied' : 'Copy all (A–Z)'}
            </button>
          </div>
          <ul className="space-y-2">
            {saved.slice().sort().map((r, i) => (
              <li
                key={`${r}-${i}`}
                className="flex items-start gap-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4"
              >
                <span className="flex-1 text-sm text-slate-800 dark:text-slate-200 leading-relaxed break-words">{r}</span>
                <button
                  type="button"
                  aria-label="Remove reference"
                  onClick={() => setSaved((s) => s.filter((x) => x !== r))}
                  className="text-slate-400 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-700 pt-5">
        Formatting is generated from the details you enter and follows the general pattern of each
        style. Universities and individual units sometimes vary these conventions — always check the
        output against your unit guide or your library&rsquo;s referencing guide before submitting.
        AGLC4 in particular uses footnotes rather than in-text citations, so the in-text example
        above is indicative only.
      </p>
    </div>
  )
}
