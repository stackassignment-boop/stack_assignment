import { db } from '@/lib/db'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

export const revalidate = 3600 // Revalidate every hour

export async function generateMetadata() {
  return {
    title: 'Blog - Academic Writing Tips & Assignment Help | Stack Assignment',
    description: 'Expert academic writing tips, assignment help guides, and educational resources. Learn how to write better essays, research papers, and dissertations.',
    keywords: 'academic writing tips, assignment help blog, essay writing guide, research paper tips, dissertation writing help',
    openGraph: {
      title: 'Blog - Academic Writing Tips & Assignment Help',
      description: 'Expert academic writing tips, assignment help guides, and educational resources.',
      type: 'website',
      url: 'https://www.stackassignment.com/blog',
    },
  }
}

export default async function BlogPage() {
  const posts = await db.post.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl text-indigo-100 max-w-3xl">
            Expert academic writing tips, assignment help guides, and educational resources to help you excel in your studies.
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No Blog Posts Yet
            </h2>
            <p className="text-gray-500 dark:text-gray-500">
              Check back soon for the latest academic writing tips and resources!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card 
                key={post.id} 
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-indigo-500 dark:hover:border-indigo-400"
              >
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <CardTitle className="line-clamp-2 text-xl hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3 mb-4 min-h-[60px]">
                    {post.content?.substring(0, 150) || 'Read this article to learn more...'}
                  </CardDescription>
                  <Link 
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold transition-colors"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help with Your Assignment?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Get expert assistance from PhD-qualified writers. 100% original content, on-time delivery guaranteed.
          </p>
          <a
            href="tel:+919907300710"
            className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-8 py-4 rounded-lg hover:bg-orange-100 transition-colors text-lg"
          >
            <Clock className="w-5 h-5" />
            Call +91-99073-00710
          </a>
        </div>
      </div>
    </div>
  )
}
