'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, AlertCircle } from 'lucide-react';

interface RequirementPreviewModalProps {
  requirement: {
    id: string;
    title: string;
    fileName: string;
    filePath: string;
    fileType: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export default function RequirementPreviewModal({ requirement, isOpen, onClose }: RequirementPreviewModalProps) {
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pageImages, setPageImages] = useState<string[]>([]);
  const [containerWidth, setContainerWidth] = useState(600);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      const width = Math.min(window.innerWidth - 48, 700);
      setContainerWidth(width);
    }
  }, []);

  // Check if file is a PDF
  const isPdf = requirement.fileType === 'application/pdf';

  // Load PDF document
  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;

    // Check if it's a PDF file
    if (!isPdf) {
      setLoading(false);
      setError(`This file type (${requirement.fileType}) cannot be previewed. Only PDF files are supported for preview.`);
      return;
    }

    const loadPdf = async () => {
      try {
        setLoading(true);
        setError(null);
        setPageImages([]);

        // Dynamically import pdfjs-dist to avoid SSR issues
        const pdfjsLib = await import('pdfjs-dist');

        // Set worker
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/legacy/build/pdf.worker.min.mjs`;
        
        const loadingTask = pdfjsLib.getDocument(requirement.filePath);
        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
        setTotalPages(pdf.numPages);
        setLoading(false);
      } catch (err) {
        console.error('Error loading PDF:', err);
        setError('Failed to load the PDF file. Please try again.');
        setLoading(false);
      }
    };

    loadPdf();
  }, [isOpen, requirement.filePath, isPdf]);

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
              {requirement.title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isPdf ? (
                <>{totalPages} pages • {requirement.fileName}</>
              ) : (
                <>{requirement.fileName} • {requirement.fileType}</>
              )}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition"
            aria-label="Close preview"
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
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
              <span className="ml-4 text-gray-600 dark:text-gray-400">Loading preview...</span>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-md">
                <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Preview Not Available
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {error}
                </p>
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 text-left">
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-2">
                    To fix this:
                  </p>
                  <ol className="text-sm text-amber-700 dark:text-amber-300 list-decimal list-inside space-y-1">
                    <li>Delete this file from the admin panel</li>
                    <li>Upload a PDF version of the same content</li>
                    <li>The PDF will be fully previewable</li>
                  </ol>
                </div>
              </div>
            </div>
          )}
          
          {!loading && !error && pageImages.length > 0 && (
            <div className="flex flex-col items-center gap-4">
              {pageImages.map((imageSrc, index) => {
                const pageNum = index + 1;
                
                return (
                  <div key={pageNum} className="relative shrink-0">
                    {/* Page number indicator */}
                    <div className="absolute -left-8 top-2 text-xs text-gray-400 font-medium">
                      {pageNum}
                    </div>
                    
                    {imageSrc && (
                      <img
                        src={imageSrc}
                        alt={`Page ${pageNum}`}
                        className="shadow-lg select-none"
                        style={{ width: containerWidth }}
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                      />
                    )}
                    
                    {/* Placeholder while loading */}
                    {!imageSrc && (
                      <div 
                        className="bg-gray-200 dark:bg-slate-700 animate-pulse rounded"
                        style={{ width: containerWidth, height: 400 }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center py-3 px-4 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 text-xs text-gray-600 dark:text-gray-400 shrink-0">
          {error ? (
            <span>Preview not available for this file type</span>
          ) : (
            <span>Full preview • All {totalPages} pages visible</span>
          )}
        </div>
      </div>
    </div>
  );
}
