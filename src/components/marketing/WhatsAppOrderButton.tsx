'use client';

import { MessageCircle, ArrowRight } from 'lucide-react';

interface WhatsAppOrderButtonProps {
  variant?: 'large' | 'medium' | 'small';
  subject?: string;
  academicLevel?: string;
}

export default function WhatsAppOrderButton({ variant = 'medium', subject, academicLevel }: WhatsAppOrderButtonProps) {
  const phoneNumber = '919907300710';
  
  const message = `Hi Stack Assignment! I need help with:
Subject: ${subject || '_____'}
Word Count: _____
Deadline: _____
Academic Level: ${academicLevel || '_____'}`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  if (variant === 'large') {
    return (
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
      >
        <MessageCircle className="w-6 h-6" />
        <div className="text-left">
          <div className="text-sm opacity-90">📱 Order via WhatsApp in 30 Seconds</div>
          <div className="font-bold flex items-center gap-2">
            One-Tap Order <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </a>
    );
  }

  if (variant === 'small') {
    return (
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-medium text-sm shadow-lg transition-all"
      >
        <MessageCircle className="w-4 h-4" />
        <span>WhatsApp</span>
      </a>
    );
  }

  // Medium variant (default)
  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
    >
      <MessageCircle className="w-5 h-5" />
      <span>📱 Order via WhatsApp</span>
    </a>
  );
}
