# Stack Assignment — Phase 3 Search Console Optimisation

Based on the supplied 3-month Google Search Console export.

## What the data showed

- Australia: 1,588 impressions, 4 clicks, 0.25% CTR, average position 26.19.
- United Kingdom: 138 impressions, 0 clicks, average position 38.50.
- Australia is therefore already receiving Google visibility; the export does not indicate a blanket Australia block.
- Several Australian pages are already receiving meaningful impressions while sitting around positions 14–30, making on-page optimisation and internal linking a higher-priority task than mass page creation.

## Priority pages optimised

1. Holmes Institute
2. Kaplan Business School
3. University of Newcastle
4. University of the Sunshine Coast (UniSC)
5. University of Western Australia (UWA)
6. CQUniversity (CQU)
7. Torrens University
8. Deakin University

## Search-intent signals used

Examples from the supplied export included:

- assignment help Newcastle — 79 impressions, position 22.28
- assignment help Sunshine Coast — 60 impressions, position 12.97
- Holmes Institute assignment help — 59 impressions, position 18.76
- Holmes assignment help — 37 impressions, position 22.11
- Kaplan assignment help — 165 impressions, position 40.16
- Kaplan Harvard referencing style — position 2.70
- Kaplan referencing guide — position 9.00
- University of Newcastle page — 124 impressions, position 25.33
- University of Sunshine Coast page — 89 impressions, position 14.84
- UWA page — 141 impressions, position 19.41
- CQU page — 99 impressions, position 18.36
- Torrens page — 91 impressions, position 28.01
- Deakin page — 60 impressions, position 24.55

## Changes made

### SERP metadata
Updated titles and descriptions on the priority pages to match the actual search intent more closely while keeping the service framed around academic support, assessment guidance, draft feedback, proofreading and referencing.

### Internal-link layer
Added a reusable `RegionalSeoLinks` component to priority pages. It links visitors to relevant study resources and the free tools hub, giving Google clearer topical relationships between commercial pages and useful informational content.

### New high-intent study guides
Added:

- `/guides/harvard-referencing-australia`
- `/guides/kaplan-harvard-referencing`
- `/guides/kbs-assessment-checklist`
- `/guides/cqu-apa-referencing`
- `/guides/deakin-vancouver-referencing`
- `/guides/torrens-marking-guide`
- `/guides/uwa-assignment-cover-sheet`
- `/guides/vun-turnitin`

The Guides hub and sitemap now include these pages.

## Important interpretation

Search Console data is evidence of Google visibility, not proof of ranking causation or conversion potential. The next measurement should compare impressions, clicks, CTR and position after the revised pages have had time to be recrawled.

## Deployment / measurement

After deployment:

1. Submit or resubmit `/sitemap.xml` in Google Search Console.
2. Inspect the eight priority URLs.
3. Request indexing where appropriate.
4. Compare Australia and UK performance after 4–8 weeks.
5. Track the exact queries above separately.
6. Do not create large numbers of near-duplicate university pages solely for keywords; expand only where Search Console data and genuinely useful student information support the page.

## Validation note

The source was syntax-checked with the system TypeScript compiler after the changes. Full Next.js type/build validation could not be completed because project dependencies could not be installed in this environment: the npm registry package cache was incomplete and network installation timed out. The reported TypeScript errors after syntax checking are dependency/type-environment errors rather than syntax errors in the new Phase 3 files.
