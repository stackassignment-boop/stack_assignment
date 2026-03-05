import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SamplePreviewModal from '@/components/samples/SamplePreviewModal'
import { useState } from 'react'

interface PageProps {
  params: {
    slug: string
  }
}

// Generate metadata for each sample
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const baseUrl = 'https://www.stackassignment.com'
    const res = await fetch(`${baseUrl}/api/samples/${params.slug}`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      return {
        title: 'Sample Not Found - Stack Assignment',
      }
    }

    const data = await res.json()
    const sample = data.sample

    return {
      title: `${sample.title} - Sample Preview | Stack Assignment`,
      description: sample.description || `Preview ${sample.title} academic writing sample. ${sample.pages} pages available.`,
      keywords: [sample.subject, sample.paperType, 'sample', 'academic writing'].filter(Boolean).join(', '),
      openGraph: {
        title: `${sample.title} - Sample Preview`,
        description: sample.description || `Preview this academic writing sample`,
        url: `${baseUrl}/samples/${sample.slug}`,
        type: 'website',
      },
    }
  } catch (error) {
    return {
      title: 'Sample Preview - Stack Assignment',
    }
  }
}

// Generate static params for all samples
export async function generateStaticParams() {
  try {
    const baseUrl = 'https://www.stackassignment.com'
    const res = await fetch(`${baseUrl}/api/samples?limit=100`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      return []
    }

    const data = await res.json()
    const samples = data.samples || []

    return samples.map((sample: { slug: string }) => ({
      slug: sample.slug,
    }))
  } catch (error) {
    console.error('Failed to generate static params for samples:', error)
    return []
  }
}

function SamplePageClient({ slug }: { slug: string }) {
  const [sample, setSample] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showPreview, setShowPreview] = useState(false)

  // This would be fetched on the server in a real implementation
  // For now, we'll use client-side fetching
  React.useEffect(() => {
    fetch(`/api/samples/${slug}`)
      .then(res => res.json())
      .then(data => {
        setSample(data.sample)
        setLoading(false)
        // Auto-open preview on page load
        setShowPreview(true)
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
          <button
            onClick={() => setShowPreview(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Preview Sample
          </button>
        </div>
      </main>
      {sample && (
        <SamplePreviewModal
          sample={sample}
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  )
}

import React from 'react'

export default function SamplePage({ params }: PageProps) {
  return <SamplePageClient slug={params.slug} />
}
