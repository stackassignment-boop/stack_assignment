# Stack Assignment — SEO & Conversion Phase 2

Date: 22 September 2026

## Main objective

Increase qualified organic visibility and bookings from Australian and UK university students while keeping the website positioned around tutoring, assessment guidance, proofreading, draft feedback and responsible academic support.

## Implemented

### 1. Country-specific landing pages

- `/australia/academic-support`
- `/uk/academic-support`

Each page has unique regional copy, university links, referencing styles, study resources and a direct support-request CTA.

### 2. Regional SEO signals

- Added canonical URLs.
- Added `en-AU` / `en-GB` alternate language-region annotations between the two landing pages.
- Added region-specific Open Graph locale metadata.
- Added direct AU/UK links to desktop and mobile navigation.
- Added AU/UK links to the footer.

### 3. Study-guide content hub

Added `/guides` plus six initial people-first guides:

- `/guides/apa-7-referencing-australia`
- `/guides/aglc4-referencing-australia`
- `/guides/read-assessment-brief-australia`
- `/guides/harvard-referencing-uk`
- `/guides/plan-uk-university-assignment`
- `/guides/dissertation-proofreading-checklist`

These are intended to attract informational searches and internally link visitors toward free tools, university pages and support requests.

### 4. Sitemap improvements

Added the AU landing page, UK landing page and guides hub to the sitemap.

User-uploaded requirement detail pages were removed from the sitemap because uploaded assessment material should not be treated as public SEO content.

### 5. Robots / privacy-oriented crawl controls

Corrected the student-route disallows to match the actual App Router paths:

- `/student/login/`
- `/student/dashboard/`
- `/student/similarity-check/`

Requirement detail URLs are also excluded from crawling and given `noindex` metadata.

### 6. Commercial wording cleanup

The order/pricing flow now uses **Worked Examples** rather than **Model Answers** as the customer-facing label.

The existing integrity-first positioning remains: the student owns the submission, while Stack Assignment provides tutoring, feedback, editing and study support.

## Important deployment step

After deployment:

1. Submit `https://www.stackassignment.com/sitemap.xml` in Google Search Console.
2. Request indexing for:
   - `/australia/academic-support`
   - `/uk/academic-support`
   - `/guides`
   - all six guide URLs
3. Inspect the canonical URL for several university pages.
4. Check Search Console Performance with country = Australia and country = United Kingdom.
5. Compare impressions, clicks, average position and CTR before/after deployment.
6. Check that Googlebot can fetch the site without geo/IP blocking.

## Recommended Phase 3

Use Search Console query data to build the next university and subject pages around actual impressions. Prioritise queries where Stack Assignment is already receiving impressions but has low CTR or ranks between positions 5–30.

Do not mass-produce near-identical university pages. Each new page should contain genuinely useful institution-specific information, assessment context, course areas, referencing guidance and internal links.
