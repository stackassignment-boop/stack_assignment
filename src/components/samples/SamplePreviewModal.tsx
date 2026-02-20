'use client';

import { useState, useEffect } from 'react';
import { X, Lock, MessageCircle, LogIn, FileText, Loader2 } from 'lucide-react';

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

export default function SamplePreviewModal({ sample, isOpen, onClose }: SamplePreviewModalProps) {
  const [loading, setLoading] = useState(false);
  const [previewContent, setPreviewContent] = useState<string>('');
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
        setPreviewContent(data.preview || 'No preview content available');
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

  const previewPages = Math.max(1, Math.ceil((sample.pages || 3) / 3));
  const lockedPages = (sample.pages || 3) - previewPages;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onKeyDown={handleKeyDown}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
          <div className="flex-1 pr-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {sample.title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {sample.pages || 0} pages total • Preview shows 1/3rd of content
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
            <div className="relative h-full">
              {/* Visible 1/3rd Content */}
              <div className="h-1/3 overflow-y-auto p-6 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
                <div className="prose dark:prose-invert max-w-none text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {previewContent || 'No preview content available. Please contact admin for full access.'}
                </div>
              </div>

              {/* Blurred 2/3rd Content */}
              <div className="h-2/3 relative bg-gray-100 dark:bg-slate-800">
                {/* Blurred overlay effect */}
                <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-b from-gray-200/80 via-gray-300/80 to-gray-400/80 dark:from-slate-700/80 dark:via-slate-600/80 dark:to-slate-500/80">
                  {/* Mock content lines */}
                  <div className="p-6 space-y-3">
                    {[...Array(8)].map((_, i) => (
                      <div 
                        key={i} 
                        className="h-4 bg-gray-300/50 dark:bg-slate-600/50 rounded"
                        style={{ width: `${60 + Math.random() * 35}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Lock overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 mx-4 text-center">
                    <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lock className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Content Locked
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Only 1/3rd of this sample is available for preview. 
                      Contact admin to get full access.
                    </p>
                    <div className="flex gap-3">
                      <a
                        href="/?view=student-login"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition"
                      >
                        <LogIn className="h-4 w-4" />
                        Login
                      </a>
                      <a
                        href={`https://wa.me/919907300710?text=Hi, I'm interested in getting full access to sample: ${encodeURIComponent(sample.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition"
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
            <span className="w-4 h-4 rounded bg-teal-600"></span>
            <span>Preview (1/3rd)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-amber-500/50"></span>
            <span>Locked (2/3rd)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
