import { Metadata } from 'next'
import SamplesPageComponent from '@/components/samples/SamplesPage'

export const metadata: Metadata = {
  title: 'Assignment & Essay Samples - Free Preview | Stack Assignment',
  description: 'Browse free previews of academic writing samples including essays, research papers, dissertations, and more. Preview 1/3rd of each sample for free.',
  keywords: ['essay samples', 'assignment samples', 'research paper samples', 'dissertation samples', 'academic writing examples'],
  openGraph: {
    title: 'Assignment & Essay Samples - Stack Assignment',
    description: 'Preview 1/3rd of each sample free • Contact admin for full access',
    url: 'https://www.stackassignment.com/samples',
    type: 'website',
  },
}

export default function SamplesPage() {
  return <SamplesPageComponent />
}
