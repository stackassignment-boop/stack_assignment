import { Metadata } from 'next'
import IntegrityPageComponent from '@/components/legal/IntegrityPage'

export const metadata: Metadata = {
  title: 'Academic Integrity Policy - Stack Assignment',
  description: 'Learn about our commitment to academic integrity and how our services help students learn and improve their own work ethically.',
  keywords: ['academic integrity', 'ethics', 'plagiarism policy', 'honesty'],
  openGraph: {
    title: 'Academic Integrity Policy - Stack Assignment',
    description: 'Our commitment to academic integrity and ethical practices',
    url: 'https://www.stackassignment.com/integrity',
    type: 'website',
  },
}

export default function IntegrityPage() {
  return <IntegrityPageComponent />
}
