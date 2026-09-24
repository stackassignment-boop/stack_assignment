import { Metadata } from 'next'
import Link from 'next/link'
import { Users, Award, Target, Globe, BookOpen, CheckCircle2 } from 'lucide-react'
import { region, seoConfig, generateBreadcrumbSchema } from '@/lib/seo-config'

const url = 'https://www.stackassignment.com/about'

export const metadata: Metadata = {
  title: 'About Stack Assignment | AU Tutoring & Editing Since 2010',
  description:
    'Who we are: tutors and editors who work with Australian university students on the material, the draft and the rubric — and never on the submission itself. Covering 27 AU and UK institutions.',
  keywords: [
    'about stack assignment',
    'academic tutoring service Australia',
    'academic editing service Australia',
    'university tutors Australia',
  ],
  openGraph: {
    title: 'About Stack Assignment | AU Tutoring & Editing Since 2010',
    description:
      'Tutors and editors for Australian university students. We work on the material, the draft and the rubric — never on the submission itself.',
    url,
    type: 'website',
    locale: region.ogLocale,
  },
  alternates: { canonical: url },
}

/*
  Rewritten from an "academic writing assistance" page. The previous version
  described a writing business ("Every assignment we deliver is crafted with
  care", "500+ expert writers"), which contradicts the positioning in the rest
  of the site, and it led with four statistics — 500+ writers, 50K+ assignments,
  50+ countries, 99% satisfaction — that nothing in the codebase substantiates.
  Unsubstantiated performance figures are representations under the Australian
  Consumer Law (Competition and Consumer Act 2010 Sch 2 ss 18, 29), so they have
  been replaced with four figures that can each be checked against the site
  itself.

  NOTE ON THE FOUNDING YEAR: this page previously said 2018, while the footer
  said "© 2010–2026" and the supplied copy deck said "since 2010". 2010 is used
  here and everywhere else, sourced from seoConfig.organization.foundingDate so
  there is a single place to correct it. Only the owner knows which is right —
  and an inaccurate founding date is precisely the kind of representation the
  rest of this pass exists to remove, so it is worth confirming.
*/

// Counted from the site: 19 hand-built institution pages plus the entries in
// src/data/universities.ts. Update alongside src/app/universities/page.tsx.
const INSTITUTION_COUNT = 27

const stats = [
  {
    value: seoConfig.organization.foundingDate,
    label: 'Supporting students since',
    color: 'text-indigo-600 dark:text-indigo-400',
  },
  {
    value: `${INSTITUTION_COUNT}`,
    label: 'Institution-specific guides',
    color: 'text-purple-600 dark:text-purple-400',
  },
  {
    value: '4',
    label: 'Referencing styles covered in depth',
    color: 'text-indigo-600 dark:text-indigo-400',
  },
  {
    value: '1:1',
    label: 'Every tutoring session',
    color: 'text-indigo-600 dark:text-indigo-400',
  },
]

const values = [
  {
    icon: CheckCircle2,
    color: 'text-green-600 dark:text-green-400',
    title: 'Your work stays yours',
    body: 'We explain, review and edit. We do not write the thing you submit, and we will say no if asked. That constraint shapes every service on this site rather than sitting in a disclaimer at the bottom of it.',
  },
  {
    icon: Award,
    color: 'text-amber-600 dark:text-amber-400',
    title: 'Australian by design',
    body: 'Unit guides, census dates, WAM, AGLC4 and the marking rubrics your faculty actually publishes. Advice written for a UK or US system is subtly wrong here, and subtly wrong advice costs marks.',
  },
  {
    icon: Users,
    color: 'text-indigo-600 dark:text-indigo-400',
    title: 'Matched to the unit, not the subject',
    body: 'A tutor who has worked in your discipline at your level, briefed on the specific assessment in front of you. Generic help on a specific brief is most of why students feel unhelped.',
  },
  {
    icon: BookOpen,
    color: 'text-purple-600 dark:text-purple-400',
    title: 'Teaching, not fixing',
    body: 'Every correction comes with the reason behind it. The point is that you can do the next one without us — which is also the only version of this that survives contact with an exam.',
  },
]

const whyStudentsChooseUs = [
  'Tutors matched to your specific unit and assessment, not just your broad subject area',
  'Editing returned with tracked changes and a comment explaining every single one, so you accept or reject each deliberately',
  'Feedback written against the marking rubric your assessor will actually use',
  'AGLC4, APA 7th, Vancouver and Harvard (AU) — the styles Australian faculties set, applied to the edition your unit specifies',
  'Fixed pricing quoted in Australian dollars before you commit, with no hidden fees',
  'Your drafts are never resold, republished, added to a samples library or reused for another student',
  'We will tell you when your university’s own free learning support is the better option',
  'No grade guarantees — nobody outside your faculty is in a position to make one',
]

export default function AboutPage() {
  return (
    <main className="flex-grow">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: 'Home', url: 'https://www.stackassignment.com' },
              { name: 'About', url },
            ])
          ),
        }}
      />

      {/* Hero Section */}
      <section className="stack-regional-hero text-white py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Stack Assignment</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Tutoring and editing for Australian university students since{' '}
            {seoConfig.organization.foundingDate}. You do the work — we help you do it better.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 p-8 rounded-2xl">
            <Target className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Our Mission</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              To give Australian university students the kind of help that makes them better at the
              work — clear explanations of hard material, honest feedback on their own drafts, and
              editing that teaches rather than conceals. Affordable enough to use before the
              deadline, not just in a panic at the end of it.
            </p>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-700 dark:to-slate-800 p-8 rounded-2xl">
            <Globe className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Our Vision</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              To be the academic support service Australian students can name to their unit
              coordinator without hesitating. That means being useful and being defensible at the
              same time, which most of this industry has decided is impossible.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="bg-slate-50 dark:bg-slate-900 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Our Story
            </h2>
          </div>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg leading-relaxed">
              Stack Assignment started in {seoConfig.organization.foundingDate} around a problem that
              has not changed since: students who understood roughly what was being asked of them, but
              not precisely enough to score well on it. A rubric says &ldquo;critical
              analysis&rdquo;. A unit guide says &ldquo;AGLC4&rdquo;. Neither explains what the marker
              is looking for, and by the time the feedback arrives, the unit is over.
            </p>
            <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg leading-relaxed">
              So we built the service around the gap. A tutor who knows the discipline sits down with
              your draft and the criteria it will be marked against, and tells you what is missing and
              why. An editor returns your writing with every change visible and explained. Neither
              produces work for you to submit — which is not a limitation we apologise for, it is the
              part that makes the help worth having twice.
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
              We work most closely with Australian institutions, because assessment here has its own
              vocabulary and its own rules, and generic international advice quietly misleads students
              about both. We now maintain {INSTITUTION_COUNT} institution-specific guides covering
              marking scales, referencing conventions and unit structures &mdash;{' '}
              <Link
                href="/universities"
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                find yours here
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`text-4xl md:text-5xl font-bold mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <p className="text-slate-600 dark:text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-slate-50 dark:bg-slate-900 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Our Values
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, color, title, body }) => (
              <div key={title} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
                <Icon className={`w-8 h-8 mb-3 ${color}`} />
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Why Students Choose Us
            </h2>
          </div>
          <div className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-2xl shadow-lg">
            <ul className="space-y-4">
              {whyStudentsChooseUs.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">
              Where the line sits, and why it sits there, is set out in full on our{' '}
              <Link
                href="/integrity"
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                academic integrity policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
