import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

// GET /api/samples/[slug]/download - Download sample file (Admin only)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Check if user is admin
    const authResult = await requireAdmin();
    
    if (!authResult.success) {
      return NextResponse.json({ 
        error: authResult.error || 'Access denied. Admin only.',
        contact: 'https://wa.me/919907300710'
      }, { status: authResult.status || 403 });
    }
    
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
    
    // Increment download count
    await db.sample.update({
      where: { id: sample.id },
      data: { downloadCount: { increment: 1 } },
    });
    
    // Return file with proper headers
    const headers = new Headers();
    headers.set('Content-Type', sample.fileType || 'application/pdf');
    headers.set('Content-Disposition', `attachment; filename="${sample.fileName || 'sample.pdf'}"`);
    headers.set('Content-Length', sample.fileSize?.toString() || sample.fileData.length.toString());
    
    return new NextResponse(sample.fileData, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Download sample error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
