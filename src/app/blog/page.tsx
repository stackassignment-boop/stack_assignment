import { Metadata } from 'next'
import BlogPageComponent from '@/components/blog/BlogPage'

export const metadata: Metadata = {
  title: 'Academic Writing Blog - Tips, Guides & Resources | Stack Assignment',
  description: 'Practical tips, guides, referencing help, study strategies and updates for students. Learn how to write better essays, improve your grades, and succeed academically.',
  keywords: ['academic writing blog', 'essay writing tips', 'study strategies', 'referencing guides', 'academic success tips'],
  openGraph: {
    title: 'Academic Writing Blog - Stack Assignment',
    description: 'Practical tips, guides, referencing help, study strategies and updates for students',
    url: 'https://www.stackassignment.com/blog',
    type: 'website',
  },
}

export default function BlogPage() {
  return <BlogPageComponent />
}
