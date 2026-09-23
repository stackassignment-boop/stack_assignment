'use client';

import { useState } from 'react';
import { ArrowRight, BookOpenCheck, CheckCircle2, Clock3, Globe2, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouteNavigate } from '@/lib/useRouteNavigate';

interface HeroSectionProps {
  onNavigate?: (page: string, params?: Record<string, string>) => void;
}

/**
 * Conversion-focused AU/UK hero. The page deliberately sells tutoring,
 * feedback, editing and study support rather than completed assessment work.
 */
export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const navigate = useRouteNavigate();
  const [market, setMarket] = useState<'AU' | 'UK'>('AU');
  const [service, setService] = useState('tutoring');
  const [university, setUniversity] = useState('');

  const go = (page: string, params?: Record<string, string>) => {
    if (onNavigate) onNavigate(page, params);
    else navigate(page, params);
  };

  const startRequest = () => {
    go('order', {
      service,
      description: university
        ? `Market: ${market === 'AU' ? 'Australia' : 'United Kingdom'}; University: ${university}`
        : `Market: ${market === 'AU' ? 'Australia' : 'United Kingdom'}`,
    });
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(45,212,191,0.20),transparent_32%),radial-gradient(circle_at_85%_10%,rgba(99,102,241,0.30),transparent_35%),linear-gradient(135deg,#07111f_0%,#111b3a_52%,#1d1640_100%)]" />
      <div className="absolute -left-24 top-32 h-72 w-72 rounded-full border border-white/10 bg-white/[0.03] blur-2xl" />
      <div className="absolute -right-28 bottom-0 h-96 w-96 rounded-full border border-teal-300/10 bg-teal-300/[0.04] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 md:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_.92fr]">
          <div>
            <div className="mb-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-sm font-semibold backdrop-blur">
              <span className="flex items-center gap-1.5"><span className="text-lg">🇦🇺</span> Australia first</span>
              <span className="text-white/30">•</span>
              <span className="flex items-center gap-1.5"><span className="text-lg">🇬🇧</span> UK support</span>
            </div>

            <h1 className="max-w-4xl text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem] lg:leading-[1.02]">
              Better academic support.
              <span className="block bg-gradient-to-r from-teal-300 via-cyan-200 to-indigo-300 bg-clip-text text-transparent">Built for your university.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              One-to-one tutoring, draft feedback, proofreading, referencing help and exam preparation for university students in Australia and the UK.
            </p>

            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
              {[
                ['University-specific support', 'Matched to your unit, rubric and referencing style'],
                ['Australian & UK English', 'AU/UK spelling, academic conventions and citation styles'],
                ['Work on your own draft', 'Feedback and editing that keeps your work yours'],
                ['Fast human support', 'Clear communication when deadlines are approaching'],
              ].map(([title, body]) => (
                <div key={title} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-4 backdrop-blur-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-300" />
                  <div>
                    <p className="font-bold text-white">{title}</p>
                    <p className="mt-1 text-sm leading-5 text-slate-300">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button onClick={startRequest} className="h-14 rounded-2xl bg-teal-300 px-7 text-base font-extrabold text-slate-950 shadow-xl shadow-teal-500/20 hover:bg-teal-200">
                Start a Support Request <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button onClick={() => go('tools')} variant="outline" className="h-14 rounded-2xl border-white/20 bg-white/5 px-7 text-base font-bold text-white hover:bg-white/10 hover:text-white">
                Explore Free Study Tools
              </Button>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-300">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-teal-300" /> Confidential</span>
              <span className="inline-flex items-center gap-2"><BookOpenCheck className="h-4 w-4 text-teal-300" /> APA 7 · Harvard · AGLC4 · Vancouver</span>
              <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-teal-300" /> 24/7 enquiries</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-teal-300/40 via-cyan-300/20 to-indigo-400/40 blur-xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.96] p-5 text-slate-900 shadow-2xl sm:p-7">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700">
                    <Sparkles className="h-3.5 w-3.5" /> 60-second request
                  </div>
                  <h2 className="text-2xl font-black tracking-tight">Tell us what you need</h2>
                  <p className="mt-1 text-sm text-slate-500">We will ask for the details needed to match your support.</p>
                </div>
                <div className="hidden h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 sm:flex">
                  <MessageCircle className="h-5 w-5 text-teal-700" />
                </div>
              </div>

              <div className="mb-5 grid grid-cols-2 rounded-2xl bg-slate-100 p-1">
                {([
                  ['AU', '🇦🇺 Australia'],
                  ['UK', '🇬🇧 United Kingdom'],
                ] as const).map(([key, label]) => (
                  <button key={key} type="button" onClick={() => setMarket(key)} className={`rounded-xl px-3 py-3 text-sm font-bold transition ${market === key ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>
                    {label}
                  </button>
                ))}
              </div>

              <label className="mb-2 block text-sm font-bold">What kind of support?</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  ['tutoring', '1:1 Tutoring'],
                  ['editing', 'Draft Editing'],
                  ['examprep', 'Exam Prep'],
                  ['samples', 'Worked Examples'],
                ].map(([key, label]) => (
                  <button key={key} type="button" onClick={() => setService(key)} className={`rounded-xl border px-3 py-3 text-sm font-bold transition ${service === key ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300'}`}>
                    {label}
                  </button>
                ))}
              </div>

              <label htmlFor="hero-university" className="mb-2 mt-5 block text-sm font-bold">University (optional)</label>
              <div className="relative">
                <Globe2 className="pointer-events-none absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
                <input id="hero-university" value={university} onChange={(e) => setUniversity(e.target.value)} placeholder={market === 'AU' ? 'e.g. UNSW, Deakin, CQU, KBS' : 'e.g. UCL, Manchester, Bedfordshire'} className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10" />
              </div>

              <button type="button" onClick={startRequest} className="mt-5 flex h-12 w-full items-center justify-center rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-indigo-700">
                Continue to secure request form <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <p className="mt-3 text-center text-xs leading-5 text-slate-500">No payment is taken on this step. You review the support request before committing.</p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-3 border-t border-white/10 pt-7 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="text-sm font-bold">🇦🇺 Australian focus</p><p className="mt-1 text-xs text-slate-400">Dedicated pages for Australian universities and local referencing conventions.</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="text-sm font-bold">🇬🇧 UK support</p><p className="mt-1 text-xs text-slate-400">UK university resources, British English and Harvard-style guidance.</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="text-sm font-bold">🎓 Academic integrity</p><p className="mt-1 text-xs text-slate-400">Support is designed around learning, feedback and your own final submission.</p></div>
        </div>
      </div>
    </section>
  );
}
