'use client'

import { useRef, useState } from 'react'
import { Upload, Loader2, X, FileDown, AlertTriangle } from 'lucide-react'
import { downloadBlob, withExtension } from '@/lib/download'

interface PageText { page: number; paragraphs: string[] }

export default function PdfToWord() {
  const [fileName, setFileName] = useState('')
  const [pages, setPages] = useState<PageText[]>([])
  const [busy, setBusy] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [warning, setWarning] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const reset = () => {
    setFileName(''); setPages([]); setError(''); setWarning('')
    setProgress(0); setBusy(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  const handleFile = async (file: File) => {
    if (file.type !== 'application/pdf') {
      setError('That file is not a PDF.')
      return
    }
    setError(''); setWarning(''); setPages([]); setProgress(0)
    setFileName(file.name)
    setBusy(true)

    try {
      const pdfjsLib = await import('pdfjs-dist')
      // Served from our own origin by scripts/copy-pdf-worker.mjs, which copies
      // it out of node_modules on install and build. That keeps the worker on
      // exactly the version of pdfjs-dist the API half came from — pdf.js
      // refuses to start if the two differ — and removes the third-party CDN
      // this used to depend on at runtime.
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf-worker/pdf.worker.min.mjs'

      const buffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise

      const out: PageText[] = []
      let totalChars = 0

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const content = await page.getTextContent()

        // A PDF has no concept of a line — it has glyphs at coordinates. Group
        // the text items by their vertical position to recover lines, then read
        // them top to bottom (PDF y-coordinates grow upwards, hence the
        // descending sort).
        const lines = new Map<number, string[]>()
        for (const item of content.items as { str: string; transform: number[] }[]) {
          if (!item.str) continue
          const y = Math.round(item.transform[5])
          if (!lines.has(y)) lines.set(y, [])
          lines.get(y)!.push(item.str)
        }

        const ordered = [...lines.entries()]
          .sort((a, b) => b[0] - a[0])
          .map(([, parts]) => parts.join('').replace(/\s+/g, ' ').trim())
          .filter(Boolean)

        // Merge the lines into paragraphs. The signal for a paragraph ending is
        // a line that stops short of the column width — the last line of a
        // paragraph, or a heading. The length of the line that comes *next*
        // says nothing about it, which is what the previous version tested, so
        // every paragraph got split before its own final line.
        //
        // The threshold is derived from the widest line actually on the page
        // rather than a fixed character count, so a large font, a narrow
        // column, or a two-column layout does not read as a break on every
        // single line.
        const widest = ordered.reduce((max, line) => Math.max(max, line.length), 0)
        const shortLine = Math.max(16, Math.round(widest * 0.75))

        const paragraphs: string[] = []
        let current = ''
        let previous = ''
        for (const line of ordered) {
          if (!current) {
            current = line
            previous = line
            continue
          }
          if (previous.length < shortLine) {
            paragraphs.push(current)
            current = line
          } else {
            current += ` ${line}`
          }
          previous = line
        }
        if (current) paragraphs.push(current)

        totalChars += paragraphs.join('').length
        out.push({ page: i, paragraphs })
        setProgress(Math.round((i / pdf.numPages) * 100))
      }

      setPages(out)

      if (totalChars < 50) {
        setWarning(
          'Almost no selectable text was found. This PDF is probably a scan or a set of images — try the Image to Text tool instead, which runs OCR.'
        )
      }
    } catch (err) {
      console.error('PDF extraction failed:', err)
      setError('Could not read that PDF. It may be password-protected or damaged.')
    } finally {
      setBusy(false)
    }
  }

  const downloadDocx = async () => {
    const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await import('docx')

    const children = pages.flatMap((p) => [
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 120 },
        children: [new TextRun({ text: `Page ${p.page}`, bold: true })],
      }),
      ...p.paragraphs.map(
        (text) => new Paragraph({ spacing: { after: 160 }, children: [new TextRun(text)] })
      ),
    ])

    const doc = new Document({ sections: [{ properties: {}, children }] })
    const blob = await Packer.toBlob(doc)
    downloadBlob(blob, withExtension(fileName, 'docx', 'converted'))
  }

  const wordCount = pages.reduce(
    (n, p) => n + p.paragraphs.join(' ').split(/\s+/).filter(Boolean).length, 0
  )

  return (
    <div className="space-y-6">
      {!fileName && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) handleFile(f) }}
          className="rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/40 p-10 text-center"
        >
          <Upload className="mx-auto h-10 w-10 text-slate-400 mb-4" />
          <p className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
            Drop a PDF here, or choose a file
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
            Lecture notes, readings, unit guides — anything with selectable text.
          </p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Choose PDF
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
          />
        </div>
      )}

      {fileName && (
        <div className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3">
          <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-300">{fileName}</span>
          <button type="button" onClick={reset} aria-label="Remove file" className="text-slate-400 hover:text-red-600">
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {busy && (
        <div className="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-500/10 p-5">
          <div className="flex items-center gap-3 mb-3">
            <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              Extracting text — {progress}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-indigo-100 dark:bg-indigo-900">
            <div className="h-full bg-indigo-600 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {error && (
        <p className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-500/10 p-4 text-sm text-red-800 dark:text-red-200">
          {error}
        </p>
      )}

      {warning && (
        <div className="flex gap-3 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-500/10 p-4">
          <AlertTriangle className="h-5 w-5 flex-shrink-0 text-amber-600" />
          <p className="text-sm text-amber-800 dark:text-amber-200">{warning}</p>
        </div>
      )}

      {pages.length > 0 && !busy && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
            <div>
              <div className="font-bold text-slate-900 dark:text-slate-100">
                {pages.length} page{pages.length === 1 ? '' : 's'} · {wordCount.toLocaleString()} words
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Text extracted. Download as an editable Word document.
              </p>
            </div>
            <button
              type="button"
              onClick={downloadDocx}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              <FileDown className="h-4 w-4" /> Download .docx
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 space-y-5">
            {pages.map((p) => (
              <div key={p.page}>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                  Page {p.page}
                </h3>
                {p.paragraphs.map((t, i) => (
                  <p key={i} className="mb-2 text-sm text-slate-800 dark:text-slate-200 leading-relaxed">{t}</p>
                ))}
              </div>
            ))}
          </div>
        </>
      )}

      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-700 pt-5">
        Conversion happens entirely in your browser — your PDF is never uploaded. This extracts text
        and basic paragraph structure; complex layouts, tables, columns and images will not carry
        across exactly, so check the output before using it. Converting a document does not change
        its copyright or your obligation to cite it.
      </p>
    </div>
  )
}
