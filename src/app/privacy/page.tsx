import { Metadata } from 'next'
import PrivacyPageComponent from '@/components/legal/PrivacyPage'
import { region } from '@/lib/seo-config'

export const metadata: Metadata = {
  title: 'Privacy Policy - Stack Assignment',
  description: 'Read our privacy policy to understand how we collect, use, and protect your personal information when using our academic assistance services.',
  keywords: ['privacy policy', 'data protection', 'user privacy', 'personal information'],
  alternates: { canonical: 'https://www.stackassignment.com/privacy' },
  openGraph: {
    title: 'Privacy Policy - Stack Assignment',
    description: 'How we collect, use, and protect your personal information',
    url: 'https://www.stackassignment.com/privacy',
    type: 'website',
    locale: region.ogLocale,
  },
}

export default function PrivacyPage() {
  return <PrivacyPageComponent />
}
