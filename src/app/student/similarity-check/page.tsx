import type { Metadata } from 'next'
import SimilarityCheckRoute from '@/components/student/SimilarityCheckRoute'

/**
 * `noindex` — everything behind this URL is a signed-in student's own drafts.
 */
export const metadata: Metadata = {
  title: 'Similarity Check',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <SimilarityCheckRoute />
}
