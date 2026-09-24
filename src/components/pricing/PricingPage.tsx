'use client';

import { useMemo, useState } from 'react';
import { Calculator, Check, Clock3, LockKeyhole, ArrowRight, Sparkles, X, ShieldCheck } from 'lucide-react';

interface PricingPageProps { onNavigate?: (page: string, params?: Record<string, string>) => void; }
type ServiceType = 'editing' | 'tutoring' | 'samples' | 'examprep';

const SERVICES: Record<ServiceType, { label: string; unit: string; blurb: string; icon: string }> = {
  editing: { label: 'Editing & Proofreading', unit: 'per 250 words', blurb: 'Improve your own draft with structure, clarity and citation checks.', icon: '✦' },
  tutoring: { label: '1:1 Tutoring', unit: 'per hour', blurb: 'Work through concepts, briefs and difficult topics with a tutor.', icon: '◉' },
  samples: { label: 'Worked Examples', unit: 'per page', blurb: 'Reference material to learn from — clearly not for submission.', icon: '▤' },
  examprep: { label: 'Exam & Viva Prep', unit: 'per session', blurb: 'Mock questions, revision planning and confidence-building coaching.', icon: '✓' },
};
const BASE_RATE: Record<ServiceType, Record<string, number>> = {
  editing: { standard: 3.5, technical: 5 }, tutoring: { standard: 35, technical: 50 }, samples: { standard: 12, technical: 18 }, examprep: { standard: 45, technical: 65 },
};
const TIER_LABELS: Record<string, string> = { standard: 'Undergraduate — most subjects', technical: 'Postgraduate / technical subjects' };
const TURNAROUND_MULTIPLIER: Record<string, number> = { standard: 1, priority: 1.3, urgent: 1.6 };
const TURNAROUND_LABELS: Record<string, string> = { standard: '5+ days', priority: '2–4 days (+30%)', urgent: 'Within 48 hours (+60%)' };

export default function PricingPage({ onNavigate }: PricingPageProps) {
  const [service, setService] = useState<ServiceType>('editing');
  const [tier, setTier] = useState('standard');
  const [turnaround, setTurnaround] = useState('standard');
  const [units, setUnits] = useState(4);
  const [showCapture, setShowCapture] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState('');

  const showsTurnaround = service === 'editing' || service === 'samples';
  const price = useMemo(() => Math.round(BASE_RATE[service][tier] * (showsTurnaround ? TURNAROUND_MULTIPLIER[turnaround] : 1) * units), [service, tier, turnaround, units, showsTurnaround]);
  const unitLabel = useMemo(() => {
    if (service === 'editing') return `${units} × 250-word block${units === 1 ? '' : 's'} (≈${(units * 250).toLocaleString()} words)`;
    if (service === 'tutoring') return `${units} hour${units === 1 ? '' : 's'}`;
    if (service === 'samples') return `${units} page${units === 1 ? '' : 's'}`;
    return `${units} session${units === 1 ? '' : 's'}`;
  }, [service, units]);
  const handleNav = (page: string, params?: Record<string, string>) => onNavigate?.(page, params);
  const buildQuoteSummary = () => `Service: ${SERVICES[service].label} | Level: ${TIER_LABELS[tier]} | ${unitLabel}${showsTurnaround ? ` | Turnaround: ${TURNAROUND_LABELS[turnaround]}` : ''} | Estimated Price: $${price.toLocaleString()}`;

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLeadError('');
    if (!leadName.trim() || leadName.trim().length < 2) return setLeadError('Please enter your name.');
    if (!leadEmail.trim() || !/^\S+@\S+\.\S+$/.test(leadEmail)) return setLeadError('Please enter a valid email address.');
    setLeadSubmitting(true);
    try {
      await fetch('/api/inquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: leadName.trim(), email: leadEmail.trim(), phone: leadPhone.trim() || undefined, subject: 'Quote Calculator Lead', message: buildQuoteSummary(), source: 'website' }) });
    } catch (err) { console.error('Failed to save quote lead:', err); }
    finally { setLeadSubmitting(false); }
    setShowCapture(false);
    handleNav('order', { subject: `${SERVICES[service].label} — ${unitLabel}`, description: buildQuoteSummary(), email: leadEmail.trim(), phone: leadPhone.trim() });
  };

  return (
    <main className="stack-page flex-grow overflow-hidden">
      <section className="stack-hero stack-pricing-hero">
        <div className="stack-container relative z-10 py-16 md:py-20">
          <div className="max-w-4xl">
            <div className="stack-eyebrow"><Sparkles className="h-4 w-4" /> Transparent pricing</div>
            <h1 className="stack-hero-title">Simple pricing for <span>real academic support</span></h1>
            <p className="stack-hero-copy">Choose the support you need, adjust the scope and see an estimated price instantly. No confusing page-count packages.</p>
            <div className="flex flex-wrap gap-3 mt-7 text-sm font-semibold text-white/90">
              {['Australia & UK focused', 'Upfront estimate', 'Secure booking'].map(x => <span key={x} className="stack-pill-dark"><Check className="h-4 w-4 text-indigo-300" />{x}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="stack-container -mt-8 relative z-20 pb-16 md:pb-20">
        <div className="grid lg:grid-cols-[1.5fr_.85fr] gap-6 items-start">
          <div className="stack-card stack-pricing-panel p-6 md:p-8">
            <div className="flex items-center gap-3 mb-7"><div className="stack-icon-bubble"><Calculator className="h-5 w-5" /></div><div><p className="text-sm font-bold text-indigo-600">BUILD YOUR ESTIMATE</p><h2 className="text-2xl font-bold">What support do you need?</h2></div></div>
            <div className="grid sm:grid-cols-2 gap-3 mb-7">
              {(Object.keys(SERVICES) as ServiceType[]).map(key => (
                <button key={key} type="button" onClick={() => setService(key)} className={`stack-choice ${service === key ? 'is-active' : ''}`}>
                  <span className="text-2xl">{SERVICES[key].icon}</span><span><strong>{SERVICES[key].label}</strong><small>{SERVICES[key].blurb}</small></span>{service === key && <span className="ml-auto rounded-full bg-indigo-600 text-white p-1"><Check className="h-3 w-3" /></span>}
                </button>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <label className="stack-field"><span>Academic level</span><select value={tier} onChange={e => setTier(e.target.value)}><option value="standard">{TIER_LABELS.standard} (${BASE_RATE[service].standard} {SERVICES[service].unit})</option><option value="technical">{TIER_LABELS.technical} (${BASE_RATE[service].technical} {SERVICES[service].unit})</option></select></label>
              {showsTurnaround && <label className="stack-field"><span>Turnaround</span><select value={turnaround} onChange={e => setTurnaround(e.target.value)}>{Object.entries(TURNAROUND_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></label>}
              <label className="stack-field md:col-span-2"><span>{service === 'editing' ? 'Length of your draft' : service === 'tutoring' ? 'Hours' : service === 'samples' ? 'Pages' : 'Sessions'}</span><input type="number" min="1" value={units} onChange={e => setUnits(Math.max(1, parseInt(e.target.value) || 1))} /><small>{unitLabel}</small></label>
            </div>
          </div>

          <aside className="stack-price-card">
            <div className="relative z-10"><div className="flex items-center gap-2 text-indigo-200 text-sm font-bold uppercase tracking-widest"><Clock3 className="h-4 w-4" /> Estimated price</div><div className="text-6xl font-black mt-3 tracking-tight">${price.toLocaleString()}</div><p className="text-white/75 mt-3">{SERVICES[service].blurb}</p><button onClick={() => setShowCapture(true)} className="w-full mt-7 rounded-xl bg-white text-indigo-700 py-4 font-extrabold flex items-center justify-center gap-2 hover:translate-y-[-1px] transition">Continue to booking <ArrowRight className="h-5 w-5" /></button><div className="mt-7 pt-6 border-t border-white/15 space-y-3 text-sm text-white/85">{['Your own work remains yours to submit', 'Transparent estimate before booking', 'AU & UK support available'].map(x => <div key={x} className="flex gap-2"><Check className="h-4 w-4 text-indigo-300 mt-0.5" />{x}</div>)}</div></div>
          </aside>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          {[['Secure process', LockKeyhole], ['Clear pricing', Calculator], ['Support when needed', ShieldCheck]].map(([label, Icon]) => <div key={String(label)} className="stack-mini-trust"><Icon className="h-5 w-5 text-indigo-600" /><span>{label}</span></div>)}
        </div>
      </section>

      {showCapture && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm px-4" onClick={() => setShowCapture(false)}><div className="stack-modal" onClick={e => e.stopPropagation()}><button onClick={() => setShowCapture(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800"><X className="h-5 w-5" /></button><div className="stack-icon-bubble mb-4"><ArrowRight className="h-5 w-5" /></div><h3 className="text-2xl font-bold">Save your estimate</h3><p className="text-slate-500 mt-2 mb-6">Enter your details and we will carry this quote into the booking form.</p><form onSubmit={handleLeadSubmit} className="space-y-4"><input className="stack-modal-input" placeholder="Full name" value={leadName} onChange={e => setLeadName(e.target.value)} /><input className="stack-modal-input" placeholder="Email address" type="email" value={leadEmail} onChange={e => setLeadEmail(e.target.value)} /><input className="stack-modal-input" placeholder="WhatsApp / phone (optional)" value={leadPhone} onChange={e => setLeadPhone(e.target.value)} />{leadError && <p className="text-sm font-semibold text-red-600">{leadError}</p>}<button disabled={leadSubmitting} className="w-full rounded-xl bg-indigo-600 text-white py-3.5 font-bold disabled:opacity-60">{leadSubmitting ? 'Saving…' : 'Continue to booking'}</button></form></div></div>}
    </main>
  );
}
