import { Metadata } from 'next'
import TermsPageComponent from '@/components/legal/TermsPage'

export const metadata: Metadata = {
  title: 'Terms of Service - Stack Assignment',
  description: 'Read our terms of service to understand the rules and guidelines for using our academic writing assistance platform.',
  keywords: ['terms of service', 'terms and conditions', 'user agreement', 'service terms'],
  openGraph: {
    title: 'Terms of Service - Stack Assignment',
    description: 'Rules and guidelines for using our services',
    url: 'https://www.stackassignment.com/terms',
    type: 'website',
  },
}

export default function TermsPage() {
  return <TermsPageComponent />
}
