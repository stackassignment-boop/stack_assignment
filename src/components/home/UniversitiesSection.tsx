import Link from 'next/link';
import { ArrowRight, MapPin, Search } from 'lucide-react';

const universities = [
  ['Australia', [
    ['UNSW Sydney', '/universities/unsw-sydney'],
    ['Deakin University', '/universities/deakin-university'],
    ['La Trobe University', '/universities/la-trobe-university'],
    ['University of Western Australia', '/universities/university-of-western-australia'],
    ['University of Newcastle', '/universities/university-of-newcastle'],
    ['University of Canberra', '/universities/university-of-canberra'],
    ['University of New England', '/universities/university-of-new-england'],
    ['University of the Sunshine Coast', '/universities/university-of-sunshine-coast'],
    ['CQUniversity', '/universities/cquniversity'],
    ['Victoria University', '/universities/victoria-university'],
    ['Torrens University', '/universities/torrens-university'],
    ['Federation University', '/universities/federation-university'],
    ['Kaplan Business School', '/kaplan-assignment-help'],
    ['Holmes Institute', '/holmes-institute-assignment-help'],
    ['APIC', '/universities/apic'],
    ['Melbourne Institute of Technology', '/melbourne-institute-of-technology-assignment-help'],
  ]],
  ['United Kingdom', [
    ['De Montfort University', '/universities/de-montfort-university'],
    ['Liverpool Hope University', '/universities/liverpool-hope-university'],
    ['University of Bedfordshire', '/universities/university-of-bedfordshire'],
    ['Solent University', '/universities/solent-university'],
    ['University of East London', '/universities/university-of-east-london'],
  ]],
] as const;

export default function UniversitiesSection() {
  return (
    <section className="bg-slate-950 py-20 text-white md:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-teal-200"><Search className="h-3.5 w-3.5" /> Find your university</span>
            <h2 className="mt-5 text-3xl font-black tracking-tight md:text-5xl">University-specific pages for Australia and the UK.</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 md:text-lg">Start with your institution to see the subjects, referencing styles, campuses and support options relevant to your study context.</p>
            <Link href="/universities" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-teal-100">Browse all universities <ArrowRight className="h-4 w-4" /></Link>
          </div>

          <div className="space-y-8">
            {universities.map(([country, items]) => (
              <div key={country}>
                <div className="mb-3 flex items-center gap-2 text-sm font-extrabold text-teal-200"><MapPin className="h-4 w-4" /> {country}</div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {items.map(([name, href]) => (
                    <Link key={href} href={href} className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3.5 text-sm font-semibold text-slate-100 transition hover:border-teal-300/40 hover:bg-white/[0.09]">
                      <span>{name}</span><ArrowRight className="h-4 w-4 text-slate-500 transition group-hover:translate-x-1 group-hover:text-teal-300" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
