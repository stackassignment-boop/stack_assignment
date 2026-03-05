import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { apiResponse, apiError } from '@/lib/auth';

// GET /api/blogs - List blog posts (public, no auth required)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    // Build filter - only published posts for public access
    const where: Record<string, unknown> = {
      isPublished: true,
    };
    
    if (category) {
      where.category = category;
    }
    
    if (tag) {
      where.tags = { contains: tag };
    }
    
    // Get blogs with pagination
    const [blogs, total] = await Promise.all([
      db.blog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      }),
      db.blog.count({ where }),
    ]);
    
    return apiResponse({
      blogs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get blogs error:', error);
    return apiError('Internal server error', 500);
  }
}
