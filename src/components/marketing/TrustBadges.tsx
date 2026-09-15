'use client';

import {
  Shield,
  CreditCard,
  Award,
  GraduationCap,
  MessageSquare,
  Lock,
  FileCheck,
  Ban,
} from 'lucide-react';

/**
 * Order is load-bearing: the `footer` variant renders the first six of these
 * and `compact` renders the first four, so the badges that carry the
 * positioning sit at the top and the payment-trust badges follow.
 *
 * Previously this list read: 256-bit SSL, Secure Payment, Money-Back,
 * PhD Writers, 4.9/5 Rating, 100% Confidential, 0% Plagiarism, AI-Free
 * Content. Because it renders inside the sitewide footer, those eight labels
 * were the single most widely published claim on the site, and four of them
 * were unsafe:
 *
 *   - "PhD Writers" advertises someone else writing the assessment, which is
 *     the conduct s 114B of the TEQSA Act 2011 prohibits advertising.
 *   - "0% Plagiarism" and "AI-Free Content" are promises about what a marker
 *     or Turnitin will conclude about the student's own submission — outcomes
 *     nobody can actually guarantee.
 *   - "Money-Back" and "4.9/5 Rating" are representations under the
 *     Australian Consumer Law (Competition and Consumer Act 2010 Sch 2
 *     ss 18, 29) that need a real refund policy and real verifiable reviews
 *     behind them. There is no review integration on this site, so the
 *     rating was simply asserted.
 *
 * The replacements are all statements about how the service works, which are
 * defensible on their face and don't depend on data the site doesn't hold.
 */
const trustItems = [
  { icon: Ban, label: 'No Ghostwriting', color: 'text-red-500' },
  { icon: GraduationCap, label: 'Subject-Expert Tutors', color: 'text-amber-500' },
  { icon: FileCheck, label: 'Tracked-Changes Editing', color: 'text-indigo-500' },
  { icon: Shield, label: 'You Keep Authorship', color: 'text-purple-500' },
  { icon: Lock, label: '256-bit SSL', color: 'text-blue-500' },
  { icon: CreditCard, label: 'Secure Payment', color: 'text-green-500' },
  { icon: Award, label: 'AU Marking Rubrics', color: 'text-amber-600' },
  { icon: MessageSquare, label: '1-on-1 Sessions', color: 'text-teal-500' },
];

interface TrustBadgesProps {
  variant?: 'full' | 'compact' | 'footer';
}

export default function TrustBadges({ variant = 'full' }: TrustBadgesProps) {
  if (variant === 'footer') {
    return (
      <div className="flex flex-wrap justify-center gap-3">
        {trustItems.slice(0, 6).map((item, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap justify-center gap-2">
        {trustItems.slice(0, 4).map((item, i) => (
          <div key={i} className="flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 px-3 py-1.5 rounded-full text-xs font-medium">
            <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
            <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
          </div>
        ))}
      </div>
    );
  }

  // Full variant
  return (
    <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-6">
      {/*
        Was "Trusted by 10,000+ Students Worldwide". The number is not backed by
        anything in the codebase, and "Worldwide" works against the Australian
        targeting — a heading is a strong on-page signal, so it should say where
        the service is aimed.
      */}
      <h3 className="text-center text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wide">
        How We Work With Australian Students
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {trustItems.map((item, i) => (
          <div key={i} className="flex items-center gap-3 bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm border border-gray-100 dark:border-slate-700">
            <div className={`p-2 rounded-lg bg-gray-50 dark:bg-slate-700 ${item.color}`}>
              <item.icon className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
