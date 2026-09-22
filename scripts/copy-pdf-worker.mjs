// Copies the pdf.js worker out of node_modules and into public/ so the
// PDF → Word tool can load it from our own origin.
//
// Why this exists: the tool previously pointed GlobalWorkerOptions.workerSrc at
// `//unpkg.com/pdfjs-dist@<version>/legacy/build/pdf.worker.min.mjs`. That had
// three problems.
//
//   1. It put a third-party CDN on the critical path of a tool that otherwise
//      runs entirely in the browser. If unpkg is slow, down, or blocked — which
//      it is on plenty of university and corporate networks — the tool failed
//      with the generic "Could not read that PDF" message and no way for the
//      student to tell why.
//   2. It mixed builds. `import('pdfjs-dist')` resolves to the modern
//      build/pdf.mjs, but the URL asked for the *legacy* worker. pdf.js expects
//      both halves to come from the same build.
//   3. It leaked a request to unpkg on every conversion, which tells a third
//      party that someone on our site is converting a document.
//
// Copying from node_modules (rather than committing the file) is what keeps the
// worker and the API in lockstep. pdf.js hard-fails with "The API version does
// not match the Worker version" if they drift, so a checked-in copy would break
// the tool the first time anyone bumped pdfjs-dist.

import { copyFile, mkdir, readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const destinationDir = join(projectRoot, 'public', 'pdf-worker')
const destination = join(destinationDir, 'pdf.worker.min.mjs')

async function main() {
  let packageJsonPath
  try {
    packageJsonPath = require.resolve('pdfjs-dist/package.json')
  } catch {
    // Not an error worth failing the build over: the rest of the site does not
    // depend on pdfjs-dist, and the tool degrades to an error message.
    console.warn('[pdf-worker] pdfjs-dist is not installed — skipping worker copy.')
    return
  }

  const { version } = JSON.parse(await readFile(packageJsonPath, 'utf8'))
  const source = join(dirname(packageJsonPath), 'build', 'pdf.worker.min.mjs')

  await mkdir(destinationDir, { recursive: true })
  await copyFile(source, destination)

  console.log(`[pdf-worker] copied pdfjs-dist@${version} worker to public/pdf-worker/`)
}

main().catch((error) => {
  console.error('[pdf-worker] copy failed:', error)
  process.exitCode = 1
})
