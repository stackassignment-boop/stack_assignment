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
