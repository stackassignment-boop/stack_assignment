import type { Metadata } from 'next'
import AdminPanel from '@/components/admin/AdminPanel'

/**
 * `noindex, nofollow` — this is a staff login screen. It was previously
 * reachable only as `/?view=admin`, i.e. as a query string on the home page,
 * which meant search engines had no way to tell it apart from `/` and the panel
 * inherited the home page's indexable metadata.
 */
export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
}

/**
 * This route used to be `redirect('/?view=admin')`, which is what caused the
 * hydration error on `/?view=admin`: the canonical route bounced to a query
 * string on the statically prerendered home page, so the server sent the home
 * page's HTML while the browser rendered the admin panel.
 *
 * AdminPanel manages its own authentication — it renders a loading spinner,
 * then either its own login form or the panel — so it can be rendered directly
 * here with no auth wrapper and no redirect. It deliberately does not sit
 * inside MainLayout: it supplies its own full-page chrome.
 */
export default function AdminRoute() {
  return <AdminPanel />
}
