import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { apiResponse, apiError } from '@/lib/auth';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

// GET /api/blogs/[slug] - Get blog post by slug (public)
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    
    const blog = await db.blog.findUnique({
      where: { slug },
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
    
    if (!blog) {
      console.log('Blog not found for slug:', slug);
      return apiError('Blog post not found', 404);
    }
    
    // Only return published posts for public access
    if (!blog.isPublished) {
      console.log('Blog not published:', slug);
      return apiError('Blog post not found', 404);
    }
    
    // Increment view count
    try {
      await db.blog.update({
        where: { id: blog.id },
        data: { viewCount: { increment: 1 } },
      });
    } catch (error) {
      // Don't fail the request if view count update fails
      console.error('Failed to increment view count:', error);
    }
    
    return apiResponse({ blog });
  } catch (error) {
    console.error('Get blog error:', error);
    return apiError('Internal server error', 500);
  }
}

// PUT /api/blogs/[slug] - Update blog post (admin only)
const updateBlogSchema = require('zod').z.object({
  title: require('zod').z.string().min(5).optional(),
  excerpt: require('zod').z.string().max(300).optional(),
  content: require('zod').z.string().min(50).optional(),
  featuredImage: require('zod').z.string().url().optional().or(require('zod').z.literal('')),
  category: require('zod').z.string().optional(),
  tags: require('zod').z.array(require('zod').z.string()).optional(),
  isPublished: require('zod').z.boolean().optional(),
});

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { requireAdmin } = await import('@/lib/auth');
    const authResult = await requireAdmin();
    
    if (!authResult.success) {
      return apiError(authResult.error || 'Unauthorized', authResult.status || 401);
    }
    
    const { slug } = await params;
    
    const blog = await db.blog.findUnique({
      where: { slug },
    });
    
    if (!blog) {
      return apiError('Blog post not found', 404);
    }
    
    const body = await request.json();
    const result = updateBlogSchema.safeParse(body);
    
    if (!result.success) {
      return apiError(result.error.errors[0].message, 400);
    }
    
    const data = result.data;
    
    const updateData: Record<string, unknown> = {};
    
    if (data.title) updateData.title = data.title;
    if (data.excerpt !== undefined) updateData.excerpt = data.excerpt;
    if (data.content) updateData.content = data.content;
    if (data.featuredImage !== undefined) updateData.featuredImage = data.featuredImage || null;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.tags) updateData.tags = JSON.stringify(data.tags);
    
    // Handle publish status
    if (data.isPublished !== undefined) {
      updateData.isPublished = data.isPublished;
      if (data.isPublished && !blog.isPublished) {
        updateData.publishedAt = new Date();
      }
    }
    
    const updatedBlog = await db.blog.update({
      where: { id: blog.id },
      data: updateData,
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
      message: 'Blog post updated successfully',
      blog: updatedBlog,
    });
  } catch (error) {
    console.error('Update blog error:', error);
    return apiError('Internal server error', 500);
  }
}

// DELETE /api/blogs/[slug] - Delete blog post (admin only)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { requireAdmin } = await import('@/lib/auth');
    const authResult = await requireAdmin();
    
    if (!authResult.success) {
      return apiError(authResult.error || 'Unauthorized', authResult.status || 401);
    }
    
    const { slug } = await params;
    
    const blog = await db.blog.findUnique({
      where: { slug },
    });
    
    if (!blog) {
      return apiError('Blog post not found', 404);
    }
    
    await db.blog.delete({
      where: { id: blog.id },
    });
    
    return apiResponse({
      success: true,
      message: 'Blog post deleted successfully',
    });
  } catch (error) {
    console.error('Delete blog error:', error);
    return apiError('Internal server error', 500);
  }
}
