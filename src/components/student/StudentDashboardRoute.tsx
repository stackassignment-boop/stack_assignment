'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import StudentDashboard from '@/components/student/StudentDashboard';
import { useRouteNavigate } from '@/lib/useRouteNavigate';

/**
 * Client boundary for `/student/dashboard`.
 *
 * The first render is always the spinner, on the server and in the browser
 * alike: `useSession()` reports `loading` until the session request finishes,
 * which only ever happens client-side. That is what keeps this route free of
 * the hydration mismatch that the old `/?view=student-dashboard` URL had — the
 * two renders agree because neither one knows who the visitor is yet.
 *
 * When the visitor turns out not to be signed in they are sent to the login
 * page. The old view-router just fell through to the home page in that case
 * (`currentPage === 'student-dashboard' && studentUser`), so a signed-out
 * visitor following a dashboard link landed on the marketing site with no
 * explanation.
 */
export default function StudentDashboardRoute() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const navigate = useRouteNavigate();

  useEffect(() => {
    if (status === 'unauthenticated') {
      // `replace`, not `push`: the dashboard URL should not sit in the back
      // stack, or pressing Back from the login page bounces straight here again.
      router.replace('/student/login');
    }
  }, [status, router]);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  if (status !== 'authenticated' || !session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <StudentDashboard
      user={{
        name: session.user.name || 'Student',
        email: session.user.email || '',
      }}
      onNavigate={navigate}
      onLogout={handleLogout}
    />
  );
}
