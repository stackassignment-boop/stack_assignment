'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import MainLayout from '@/components/layout/MainLayout';
import SimilarityCheckPanel from '@/components/student/SimilarityCheckPanel';

/**
 * Client boundary for `/student/similarity-check`.
 *
 * Same shape as StudentDashboardRoute: the first render is the spinner on the
 * server and in the browser alike, because `useSession()` reports `loading`
 * until the session request resolves client-side. That is what keeps this route
 * free of a hydration mismatch.
 *
 * Signed-out visitors are sent to the login page with `next` set, so the public
 * "check my draft" CTA on /tools/similarity-report brings them back here after
 * they sign in rather than dumping them on the dashboard.
 */
export default function SimilarityCheckRoute() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/student/login?next=/student/similarity-check');
    }
  }, [status, router]);

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {status !== 'authenticated' ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : (
          <SimilarityCheckPanel />
        )}
      </div>
    </MainLayout>
  );
}
