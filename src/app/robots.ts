import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/student-login/', '/student-dashboard/'],
    },
    sitemap: 'https://www.stackassignment.com/sitemap.xml',
  }
}
