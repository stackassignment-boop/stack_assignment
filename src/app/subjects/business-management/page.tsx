import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, BookOpen, GraduationCap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Business & Management Academic Support | Stack Assignment',
  description: 'Practical support for business and management students. Get tutoring, assessment guidance, draft feedback and study resources for business, management, marketing, HR, entrepreneurship.',
  alternates: { canonical: 'https://www.stackassignment.com/subjects/business-management' },
};

export default function SubjectPage() {
  return <main className="stack-page">
    <section className="stack-regional-hero px-6 py-16 text-white md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold"><GraduationCap className="h-4 w-4 text-indigo-300" /> Australia & UK student support</div>
        <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-6xl">Business & Management Academic Support</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">Practical support for business and management students. Our approach is centred on helping you understand the task, improve your own work and prepare your final submission.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Link href="/order" className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3.5 font-extrabold text-slate-950 hover:bg-yellow-300">Start a support request <ArrowRight className="h-4 w-4" /></Link><Link href="/universities" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 font-bold hover:bg-white/10">Find your university</Link></div>
      </div>
    </section>
    <section className="px-6 py-14"><div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.2fr_.8fr]">
      <div className="stack-card p-7"><p className="text-sm font-bold uppercase tracking-wider text-indigo-600">What you can work on</p><h2 className="mt-2 text-2xl font-black">Support for real university tasks</h2><p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">Common areas include business reports, case studies, strategic analysis, marketing plans, organisational behaviour and reflective assignments. Support can focus on planning, explanation, feedback, editing or study preparation rather than producing a submission for you.</p><ul className="mt-6 grid gap-3 sm:grid-cols-2">{['Understand the assessment brief','Improve structure and academic tone','Strengthen evidence and argument','Check referencing and presentation'].map(x => <li key={x} className="flex gap-2 text-sm font-semibold"><CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />{x}</li>)}</ul></div>
      <div className="rounded-2xl bg-indigo-50 p-7 dark:bg-indigo-950/30"><BookOpen className="h-7 w-7 text-indigo-600" /><h2 className="mt-4 text-xl font-bold">Referencing & study resources</h2><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">Common styles for this area include Harvard / APA 7th. Always follow your unit or university's current instructions where they differ.</p><Link href="/guides/read-assessment-brief-australia" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-indigo-600">Open a related resource <ArrowRight className="h-4 w-4" /></Link></div>
    </div></section>
    <section className="border-y bg-white px-6 py-14 dark:border-slate-800 dark:bg-slate-900"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-black">Explore more Stack Assignment resources</h2><div className="mt-7 grid gap-4 md:grid-cols-3"><Link href="/australia/academic-support" className="stack-card p-5 font-bold hover:border-indigo-300">🇦🇺 Australian academic support <ArrowRight className="ml-2 inline h-4 w-4" /></Link><Link href="/uk/academic-support" className="stack-card p-5 font-bold hover:border-indigo-300">🇬🇧 UK academic support <ArrowRight className="ml-2 inline h-4 w-4" /></Link><Link href="/tools" className="stack-card p-5 font-bold hover:border-indigo-300">Free study tools <ArrowRight className="ml-2 inline h-4 w-4" /></Link></div></div></section>
  </main>;
}
