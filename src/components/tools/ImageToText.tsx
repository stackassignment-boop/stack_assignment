'use client'

import { useEffect, useRef, useState } from 'react'
import { Upload, Copy, Check, Loader2, X } from 'lucide-react'
import { downloadBlob, withExtension } from '@/lib/download'

export default function ImageToText() {
  const [preview, setPreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState('')
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // An object URL pins the whole decoded image in memory until it is revoked.
  // Students on this page tend to try several photos of the same page, so the
  // previous URL has to go whenever a new file replaces it — and the last one
  // on unmount. The ref (not the state value) is what the cleanup reads, so it
  // is still correct when the component goes away mid-recognition.
  const previewUrlRef = useRef<string | null>(null)

  const showPreview = (url: string | null) => {
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current)
    previewUrlRef.current = url
    setPreview(url)
  }

  useEffect(() => () => {
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current)
  }, [])

  const reset = () => {
    showPreview(null); setFileName(''); setText(''); setError('')
    setProgress(0); setBusy(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('That file is not an image. Upload a PNG, JPG, WEBP or similar.')
      return
    }
    setError(''); setText(''); setProgress(0)
    setFileName(file.name)
    showPreview(URL.createObjectURL(file))
    setBusy(true)

    try {
      // Dynamically imported so the ~2MB worker bundle never loads unless used.
      const Tesseract = (await import('tesseract.js')).default
      const result = await Tesseract.recognize(file, 'eng', {
        logger: (m: { status: string; progress: number }) => {
          if (m.status === 'recognizing text') setProgress(Math.round(m.progress * 100))
        },
      })
      const extracted = result.data.text.trim()
      setText(extracted)
      if (!extracted) setError('No readable text found. Try a sharper image, better lighting, or a straighter crop.')
    } catch (err) {
      console.error('OCR failed:', err)
      setError('Could not read that image. Try a different file or a clearer photo.')
    } finally {
      setBusy(false)
    }
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch { /* clipboard blocked — user can select manually */ }
  }

  const download = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    downloadBlob(blob, withExtension(fileName, 'txt', 'extracted'))
  }

  return (
    <div className="space-y-6">
      {!preview && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) handleFile(f) }}
          className="rounded-2xl border-2 border-dashed border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900/40 p-10 text-center"
        >
          <Upload className="mx-auto h-10 w-10 text-gray-400 mb-4" />
          <p className="font-semibold text-gray-900 dark:text-slate-100 mb-1">
            Drop an image here, or choose a file
          </p>
          <p className="text-sm text-gray-500 dark:text-slate-400 mb-5">
            Photos of lecture slides, textbook pages, whiteboards or handwritten notes. PNG, JPG or WEBP.
          </p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Choose image
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
          />
        </div>
      )}

      {preview && (
        <div className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-700 px-4 py-3">
            <span className="truncate text-sm font-medium text-gray-700 dark:text-slate-300">{fileName}</span>
            <button type="button" onClick={reset} aria-label="Remove image" className="text-gray-400 hover:text-red-600">
              <X className="h-5 w-5" />
            </button>
          </div>
          <img src={preview} alt="Uploaded image being converted to text" className="max-h-72 w-full object-contain bg-gray-50 dark:bg-slate-800" />
        </div>
      )}

      {busy && (
        <div className="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-500/10 p-5">
          <div className="flex items-center gap-3 mb-3">
            <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
            <span className="font-semibold text-gray-900 dark:text-slate-100">
              Reading the image{progress > 0 ? ` — ${progress}%` : '…'}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-indigo-100 dark:bg-indigo-900">
            <div className="h-full bg-indigo-600 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-3 text-xs text-gray-600 dark:text-slate-400">
            First run downloads the recognition engine, so it takes longer than later ones.
          </p>
        </div>
      )}

      {error && (
        <p className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-500/10 p-4 text-sm text-amber-800 dark:text-amber-200">
          {error}
        </p>
      )}

      {text && (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <h2 className="font-bold text-gray-900 dark:text-slate-100">
              Extracted text ({text.split(/\s+/).filter(Boolean).length} words)
            </h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 dark:border-slate-600 px-3 py-1.5 text-sm font-semibold text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button
                type="button"
                onClick={download}
                className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Download .txt
              </button>
            </div>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={12}
            className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 p-4 text-gray-900 dark:text-slate-100 leading-relaxed focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">
            OCR is rarely perfect — check the text above against the image, especially numbers,
            symbols and handwriting, before you rely on it.
          </p>
        </div>
      )}

      <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed border-t border-gray-200 dark:border-slate-700 pt-5">
        Recognition runs entirely in your browser — your image is never uploaded to a server. If you
        are converting material from a textbook or slide deck, remember that copying it into your own
        work still requires a citation.
      </p>
    </div>
  )
}
