import { Metadata } from 'next'
import RequirementsPageComponent from '@/components/requirements/RequirementsPage'
import { db } from '@/lib/db'
import { region } from '@/lib/seo-config'

const url = 'https://www.stackassignment.com/requirements'

export const metadata: Metadata = {
  title: 'Live Assessment Briefs | Assignment Support | Stack Assignment',
  description:
    'Browse assessment briefs students have shared and see the tutoring or editing support available for each. Tell us your unit and we will quote in AUD before you commit.',
  keywords: [
    'assessment brief help Australia',
    'assignment support Australia',
    'university coursework support',
    'unit assessment help Australia',
  ],
  alternates: { canonical: url },
  openGraph: {
    title: 'Live Assessment Briefs | Stack Assignment',
    description:
      'Assessment briefs students have shared, and the tutoring or editing support available for each.',
    url,
    type: 'website',
    locale: region.ogLocale,
  },
}

// Force fresh data on every request — this page is server-rendered from
// the database, and without this, Next.js would statically cache it at
// build time, meaning newly uploaded requirements wouldn't appear on the
// live site until the next deployment.
export const dynamic = 'force-dynamic'

export default async function RequirementsPage() {
  // Fetch server-side so crawlers (and the initial page load) see real
  // content immediately, instead of an empty loading state that only
  // populates after client-side JS fetches from /api/requirements.
  const requirements = await db.requirementFile.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      fileName: true,
      fileSize: true,
      fileType: true,
      filePath: true,
      createdAt: true,
    },
  })

  // Dates need to be serializable when passed from a server to a client
  // component.
  const serialized = requirements.map((r) => ({
    ...r,
    createdAt: r.createdAt.toISOString(),
  }))

  return <RequirementsPageComponent initialRequirements={serialized} />
}
