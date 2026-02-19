import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin, generateSlug, apiResponse, apiError } from '@/lib/auth';
import { z } from 'zod';

// Schema for creating a sample (without file data - that comes from upload)
const createSampleSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().optional(),
  subject: z.string().optional(),
  academicLevel: z.string().optional(),
  paperType: z.string().optional(),
  pages: z.number().int().optional(),
  content: z.string().optional(),
  fileUrl: z.string().url().optional().or(z.literal('')),
  isPublished: z.boolean().optional(),
});

// GET /api/samples - List samples
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get('subject');
    const academicLevel = searchParams.get('academicLevel');
    const paperType = searchParams.get('paperType');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    // Build filter
    const where: Record<string, unknown> = {};
    
    // Non-admins only see published samples
    if (user?.role !== 'admin') {
      where.isPublished = true;
    }
    
    if (subject) {
      where.subject = subject;
    }
    
    if (academicLevel) {
      where.academicLevel = academicLevel;
    }
    
    if (paperType) {
      where.paperType = paperType;
    }
    
    // Get samples with pagination (exclude fileData for listing)
    const [samples, total] = await Promise.all([
      db.sample.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          subject: true,
          academicLevel: true,
          paperType: true,
          pages: true,
          fileUrl: true,
          fileName: true,
          fileType: true,
          fileSize: true,
          isPublished: true,
          viewCount: true,
          downloadCount: true,
          createdAt: true,
          updatedAt: true,
          // Exclude fileData from list
        },
      }),
      db.sample.count({ where }),
    ]);
    
    return apiResponse({
      samples,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get samples error:', error);
    return apiError('Internal server error', 500);
  }
}

// Import getCurrentUser
async function getCurrentUser() {
  const { getCurrentUser: getUser } = await import('@/lib/auth');
  return getUser();
}

// POST /api/samples - Create a new sample with file (admin only)
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAdmin();
    
    if (!authResult.success) {
      return apiError(authResult.error || 'Unauthorized', authResult.status || 401);
    }
    
    // Check if this is multipart form data (file upload) or JSON
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('multipart/form-data')) {
      // Handle file upload
      const formData = await request.formData();
      const file = formData.get('file') as File | null;
      
      // Extract other fields
      const title = formData.get('title') as string;
      const description = formData.get('description') as string | null;
      const subject = formData.get('subject') as string | null;
      const academicLevel = formData.get('academicLevel') as string | null;
      const paperType = formData.get('paperType') as string | null;
      const pagesStr = formData.get('pages') as string | null;
      const isPublishedStr = formData.get('isPublished') as string | null;
      
      if (!title || title.length < 5) {
        return apiError('Title must be at least 5 characters', 400);
      }
      
      // Validate file
      if (!file) {
        return apiError('No file provided', 400);
      }
      
      const allowedTypes = ['application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        return apiError('Invalid file type. Only PDF files are allowed.', 400);
      }
      
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        return apiError('File size exceeds 10MB limit', 400);
      }
      
      // Read file as buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // Generate slug
      let slug = generateSlug(title);
      let counter = 1;
      
      while (await db.sample.findUnique({ where: { slug } })) {
        slug = `${generateSlug(title)}-${counter}`;
        counter++;
      }
      
      // Create sample with file stored in database
      const sample = await db.sample.create({
        data: {
          title,
          slug,
          description: description || null,
          subject: subject || null,
          academicLevel: academicLevel || null,
          paperType: paperType || null,
          pages: pagesStr ? parseInt(pagesStr) : null,
          fileData: buffer,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          isPublished: isPublishedStr === 'true',
        },
      });
      
      // Return without fileData
      const { fileData, ...sampleWithoutFile } = sample;
      
      return apiResponse({
        success: true,
        message: 'Sample created successfully',
        sample: sampleWithoutFile,
      }, 201);
    } else {
      // Handle JSON (for backward compatibility or samples without files)
      const body = await request.json();
      const result = createSampleSchema.safeParse(body);
      
      if (!result.success) {
        return apiError(result.error.errors[0].message, 400);
      }
      
      const data = result.data;
      
      // Generate slug
      let slug = generateSlug(data.title);
      let counter = 1;
      
      while (await db.sample.findUnique({ where: { slug } })) {
        slug = `${generateSlug(data.title)}-${counter}`;
        counter++;
      }
      
      // Create sample
      const sample = await db.sample.create({
        data: {
          title: data.title,
          slug,
          description: data.description,
          subject: data.subject,
          academicLevel: data.academicLevel,
          paperType: data.paperType,
          pages: data.pages,
          content: data.content,
          fileUrl: data.fileUrl || null,
          isPublished: data.isPublished ?? true,
        },
      });
      
      return apiResponse({
        success: true,
        message: 'Sample created successfully',
        sample,
      }, 201);
    }
  } catch (error) {
    console.error('Create sample error:', error);
    return apiError('Internal server error', 500);
  }
}
