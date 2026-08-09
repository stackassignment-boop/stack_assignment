import { Metadata } from 'next'
import RequirementsPageComponent from '@/components/requirements/RequirementsPage'
import { db } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Assignment & Coursework Help | Stack Assignment',
  description: 'Browse live assignment and coursework requirements and get expert help.',
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
