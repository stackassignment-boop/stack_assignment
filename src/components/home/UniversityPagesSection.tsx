'use client';

import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { universities as dynamicUniversities } from '@/data/universities';

interface UniversityCard {
  name: string;
  href: string;
  campuses: string;
  image?: string;
}

// The three hand-built pages, featured first since they have verified,
// institution-specific facts (referencing guides, course structures) rather
// than the general template used by the dynamic pages below.
const featuredPages: UniversityCard[] = [
  {
    name: 'Kaplan Business School',
    href: '/kaplan-assignment-help',
    campuses: 'Adelaide · Brisbane · Melbourne · Perth · Sydney',
    image: '/universities/0016.jpg',
  },
  {
    name: 'Melbourne Institute of Technology',
    href: '/melbourne-institute-of-technology-assignment-help',
    campuses: 'Melbourne · Sydney',
    image: '/universities/0022.jpg',
  },
  {
    name: 'Holmes Institute',
    href: '/holmes-institute-assignment-help',
    campuses: 'Melbourne · Sydney · Brisbane · Gold Coast · Cairns',
    image: '/universities/0019.jpg',
  },
];

// The remaining universities generated from the shared data file.
const dynamicPages: UniversityCard[] = dynamicUniversities.map((u) => ({
  name: u.name,
  href: `/universities/${u.slug}`,
  campuses: u.campuses.slice(0, 3).join(' · '),
}));

const allPages = [...featuredPages, ...dynamicPages];

export default function UniversityPagesSection() {
  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 rounded-full px-5 py-2 text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-5">
            Find Your University
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            Guidance Tailored to Your Institution
          </h2>
          <p className="text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            We build dedicated pages for the universities we support, matched to their
            campuses, course areas, and referencing conventions.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-h-[720px] overflow-y-auto pr-1">
          {allPages.map((uni) => (
            <Link
              key={uni.href}
              href={uni.href}
              className="group bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-5 flex items-center gap-4 transition-all hover:shadow-xl hover:-translate-y-1 hover:border-indigo-200 dark:hover:border-indigo-800"
            >
              {uni.image ? (
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 flex items-center justify-center flex-shrink-0 p-1.5">
                  <img src={uni.image} alt={uni.name} className="max-w-full max-h-full object-contain" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                  {uni.name
                    .split(' ')
                    .filter((w) => /^[A-Z]/.test(w))
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join('')}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
                  {uni.name}
                </h3>
                <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-slate-500 mt-1.5">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{uni.campuses}</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 dark:text-slate-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
