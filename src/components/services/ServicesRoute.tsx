'use client';

import ServicesPage from '@/components/services/ServicesPage';
import { useRouteNavigate } from '@/lib/useRouteNavigate';

/**
 * Client boundary for the `/services` route. See PricingRoute for why this
 * exists. Without it the "Order Now" and "View Pricing" calls to action, plus
 * the per-service order links, are all dead.
 */
export default function ServicesRoute() {
  const navigate = useRouteNavigate();

  return <ServicesPage onNavigate={navigate} />;
}
