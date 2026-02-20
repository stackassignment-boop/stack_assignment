'use client';

import { useState, useEffect } from 'react';
import { X, Lock, MessageCircle, LogIn, FileText, Loader2, BookOpen, GraduationCap, FileCheck } from 'lucide-react';

interface SamplePreviewModalProps {
  sample: {
    id: string;
    title: string;
    slug: string;
    pages?: number;
    fileName?: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

interface PreviewData {
  preview: string;
  title: string;
  pages: number;
  hasFile: boolean;
  fileName?: string;
  subject?: string;
  academicLevel?: string;
  paperType?: string;
  description?: string;
}

export default function SamplePreviewModal({ sample, isOpen, onClose }: SamplePreviewModalProps) {
  const [loading, setLoading] = useState(false);
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && sample.slug) {
      fetchPreview();
    }
  }, [isOpen, sample.slug]);

  const fetchPreview = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/samples/${sample.slug}/preview`);
      const data = await res.json();
      
      if (res.ok) {
        setPreviewData(data);
      } else {
        setError(data.error || 'Failed to load preview');
      }
    } catch (err) {
      setError('Failed to load preview');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const totalPages = previewData?.pages || sample.pages || 3;
  const previewPages = Math.max(1, Math.ceil(totalPages / 3));
  const lockedPages = totalPages - previewPages;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  // Academic level labels
  const academicLevels: Record<string, string> = {
    high_school: 'High School',
    bachelor: "Bachelor's",
    master: "Master's",
    phd: 'PhD',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onKeyDown={handleKeyDown}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
          <div className="flex-1 pr-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {previewData?.title || sample.title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {totalPages} pages total • Preview shows first {previewPages} page(s)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content Preview Area */}
        <div className="flex-1 overflow-hidden relative">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-64 text-center p-6">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <div className="relative h-full min-h-[400px]">
              {/* Visible 1/3rd Content */}
              <div className="h-1/3 overflow-y-auto p-6 bg-white dark:bg-slate-800 border-b-2 border-teal-500">
                {/* Meta info */}
                {previewData && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {previewData.subject && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full text-xs font-medium">
                        <BookOpen className="h-3 w-3" />
                        {previewData.subject}
                      </span>
                    )}
                    {previewData.academicLevel && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                        <GraduationCap className="h-3 w-3" />
                        {academicLevels[previewData.academicLevel] || previewData.academicLevel}
                      </span>
                    )}
                    {previewData.paperType && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                        <FileCheck className="h-3 w-3" />
                        {previewData.paperType.replace('_', ' ')}
                      </span>
                    )}
                  </div>
                )}
                
                {/* Preview content */}
                <div className="prose dark:prose-invert max-w-none text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {previewData?.preview || 'No preview content available. Please contact admin for full access.'}
                </div>
                
                {/* Preview indicator */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                  <span className="inline-flex items-center gap-1 text-xs text-teal-600 dark:text-teal-400 font-medium">
                    ✓ Preview: First {previewPages} of {totalPages} pages
                  </span>
                </div>
              </div>

              {/* Blurred 2/3rd Content */}
              <div className="h-2/3 relative bg-gradient-to-b from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700">
                {/* Blurred overlay effect */}
                <div className="absolute inset-0 backdrop-blur-[3px]">
                  {/* Mock content lines */}
                  <div className="p-6 space-y-4">
                    {[...Array(6)].map((_, i) => (
                      <div 
                        key={i} 
                        className="h-4 bg-gray-300/60 dark:bg-slate-600/60 rounded animate-pulse"
                        style={{ width: `${55 + Math.random() * 40}%` }}
                      />
                    ))}
                    <div className="py-2" />
                    {[...Array(6)].map((_, i) => (
                      <div 
                        key={i + 6} 
                        className="h-4 bg-gray-300/50 dark:bg-slate-600/50 rounded animate-pulse"
                        style={{ width: `${50 + Math.random() * 45}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Lock overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 mx-4 text-center max-w-sm border border-gray-200 dark:border-slate-700">
                    <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lock className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {lockedPages} Pages Locked
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
                      Only {previewPages} page(s) available for preview. 
                      Contact admin to unlock full document.
                    </p>
                    <div className="flex gap-3">
                      <a
                        href="/?view=student-login"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium transition"
                      >
                        <LogIn className="h-4 w-4" />
                        Login
                      </a>
                      <a
                        href={`https://wa.me/919907300710?text=Hi, I'm interested in getting full access to sample: ${encodeURIComponent(sample.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition"
                      >
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 py-3 px-4 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-teal-500"></span>
            <span>Preview ({previewPages} page{previewPages > 1 ? 's' : ''})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-amber-400/60 blur-[2px]"></span>
            <span>Locked ({lockedPages} page{lockedPages > 1 ? 's' : ''})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
