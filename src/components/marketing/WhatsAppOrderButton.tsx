'use client';

import { MessageCircle, ArrowRight } from 'lucide-react';

interface WhatsAppOrderButtonProps {
  variant?: 'large' | 'medium' | 'small';
  subject?: string;
  academicLevel?: string;
}

// Component name/file kept as-is (only one import site, in HeroSection) to
// avoid an unnecessary rename — but the copy and message template below now
// match a booking flow rather than an order flow: no "word count" or
// "deadline" fields, since those describe commissioning a finished document,
// not booking tutoring/editing on the student's own work.
export default function WhatsAppOrderButton({ variant = 'medium', subject, academicLevel }: WhatsAppOrderButtonProps) {
  // TODO: this is still the placeholder number from the original build
  // (+91 country code) on an Australia-facing site. Swap in the real AU
  // WhatsApp Business number before this goes live — same issue flagged
  // on the phone input placeholder in PricingPage.tsx.
  const phoneNumber = '919907300710';

  const message = `Hi Stack Assignment! I'd like to book:
Service: ${subject || 'Tutoring / Editing (let us know which)'}
Subject area: _____
Preferred time / turnaround: _____
Level: ${academicLevel || '_____'}`;

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
          <div className="text-sm opacity-90">📱 Chat With Us on WhatsApp</div>
          <div className="font-bold flex items-center gap-2">
            Book a Session <ArrowRight className="w-4 h-4" />
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
      <span>📱 Chat on WhatsApp</span>
    </a>
  );
}
