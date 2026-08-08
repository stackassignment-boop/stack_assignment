import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  CheckCircle2,
  BookOpen,
  MapPin,
  Clock,
  ShieldCheck,
  GraduationCap,
  MessageCircle,
} from 'lucide-react'
import TrustBadges from '@/components/marketing/TrustBadges'
import { universities, getUniversityBySlug } from '@/data/universities'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return universities.map((u) => ({ slug: u.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const uni = getUniversityBySlug(slug)

  if (!uni) {
    return { title: 'University Not Found | Stack Assignment' }
  }

  return {
    title: `${uni.name} Assignment Help | Stack Assignment`,
    description: `Assignment and essay help for ${uni.name} students across ${uni.courseAreas.slice(0, 3).join(', ')} — matched to your unit outline and referencing style.`,
    keywords: [
      `${uni.name} assignment help`,
      `${uni.name} essay help`,
      `${uni.name} assessment help`,
    ],
    openGraph: {
      title: `${uni.name} Assignment Help`,
      description: `Assignment help for ${uni.name} students, matched to your unit outline and referencing style.`,
      url: `https://www.stackassignment.com/universities/${uni.slug}`,
      type: 'website',
    },
  }
}

export default async function UniversityPage({ params }: PageProps) {
  const { slug } = await params
  const uni = getUniversityBySlug(slug)

  if (!uni) {
    notFound()
  }

  const faqs = [
    {
      q: `Do you follow ${uni.name}'s referencing style?`,
      a: `Yes — referencing conventions can vary by unit and lecturer. Upload your unit outline or assessment brief and your writer will match whatever style it specifies, whether that's APA, Harvard, or another format.`,
    },
    {
      q: 'Can you work from a specific unit outline or marking rubric?',
      a: "Yes — upload your unit outline or assessment brief when you place an order, and your writer works directly from the marking criteria for that unit.",
    },
    {
      q: `Do you support every ${uni.name} campus?`,
      a: `Yes — our support is 100% online, so it works the same regardless of which ${uni.name} campus you're studying at.`,
    },
    {
      q: 'What about academic integrity policies?',
      a: `Most institutions, including ${uni.name}, publish an academic integrity or plagiarism policy that's worth reading before ordering from any service, including ours. We provide model answers and reference material meant to help you understand a topic and structure your own original submission — what you submit needs to be your own work. See our Academic Integrity page for details.`,
    },
  ]

  return (
    <main className="flex-grow">
      {/* Hero */}
      <section className="relative text-white py-24 md:py-36 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(30,41,59,0.95), rgba(15,23,42,0.97)), url(https://picsum.photos/id/${uni.heroImageId}/1920/1080)`,
          }}
        />

        <div
          className="absolute rounded-full blur-3xl opacity-30 animate-float"
          style={{
            top: '9%',
            left: '7%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, #6366f1, transparent 70%)',
          }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-25 animate-float"
          style={{
            bottom: '11%',
            right: '9%',
            width: '260px',
            height: '260px',
            background: 'radial-gradient(circle, #a855f7, transparent 70%)',
            animationDelay: '7s',
          }}
        />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 rounded-full px-5 py-2 text-sm font-semibold mb-8 backdrop-blur-sm">
            <GraduationCap className="w-4 h-4" />
            For {uni.name} Students
          </div>

          <h1
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            Assignment Help for<br />{uni.name} Students
          </h1>

          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-10 font-medium">
            Model answers and study support matched to your unit outline and referencing
            style — across every {uni.name} campus.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
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
                <h2 className="text-2xl font-bold">Every Campus</h2>
              </div>
              <p className="text-gray-600 dark:text-slate-400 mb-5">
                100% online support — no need to be near campus in person.
              </p>
              <div className="flex flex-wrap gap-2">
                {uni.campuses.map((c) => (
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
                {uni.courseAreas.map((c) => (
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

      {/* Why this university's students specifically */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
            Why {uni.name} Students Choose Us
          </h2>
          <p className="text-center text-gray-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            Support matched to your unit outline, not a generic template.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-7 shadow-md border border-gray-100 dark:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Unit-Outline Matched</h3>
              <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">
                Upload your unit outline or marking rubric and your writer follows it and your
                specified referencing style exactly.
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
              <h3 className="font-bold text-lg mb-2">Every Campus Covered</h3>
              <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">
                Fully online support means it works the same wherever you're enrolled.
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
            {uni.name} Student FAQs
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
            Get an instant quote for your assignment — takes less than a minute.
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
