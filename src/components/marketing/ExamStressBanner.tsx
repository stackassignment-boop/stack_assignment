'use client';

import { BookOpen, Clock, Zap, Moon } from 'lucide-react';

interface ExamStressBannerProps {
  variant?: 'banner' | 'widget';
}

export default function ExamStressBanner({ variant = 'banner' }: ExamStressBannerProps) {
  if (variant === 'widget') {
    return (
      <div className="bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-xl p-4 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5" />
          <span className="font-bold">📚 FINALS WEEK SPECIAL</span>
        </div>
        <p className="text-sm opacity-90 mb-3">48-Hour Turnaround Available</p>
        <div className="flex items-center gap-2 text-sm mb-3">
          <Moon className="w-4 h-4" />
          <span>Sleep While We Write - $20 Off</span>
        </div>
        <button className="w-full bg-white text-red-600 font-bold py-2 px-4 rounded-lg hover:bg-yellow-100 transition-colors flex items-center justify-center gap-2">
          <Zap className="w-4 h-4" />
          Rush Order Now
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white py-4 px-6 rounded-2xl relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-2 left-10 w-2 h-2 bg-white rounded-full animate-ping"></div>
        <div className="absolute top-8 right-20 w-1.5 h-1.5 bg-white rounded-full animate-ping animation-delay-500"></div>
        <div className="absolute bottom-3 left-1/3 w-2 h-2 bg-white rounded-full animate-ping animation-delay-1000"></div>
      </div>
      
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          <span className="text-xl font-bold">📚 FINALS WEEK SPECIAL</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4" />
          <span className="font-semibold">48-Hour Turnaround Available</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <Moon className="w-4 h-4" />
          <span className="font-semibold">Sleep While We Write - $20 Off</span>
        </div>
        
        <button className="bg-white text-red-600 font-bold px-6 py-2 rounded-full hover:bg-yellow-100 transition-colors flex items-center gap-2 shadow-lg">
          <Zap className="w-4 h-4" />
          Rush Order →
        </button>
      </div>
    </div>
  );
}
