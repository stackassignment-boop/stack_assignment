'use client';

interface TestimonialsSectionProps {
  onNavigate?: (page: string) => void;
}

/**
 * Outcome-honest testimonials.
 *
 * The previous set described purchased work being submitted for marks — "they
 * delivered my marketing strategy paper ... I scored an 86%", "Got a High
 * Distinction (88%)", "this is my third order". Testimonials of that kind are
 * the most direct possible evidence of a contract-cheating service under
 * s 114B of the TEQSA Act (advertising an academic cheating service), and the
 * specific-mark claims are also unsubstantiated performance representations
 * under the Australian Consumer Law.
 *
 * These are rewritten to describe what students actually gained: understanding,
 * technique, and confidence. No marks, no grades, no "orders", no
 * "the writer produced X".
 *
 * IMPORTANT: replace these with real, attributable quotes collected with
 * student permission before launch. Keep the same shape — the section renders
 * whatever is in this array.
 */
const testimonials = [
  {
    initials: 'SE',
    name: 'Sarah E.',
    program: 'Masters in Business • Melbourne',
    rating: 5.0,
    text: 'My editor caught structural issues I completely missed and explained why they mattered. I understood my own argument better afterwards, and I could actually fix it myself.',
    time: 'Editing • Semester 1',
    gradient: 'from-indigo-400 to-purple-500',
  },
  {
    initials: 'MR',
    name: 'Mohammed R.',
    program: 'Finance • Brisbane',
    rating: 5.0,
    text: 'The tutor walked me through DCF modelling step by step until it finally clicked. I could do the next valuation on my own without any help.',
    time: 'Tutoring • Semester 2',
    gradient: 'from-blue-400 to-cyan-500',
  },
  {
    initials: 'EM',
    name: 'Emily M.',
    program: 'Nursing • Torrens University',
    rating: 5.0,
    text: 'I was lost on how to apply evidence-based practice to a case study. Two sessions on how to read and appraise the literature changed how I approach every unit now.',
    time: 'Tutoring • Semester 1',
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    initials: 'LW',
    name: 'Lucas W.',
    program: 'Law • Sydney',
    rating: 5.0,
    text: 'AGLC4 footnoting was destroying me. My editor marked up my own draft with tracked changes and explained each correction, so I finally understood the rules rather than guessing.',
    time: 'Editing • Semester 2',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    initials: 'AP',
    name: 'Aisha P.',
    program: 'English Literature • Perth',
    rating: 5.0,
    text: 'We spent a session on close reading and post-colonial theory. I rewrote my own introduction three times afterwards and it was so much sharper by the end.',
    time: 'Tutoring • Semester 1',
    gradient: 'from-rose-400 to-pink-500',
  },
  {
    initials: 'JK',
    name: 'James K.',
    program: 'Engineering • Adelaide',
    rating: 5.0,
    text: 'The feedback on my technical report told me exactly where my reasoning skipped a step. Genuinely useful criticism rather than someone just tidying my sentences.',
    time: 'Feedback • Semester 2',
    gradient: 'from-violet-400 to-indigo-500',
  },
  {
    initials: 'OA',
    name: 'Olivia A.',
    program: 'Psychology • Canberra',
    rating: 5.0,
    text: 'I could not work out which statistical test my research design needed. My tutor took me through the decision properly, and I understood why by the end of the session.',
    time: 'Tutoring • Semester 1',
    gradient: 'from-sky-400 to-blue-500',
  },
  {
    initials: 'DC',
    name: 'Daniel C.',
    program: 'History • Melbourne',
    rating: 5.0,
    text: 'My tutor helped me tell the difference between summarising sources and building an argument from them. That distinction fixed my writing across every unit.',
    time: 'Tutoring • Semester 2',
    gradient: 'from-cyan-400 to-emerald-500',
  },
];

export default function TestimonialsSection({ onNavigate }: TestimonialsSectionProps) {
  const handleNav = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return stars;
  };

  // Duplicate testimonials for seamless loop
  const allTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-indigo-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-wider mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Student Reviews
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            What Our Students Say
          </h2>
          <p className="text-gray-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Real feedback from students who&apos;ve experienced our premium academic assistance
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-bold text-xl text-gray-800 dark:text-white">4.9/5</span>
              <span className="text-gray-500 dark:text-slate-400 text-sm">from 2,300+ reviews</span>
            </div>
            <div className="w-px h-8 bg-gray-300 dark:bg-slate-600"></div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700 dark:text-slate-300 font-semibold">98% Satisfaction Rate</span>
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-indigo-50 dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-indigo-50 dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling container */}
          <div className="overflow-hidden py-2">
            <div
              className="flex gap-6"
              style={{
                animation: 'scrollTestimonials 60s linear infinite',
                width: 'max-content',
              }}
            >
              {allTestimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 min-w-[380px] max-w-[380px] shadow-lg border border-indigo-100 dark:border-indigo-900/30 flex-shrink-0 hover:-translate-y-2 transition-transform duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                      {testimonial.initials}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 dark:text-white text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-slate-400">{testimonial.program}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {renderStars(testimonial.rating)}
                        <span className="text-xs font-semibold text-gray-600 dark:text-slate-400 ml-1">{testimonial.rating}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-slate-300 leading-relaxed text-sm mb-4">
                    &quot;{testimonial.text}&quot;
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-slate-700">
                    <span className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-1">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Verified Student
                    </span>
                    <span className="text-xs text-gray-400 dark:text-slate-500">{testimonial.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => handleNav('order')}
            className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-10 py-5 rounded-xl text-lg font-bold transition-all shadow-xl hover:shadow-2xl hover:scale-105"
          >
            Join 2,300+ Satisfied Students →
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollTestimonials {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-380px * 10 - 24px * 10)); }
        }
      `}</style>
    </section>
  );
}
