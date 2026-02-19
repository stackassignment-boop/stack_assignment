'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { X, Lock, MessageCircle, LogIn } from 'lucide-react';

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
  const [totalPages, setTotalPages] = useState(sample.pages || 0);
  const [loading, setLoading] = useState(true);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pageImages, setPageImages] = useState<string[]>([]);
  const [containerWidth, setContainerWidth] = useState(600);
  const [visiblePages, setVisiblePages] = useState<Set<number>>(new Set());
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate preview pages (1/3 of total, rounded up, minimum 1)
  const previewPages = Math.max(1, Math.ceil((sample.pages || totalPages || 3) / 3));

  // Load PDF document
  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;

    const loadPdf = async () => {
      try {
        setLoading(true);
        setPageImages([]);
        setVisiblePages(new Set());
        
        const pdfjsLib = await import('pdfjs-dist');
        
        // Set worker
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/legacy/build/pdf.worker.min.mjs`;
        
        const loadingTask = pdfjsLib.getDocument(`/api/samples/${sample.slug}/download`);
        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
        setTotalPages(pdf.numPages);
        setLoading(false);
      } catch (error) {
        console.error('Error loading PDF:', error);
        setLoading(false);
      }
    };

    loadPdf();
  }, [isOpen, sample.slug]);

  // Render all pages
  useEffect(() => {
    if (!pdfDoc || typeof window === 'undefined') return;

    const renderAllPages = async () => {
      const images: string[] = [];
      
      for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
        try {
          const page = await pdfDoc.getPage(pageNum);
          const viewport = page.getViewport({ scale: 1 });
          
          // Calculate scale to fit container
          const scale = containerWidth / viewport.width;
          const scaledViewport = page.getViewport({ scale });

          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = scaledViewport.height;
          canvas.width = scaledViewport.width;

          await page.render({
            canvasContext: context,
            viewport: scaledViewport,
          }).promise;

          images.push(canvas.toDataURL());
        } catch (error) {
          console.error(`Error rendering page ${pageNum}:`, error);
          images.push('');
        }
      }
      
      setPageImages(images);
    };

    renderAllPages();
  }, [pdfDoc, containerWidth]);

  // Handle container resize
  useEffect(() => {
    const handleResize = () => {
      const width = Math.min(window.innerWidth - 48, 700);
      setContainerWidth(width);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Intersection observer for lazy loading visibility
  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const pageNum = parseInt(entry.target.getAttribute('data-page') || '0');
          if (entry.isIntersecting) {
            setVisiblePages((prev) => new Set(prev).add(pageNum));
          }
        });
      },
      { root: containerRef.current, threshold: 0.1 }
    );

    pageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [pageImages]);

  // Handle keyboard
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

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

  if (!isOpen || typeof window === 'undefined') return null;

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
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700 shrink-0">
          <div className="flex-1 pr-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {sample.title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {totalPages} pages total • {previewPages} preview pages available
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* PDF Viewer - Scrollable */}
        <div 
          ref={containerRef}
          className="flex-1 overflow-y-auto p-4 bg-gray-100 dark:bg-slate-800"
        >
          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600"></div>
            </div>
          )}
          
          {!loading && pageImages.length > 0 && (
            <div className="flex flex-col items-center gap-4">
              {pageImages.map((imageSrc, index) => {
                const pageNum = index + 1;
                const isBlurredPage = pageNum > previewPages;
                const isVisible = visiblePages.has(pageNum);
                
                return (
                  <div
                    key={pageNum}
                    ref={(el) => { pageRefs.current[index] = el; }}
                    data-page={pageNum}
                    className="relative shrink-0"
                  >
                    {/* Page number indicator */}
                    <div className="absolute -left-8 top-2 text-xs text-gray-400 font-medium">
                      {pageNum}
                    </div>
                    
                    {isVisible && imageSrc && (
                      <>
                        <img
                          src={imageSrc}
                          alt={`Page ${pageNum}`}
                          className={`shadow-lg transition-all duration-300 ${
                            isBlurredPage ? 'blur-xl' : ''
                          }`}
                          style={{ width: containerWidth }}
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
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/30 dark:bg-slate-900/30 backdrop-blur-[2px]">
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-4 text-center max-w-[280px]">
                              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Lock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                Page {pageNum} locked
                              </p>
                              <div className="flex flex-col gap-2">
                                <a
                                  href="/?view=admin"
                                  className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-medium transition"
                                >
                                  <LogIn className="h-3 w-3" />
                                  Login
                                </a>
                                <a
                                  href={`https://wa.me/919876543210?text=Hi, I'm interested in getting full access to sample: ${encodeURIComponent(sample.title)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition"
                                >
                                  <MessageCircle className="h-3 w-3" />
                                  Contact Admin
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                    
                    {/* Placeholder while loading */}
                    {isVisible && !imageSrc && (
                      <div 
                        className="bg-gray-200 dark:bg-slate-700 animate-pulse rounded"
                        style={{ width: containerWidth, height: 400 }}
                      />
                    )}
                    
                    {/* Placeholder before intersection */}
                    {!isVisible && (
                      <div 
                        className="bg-gray-200 dark:bg-slate-700 rounded"
                        style={{ width: containerWidth, height: 400 }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 py-3 px-4 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 text-xs text-gray-600 dark:text-gray-400 shrink-0">
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
