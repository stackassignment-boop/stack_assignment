import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

// GET /api/samples/[slug]/download - Download sample file
// Note: PDF preview needs to fetch this endpoint to render pages
// Actual download is restricted to admin users via Content-Disposition header
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    const sample = await db.sample.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        fileData: true,
        fileName: true,
        fileType: true,
        fileSize: true,
        isPublished: true,
      },
    });
    
    if (!sample) {
      return NextResponse.json({ error: 'Sample not found' }, { status: 404 });
    }
    
    // Check if file exists
    if (!sample.fileData) {
      return NextResponse.json({ error: 'No file attached to this sample' }, { status: 404 });
    }
    
    // Check if user is admin
    const authResult = await requireAdmin();
    const isAdmin = authResult.success;
    
    // Increment view/download count
    await db.sample.update({
      where: { id: sample.id },
      data: { downloadCount: { increment: 1 } },
    });
    
    // Return file with proper headers
    const headers = new Headers();
    headers.set('Content-Type', sample.fileType || 'application/pdf');
    headers.set('Content-Length', sample.fileSize?.toString() || sample.fileData.length.toString());
    
    // Only allow download as attachment for admin users
    // For non-admin users, the PDF can be rendered in browser but not downloaded
    if (isAdmin) {
      headers.set('Content-Disposition', `attachment; filename="${sample.fileName || 'sample.pdf'}"`);
    } else {
      // For preview - allow rendering but discourage download
      headers.set('Content-Disposition', 'inline');
      // Add CORS headers for preview
      headers.set('Cache-Control', 'no-store');
    }
    
    return new NextResponse(sample.fileData, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Download sample error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
