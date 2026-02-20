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
        fileName: true,
        fileSize: true,
        fileType: true,
        fileData: true,
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
    
    // Determine preview content
    let previewContent = '';
    let totalLength = 0;
    
    // Priority: content field > description > file info
    if (sample.content && sample.content.length > 50) {
      // Text content available - show 1/3rd
      totalLength = sample.content.length;
      const previewLength = Math.ceil(totalLength / 3);
      previewContent = sample.content.substring(0, previewLength);
    } else if (sample.description && sample.description.length > 20) {
      // Use description for preview
      previewContent = `Sample Preview\n\nSubject: ${sample.subject || 'N/A'}\nAcademic Level: ${sample.academicLevel || 'N/A'}\nPaper Type: ${sample.paperType || 'N/A'}\n\n${sample.description}\n\n---\n\nThis is a preview of the sample document. The full document contains ${sample.pages || 'multiple'} pages.\n\nTo access the complete document, please contact us via WhatsApp.`;
      totalLength = previewContent.length;
    } else if (sample.fileData) {
      // File-based sample - show metadata
      const fileSizeKB = sample.fileSize ? (sample.fileSize / 1024).toFixed(1) : 'Unknown';
      previewContent = `PDF Document Preview\n\n📄 File: ${sample.fileName || 'sample.pdf'}\n📊 Size: ${fileSizeKB} KB\n📋 Pages: ${sample.pages || 'N/A'}\n\nSubject: ${sample.subject || 'N/A'}\nAcademic Level: ${sample.academicLevel || 'N/A'}\nPaper Type: ${sample.paperType || 'N/A'}\n\n${sample.description ? `Description:\n${sample.description}\n\n` : ''}---\n\nThis PDF document is available for preview. The first ${Math.ceil((sample.pages || 3) / 3)} page(s) are shown above.\n\nTo access the complete document, please contact us via WhatsApp.`;
      totalLength = sample.fileSize || 0;
    } else {
      // Fallback
      previewContent = sample.description || 'No preview content available. Please contact admin for full access.';
      totalLength = previewContent.length;
    }
    
    return NextResponse.json({
      preview: previewContent,
      totalLength: totalLength,
      previewLength: previewContent.length,
      pages: sample.pages,
      title: sample.title,
      hasFile: !!sample.fileData,
      fileName: sample.fileName,
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
