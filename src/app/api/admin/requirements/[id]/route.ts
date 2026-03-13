import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin, apiResponse, apiError } from '@/lib/auth';
import { unlink } from 'fs/promises';
import { join } from 'path';

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

    // Get the requirement first to get the file path
    const requirement = await db.requirementFile.findUnique({
      where: { id },
    });

    if (!requirement) {
      return apiError('Requirement file not found', 404);
    }

    // Delete the file from filesystem
    const filePath = join(process.cwd(), 'public', requirement.filePath);
    try {
      await unlink(filePath);
    } catch (error) {
      console.error('Failed to delete file:', error);
      // Continue with database deletion even if file deletion fails
    }

    // Delete from database
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
