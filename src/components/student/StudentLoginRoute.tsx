'use client';

import { useSearchParams } from 'next/navigation';
import StudentLoginPage from '@/components/student/StudentLoginPage';
import { useRouteNavigate } from '@/lib/useRouteNavigate';

const DEFAULT_DESTINATION = '/student/dashboard';

/**
 * Only same-origin student paths are allowed as a post-login destination.
 *
 * Without this check, `/student/login?next=https://evil.example` (or the
 * protocol-relative `//evil.example`) would hand a freshly-authenticated
 * student straight to an attacker's page — a classic open redirect, and a
 * convincing one because it happens immediately after a genuine sign-in.
 */
function sanitiseNext(value: string | null): string {
  if (!value) return DEFAULT_DESTINATION;
  if (!value.startsWith('/')) return DEFAULT_DESTINATION;
  if (value.startsWith('//') || value.startsWith('/\\')) return DEFAULT_DESTINATION;
  if (!value.startsWith('/student/')) return DEFAULT_DESTINATION;
  return value;
}

/**
 * Client boundary for `/student/login`, following the OrderRoute pattern.
 *
 * No `onLogin` handler is passed. StudentLoginPage already sends the browser to
 * the destination itself once credentials check out, and NextAuth's `callbacks`
 * do the same for the Google flow; adding a second navigation here would race
 * with those.
 *
 * `next` is read with `useSearchParams()` rather than from `window.location` in
 * an effect. Arriving here is usually a soft navigation (SimilarityCheckRoute
 * calls `router.replace`), and an effect reading `window.location.search` would
 * still see the *previous* URL at that point — the same trap that used to send
 * empty quote requests from the order form.
 */
export default function StudentLoginRoute() {
  const navigate = useRouteNavigate();
  const searchParams = useSearchParams();
  const next = sanitiseNext(searchParams.get('next'));

  return <StudentLoginPage onNavigate={navigate} next={next} />;
}
