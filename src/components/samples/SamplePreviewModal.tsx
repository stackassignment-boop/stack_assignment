'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { X, ChevronLeft, ChevronRight, Lock, MessageCircle, LogIn } from 'lucide-react';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

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
  // Reset state when sample changes
  const resetKey = sample.id;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [numPages, setNumPages] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState(600);

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
    setCurrentPage((prev) => Math.min(prev + 1, totalPages || 1));
  }, [totalPages]);

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

  // Handle container resize
  useEffect(() => {
    const handleResize = () => {
      const width = Math.min(window.innerWidth - 64, 700);
      setContainerWidth(width);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check if current page is blurred (beyond preview limit)
  const isBlurredPage = currentPage > previewPages;

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
              Page {currentPage} of {totalPages || '?'}
              {currentPage <= previewPages ? (
                <span className="ml-2 text-teal-600 dark:text-teal-400">(Preview)</span>
              ) : (
                <span className="ml-2 text-amber-600 dark:text-amber-400">(Locked)</span>
              )}
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
                width={containerWidth}
                className={`shadow-lg transition-all duration-300 ${
                  isBlurredPage ? 'blur-lg' : ''
                }`}
                renderTextLayer={!isBlurredPage}
                renderAnnotationLayer={!isBlurredPage}
              />

              {/* Watermark overlay for preview pages */}
              {!isBlurredPage && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="text-gray-300 dark:text-gray-600 text-4xl font-bold opacity-20 rotate-[-45deg] select-none whitespace-nowrap">
                    PREVIEW
                  </div>
                </div>
              )}

              {/* Locked overlay for blurred pages */}
              {isBlurredPage && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-[2px]">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 text-center max-w-xs mx-4">
                    <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lock className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Content Locked
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      This page is part of the full document. Login or contact admin to access all {totalPages} pages.
                    </p>
                    <div className="flex flex-col gap-2">
                      <a
                        href="/?view=admin"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition"
                      >
                        <LogIn className="h-4 w-4" />
                        Login to Access
                      </a>
                      <a
                        href={`https://wa.me/919876543210?text=Hi, I'm interested in getting full access to sample: ${encodeURIComponent(sample.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Contact Admin
                      </a>
                    </div>
                  </div>
                </div>
              )}
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

          {/* Page indicators */}
          <div className="flex items-center gap-1 max-w-md overflow-x-auto px-2">
            {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`min-w-[32px] h-8 rounded-lg text-sm font-medium transition ${
                  currentPage === page
                    ? page <= previewPages
                      ? 'bg-teal-600 text-white'
                      : 'bg-amber-500 text-white'
                    : page <= previewPages
                      ? 'bg-white dark:bg-slate-700 shadow hover:bg-gray-50 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300'
                      : 'bg-gray-200 dark:bg-slate-600 text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-slate-500'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPage >= (totalPages || 1)}
            className="p-2 rounded-lg bg-white dark:bg-slate-700 shadow hover:bg-gray-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 py-2 px-4 bg-gray-100 dark:bg-slate-800 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-teal-600"></span>
            <span>Preview Pages ({previewPages})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-amber-500"></span>
            <span>Locked Pages ({(totalPages || 0) - previewPages})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
