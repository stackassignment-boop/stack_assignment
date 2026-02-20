'use client';

import { X, Lock, MessageCircle, LogIn, Download, FileText } from 'lucide-react';

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
  if (!isOpen) return null;

  const previewPages = Math.max(1, Math.ceil((sample.pages || 3) / 3));

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
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
          <div className="flex-1 pr-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {sample.title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {sample.pages || 0} pages total • {previewPages} preview pages available
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 bg-gray-50 dark:bg-slate-800">
          <div className="flex flex-col items-center justify-center text-center py-8">
            {/* File Icon */}
            <div className="w-20 h-20 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-10 w-10 text-teal-600 dark:text-teal-400" />
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
              {sample.fileName || 'Sample Document'}
            </p>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Preview available for first {previewPages} page(s)
            </p>

            {/* Locked Content Notice */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6 w-full">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span className="font-medium text-amber-700 dark:text-amber-300">Preview Access</span>
              </div>
              <p className="text-sm text-amber-600 dark:text-amber-400">
                Download the full sample or contact admin for complete access.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 w-full">
              <a
                href={`/api/samples/${sample.slug}/download`}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium transition"
              >
                <Download className="h-5 w-5" />
                Download Sample
              </a>
              
              <div className="flex gap-3">
                <a
                  href="/?view=admin"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </a>
                <a
                  href={`https://wa.me/919907300710?text=Hi, I'm interested in getting full access to sample: ${encodeURIComponent(sample.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition"
                >
                  <MessageCircle className="h-4 w-4" />
                  Contact Admin
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 py-3 px-4 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-teal-600"></span>
            <span>Preview Pages ({previewPages})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-amber-500"></span>
            <span>Locked Pages ({(sample.pages || 0) - previewPages})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
