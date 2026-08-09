import { Metadata } from 'next'
import Link from 'next/link'
import {
  CheckCircle2,
  BookOpen,
  MapPin,
  FileText,
  Clock,
  ShieldCheck,
  GraduationCap,
  MessageCircle,
  Code2,
  ArrowRight,
  AlertCircle,
} from 'lucide-react'
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

// Sourced directly from Kaplan Business School's own Subject Offerings
// document (kbs.edu.au/documents/subject-offerings, published June 2026).
// Prerequisites shown as they appear in that document. "Nil" means no
// prerequisite. Verified against the source rather than assumed — one
// correction worth flagging: TEC205 is "Bitcoin", not "Introduction to
// Information Networks" (that's TEC105).
interface Subject {
  code: string
  name: string
  prereq: string | null
}

const undergradSubjects: Subject[] = [
  { code: 'TEC100', name: 'Introduction to Information Technology', prereq: null },
  { code: 'TEC101', name: 'Professional Practice and Communication in IT', prereq: null },
  { code: 'TEC102', name: 'Fundamentals of Programming', prereq: null },
  { code: 'TEC103', name: 'Information Systems in Business', prereq: null },
  { code: 'TEC104', name: 'Database Design and Management', prereq: null },
  { code: 'TEC105', name: 'Introduction to Information Networks', prereq: null },
  { code: 'TEC106', name: 'IT Project Management', prereq: 'TEC103' },
  { code: 'TEC108', name: 'Cyber Security', prereq: 'TEC103 & TEC105' },
  { code: 'TEC201', name: 'Data Visualisation in R', prereq: 'TEC102' },
  { code: 'TEC202', name: 'Artificial Intelligence and Machine Learning in IT', prereq: 'TEC102' },
  { code: 'TEC203', name: 'UX and Design Thinking', prereq: 'TEC101' },
  { code: 'TEC204', name: 'Digital Forensics', prereq: 'TEC108' },
  { code: 'TEC205', name: 'Bitcoin', prereq: 'TEC102' },
  { code: 'TEC206', name: 'Intermediate Programming', prereq: 'TEC102' },
  { code: 'TEC207', name: 'Service and Operations Management in IT', prereq: 'TEC101' },
  { code: 'TEC301', name: 'Machine Learning Applications', prereq: 'TEC102 & TEC104' },
  { code: 'TEC302', name: 'Website Development', prereq: 'TEC102' },
  { code: 'TEC303', name: 'Mobile Development', prereq: 'TEC102' },
  { code: 'TEC304', name: 'Advanced Programming', prereq: 'TEC206' },
  { code: 'TEC305', name: 'Algorithms and Data Structures', prereq: 'TEC102' },
  { code: 'TEC307', name: 'IT Capstone', prereq: 'Final or penultimate trimester only' },
  { code: 'TEC308', name: 'Penetration Testing', prereq: 'TEC102 & TEC108' },
]

const postgradSubjects: Subject[] = [
  { code: 'TECH1100', name: 'Professional Practice and Communication in IT', prereq: null },
  { code: 'TECH1200', name: 'Programming in Python', prereq: null },
  { code: 'TECH1300', name: 'Information Systems in Business', prereq: null },
  { code: 'TECH1400', name: 'Database Design and Management', prereq: null },
  { code: 'TECH2100', name: 'Information Networks', prereq: null },
  { code: 'TECH2200', name: 'IT Project Management', prereq: 'TECH1300' },
  { code: 'TECH2300', name: 'Service and Operations Management in IT', prereq: 'TECH1100' },
  { code: 'TECH2400', name: 'Cyber Security', prereq: 'TECH1300 & TECH2100' },
  { code: 'TECH3100', name: 'Data Visualisation in R', prereq: 'TECH1200' },
  { code: 'TECH3200', name: 'Artificial Intelligence and Machine Learning in IT', prereq: 'TECH1200' },
  { code: 'TECH3300', name: 'Machine Learning Applications', prereq: 'TECH1200 & TECH1400' },
  { code: 'TECH4100', name: 'UX and Design Thinking', prereq: 'TECH1100' },
  { code: 'TECH4200', name: 'Website Development', prereq: 'TECH1200' },
  { code: 'TECH4300', name: 'Mobile Development', prereq: 'TECH1200' },
  { code: 'TECH5100', name: 'Penetration Testing', prereq: 'TECH1200 & TECH2400' },
  { code: 'TECH5200', name: 'Digital Forensics', prereq: 'TECH2400' },
  { code: 'TECH5300', name: 'Bitcoin', prereq: 'TECH1200' },
  { code: 'TECH6100', name: 'Intermediate Programming', prereq: 'TECH1200' },
  { code: 'TECH6200', name: 'Advanced Programming', prereq: 'TECH6100' },
  { code: 'TECH6300', name: 'Algorithms and Data Structures', prereq: 'TECH1200' },
  { code: 'TECH8000', name: 'IT Capstone', prereq: 'Final or penultimate trimester only' },
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
      {/* Hero — dark gradient with floating shapes, matching site's HeroSection language */}
      <section className="relative text-white py-24 md:py-36 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(30,41,59,0.95), rgba(15,23,42,0.97)), url(https://picsum.photos/id/1005/1920/1080)',
          }}
        />

        {/* Floating gradient blobs for visual depth */}
        <div
          className="absolute rounded-full blur-3xl opacity-30 animate-float"
          style={{
            top: '8%',
            left: '6%',
            width: '320px',
            height: '320px',
            background: 'radial-gradient(circle, #6366f1, transparent 70%)',
          }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-25 animate-float"
          style={{
            bottom: '10%',
            right: '8%',
            width: '280px',
            height: '280px',
            background: 'radial-gradient(circle, #a855f7, transparent 70%)',
            animationDelay: '7s',
          }}
        />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 rounded-full px-5 py-2 text-sm font-semibold mb-8 backdrop-blur-sm">
            <GraduationCap className="w-4 h-4" />
            For Kaplan Business School Students
          </div>

          <h1
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            Assignment Help Built Around<br />Kaplan's Requirements
          </h1>

          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-10 font-medium">
            Model answers and study support written to Kaplan's Harvard referencing guide,
            unit outlines, and marking rubrics — across all five Australian campuses.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-8">
            <Link
              href="/order"
              className="bg-white text-indigo-700 hover:bg-gray-100 px-10 py-4 rounded-xl text-lg font-bold transition shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 min-w-[240px]"
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
                <h2 className="text-2xl font-bold">Every Kaplan Campus</h2>
              </div>
              <p className="text-gray-600 dark:text-slate-400 mb-5">
                Whichever campus you're studying at, our support is the same — 100% online, no
                need to be near a physical location.
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
            Why Kaplan Students Choose Us
          </h2>
          <p className="text-center text-gray-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            Built around the specifics of studying at Kaplan Business School — not a generic
            template.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-7 shadow-md border border-gray-100 dark:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Kaplan's Harvard Referencing Guide</h3>
              <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">
                Kaplan uses its own Harvard referencing guide, not a generic template — a
                meaningful share of your mark. We reference to that exact guide.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-7 shadow-md border border-gray-100 dark:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Trimester-Ready Turnaround</h3>
              <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">
                Kaplan's trimester structure means tight assessment windows. We support
                deadlines from two weeks down to under 24 hours.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-7 shadow-md border border-gray-100 dark:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Rubric-Matched Work</h3>
              <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">
                Upload your unit outline or marking rubric and your writer works directly
                from Kaplan's specific assessment criteria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IT Subjects & Prerequisites */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 rounded-full px-5 py-2 text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-5">
              <Code2 className="w-4 h-4" />
              Bachelor & Master of IT
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
              IT Subjects We Cover
            </h2>
            <p className="text-gray-600 dark:text-slate-400 max-w-2xl mx-auto mb-2">
              Every subject code below is taken directly from Kaplan's own subject offerings
              guide, including prerequisites — so you know exactly what needs to come first.
            </p>
          </div>

          {/* Prerequisite chain callout, using the example you asked about */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-800/50 border border-indigo-100 dark:border-slate-700 rounded-2xl p-6 mb-10">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-base mb-2">Subjects Build on Each Other</h3>
                <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
                  Several programming subjects have prerequisites, so check you've completed
                  the earlier subject before enrolling. For example:
                </p>
                <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
                  <span className="bg-white dark:bg-slate-700 px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-slate-600">TEC102 — Fundamentals of Programming</span>
                  <ArrowRight className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span className="bg-white dark:bg-slate-700 px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-slate-600">TEC206 — Intermediate Programming</span>
                  <ArrowRight className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span className="bg-white dark:bg-slate-700 px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-slate-600">TEC304 — Advanced Programming</span>
                </div>
                <p className="text-gray-500 dark:text-slate-500 text-xs mt-3">
                  The postgraduate Master of IT follows the same pattern: TECH1200 (Programming
                  in Python) → TECH6100 (Intermediate Programming) → TECH6200 (Advanced
                  Programming).
                </p>
              </div>
            </div>
          </div>

          {/* Undergraduate table */}
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            Bachelor of Information Technology
          </h3>
          <div className="overflow-x-auto mb-12 rounded-xl border border-gray-100 dark:border-slate-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-800 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Code</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Subject Name</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Prerequisite</th>
                </tr>
              </thead>
              <tbody>
                {undergradSubjects.map((s, i) => (
                  <tr
                    key={s.code}
                    className={i % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-gray-50/60 dark:bg-slate-900'}
                  >
                    <td className="px-4 py-3 font-mono font-semibold text-indigo-700 dark:text-indigo-400 whitespace-nowrap">{s.code}</td>
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{s.name}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-slate-400">{s.prereq ?? 'None'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Postgraduate table */}
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            Graduate Certificate / Diploma / Master of IT
          </h3>
          <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-slate-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-800 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Code</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Subject Name</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Prerequisite</th>
                </tr>
              </thead>
              <tbody>
                {postgradSubjects.map((s, i) => (
                  <tr
                    key={s.code}
                    className={i % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-gray-50/60 dark:bg-slate-900'}
                  >
                    <td className="px-4 py-3 font-mono font-semibold text-indigo-700 dark:text-indigo-400 whitespace-nowrap">{s.code}</td>
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{s.name}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-slate-400">{s.prereq ?? 'None'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-gray-400 dark:text-slate-500 mt-6 text-center">
            Subject codes and prerequisites sourced from Kaplan Business School's official
            subject offerings guide (kbs.edu.au). Subjects and prerequisites can change between
            trimesters — always confirm against your current unit outline.
          </p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ fontFamily: 'Sora, sans-serif' }}>
            Kaplan Student FAQs
          </h2>
          <div className="space-y-4">
            {faqs.map((item) => (
              <div
                key={item.q}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 transition hover:shadow-md"
              >
                <h3 className="font-bold text-lg mb-2 flex items-start gap-2">
                  <MessageCircle className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                  {item.q}
                </h3>
                <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed pl-7">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-slate-500 mt-6">
            Read our full{' '}
            <Link href="/integrity" className="text-indigo-600 dark:text-indigo-400 underline font-medium">
              Academic Integrity policy
            </Link>{' '}
            before ordering.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600">
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
            Get an instant quote for your Kaplan assignment — takes less than a minute.
          </p>
          <Link
            href="/order"
            className="inline-block bg-white text-indigo-700 hover:bg-gray-100 px-10 py-4 rounded-xl text-lg font-bold transition shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
          >
            Get Your Quote →
          </Link>
        </div>
      </section>
    </main>
  )
}
