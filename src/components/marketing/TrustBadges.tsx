'use client';

import { Shield, CreditCard, Award, GraduationCap, Star, Lock, FileCheck, Ban } from 'lucide-react';

const trustItems = [
  { icon: Lock, label: '256-bit SSL', color: 'text-blue-500' },
  { icon: CreditCard, label: 'Secure Payment', color: 'text-green-500' },
  { icon: Shield, label: 'Money-Back', color: 'text-purple-500' },
  { icon: GraduationCap, label: 'PhD Writers', color: 'text-amber-500' },
  { icon: Star, label: '4.9/5 Rating', color: 'text-yellow-500' },
  { icon: Lock, label: '100% Confidential', color: 'text-teal-500' },
  { icon: Ban, label: '0% Plagiarism', color: 'text-red-500' },
  { icon: FileCheck, label: 'AI-Free Content', color: 'text-indigo-500' },
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
      <h3 className="text-center text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wide">
        Trusted by 10,000+ Students Worldwide
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
