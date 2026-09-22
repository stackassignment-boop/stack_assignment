import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { region, generateBreadcrumbSchema } from '@/lib/seo-config'
import { TOOLS } from '@/lib/tools'

const url = 'https://www.stackassignment.com/tools'

export const metadata: Metadata = {
  title: 'Free Study Tools for Australian Uni Students | Stack Assignment',
  description:
    'Free tools for university students — WAM calculator, referencing generator, draft checker, PDF to Word, image to text (OCR) and a quiz generator. No sign-up, nothing uploaded.',
  keywords: [
    'free study tools Australian university students',
    'WAM calculator',
    'university calculators Australia',
    'free academic tools',
  ],
  openGraph: {
    title: 'Free Study Tools for Australian Uni Students',
    description:
      'Calculators, converters and revision tools for university students. Free, no sign-up, nothing uploaded.',
    url,
    type: 'website',
    locale: region.ogLocale,
  },
  alternates: { canonical: url },
}

export default function ToolsPage() {
  return (
    <main className="flex-grow">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: 'Home', url: 'https://www.stackassignment.com' },
              { name: 'Free Tools', url },
            ])
          ),
        }}
      />

      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            Free study tools
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            Built for the way Australian universities actually work &mdash; credit points, WAM,
            and the referencing styles your unit guide specifies. Free to use, no account needed.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <div className="space-y-5">
          {TOOLS.map((tool) => {
            const Icon = tool.icon
            const body = (
              <>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="flex flex-wrap items-center gap-2 text-xl font-bold text-gray-900 dark:text-slate-100">
                      {tool.name}
                      {!tool.live && (
                        <span className="rounded-full bg-gray-100 dark:bg-slate-700 px-2.5 py-0.5 text-xs font-semibold text-gray-600 dark:text-slate-300">
                          Coming soon
                        </span>
                      )}
                    </h2>
                    <p className="mt-2 text-gray-700 dark:text-slate-300 leading-relaxed">
                      {tool.blurb}
                    </p>
                    {tool.live && (
                      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                        {tool.cta} <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                </div>
              </>
            )

            return tool.live ? (
              <Link
                key={tool.name}
                href={tool.href}
                className="block rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md transition-all"
              >
                {body}
              </Link>
            ) : (
              <div
                key={tool.name}
                className="rounded-2xl border border-dashed border-gray-300 dark:border-slate-700 bg-gray-50/60 dark:bg-slate-900/40 p-6"
              >
                {body}
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
