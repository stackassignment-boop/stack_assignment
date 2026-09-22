import { Metadata } from 'next'
import TermsPageComponent from '@/components/legal/TermsPage'
import { region } from '@/lib/seo-config'

export const metadata: Metadata = {
  title: 'Terms of Service - Stack Assignment',
  description: 'The rules and guidelines for using our academic tutoring, editing and assessment feedback services, including what we will and will not do.',
  keywords: ['terms of service', 'terms and conditions', 'user agreement', 'service terms'],
  alternates: { canonical: 'https://www.stackassignment.com/terms' },
  openGraph: {
    title: 'Terms of Service - Stack Assignment',
    description: 'Rules and guidelines for using our services',
    url: 'https://www.stackassignment.com/terms',
    type: 'website',
    locale: region.ogLocale,
  },
}

export default function TermsPage() {
  return <TermsPageComponent />
}
