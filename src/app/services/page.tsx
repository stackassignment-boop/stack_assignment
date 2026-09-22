import { Metadata } from 'next'
import ServicesRoute from '@/components/services/ServicesRoute'
import { region } from '@/lib/seo-config'

export const metadata: Metadata = {
  title: 'Tutoring, Editing & Study Support for AU Students | Stack Assignment',
  description:
    'One-on-one tutoring, tracked-changes editing on your own draft, study and reference materials, and exam preparation — matched to Australian university marking rubrics and referencing styles.',
  keywords: [
    'academic tutoring services Australia',
    'essay editing service Australia',
    'proofreading service Australia',
    'thesis editing Australia',
    'exam preparation tutoring Australia',
    'academic study support Australia',
  ],
  openGraph: {
    title: 'Tutoring, Editing & Study Support for AU Students | Stack Assignment',
    description:
      'Tutoring, editing on your own work, study materials and exam prep — built around Australian university standards.',
    url: 'https://www.stackassignment.com/services',
    type: 'website',
    locale: region.ogLocale,
  },
  alternates: { canonical: 'https://www.stackassignment.com/services' },
}

export default function ServicesPage() {
  return <ServicesRoute />
}
