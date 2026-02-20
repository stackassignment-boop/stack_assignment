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
    
    // Determine preview type
    const hasFile = !!sample.fileData;
    const hasContent = !!sample.content && sample.content.length > 50;
    
    // Return preview data
    let previewContent = '';
    let totalLength = 0;
    
    if (hasContent) {
      // Text content available - show 1/3rd
      totalLength = sample.content?.length || 0;
      const previewLength = Math.ceil(totalLength / 3);
      previewContent = sample.content?.substring(0, previewLength) || '';
    } else if (hasFile) {
      // File-based sample (PDF) - show placeholder
      previewContent = `[PDF Document Preview]\n\nFile: ${sample.fileName || 'sample.pdf'}\nSize: ${sample.fileSize ? (sample.fileSize / 1024).toFixed(1) + ' KB' : 'Unknown'}\n\nThis is a PDF document. The first ${Math.ceil((sample.pages || 3) / 3)} page(s) are available for preview.\n\n--- BEGIN PREVIEW ---\n\n[Document content would be displayed here for the first 1/3rd of pages]\n\nSubject: ${sample.subject || 'N/A'}\nAcademic Level: ${sample.academicLevel || 'N/A'}\nPaper Type: ${sample.paperType || 'N/A'}\n\nDescription:\n${sample.description || 'No description available.'}\n\n[... The remaining content is available upon request ...]`;
      totalLength = sample.fileSize || 0;
    } else {
      // No content or file
      previewContent = sample.description || 'No preview content available. Please contact admin for full access.';
      totalLength = previewContent.length;
    }
    
    return NextResponse.json({
      preview: previewContent,
      totalLength: totalLength,
      previewLength: previewContent.length,
      pages: sample.pages,
      title: sample.title,
      hasFile: hasFile,
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
