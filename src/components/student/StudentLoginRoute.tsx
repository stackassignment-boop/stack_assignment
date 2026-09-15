'use client';

import StudentLoginPage from '@/components/student/StudentLoginPage';
import { useRouteNavigate } from '@/lib/useRouteNavigate';

/**
 * Client boundary for `/student/login`, following the OrderRoute pattern.
 *
 * No `onLogin` handler is passed. StudentLoginPage already sends the browser to
 * the dashboard itself once credentials check out, and NextAuth's `callbacks`
 * do the same for the Google flow; adding a second navigation here would race
 * with those.
 */
export default function StudentLoginRoute() {
  const navigate = useRouteNavigate();

  return <StudentLoginPage onNavigate={navigate} />;
}
