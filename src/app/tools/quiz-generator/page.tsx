import { Metadata } from 'next'
import { Sparkles } from 'lucide-react'
import QuizGenerator from '@/components/tools/QuizGenerator'
import ToolPageShell from '@/components/tools/ToolPageShell'
import { region } from '@/lib/seo-config'
const url = 'https://www.stackassignment.com/tools/quiz-generator'

export const metadata: Metadata = {
  title: 'Free Quiz Generator from Your Notes | Practice Questions & Revision',
  description:
    'Turn your lecture notes into practice questions instantly. Free active-recall revision tool that builds fill-the-gap, definition and short-answer questions from your own material.',
  keywords: [
    'quiz generator from notes',
    'practice questions from text',
    'active recall revision tool',
    'flashcard generator free',
    'study question generator',
    'exam revision tool students',
  ],
  openGraph: {
    title: 'Free Quiz Generator from Your Notes',
    description:
      'Turn lecture notes into practice questions for active-recall revision. Free, runs in your browser.',
    url,
    type: 'website',
    locale: region.ogLocale,
  },
  alternates: { canonical: url },
}

const faqs = [
  {
    question: 'How does it generate questions?',
    answer:
      'It analyses your pasted notes for sentence structure and recurring key terms, then builds three kinds of question: fill-the-gap prompts that remove the most significant term from a sentence, definition prompts pulled from "X is/refers to..." patterns, and short-answer recall prompts around important terms. It works best with notes written in full sentences rather than fragmentary bullets.',
  },
  {
    question: 'Why is active recall better than re-reading?',
    answer:
      'Re-reading feels productive because the material becomes familiar, but familiarity is not the same as retrievability. Testing yourself forces your brain to reconstruct the answer, which is the process that actually strengthens memory. This is one of the most consistently replicated findings in learning research — and it is why turning notes into questions beats highlighting them again.',
  },
  {
    question: 'Is my material uploaded anywhere?',
    answer:
      'No. Everything runs in your browser. Your notes are not sent to a server, stored, or used to train anything.',
  },
  {
    question: 'Can this predict what will be on my exam?',
    answer:
      'No, and be wary of anything that claims otherwise. It generates questions from the specific text you paste — it has no knowledge of your unit, your lecturer, or your exam format. Use it to test whether you have absorbed your own material, not as a guide to what will be assessed.',
  },
  {
    question: 'Why did some questions come out awkward?',
    answer:
      'The tool works from sentence patterns rather than genuine comprehension, so it will occasionally blank out the wrong word or build a question around a minor term. Skip those and keep the ones that are useful — even an imperfect question set is far better revision than passively reading the notes again.',
  },
]

export default function QuizGeneratorPage() {
  return (
    <ToolPageShell
      url={url}
      breadcrumbLabel="Quiz Generator"
      icon={Sparkles}
      title="Quiz generator"
      intro="Paste your notes and get practice questions back. Testing yourself beats re-reading — this turns material you already have into revision you can actually measure."
      app={{
        name: 'Quiz Generator',
        description:
          'Free tool that turns lecture notes into active-recall practice questions in your browser.',
      }}
      faqs={faqs}
      faqHeading="About this tool"
      ctas={[
        {
          heading: 'Notes trapped in a PDF or a photo?',
          body: 'Convert them to text first, then paste them here to build a question set.',
          href: '/tools',
          label: 'Browse all tools',
        },
      ]}
    >
      <QuizGenerator />
    </ToolPageShell>
  )
}
