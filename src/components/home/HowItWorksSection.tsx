'use client';

import { Button } from '@/components/ui/button';

interface HowItWorksSectionProps {
  onNavigate?: (page: string, params?: Record<string, string>) => void;
}

/**
 * "How It Works" — three steps, from the repositioned homepage copy.
 *
 * This section does double duty. It sets the tutoring/editing expectation
 * before a visitor reaches pricing, and it puts genuinely AU-specific
 * vocabulary into crawlable body text: marking rubrics, AGLC4, APA 7th,
 * Vancouver, Harvard (AU), unit/semester language. Those are the terms the
 * content calendar targets, and having them on the homepage helps Google
 * associate the domain with Australian academic search intent rather than the
 * generic US "essay writing" cluster.
 */
export default function HowItWorksSection({ onNavigate }: HowItWorksSectionProps) {
  const steps = [
    {
      number: '1',
      title: 'Tell us what you need',
      body:
        'Struggling with a concept, a draft that needs polishing, or exam prep? Tell us your unit, level, and deadline.',
    },
    {
      number: '2',
      title: 'Get matched with an expert',
      body:
        'We match you with a tutor or editor who knows Australian university standards — marking rubrics, referencing styles (AGLC4, APA 7th, Vancouver, Harvard), and Australian English conventions.',
    },
    {
      number: '3',
      title: 'Learn, revise, improve',
      body:
        'Get live tutoring, tracked-changes edits on your own draft, or detailed feedback — always working from your work, so what you submit is genuinely yours.',
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Support that builds your skills and your draft — not a finished paper handed over.
          </p>
        </div>

        <ol className="grid md:grid-cols-3 gap-8 list-none">
          {steps.map((step) => (
            <li
              key={step.number}
              className="relative bg-gray-50 dark:bg-slate-900 rounded-2xl p-7 border border-gray-200 dark:border-slate-700"
            >
              <div
                className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xl font-bold mb-5"
                aria-hidden="true"
              >
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="text-center mt-12">
          <Button
            onClick={() => onNavigate?.('contact')}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-9 py-6 rounded-xl text-lg font-bold"
          >
            Book a Free 15-Min Consult →
          </Button>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            No obligation. We&rsquo;ll tell you honestly whether we can help before you pay anything.
          </p>
        </div>
      </div>
    </section>
  );
}
