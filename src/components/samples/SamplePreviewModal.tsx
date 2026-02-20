'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, Lock, MessageCircle, LogIn, Loader2, BookOpen, GraduationCap, FileCheck, Shield, AlertTriangle } from 'lucide-react';

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
  const [showCopyright, setShowCopyright] = useState(false);

  useEffect(() => {
    if (isOpen && sample.slug) {
      fetchPreview();
    }
  }, [isOpen, sample.slug]);

  // Copyright protection - disable right-click
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setShowCopyright(true);
      setTimeout(() => setShowCopyright(false), 2000);
    };

    if (isOpen) {
      document.addEventListener('contextmenu', handleContextMenu);
      // Disable text selection
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
    }

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
    };
  }, [isOpen]);

  // Disable keyboard shortcuts for copying
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && (e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'p' || e.key === 's')) {
        e.preventDefault();
        setShowCopyright(true);
        setTimeout(() => setShowCopyright(false), 2000);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

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

  // Split content into pages for display
  const contentPages: string[] = [];
  if (previewData?.preview) {
    const content = previewData.preview;
    const charsPerPage = 2000; // Approximate characters per page
    for (let i = 0; i < previewPages; i++) {
      const start = i * charsPerPage;
      const end = Math.min(start + charsPerPage, content.length);
      if (start < content.length) {
        contentPages.push(content.substring(start, end));
      }
    }
    if (contentPages.length === 0) {
      contentPages.push(content);
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center" 
      onKeyDown={handleKeyDown}
      style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      {/* Copyright Warning Toast */}
      {showCopyright && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[60] bg-red-600 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-pulse">
          <Shield className="h-5 w-5" />
          <span className="font-medium">© Content Protected - Unauthorized copying is prohibited</span>
        </div>
      )}

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col m-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="flex-1 pr-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {previewData?.title || sample.title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {totalPages} pages total • Preview: {previewPages} page(s) unlocked, {lockedPages} page(s) locked
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Copyright Notice Bar */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800 px-4 py-2 flex items-center gap-2">
          <Shield className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <span className="text-xs text-amber-700 dark:text-amber-300">
            © Copyright Protected - This content is for preview only. Unauthorized distribution is prohibited.
          </span>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-100 dark:bg-slate-800 p-4">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-64 text-center p-6">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Preview Pages - Displayed as Images */}
              {contentPages.map((pageContent, index) => (
                <div key={index} className="relative">
                  {/* Page Image Container */}
                  <div 
                    className="bg-white dark:bg-slate-900 rounded-lg shadow-lg overflow-hidden mx-auto"
                    style={{ 
                      maxWidth: '700px',
                      aspectRatio: '8.5/11',
                      position: 'relative'
                    }}
                  >
                    {/* Watermark */}
                    <div 
                      className="absolute inset-0 pointer-events-none z-10"
                      style={{
                        backgroundImage: `repeating-linear-gradient(
                          45deg,
                          transparent,
                          transparent 100px,
                          rgba(20, 184, 166, 0.03) 100px,
                          rgba(20, 184, 166, 0.03) 200px
                        )`
                      }}
                    />
                    <div 
                      className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                      style={{
                        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(255,255,255,0.1) 100%)'
                      }}
                    >
                      <div className="text-6xl font-bold text-gray-200/30 dark:text-slate-700/30 rotate-[-30deg] select-none">
                        PREVIEW
                      </div>
                    </div>

                    {/* Page Content */}
                    <div className="p-8 h-full overflow-hidden relative z-0">
                      {/* Page Header */}
                      <div className="border-b border-gray-200 dark:border-slate-700 pb-4 mb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white">{previewData?.title || sample.title}</h3>
                            <div className="flex gap-2 mt-1">
                              {previewData?.subject && (
                                <span className="text-xs text-gray-500">{previewData.subject}</span>
                              )}
                              {previewData?.academicLevel && (
                                <span className="text-xs text-gray-500">• {academicLevels[previewData.academicLevel] || previewData.academicLevel}</span>
                              )}
                            </div>
                          </div>
                          <span className="text-xs text-gray-400">Page {index + 1} of {totalPages}</span>
                        </div>
                      </div>

                      {/* Content Area - Styled like a document */}
                      <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 text-xs leading-relaxed whitespace-pre-wrap overflow-hidden">
                        {pageContent}
                      </div>

                      {/* Copyright footer on each page */}
                      <div className="absolute bottom-4 left-8 right-8 border-t border-gray-200 dark:border-slate-700 pt-2">
                        <p className="text-[10px] text-gray-400 text-center">
                          © Stack Assignment - Preview Only - Not for Distribution
                        </p>
                      </div>
                    </div>

                    {/* Preview Badge */}
                    <div className="absolute top-2 right-2 bg-teal-500 text-white text-[10px] px-2 py-1 rounded font-medium z-20">
                      PREVIEW
                    </div>
                  </div>
                </div>
              ))}

              {/* Locked Pages Indicator */}
              <div className="relative">
                <div 
                  className="bg-gray-200 dark:bg-slate-700 rounded-lg shadow-lg overflow-hidden mx-auto"
                  style={{ 
                    maxWidth: '700px',
                    aspectRatio: '8.5/11'
                  }}
                >
                  {/* Blurred locked content */}
                  <div className="h-full flex flex-col items-center justify-center relative overflow-hidden">
                    {/* Blurred background lines */}
                    <div className="absolute inset-0 backdrop-blur-[2px] bg-gradient-to-b from-gray-300/50 to-gray-400/50 dark:from-slate-600/50 dark:to-slate-500/50">
                      <div className="p-8 space-y-3">
                        {[...Array(12)].map((_, i) => (
                          <div 
                            key={i} 
                            className="h-3 bg-gray-400/40 dark:bg-slate-500/40 rounded"
                            style={{ width: `${50 + Math.random() * 45}%` }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Lock overlay */}
                    <div className="relative z-10 text-center p-6">
                      <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="h-10 w-10 text-amber-600 dark:text-amber-400" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {lockedPages} Pages Locked
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 max-w-xs mx-auto">
                        This document has {lockedPages} more pages. Contact admin to unlock full access.
                      </p>
                      <div className="flex gap-3 justify-center">
                        <a
                          href="/?view=student-login"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium transition"
                        >
                          <LogIn className="h-4 w-4" />
                          Login
                        </a>
                        <a
                          href={`https://wa.me/919907300710?text=Hi, I'm interested in getting full access to sample: ${encodeURIComponent(sample.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition"
                        >
                          <MessageCircle className="h-4 w-4" />
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Legend */}
        <div className="flex items-center justify-between py-3 px-4 border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-teal-500"></span>
              <span>Preview ({previewPages})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-amber-400"></span>
              <span>Locked ({lockedPages})</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Shield className="h-3 w-3" />
            <span>© Stack Assignment</span>
          </div>
        </div>
      </div>
    </div>
  );
}
