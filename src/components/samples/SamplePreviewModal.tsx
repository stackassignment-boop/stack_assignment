'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { X, ChevronLeft, ChevronRight, Download, Lock, MessageCircle, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

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
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Calculate preview pages (1/3 of total, rounded up, minimum 1)
  const previewPages = useMemo(() => 
    Math.max(1, Math.ceil((sample.pages || numPages || 3) / 3)),
    [sample.pages, numPages]
  );
  
  const totalPages = sample.pages || numPages;

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const goToPrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, previewPages));
  }, [previewPages]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') goToPrevPage();
    if (e.key === 'ArrowRight') goToNextPage();
  }, [onClose, goToPrevPage, goToNextPage]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
          <div className="flex-1 pr-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {sample.title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Preview: Page {currentPage} of {previewPages} (showing 1/3rd)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-auto p-4 bg-gray-100 dark:bg-slate-800 flex flex-col items-center">
          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600"></div>
            </div>
          )}

          <Document
            file={`/api/samples/${sample.slug}/download`}
            onLoadSuccess={onDocumentLoadSuccess}
            loading=""
            error={
              <div className="text-center py-8 text-red-500">
                Failed to load PDF. Please try again.
              </div>
            }
          >
            <div className="relative">
              <Page
                pageNumber={currentPage}
                scale={scale}
                className="shadow-lg"
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />

              {/* Watermark overlay */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="text-gray-300 dark:text-gray-600 text-6xl font-bold opacity-20 rotate-[-45deg] select-none">
                  PREVIEW
                </div>
              </div>
            </div>
          </Document>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 p-4 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
          <button
            onClick={goToPrevPage}
            disabled={currentPage <= 1}
            className="p-2 rounded-lg bg-white dark:bg-slate-700 shadow hover:bg-gray-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: previewPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
                  currentPage === page
                    ? 'bg-teal-600 text-white'
                    : 'bg-white dark:bg-slate-700 shadow hover:bg-gray-50 dark:hover:bg-slate-600'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPage >= previewPages}
            className="p-2 rounded-lg bg-white dark:bg-slate-700 shadow hover:bg-gray-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Locked Content Message */}
        <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-t border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
              <Lock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Want Full Access?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                This is a preview showing {previewPages} of {totalPages || 'all'} pages. 
                Get complete access to the full document.
              </p>
              <div className="flex flex-wrap gap-3 mt-3">
                <a
                  href="/?view=admin"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition"
                >
                  <LogIn className="h-4 w-4" />
                  Login to Access
                </a>
                <a
                  href="https://wa.me/919876543210?text=Hi, I'm interested in getting full access to sample: ${encodeURIComponent(sample.title)}"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition"
                >
                  <MessageCircle className="h-4 w-4" />
                  Contact Admin
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
