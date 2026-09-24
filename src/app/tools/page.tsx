import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
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
  const liveTools = TOOLS.filter(t => t.live);
  const soonTools = TOOLS.filter(t => !t.live);
  return <main className="stack-page flex-grow overflow-hidden">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([{ name: 'Home', url: 'https://www.stackassignment.com' }, { name: 'Free Tools', url }])) }} />
    <section className="stack-hero stack-tools-hero"><div className="stack-container py-16 md:py-20 relative z-10"><div className="max-w-4xl"><div className="stack-eyebrow"><Sparkles className="h-4 w-4" /> Free student toolkit</div><h1 className="stack-hero-title">Useful tools for <span>university study</span></h1><p className="stack-hero-copy">Calculators, converters and study helpers designed around the needs of Australian and UK university students. Start instantly — no account required for the tools that are live.</p><div className="flex flex-wrap gap-3 mt-7"><span className="stack-pill-dark">Free to use</span><span className="stack-pill-dark">AU & UK focused</span><span className="stack-pill-dark">Built for students</span></div></div></div></section>
    <section className="stack-container -mt-8 relative z-20 pb-20"><div className="grid sm:grid-cols-3 gap-4 mb-8"><div className="stack-stat-card"><strong>{liveTools.length}</strong><span>Live tools</span></div><div className="stack-stat-card"><strong>{TOOLS.length}</strong><span>Tools planned</span></div><div className="stack-stat-card"><strong>0</strong><span>Signup required</span></div></div>
      <div className="mb-10"><div className="mb-5"><p className="text-xs font-extrabold uppercase tracking-widest text-indigo-700">LIVE NOW</p><h2 className="text-3xl font-bold mt-1">Start with a free tool</h2></div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{liveTools.map((tool, i) => { const Icon = tool.icon; return <Link key={tool.name} href={tool.href} className="stack-tool-card group"><div className={`stack-tool-icon ${i % 3 === 0 ? 'indigo' : i % 3 === 1 ? 'cyan' : 'violet'}`}><Icon className="h-6 w-6" /></div><div className="flex-1"><h3 className="text-xl font-bold">{tool.name}</h3><p className="text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">{tool.blurb}</p><span className="inline-flex items-center gap-2 mt-5 text-sm font-bold text-indigo-600">{tool.cta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></div></Link> })}</div></div>
      {soonTools.length > 0 && <div><div className="mb-5"><p className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">COMING SOON</p><h2 className="text-3xl font-bold mt-1">More study helpers</h2></div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{soonTools.map(tool => { const Icon = tool.icon; return <div key={tool.name} className="stack-tool-card is-soon"><div className="stack-tool-icon slate"><Icon className="h-6 w-6" /></div><div><div className="flex items-center gap-2"><h3 className="text-xl font-bold">{tool.name}</h3><span className="stack-coming-soon">Soon</span></div><p className="text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">{tool.blurb}</p></div></div> })}</div></div>}
      <div className="stack-soft-banner mt-12"><div><p className="text-sm font-bold text-indigo-700">Need more than a tool?</p><h2 className="text-2xl font-bold mt-1">Explore subject guides and university resources.</h2></div><div className="flex gap-3 flex-wrap"><Link href="/subjects" className="stack-secondary-button">Browse subjects</Link><Link href="/universities" className="stack-primary-button">Find your university <ArrowRight className="h-4 w-4" /></Link></div></div>
    </section></main>;
}
