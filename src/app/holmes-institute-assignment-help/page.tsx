import { Metadata } from 'next'
import { region } from '@/lib/seo-config'
import Link from 'next/link'
import {
  CheckCircle2,
  BookOpen,
  MapPin,
  Clock,
  ShieldCheck,
  GraduationCap,
  MessageCircle,
  Award,
} from 'lucide-react'
import TrustBadges from '@/components/marketing/TrustBadges'
import RegionalSeoLinks from '@/components/seo/RegionalSeoLinks'

export const metadata: Metadata = {
  title: "Holmes Institute Assignment Support | Academic Help",
  description:
    "Holmes Institute academic support in Australia \u2014 assessment guidance, draft feedback, proofreading and referencing for business, accounting, information systems and MBA students.",
  keywords: [
    'Holmes Institute assignment support',
    'Holmes Institute essay feedback',
    'Holmes Institute MBA assignment support',
    'Holmes Institute Harvard referencing',
  ],
  openGraph: {
    title: "Holmes Institute Assignment Support | Academic Help",
    description: "Holmes Institute academic support in Australia \u2014 assessment guidance, draft feedback, proofreading and referencing for business, accounting, information systems and MBA students.",
    url: 'https://www.stackassignment.com/holmes-institute-assignment-help',
    type: 'website',
    locale: region.ogLocale,
  },
  alternates: { canonical: 'https://www.stackassignment.com/holmes-institute-assignment-help' },
}

const campuses = ['Melbourne', 'Sydney', 'Brisbane', 'Gold Coast', 'Cairns']

const courseAreas = [
  'Business & Management',
  'Professional Accounting',
  'Information Systems',
  'MBA & Postgraduate Business',
  'Graduate Diploma in Business',
  'Diploma & Pathway Programs',
]

const faqs = [
  {
    q: 'Do you follow Harvard referencing for Holmes assignments?',
    a: "Yes — Holmes Institute coursework typically uses Harvard-style referencing, and it's a key part of your assessment criteria alongside SafeAssign originality checks. Our tutors and editors work to it and explain the rules as they go.",
  },
  {
    q: "Can you handle a specific unit like Holmes' HI-coded subjects?",
    a: 'Yes — upload your unit outline or assessment brief (including group case study or individual report requirements) and your tutor works directly from the marking rubric provided.',
  },
  {
    q: "Do you cover Holmes' MBA program specifically?",
    a: "Yes. Holmes runs one of Australia's largest MBA programs by enrolment, and we support MBA-level coursework alongside undergraduate business, accounting, and information systems work.",
  },
  {
    q: "What about Holmes' Academic Integrity Module (AIM) and plagiarism policy?",
    a: "Holmes requires students to complete an Academic Integrity Module in their first trimester, and academic misconduct is treated seriously in any form. It's worth completing that module and reading Holmes' policy before engaging any service, including ours. To be direct about where we sit: we do not write, rewrite or supply work for submission, and we do not sell model answers or reference papers. We tutor, we edit drafts you have written, and we mark your work against the rubric so you know what to change. What you submit has to be your own. See our Academic Integrity page for details.",
  },
]

export default function HolmesAssignmentHelpPage() {
  return (
    <main className="flex-grow">
      {/* Hero */}
      <section className="stack-regional-hero relative text-white py-24 md:py-36 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'none',
          }}
        />

        <div
          className="absolute rounded-full blur-3xl opacity-30 animate-float"
          style={{
            top: '9%',
            left: '7%',
            width: '310px',
            height: '310px',
            background: 'radial-gradient(circle, #6366f1, transparent 70%)',
          }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-25 animate-float"
          style={{
            bottom: '11%',
            right: '9%',
            width: '270px',
            height: '270px',
            background: 'radial-gradient(circle, #a855f7, transparent 70%)',
            animationDelay: '7s',
          }}
        />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 rounded-full px-5 py-2 text-sm font-semibold mb-8 backdrop-blur-sm">
            <GraduationCap className="w-4 h-4" />
            For Holmes Institute Students
          </div>

          <h1
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            Assignment Support for<br />Holmes Institute Students
          </h1>

          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-10 font-medium">
            Business, accounting, information systems, and MBA support — matched to Holmes'
            Harvard referencing and unit rubrics, across all five Australian campuses.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              href="/order"
              className="bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-10 py-4 rounded-xl text-lg font-bold transition shadow-xl shadow-yellow-400/30 hover:shadow-2xl hover:scale-105 active:scale-95 min-w-[240px]"
            >
              Get Quote in 60 Seconds →
            </Link>
            <Link
              href="/samples"
              className="border-2 border-white/70 hover:bg-white/10 px-10 py-4 rounded-xl text-lg font-semibold transition min-w-[240px]"
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
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-800/50 rounded-2xl p-8 border border-indigo-100 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold">Every Australian Campus</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-5">
                100% online support — the same whichever Holmes campus you're enrolled at.
              </p>
              <div className="flex flex-wrap gap-2">
                {campuses.map((c) => (
                  <span
                    key={c}
                    className="bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm border border-indigo-100 dark:border-slate-600"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-800/50 rounded-2xl p-8 border border-indigo-100 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold">Course Areas We Cover</h2>
              </div>
              <ul className="space-y-2.5">
                {courseAreas.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Holmes students specifically */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
            Why Holmes Students Choose Us
          </h2>
          <p className="text-center text-slate-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            Holmes runs one of Australia's largest MBA programs — we're set up for both
            postgraduate and undergraduate coursework.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-7 shadow-md border border-slate-100 dark:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
                <Award className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">MBA & Postgraduate Ready</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Support built for Holmes' large MBA cohort, alongside Graduate Diploma and
                undergraduate business coursework.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-7 shadow-md border border-slate-100 dark:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Three-Intake Ready Turnaround</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Holmes runs three intakes a year — we support deadlines from two weeks out
                down to under 24 hours regardless of when your trimester started.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-7 shadow-md border border-slate-100 dark:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Rubric-Matched Work</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Upload your unit outline or marking rubric and your tutor follows it and
                Holmes' Harvard referencing conventions exactly.
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


      <RegionalSeoLinks heading="Related student resources" items={[{"title": "Harvard referencing guide", "description": "A practical referencing workflow for university essays and reports.", "href": "/guides/harvard-referencing-australia"}, {"title": "How to read an assessment brief", "description": "Turn a rubric into a clear assessment plan before you write.", "href": "/guides/read-assessment-brief-australia"}]} />
      {/* FAQ */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ fontFamily: 'Sora, sans-serif' }}>
            Holmes Student FAQs
          </h2>
          <div className="space-y-4">
            {faqs.map((item) => (
              <div
                key={item.q}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 transition hover:shadow-md"
              >
                <h3 className="font-bold text-lg mb-2 flex items-start gap-2">
                  <MessageCircle className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                  {item.q}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed pl-7">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 dark:text-slate-500 mt-6">
            Read our full{' '}
            <Link href="/integrity" className="text-indigo-600 dark:text-indigo-400 underline font-medium">
              Academic Integrity policy
            </Link>{' '}
            before you book.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 overflow-hidden stack-cta-band">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, white 0%, transparent 8%), radial-gradient(circle at 80% 70%, white 0%, transparent 6%)',
          }}
        />
        <div className="max-w-3xl mx-auto px-6 text-center text-white relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Ready to Get Started?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Get an instant quote for your Holmes assignment — takes less than a minute.
          </p>
          <Link
            href="/order"
            className="inline-block bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-10 py-4 rounded-xl text-lg font-bold transition shadow-xl shadow-yellow-400/30 hover:shadow-2xl hover:scale-105 active:scale-95"
          >
            Get Your Quote →
          </Link>
        </div>
      </section>
    </main>
  )
}
