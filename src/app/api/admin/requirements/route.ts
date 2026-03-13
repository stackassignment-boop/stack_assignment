import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin, apiResponse, apiError } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { z } from 'zod';

// Schema for creating a requirement file
const createRequirementSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  category: z.string().optional(),
});

// GET /api/admin/requirements - List all requirement files (admin only)
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAdmin();

    if (!authResult.success) {
      return apiError(authResult.error || 'Unauthorized', authResult.status || 401);
    }

    const requirements = await db.requirementFile.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return apiResponse({ requirements });
  } catch (error) {
    console.error('Get requirements error:', error);
    return apiError('Internal server error', 500);
  }
}

// POST /api/admin/requirements - Upload a new requirement file (admin only)
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAdmin();

    if (!authResult.success) {
      return apiError(authResult.error || 'Unauthorized', authResult.status || 401);
    }

    // Check if this is multipart form data (file upload)
    const contentType = request.headers.get('content-type') || '';

    if (!contentType.includes('multipart/form-data')) {
      return apiError('Content-Type must be multipart/form-data', 400);
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    // Extract other fields
    const title = formData.get('title') as string;
    const description = formData.get('description') as string | null;
    const category = formData.get('category') as string | null;

    if (!title || title.length < 3) {
      return apiError('Title must be at least 3 characters', 400);
    }

    // Validate file
    if (!file) {
      return apiError('No file provided', 400);
    }

    // Accept PDF, DOC, DOCX, and TXT files
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

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'requirements');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${timestamp}-${safeName}`;
    const filePath = join(uploadsDir, fileName);

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Save to database
    const requirement = await db.requirementFile.create({
      data: {
        title,
        description: description || null,
        category: category || null,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        filePath: `/uploads/requirements/${fileName}`,
      },
    });

    return apiResponse(
      {
        success: true,
        message: 'Requirement file uploaded successfully',
        requirement,
      },
      201
    );
  } catch (error) {
    console.error('Create requirement error:', error);
    return apiError('Internal server error', 500);
  }
}
