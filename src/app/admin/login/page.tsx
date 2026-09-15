import type { Metadata } from 'next'
import { permanentRedirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
}

/**
 * There is no separate admin login screen: AdminPanel renders its own login
 * form whenever there is no authenticated admin session, so `/admin` already
 * *is* the login page. This route exists only because the URL was in use, and
 * it now forwards to the real one.
 *
 * `permanentRedirect` (308) rather than `redirect` (307) because this is a
 * permanent consolidation of two URLs into one, and a permanent redirect is
 * what tells a crawler to stop requesting the old path. Safe from looping:
 * `/admin` renders the panel and no longer redirects anywhere.
 */
export default function AdminLoginRoute() {
  permanentRedirect('/admin')
}
