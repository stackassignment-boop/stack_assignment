import { Metadata } from 'next'
import IntegrityPageComponent from '@/components/legal/IntegrityPage'
import { region, generateFAQSchema } from '@/lib/seo-config'
import { integrityFaqs } from '@/data/integrity-faqs'

const url = 'https://www.stackassignment.com/integrity'

export const metadata: Metadata = {
  title: 'Academic Integrity Policy | Stack Assignment Australia',
  description:
    'Where we draw the line: we tutor, edit and give feedback, and we never write or supply work for submission. Our policy, and what Australian law requires of academic support services.',
  keywords: [
    'academic integrity policy',
    'academic integrity Australia',
    'contract cheating Australia',
    'is academic editing allowed',
    'TEQSA academic cheating services',
  ],
  openGraph: {
    title: 'Academic Integrity Policy | Stack Assignment Australia',
    description:
      'We tutor, edit and give feedback. We never write or supply work for submission. Here is exactly where the line sits.',
    url,
    type: 'website',
    // Next.js replaces the whole openGraph object rather than merging it, so
    // omitting locale here would silently drop the en_AU set in the root layout.
    locale: region.ogLocale,
  },
  alternates: { canonical: url },
}

export default function IntegrityPage() {
  return (
    <>
      {/*
        Emitted from the server component so the markup is in the initial HTML.
        Questions and answers come from the same array the page body renders —
        see src/data/integrity-faqs.ts for why.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(integrityFaqs)) }}
      />
      <IntegrityPageComponent />
    </>
  )
}
