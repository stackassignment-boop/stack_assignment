import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'University Study Guides Australia & UK',
  description: 'Free guides covering referencing, assessment planning, dissertation proofreading and academic study skills for Australian and UK university students.',
  alternates: { canonical: 'https://www.stackassignment.com/guides' },
};

const guides = [
  ['APA 7 Referencing Guide for Australian Students', '/guides/apa-7-referencing-australia', 'Australia'],
  ['AGLC4 Referencing Basics for Australian Students', '/guides/aglc4-referencing-australia', 'Australia'],
  ['How to Read an Australian Assessment Brief', '/guides/read-assessment-brief-australia', 'Australia'],
  ['Harvard Referencing Guide for UK Students', '/guides/harvard-referencing-uk', 'UK'],
  ['How to Plan a UK University Assignment', '/guides/plan-uk-university-assignment', 'UK'],
  ['Dissertation Proofreading Checklist', '/guides/dissertation-proofreading-checklist', 'UK'],
  ['Harvard Referencing Guide for Australian Students', '/guides/harvard-referencing-australia', 'Australia'],
  ['Kaplan Harvard Referencing Guide', '/guides/kaplan-harvard-referencing', 'Kaplan'],
  ['Kaplan Business School Assessment Checklist', '/guides/kbs-assessment-checklist', 'Kaplan'],
  ['CQU APA Referencing Guide', '/guides/cqu-apa-referencing', 'CQU'],
  ['Deakin Vancouver Referencing Guide', '/guides/deakin-vancouver-referencing', 'Deakin'],
  ['Torrens Assessment & Marking Guide', '/guides/torrens-marking-guide', 'Torrens'],
  ['UWA Assignment Cover Sheet Checklist', '/guides/uwa-assignment-cover-sheet', 'UWA'],
  ['Victoria University Turnitin Checklist', '/guides/vun-turnitin', 'Victoria University'],
];

export default function GuidesPage() {
  return <main className="py-16"><div className="mx-auto max-w-6xl px-6"><div className="mb-12 max-w-3xl"><div className="mb-3 flex items-center gap-2 font-semibold text-indigo-600"><BookOpen className="h-5 w-5" /> Free study resources</div><h1 className="text-4xl font-bold md:text-5xl">University study guides for Australia & the UK</h1><p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">Clear, practical guides for common university tasks. Use them to understand your assessment, improve your own work and reference sources correctly.</p></div><div className="grid gap-5 md:grid-cols-2">{guides.map(([title, href, region]) => <Link key={href} href={href} className="group rounded-2xl border bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"><span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">{region}</span><h2 className="mt-5 text-xl font-bold">{title}</h2><span className="mt-5 inline-flex items-center gap-1 font-semibold text-indigo-600">Read guide <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></Link>)}</div></div></main>;
}
