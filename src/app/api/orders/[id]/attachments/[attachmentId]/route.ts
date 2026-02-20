import { NextRequest, NextResponse } from 'next/server';

// GET /api/orders/[id]/attachments/[attachmentId] - Download an attachment
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; attachmentId: string }> }
) {
  try {
    const { id, attachmentId } = await params;
    const { db } = await import('@/lib/db');
    
    // Get attachment with file data
    const attachment = await db.orderAttachment.findFirst({
      where: {
        id: attachmentId,
        orderId: id,
      },
    });
    
    if (!attachment) {
      return NextResponse.json(
        { error: 'Attachment not found' },
        { status: 404 }
      );
    }
    
    // Return file as response
    return new NextResponse(attachment.fileData, {
      headers: {
        'Content-Type': attachment.fileType,
        'Content-Disposition': `attachment; filename="${attachment.fileName}"`,
        'Content-Length': attachment.fileSize.toString(),
      },
    });
  } catch (error) {
    console.error('Download attachment error:', error);
    return NextResponse.json(
      { error: 'Failed to download attachment' },
      { status: 500 }
    );
  }
}
