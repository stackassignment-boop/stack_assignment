'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Maps the app's internal page keys to real routes.
 *
 * The site grew in two layers: originally everything lived on `/` behind a
 * `?view=` query param, and later real SEO routes (`/pricing`, `/order`, ...)
 * were added. Every key now has a real route — the `?view=` layer is gone, and
 * `src/middleware.ts` permanently redirects the old query-string URLs here.
 *
 * Keep this table complete. A key that is missing from it falls through to the
 * home page, so a missing entry shows up as a call to action that appears to do
 * nothing — which is exactly how the original `?view=contact` bug behaved.
 */
const PAGE_ROUTES: Record<string, string> = {
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
  // `blog-detail` is handled separately below: it needs the slug in the path
  // (`/blog/my-post`) rather than as a query param.
};

/** Page keys whose canonical route embeds a param in the path. */
const SLUG_ROUTES: Record<string, { base: string; param: string }> = {
  'blog-detail': { base: '/blog', param: 'slug' },
};

export type NavigateFn = (page: string, params?: Record<string, string>) => void;

/**
 * Returns a navigate function suitable for the `onNavigate` prop that page
 * components expect, backed by the Next.js router.
 *
 * Any `params` are appended as query string values so that receiving pages can
 * read them from `window.location.search` — this is how the pricing quote and
 * the visitor's contact details are carried into the order form.
 */
export function useRouteNavigate(): NavigateFn {
  const router = useRouter();

  return useCallback(
    (page: string, params?: Record<string, string>) => {
      const query = new URLSearchParams();
      let hasDataParams = false;

      // A slug-in-path route consumes one param from the query and puts it in
      // the path instead, so pull it out before building the query string.
      const slugRoute = SLUG_ROUTES[page];
      const pathParam = slugRoute ? params?.[slugRoute.param] : undefined;

      if (params) {
        for (const [key, value] of Object.entries(params)) {
          if (slugRoute && key === slugRoute.param) continue;
          // Skip empty values so we don't produce `?phone=` for optional fields.
          if (value) {
            query.set(key, value);
            hasDataParams = true;
          }
        }
      }

      let path: string;
      if (slugRoute) {
        // Without a slug there is nothing to show, so fall back to the index.
        path = pathParam ? `${slugRoute.base}/${pathParam}` : slugRoute.base;
      } else {
        path = PAGE_ROUTES[page] ?? '/';
      }

      const queryString = query.toString();
      const href = queryString ? `${path}?${queryString}` : path;

      // Use a full page load when the destination reads values straight out of
      // `window.location.search` (see OrderPage's mount effect). A full load
      // makes the search string authoritative before any component code runs,
      // which removes any dependence on when the router commits history.
      //
      // Plain in-app navigation stays on the soft router so ordinary
      // header/footer clicks remain instant.
      if (hasDataParams) {
        window.location.href = href;
        return;
      }

      router.push(href);
    },
    [router],
  );
}
