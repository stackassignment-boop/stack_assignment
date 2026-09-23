import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

export interface RegionalSeoLinkItem {
  title: string
  description: string
  href: string
}

export default function RegionalSeoLinks({
  heading = 'Related student resources',
  items,
}: {
  heading?: string
  items: RegionalSeoLinkItem[]
}) {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-14 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex items-start gap-4">
          <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-indigo-600 dark:text-indigo-300">Study resources</p>
            <h2 className="mt-1 text-2xl font-black tracking-tight md:text-3xl">{heading}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              Use these free resources to understand your assessment, improve your draft and check your referencing before you submit.
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <h3 className="font-bold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{item.description}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-300">Read guide <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
