import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Get user from NextAuth session
    const token = await getToken({ req: request });
    
    if (!token || !token.email) {
      return NextResponse.json({ orders: [] });
    }

    // Find the user
    const user = await db.user.findUnique({
      where: { email: token.email },
    });

    if (!user) {
      return NextResponse.json({ orders: [] });
    }

    // Fetch orders for this user
    const orders = await db.order.findMany({
      where: { customerId: user.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        orderNumber: true,
        title: true,
        description: true,
        subject: true,
        academicLevel: true,
        paperType: true,
        pages: true,
        words: true,
        status: true,
        paymentStatus: true,
        totalPrice: true,
        deadline: true,
        requirements: true,
        attachments: true,
        notes: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ orders: [] });
  }
}
