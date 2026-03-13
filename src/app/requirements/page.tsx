import { Metadata } from 'next'
import RequirementsPageComponent from '@/components/requirements/RequirementsPage'

export const metadata: Metadata = {
  title: 'Assignment & Coursework Help - Browse Requirements | Stack Assignment',
  description: 'Browse available assignment and coursework requirements and get expert help. Download requirement files and get answers from our experts.',
  keywords: ['assignment requirements', 'coursework help', 'academic assignments', 'homework help', 'study materials', 'sample papers'],
  openGraph: {
    title: 'Assignment & Coursework Help - Stack Assignment',
    description: 'Browse and download assignment requirements. Get expert help with your coursework from our team of experts.',
    url: 'https://www.stackassignment.com/requirements',
    type: 'website',
  },
}

export default function RequirementsPage() {
  return <RequirementsPageComponent />
}
