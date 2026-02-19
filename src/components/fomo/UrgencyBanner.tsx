'use client';

import { useState, useEffect } from 'react';
import { Timer, Flame, Zap, Gift, AlertCircle } from 'lucide-react';

interface UrgencyBannerProps {
  onNavigate?: (page: string) => void;
}

export default function UrgencyBanner({ onNavigate }: UrgencyBannerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 34,
    seconds: 56
  });
  const [spotsLeft, setSpotsLeft] = useState(7);
  const [isVisible, setIsVisible] = useState(true);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        // Reset timer when it reaches 0
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Randomly decrease spots
  useEffect(() => {
    const spotInterval = setInterval(() => {
      if (Math.random() > 0.7 && spotsLeft > 3) {
        setSpotsLeft(prev => prev - 1);
      }
    }, 60000); // Check every minute

    return () => clearInterval(spotInterval);
  }, [spotsLeft]);

  if (!isVisible) return null;

  return (
    <>
      {/* Top Banner - Sticky */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-2 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm relative">
          <Flame className="w-4 h-4 animate-pulse" />
          <span className="font-semibold">
            FLASH SALE! <span className="hidden sm:inline">Extra 15% OFF</span> - Ends in{' '}
            <span className="inline-flex items-center font-mono font-bold">
              <span className="bg-white/20 px-1.5 py-0.5 rounded">{String(timeLeft.hours).padStart(2, '0')}</span>:
              <span className="bg-white/20 px-1.5 py-0.5 rounded">{String(timeLeft.minutes).padStart(2, '0')}</span>:
              <span className="bg-white/20 px-1.5 py-0.5 rounded">{String(timeLeft.seconds).padStart(2, '0')}</span>
            </span>
          </span>
          <button 
            onClick={() => onNavigate?.('pricing')}
            className="ml-2 bg-white text-red-500 px-3 py-0.5 rounded-full text-xs font-bold hover:bg-yellow-300 transition-colors animate-pulse"
          >
            GRAB NOW
          </button>
        </div>
      </div>

      {/* Floating Urgency Widget - Shows after scrolling */}
      <div className="fixed top-20 right-4 z-40 max-w-xs">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-xl border border-amber-200 dark:border-amber-900/30 p-4 relative overflow-hidden">
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-1 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs"
          >
            ✕
          </button>
          
          {/* Animated flame icon */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                Limited Slots Available!
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Only <span className="text-red-500 font-bold">{spotsLeft} slots</span> left for urgent orders today
              </p>
              
              {/* Slots indicator */}
              <div className="mt-2 flex gap-0.5">
                {[...Array(10)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-2 flex-1 rounded-full ${i < spotsLeft ? 'bg-green-400' : 'bg-gray-300 dark:bg-gray-600'}`}
                  ></div>
                ))}
              </div>
              
              <button 
                onClick={() => onNavigate?.('pricing')}
                className="mt-3 w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-sm font-bold py-2 px-4 rounded-lg transition-all transform hover:scale-105"
              >
                Order Now Before It&apos;s Gone
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 md:hidden z-40 shadow-2xl">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5" />
            <div>
              <p className="text-xs font-semibold">First Order Discount!</p>
              <p className="text-lg font-bold">15% OFF</p>
            </div>
          </div>
          <button 
            onClick={() => onNavigate?.('pricing')}
            className="bg-white text-indigo-600 font-bold px-4 py-2 rounded-lg text-sm hover:bg-yellow-300 transition-colors"
          >
            Claim Offer
          </button>
        </div>
      </div>

      {/* Trust Badges - Shows "X orders in last 24 hours" */}
      <div className="fixed top-20 left-4 z-40 hidden lg:block">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 px-4 py-2 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-green-500" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Last 24 hours</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              <span className="text-green-500">127</span> orders completed
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
