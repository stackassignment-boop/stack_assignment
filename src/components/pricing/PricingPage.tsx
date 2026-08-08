'use client';

import { useState, useMemo } from 'react';

interface PricingPageProps {
  onNavigate?: (page: string, params?: Record<string, string>) => void;
}

const LEVEL_LABELS: Record<string, string> = {
  '3': 'High School / Undergraduate',
  '5.5': 'Bachelor / Masters',
  '9': 'PhD / Professional',
};

const DEADLINE_LABELS: Record<string, string> = {
  '1': '14+ days',
  '1.3': '7–13 days',
  '1.6': '3–6 days',
  '2.2': '24–48 hours',
  '3.0': 'Under 24 hours',
};

export default function PricingPage({ onNavigate }: PricingPageProps) {
  const [level, setLevel] = useState('3');
  const [deadline, setDeadline] = useState('1');
  const [pages, setPages] = useState(5);

  // Lead-capture modal state
  const [showCapture, setShowCapture] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState('');

  // Use useMemo for derived state instead of useEffect
  const price = useMemo(() => {
    const levelPrice = parseFloat(level);
    const multiplier = parseFloat(deadline);
    return Math.round(levelPrice * multiplier * pages);
  }, [level, deadline, pages]);

  const wordCount = pages * 250;

  const handleNav = (page: string, params?: Record<string, string>) => {
    if (onNavigate) {
      onNavigate(page, params);
    }
  };

  const buildQuoteSummary = () => {
    const levelLabel = LEVEL_LABELS[level] || level;
    const deadlineLabel = DEADLINE_LABELS[deadline] || deadline;
    return `Academic Level: ${levelLabel} | Deadline: ${deadlineLabel} | Pages: ${pages} (~${wordCount.toLocaleString()} words) | Estimated Price: $${price.toLocaleString()}`;
  };

  const handleProceedClick = () => {
    setLeadError('');
    setShowCapture(true);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadError('');

    if (!leadName.trim() || leadName.trim().length < 2) {
      setLeadError('Please enter your name.');
      return;
    }
    if (!leadEmail.trim() || !/^\S+@\S+\.\S+$/.test(leadEmail)) {
      setLeadError('Please enter a valid email address.');
      return;
    }

    setLeadSubmitting(true);
    const summary = buildQuoteSummary();

    try {
      // Save the lead even if they never finish the order —
      // this is what lets us follow up on abandoned quotes.
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadName.trim(),
          email: leadEmail.trim(),
          phone: leadPhone.trim() || undefined,
          subject: 'Quote Calculator Lead',
          message: summary,
          source: 'website',
        }),
      });
    } catch (err) {
      // Don't block the user from ordering just because the lead-save failed —
      // log it and continue to the order page regardless.
      console.error('Failed to save quote lead:', err);
    } finally {
      setLeadSubmitting(false);
    }

    setShowCapture(false);

    // Carry the quote + contact details into the order form so the student
    // doesn't have to re-enter anything.
    handleNav('order', {
      subject: `${LEVEL_LABELS[level] || level} — ${pages} pages`,
      description: summary,
      email: leadEmail.trim(),
      phone: leadPhone.trim(),
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
      {/* Animated university logos background */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.04] dark:opacity-[0.08] pointer-events-none">
        <div className="absolute animate-pulse" style={{ top: '10%', left: '5%', animationDelay: '0s' }}>
          <div className="text-indigo-600 font-bold text-2xl font-sans">MIT</div>
        </div>
        <div className="absolute animate-pulse" style={{ top: '60%', right: '8%', animationDelay: '3s' }}>
          <div className="text-indigo-600 font-bold text-xl font-sans">UNSW</div>
        </div>
        <div className="absolute animate-pulse" style={{ bottom: '15%', left: '12%', animationDelay: '6s' }}>
          <div className="text-indigo-600 font-bold text-lg font-sans">Berkeley</div>
        </div>
        <div className="absolute animate-pulse" style={{ top: '25%', right: '15%', animationDelay: '9s' }}>
          <div className="text-indigo-600 font-bold text-xl font-sans">Monash</div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-wider mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Instant Quote
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Calculate Your Price
          </h2>
          <p className="text-gray-600 dark:text-slate-400 text-lg">
            Get your custom quote in seconds — transparent, instant, no hidden fees
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Form inputs */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-indigo-100 dark:border-slate-700">
              <div className="space-y-6">
                {/* Academic Level */}
                <div>
                  <label className="block mb-3 font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                    Academic Level
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full p-4 rounded-xl border-2 border-gray-200 dark:bg-slate-700/50 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:border-indigo-300 cursor-pointer"
                  >
                    <option value="3">High School / Undergraduate ($3/page)</option>
                    <option value="5.5">Bachelor / Masters ($5.5/page)</option>
                    <option value="9">PhD / Professional ($9/page)</option>
                  </select>
                </div>

                {/* Deadline */}
                <div>
                  <label className="block mb-3 font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Deadline
                  </label>
                  <select
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full p-4 rounded-xl border-2 border-gray-200 dark:bg-slate-700/50 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:border-indigo-300 cursor-pointer"
                  >
                    <option value="1">14+ days (Base price)</option>
                    <option value="1.3">7–13 days (+30%)</option>
                    <option value="1.6">3–6 days (+60%)</option>
                    <option value="2.2">24–48 hours (+120%)</option>
                    <option value="3.0">Under 24 hours (+200%)</option>
                  </select>
                </div>

                {/* Pages */}
                <div>
                  <label className="block mb-3 font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Pages / Words
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      value={pages}
                      onChange={(e) => setPages(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full p-4 pr-32 rounded-xl border-2 border-gray-200 dark:bg-slate-700/50 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:border-indigo-300 text-lg font-semibold"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                      ≈{wordCount.toLocaleString()} words
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Price display & CTA */}
          <div className="lg:col-span-1 space-y-5">
            {/* Price card */}
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
              <div className="relative z-10">
                <p className="text-sm font-medium opacity-90 mb-2">Your Estimated Price</p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-6xl font-black tracking-tight">${price.toLocaleString()}</span>
                </div>
                <p className="text-xs opacity-75 mb-6">Includes free revisions & plagiarism report</p>

                <button
                  onClick={handleProceedClick}
                  className="w-full bg-white text-indigo-600 hover:bg-gray-50 px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  Proceed to Order
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                <div className="mt-5 pt-5 border-t border-white/20 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>100% Plagiarism Free</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>On-Time Delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>
              {/* Animated sparkles */}
              <>
                <div className="absolute top-4 right-4 animate-ping opacity-50">
                  <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className="absolute bottom-6 left-6 animate-ping opacity-50" style={{ animationDelay: '1s' }}>
                  <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </>
            </div>

            {/* Trust badges */}
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-xl p-5 border border-gray-200 dark:border-slate-700">
              <div className="flex items-center justify-center gap-4 text-xs text-gray-600 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Secure</span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Encrypted</span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>4.9/5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lead-capture modal — shown before proceeding to the full order form */}
      {showCapture && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={() => setShowCapture(false)}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCapture(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">Almost there!</h3>
            <p className="text-gray-600 dark:text-slate-400 text-sm mb-6">
              Enter your details so we can save your ${price.toLocaleString()} quote and take you to checkout.
            </p>

            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div>
                <label className="block mb-1.5 text-sm font-semibold text-gray-800 dark:text-gray-100">
                  Full Name
                </label>
                <input
                  type="text"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full p-3 rounded-lg border-2 border-gray-200 dark:bg-slate-700/50 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block mb-1.5 text-sm font-semibold text-gray-800 dark:text-gray-100">
                  Email Address
                </label>
                <input
                  type="email"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  placeholder="jane@university.edu"
                  className="w-full p-3 rounded-lg border-2 border-gray-200 dark:bg-slate-700/50 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block mb-1.5 text-sm font-semibold text-gray-800 dark:text-gray-100">
                  WhatsApp / Phone <span className="font-normal text-gray-400">(optional, for faster updates)</span>
                </label>
                <input
                  type="tel"
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full p-3 rounded-lg border-2 border-gray-200 dark:bg-slate-700/50 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {leadError && (
                <p className="text-red-600 text-sm font-medium">{leadError}</p>
              )}

              <button
                type="submit"
                disabled={leadSubmitting}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3.5 rounded-xl font-bold hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {leadSubmitting ? 'Saving...' : 'Continue to Order'}
              </button>

              <p className="text-xs text-center text-gray-400">
                We'll only use this to save your quote and follow up — no spam.
              </p>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
