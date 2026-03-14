import { Metadata } from 'next'
import ServicesPageComponent from '@/components/services/ServicesPage'

export const metadata: Metadata = {
  title: 'Our Services - Academic Writing Assistance | Stack Assignment',
  description: 'Comprehensive academic writing services including essay writing, dissertation help, research papers, coursework assistance, editing, and more. Expert help for all subjects and academic levels.',
  keywords: ['academic writing services', 'essay writing', 'dissertation help', 'assignment help', 'research paper writing', 'editing services'],
  openGraph: {
    title: 'Our Services - Stack Assignment',
    description: 'From high school assignments to PhD dissertations - we cover every level and subject',
    url: 'https://www.stackassignment.com/services',
    type: 'website',
  },
}

export default function ServicesPage() {
  return <ServicesPageComponent />
}
