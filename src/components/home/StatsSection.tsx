import { BookOpenCheck, FileCheck2, Globe2, GraduationCap, Languages, ShieldCheck } from 'lucide-react';

const benefits = [
  {
    icon: GraduationCap,
    title: 'University-aware support',
    body: 'Choose your university or tell us your unit so the support can be aligned to the assessment context.',
  },
  {
    icon: FileCheck2,
    title: 'Feedback on your own work',
    body: 'Draft review, proofreading, structure and clarity feedback without replacing your authorship.',
  },
  {
    icon: BookOpenCheck,
    title: 'Referencing support',
    body: 'Help with APA 7th, Harvard, AGLC4, Vancouver and other styles used across AU and UK universities.',
  },
  {
    icon: Globe2,
    title: 'Australia + UK focus',
    body: 'Landing pages, study resources and terminology designed around students in both markets.',
  },
  {
    icon: Languages,
    title: 'AU & UK English',
    body: 'Proofreading can follow Australian or British spelling, tone and academic conventions.',
  },
  {
    icon: ShieldCheck,
    title: 'Integrity-first approach',
    body: 'We focus on learning, feedback and responsible academic support rather than completing assessments for students.',
  },
];

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 dark:bg-slate-950 md:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent dark:via-indigo-800" />
      <div className="stack-container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-indigo-100 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">Why students choose support</span>
          <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 dark:text-white md:text-5xl">A better experience from the first click</h2>
          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300 md:text-lg">The site is built around what Australian and UK students actually need: clear support, university context and an easy path to a human response.</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, title, body }) => (
            <article key={title} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white dark:bg-indigo-500/10 dark:text-indigo-300">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-extrabold text-slate-950 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
