import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/samples/[slug]/preview - Get sample preview info
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
        pages: true,
        isPublished: true,
        fileName: true,
        fileSize: true,
        subject: true,
        academicLevel: true,
        paperType: true,
        description: true,
      },
    });
    
    if (!sample) {
      return NextResponse.json({ error: 'Sample not found' }, { status: 404 });
    }
    
    // Increment view count
    await db.sample.update({
      where: { id: sample.id },
      data: { viewCount: { increment: 1 } },
    });
    
    const totalPages = sample.pages || 3;
    const previewPages = Math.max(1, Math.ceil(totalPages / 3));
    
    return NextResponse.json({
      title: sample.title,
      pages: totalPages,
      previewPages: previewPages,
      lockedPages: totalPages - previewPages,
      fileName: sample.fileName,
      fileSize: sample.fileSize,
      subject: sample.subject,
      academicLevel: sample.academicLevel,
      paperType: sample.paperType,
      description: sample.description,
    });
  } catch (error) {
    console.error('Preview sample error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
