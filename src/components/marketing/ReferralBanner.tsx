'use client';

import { Gift, Users, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ReferralBannerProps {
  variant?: 'full' | 'compact';
}

export default function ReferralBanner({ variant = 'full' }: ReferralBannerProps) {
  const [copied, setCopied] = useState(false);
  const referralCode = 'STACK20OFF';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (variant === 'compact') {
    return (
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-4 flex items-center gap-4">
        <Gift className="w-8 h-8" />
        <div className="flex-1">
          <p className="font-bold">Refer a Friend, Both Get 20% Off!</p>
          <p className="text-sm opacity-90">Share your referral link today</p>
        </div>
        <button 
          onClick={handleCopy}
          className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 rounded-2xl p-6 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Gift className="w-8 h-8" />
          </div>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-bold mb-1">🎁 Refer a Friend, Both Get 20% Off!</h3>
          <p className="opacity-90">
            Share your unique referral code with friends. They get 10% off their first order, 
            and you get 10% off your next order. Win-win!
          </p>
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
            <span className="font-mono font-bold text-lg">{referralCode}</span>
            <button 
              onClick={handleCopy}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              {copied ? <Check className="w-5 h-5 text-green-300" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
          <span className="text-xs opacity-75">Click to copy</span>
        </div>
      </div>
      
      {/* Stats */}
      <div className="relative mt-6 flex justify-center gap-8 text-sm">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>10,000+ Referrals Made</span>
        </div>
        <div className="flex items-center gap-2">
          <Gift className="w-4 h-4" />
          <span>$50,000+ Saved</span>
        </div>
      </div>
    </div>
  );
}
