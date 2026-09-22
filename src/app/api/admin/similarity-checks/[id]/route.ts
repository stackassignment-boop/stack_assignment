import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin, apiResponse, apiError } from '@/lib/auth';
import { uploadToBlob, validateDocument } from '@/lib/blob';
import { isSimilarityStatus } from '@/lib/similarity';

// GET /api/admin/similarity-checks/[id] - full record including the student (admin only)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAdmin();

    if (!authResult.success) {
      return apiError(authResult.error || 'Unauthorized', authResult.status || 401);
    }

    const { id } = await params;

    const check = await db.similarityCheck.findUnique({
      where: { id },
      include: {
        customer: { select: { id: true, name: true, email: true, phone: true } },
      },
    });

    if (!check) {
      return apiError('Similarity check not found', 404);
    }

    return apiResponse({ check });
  } catch (error) {
    console.error('Get similarity check error:', error);
    return apiError('Internal server error', 500);
  }
}

// PATCH /api/admin/similarity-checks/[id] - attach the Turnitin report, or just
// move the submission along the queue (admin only).
//
// Accepts multipart/form-data when a report file is attached, or JSON when only
// the status / score / notes are changing.
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAdmin();

    if (!authResult.success) {
      return apiError(authResult.error || 'Unauthorized', authResult.status || 401);
    }

    const { id } = await params;

    const existing = await db.similarityCheck.findUnique({ where: { id } });

    if (!existing) {
      return apiError('Similarity check not found', 404);
    }

    const contentType = request.headers.get('content-type') || '';
    const isMultipart = contentType.includes('multipart/form-data');

    let status: string | null = null;
    let similarityScoreRaw: string | null = null;
    let adminNotes: string | null = null;
    let reportFile: File | null = null;

    if (isMultipart) {
      const formData = await request.formData();
      reportFile = formData.get('report') as File | null;
      status = (formData.get('status') as string) ?? null;
      similarityScoreRaw = (formData.get('similarityScore') as string) ?? null;
      adminNotes = (formData.get('adminNotes') as string) ?? null;
    } else {
      const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;

      if (!body) {
        return apiError('Invalid JSON body', 400);
      }

      status = typeof body.status === 'string' ? body.status : null;
      similarityScoreRaw =
        body.similarityScore === null || body.similarityScore === undefined
          ? null
          : String(body.similarityScore);
      adminNotes = typeof body.adminNotes === 'string' ? body.adminNotes : null;
    }

    const data: {
      status?: string;
      similarityScore?: number;
      adminNotes?: string | null;
      reviewedAt?: Date;
      reportFileName?: string;
      reportFileSize?: number;
      reportFileType?: string;
      reportFilePath?: string;
    } = {};

    if (status !== null && status !== '') {
      if (!isSimilarityStatus(status)) {
        return apiError('Unknown status', 400);
      }
      data.status = status;
    }

    if (similarityScoreRaw !== null && similarityScoreRaw !== '') {
      const score = Number.parseFloat(similarityScoreRaw);

      if (!Number.isFinite(score) || score < 0 || score > 100) {
        return apiError('Similarity score must be a number between 0 and 100', 400);
      }

      data.similarityScore = score;
    }

    if (adminNotes !== null) {
      data.adminNotes = adminNotes.trim() || null;
    }

    // A report file is optional on PATCH, but if one is attached it must be valid.
    const hasReportFile = Boolean(reportFile && typeof reportFile !== 'string' && reportFile.size > 0);

    if (hasReportFile) {
      const fileError = validateDocument(reportFile, 'report');
      if (fileError) {
        return apiError(fileError.error, fileError.status);
      }

      const upload = await uploadToBlob(reportFile as File, 'similarity-reports');

      if (!upload.ok) {
        return apiError(upload.error, upload.status);
      }

      data.reportFileName = (reportFile as File).name;
      data.reportFileSize = (reportFile as File).size;
      data.reportFileType = (reportFile as File).type;
      data.reportFilePath = upload.url;

      // Uploading the report is the act of completing the check, so default the
      // status rather than making the admin remember to set it too.
      if (!data.status) {
        data.status = 'complete';
      }
    }

    if (Object.keys(data).length === 0) {
      return apiError('Nothing to update', 400);
    }

    // Guard the one transition the student's page depends on: "complete" means
    // "there is a report to download", so refuse to complete without a file.
    const finalStatus = data.status ?? existing.status;
    const willHaveReport = hasReportFile || Boolean(existing.reportFilePath);

    if (finalStatus === 'complete' && !willHaveReport) {
      return apiError('Attach the similarity report before marking this check complete', 400);
    }

    if ((data.status && data.status !== existing.status) || hasReportFile) {
      data.reviewedAt = new Date();
    }

    const check = await db.similarityCheck.update({
      where: { id },
      data,
      include: {
        customer: { select: { id: true, name: true, email: true } },
      },
    });

    return apiResponse({ success: true, message: 'Similarity check updated', check });
  } catch (error) {
    console.error('Update similarity check error:', error);
    return apiError('Internal server error', 500);
  }
}

// DELETE /api/admin/similarity-checks/[id] - remove a submission (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAdmin();

    if (!authResult.success) {
      return apiError(authResult.error || 'Unauthorized', authResult.status || 401);
    }

    const { id } = await params;

    const existing = await db.similarityCheck.findUnique({ where: { id } });

    if (!existing) {
      return apiError('Similarity check not found', 404);
    }

    await db.similarityCheck.delete({ where: { id } });

    return apiResponse({ success: true, message: 'Similarity check deleted' });
  } catch (error) {
    console.error('Delete similarity check error:', error);
    return apiError('Internal server error', 500);
  }
}
