import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogDetailPage from '@/components/blog/BlogDetailPage'
import { db } from '@/lib/db'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params

  try {
    const blog = await db.blog.findUnique({
      where: { slug },
    })

    if (!blog) {
      return {
        title: 'Blog Post Not Found - Stack Assignment',
      }
    }

    return {
      title: `${blog.title} - Stack Assignment Blog`,
      description: blog.excerpt || 'Read this article from Stack Assignment blog',
      keywords: blog.tags ? JSON.parse(blog.tags).join(', ') : 'academic writing, blog',
      openGraph: {
        title: blog.title,
        description: blog.excerpt || 'Read this article from Stack Assignment blog',
        url: `https://www.stackassignment.com/blog/${blog.slug}`,
        type: 'article',
        publishedTime: blog.createdAt.toISOString(),
        images: blog.featuredImage ? [blog.featuredImage] : [],
      },
    }
  } catch (error) {
    return {
      title: 'Blog Post - Stack Assignment',
    }
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  try {
    const blogs = await db.blog.findMany({
      where: { isPublished: true },
      select: { slug: true },
    })

    return blogs.map((blog) => ({
      slug: blog.slug,
    }))
  } catch (error) {
    console.error('Failed to generate static params for blogs:', error)
    return []
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  return <BlogDetailPage slug={slug} />
}
