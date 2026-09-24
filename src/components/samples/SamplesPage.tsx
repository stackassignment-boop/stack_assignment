'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, FileCheck, GraduationCap, ArrowRight, Search, Layers3 } from 'lucide-react';
import SamplePreviewModal from './SamplePreviewModal';
import { StructuredData } from '@/components/seo/StructuredData';

interface Sample { id: string; title: string; slug: string; description?: string; subject?: string; academicLevel?: string; paperType?: string; pages?: number; fileName?: string; fileSize?: number; }
interface SamplesPageProps { previewSlug?: string; }
const styles: Record<string, { gradient: string; image: string }> = {
  Business: { gradient: 'from-indigo-600 to-indigo-500', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&h=600&fit=crop' },
  Nursing: { gradient: 'from-indigo-600 to-indigo-400', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&h=600&fit=crop' },
  Literature: { gradient: 'from-purple-600 to-purple-500', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&h=600&fit=crop' },
  Law: { gradient: 'from-indigo-700 to-purple-600', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&h=600&fit=crop' },
  STEM: { gradient: 'from-indigo-600 to-indigo-500', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=900&h=600&fit=crop' },
  'Computer Science': { gradient: 'from-indigo-600 to-purple-500', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&h=600&fit=crop' },
  Psychology: { gradient: 'from-purple-600 to-indigo-500', image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=900&h=600&fit=crop' },
  Education: { gradient: 'from-indigo-600 to-indigo-500', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&h=600&fit=crop' },
  default: { gradient: 'from-slate-700 to-indigo-600', image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=900&h=600&fit=crop' },
};
const levels: Record<string, string> = { high_school: 'High School', bachelor: "Bachelor's", master: "Master's", phd: 'PhD' };
const types: Record<string, string> = { essay: 'Essay', research_paper: 'Research Paper', dissertation: 'Dissertation', thesis: 'Thesis', coursework: 'Coursework', case_study: 'Case Study' };
const subscribeToNothing = () => () => {};
const readPreviewParam = () => new URLSearchParams(window.location.search).get('preview') ?? '';
const readNoPreviewParam = () => '';
const getStyle = (subject?: string) => (subject && styles[subject]) || styles.default;

export default function SamplesPage({ previewSlug }: SamplesPageProps) {
  const router = useRouter(); const [samples, setSamples] = useState<Sample[]>([]); const [loading, setLoading] = useState(true); const [manualSample, setManualSample] = useState<Sample | null>(null); const [previewDismissed, setPreviewDismissed] = useState(false); const [query, setQuery] = useState('');
  useEffect(() => { (async () => { try { const res = await fetch('/api/samples'); const data = await res.json(); setSamples(data.samples || []); } catch (e) { console.error(e); } finally { setLoading(false); } })(); }, []);
  const urlPreviewSlug = useSyncExternalStore(subscribeToNothing, readPreviewParam, readNoPreviewParam); const effectivePreviewSlug = previewSlug || urlPreviewSlug;
  const deepLinkedSample = !previewDismissed && effectivePreviewSlug ? samples.find(s => s.slug === effectivePreviewSlug) ?? null : null;
  const selectedSample = manualSample ?? deepLinkedSample;
  const filtered = samples.filter(s => `${s.title} ${s.subject || ''} ${s.paperType || ''}`.toLowerCase().includes(query.toLowerCase()));
  const handlePreview = (sample: Sample) => sample.fileName ? setManualSample(sample) : router.push(`/samples/${sample.slug}`);
  const closePreview = () => { setManualSample(null); setPreviewDismissed(true); };
  if (loading) return <main className="stack-page flex-grow"><div className="stack-container py-20"><div className="stack-skeleton-grid">{[1,2,3].map(i => <div key={i} className="stack-skeleton-card" />)}</div></div></main>;
  return <>
    <StructuredData data={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Academic Samples & Worked Examples', description: 'Browse academic samples and worked examples for study and reference.', url: 'https://www.stackassignment.com/samples', provider: { '@type': 'Organization', name: 'Stack Assignment' } }} />
    <main className="stack-page flex-grow overflow-hidden">
      <section className="stack-hero stack-samples-hero"><div className="stack-container py-16 md:py-20 relative z-10"><div className="max-w-4xl"><div className="stack-eyebrow"><BookOpen className="h-4 w-4" /> Study library</div><h1 className="stack-hero-title">Explore <span>academic samples</span> & worked examples</h1><p className="stack-hero-copy">Browse examples across subjects and study levels to understand structure, referencing and presentation before you start your own work.</p><div className="flex flex-wrap gap-3 mt-7"><span className="stack-pill-dark"><GraduationCap className="h-4 w-4" /> AU & UK students</span><span className="stack-pill-dark"><FileCheck className="h-4 w-4" /> Reference-focused</span></div></div></div></section>
      <section className="stack-container -mt-7 relative z-20 pb-16"><div className="stack-library-toolbar"><div><p className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">SAMPLE LIBRARY</p><h2 className="text-2xl font-bold mt-1">Find something relevant</h2></div><div className="stack-search"><Search className="h-4 w-4" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search subject, title or paper type…" /></div></div>
      {filtered.length === 0 ? <div className="stack-empty"><Layers3 className="h-12 w-12 text-indigo-400"/><h3>No matching samples</h3><p>Try another subject or keyword.</p></div> : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">{filtered.map(sample => { const style = getStyle(sample.subject); return <article key={sample.id} className="stack-sample-card"><div className="stack-sample-image" style={{ backgroundImage: `linear-gradient(135deg, rgba(15,23,42,.18), rgba(79,70,229,.28)), url(${style.image})` }}><span className={`bg-gradient-to-r ${style.gradient}`}>{sample.subject || 'Academic'}</span><div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-white"><span className="text-sm font-semibold">{types[sample.paperType || ''] || sample.paperType || 'Academic paper'}</span>{sample.pages ? <span className="text-xs bg-black/30 rounded-full px-2.5 py-1 backdrop-blur">{sample.pages} pages</span> : null}</div></div><div className="p-6"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500 mb-3"><span>{levels[sample.academicLevel || ''] || sample.academicLevel || 'University'}</span><span>•</span><span>Study example</span></div><h3 className="text-xl font-bold leading-tight line-clamp-2">{sample.title}</h3><p className="text-slate-600 dark:text-slate-300 mt-3 line-clamp-3">{sample.description || 'Explore the structure, presentation and referencing choices used in this academic example.'}</p><button onClick={() => handlePreview(sample)} className="mt-5 inline-flex items-center gap-2 text-indigo-600 font-bold text-sm">{sample.fileName ? 'Preview sample' : 'View example'} <ArrowRight className="h-4 w-4" /></button></div></article> })}</div>}
      </section>
      <section className="stack-container pb-20"><div className="stack-soft-banner"><div><p className="text-sm font-bold text-indigo-700">Need personalised support?</p><h2 className="text-2xl font-bold mt-1">Use a sample as a starting point, then get help with your own work.</h2></div><a href="/order" className="stack-primary-button">Get support <ArrowRight className="h-4 w-4" /></a></div></section>
    </main>
    {selectedSample && <SamplePreviewModal sample={selectedSample as any} isOpen={true} onClose={closePreview} />}
  </>;
}
