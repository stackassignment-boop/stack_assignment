import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

// POST /api/upload - Upload files to Vercel Blob
export async function POST(request: NextRequest) {
  console.log('=== UPLOAD API START ===');
  
  try {
    const contentType = request.headers.get('content-type') || '';
    console.log('Content-Type:', contentType);
    
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Content-Type must be multipart/form-data' },
        { status: 400 }
      );
    }
    
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }
    
    console.log('File received:', file.name, file.size, 'bytes');
    
    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }
    
    // Upload to Vercel Blob
    const blob = await put(`orders/${Date.now()}-${file.name}`, file, {
      access: 'public',
    });
    
    console.log('File uploaded to blob:', blob.url);
    
    return NextResponse.json({
      success: true,
      url: blob.url,
      name: file.name,
      size: file.size,
      type: file.type,
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}
