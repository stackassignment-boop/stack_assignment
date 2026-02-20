import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

// POST /api/upload - Upload files to Vercel Blob
// Version: 2 - Added comprehensive error handling
export async function POST(request: NextRequest) {
  console.log('=== UPLOAD API START ===');
  console.log('Environment check - BLOB token exists:', !!process.env.BLOB_READ_WRITE_TOKEN);
  
  try {
    // Check if Blob token is configured
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('ERROR: BLOB_READ_WRITE_TOKEN not configured');
      return NextResponse.json(
        { error: 'File upload not configured. Please contact support.' },
        { status: 500 }
      );
    }
    
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
      console.error('No file in formData');
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }
    
    console.log('File received:', file.name, file.size, 'bytes', file.type);
    
    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }
    
    // Generate safe filename
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `orders/${Date.now()}-${safeName}`;
    
    console.log('Uploading to blob with filename:', filename);
    
    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: 'public',
    });
    
    console.log('Upload successful! Blob URL:', blob.url);
    
    return NextResponse.json({
      success: true,
      url: blob.url,
      name: file.name,
      size: file.size,
      type: file.type,
    });
    
  } catch (error) {
    console.error('=== UPLOAD ERROR ===');
    console.error('Error type:', error?.constructor?.name);
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Full error:', error);
    
    // Return specific error message
    let errorMessage = 'Upload failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
