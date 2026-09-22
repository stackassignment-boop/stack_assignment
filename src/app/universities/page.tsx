import { Metadata } from 'next'
import Link from 'next/link'
import { GraduationCap, MapPin } from 'lucide-react'
import { universities } from '@/data/universities'
import { region, generateBreadcrumbSchema } from '@/lib/seo-config'

const url = 'https://www.stackassignment.com/universities'

export const metadata: Metadata = {
  title: 'Assignment Support by University | Australian & UK Institutions',
  description:
    'Find tutoring, editing and assessment support matched to your own university — marking rubrics, referencing style and unit structure. Covering Deakin, UNSW, La Trobe, Torrens, CQU, UWA, QUT and more across Australia and the UK.',
  keywords: [
    'assignment support by university Australia',
    'university tutoring Australia',
    'academic editing Australian universities',
    'assessment support Australian university students',
  ],
  openGraph: {
    title: 'Assignment Support by University | Australian & UK Institutions',
    description:
      'Tutoring, editing and assessment support matched to your university’s marking rubrics and referencing style.',
    url,
    type: 'website',
    locale: region.ogLocale,
  },
  alternates: { canonical: url },
}

/**
 * Hand-built university pages, which live outside `src/data/universities.ts`
 * because each carries verified campus and unit-level detail the generic
 * template can't express.
 *
 * This list is the one place that knows about all of them, so it must be kept
 * in sync when a page is added — there is no way to enumerate App Router routes
 * at runtime. Three of them sit at the site root rather than under
 * /universities/ for historical reasons; their URLs are preserved because they
 * hold ranking equity, so the href is stored explicitly rather than derived.
 */
const dedicated: { name: string; country: string; href: string }[] = [
  { name: 'Academies Australasia Polytechnic', country: 'Australia', href: '/universities/academies-australasia-polytechnic' },
  { name: 'Asia Pacific International College', country: 'Australia', href: '/universities/apic' },
  { name: 'CQUniversity', country: 'Australia', href: '/universities/cquniversity' },
  { name: 'De Montfort University', country: 'United Kingdom', href: '/universities/de-montfort-university' },
  { name: 'Deakin University', country: 'Australia', href: '/universities/deakin-university' },
  { name: 'Federation University', country: 'Australia', href: '/universities/federation-university' },
  { name: 'Holmes Institute', country: 'Australia', href: '/holmes-institute-assignment-help' },
  { name: 'Kaplan Business School', country: 'Australia', href: '/kaplan-assignment-help' },
  { name: 'La Trobe University', country: 'Australia', href: '/universities/la-trobe-university' },
  { name: 'Liverpool Hope University', country: 'United Kingdom', href: '/universities/liverpool-hope-university' },
  { name: 'Melbourne Institute of Technology', country: 'Australia', href: '/melbourne-institute-of-technology-assignment-help' },
  { name: 'Solent University', country: 'United Kingdom', href: '/universities/solent-university' },
  { name: 'Southern Cross Institute', country: 'Australia', href: '/universities/southern-cross-institute' },
  { name: 'Torrens University', country: 'Australia', href: '/universities/torrens-university' },
  { name: 'UNSW Sydney', country: 'Australia', href: '/universities/unsw-sydney' },
  { name: 'University of Bedfordshire', country: 'United Kingdom', href: '/universities/university-of-bedfordshire' },
  { name: 'University of Canberra', country: 'Australia', href: '/universities/university-of-canberra' },
  { name: 'University of New England', country: 'Australia', href: '/universities/university-of-new-england' },
  { name: 'University of Newcastle', country: 'Australia', href: '/universities/university-of-newcastle' },
  { name: 'University of the Sunshine Coast', country: 'Australia', href: '/universities/university-of-sunshine-coast' },
  { name: 'University of Western Australia', country: 'Australia', href: '/universities/university-of-western-australia' },
  { name: 'Victoria University', country: 'Australia', href: '/universities/victoria-university' },
  { name: 'Victorian Institute of Technology', country: 'Australia', href: '/universities/victorian-institute-of-technology' },
]

// Australia first — it is the primary market, and putting it above the fold
// also puts the AU institution names in the part of the page Google weights
// most heavily.
const COUNTRY_ORDER = ['Australia', 'United Kingdom', 'Canada']

export default function UniversitiesIndexPage() {
  const all = [
    ...dedicated,
    ...universities.map((u) => ({
      name: u.name,
      country: u.country,
      href: `/universities/${u.slug}`,
    })),
  ]

  const grouped = COUNTRY_ORDER.map((country) => ({
    country,
    items: all.filter((u) => u.country === country).sort((a, b) => a.name.localeCompare(b.name)),
  })).filter((g) => g.items.length > 0)

  return (
    <main className="flex-grow">
      {/*
        This page exists partly to consolidate: 27 university pages previously
        had no hub linking them together, so each depended entirely on its own
        backlinks. A hub gives Google a single crawlable entry point and lets
        link equity flow between siblings.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: 'Home', url: 'https://www.stackassignment.com' },
              { name: 'Universities', url },
            ])
          ),
        }}
      />

      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/30 px-4 py-1.5 text-sm font-semibold mb-5">
            <GraduationCap className="h-4 w-4" />
            {all.length} institutions
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            Assignment support, by university
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            Marking rubrics, referencing styles and unit structures differ between institutions.
            Pick yours to see how our tutoring and editing maps to the way your work is actually
            assessed.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        {grouped.map((group) => (
          <section key={group.country} className="mb-12 last:mb-0">
            <h2
              className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-slate-100 mb-5"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              <MapPin className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              {group.country}
              <span className="text-base font-normal text-gray-500 dark:text-slate-400">
                ({group.items.length})
              </span>
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((u) => (
                <li key={u.href}>
                  <Link
                    href={u.href}
                    className="block h-full rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3.5 font-medium text-gray-900 dark:text-slate-100 hover:border-indigo-400 hover:shadow-md dark:hover:border-indigo-500 transition-all"
                  >
                    {u.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p className="mt-4 text-sm text-gray-600 dark:text-slate-400">
          Not listed? Our tutors and editors work across Australian and UK institutions
          generally &mdash;{' '}
          <Link href="/contact" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            tell us your university and unit
          </Link>{' '}
          and we will match you. You can also try the{' '}
          <Link
            href="/tools/wam-calculator"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            free WAM calculator
          </Link>
          .
        </p>
      </div>
    </main>
  )
}
