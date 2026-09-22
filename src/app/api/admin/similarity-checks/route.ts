import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin, apiResponse, apiError } from '@/lib/auth';
import { isSimilarityStatus } from '@/lib/similarity';

// GET /api/admin/similarity-checks - list submissions awaiting a report (admin only)
//
// Optional query params:
//   ?status=pending|in_review|complete|rejected
//   ?take=50 (1-200, default 100)
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAdmin();

    if (!authResult.success) {
      return apiError(authResult.error || 'Unauthorized', authResult.status || 401);
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    if (status && !isSimilarityStatus(status)) {
      return apiError('Unknown status filter', 400);
    }

    const parsedTake = Number.parseInt(searchParams.get('take') || '', 10);
    const take = Number.isFinite(parsedTake)
      ? Math.min(Math.max(parsedTake, 1), 200)
      : 100;

    const checks = await db.similarityCheck.findMany({
      where: status ? { status } : undefined,
      // Oldest first: the queue should be worked front to back.
      orderBy: { createdAt: 'asc' },
      take,
      include: {
        customer: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    const counts = await db.similarityCheck.groupBy({
      by: ['status'],
      _count: { _all: true },
    });

    return apiResponse({
      checks,
      counts: Object.fromEntries(counts.map((c) => [c.status, c._count._all])),
    });
  } catch (error) {
    console.error('Get similarity checks error:', error);
    return apiError('Internal server error', 500);
  }
}
