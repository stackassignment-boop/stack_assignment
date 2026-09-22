import { Metadata } from 'next'
import { Quote } from 'lucide-react'
import ReferencingFormatter from '@/components/tools/ReferencingFormatter'
import ToolPageShell from '@/components/tools/ToolPageShell'
import { region } from '@/lib/seo-config'
const url = 'https://www.stackassignment.com/tools/referencing-formatter'

export const metadata: Metadata = {
  title: 'Free Referencing Generator | APA 7, Harvard AU, AGLC4, Vancouver',
  description:
    'Free citation and referencing generator for Australian university students. Build reference list entries and in-text citations in APA 7th, Harvard (AU), AGLC4 and Vancouver — no sign-up.',
  keywords: [
    'referencing generator',
    'APA 7th referencing generator',
    'Harvard referencing generator Australia',
    'AGLC4 citation generator',
    'Vancouver referencing generator',
    'free citation generator Australia',
    'how to reference a journal article',
  ],
  openGraph: {
    title: 'Free Referencing Generator | APA 7, Harvard AU, AGLC4, Vancouver',
    description:
      'Build reference list entries and in-text citations in the styles Australian faculties actually set.',
    url,
    type: 'website',
    locale: region.ogLocale,
  },
  alternates: { canonical: url },
}

const faqs = [
  {
    question: 'Which referencing style should I use?',
    answer:
      'Whichever one your unit guide specifies — this is set per unit, not per university, so two subjects in the same degree can require different styles. As a rough guide, APA 7th is common in psychology, education and health; Harvard is widely set in business and IT; AGLC4 is used in law; and Vancouver appears in nursing and medicine. If your unit guide does not say, ask your lecturer rather than guessing.',
  },
  {
    question: 'Is a referencing generator allowed?',
    answer:
      'Yes. Formatting a citation is a mechanical task, and universities generally treat reference generators the same way they treat the citation tools built into Word or your library database. What matters academically is that you actually read and cited the source, and that the final formatting is correct — you are responsible for checking the output, not the tool.',
  },
  {
    question: 'Why does the output not match my library guide exactly?',
    answer:
      'Referencing styles have edge cases, and universities often publish their own variation of a style — Kaplan Business School, for example, uses its own Harvard guide rather than generic Harvard. This tool follows the general pattern of each style, so always compare the output against your own library or unit guide before submitting.',
  },
  {
    question: 'How do I cite a source with no author or no date?',
    answer:
      'For a missing author, most styles move the title into the author position. For a missing date, APA and Harvard use "n.d." (no date). This tool inserts n.d. automatically if you leave the year blank. Government and organisation publications usually take the organisation itself as the author.',
  },
  {
    question: 'Does AGLC4 use in-text citations?',
    answer:
      'No — AGLC4 uses footnotes rather than in-text author-date citations, which is one of the main things that trips up law students moving from other subjects. The in-text example this tool shows for AGLC4 is indicative only; the reference itself is what belongs in your footnote.',
  },
]

export default function ReferencingFormatterPage() {
  return (
    <ToolPageShell
      url={url}
      breadcrumbLabel="Referencing Generator"
      icon={Quote}
      title="Referencing generator"
      intro="Build reference list entries and in-text citations in APA 7th, Harvard (AU), AGLC4 and Vancouver — the styles Australian units actually set. Nothing is stored or uploaded."
      app={{
        name: 'Referencing Generator',
        description:
          'Free citation generator for APA 7th, Harvard (AU), AGLC4 and Vancouver referencing styles.',
      }}
      faqs={faqs}
      faqHeading="Common referencing questions"
      ctas={[
        {
          heading: 'Need someone to check your referencing?',
          body: 'We offer proofreading and referencing review as part of our academic support service — useful if you want a second set of eyes on a reference list before you submit.',
          href: '/order',
          label: 'Get referencing support',
        },
      ]}
    >
      <ReferencingFormatter />
    </ToolPageShell>
  )
}
