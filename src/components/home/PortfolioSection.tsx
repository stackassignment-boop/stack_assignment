'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, ArrowRight } from 'lucide-react';

interface Sample {
  id: string;
  title: string;
  slug: string;
  description?: string;
  subject?: string;
  academicLevel?: string;
  paperType?: string;
  pages?: number;
}

// Gradient colors and images for different subjects
const subjectStyles: Record<string, { banner: string; badge: string; image: string }> = {
  'Business': { 
    banner: 'from-blue-500 to-cyan-500', 
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', 
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop'
  },
  'Nursing': { 
    banner: 'from-teal-500 to-emerald-500', 
    badge: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400', 
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop'
  },
  'Literature': { 
    banner: 'from-purple-500 to-violet-600', 
    badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', 
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop'
  },
  'Law': { 
    banner: 'from-amber-500 to-orange-500', 
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', 
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop'
  },
  'STEM': { 
    banner: 'from-indigo-500 to-blue-600', 
    badge: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400', 
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop'
  },
  'Computer Science': { 
    banner: 'from-green-500 to-lime-500', 
    badge: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', 
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop'
  },
  'Psychology': { 
    banner: 'from-pink-500 to-rose-500', 
    badge: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400', 
    image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600&h=400&fit=crop'
  },
  'Economics': { 
    banner: 'from-yellow-500 to-amber-500', 
    badge: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', 
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop'
  },
  'Education': { 
    banner: 'from-cyan-500 to-teal-500', 
    badge: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400', 
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop'
  },
  'default': { 
    banner: 'from-gray-500 to-slate-600', 
    badge: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400', 
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop'
  },
};

// Academic level labels
const academicLevels: Record<string, string> = {
  high_school: 'High School',
  bachelor: "Bachelor's",
  master: "Master's",
  phd: 'PhD',
};

// Paper type labels
const paperTypes: Record<string, string> = {
  essay: 'Essay',
  research_paper: 'Research Paper',
  dissertation: 'Dissertation',
  thesis: 'Thesis',
  coursework: 'Coursework',
  case_study: 'Case Study',
};

interface PortfolioSectionProps {
  onNavigate?: (page: string) => void;
}

export default function PortfolioSection({ onNavigate }: PortfolioSectionProps) {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSamples();
  }, []);

  const fetchSamples = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/samples?limit=100');
      if (!res.ok) {
        throw new Error('Failed to fetch samples');
      }
      const data = await res.json();
      console.log('Fetched samples:', data.samples?.length, data.samples);
      setSamples(data.samples || []);
    } catch (err) {
      console.error('Failed to fetch samples:', err);
      setError('Failed to load samples');
    } finally {
      setLoading(false);
    }
  };

  // Get up to 6 samples, ensuring at least one from each category if possible
  const getDisplaySamples = (): Sample[] => {
    if (samples.length === 0) return [];
    
    // Group samples by subject
    const groupedSamples = samples.reduce((acc, sample) => {
      const subject = sample.subject || 'General';
      if (!acc[subject]) {
        acc[subject] = [];
      }
      acc[subject].push(sample);
      return acc;
    }, {} as Record<string, Sample[]>);
    
    const subjects = Object.keys(groupedSamples);
    const result: Sample[] = [];
    const usedIds = new Set<string>();
    
    // First pass: take one sample from each subject (ensures variety)
    for (const subject of subjects) {
      if (result.length >= 6) break;
      const sample = groupedSamples[subject][0];
      if (sample && !usedIds.has(sample.id)) {
        result.push(sample);
        usedIds.add(sample.id);
      }
    }
    
    // Second pass: fill remaining slots with more samples from any category
    for (const sample of samples) {
      if (result.length >= 6) break;
      if (!usedIds.has(sample.id)) {
        result.push(sample);
        usedIds.add(sample.id);
      }
    }
    
    return result.slice(0, 6);
  };

  const displaySamples = getDisplaySamples();
  const uniqueSubjects = [...new Set(samples.map(s => s.subject).filter(Boolean))];

  // Get style for subject
  const getSubjectStyle = (subject?: string) => {
    if (!subject) return subjectStyles.default;
    return subjectStyles[subject] || subjectStyles.default;
  };

  return (
    <section className="py-24 bg-gradient-to-b from-indigo-50/50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 rounded-full px-5 py-2 text-sm font-bold uppercase tracking-wide mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4">
              <path d="M192 96c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32zM64 160c0-17.7 14.3-32 32-32H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32z"/>
            </svg>
            Sample Work
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
            Sample Work Portfolio
          </h2>
          <p className="text-gray-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Browse through a selection of our expert-written papers across diverse subjects and academic levels.
          </p>
        </div>

        {/* Subject Categories */}
        {uniqueSubjects.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {uniqueSubjects.map(subject => {
              const style = getSubjectStyle(subject);
              return (
                <span 
                  key={subject}
                  className={`text-sm font-semibold px-4 py-2 rounded-full ${style.badge}`}
                >
                  {subject}
                </span>
              );
            })}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <p className="text-red-500">{error}</p>
            <Button onClick={fetchSamples} variant="outline" className="mt-4">
              Try Again
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && samples.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400">
              No samples available yet
            </h3>
            <p className="text-gray-500 dark:text-gray-500 mt-2">
              Check back soon for sample papers
            </p>
          </div>
        )}

        {/* Cards Grid - Limited to 6 */}
        {!loading && !error && displaySamples.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displaySamples.map(sample => (
              <PortfolioCard key={sample.id} sample={sample} getSubjectStyle={getSubjectStyle} />
            ))}
          </div>
        )}

        {/* CTA */}
        {!loading && !error && samples.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Showing {Math.min(6, samples.length)} of {samples.length} samples across {uniqueSubjects.length} subjects
            </p>
            <Button 
              onClick={() => onNavigate?.('samples')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-xl font-bold text-lg shadow-lg"
            >
              View Full Portfolio
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function PortfolioCard({ sample, getSubjectStyle }: { sample: Sample; getSubjectStyle: (subject?: string) => { banner: string; badge: string; image: string } }) {
  const style = getSubjectStyle(sample.subject);
  
  return (
    <article className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={style.image} 
          alt={sample.subject || 'Sample'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        
        {/* Preview badge */}
        {sample.pages && (
          <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white">
            {sample.pages} {sample.pages === 1 ? 'page' : 'pages'}
          </div>
        )}
      </div>
      
      {/* Banner */}
      <div className={`h-1.5 bg-gradient-to-r ${style.banner}`} />
      
      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${style.badge}`}>
            {sample.subject || 'General'}
          </span>
          {sample.academicLevel && (
            <span className="text-xs text-gray-400 dark:text-slate-500 font-medium">
              {academicLevels[sample.academicLevel] || sample.academicLevel}
            </span>
          )}
        </div>
        
        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white line-clamp-2">
          {sample.title}
        </h3>
        
        {sample.description && (
          <p className="text-gray-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">
            {sample.description}
          </p>
        )}
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {sample.paperType && (
            <span className="text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 rounded-md font-semibold">
              {paperTypes[sample.paperType] || sample.paperType}
            </span>
          )}
          {sample.pages && (
            <span className="text-xs bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-md font-semibold">
              {sample.pages} pages
            </span>
          )}
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-1 text-sm">
            <span className="text-amber-500">★★★★★</span>
            <span className="font-semibold text-gray-700 dark:text-slate-300 ml-1">
              5.0
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4 text-green-500">
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
            </svg>
            Plagiarism Free
          </div>
        </div>
      </div>
    </article>
  );
}
