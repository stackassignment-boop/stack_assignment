import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

// GET /api/orders/attachments/[id] - Get attachment file
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Check authentication
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Find the attachment
    const attachment = await db.orderAttachment.findUnique({
      where: { id },
      include: {
        order: {
          select: {
            customerId: true,
          },
        },
      },
    });

    if (!attachment) {
      return NextResponse.json({ error: 'Attachment not found' }, { status: 404 });
    }

    // Check if user has access (admin or owner)
    if (user.role !== 'admin' && attachment.order.customerId !== user.id) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Return the file as response
    return new NextResponse(attachment.fileData, {
      headers: {
        'Content-Type': attachment.fileType,
        'Content-Disposition': `attachment; filename="${attachment.fileName}"`,
        'Content-Length': attachment.fileSize.toString(),
      },
    });

  } catch (error) {
    console.error('Get attachment error:', error);
    return NextResponse.json({ error: 'Failed to get attachment' }, { status: 500 });
  }
}

// DELETE /api/orders/attachments/[id] - Delete attachment (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Check admin access
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Delete the attachment
    await db.orderAttachment.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Attachment deleted' });

  } catch (error) {
    console.error('Delete attachment error:', error);
    return NextResponse.json({ error: 'Failed to delete attachment' }, { status: 500 });
  }
}
