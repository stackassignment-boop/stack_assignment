import { NextRequest, NextResponse } from 'next/server';

// GET /api/orders/[id]/attachments - Get all attachments for an order
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { db } = await import('@/lib/db');
    
    // Get attachments
    const attachments = await db.orderAttachment.findMany({
      where: { orderId: id },
      select: {
        id: true,
        fileName: true,
        fileType: true,
        fileSize: true,
        createdAt: true,
        // Don't include fileData in list
      },
    });
    
    return NextResponse.json({ attachments });
  } catch (error) {
    console.error('Get attachments error:', error);
    return NextResponse.json(
      { error: 'Failed to get attachments' },
      { status: 500 }
    );
  }
}
