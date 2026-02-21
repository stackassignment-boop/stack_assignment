import { MetadataRoute } from 'next'
import { db } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.stackassignment.com'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/samples`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // Fetch published blog posts
  let blogPosts: { slug: string; updatedAt: Date }[] = []
  try {
    blogPosts = await db.blog.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    })
  } catch (error) {
    console.error('Failed to fetch blogs for sitemap:', error)
  }

  // Blog post pages
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Fetch published samples
  let samplePages: { slug: string; updatedAt: Date }[] = []
  try {
    samplePages = await db.sample.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    })
  } catch (error) {
    console.error('Failed to fetch samples for sitemap:', error)
  }

  // Sample pages
  const samples = samplePages.map((sample) => ({
    url: `${baseUrl}/samples/${sample.slug}`,
    lastModified: sample.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages, ...samples]
}
