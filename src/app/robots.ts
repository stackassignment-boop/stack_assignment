import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // `/requirements/` used to be listed here. It was removed deliberately.
      //
      // A `Disallow` is not a request to keep a page out of the index — it is a
      // request not to *fetch* it. Whether a requirement page belongs in the
      // index is now decided per-record by the robots meta tag the page itself
      // returns (see `isIndexable` in src/lib/requirement-url.ts), and a crawler
      // has to fetch the page to read that tag. Leaving the disallow in place
      // would mean Google never sees either answer: the substantial pages could
      // not rank, and the thin ones could still surface as a bare URL, because a
      // blocked page's `noindex` is unreadable. Allowing the crawl is what makes
      // the meta tag authoritative in both directions.
      //
      // The uploaded document is not reachable from these rules either way — it
      // is served from Vercel Blob storage on a different host.
      disallow: [
        '/api/',
        '/admin/',
        '/student/login/',
        '/student/dashboard/',
        '/student/similarity-check/',
      ],
    },
    sitemap: 'https://www.stackassignment.com/sitemap.xml',
  }
}
