import { Metadata } from 'next'
import Link from 'next/link'
import { Calculator, BookOpen, HelpCircle, ArrowRight } from 'lucide-react'
import WamCalculator from '@/components/tools/WamCalculator'
import {
  region,
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/lib/seo-config'

const url = 'https://www.stackassignment.com/tools/wam-calculator'

export const metadata: Metadata = {
  title: 'WAM Calculator | Weighted Average Mark for AU Universities',
  description:
    'Free WAM calculator for Australian university students. Work out your Weighted Average Mark from unit marks and credit points, convert it to a 7-point GPA, see your honours class, and find the average you need to hit a target WAM.',
  keywords: [
    'WAM calculator',
    'how to calculate weighted average mark',
    'weighted average mark calculator Australia',
    'WAM calculator Australia',
    'WAM to GPA converter',
    'what WAM do I need for honours',
    'WAM vs GPA Australia',
    'credit point weighted average university',
  ],
  openGraph: {
    title: 'WAM Calculator | Weighted Average Mark for AU Universities',
    description:
      'Calculate your Weighted Average Mark from unit marks and credit points, convert to GPA, and see what you need for a target WAM.',
    url,
    type: 'website',
    locale: region.ogLocale,
  },
  alternates: { canonical: url },
}

/**
 * These are answered in the visible copy below and mirrored into FAQPage
 * markup from the same array, so the two can never disagree. Each one is a real
 * query with AU-only volume — "does WAM include failed units" in particular is
 * the misconception that drives most of the searches for this term.
 */
const faqs = [
  {
    question: 'How is WAM calculated?',
    answer:
      'WAM is the average of your unit marks weighted by each unit’s credit points: multiply every mark by that unit’s credit points, add the results together, then divide by the total credit points. A 12-credit-point unit therefore moves your WAM twice as much as a 6-credit-point one. Some universities add a year-level weighting on top, so later-year units count for more.',
  },
  {
    question: 'Does WAM include failed units?',
    answer:
      'Usually yes. Most Australian universities include failed attempts in your WAM, which is why a calculated WAM often comes out lower than students expect. Withdrawn units are normally excluded, and rules on repeated units vary — check your own course rules, because this is the detail institutions differ on most.',
  },
  {
    question: 'What is the difference between WAM and GPA?',
    answer:
      'WAM is your actual average percentage mark, so 74.6 and 79.4 are different numbers. GPA converts each unit to a grade point first — usually on a 7-point scale in Australia — so both of those marks become the same grade point. WAM is the more precise measure, which is why Australian honours admission and scholarship decisions generally use it rather than GPA.',
  },
  {
    question: 'What WAM do I need for honours?',
    answer:
      'A common Australian scheme awards First Class (H1) at 80 and above, Second Class Division A (H2A) at 75–79, Division B (H2B) at 70–74 and Third Class (H3) at 65–69. Thresholds are not universal — some institutions set H1 at 85, and some weight a thesis mark separately from coursework — so treat any calculator result as indicative and confirm with your faculty.',
  },
  {
    question: 'Is a WAM of 70 good?',
    answer:
      'A WAM of 70 sits in the Distinction band at universities using the 80/70/60/50 scale, and in the Credit band where Distinction starts at 75. It is comfortably above the pass and credit range and is competitive for many postgraduate coursework programs, though the most selective honours and research pathways typically look for 75 or higher.',
  },
]

export default function WamCalculatorPage() {
  return (
    <main className="flex-grow">
      {/*
        Three schema types, each doing a distinct job: WebApplication marks this
        up as a free tool (which is what earns it a place in tool round-ups and
        the backlinks that come with them), BreadcrumbList gives the SERP a
        readable path, and FAQPage targets the question queries below.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            generateWebApplicationSchema({
              name: 'WAM Calculator',
              description:
                'Free Weighted Average Mark calculator for Australian university students, with credit-point and year-level weighting, GPA conversion and honours estimates.',
              url,
              category: 'EducationalApplication',
            }),
            generateBreadcrumbSchema([
              { name: 'Home', url: 'https://www.stackassignment.com' },
              { name: 'Free Tools', url: 'https://www.stackassignment.com/tools' },
              { name: 'WAM Calculator', url },
            ]),
            generateFAQSchema(faqs),
          ]),
        }}
      />

      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-white/70">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/tools" className="hover:text-white">
              Free Tools
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">WAM Calculator</span>
          </nav>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/30 px-4 py-1.5 text-sm font-semibold mb-5">
            <Calculator className="h-4 w-4" />
            Free &middot; No sign-up
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            WAM Calculator
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            Work out your Weighted Average Mark the way Australian universities do &mdash; weighted
            by credit points, with failed units counted. Convert it to a 7-point GPA, check your
            indicative honours class, and see what you need to average to reach a target.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <WamCalculator />

        {/* ---------- The guide half of the page ---------- */}
        <section className="mt-16 prose-headings:font-bold">
          <h2
            className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-gray-900 dark:text-slate-100"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            How to calculate your WAM
          </h2>
          <p className="mt-4 text-gray-700 dark:text-slate-300 leading-relaxed">
            Your Weighted Average Mark is the average of your unit marks, weighted so that units
            worth more credit points count for more. It is a distinctly Australian measure &mdash;
            there is no direct UK equivalent, which is why converting between a WAM and a UK degree
            classification is never exact.
          </p>
          <p className="mt-4 text-gray-700 dark:text-slate-300 leading-relaxed">
            The formula is:
          </p>
          <p className="mt-4 rounded-xl bg-gray-100 dark:bg-slate-800 px-5 py-4 font-mono text-sm text-gray-900 dark:text-slate-100">
            WAM = sum of (mark &times; credit points) &divide; sum of (credit points)
          </p>
          <p className="mt-4 text-gray-700 dark:text-slate-300 leading-relaxed">
            So a student with 78 in a 12-credit-point unit and 64 in a 6-credit-point unit has a
            WAM of ((78 &times; 12) + (64 &times; 6)) &divide; 18 = 73.3 &mdash; not 71, which is
            what a plain average of the two marks would give. That gap is the whole point of the
            weighting, and it is why eyeballing your marks tends to mislead.
          </p>

          <h3 className="mt-10 text-xl font-bold text-gray-900 dark:text-slate-100">
            Where universities differ
          </h3>
          <p className="mt-3 text-gray-700 dark:text-slate-300 leading-relaxed">
            Three things vary between institutions, and all three are options in the calculator
            above. First, grade boundaries: most universities put High Distinction at 80, but UNSW,
            Sydney, UTS and Macquarie start it at 85, which changes the band your WAM falls into
            without changing the number itself. Second, year-level weighting: Macquarie, UTS and
            Sydney multiply each unit&rsquo;s weight by its year level, so a third-year unit shifts
            your WAM three times as much as a first-year one, while Monash, Deakin and many others
            weight by credit points alone. Third, exclusions: rules on repeated units,
            cross-institutional credit and units graded on a pass/fail basis are set locally.
          </p>
          <p className="mt-4 text-gray-700 dark:text-slate-300 leading-relaxed">
            The one rule that is close to universal is the one students most often get wrong:
            failed units generally do count. A single fail early in a degree can hold a WAM down
            for several semesters, because the zero-to-49 mark stays in the numerator while its
            credit points stay in the denominator.
          </p>

          <h3 className="mt-10 text-xl font-bold text-gray-900 dark:text-slate-100">
            WAM, GPA and honours
          </h3>
          <p className="mt-3 text-gray-700 dark:text-slate-300 leading-relaxed">
            A GPA collapses each unit into a grade point before averaging, so a 71 and a 79 both
            become a 6 on the 7-point scale. A WAM keeps the detail. This is why Australian honours
            admission, scholarship rankings and postgraduate selection usually quote a WAM
            threshold rather than a GPA one &mdash; and why a strong GPA can sit alongside a WAM
            that falls just short of the cut-off you are aiming at.
          </p>

          {/* ---------- FAQ, mirrored into FAQPage schema above ---------- */}
          <h2
            className="mt-14 flex items-center gap-2 text-2xl md:text-3xl font-bold text-gray-900 dark:text-slate-100"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            <HelpCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            WAM questions students ask
          </h2>
          <div className="mt-6 space-y-5">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5"
              >
                <h3 className="font-bold text-gray-900 dark:text-slate-100">{faq.question}</h3>
                <p className="mt-2 text-gray-700 dark:text-slate-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Honest CTA, tied to a specific service ---------- */}
        <section className="mt-14 rounded-2xl border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/10 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">
            Trying to lift your WAM next semester?
          </h2>
          <p className="mt-3 text-gray-700 dark:text-slate-300 leading-relaxed">
            A calculator tells you where you stand; it cannot tell you what cost you the marks.
            That is usually structure, argument or referencing rather than effort. Our tutors work
            through your marked feedback with you, and our editors work inside your own draft using
            tracked changes so you can see exactly what changed and why.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              See tutoring &amp; editing options <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-xl border border-indigo-300 dark:border-indigo-500/40 px-5 py-3 text-sm font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-white dark:hover:bg-slate-800 transition-colors"
            >
              Pricing in AUD
            </Link>
          </div>
        </section>

        {/* Internal links: gives the tool a path back into the money pages and
            spreads equity from whatever links this page earns. */}
        <nav className="mt-10 text-sm text-gray-600 dark:text-slate-400">
          <span className="font-semibold text-gray-900 dark:text-slate-200">Related:</span>{' '}
          <Link href="/tools" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            all free study tools
          </Link>
          {' · '}
          <Link href="/universities" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            support by university
          </Link>
          {' · '}
          <Link href="/integrity" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            our academic integrity policy
          </Link>
        </nav>
      </div>
    </main>
  )
}
