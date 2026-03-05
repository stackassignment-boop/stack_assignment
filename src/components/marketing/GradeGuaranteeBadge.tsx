'use client';

import { Shield, Award, ArrowRight } from 'lucide-react';

interface GradeGuaranteeBadgeProps {
  variant?: 'hero' | 'inline' | 'small';
  onNavigate?: (page: string) => void;
}

export default function GradeGuaranteeBadge({ variant = 'inline', onNavigate }: GradeGuaranteeBadgeProps) {
  if (variant === 'hero') {
    return (
      <div className="relative inline-flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
        <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-xl">
          <div className="bg-white/20 p-2 rounded-full">
            <Award className="w-6 h-6" />
          </div>
          <div className="text-left">
            <div className="text-sm font-bold">🎯 GRADE GUARANTEE</div>
            <div className="text-xs opacity-90">Score 80%+ or Full Refund</div>
          </div>
          <button 
            onClick={() => onNavigate?.('terms')}
            className="ml-2 text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors flex items-center gap-1"
          >
            See Terms <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }

  if (variant === 'small') {
    return (
      <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-full text-sm font-medium">
        <Shield className="w-4 h-4" />
        <span>80% Grade Guarantee</span>
      </div>
    );
  }

  // Default inline variant
  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-4">
      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
        <Award className="w-7 h-7 text-white" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900 dark:text-white">🎯 GRADE GUARANTEE</span>
          <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">NO RISK</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Score <span className="font-bold text-green-600">80%+</span> or get a <span className="font-bold text-green-600">100% Refund</span>. We stand by our quality.
        </p>
      </div>
      <button 
        onClick={() => onNavigate?.('terms')}
        className="flex-shrink-0 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 text-sm font-medium flex items-center gap-1"
      >
        See Terms <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
