import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { PrismaClient } from '@prisma/client';

// Create a fresh Prisma client for this request
const getPrismaClient = () => {
  const NEON_DATABASE_URL = "postgresql://neondb_owner:npg_A8kgUBsheXJ3@ep-floral-sun-aikg04vz-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
  
  return new PrismaClient({
    datasources: {
      db: {
        url: NEON_DATABASE_URL,
      },
    },
  });
};

export async function GET(request: NextRequest) {
  const prisma = getPrismaClient();
  
  try {
    // Get user from NextAuth session
    const token = await getToken({ req: request });
    
    if (!token || !token.email) {
      return NextResponse.json({ orders: [] });
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: token.email },
    });

    if (!user) {
      return NextResponse.json({ orders: [] });
    }

    // Fetch orders for this user
    const orders = await prisma.order.findMany({
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

    await prisma.$disconnect();

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    await prisma.$disconnect();
    return NextResponse.json({ orders: [] });
  }
}
