'use client';

import PricingPage from '@/components/pricing/PricingPage';
import { useRouteNavigate } from '@/lib/useRouteNavigate';

/**
 * Client boundary for the `/pricing` route.
 *
 * `src/app/pricing/page.tsx` is a server component (it exports `metadata`), so
 * it cannot supply the router-backed `onNavigate` callback itself. Without this
 * wrapper `onNavigate` is undefined and the quote calculator's "Proceed to
 * Order" button silently does nothing.
 */
export default function PricingRoute() {
  const navigate = useRouteNavigate();

  return <PricingPage onNavigate={navigate} />;
}
