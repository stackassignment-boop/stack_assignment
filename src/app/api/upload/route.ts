import { NextRequest, NextResponse } from 'next/server';

// POST /api/upload - Upload files to Vercel Blob using REST API
export async function POST(request: NextRequest) {
  console.log('=== UPLOAD API START v3 ===');
  
  try {
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    
    if (!blobToken) {
      console.error('ERROR: BLOB_READ_WRITE_TOKEN not configured');
      return NextResponse.json(
        { error: 'File upload not configured. Please contact support.' },
        { status: 500 }
      );
    }
    
    console.log('Blob token exists:', !!blobToken);
    
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
    
    console.log('Uploading with filename:', filename);
    
    // Get file as ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Upload directly using Vercel Blob REST API
    const uploadResponse = await fetch(
      `https://blob.vercel-storage.com/${filename}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${blobToken}`,
          'Content-Type': file.type || 'application/octet-stream',
          'x-content-type': file.type || 'application/octet-stream',
        },
        body: arrayBuffer,
      }
    );
    
    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error('Blob upload failed:', uploadResponse.status, errorText);
      return NextResponse.json(
        { error: `Upload failed: ${uploadResponse.status}` },
        { status: 500 }
      );
    }
    
    const blobData = await uploadResponse.json();
    console.log('Upload successful! URL:', blobData.url);
    
    return NextResponse.json({
      success: true,
      url: blobData.url,
      name: file.name,
      size: file.size,
      type: file.type,
    });
    
  } catch (error) {
    console.error('=== UPLOAD ERROR ===');
    console.error('Error type:', error?.constructor?.name);
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}
