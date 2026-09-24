import { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, AlertTriangle } from 'lucide-react'
import ToolPageShell from '@/components/tools/ToolPageShell'
import { region } from '@/lib/seo-config'

const url = 'https://www.stackassignment.com/tools/similarity-report'

export const metadata: Metadata = {
  title: 'How to Read a Turnitin Similarity Report | Plain-English Guide',
  description:
    'What a Turnitin similarity percentage actually means, which matches matter, why a high score is not automatically plagiarism, and how AI-detection flags work at Australian universities.',
  keywords: [
    'Turnitin similarity report explained',
    'what does Turnitin percentage mean',
    'is 20 percent similarity bad',
    'Turnitin similarity score university',
    'how does Turnitin work',
    'AI detection university Australia',
    'academic integrity similarity report',
  ],
  openGraph: {
    title: 'How to Read a Turnitin Similarity Report | Plain-English Guide',
    description:
      'What a similarity percentage means, which matches matter, and why a high score is not automatically plagiarism.',
    url,
    type: 'website',
    locale: region.ogLocale,
  },
  alternates: { canonical: url },
}

const faqs = [
  {
    question: 'What is a "good" Turnitin similarity percentage?',
    answer:
      'There is no universal safe number, and any site that gives you one is guessing. Turnitin does not detect plagiarism — it detects text matching. A literature review that quotes and cites heavily might legitimately score 30% or more, while a 12% score made up entirely of one uncited paragraph copied from a website is a genuine integrity problem. Markers look at what is matching and whether it is attributed, not at the headline number.',
  },
  {
    question: 'Why is my similarity score high when I did not copy anything?',
    answer:
      'Common causes are: your reference list matching every other student who cited the same sources, correctly quoted and cited material being counted as matched text, standard phrasing in the assignment question or template, and — most often — your own earlier draft being stored in the repository from a previous submission. Most of these are visible in the report itself once you open it and look at the individual matches.',
  },
  {
    question: 'Does a high score mean I will be reported for misconduct?',
    answer:
      'No. The similarity report is a starting point for a human decision, not a verdict. Your marker reviews which sources matched, how much, and whether the matched text is quoted and referenced. Matching that is properly attributed is not misconduct. What triggers an academic integrity process is unattributed use of someone else\'s work — whether that is copied text, a purchased assignment, or an unacknowledged AI-generated draft.',
  },
  {
    question: 'How do AI-detection flags work, and how reliable are they?',
    answer:
      'AI detectors estimate the statistical predictability of your writing rather than identifying a source, so unlike similarity matching there is nothing concrete to point at. They are known to produce both false positives — particularly for students writing in English as an additional language, and for deliberately plain, formulaic academic prose — and false negatives. Most Australian universities treat an AI flag as a prompt for further inquiry rather than proof, and will typically ask you to discuss your drafting process. Keeping your notes, outlines and version history is the single most useful protection if you are ever asked.',
  },
  {
    question: 'Can I check my own work before submitting?',
    answer:
      'Usually yes, and you should. Most Australian universities provide a draft submission point in their LMS that generates a similarity report without submitting for marking — check your unit site or ask your lecturer. That report is the one that actually matters, because it runs against the same repository your final submission will. Third-party checking sites frequently store what you upload, which can cause your own work to be flagged as a match when you submit it properly.',
  },
  {
    question: 'Can Stack Assignment check my draft for me?',
    answer:
      'Yes, if you need it. Sign in and upload your draft and we will run it through our Turnitin account and send you the full report, not just a number. Two honest caveats. Your university’s own draft submission point is better where you have one, because it runs against the repository your final submission will be compared to, and it costs you nothing. And we submit with repository storage switched off, so your draft is never added to the database — which matters, because a draft stored by a checking service can be matched against you when you submit the real thing.',
  },
]

const sections = [
  {
    title: 'The percentage is a measurement, not a judgement',
    body: 'Turnitin compares your text against student papers, publications and web content, then reports how much matched. That is all it does. It cannot tell whether a match is a properly quoted source, a coincidence of standard phrasing, or genuine copying — that determination is made by a person reading the report. Treating the percentage as a pass/fail threshold is the single most common misunderstanding students have about it.',
  },
  {
    title: 'Open the report and look at the matches',
    body: 'The colour-coded breakdown is more informative than the headline figure. Work through the sources listed: is each matched passage inside quotation marks with a citation? Is it a phrase everyone in your cohort would use? Is it your own reference list? Matches that are attributed or unavoidable are not problems. Matches of continuous prose to a source you did not cite are.',
  },
  {
    title: 'Use the filters your institution enables',
    body: 'Many universities allow the report to exclude quoted material, the bibliography, and small matches below a set word count. If those filters are available to you, applying them usually collapses an alarming-looking percentage into something far more meaningful — and it shows you what your marker will actually be focusing on.',
  },
  {
    title: 'Fix the substance, not the score',
    body: 'If a passage matches because it is under-cited, add the citation. If it matches because you have paraphrased too closely, rewrite it properly from your own understanding of the source rather than swapping synonyms — close paraphrase with a citation is still poor scholarship, and synonym-swapping to lower a number is the behaviour integrity processes are designed to catch. If your quoting is heavy, the real issue is usually that your own argument needs more room.',
  },
  {
    title: 'Keep your working',
    body: 'Drafts, outlines, notes, reading annotations and document version history are the most useful thing you can have if your work is ever queried — whether over similarity or an AI flag. They demonstrate process, which is something no detection tool can assess and no purchased assignment can produce. Google Docs and Word both keep version history automatically.',
  },
]

export default function SimilarityReportPage() {
  return (
    <ToolPageShell
      url={url}
      breadcrumbLabel="Similarity Report Explainer"
      icon={ShieldCheck}
      badge="Free guide"
      title="How to read a similarity report"
      intro="What the percentage actually measures, which matches are worth acting on, and why the number on its own tells you far less than students assume."
      faqs={faqs}
      faqHeading="Frequently asked"
      bodyWidth="narrow"
      banner={
        <div className="flex gap-3 rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-500/10 p-5 mb-10">
          <AlertTriangle className="h-5 w-5 flex-shrink-0 text-amber-600" />
          <p className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
            <span className="font-semibold">Try your university&apos;s own draft point first.</span>{' '}
            The report that matters most is the one your university generates, because it runs
            against the repository your final submission will be compared to — and it is free to
            you. Check your unit site before paying anyone, including us. If your unit does not
            offer a draft submission point,{' '}
            <Link href="/student/similarity-check" className="font-semibold underline">
              we can run a check on your draft
            </Link>
            .
          </p>
        </div>
      }
      ctas={[
        {
          tone: 'accent',
          heading: 'Want a report on your own draft?',
          body: 'If your unit has no draft submission point, sign in and upload your draft. We run it through our Turnitin account with repository storage switched off — so your work is never added to the database it will later be checked against — and send you the full report to read using the guidance above.',
          href: '/student/similarity-check',
          label: 'Upload a draft for checking',
        },
        {
          heading: 'Not sure whether your referencing is doing its job?',
          body: 'Most similarity problems come down to citation and paraphrasing technique rather than deliberate copying. Our referencing tool covers the formatting, and our academic integrity guidance covers the rest.',
          href: '/tools/referencing-formatter',
          label: 'Referencing generator',
          links: [{ href: '/integrity', label: 'Academic integrity guidance' }],
        },
      ]}
    >
      <div className="space-y-10">
        {sections.map((s, i) => (
          <div key={s.title}>
            <h2
              className="flex gap-3 text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-sm font-bold text-indigo-700 dark:text-indigo-300">
                {i + 1}
              </span>
              {s.title}
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-11">{s.body}</p>
          </div>
        ))}
      </div>
    </ToolPageShell>
  )
}
