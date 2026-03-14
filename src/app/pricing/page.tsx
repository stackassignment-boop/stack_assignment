import { Metadata } from 'next'
import PricingPageComponent from '@/components/pricing/PricingPage'

export const metadata: Metadata = {
  title: 'Pricing - Affordable Academic Writing Services | Stack Assignment',
  description: 'Get instant quotes for academic writing services. Transparent pricing with no hidden fees. Calculate your price based on academic level, deadline, and page count.',
  keywords: ['academic writing pricing', 'essay writing cost', 'assignment help price', 'dissertation pricing', 'affordable writing service'],
  openGraph: {
    title: 'Pricing - Stack Assignment',
    description: 'Get your custom quote in seconds - transparent, instant, no hidden fees',
    url: 'https://www.stackassignment.com/pricing',
    type: 'website',
  },
}

export default function PricingPage() {
  return <PricingPageComponent />
}
