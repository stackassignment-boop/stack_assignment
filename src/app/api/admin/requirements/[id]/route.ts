import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin, apiResponse, apiError } from '@/lib/auth';

// DELETE /api/admin/requirements/[id] - Delete a requirement file (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await requireAdmin();

    if (!authResult.success) {
      return apiError(authResult.error || 'Unauthorized', authResult.status || 401);
    }

    const id = params.id;

    // Get the requirement first to verify it exists
    const requirement = await db.requirementFile.findUnique({
      where: { id },
    });

    if (!requirement) {
      return apiError('Requirement file not found', 404);
    }

    // Delete from database only (file remains in Blob storage but that's okay)
    await db.requirementFile.delete({
      where: { id },
    });

    return apiResponse({
      success: true,
      message: 'Requirement file deleted successfully',
    });
  } catch (error) {
    console.error('Delete requirement error:', error);
    return apiError('Internal server error', 500);
  }
}
