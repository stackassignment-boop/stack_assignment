'use client';

import { useState } from 'react';
import { MessageCircle, X, Clock, Star, Award } from 'lucide-react';

const experts = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    qualification: 'PhD in Business Administration',
    experience: '8 years experience',
    rating: 4.9,
    orders: 1247,
    avatar: '👩‍🏫',
    available: true,
    responseTime: '2 mins',
  },
  {
    id: 2,
    name: 'Prof. Michael Chen',
    qualification: 'PhD in Computer Science',
    experience: '12 years experience',
    rating: 4.8,
    orders: 2089,
    avatar: '👨‍💻',
    available: true,
    responseTime: '5 mins',
  },
  {
    id: 3,
    name: 'Dr. Emily Williams',
    qualification: 'PhD in Nursing',
    experience: '6 years experience',
    rating: 5.0,
    orders: 876,
    avatar: '👩‍⚕️',
    available: true,
    responseTime: '3 mins',
  },
];

interface ChatExpertWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatExpertWidget({ isOpen, onClose }: ChatExpertWidgetProps) {
  const [selectedExpert, setSelectedExpert] = useState(experts[0]);

  const handleWhatsApp = () => {
    const message = `Hi! I'd like to chat with ${selectedExpert.name} about my assignment. Can you help me?`;
    const url = `https://wa.me/919907300710?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 w-80">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 relative">
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 text-white/70 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            <span className="font-bold">💬 Chat with an Expert</span>
          </div>
          <p className="text-sm opacity-90 mt-1">Available now • Avg response: 2 mins</p>
        </div>

        {/* Expert Selection */}
        <div className="p-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 font-medium uppercase">Select Expert</p>
          <div className="space-y-2">
            {experts.map((expert) => (
              <button
                key={expert.id}
                onClick={() => setSelectedExpert(expert)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                  selectedExpert.id === expert.id
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 border-2 border-indigo-500'
                    : 'bg-gray-50 dark:bg-slate-700 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-slate-600'
                }`}
              >
                <div className="text-3xl">{expert.avatar}</div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">{expert.name}</span>
                    {expert.available && (
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{expert.qualification}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-yellow-500 flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-current" /> {expert.rating}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{expert.orders} orders</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Expert Details */}
        <div className="px-4 pb-4">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-3 flex items-center gap-3">
            <div className="text-4xl">{selectedExpert.avatar}</div>
            <div className="flex-1">
              <div className="font-bold text-gray-900 dark:text-white">{selectedExpert.name}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{selectedExpert.experience}</div>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                  Available now • Response: {selectedExpert.responseTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="p-4 pt-0">
          <button
            onClick={handleWhatsApp}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Start Chat Now
          </button>
          <p className="text-xs text-center text-gray-400 mt-2">
            Powered by Stack Assignment
          </p>
        </div>
      </div>
    </div>
  );
}
