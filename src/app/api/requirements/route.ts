import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/requirements - List all requirement files (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const where: Record<string, unknown> = {};

    // Filter by category if provided
    if (category) {
      where.category = category;
    }

    const requirements = await db.requirementFile.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        fileName: true,
        fileSize: true,
        fileType: true,
        filePath: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      requirements,
    });
  } catch (error) {
    console.error('Get requirements error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
