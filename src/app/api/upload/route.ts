import { NextRequest, NextResponse } from 'next/server';

// POST /api/upload - Upload files to Vercel Blob using REST API (no SDK)
export async function POST(request: NextRequest) {
  console.log('=== UPLOAD API v4 (REST only) ===');
  
  try {
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    
    if (!blobToken) {
      console.error('ERROR: BLOB_READ_WRITE_TOKEN not configured');
      return NextResponse.json(
        { error: 'File upload not configured. Please contact support.' },
        { status: 500 }
      );
    }
    
    console.log('Blob token found, length:', blobToken.length);
    
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
    
    console.log('File received:', file.name, file.size, 'bytes');
    
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
    
    console.log('Uploading to blob storage...');
    
    // Get file as ArrayBuffer and convert to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Upload using Vercel Blob REST API
    const blobUrl = `https://blob.vercel-storage.com/${filename}`;
    
    const uploadResponse = await fetch(blobUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${blobToken}`,
        'Content-Type': file.type || 'application/octet-stream',
      },
      body: buffer,
    });
    
    console.log('Blob API response status:', uploadResponse.status);
    
    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error('Blob upload failed:', uploadResponse.status, errorText);
      return NextResponse.json(
        { error: `Upload failed: ${uploadResponse.statusText}` },
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
    console.error('Error:', error);
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}
