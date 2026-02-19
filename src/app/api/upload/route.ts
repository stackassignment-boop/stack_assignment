import { NextRequest } from 'next/server';
import { requireAdmin, apiResponse, apiError } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// POST /api/upload - Upload a file (admin only)
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAdmin();
    
    if (!authResult.success) {
      return apiError(authResult.error || 'Unauthorized', authResult.status || 401);
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return apiError('No file provided', 400);
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return apiError('Invalid file type. Only PDF, JPEG, PNG, WebP, and GIF files are allowed.', 400);
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return apiError('File size exceeds 10MB limit', 400);
    }

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const extension = path.extname(originalName);
    const fileName = `${timestamp}-${originalName}`;
    
    // Determine upload directory based on file type
    let uploadDir = 'uploads/files';
    if (file.type === 'application/pdf') {
      uploadDir = 'uploads/samples';
    } else if (file.type.startsWith('image/')) {
      uploadDir = 'uploads/images';
    }

    // Create upload directory if it doesn't exist
    const uploadPath = path.join(process.cwd(), 'public', uploadDir);
    if (!existsSync(uploadPath)) {
      await mkdir(uploadPath, { recursive: true });
    }

    // Write file
    const filePath = path.join(uploadPath, fileName);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Return public URL
    const publicUrl = `/${uploadDir}/${fileName}`;

    return apiResponse({
      success: true,
      message: 'File uploaded successfully',
      file: {
        name: fileName,
        url: publicUrl,
        type: file.type,
        size: file.size,
      },
    }, 201);
  } catch (error) {
    console.error('Upload error:', error);
    return apiError('Failed to upload file', 500);
  }
}
