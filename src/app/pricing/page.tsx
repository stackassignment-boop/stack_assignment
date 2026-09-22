import { Metadata } from 'next'
import PricingRoute from '@/components/pricing/PricingRoute'
import { region } from '@/lib/seo-config'

export const metadata: Metadata = {
  title: 'Tutoring & Editing Pricing in AUD | Stack Assignment',
  description:
    'Transparent pricing for Australian students: per-hour tutoring and per-word editing, quoted in AUD with no hidden fees. Get an instant estimate before you book.',
  keywords: [
    'academic tutoring rates Australia',
    'essay editing cost Australia',
    'proofreading rates per word Australia',
    'thesis editing cost Australia',
    'tutoring price per hour Australia',
  ],
  openGraph: {
    title: 'Tutoring & Editing Pricing in AUD | Stack Assignment',
    description:
      'Per-hour tutoring and per-word editing, quoted in Australian dollars. Know the cost before you book.',
    url: 'https://www.stackassignment.com/pricing',
    type: 'website',
    locale: region.ogLocale,
  },
  alternates: { canonical: 'https://www.stackassignment.com/pricing' },
}

export default function PricingPage() {
  return <PricingRoute />
}
