/**
 * Requirement page URLs.
 *
 * Detail pages used to live at `/requirements/{cuid}`, which carries no keyword
 * value at all. They now live at `/requirements/{slug}-{cuid}` so the unit code
 * and assessment type appear in the URL, which is one of the few on-page signals
 * that still moves long-tail rankings.
 *
 * The cuid stays on the end deliberately. It keeps lookups to a single indexed
 * `findUnique` instead of a table scan, it guarantees uniqueness without adding
 * a `slug` column (a schema change here would be pushed straight at the
 * production database by Vercel's build command), and it means every old
 * `/requirements/{cuid}` link still resolves.
 */

/** cuids are 25 chars, start with `c`, and are lowercase alphanumeric. */
const CUID = /^c[a-z0-9]{24}$/

/**
 * Turn a title into a URL segment: lowercase, alphanumerics and hyphens only,
 * no leading/trailing or repeated hyphens. Capped at 70 characters on a word
 * boundary — long enough for a unit code and assessment type, short enough that
 * the full URL stays readable in a search result.
 */
export function slugifyTitle(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  if (base.length <= 70) return base

  const cut = base.slice(0, 70)
  const lastHyphen = cut.lastIndexOf('-')
  return (lastHyphen > 40 ? cut.slice(0, lastHyphen) : cut).replace(/-+$/, '')
}

/** The canonical path for a requirement. */
export function requirementPath(req: { id: string; title: string }): string {
  const slug = slugifyTitle(req.title)
  return slug ? `/requirements/${slug}-${req.id}` : `/requirements/${req.id}`
}

/**
 * Pull the record id back out of a URL segment.
 *
 * Handles both the canonical `some-title-{cuid}` form and the legacy bare
 * `{cuid}` form. Returns null when the segment carries no cuid at all, which
 * the page turns into a 404 rather than a database round trip.
 */
export function extractRequirementId(segment: string): string | null {
  if (CUID.test(segment)) return segment

  const tail = segment.slice(segment.lastIndexOf('-') + 1)
  return CUID.test(tail) ? tail : null
}

/**
 * Whether a requirement has enough original prose to be worth putting in front
 * of Google.
 *
 * This is the gate that keeps the SEO play on the right side of two separate
 * problems. Thin pages published at scale damage site-wide quality signals, so
 * a page with a bare title and no explanation should never be indexed. And the
 * description is the *only* field rendered publicly, so requiring it to be
 * substantial is what makes the indexed page an original explanation of the
 * assessment rather than a republication of the brief.
 *
 * 300 characters is roughly 50 words — below that there is nothing for a search
 * engine to rank and nothing for a student to read.
 */
export const MIN_INDEXABLE_DESCRIPTION = 300

export function isIndexable(req: { description: string | null }): boolean {
  return (req.description?.trim().length ?? 0) >= MIN_INDEXABLE_DESCRIPTION
}

/**
 * Roughly what Google renders before truncating a title (~600px, which for
 * mixed-case text lands near 60 characters). Not a hard limit — a longer title
 * is legal and still indexed — but past it the tail stops being visible in the
 * result, and an overlong title makes Google likelier to discard it and write
 * its own from the page body.
 */
export const TITLE_TAG_BUDGET = 60

/**
 * Must mirror the template in `src/app/layout.tsx`. It is duplicated rather
 * than imported because that file is a server component pulling in the whole
 * metadata config, and this module is imported by the sitemap too.
 */
const BRAND_TITLE_SUFFIX = ' | Stack Assignment'

/**
 * Tried longest-first; the first one that still leaves room for the brand wins.
 * A bare unit code ranks for the code and nothing else, so the suffix is what
 * lets the page also match "<code> assignment help" — which is the query a
 * student actually types when they are looking for support rather than for the
 * unit's own handbook page.
 */
const SUPPORT_SUFFIXES = [
  ' — Assignment Help & Tutoring',
  ' — Assignment Help',
] as const

/**
 * Tidy a stored title for display in a title tag, without changing what the
 * owner wrote.
 *
 * Two defects show up in real uploads: stray whitespace (one live record is
 * `'TECH8000 ASSESSMENT 3 '`, whose trailing space renders a visible double
 * space before the separator) and all-caps entry, which reads as shouting in a
 * search result and is a documented reason Google rewrites a title.
 *
 * De-shouting only fires when the title contains no lowercase at all, so a
 * normally-typed title is returned untouched. Tokens containing a digit are
 * left alone so unit codes keep their case (`TECH8000`, not `Tech8000`), as are
 * short tokens so acronyms survive (`IT`, `ICT`, `AI`).
 */
export function normaliseRequirementTitle(raw: string): string {
  const collapsed = raw.replace(/\s+/g, ' ').trim()
  if (/[a-z]/.test(collapsed)) return collapsed

  return collapsed
    .split(' ')
    .map((word) =>
      /\d/.test(word) || word.length <= 3
        ? word
        : word.charAt(0) + word.slice(1).toLowerCase()
    )
    .join(' ')
}

/**
 * Build the `title` for a requirement's metadata.
 *
 * Returns a plain string when the brand still fits, letting the root layout's
 * template append it. Returns `{ absolute }` when it does not — which bypasses
 * the template entirely, so a long assessment title keeps all of its keywords
 * instead of having them truncated to make room for a brand that would itself
 * be cut off. The keyword is what the student searched for; the brand is not.
 */
export function requirementTitleTag(raw: string): string | { absolute: string } {
  const base = normaliseRequirementTitle(raw)

  const suffix =
    SUPPORT_SUFFIXES.find(
      (s) => base.length + s.length + BRAND_TITLE_SUFFIX.length <= TITLE_TAG_BUDGET
    ) ?? ''
  const withSupport = base + suffix

  return withSupport.length + BRAND_TITLE_SUFFIX.length <= TITLE_TAG_BUDGET
    ? withSupport
    : { absolute: withSupport }
}
