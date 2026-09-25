'use client';

import { useState } from 'react';
import { generateFAQSchema } from '@/lib/seo-config';

interface FAQ {
  question: string;
  answer: string;
}

/**
 * FAQ content, repositioned and AU-first.
 *
 * The previous answers offered ghostwriting outright ("Every assignment is
 * written from scratch by human experts") and promised detection assurance
 * ("AI-Detection Verification to guarantee the work is ... human-made"), plus
 * 6-hour turnarounds. Under s 114A of the TEQSA Act that is a description of an
 * academic cheating service, and the detection promise is not something anyone
 * can honestly guarantee.
 *
 * Exported so the page can emit matching FAQPage structured data from the same
 * source of truth — the schema and the visible text can never drift apart.
 */
export const faqs: FAQ[] = [
  {
    question: 'Is this legal for students in Australia and the UK?',
    answer:
      'Yes. We provide tutoring, editing on your own work, and study and reference materials \u2014 the same category of support offered by university learning centres and services like Scribbr. What we do not do is write assignments for you to submit as your own. Australia specifically prohibits academic cheating services under the TEQSA Act, and we operate on the tutoring and editing side of that line. Submitting work you did not write would breach your university\u2019s academic integrity policy, and following your institution\u2019s rules remains your responsibility.',
  },
  {
    question: 'Will editing my document flag on Turnitin or similarity checkers?',
    answer:
      'Our editing works inside your own document using tracked changes, so the underlying work and ideas remain yours. We do not offer any service designed to defeat plagiarism or AI-detection tools, because that is not something we could honestly or safely promise.',
  },
  {
    question: 'Do your tutors and editors understand Australian marking rubrics?',
    answer:
      'Yes. We match you with tutors and editors experienced in Australian university standards \u2014 your unit\u2019s marking criteria, the referencing style your faculty requires, and Australian English conventions. We also support UK institutions as a secondary market.',
  },
  {
    question: 'Can I request a specific referencing style?',
    answer:
      'Yes \u2014 AGLC4, APA 7th, Vancouver, Harvard (AU/UK), Chicago and Oxford among others. Tell us the style your unit guide specifies when you book and your tutor or editor will work to it, and explain the corrections so you can apply the rules yourself next time.',
  },
  {
    question: 'What if my deadline is tight?',
    answer:
      'We offer expedited tutoring and editing sessions. We are also honest that some things \u2014 deep structural feedback on a long draft, for instance \u2014 need reasonable time to do well. We will tell you upfront what is realistic rather than promise something we cannot deliver properly.',
  },
  {
    question: 'What is your revision and follow-up policy?',
    answer:
      'Follow-up questions and one round of revision review are included within 14 days of your session or edit, so you can act on the feedback with support while you revise your own work.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)'
      }}
    >
      {/*
        FAQPage structured data, generated from the same `faqs` array rendered
        below so the two can never disagree. Client components are still
        server-rendered on first load, so this lands in the initial HTML where
        Google can read it. FAQ rich results are worth chasing here: several of
        these questions ("is this legal in Australia", "will editing flag on
        Turnitin") are exactly what AU students search.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />

      {/* Background effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)'
        }}
      />

      {/*
        Two nested wrappers rather than one, matching how the rest of the site
        is built: `stack-container` sets the page gutter so this section starts
        and ends on the same vertical lines as every other section, and the
        inner `max-w-4xl` keeps the questions at a comfortable reading width
        instead of stretching them the full 1440px.
      */}
      <div className="stack-container relative z-10">
        <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/30 rounded-full px-5 py-2 text-sm font-semibold text-white mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4">
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 164.2c6.6-14.1 23.3-20.3 37.4-13.7L256 178.1l48.8-27.6c14.1-6.6 30.8-.4 37.4 13.7s.4 30.8-13.7 37.4L280 229.1V288c0 17.7-14.3 32-32 32s-32-14.3-32-32V229.1l-48.5-27.5c-14.1-6.6-20.3-23.3-13.7-37.4zM256 416c-53 0-96-43-96-96s43-96 96-96s96 43 96 96s-43 96-96 96z"/>
            </svg>
            Got Questions?
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
            Frequently Asked <span className="text-purple-300">Questions</span>
          </h2>
          <p className="text-white/70 mt-4 text-lg">
            Everything you need to know about our services
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ faq, isOpen, onClick }: { faq: FAQ; isOpen: boolean; onClick: () => void }) {
  return (
    <div 
      className={`rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen 
          ? 'bg-white/20 border-purple-400/40' 
          : 'bg-white/10 border-white/15 hover:bg-white/15 hover:border-white/25'
      } border backdrop-blur-sm`}
    >
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center p-6 text-left"
      >
        <span className="text-lg font-semibold text-white pr-4">
          {faq.question}
        </span>
        <div 
          className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xl font-light flex-shrink-0 transition-all duration-300 ${
            isOpen ? 'bg-purple-500/30 rotate-45' : 'bg-white/10'
          }`}
        >
          +
        </div>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-400 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 text-white/80 leading-relaxed">
          {faq.answer}
        </div>
      </div>
    </div>
  );
}
