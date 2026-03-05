import { Metadata } from 'next'
import OrderPageComponent from '@/components/order/OrderPage'

export const metadata: Metadata = {
  title: 'Place Your Order - Academic Writing Help | Stack Assignment',
  description: 'Order professional academic writing assistance. Fill out the form to get started with your essay, research paper, dissertation, or any academic assignment.',
  keywords: ['place order', 'order essay', 'order assignment', 'academic writing order', 'get help with assignment'],
  openGraph: {
    title: 'Place Your Order - Stack Assignment',
    description: 'Get expert help with your academic assignments today',
    url: 'https://www.stackassignment.com/order',
    type: 'website',
  },
}

export default function OrderPage() {
  return <OrderPageComponent />
}
