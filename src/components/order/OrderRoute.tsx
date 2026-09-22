'use client';

import OrderPage from '@/components/order/OrderPage';
import { useRouteNavigate } from '@/lib/useRouteNavigate';

/**
 * Client boundary for the `/order` route. See PricingRoute for why this exists.
 * Without it, the "Back to Home" button on the order confirmation screen is dead.
 */
export default function OrderRoute() {
  const navigate = useRouteNavigate();

  return <OrderPage onNavigate={navigate} />;
}
