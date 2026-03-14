import { NextRequest, NextResponse } from 'next/server';

// GET /api/migrate-blogs - List and migrate blog content from Blob storage to database
export async function GET(request: NextRequest) {
  try {
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

    if (!blobToken) {
      return NextResponse.json(
        { error: 'BLOB_READ_WRITE_TOKEN not configured' },
        { status: 500 }
      );
    }

    // List all blobs
    const listResponse = await fetch('https://blob.vercel-storage.com/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${blobToken}`,
      },
    });

    if (!listResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to list blobs' },
        { status: 500 }
      );
    }

    const blobs = await listResponse.json();

    // Filter for blog-related files
    const blogFiles = blobs.blobs?.filter((blob: any) =>
      blob.pathname?.startsWith('blogs/') ||
      blob.pathname?.includes('blog') ||
      blob.pathname?.includes('.json') ||
      blob.pathname?.includes('.md')
    ) || [];

    return NextResponse.json({
      totalBlobs: blobs.blobs?.length || 0,
      blogFiles: blogFiles.length,
      blogFiles: blogFiles,
      message: 'Found blog-related files. Use POST to migrate them.'
    });

  } catch (error) {
    console.error('List blobs error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to list blobs' },
      { status: 500 }
    );
  }
}

// POST /api/migrate-blogs - Migrate blog content from Blob storage to database
export async function POST(request: NextRequest) {
  try {
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

    if (!blobToken) {
      return NextResponse.json(
        { error: 'BLOB_READ_WRITE_TOKEN not configured' },
        { status: 500 }
      );
    }

    // List all blobs
    const listResponse = await fetch('https://blob.vercel-storage.com/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${blobToken}`,
      },
    });

    if (!listResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to list blobs' },
        { status: 500 }
      );
    }

    const blobs = await listResponse.json();
    const blogFiles = blobs.blobs?.filter((blob: any) =>
      blob.pathname?.startsWith('blogs/') ||
      blob.pathname?.includes('blog') ||
      blob.pathname?.includes('.json') ||
      blob.pathname?.includes('.md')
    ) || [];

    const migrationResults = [];

    // Migrate each blog file
    for (const blob of blogFiles) {
      try {
        // Download blob content
        const downloadResponse = await fetch(blob.url, {
          headers: {
            'Authorization': `Bearer ${blobToken}`,
          },
        });

        if (!downloadResponse.ok) {
          migrationResults.push({
            file: blob.pathname,
            status: 'error',
            error: 'Failed to download'
          });
          continue;
        }

        const content = await downloadResponse.text();

        // Try to parse as JSON
        let blogData;
        try {
          blogData = JSON.parse(content);
        } catch {
          // If not JSON, treat as markdown
          blogData = {
            title: blob.pathname.split('/').pop()?.replace(/\.(md|json)$/, ''),
            content: content,
            excerpt: content.substring(0, 200),
            isPublished: true,
          };
        }

        // Import db (dynamic import to avoid issues)
        const { db } = await import('@/lib/db');
        const { generateSlug } = await import('@/lib/auth');

        // Check if blog already exists
        const slug = blogData.slug || generateSlug(blogData.title);
        const existing = await db.blog.findUnique({ where: { slug } });

        if (existing) {
          migrationResults.push({
            file: blob.pathname,
            status: 'skipped',
            reason: 'Already exists',
            slug: slug
          });
          continue;
        }

        // Get or create admin user
        let adminUser = await db.user.findFirst({ where: { role: 'admin' } });

        if (!adminUser) {
          migrationResults.push({
            file: blob.pathname,
            status: 'error',
            error: 'No admin user found'
          });
          continue;
        }

        // Create blog post
        const blog = await db.blog.create({
          data: {
            title: blogData.title,
            slug,
            excerpt: blogData.excerpt,
            content: blogData.content,
            featuredImage: blogData.featuredImage || null,
            category: blogData.category || null,
            tags: blogData.tags ? JSON.stringify(blogData.tags) : null,
            authorId: adminUser.id,
            isPublished: blogData.isPublished !== false,
            publishedAt: blogData.isPublished !== false ? new Date() : null,
          },
        });

        migrationResults.push({
          file: blob.pathname,
          status: 'success',
          slug: slug,
          blogId: blog.id
        });

      } catch (error) {
        migrationResults.push({
          file: blob.pathname,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return NextResponse.json({
      message: 'Migration complete',
      totalFiles: blogFiles.length,
      results: migrationResults,
    });

  } catch (error) {
    console.error('Migrate blogs error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Migration failed' },
      { status: 500 }
    );
  }
}
