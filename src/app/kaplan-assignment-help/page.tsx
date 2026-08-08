import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, BookOpen, MapPin, FileText, Clock, ShieldCheck } from 'lucide-react'
import TrustBadges from '@/components/marketing/TrustBadges'

export const metadata: Metadata = {
  title: 'Kaplan Business School Assignment Help | Stack Assignment',
  description:
    'Assignment and essay help tailored for Kaplan Business School students in Adelaide, Brisbane, Melbourne, Perth and Sydney — written to Kaplan\'s Harvard referencing guide and unit requirements.',
  keywords: [
    'Kaplan assignment help',
    'Kaplan Business School assignment help',
    'Kaplan Harvard referencing',
    'Kaplan essay help',
    'Kaplan Business School assessment help',
  ],
  openGraph: {
    title: 'Kaplan Business School Assignment Help',
    description:
      'Assignment help tailored for Kaplan Business School students — written to Kaplan\'s Harvard referencing guide and unit requirements.',
    url: 'https://www.stackassignment.com/kaplan-assignment-help',
    type: 'website',
  },
}

const campuses = ['Adelaide', 'Brisbane', 'Melbourne', 'Perth', 'Sydney']

const courseAreas = [
  'Business & Management',
  'Accounting',
  'Marketing',
  'Business Analytics',
  'Hospitality & Tourism Management',
  'MBA & Postgraduate Business',
]

const faqs = [
  {
    q: "Do you follow Kaplan's specific Harvard referencing guide?",
    a: "Yes. Kaplan Business School uses its own Harvard referencing guide rather than a generic Harvard style, and it's a significant part of your assessment weighting. Our writers work directly from Kaplan's referencing guide, not a generic Harvard template.",
  },
  {
    q: 'Can you help with a specific unit or assessment brief?',
    a: "Yes — upload your unit outline or assessment brief when you place an order, and your writer will work directly from Kaplan's marking rubric and assessment criteria for that unit.",
  },
  {
    q: 'Do you cover both undergraduate and postgraduate (MBA) work?',
    a: 'Yes, across business, accounting, marketing, business analytics, hospitality and tourism management, at both undergraduate and postgraduate level.',
  },
  {
    q: "What about Kaplan's academic integrity policy?",
    a: "Kaplan publishes a clear assessment and academic integrity policy, and it's worth reading before you order anything from any service, including ours. We provide model answers and reference material intended to help you understand a topic and structure your own original submission — the final piece you submit needs to be your own work. See our Academic Integrity page for details.",
  },
]

export default function KaplanAssignmentHelpPage() {
  return (
    <main className="flex-grow">
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
            For Kaplan Business School Students
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Assignment Help Built Around Kaplan's Requirements
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-10">
            Model answers and study support written to Kaplan's Harvard referencing guide,
            unit outlines, and marking rubrics — across all five Australian campuses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/order"
              className="bg-white text-indigo-700 hover:bg-gray-100 px-10 py-4 rounded-xl text-lg font-bold transition shadow-lg"
            >
              Get Your Quote →
            </Link>
            <Link
              href="/samples"
              className="border-2 border-white hover:bg-white/10 px-10 py-4 rounded-xl text-lg font-semibold transition"
            >
              View Sample Work
            </Link>
          </div>
        </div>
      </section>

      {/* Campuses + course areas */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold">Every Kaplan Campus</h2>
              </div>
              <p className="text-gray-600 dark:text-slate-400 mb-4">
                Whichever campus you're studying at, our support is the same — 100% online, no
                need to be near a physical location.
              </p>
              <div className="flex flex-wrap gap-2">
                {campuses.map((c) => (
                  <span
                    key={c}
                    className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-1.5 rounded-full text-sm font-medium"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold">Course Areas We Cover</h2>
              </div>
              <ul className="space-y-2">
                {courseAreas.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Kaplan students specifically */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Kaplan Students Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md">
              <FileText className="w-8 h-8 text-indigo-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">Kaplan's Harvard Referencing Guide</h3>
              <p className="text-gray-600 dark:text-slate-400 text-sm">
                Kaplan uses its own Harvard referencing guide, not a generic template — a
                meaningful share of your mark. We reference to that exact guide.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md">
              <Clock className="w-8 h-8 text-indigo-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">Trimester-Ready Turnaround</h3>
              <p className="text-gray-600 dark:text-slate-400 text-sm">
                Kaplan's trimester structure means tight assessment windows. We support
                deadlines from two weeks down to under 24 hours.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md">
              <ShieldCheck className="w-8 h-8 text-indigo-600 mb-3" />
              <h3 className="font-bold text-lg mb-2">Rubric-Matched Work</h3>
              <p className="text-gray-600 dark:text-slate-400 text-sm">
                Upload your unit outline or marking rubric and your writer works directly
                from Kaplan's specific assessment criteria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-10 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-6">
          <TrustBadges variant="full" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            Kaplan Student FAQs
          </h2>
          <div className="space-y-4">
            {faqs.map((item) => (
              <div
                key={item.q}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700"
              >
                <h3 className="font-bold text-lg mb-2">{item.q}</h3>
                <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-slate-500 mt-6">
            Read our full{' '}
            <Link href="/integrity" className="text-indigo-600 dark:text-indigo-400 underline">
              Academic Integrity policy
            </Link>{' '}
            before ordering.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg opacity-90 mb-8">
            Get an instant quote for your Kaplan assignment — takes less than a minute.
          </p>
          <Link
            href="/order"
            className="inline-block bg-white text-indigo-700 hover:bg-gray-100 px-10 py-4 rounded-xl text-lg font-bold transition shadow-lg"
          >
            Get Your Quote →
          </Link>
        </div>
      </section>
    </main>
  )
}
