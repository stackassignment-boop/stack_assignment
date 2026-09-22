import Link from 'next/link';
import { ArrowRight, BookOpen, CheckCircle2, FileText, GraduationCap, ShieldCheck, Sparkles, Target } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Region = 'au' | 'uk';

const content = {
  au: {
    label: 'Australia',
    flag: '🇦🇺',
    title: 'Academic Support for University Students in Australia',
    intro: 'Practical tutoring, assessment guidance, proofreading and study tools for students across Australian universities and higher education providers.',
    styles: ['APA 7th', 'Harvard', 'AGLC4', 'Vancouver'],
    universities: [
      ['UNSW Sydney', '/universities/unsw-sydney'],
      ['Deakin University', '/universities/deakin-university'],
      ['CQUniversity', '/universities/cquniversity'],
      ['University of Western Australia', '/universities/university-of-western-australia'],
      ['University of Canberra', '/universities/university-of-canberra'],
      ['University of Newcastle', '/universities/university-of-newcastle'],
      ['La Trobe University', '/universities/la-trobe-university'],
      ['Torrens University', '/universities/torrens-university'],
      ['Victoria University', '/universities/victoria-university'],
      ['Kaplan Business School', '/kaplan-assignment-help'],
      ['Holmes Institute', '/holmes-institute-assignment-help'],
      ['APIC', '/universities/apic'],
    ],
    guides: [
      ['APA 7 Referencing Guide for Australian Students', '/guides/apa-7-referencing-australia'],
      ['AGLC4 Referencing Basics', '/guides/aglc4-referencing-australia'],
      ['How to Read an Australian Assessment Brief', '/guides/read-assessment-brief-australia'],
      ['WAM Calculator & What Your WAM Means', '/tools/wam-calculator'],
    ],
    points: [
      'Support is built around your actual assessment brief, unit outline and marking rubric.',
      'Get feedback on your own draft rather than outsourcing your submission.',
      'Use Australian referencing conventions and university-specific study guidance.',
      'Access free tools for WAM, referencing, draft review, PDF conversion and study preparation.',
    ],
  },
  uk: {
    label: 'United Kingdom',
    flag: '🇬🇧',
    title: 'Academic Support for University Students in the UK',
    intro: 'One-to-one tutoring, dissertation proofreading, assessment guidance and study resources for students at UK universities and higher education providers.',
    styles: ['Harvard', 'APA 7th', 'OSCOLA', 'Vancouver'],
    universities: [
      ['University of East London', '/universities/university-of-east-london'],
      ['De Montfort University', '/universities/de-montfort-university'],
      ['Liverpool Hope University', '/universities/liverpool-hope-university'],
      ['University of Bedfordshire', '/universities/university-of-bedfordshire'],
      ['Solent University', '/universities/solent-university'],
    ],
    guides: [
      ['Harvard Referencing Guide for UK Students', '/guides/harvard-referencing-uk'],
      ['How to Plan a UK University Assignment', '/guides/plan-uk-university-assignment'],
      ['Dissertation Proofreading Checklist', '/guides/dissertation-proofreading-checklist'],
      ['Academic Integrity: Using Support Responsibly', '/integrity'],
    ],
    points: [
      'Get feedback on structure, argument, academic tone, evidence and referencing.',
      'Work from your own draft and assessment instructions with clear, practical feedback.',
      'Support for essays, reports, presentations, dissertations and research projects.',
      'Use free study tools and guides before deciding whether you need one-to-one support.',
    ],
  },
} as const;

export default function RegionLandingPage({ region }: { region: Region }) {
  const c = content[region];
  const otherHref = region === 'au' ? '/uk/academic-support' : '/australia/academic-support';
  const otherLabel = region === 'au' ? 'Looking for UK support?' : 'Looking for Australian support?';

  return (
    <main>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,.35),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(168,85,247,.25),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              <span>{c.flag}</span> {c.label} student support
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">{c.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">{c.intro}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/order" className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-7 py-4 font-bold text-slate-950 transition hover:bg-yellow-300">
                Get academic support <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/tools" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-7 py-4 font-semibold hover:bg-white/10">
                Explore free study tools
              </Link>
            </div>
            <div className="mt-7 text-sm text-slate-400">{otherLabel} <Link className="font-semibold text-white underline" href={otherHref}>View the other region</Link></div>
          </div>
        </div>
      </section>

      <section className="border-b bg-white dark:bg-slate-950">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {([
            { icon: GraduationCap, title: 'University-specific', text: 'Start with your university, course or unit.' },
            { icon: FileText, title: 'Draft feedback', text: 'Improve work you have written yourself.' },
            { icon: Target, title: 'Assessment focused', text: 'Use the brief and rubric to guide your next steps.' },
            { icon: ShieldCheck, title: 'Integrity first', text: 'Support designed around responsible study practices.' },
          ] as { icon: LucideIcon; title: string; text: string }[]).map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border p-5 dark:border-slate-800"><Icon className="mb-3 h-6 w-6 text-indigo-600" /><h2 className="font-bold">{title}</h2><p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{text}</p></div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 max-w-3xl"><div className="mb-2 flex items-center gap-2 font-semibold text-indigo-600"><Sparkles className="h-5 w-5" /> What you can get help with</div><h2 className="text-3xl font-bold md:text-4xl">Practical support, not a generic template</h2><p className="mt-3 text-slate-600 dark:text-slate-400">Tell us what your assessment requires and where you are stuck. The goal is to help you understand the task, improve your work and submit your own final response.</p></div>
          <div className="grid gap-4 md:grid-cols-2">
            {c.points.map((point) => <div key={point} className="flex gap-3 rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-800"><CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-500" /><span className="font-medium leading-7">{point}</span></div>)}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">{c.styles.map((style) => <span key={style} className="rounded-full border bg-white px-4 py-2 text-sm font-semibold dark:border-slate-700 dark:bg-slate-800">{style}</span>)}</div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><h2 className="text-3xl font-bold">{c.label} universities</h2><p className="mt-2 text-slate-600 dark:text-slate-400">Go directly to a university-specific support page.</p></div><Link href="/universities" className="font-semibold text-indigo-600">View all universities →</Link></div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {c.universities.map(([name, href]) => <Link key={href} href={href} className="group rounded-2xl border bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"><div className="flex items-center justify-between gap-4"><span className="font-semibold">{name}</span><ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-indigo-600" /></div></Link>)}
          </div>
        </div>
      </section>

      <section className="bg-indigo-50 py-16 dark:bg-indigo-950/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-end justify-between gap-4"><div><h2 className="text-3xl font-bold">Useful {c.label} student guides</h2><p className="mt-2 text-slate-600 dark:text-slate-400">Free resources designed to answer common assessment and study questions.</p></div><BookOpen className="hidden h-10 w-10 text-indigo-500 md:block" /></div>
          <div className="grid gap-4 md:grid-cols-2">
            {c.guides.map(([name, href]) => <Link key={href} href={href} className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-lg dark:bg-slate-900"><h3 className="font-bold">{name}</h3><span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">Read guide <ArrowRight className="h-4 w-4" /></span></Link>)}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl rounded-3xl bg-slate-950 px-6 py-12 text-center text-white shadow-2xl md:px-12"><h2 className="text-3xl font-bold md:text-4xl">Need help with a real assessment?</h2><p className="mx-auto mt-4 max-w-2xl text-slate-300">Upload the assessment brief or rubric, choose the type of support you need and tell us your deadline. We will use that information to understand your request.</p><Link href="/order" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-7 py-4 font-bold text-slate-950 hover:bg-yellow-300">Start a support request <ArrowRight className="h-5 w-5" /></Link></div>
      </section>
    </main>
  );
}
