import type { Metadata } from 'next'
import StudentLoginRoute from '@/components/student/StudentLoginRoute'

/**
 * `noindex` — a sign-in form has nothing for a search engine to rank, and
 * indexing it splits traffic that belongs on the marketing pages.
 */
export const metadata: Metadata = {
  title: 'Student Sign In',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <StudentLoginRoute />
}
