import { BarChart3, BookOpen, FileText, FlaskConical, Gavel, MessageSquareText } from 'lucide-react';

const examples = [
  { icon: FileText, title: 'Business reports', body: 'Work through report structure, evidence, argument flow, executive summaries and referencing.' },
  { icon: BarChart3, title: 'Data & statistics', body: 'Understand methods, interpret outputs, check calculations and explain findings clearly.' },
  { icon: Gavel, title: 'Law & AGLC4', body: 'Get guidance on legal research, argument structure, authorities and AGLC4 citation.' },
  { icon: FlaskConical, title: 'Nursing & health', body: 'Build evidence-based arguments, improve literature use and understand academic conventions.' },
  { icon: BookOpen, title: 'Essays & literature reviews', body: 'Strengthen thesis statements, source synthesis, paragraph structure and academic tone.' },
  { icon: MessageSquareText, title: 'Draft feedback', body: 'Receive clear, actionable feedback on a draft you have written before you submit it.' },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-20 dark:bg-slate-950 md:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <span className="inline-flex rounded-full bg-teal-50 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-teal-700 dark:bg-teal-500/10 dark:text-teal-300">Popular support areas</span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 dark:text-white md:text-5xl">Support that fits the subject, not a generic template.</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 md:text-lg">Choose the area you need help with and tell us your university, unit and assessment context. We can then direct you to the most relevant support.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {examples.map(({ icon: Icon, title, body }) => (
              <article key={title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-900">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"><Icon className="h-5 w-5" /></div>
                  <div><h3 className="font-extrabold text-slate-950 dark:text-white">{title}</h3><p className="mt-1.5 text-sm leading-6 text-slate-600 dark:text-slate-300">{body}</p></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
