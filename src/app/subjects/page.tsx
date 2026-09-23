import Link from 'next/link';
import { ArrowRight, BookOpen, Calculator, Code2, HeartPulse, Landmark, Stethoscope, Wrench } from 'lucide-react';

const subjects = [
  ['Nursing & Health', 'nursing-health', 'Clinical reports, care-plan structure, evidence use, reflective writing and referencing support.', Stethoscope],
  ['Business & Management', 'business-management', 'Reports, case analysis, strategic management, marketing and organisational assignments.', Landmark],
  ['IT, Computing & Cyber Security', 'it-computing-cyber-security', 'Technical reports, project documentation, research structure, systems analysis and cyber security study support.', Code2],
  ['Accounting & Finance', 'accounting-finance', 'Financial analysis, accounting reports, calculations, interpretation and academic writing support.', Calculator],
  ['Education & Social Sciences', 'education-social-sciences', 'Literature reviews, reflective writing, research methods and evidence-based academic work.', BookOpen],
  ['Engineering', 'engineering', 'Engineering reports, technical writing, project documentation and research support.', Wrench],
];

export default function SubjectsPage() {
  return <main className="stack-page">
    <section className="bg-slate-950 px-6 py-16 text-white md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-300">Australia & UK</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">University support by subject</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">Find practical guidance for your subject area, then choose a university-specific page or a free study tool.</p>
      </div>
    </section>
    <section className="px-6 py-14">
      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
        {subjects.map(([name, slug, text, Icon]) => { const I = Icon as typeof Stethoscope; return <Link key={slug as string} href={`/subjects/${slug}`} className="group stack-card p-6 transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl">
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300"><I className="h-5 w-5" /></div>
          <h2 className="text-xl font-bold">{name as string}</h2><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{text as string}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-indigo-600">Explore subject support <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
        </Link> })}
      </div>
    </section>
  </main>;
}
