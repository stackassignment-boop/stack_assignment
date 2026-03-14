import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SamplePageClient from '@/components/samples/SamplePageClient'
import { db } from '@/lib/db'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate metadata for each sample
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params

  try {
    const sample = await db.sample.findUnique({
      where: { slug },
    })

    if (!sample) {
      return {
        title: 'Sample Not Found - Stack Assignment',
      }
    }

    return {
      title: `${sample.title} - Sample Preview | Stack Assignment`,
      description: sample.description || `Preview ${sample.title} academic writing sample. ${sample.pages} pages available.`,
      keywords: [sample.subject, sample.paperType, 'sample', 'academic writing'].filter(Boolean).join(', '),
      openGraph: {
        title: `${sample.title} - Sample Preview`,
        description: sample.description || `Preview this academic writing sample`,
        url: `https://www.stackassignment.com/samples/${sample.slug}`,
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
    const samples = await db.sample.findMany({
      where: { isPublished: true },
      select: { slug: true },
    })

    return samples.map((sample) => ({
      slug: sample.slug,
    }))
  } catch (error) {
    console.error('Failed to generate params for samples:', error)
    return []
  }
}

export default async function SamplePage({ params }: PageProps) {
  const { slug } = await params
  return <SamplePageClient slug={slug} />
}
