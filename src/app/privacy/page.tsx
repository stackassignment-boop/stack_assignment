import { Metadata } from 'next'
import PrivacyPageComponent from '@/components/legal/PrivacyPage'

export const metadata: Metadata = {
  title: 'Privacy Policy - Stack Assignment',
  description: 'Read our privacy policy to understand how we collect, use, and protect your personal information when using our academic assistance services.',
  keywords: ['privacy policy', 'data protection', 'user privacy', 'personal information'],
  openGraph: {
    title: 'Privacy Policy - Stack Assignment',
    description: 'How we collect, use, and protect your personal information',
    url: 'https://www.stackassignment.com/privacy',
    type: 'website',
  },
}

export default function PrivacyPage() {
  return <PrivacyPageComponent />
}
