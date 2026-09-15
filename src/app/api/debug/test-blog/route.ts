import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/debug/test-blog - Test fetching a specific blog by slug
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug') || 'the-ultimate-guide-to-student-visas-in-australia-2026-updates';

    const result = await db.blog.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    });

    if (!result) {
      return NextResponse.json({
        success: false,
        error: 'Blog not found',
        slug: slug,
      });
    }

    // Format the response exactly like the API should return
    return NextResponse.json({
      success: true,
      blog: result,
      slug: slug,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Test failed',
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 });
  }
}
