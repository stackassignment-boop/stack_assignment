import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react'

export const revalidate = 3600 // Revalidate every hour

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  try {
    if (!db) {
      throw new Error('Database not available')
    }
    // Try to fetch posts at build time
    const posts = await db.blog.findMany({
      where: {
        isPublished: true,
      },
      select: {
        slug: true,
      },
    })

    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    // If database is not available at build time, return empty array
    // Pages will be generated on-demand at runtime
    console.log('Database not available at build time, using on-demand generation')
    return []
  }
}

export async function generateMetadata({ params }: PageProps) {
  if (!db || !params.slug) {
    return {
      title: 'Blog Post | Stack Assignment',
      description: 'Read this informative article from Stack Assignment blog.',
    }
  }

  const post = await db.blog.findUnique({
    where: {
      slug: params.slug,
    },
  })

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Stack Assignment Blog`,
    description: post.excerpt || post.content?.substring(0, 160) || 'Read this informative article from Stack Assignment blog.',
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content?.substring(0, 160) || 'Read this informative article from Stack Assignment blog.',
      type: 'article',
      publishedTime: post.publishedAt || post.createdAt,
      modifiedTime: post.updatedAt,
      url: `https://www.stackassignment.com/blog/${post.slug}`,
      images: post.featuredImage ? [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || post.content?.substring(0, 160) || 'Read this informative article from Stack Assignment blog.',
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  if (!db || !params.slug) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400">
            <Link href="/blog" className="text-indigo-600 hover:underline">
              Return to blog
            </Link>
          </p>
        </div>
      </div>
    )
  }

  const post = await db.blog.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      User: {
        select: {
          name: true,
        },
      },
    },
  })

  if (!post || !post.isPublished) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-indigo-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {post.category && (
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium mb-4">
              {post.category}
            </div>
          )}

          <h1 className="text-3xl md:text-5xl font-bold mb-6">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-indigo-200">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>Published: {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</span>
            </div>
            {post.updatedAt > post.createdAt && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Updated: {new Date(post.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</span>
              </div>
            )}
            {post.viewCount > 0 && (
              <div className="flex items-center gap-2">
                <span>👁 {post.viewCount} views</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-2xl"
          />
        </div>
      )}

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="border-2 shadow-lg">
          <CardContent className="p-8 md:p-12">
            <article className="prose prose-lg dark:prose-invert max-w-none">
              {post.excerpt && (
                <p className="text-xl text-gray-600 dark:text-gray-300 font-medium mb-8 leading-relaxed">
                  {post.excerpt}
                </p>
              )}
              <div
                className="prose-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {post.tags && (
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.split(',').map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Author Section */}
            {post.User && (
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {post.User.name?.charAt(0).toUpperCase() || 'A'}
                  </div>
                  <div>
                    <p className="font-semibold">Written by {post.User.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Share this article</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Help others discover this helpful resource
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.open(
                          `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`,
                          '_blank'
                        )
                      }
                    }}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.open(
                          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                          '_blank'
                        )
                      }
                    }}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Need Help with Your Assignment?
          </h2>
          <p className="text-lg text-orange-100 mb-6 max-w-2xl mx-auto">
            Get expert assistance from PhD-qualified writers for your essays, dissertations, and research papers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+919907300710"
              className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-6 py-3 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <Clock className="w-5 h-5" />
              Call Now
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-orange-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors border-2 border-white"
            >
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
