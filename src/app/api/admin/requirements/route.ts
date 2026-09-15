import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin, apiResponse, apiError } from '@/lib/auth';
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
    console.log('Upload successful! URL:', blobData.url);

    // Save to database with Blob URL
    const requirement = await db.requirementFile.create({
      data: {
        title,
        description: description || null,
        category: category || null,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        filePath: blobData.url, // Use Blob URL instead of local path
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
