import { Metadata } from 'next'
import OrderRoute from '@/components/order/OrderRoute'
import { region } from '@/lib/seo-config'

export const metadata: Metadata = {
  title: 'Book Tutoring or Editing | Stack Assignment Australia',
  description: 'Tell us your university, unit and what you are working on, and we will match you with a tutor or editor and quote a fixed price in AUD before you commit.',
  keywords: ['book a tutor Australia', 'academic editing quote', 'university tutoring booking', 'essay feedback Australia'],
  alternates: { canonical: 'https://www.stackassignment.com/order' },
  openGraph: {
    title: 'Book Tutoring or Editing - Stack Assignment',
    description: 'Match with a tutor or editor for your unit. Fixed price in AUD, quoted up front.',
    url: 'https://www.stackassignment.com/order',
    type: 'website',
    locale: region.ogLocale,
  },
}

export default function OrderPage() {
  return <OrderRoute />
}
