import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react'

export const revalidate = 3600 // Revalidate every hour

interface PageProps {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  try {
    if (!db) {
      throw new Error('Database not available')
    }
    // Try to fetch posts at build time
    const posts = await db.post.findMany({
      where: {
        published: true,
      },
      select: {
        id: true,
      },
    })

    return posts.map((post) => ({
      id: post.id,
    }))
  } catch (error) {
    // If database is not available at build time, return empty array
    // Pages will be generated on-demand at runtime
    console.log('Database not available at build time, using on-demand generation')
    return []
  }
}

export async function generateMetadata({ params }: PageProps) {
  if (!db) {
    return {
      title: 'Blog Post | Stack Assignment',
      description: 'Read this informative article from Stack Assignment blog.',
    }
  }

  const post = await db.post.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Stack Assignment Blog`,
    description: post.content?.substring(0, 160) || 'Read this informative article from Stack Assignment blog.',
    openGraph: {
      title: post.title,
      description: post.content?.substring(0, 160) || 'Read this informative article from Stack Assignment blog.',
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      url: `https://www.stackassignment.com/blog/${post.id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.content?.substring(0, 160) || 'Read this informative article from Stack Assignment blog.',
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  if (!db) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Database Not Available</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Please check your database configuration.
          </p>
        </div>
      </div>
    )
  }

  const post = await db.post.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!post || !post.published) {
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
          
          <h1 className="text-3xl md:text-5xl font-bold mb-6">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-6 text-indigo-200">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>Published: {new Date(post.createdAt).toLocaleDateString('en-US', {
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
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="border-2 shadow-lg">
          <CardContent className="p-8 md:p-12">
            <article className="prose prose-lg dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed text-gray-700 dark:text-gray-300">
                {post.content}
              </div>
            </article>

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
