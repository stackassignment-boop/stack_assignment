import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SamplePageClient from '@/components/samples/SamplePageClient'

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

export default function SamplePage({ params }: PageProps) {
  return <SamplePageClient slug={params.slug} />
}
