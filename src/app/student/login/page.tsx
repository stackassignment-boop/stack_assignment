import type { Metadata } from 'next'
import { Suspense } from 'react'
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
  // StudentLoginRoute reads ?next= with useSearchParams(), which opts the route
  // into client rendering; the Suspense boundary is what Next requires to keep
  // the rest of the page statically renderable.
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      }
    >
      <StudentLoginRoute />
    </Suspense>
  )
}
