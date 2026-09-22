import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Permanent redirects from the site's original `?view=` URLs to real routes.
 *
 * The site was first built as a single page: everything lived at `/` and the
 * visible section was chosen by a `view` query param, which `src/app/page.tsx`
 * read out of `window.location.search` *during render*. Real routes were added
 * later, but the query-string URLs stayed reachable, and they were broken in two
 * separate ways.
 *
 * 1. Hydration. `/` is statically prerendered, so its HTML is built once with no
 *    query string and always contains the home page. A browser opening
 *    `/?view=order` got that home-page HTML and then immediately rendered the
 *    order form over the top of it, so React threw "Hydration failed because the
 *    server rendered HTML didn't match the client" and discarded the whole tree.
 *
 * 2. Search. `/?view=pricing` and `/pricing` served the same content on two
 *    URLs. Duplicates split whatever ranking signals each one earned, and a
 *    crawler cannot tell which to keep. A 308 tells it: keep the clean one.
 *
 * Redirecting rather than deleting matters because these URLs are in the wild —
 * in the index, in bookmarks, in any link anyone has shared since launch.
 */
const VIEW_ROUTES: Record<string, string> = {
  home: '/',
  services: '/services',
  pricing: '/pricing',
  samples: '/samples',
  blog: '/blog',
  order: '/order',
  requirements: '/requirements',
  about: '/about',
  contact: '/contact',
  terms: '/terms',
  privacy: '/privacy',
  integrity: '/integrity',
  tools: '/tools',
  universities: '/universities',
  admin: '/admin',
  'student-login': '/student/login',
  'student-dashboard': '/student/dashboard',
};

export function middleware(request: NextRequest) {
  const view = request.nextUrl.searchParams.get('view');

  // Nothing to do for ordinary requests to `/`.
  if (!view) return NextResponse.next();

  const url = request.nextUrl.clone();

  // Drop the param that triggered this redirect. Deleting it is what makes the
  // redirect terminal: the destination no longer matches this condition, so it
  // cannot bounce back here. Every other param survives — `?view=order&
  // subject=Dissertation` has to arrive at `/order?subject=Dissertation` or the
  // quote carried over from the pricing page is lost.
  url.searchParams.delete('view');

  if (view === 'blog-detail') {
    // This one carried its target in a second param: `&slug=my-post`. The real
    // route puts it in the path instead.
    const slug = url.searchParams.get('slug');
    url.searchParams.delete('slug');
    url.pathname = slug ? `/blog/${slug}` : '/blog';
  } else {
    // An unrecognised view was already being ignored by the old switch
    // statement, which fell through to the home page. Same outcome here, minus
    // the misleading URL.
    url.pathname = VIEW_ROUTES[view] ?? '/';
  }

  // 308 rather than 307: this is a permanent consolidation of two URLs into one,
  // and only a permanent redirect asks a crawler to transfer the old URL's
  // signals and stop re-requesting it.
  return NextResponse.redirect(url, 308);
}

/**
 * Only ever runs on `/`. The `view` param was only ever meaningful on the root
 * page, so matching just that one path keeps this off the hot path for the other
 * 127 routes, static assets and API handlers.
 */
export const config = {
  matcher: '/',
};
