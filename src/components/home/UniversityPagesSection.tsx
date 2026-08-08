'use client';

import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';

interface UniversityPage {
  name: string;
  href: string;
  blurb: string;
  campuses: string;
  image: string;
}

// Add an entry here each time a new dedicated university landing page is built.
const universityPages: UniversityPage[] = [
  {
    name: 'Kaplan Business School',
    href: '/kaplan-assignment-help',
    blurb: "Written to Kaplan's own Harvard referencing guide and unit rubrics.",
    campuses: 'Adelaide · Brisbane · Melbourne · Perth · Sydney',
    image: '/universities/009.jpg',
  },
  {
    name: 'Melbourne Institute of Technology',
    href: '/melbourne-institute-of-technology-assignment-help',
    blurb: 'Support across business, IT, data analytics and engineering courses.',
    campuses: 'Melbourne · Sydney',
    image: '/universities/0013.jpg',
  },
];

export default function UniversityPagesSection() {
  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-6">
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
            We build dedicated pages for the universities we support most, matched to their
            referencing guides, unit structures, and marking rubrics.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {universityPages.map((uni) => (
            <Link
              key={uni.href}
              href={uni.href}
              className="group bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-6 flex items-center gap-5 transition-all hover:shadow-xl hover:-translate-y-1 hover:border-indigo-200 dark:hover:border-indigo-800"
            >
              <div className="w-16 h-16 rounded-xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 flex items-center justify-center flex-shrink-0 p-2">
                <img src={uni.image} alt={uni.name} className="max-w-full max-h-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {uni.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">{uni.blurb}</p>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-slate-500 mt-2">
                  <MapPin className="w-3.5 h-3.5" />
                  {uni.campuses}
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-300 dark:text-slate-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
