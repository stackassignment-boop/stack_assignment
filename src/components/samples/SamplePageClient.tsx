'use client'

import { useState, useEffect } from 'react'
import SamplePreviewModal from './SamplePreviewModal'

interface SamplePageClientProps {
  slug: string
}

export default function SamplePageClient({ slug }: SamplePageClientProps) {
  const [sample, setSample] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    fetch(`/api/samples/${slug}`)
      .then(res => res.json())
      .then(data => {
        setSample(data.sample)
        setLoading(false)
        // Only auto-open the PDF preview modal when a real file is
        // attached — for content-only samples, the article text below
        // is the actual content, so there's nothing for the modal to show.
        if (data.sample?.fileName) {
          setShowPreview(true)
        }
      })
      .catch(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </main>
    )
  }

  if (!sample) {
    return (
      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Sample Not Found</h1>
          <a href="/samples" className="text-indigo-600 hover:underline">
            ← Back to Samples
          </a>
        </div>
      </main>
    )
  }

  const hasFile = Boolean(sample.fileName)

  return (
    <>
      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-6">
          <a href="/samples" className="text-indigo-600 hover:underline mb-6 inline-block">
            ← Back to Samples
          </a>
          <h1 className="text-3xl font-bold mb-4">{sample.title}</h1>
          {sample.description && (
            <p className="text-gray-600 mb-6">{sample.description}</p>
          )}

          {hasFile ? (
            <button
              onClick={() => setShowPreview(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              Preview Sample
            </button>
          ) : sample.content ? (
            <div
              className="prose prose-slate max-w-none mt-8 bg-white rounded-xl shadow p-6"
              dangerouslySetInnerHTML={{ __html: sample.content }}
            />
          ) : (
            <div className="bg-white rounded-xl shadow p-8 text-center mt-8">
              <p className="text-gray-600 mb-4">
                A full preview for this sample hasn't been uploaded yet.
              </p>
              <a
                href={`/order?subject=${encodeURIComponent(sample.title)}`}
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition"
              >
                Order a Similar Sample
              </a>
            </div>
          )}
        </div>
      </main>
      {sample && hasFile && (
        <SamplePreviewModal
          sample={sample}
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  )
}
