import { Metadata } from 'next'
import RequirementsPageComponent from '@/components/requirements/RequirementsPage'

export const metadata: Metadata = {
  title: 'Assignment & Coursework Help | Stack Assignment',
  description: 'Browse available assignment and coursework requirements and get expert help.',
}

export default function RequirementsPage() {
  return <RequirementsPageComponent />
}
