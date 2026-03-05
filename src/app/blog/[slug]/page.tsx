import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogDetailPage from '@/components/blog/BlogDetailPage'

interface PageProps {
  params: {
    slug: string
  }
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const baseUrl = 'https://www.stackassignment.com'
    const res = await fetch(`${baseUrl}/api/blogs/${params.slug}`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      return {
        title: 'Blog Post Not Found - Stack Assignment',
      }
    }

    const data = await res.json()
    const blog = data.blog

    return {
      title: `${blog.title} - Stack Assignment Blog`,
      description: blog.excerpt || 'Read this article from Stack Assignment blog',
      keywords: blog.tags ? JSON.parse(blog.tags).join(', ') : 'academic writing, blog',
      openGraph: {
        title: blog.title,
        description: blog.excerpt || 'Read this article from Stack Assignment blog',
        url: `${baseUrl}/blog/${blog.slug}`,
        type: 'article',
        publishedTime: blog.createdAt,
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
    const baseUrl = 'https://www.stackassignment.com'
    const res = await fetch(`${baseUrl}/api/blogs?limit=100`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      return []
    }

    const data = await res.json()
    const blogs = data.blogs || []

    return blogs.map((blog: { slug: string }) => ({
      slug: blog.slug,
    }))
  } catch (error) {
    console.error('Failed to generate static params for blogs:', error)
    return []
  }
}

export default function BlogPostPage({ params }: PageProps) {
  return <BlogDetailPage slug={params.slug} />
}
