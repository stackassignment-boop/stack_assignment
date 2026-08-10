import { Metadata } from 'next'
import Link from 'next/link'
import {
  CheckCircle2,
  BookOpen,
  MapPin,
  Clock,
  ShieldCheck,
  GraduationCap,
  MessageCircle,
  Cpu,
} from 'lucide-react'
import TrustBadges from '@/components/marketing/TrustBadges'

export const metadata: Metadata = {
  title: 'Melbourne Institute of Technology Assignment Help | Stack Assignment',
  description:
    'Assignment and essay help for Melbourne Institute of Technology (MIT) students across business, IT, data analytics, and engineering — Melbourne and Sydney campuses.',
  keywords: [
    'Melbourne Institute of Technology assignment help',
    'MIT Melbourne assignment help',
    'MIT Sydney assignment help',
    'Melbourne Institute of Technology essay help',
  ],
  openGraph: {
    title: 'Melbourne Institute of Technology Assignment Help',
    description:
      'Assignment help for Melbourne Institute of Technology students across business, IT, data analytics, and engineering.',
    url: 'https://www.stackassignment.com/melbourne-institute-of-technology-assignment-help',
    type: 'website',
  },
}

const campuses = ['Melbourne (Argus Building)', 'Sydney']

const courseAreas = [
  'Business & Management',
  'Accounting',
  'Marketing',
  'Information Technology',
  'Data Analytics',
  'Software Engineering',
  'Computer Networking',
  'Telecommunications Engineering',
]

const faqs = [
  {
    q: 'Do you cover technical courses like software engineering and networking, not just business?',
    a: "Yes — alongside business, accounting, and marketing, we cover MIT's IT-focused programs: software engineering, computer networking, telecommunications engineering, and data analytics assignments and reports.",
  },
  {
    q: 'Can you follow the referencing style my unit outline specifies?',
    a: "Yes. Referencing conventions can vary by unit and lecturer at MIT — upload your unit outline or assessment brief and your writer will match whatever style (APA, Harvard, or otherwise) it specifies.",
  },
  {
    q: 'Do you support both the Melbourne and Sydney campuses?',
    a: "Yes — our support is 100% online, so it works the same whether you're studying at MIT's Melbourne campus or the Sydney campus.",
  },
  {
    q: "What about MIT's academic integrity policy?",
    a: "Like most institutions, MIT has an academic integrity and plagiarism policy that's worth reading before ordering from any service, including ours. We provide model answers and reference material meant to help you understand a topic and structure your own original submission — what you submit needs to be your own work. See our Academic Integrity page for details.",
  },
]

export default function MITAssignmentHelpPage() {
  return (
    <main className="flex-grow">
      {/* Hero */}
      <section className="relative text-white py-24 md:py-36 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(30,41,59,0.95), rgba(15,23,42,0.97)), url(https://picsum.photos/id/1074/1920/1080)',
          }}
        />

        <div
          className="absolute rounded-full blur-3xl opacity-30 animate-float"
          style={{
            top: '10%',
            left: '8%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, #6366f1, transparent 70%)',
          }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-25 animate-float"
          style={{
            bottom: '12%',
            right: '10%',
            width: '260px',
            height: '260px',
            background: 'radial-gradient(circle, #a855f7, transparent 70%)',
            animationDelay: '7s',
          }}
        />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 rounded-full px-5 py-2 text-sm font-semibold mb-8 backdrop-blur-sm">
            <GraduationCap className="w-4 h-4" />
            For Melbourne Institute of Technology Students
          </div>

          <h1
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            Assignment Help for<br />MIT Melbourne &amp; Sydney Students
          </h1>

          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-10 font-medium">
            From business and accounting to software engineering and data analytics —
            support matched to your unit outline, whichever campus you're on.
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
                <h2 className="text-2xl font-bold">Both MIT Campuses</h2>
              </div>
              <p className="text-gray-600 dark:text-slate-400 mb-5">
                100% online support — no need to be near either campus in person.
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
              <ul className="grid grid-cols-1 gap-2.5">
                {courseAreas.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why MIT students specifically */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
            Why MIT Students Choose Us
          </h2>
          <p className="text-center text-gray-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            MIT's course mix spans business and heavily technical programs — we cover both.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-7 shadow-md border border-gray-100 dark:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
                <Cpu className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Technical + Business Coverage</h3>
              <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">
                From software engineering and networking reports to business case studies —
                one service that actually covers MIT's full course mix.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-7 shadow-md border border-gray-100 dark:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Flexible Turnaround</h3>
              <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">
                Deadlines from two weeks out down to under 24 hours, matched to your
                assessment schedule.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-7 shadow-md border border-gray-100 dark:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Unit-Outline Matched</h3>
              <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">
                Upload your unit outline or marking rubric and your writer follows it
                exactly, including whatever referencing style it specifies.
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ fontFamily: 'Sora, sans-serif' }}>
            MIT Student FAQs
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
            Get an instant quote for your MIT assignment — takes less than a minute.
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
