/**
 * Shared constants for the similarity-check workflow.
 *
 * A student uploads a document; an admin runs it through the institutional
 * Turnitin account off-platform and uploads the resulting report back.
 * Status values are stored as plain strings in Postgres (the schema uses no
 * enums anywhere), so this list is the single source of truth for both the
 * API routes and the UI.
 */

export const SIMILARITY_STATUSES = ['pending', 'in_review', 'complete', 'rejected'] as const;

export type SimilarityStatus = (typeof SIMILARITY_STATUSES)[number];

export const SIMILARITY_STATUS_LABELS: Record<SimilarityStatus, string> = {
  pending: 'Awaiting review',
  in_review: 'In review',
  complete: 'Report ready',
  rejected: 'Not accepted',
};

export const SIMILARITY_STATUS_DESCRIPTIONS: Record<SimilarityStatus, string> = {
  pending: 'We have your document and it is queued for checking.',
  in_review: 'Your document is being checked now.',
  complete: 'Your similarity report is ready to download.',
  rejected: 'We could not process this submission. See the note below.',
};

export function isSimilarityStatus(value: string): value is SimilarityStatus {
  return (SIMILARITY_STATUSES as readonly string[]).includes(value);
}

/**
 * Human-quotable reference, same shape as generateOrderNumber() in @/lib/auth
 * but prefixed SC- so support can tell a similarity check from an order at a
 * glance.
 */
export function generateSimilarityRef(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SC-${timestamp}-${random}`;
}
