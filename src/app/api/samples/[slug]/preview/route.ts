import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/samples/[slug]/preview - Get sample preview (1/3 of content)
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
        content: true,
        pages: true,
        isPublished: true,
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
    
    // Return only 1/3 of the content for preview
    let previewContent = sample.content || '';
    let fullContentLength = previewContent.length;
    
    if (previewContent && fullContentLength > 100) {
      // Show only 1/3 of the content
      const previewLength = Math.ceil(fullContentLength / 3);
      previewContent = previewContent.substring(0, previewLength);
    }
    
    return NextResponse.json({
      preview: previewContent,
      totalLength: fullContentLength,
      previewLength: previewContent.length,
      pages: sample.pages,
      title: sample.title,
    });
  } catch (error) {
    console.error('Preview sample error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
