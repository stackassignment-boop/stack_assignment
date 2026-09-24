import { Metadata } from 'next'
import Link from 'next/link'
import { GraduationCap, ArrowRight } from 'lucide-react'
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
  const all = [...dedicated, ...universities.map((u) => ({ name: u.name, country: u.country, href: `/universities/${u.slug}` }))];
  const grouped = COUNTRY_ORDER.map((country) => ({ country, items: all.filter((u) => u.country === country).sort((a, b) => a.name.localeCompare(b.name)) })).filter((g) => g.items.length > 0);
  const australia = grouped.find(g => g.country === 'Australia');
  const uk = grouped.find(g => g.country === 'United Kingdom');
  return <main className="stack-page flex-grow overflow-hidden">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([{ name: 'Home', url: 'https://www.stackassignment.com' }, { name: 'Universities', url }])) }} />
    <section className="stack-hero stack-universities-hero"><div className="stack-container py-16 md:py-20 relative z-10"><div className="max-w-5xl"><div className="stack-eyebrow"><GraduationCap className="h-4 w-4" /> University support directory</div><h1 className="stack-hero-title">Find support for <span>your university</span></h1><p className="stack-hero-copy">Explore university-specific tutoring, editing and assessment guidance for Australian and UK institutions — with pages built around referencing, assessment formats and study context.</p><div className="flex flex-wrap gap-3 mt-7"><span className="stack-pill-dark">{all.length}+ institutions</span><span className="stack-pill-dark">Australia first</span><span className="stack-pill-dark">UK support</span></div></div></div></section>
    <section className="stack-container -mt-8 relative z-20 pb-20"><div className="grid md:grid-cols-2 gap-5 mb-8"><a href="#australia" className="stack-country-card"><div className="text-3xl">🇦🇺</div><div><p className="text-xs font-extrabold uppercase tracking-widest text-indigo-700">Australia</p><h2 className="text-2xl font-bold">Australian universities</h2><p>{australia?.items.length || 0} institutions and growing</p></div><ArrowRight className="ml-auto h-5 w-5" /></a><a href="#uk" className="stack-country-card"><div className="text-3xl">🇬🇧</div><div><p className="text-xs font-extrabold uppercase tracking-widest text-indigo-700">United Kingdom</p><h2 className="text-2xl font-bold">UK universities</h2><p>{uk?.items.length || 0} institutions and growing</p></div><ArrowRight className="ml-auto h-5 w-5" /></a></div>
    {grouped.map(group => <section key={group.country} id={group.country === 'Australia' ? 'australia' : group.country === 'United Kingdom' ? 'uk' : undefined} className="mb-12"><div className="flex items-end justify-between gap-4 mb-5"><div><p className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">{group.country === 'Australia' ? 'AU DIRECTORY' : 'UK DIRECTORY'}</p><h2 className="text-3xl font-bold mt-1">{group.country}</h2></div><span className="rounded-full bg-white border border-slate-200 px-3 py-1 text-sm font-bold text-slate-500">{group.items.length} institutions</span></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{group.items.map(u => <Link key={u.href} href={u.href} className="stack-university-card group"><div className="stack-university-mark"><GraduationCap className="h-5 w-5" /></div><div className="min-w-0"><h3 className="font-bold text-slate-900 dark:text-white truncate">{u.name}</h3><p className="text-sm text-slate-500 mt-1">Tutoring • Editing • Assessment support</p></div><ArrowRight className="h-4 w-4 ml-auto text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-indigo-600" /></Link>)}</div></section>)}
    <div className="stack-soft-banner"><div><p className="text-sm font-bold text-indigo-700">Can't see your institution?</p><h2 className="text-2xl font-bold mt-1">Tell us your university and unit.</h2><p className="text-slate-600 mt-1">We can point you to the most relevant support or study resource.</p></div><Link href="/contact" className="stack-primary-button">Contact support <ArrowRight className="h-4 w-4" /></Link></div>
    </section></main>;
}
