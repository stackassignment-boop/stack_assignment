import type { Metadata } from 'next'
import StudentDashboardRoute from '@/components/student/StudentDashboardRoute'

/**
 * `noindex` — everything behind this URL is a signed-in student's own orders.
 */
export const metadata: Metadata = {
  title: 'Student Dashboard',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <StudentDashboardRoute />
}
