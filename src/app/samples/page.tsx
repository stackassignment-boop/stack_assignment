import { Metadata } from 'next'
import SamplesPageComponent from '@/components/samples/SamplesPage'
import { region } from '@/lib/seo-config'

export const metadata: Metadata = {
  title: 'Worked Examples & Sample Essays | Stack Assignment',
  description: 'Extracts from academic work annotated to show what markers reward — how an argument is structured, how sources are integrated, how referencing is applied. For studying structure, not for submission.',
  keywords: ['essay structure examples', 'academic writing examples Australia', 'how to structure an essay university', 'referencing examples AGLC4 APA'],
  alternates: { canonical: 'https://www.stackassignment.com/samples' },
  openGraph: {
    title: 'Worked Examples & Sample Essays - Stack Assignment',
    description: 'Annotated extracts showing how strong academic work is structured. For study, not submission.',
    url: 'https://www.stackassignment.com/samples',
    type: 'website',
    locale: region.ogLocale,
  },
}

export default function SamplesPage() {
  return <SamplesPageComponent />
}
