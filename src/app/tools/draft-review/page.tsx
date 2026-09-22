import { Metadata } from 'next'
import { ClipboardCheck } from 'lucide-react'
import DraftReview from '@/components/tools/DraftReview'
import ToolPageShell from '@/components/tools/ToolPageShell'
import { region } from '@/lib/seo-config'
const url = 'https://www.stackassignment.com/tools/draft-review'

export const metadata: Metadata = {
  title: 'Free Assignment Draft Checker | Readability & Structure Review',
  description:
    'Paste your draft and get instant feedback on word count, readability, sentence length, citation density, filler words and passive voice. Runs in your browser — nothing is uploaded.',
  keywords: [
    'assignment draft checker',
    'essay readability checker',
    'academic writing checker',
    'word count and readability tool',
    'check my essay structure',
    'passive voice checker academic',
  ],
  openGraph: {
    title: 'Free Assignment Draft Checker | Readability & Structure Review',
    description:
      'Instant structural feedback on your essay or report draft — word count, readability, citations and style.',
    url,
    type: 'website',
    locale: region.ogLocale,
  },
  alternates: { canonical: url },
}

const faqs = [
  {
    question: 'Does this tool check for plagiarism or AI detection?',
    answer:
      'No. It analyses readability, structure and style only — sentence length, citation density, filler phrases, passive voice and word count against your target. It does not compare your work against any database and does not assess originality. Your university provides similarity checking through Turnitin or an equivalent, and that is the check that actually counts.',
  },
  {
    question: 'Is my draft uploaded anywhere?',
    answer:
      'No. The entire analysis runs in your browser using JavaScript. Nothing is sent to a server, stored, or logged — you can confirm this by disconnecting from the internet after the page loads and pasting your text; the tool still works.',
  },
  {
    question: 'What readability score should academic writing have?',
    answer:
      'Academic writing typically scores between 30 and 50 on Flesch Reading Ease, which is denser than general prose because of longer sentences and subject terminology. A low score is not automatically a problem — but if you are well under 30, it is worth checking whether long sentences are making your argument harder to follow than it needs to be.',
  },
  {
    question: 'How many citations should my assignment have?',
    answer:
      'There is no universal rule, and your unit guide or rubric is the real answer. As a rough orientation, many undergraduate essays land somewhere around one citation per 150–200 words, but literature reviews are far denser and reflective pieces far lighter. This tool reports your citation density so you can sanity-check it against what your unit expects.',
  },
  {
    question: 'Why is it flagging passive voice if my lecturer wants it?',
    answer:
      'Passive voice is correct and expected in some contexts — method sections in science and health reports especially. The tool reports the rate rather than telling you to remove it, and only marks it as a warning above roughly 40% of sentences. Use your judgement and your unit conventions.',
  },
]

export default function DraftReviewPage() {
  return (
    <ToolPageShell
      url={url}
      breadcrumbLabel="Draft Checker"
      icon={ClipboardCheck}
      title="Assignment draft checker"
      intro="Paste a draft and see what a marker notices structurally before they read a word of your argument — length, readability, citation density, sentence sprawl and style slips."
      app={{
        name: 'Assignment Draft Checker',
        description:
          'Free browser-based readability and structure checker for university assignment drafts.',
      }}
      faqs={faqs}
      faqHeading="About this tool"
      ctas={[
        {
          heading: 'Want feedback on the argument, not just the structure?',
          body: 'An automated tool can tell you a sentence is 42 words long. It cannot tell you whether your thesis holds up or whether you have answered the question. That part needs a human read — which is what our proofreading and feedback service is for.',
          href: '/order',
          label: 'Get a human review',
        },
      ]}
    >
      <DraftReview />
    </ToolPageShell>
  )
}
