'use client';

import { useState, useEffect } from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';

const testimonials = [
  { name: 'Sarah M.', uni: 'Harvard University', rating: 5, text: 'Got my research paper in 6 hours! Amazing quality.', time: '2 min ago' },
  { name: 'James K.', uni: 'Oxford University', rating: 5, text: 'Best dissertation help I ever received.', time: '8 min ago' },
  { name: 'Emma L.', uni: 'MIT', rating: 5, text: 'The writer understood my requirements perfectly.', time: '15 min ago' },
  { name: 'Michael R.', uni: 'Stanford University', rating: 5, text: 'Passed with distinction! Thank you so much.', time: '22 min ago' },
  { name: 'Sophie T.', uni: 'Cambridge University', rating: 5, text: 'Professional and on-time delivery every time.', time: '31 min ago' },
];

export default function SocialProofWidget() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-40 md:bottom-44 left-4 right-4 md:left-auto md:right-4 md:w-80 z-30 pointer-events-none">
      {/* Testimonial Card */}
      <div 
        className={`bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-4 transition-all duration-300 pointer-events-auto ${
          isAnimating ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
            <Quote className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 mb-1">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
              &quot;{testimonials[currentTestimonial].text}&quot;
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-semibold text-gray-900 dark:text-white">
                {testimonials[currentTestimonial].name}
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {testimonials[currentTestimonial].uni}
              </span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span className="text-xs text-gray-400">{testimonials[currentTestimonial].time}</span>
            </div>
          </div>
        </div>
        
        {/* Dots indicator */}
        <div className="flex justify-center gap-1 mt-3">
          {testimonials.map((_, i) => (
            <div 
              key={i} 
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === currentTestimonial ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
