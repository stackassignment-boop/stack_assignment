'use client';

import { DollarSign, BadgeCheck, ArrowRight } from 'lucide-react';

interface PriceMatchGuaranteeProps {
  variant?: 'banner' | 'inline' | 'small';
}

export default function PriceMatchGuarantee({ variant = 'inline' }: PriceMatchGuaranteeProps) {
  if (variant === 'banner') {
    return (
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white py-3 px-4 rounded-xl shadow-lg">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <DollarSign className="w-5 h-5" />
          <span className="font-bold">💰 PRICE MATCH + 10% BEAT</span>
          <span className="text-sm opacity-90">Found it cheaper? We'll beat any competitor!</span>
          <button className="bg-white text-orange-600 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-yellow-100 transition-colors flex items-center gap-1">
            Submit Quote <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  if (variant === 'small') {
    return (
      <div className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 px-3 py-1.5 rounded-full text-sm font-medium">
        <BadgeCheck className="w-4 h-4" />
        <span>Lowest Price Guaranteed</span>
      </div>
    );
  }

  // Default inline variant
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-center gap-4">
      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
        <DollarSign className="w-7 h-7 text-white" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900 dark:text-white">💰 PRICE MATCH + 10% BEAT</span>
          <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">LOWEST PRICE</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Found a lower price? We'll <span className="font-bold text-amber-600">beat it by 10%</span>. Guaranteed lowest prices.
        </p>
      </div>
      <button className="flex-shrink-0 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1">
        Submit Quote <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
