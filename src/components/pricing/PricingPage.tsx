'use client';

import { useState, useMemo } from 'react';

interface PricingPageProps {
  onNavigate?: (page: string, params?: Record<string, string>) => void;
}

/**
 * Pricing rebuilt around what is actually being sold.
 *
 * The previous version priced "pages" by academic level and deadline —
 * $3/$5.5/$9 per page, up to +200% for under 24 hours. That is a per-page
 * ghostwriting rate card: it prices a finished, submittable document, which
 * is exactly the product this site no longer offers. A tutoring/editing
 * business does not have a "pages" input at all, because the deliverable
 * isn't pages — it's hours of a tutor's time, or an editing pass over a
 * document the student already wrote.
 *
 * Four service types, four different units, matching how the services are
 * actually described elsewhere on the site (HeroSection, FAQSection, About):
 *   - Editing & Proofreading  -> priced per word of the student's own draft
 *   - 1:1 Tutoring            -> priced per hour
 *   - Worked Examples           -> priced per page, explicitly reference-only
 *   - Exam & Viva Prep        -> priced per session
 */

type ServiceType = 'editing' | 'tutoring' | 'samples' | 'examprep';

const SERVICES: Record<ServiceType, { label: string; unit: string; blurb: string }> = {
  editing: {
    label: 'Editing & Proofreading',
    unit: 'per 250 words',
    blurb: 'Upload your own draft. Tracked-changes edits, a structure note, and citation checks.',
  },
  tutoring: {
    label: '1:1 Tutoring',
    unit: 'per hour',
    blurb: 'Live or async sessions working through a concept, your brief, or where you\u2019re stuck.',
  },
  samples: {
    label: 'Worked Examples',
    unit: 'per page',
    blurb: 'Reference material to study from \u2014 clearly not for submission.',
  },
  examprep: {
    label: 'Exam & Viva Prep',
    unit: 'per session',
    blurb: 'Mock questions and coaching ahead of an exam or viva.',
  },
};

// Base rate per unit, by subject tier. Editing/samples are priced in AUD per
// 250-word block or per page; tutoring/exam prep per hour or per session.
const BASE_RATE: Record<ServiceType, Record<string, number>> = {
  editing: { standard: 3.5, technical: 5 },
  tutoring: { standard: 35, technical: 50 },
  samples: { standard: 12, technical: 18 },
  examprep: { standard: 45, technical: 65 },
};

const TIER_LABELS: Record<string, string> = {
  standard: 'Undergraduate — most subjects',
  technical: 'Postgraduate / technical (law, medicine, engineering, finance)',
};

// Turnaround affects editing and model-answer prep time, since those involve
// a finished piece of work by a deadline. Tutoring and exam prep are sessions
// booked at a time that suits the student, so turnaround doesn't apply there
// the same way \u2014 "priority booking" reflects getting an earlier slot, not
// a rushed finished document.
const TURNAROUND_MULTIPLIER: Record<string, number> = {
  standard: 1,
  priority: 1.3,
  urgent: 1.6,
};

const TURNAROUND_LABELS: Record<string, string> = {
  standard: '5+ days',
  priority: '2\u20134 days (+30%)',
  urgent: 'Within 48 hours (+60%)',
};

export default function PricingPage({ onNavigate }: PricingPageProps) {
  const [service, setService] = useState<ServiceType>('editing');
  const [tier, setTier] = useState('standard');
  const [turnaround, setTurnaround] = useState('standard');
  const [units, setUnits] = useState(4); // 250-word blocks, hours, pages, or sessions depending on service

  // Lead-capture modal state
  const [showCapture, setShowCapture] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState('');

  const showsTurnaround = service === 'editing' || service === 'samples';

  const price = useMemo(() => {
    const rate = BASE_RATE[service][tier];
    const multiplier = showsTurnaround ? TURNAROUND_MULTIPLIER[turnaround] : 1;
    return Math.round(rate * multiplier * units);
  }, [service, tier, turnaround, units, showsTurnaround]);

  const unitLabel = useMemo(() => {
    switch (service) {
      case 'editing':
        return `${units} \u00d7 250-word block${units === 1 ? '' : 's'} (\u2248${(units * 250).toLocaleString()} words)`;
      case 'tutoring':
        return `${units} hour${units === 1 ? '' : 's'}`;
      case 'samples':
        return `${units} page${units === 1 ? '' : 's'}`;
      case 'examprep':
        return `${units} session${units === 1 ? '' : 's'}`;
    }
  }, [service, units]);

  const handleNav = (page: string, params?: Record<string, string>) => {
    if (onNavigate) {
      onNavigate(page, params);
    }
  };

  const buildQuoteSummary = () => {
    const serviceLabel = SERVICES[service].label;
    const tierLabel = TIER_LABELS[tier] || tier;
    const turnaroundLabel = showsTurnaround ? ` | Turnaround: ${TURNAROUND_LABELS[turnaround]}` : '';
    return `Service: ${serviceLabel} | Level: ${tierLabel} | ${unitLabel}${turnaroundLabel} | Estimated Price: $${price.toLocaleString()}`;
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
      // Save the lead even if they never finish booking —
      // this is what lets us follow up on abandoned quotes.
      const res = await fetch('/api/inquiries', {
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

      // A rejected lead is still a lost lead, so make it visible in logs
      // rather than letting a non-2xx response pass silently.
      if (!res.ok) {
        console.error(
          'Failed to save quote lead: API responded',
          res.status,
          await res.text().catch(() => ''),
        );
      }
    } catch (err) {
      // Don't block the user from booking just because the lead-save failed —
      // log it and continue regardless.
      console.error('Failed to save quote lead:', err);
    } finally {
      setLeadSubmitting(false);
    }

    setShowCapture(false);

    // Carry the quote + contact details into the booking form so the student
    // doesn't have to re-enter anything.
    handleNav('order', {
      subject: `${SERVICES[service].label} — ${unitLabel}`,
      description: summary,
      email: leadEmail.trim(),
      phone: leadPhone.trim(),
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
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
            Pick a service, get a transparent estimate \u2014 no hidden fees
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Form inputs */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-indigo-100 dark:border-slate-700">
              <div className="space-y-6">
                {/* Service type */}
                <div>
                  <label className="block mb-3 font-semibold text-gray-800 dark:text-gray-100">
                    Service
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {(Object.keys(SERVICES) as ServiceType[]).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setService(key)}
                        className={`text-left p-4 rounded-xl border-2 transition-all ${
                          service === key
                            ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30'
                            : 'border-gray-200 dark:border-slate-600 hover:border-indigo-300'
                        }`}
                      >
                        <div className="font-bold text-gray-900 dark:text-white text-sm">{SERVICES[key].label}</div>
                        <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">{SERVICES[key].blurb}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subject tier */}
                <div>
                  <label className="block mb-3 font-semibold text-gray-800 dark:text-gray-100">
                    Level
                  </label>
                  <select
                    value={tier}
                    onChange={(e) => setTier(e.target.value)}
                    className="w-full p-4 rounded-xl border-2 border-gray-200 dark:bg-slate-700/50 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:border-indigo-300 cursor-pointer"
                  >
                    <option value="standard">{TIER_LABELS.standard} (${BASE_RATE[service].standard} {SERVICES[service].unit})</option>
                    <option value="technical">{TIER_LABELS.technical} (${BASE_RATE[service].technical} {SERVICES[service].unit})</option>
                  </select>
                </div>

                {/* Turnaround \u2014 only relevant for a finished deliverable (editing, samples) */}
                {showsTurnaround && (
                  <div>
                    <label className="block mb-3 font-semibold text-gray-800 dark:text-gray-100">
                      Turnaround
                    </label>
                    <select
                      value={turnaround}
                      onChange={(e) => setTurnaround(e.target.value)}
                      className="w-full p-4 rounded-xl border-2 border-gray-200 dark:bg-slate-700/50 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:border-indigo-300 cursor-pointer"
                    >
                      {Object.entries(TURNAROUND_LABELS).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Units */}
                <div>
                  <label className="block mb-3 font-semibold text-gray-800 dark:text-gray-100">
                    {service === 'editing' ? 'Length of your draft' : service === 'tutoring' ? 'Hours' : service === 'samples' ? 'Pages' : 'Sessions'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={units}
                    onChange={(e) => setUnits(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full p-4 rounded-xl border-2 border-gray-200 dark:bg-slate-700/50 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:border-indigo-300 text-lg font-semibold"
                  />
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">{unitLabel}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Price display & CTA */}
          <div className="lg:col-span-1 space-y-5">
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
              <div className="relative z-10">
                <p className="text-sm font-medium opacity-90 mb-2">Your Estimated Price</p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-6xl font-black tracking-tight">${price.toLocaleString()}</span>
                </div>
                <p className="text-xs opacity-75 mb-6">
                  {service === 'editing' && 'Tracked-changes edits on your own draft + a structure note'}
                  {service === 'tutoring' && 'Live or async sessions with a subject-matter tutor'}
                  {service === 'samples' && 'Reference material only \u2014 not for submission'}
                  {service === 'examprep' && 'Coaching and mock questions ahead of your exam or viva'}
                </p>

                <button
                  onClick={handleProceedClick}
                  className="w-full bg-white text-indigo-600 hover:bg-gray-50 px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  Book This
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                <div className="mt-5 pt-5 border-t border-white/20 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Your own work, yours to submit</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Transparent, upfront pricing</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>
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
                  <span>Clear process</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lead-capture modal \u2014 shown before proceeding to the booking form */}
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
              Enter your details so we can save your ${price.toLocaleString()} quote and take you to booking.
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
                  placeholder="+61 412 345 678"
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
                {leadSubmitting ? 'Saving...' : 'Continue to Booking'}
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
