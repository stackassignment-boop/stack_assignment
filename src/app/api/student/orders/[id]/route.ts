import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { PrismaClient } from '@prisma/client';

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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const prisma = getPrismaClient();
  
  try {
    const token = await getToken({ req: request });
    
    if (!token || !token.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const user = await prisma.user.findUnique({
      where: { email: token.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const order = await prisma.order.findFirst({
      where: {
        id: id,
        customerId: user.id,
      },
    });

    await prisma.$disconnect();

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error('Error fetching order:', error);
    await prisma.$disconnect();
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
  }
}
