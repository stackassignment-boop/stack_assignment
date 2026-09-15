import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/debug/blogs - Debug blog posts and database connection
export async function GET(request: NextRequest) {
  try {
    const debugInfo: any = {
      timestamp: new Date().toISOString(),
      database: {
        url: process.env.DATABASE_URL ? 'configured' : 'not configured',
        urlPrefix: process.env.DATABASE_URL?.substring(0, 20) + '...',
      },
    };

    try {
      // Test database connection
      const userCount = await db.user.count();
      debugInfo.database.userCount = userCount;
      debugInfo.database.status = 'connected';
    } catch (error) {
      debugInfo.database.status = 'error';
      debugInfo.database.error = error instanceof Error ? error.message : 'Unknown error';
      return NextResponse.json(debugInfo);
    }

    // Get all blogs
    const allBlogs = await db.blog.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        isPublished: true,
        createdAt: true,
        authorId: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    debugInfo.blogs = {
      total: allBlogs.length,
      published: allBlogs.filter(b => b.isPublished).length,
      drafts: allBlogs.filter(b => !b.isPublished).length,
      list: allBlogs.map(blog => ({
        slug: blog.slug,
        title: blog.title,
        published: blog.isPublished,
        createdAt: blog.createdAt,
      })),
    };

    // Test specific blog if slug provided
    const { searchParams } = new URL(request.url);
    const testSlug = searchParams.get('slug');

    if (testSlug) {
      const testBlog = await db.blog.findUnique({
        where: { slug: testSlug },
        include: {
          author: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
      });

      debugInfo.testBlog = {
        slug: testSlug,
        found: !!testBlog,
        data: testBlog || null,
      };
    }

    return NextResponse.json(debugInfo);

  } catch (error) {
    return NextResponse.json({
      error: true,
      message: error instanceof Error ? error.message : 'Debug failed',
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 });
  }
}
