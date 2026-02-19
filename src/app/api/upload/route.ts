import { NextRequest } from 'next/server';
import { apiResponse, apiError } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// POST /api/upload - Upload files (public for order attachments, admin for other types)
export async function POST(request: NextRequest) {
  console.log('Upload API called');
  
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    
    console.log('Files received:', files.length, files.map(f => ({ name: f.name, type: f.type, size: f.size })));
    
    if (!files || files.length === 0) {
      return apiError('No files provided', 400);
    }

    // Validate files
    const allowedTypes = [
      'application/pdf', 
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg', 
      'image/png', 
      'image/webp', 
      'image/gif',
      'text/plain',
      'application/zip',
      'application/x-zip-compressed'
    ];
    
    const maxSize = 20 * 1024 * 1024; // 20MB per file
    const maxTotalSize = 50 * 1024 * 1024; // 50MB total

    let totalSize = 0;
    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        console.log('Invalid file type:', file.type, 'for file:', file.name);
        return apiError(`Invalid file type: ${file.name}. Allowed: PDF, DOC, DOCX, Images, TXT, ZIP`, 400);
      }
      if (file.size > maxSize) {
        return apiError(`File ${file.name} exceeds 20MB limit`, 400);
      }
      totalSize += file.size;
    }
    
    if (totalSize > maxTotalSize) {
      return apiError('Total file size exceeds 50MB limit', 400);
    }

    const uploadedUrls: string[] = [];
    const uploadDir = 'uploads/orders';
    
    // Create upload directory if it doesn't exist
    const uploadPath = path.join(process.cwd(), 'public', uploadDir);
    console.log('Upload path:', uploadPath);
    
    if (!existsSync(uploadPath)) {
      console.log('Creating upload directory...');
      await mkdir(uploadPath, { recursive: true });
    }

    for (const file of files) {
      // Generate unique filename
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 8);
      const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const fileName = `${timestamp}-${randomStr}-${originalName}`;
      
      // Write file
      const filePath = path.join(uploadPath, fileName);
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filePath, buffer);
      
      console.log('File written:', filePath);

      // Add public URL
      uploadedUrls.push(`/${uploadDir}/${fileName}`);
    }

    console.log('Upload complete. URLs:', uploadedUrls);

    return apiResponse({
      success: true,
      message: 'Files uploaded successfully',
      urls: uploadedUrls,
      count: uploadedUrls.length,
    }, 201);
  } catch (error) {
    console.error('Upload error:', error);
    return apiError('Failed to upload files', 500);
  }
}
