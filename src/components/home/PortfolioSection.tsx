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

const subjectImages: Record<string, string> = {
  'Business': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
  'Nursing': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop',
  'Literature': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
  'Law': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop',
  'STEM': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop',
  'Computer Science': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
  'default': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop',
};

const subjectColors: Record<string, string> = {
  'Business': 'bg-blue-500',
  'Nursing': 'bg-teal-500',
  'Literature': 'bg-purple-500',
  'Law': 'bg-amber-500',
  'STEM': 'bg-indigo-500',
  'Computer Science': 'bg-green-500',
  'default': 'bg-gray-500',
};

const academicLevels: Record<string, string> = {
  high_school: 'High School',
  bachelor: "Bachelor's",
  master: "Master's",
  phd: 'PhD',
};

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

  useEffect(() => {
    async function loadSamples() {
      try {
        const res = await fetch('/api/samples?limit=100');
        const data = await res.json();
        setSamples(data.samples || []);
      } catch (error) {
        console.error('Failed to load samples:', error);
      } finally {
        setLoading(false);
      }
    }
    loadSamples();
  }, []);

  // Get 6 samples, one from each category if possible
  const displaySamples = (() => {
    if (samples.length === 0) return [];
    
    const bySubject: Record<string, Sample[]> = {};
    samples.forEach(s => {
      const sub = s.subject || 'General';
      if (!bySubject[sub]) bySubject[sub] = [];
      bySubject[sub].push(s);
    });
    
    const result: Sample[] = [];
    const used = new Set<string>();
    
    // One from each subject
    Object.values(bySubject).forEach(arr => {
      if (result.length < 6 && arr[0]) {
        result.push(arr[0]);
        used.add(arr[0].id);
      }
    });
    
    // Fill remaining
    samples.forEach(s => {
      if (result.length < 6 && !used.has(s.id)) {
        result.push(s);
      }
    });
    
    return result.slice(0, 6);
  })();

  const subjects = [...new Set(samples.map(s => s.subject).filter(Boolean))];

  const getImage = (subject?: string) => subjectImages[subject || ''] || subjectImages.default;
  const getColor = (subject?: string) => subjectColors[subject || ''] || subjectColors.default;

  if (loading) {
    return (
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold px-4 py-1 rounded-full mb-4">
            Sample Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Our Writing Portfolio
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Browse our expert-written papers across diverse subjects and academic levels.
          </p>
        </div>

        {/* Subject Tags */}
        {subjects.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {subjects.map(sub => (
              <span key={sub} className={`text-white text-sm font-medium px-4 py-1.5 rounded-full ${getColor(sub)}`}>
                {sub}
              </span>
            ))}
          </div>
        )}

        {/* No Samples */}
        {samples.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No samples available yet.</p>
          </div>
        )}

        {/* Samples Grid */}
        {displaySamples.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {displaySamples.map(sample => (
              <div key={sample.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-40">
                  <img 
                    src={getImage(sample.subject)} 
                    alt={sample.subject || 'Sample'}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute bottom-0 left-0 right-0 h-1 ${getColor(sample.subject)}`}></div>
                  {sample.pages && (
                    <span className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      {sample.pages} pages
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${getColor(sample.subject)} text-white`}>
                      {sample.subject || 'General'}
                    </span>
                    {sample.academicLevel && (
                      <span className="text-xs text-gray-500">
                        {academicLevels[sample.academicLevel] || sample.academicLevel}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {sample.title}
                  </h3>
                  {sample.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {sample.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2">
                    {sample.paperType && (
                      <span className="text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded">
                        {paperTypes[sample.paperType] || sample.paperType}
                      </span>
                    )}
                    <span className="text-xs text-amber-500 font-medium">★★★★★ 5.0</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        {samples.length > 0 && (
          <div className="text-center">
            <p className="text-gray-500 mb-4">
              Showing {Math.min(6, samples.length)} of {samples.length} samples
            </p>
            <Button 
              onClick={() => onNavigate?.('samples')}
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-xl font-bold text-lg"
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
