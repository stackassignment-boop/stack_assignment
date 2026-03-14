import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin, apiResponse, apiError } from '@/lib/auth';
import { z } from 'zod';

// Schema for updating a requirement file
const updateRequirementSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').optional(),
  description: z.string().optional(),
  category: z.string().optional(),
});

// PUT /api/admin/requirements/[id] - Update a requirement file (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await requireAdmin();

    if (!authResult.success) {
      return apiError(authResult.error || 'Unauthorized', authResult.status || 401);
    }

    const id = params.id;

    // Check if requirement exists
    const requirement = await db.requirementFile.findUnique({
      where: { id },
    });

    if (!requirement) {
      return apiError('Requirement file not found', 404);
    }

    // Check if this is multipart form data (file upload) or JSON
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      // Handle file upload along with metadata update
      const formData = await request.formData();
      const file = formData.get('file') as File | null;

      // Extract other fields (will be null if not provided)
      const title = formData.get('title') as string | null;
      const description = formData.get('description') as string | null;
      const category = formData.get('category') as string | null;

      console.log('PUT request received:', {
        id,
        hasTitle: title !== null,
        title: title,
        hasDescription: description !== null,
        description: description,
        hasCategory: category !== null,
        category: category,
        hasFile: file !== null,
      });

      // Validate at least one field is being updated
      // Note: formData.get() returns null for missing fields, empty string for empty values
      if (!title && !description && !category && !file) {
        console.log('Validation failed: No fields provided');
        return apiError('At least one field must be provided for update', 400);
      }

      // Build update data object - only include fields that were actually provided
      const updateData: any = {};

      if (title !== null) {
        // Validate title if provided
        if (title.length < 3) {
          console.log('Validation failed: Title too short', { title, length: title.length });
          return apiError('Title must be at least 3 characters', 400);
        }
        updateData.title = title;
      }
      if (description !== null) {
        updateData.description = description;
      }
      if (category !== null) {
        updateData.category = category;
      }

      console.log('Update data prepared:', updateData);

      // If file is provided, upload it
      if (file) {
        // Validate file type
        const allowedTypes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'text/plain',
        ];

        if (!allowedTypes.includes(file.type)) {
          return apiError(
            'Invalid file type. Only PDF, DOC, DOCX, and TXT files are allowed.',
            400
          );
        }

        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
          return apiError('File size exceeds 10MB limit', 400);
        }

        // Upload to Vercel Blob storage
        const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

        if (!blobToken) {
          console.error('BLOB_READ_WRITE_TOKEN not configured');
          return apiError('File upload not configured. Please contact support.', 500);
        }

        // Generate safe filename
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const fileName = `requirements/${Date.now()}-${safeName}`;
        const blobUrl = `https://blob.vercel-storage.com/${fileName}`;

        // Get file as ArrayBuffer and convert to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload using Vercel Blob REST API
        const uploadResponse = await fetch(blobUrl, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${blobToken}`,
            'Content-Type': file.type || 'application/octet-stream',
          },
          body: buffer,
        });

        if (!uploadResponse.ok) {
          const errorText = await uploadResponse.text();
          console.error('Blob upload failed:', uploadResponse.status, errorText);
          return apiError(`Upload failed: ${uploadResponse.statusText}`, 500);
        }

        const blobData = await uploadResponse.json();
        updateData.fileName = file.name;
        updateData.fileSize = file.size;
        updateData.fileType = file.type;
        updateData.filePath = blobData.url;
      }

      // Update the requirement
      console.log('Updating requirement in database with data:', updateData);
      const updatedRequirement = await db.requirementFile.update({
        where: { id },
        data: updateData,
      });

      console.log('Requirement updated successfully:', updatedRequirement);

      return apiResponse({
        success: true,
        message: 'Requirement file updated successfully',
        requirement: updatedRequirement,
      });
    } else {
      // Handle JSON update (metadata only)
      const body = await request.json();
      const validation = updateRequirementSchema.safeParse(body);

      if (!validation.success) {
        return apiError(validation.error.errors[0].message, 400);
      }

      const { title, description, category } = validation.data;

      // Build update data object
      const updateData: any = {};
      if (title) updateData.title = title;
      if (description !== undefined) updateData.description = description;
      if (category !== undefined) updateData.category = category;

      // Update the requirement
      const updatedRequirement = await db.requirementFile.update({
        where: { id },
        data: updateData,
      });

      return apiResponse({
        success: true,
        message: 'Requirement file updated successfully',
        requirement: updatedRequirement,
      });
    }
  } catch (error) {
    console.error('Update requirement error:', error);
    return apiError('Internal server error', 500);
  }
}

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
