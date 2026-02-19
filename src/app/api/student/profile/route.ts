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
    const token = await getToken({ req: request });
    
    if (!token || !token.email) {
      return NextResponse.json({ profile: null }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: token.email },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        role: true,
        createdAt: true,
        lastLoginAt: true,
      },
    });

    await prisma.$disconnect();

    if (!user) {
      return NextResponse.json({ profile: null }, { status: 404 });
    }

    return NextResponse.json({ profile: user });
  } catch (error) {
    console.error('Error fetching profile:', error);
    await prisma.$disconnect();
    return NextResponse.json({ profile: null }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const prisma = getPrismaClient();
  
  try {
    const token = await getToken({ req: request });
    
    if (!token || !token.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, phone } = body;

    const user = await prisma.user.update({
      where: { email: token.email },
      data: {
        name: name || undefined,
        phone: phone || undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        role: true,
        createdAt: true,
        lastLoginAt: true,
      },
    });

    await prisma.$disconnect();

    return NextResponse.json({ profile: user });
  } catch (error) {
    console.error('Error updating profile:', error);
    await prisma.$disconnect();
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
