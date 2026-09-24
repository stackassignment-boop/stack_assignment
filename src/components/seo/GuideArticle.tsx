import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

type Section = { heading: string; paragraphs: string[]; bullets?: string[] };
type Props = {
  title: string;
  eyebrow: string;
  description: string;
  sections: Section[];
  cta?: string;
  canonicalPath?: string;
  lastUpdated?: string;
  quickAnswer?: string;
};

const SITE = 'https://www.stackassignment.com';

export default function GuideArticle({
  title,
  eyebrow,
  description,
  sections,
  cta = 'Need feedback on your own draft?',
  canonicalPath,
  lastUpdated = '2026-09-23',
  quickAnswer,
}: Props) {
  const path = canonicalPath || '/guides';
  const url = `${SITE}${path}`;
  const answer = quickAnswer || description;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: title,
    description,
    url,
    dateModified: lastUpdated,
    inLanguage: 'en-AU',
    author: { '@type': 'Organization', name: 'Stack Assignment', url: SITE },
    publisher: { '@id': `${SITE}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    isPartOf: { '@id': `${SITE}/#website` },
    articleSection: eyebrow,
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE}/guides` },
      { '@type': 'ListItem', position: 3, name: title, item: url },
    ],
  };

  return <main className="stack-page">
    <article className="mx-auto max-w-5xl px-6 py-12 md:py-16" itemScope itemType="https://schema.org/Article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, breadcrumb]) }} />
      <header className="stack-regional-hero -mx-6 -mt-12 mb-10 overflow-hidden rounded-b-3xl px-6 py-14 text-white md:-mt-16 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-3 text-sm font-bold uppercase tracking-wider text-indigo-300">{eyebrow}</div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl" itemProp="headline">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200" itemProp="description">{description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <span>Reviewed {lastUpdated}</span><span aria-hidden="true">·</span><span>Australia & UK student resource</span>
          </div>
        </div>
      </header>

      <section aria-labelledby="quick-answer" className="mt-10 rounded-3xl border border-indigo-100 bg-indigo-50/80 p-6 dark:border-indigo-900/60 dark:bg-indigo-950/30 md:p-8">
        <div className="flex items-start gap-3"><Sparkles className="mt-1 h-5 w-5 shrink-0 text-indigo-600" />
          <div><h2 id="quick-answer" className="text-xl font-bold">Quick answer</h2><p className="mt-2 leading-7 text-slate-700 dark:text-slate-300">{answer}</p></div>
        </div>
      </section>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="space-y-10" itemProp="articleBody">{sections.map((s) => <section key={s.heading} id={s.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}><h2 className="text-2xl font-bold md:text-3xl">{s.heading}</h2>{s.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 leading-8 text-slate-700 dark:text-slate-300">{paragraph}</p>)}{s.bullets && <ul className="mt-5 space-y-3">{s.bullets.map((b) => <li key={b} className="flex gap-3 leading-7 text-slate-700 dark:text-slate-300"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-500" />{b}</li>)}</ul>}</section>)}</div>
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-28">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">On this page</p>
          <nav className="mt-3 space-y-2">{sections.map((s) => <a key={s.heading} href={`#${s.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`} className="block text-sm leading-6 text-indigo-600 hover:underline">{s.heading}</a>)}</nav>
        </aside>
      </div>

      <aside className="mt-14 rounded-3xl bg-slate-950 p-8 text-white md:p-10"><h2 className="text-2xl font-bold">{cta}</h2><p className="mt-3 max-w-2xl text-slate-300">Share the assessment brief, rubric or draft you are working on and choose the type of support you want. The aim is to help you understand and improve your own work.</p><div className="mt-6 flex flex-col gap-3 sm:flex-row"><Link href="/order" className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 font-bold text-slate-950 hover:bg-yellow-300">Request support <ArrowRight className="h-4 w-4" /></Link><Link href="/tools" className="inline-flex items-center justify-center rounded-xl border border-white/25 px-6 py-3 font-semibold hover:bg-white/10">Use free tools</Link></div></aside>
    </article>
  </main>;
}
