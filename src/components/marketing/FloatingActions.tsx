'use client';

import { useState } from 'react';
import { Sparkles, MessageCircle, X, ChevronUp } from 'lucide-react';
import SubjectFinderQuiz from './SubjectFinderQuiz';
import ChatExpertWidget from './ChatExpertWidget';
import WhatsAppOrderButton from './WhatsAppOrderButton';

export default function FloatingActions() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      {/* Main Floating Button */}
      <div className="fixed bottom-24 md:bottom-20 right-4 z-40">
        {/* Expanded Options */}
        <div className={`flex flex-col gap-3 mb-3 transition-all duration-300 ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          {/* Quiz Button */}
          <button
            onClick={() => {
              setShowQuiz(true);
              setIsExpanded(false);
            }}
            className="flex items-center gap-2 bg-white dark:bg-slate-800 shadow-lg rounded-full pl-4 pr-3 py-2 border border-gray-200 dark:border-slate-700 hover:scale-105 transition-transform"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Find Writer</span>
          </button>
          
          {/* Chat Button */}
          <button
            onClick={() => {
              setShowChat(true);
              setIsExpanded(false);
            }}
            className="flex items-center gap-2 bg-white dark:bg-slate-800 shadow-lg rounded-full pl-4 pr-3 py-2 border border-gray-200 dark:border-slate-700 hover:scale-105 transition-transform"
          >
            <MessageCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Chat Expert</span>
          </button>
          
          {/* WhatsApp */}
          <div className="flex items-center gap-2 bg-green-500 shadow-lg rounded-full pl-4 pr-3 py-2 hover:scale-105 transition-transform">
            <WhatsAppOrderButton variant="small" />
          </div>
        </div>

        {/* Main Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all ${
            isExpanded 
              ? 'bg-gray-800 dark:bg-gray-200 rotate-180' 
              : 'bg-gradient-to-r from-indigo-600 to-purple-600'
          }`}
        >
          {isExpanded ? (
            <X className="w-6 h-6 text-white dark:text-gray-800" />
          ) : (
            <ChevronUp className="w-6 h-6 text-white rotate-180" />
          )}
        </button>
      </div>

      {/* Modals */}
      <SubjectFinderQuiz isOpen={showQuiz} onClose={() => setShowQuiz(false)} />
      <ChatExpertWidget isOpen={showChat} onClose={() => setShowChat(false)} />
    </>
  );
}
