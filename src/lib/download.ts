/**
 * Save a Blob to the user's machine from the browser.
 *
 * Both client-side tools (image OCR, PDF → Word) had their own copy of this,
 * and both copies had the same two faults:
 *
 *   1. The anchor was never added to the document. Chrome tolerates a click on
 *      a detached anchor; Firefox has historically not, so the download simply
 *      did nothing for some users with no error to explain it.
 *   2. `URL.revokeObjectURL` ran on the very next line. The click only *queues*
 *      the download, so revoking synchronously can pull the blob out from under
 *      it and produce a zero-byte or failed file.
 *
 * Revoking on a timeout rather than immediately is the standard workaround: the
 * download has taken its own reference by then, and the URL still gets released
 * rather than leaking for the life of the tab.
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')

  anchor.href = url
  anchor.download = filename
  anchor.rel = 'noopener'
  anchor.style.display = 'none'

  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)

  setTimeout(() => URL.revokeObjectURL(url), 10_000)
}

/**
 * Swap a file's extension, falling back to `fallback` when the original name is
 * empty. Keeps the download names in the tools consistent and stops a file
 * called `essay.final.pdf` from becoming `essay.docx`.
 */
export function withExtension(fileName: string, extension: string, fallback: string): string {
  const base = fileName.replace(/\.[^./\\]+$/, '').trim()
  return `${base || fallback}.${extension}`
}
