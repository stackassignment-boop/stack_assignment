'use client';

import { useState, useEffect } from 'react';
import { FileText, BookOpen, GraduationCap, FileCheck, Eye } from 'lucide-react';
import SamplePreviewModal from './SamplePreviewModal';

interface Sample {
  id: string;
  title: string;
  slug: string;
  description?: string;
  subject?: string;
  academicLevel?: string;
  paperType?: string;
  pages?: number;
  fileName?: string;
  fileSize?: number;
}

// Gradient colors for cards
const gradients = [
  'from-teal-500 to-emerald-600',
  'from-blue-500 to-cyan-600',
  'from-purple-500 to-pink-600',
  'from-orange-500 to-red-600',
  'from-green-500 to-teal-600',
  'from-indigo-500 to-purple-600',
];

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

export default function SamplesPage() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    fetchSamples();
  }, []);

  const fetchSamples = async () => {
    try {
      const res = await fetch('/api/samples');
      const data = await res.json();
      setSamples(data.samples || []);
    } catch (error) {
      console.error('Failed to fetch samples:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handlePreview = (sample: Sample) => {
    setSelectedSample(sample);
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setSelectedSample(null);
  };

  // Calculate preview pages
  const getPreviewPages = (pages?: number) => {
    if (!pages) return 1;
    return Math.max(1, Math.ceil(pages / 3));
  };

  if (loading) {
    return (
      <main className="flex-grow py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="flex-grow py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Assignment & Essay Samples
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Preview our sample papers (1/3rd visible) • Login or contact admin for full access
            </p>
          </div>

          {/* Samples Grid */}
          {samples.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400">
                No samples available yet
              </h3>
              <p className="text-gray-500 dark:text-gray-500 mt-2">
                Check back soon for sample papers
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {samples.map((sample, index) => (
                <div
                  key={sample.id}
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden transition hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Header with gradient */}
                  <div
                    className={`h-44 bg-gradient-to-br ${gradients[index % gradients.length]} flex flex-col items-center justify-center text-white p-6 text-center relative`}
                  >
                    <FileText className="h-10 w-10 mb-3 opacity-90" />
                    <h3 className="text-xl font-bold leading-tight">{sample.title}</h3>
                    {sample.subject && (
                      <p className="text-white/80 mt-2 text-sm">{sample.subject}</p>
                    )}
                    {/* Preview badge */}
                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                      Preview: {getPreviewPages(sample.pages)}/{sample.pages || '?'} pages
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta info */}
                    <div className="flex flex-wrap gap-3 mb-4">
                      {sample.academicLevel && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full text-sm font-medium">
                          <GraduationCap className="h-4 w-4" />
                          {academicLevels[sample.academicLevel] || sample.academicLevel}
                        </span>
                      )}
                      {sample.paperType && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                          <FileCheck className="h-4 w-4" />
                          {paperTypes[sample.paperType] || sample.paperType}
                        </span>
                      )}
                      {sample.pages && (
                        <span className="inline-flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm">
                          {sample.pages} {sample.pages === 1 ? 'page' : 'pages'}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    {sample.description && (
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                        {sample.description}
                      </p>
                    )}

                    {/* File info */}
                    {sample.fileName && (
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-slate-700 rounded-lg p-3">
                        <FileText className="h-4 w-4 text-red-500" />
                        <span className="truncate flex-1">{sample.fileName}</span>
                        {sample.fileSize && (
                          <span className="text-xs">({formatFileSize(sample.fileSize)})</span>
                        )}
                      </div>
                    )}

                    {/* Preview Button */}
                    <button
                      onClick={() => handlePreview(sample)}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium transition"
                    >
                      <Eye className="h-5 w-5" />
                      Preview Sample
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Info Section */}
          <div className="mt-16 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Why Our Samples?
              </h2>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-14 h-14 bg-teal-100 dark:bg-teal-900 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FileCheck className="h-7 w-7 text-teal-600 dark:text-teal-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Quality Assured</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Every sample meets academic standards
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <GraduationCap className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">All Levels</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    High school to PhD level work
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Various Subjects</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Business, Nursing, Tech & more
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Preview Modal */}
      {selectedSample && (
        <SamplePreviewModal
          sample={selectedSample}
          isOpen={showPreview}
          onClose={handleClosePreview}
        />
      )}
    </>
  );
}
