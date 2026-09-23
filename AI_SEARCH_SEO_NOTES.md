# Google AI Search SEO implementation

This phase follows Google Search Central's current guidance for AI Overviews and AI Mode. There is no special AI schema or `llms.txt` requirement. The implementation therefore strengthens ordinary crawlability, internal linking, textual answers, page structure, structured data where appropriate, and people-first content.

## Implemented
- Guide pages now expose a concise visible "Quick answer" near the top of the article.
- Guide pages use clear H2 sections and an on-page contents navigation.
- Guide pages emit Article + BreadcrumbList JSON-LD matching visible content.
- Guide pages identify the publisher as Stack Assignment and link to the site/entity graph already emitted in the root layout.
- Guide pages expose a review date to make maintenance/freshness clearer.
- Existing Organization + WebSite JSON-LD remains sitewide.
- Existing canonical URLs, sitemap and robots controls remain in place.

## Google Search Console actions after deployment
1. Open Search Console and confirm the property includes the production URL.
2. Use URL Inspection on the homepage, `/guides`, and the eight GSC-priority university pages.
3. Request indexing for changed pages where appropriate.
4. Submit `/sitemap.xml`.
5. Check the Search Console Generative AI performance report when available for the property and compare AI-feature impressions/clicks with the Web performance report.
6. Review queries that cause AI visibility and expand only when there is a genuine user-information gap.

## What was intentionally not added
- No `llms.txt` dependency. Google states that Google Search does not use `llms.txt` or special AI markup for AI Overviews/AI Mode.
- No keyword-stuffed or mass-generated pages.
- No hidden text or AI-only content.
- No guarantee of inclusion in AI Overviews or AI Mode; Google explicitly says eligibility does not guarantee serving.
