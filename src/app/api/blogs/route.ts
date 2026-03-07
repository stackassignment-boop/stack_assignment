import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { apiResponse, apiError } from '@/lib/auth';
import { z } from 'zod';

// Schema for blog creation
const createBlogSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  excerpt: z.string().max(300, 'Excerpt must be less than 300 characters').optional(),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  featuredImage: z.string().url().optional().or(z.literal('')),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
});

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

// POST /api/blogs - Create a new blog post (admin only)
export async function POST(request: NextRequest) {
  try {
    const { requireAdmin } = await import('@/lib/auth');
    const authResult = await requireAdmin();

    if (!authResult.success) {
      return apiError(authResult.error || 'Unauthorized', authResult.status || 401);
    }

    const body = await request.json();
    const result = createBlogSchema.safeParse(body);

    if (!result.success) {
      console.error('Validation error:', result.error.errors);
      return apiError(result.error.errors[0].message, 400);
    }

    const data = result.data;
    const adminUserId = authResult.user.id;

    // Generate slug from title
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check if slug already exists
    const existing = await db.blog.findUnique({
      where: { slug },
    });

    if (existing) {
      return apiError('A blog post with this title already exists', 400);
    }

    // Create blog post
    const blog = await db.blog.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt || data.content.substring(0, 150) + '...',
        content: data.content,
        featuredImage: data.featuredImage || null,
        category: data.category || null,
        tags: data.tags ? JSON.stringify(data.tags) : null,
        isPublished: data.isPublished ?? false,
        publishedAt: data.isPublished ? new Date() : null,
        authorId: adminUserId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    return apiResponse({
      success: true,
      message: 'Blog post created successfully',
      blog,
    });
  } catch (error) {
    console.error('Create blog error:', error);
    return apiError('Internal server error', 500);
  }
}
