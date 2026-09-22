import { Metadata } from 'next'
import BlogPageComponent from '@/components/blog/BlogPage'
import { region } from '@/lib/seo-config'

export const metadata: Metadata = {
  title: 'Study & Referencing Guides for AU Uni Students | Stack Assignment',
  description: 'Practical guides for Australian university students — AGLC4 and APA 7th referencing, understanding marking rubrics, WAM and census dates, special consideration, and how to act on assessment feedback.',
  keywords: ['study guides Australian university', 'AGLC4 referencing guide', 'APA 7th referencing Australia', 'marking rubric explained', 'WAM Australia', 'special consideration Australia'],
  alternates: { canonical: 'https://www.stackassignment.com/blog' },
  openGraph: {
    title: 'Study & Referencing Guides for AU Uni Students',
    description: 'Referencing, rubrics, WAM and assessment guides written for the Australian system.',
    url: 'https://www.stackassignment.com/blog',
    type: 'website',
    locale: region.ogLocale,
  },
}

export default function BlogPage() {
  return <BlogPageComponent />
}
