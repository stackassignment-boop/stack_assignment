import { MetadataRoute } from 'next'
import { db } from '@/lib/db'
import { universities } from '@/data/universities'

// Force fresh data on every request. Without this, Next.js can statically
// cache the sitemap at build time — meaning newly uploaded requirements
// (and any other DB-driven content) wouldn't appear in sitemap.xml until
// the next deployment, slowing down how quickly Google discovers them.
export const dynamic = 'force-dynamic'

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
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/integrity`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/order`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kaplan-assignment-help`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/melbourne-institute-of-technology-assignment-help`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/holmes-institute-assignment-help`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/requirements`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ]

  // Dedicated university landing pages (dynamic route driven by
  // src/data/universities.ts)
  const universityPages = universities.map((u) => ({
    url: `${baseUrl}/universities/${u.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

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

  // Fetch active services
  let servicePages: { slug: string; updatedAt: Date }[] = []
  try {
    servicePages = await db.service.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
    })
  } catch (error) {
    console.error('Failed to fetch services for sitemap:', error)
  }

  // Service detail pages
  const services = servicePages.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: service.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Fetch uploaded assignment requirements — each gets its own indexable
  // page (previously all requirements shared a single /requirements URL
  // with no individual page, so specific uploaded assignments had no way
  // to be found directly via search).
  let requirementItems: { id: string; updatedAt: Date }[] = []
  try {
    requirementItems = await db.requirementFile.findMany({
      select: { id: true, updatedAt: true },
    })
  } catch (error) {
    console.error('Failed to fetch requirements for sitemap:', error)
  }

  const requirementPages = requirementItems.map((req) => ({
    url: `${baseUrl}/requirements/${req.id}`,
    lastModified: req.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...universityPages, ...blogPages, ...samples, ...services, ...requirementPages]
}
