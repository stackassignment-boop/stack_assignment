'use client';

import { useState, useEffect } from 'react';
import { X, Lock, MessageCircle, LogIn, Loader2, Shield, FileText } from 'lucide-react';

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
  totalLength: number;
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

  // Copyright protection - disable right-click and shortcuts
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setShowCopyright(true);
      setTimeout(() => setShowCopyright(false), 2000);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'p' || e.key === 's')) {
        e.preventDefault();
        setShowCopyright(true);
        setTimeout(() => setShowCopyright(false), 2000);
      }
    };

    if (isOpen) {
      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
    }

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
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

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center" 
      onKeyDown={handleKeyDown}
      style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      {/* Copyright Warning Toast */}
      {showCopyright && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[60] bg-red-600 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-2">
          <Shield className="h-5 w-5" />
          <span className="font-medium">© Content Protected</span>
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
            © Copyright Protected - Preview Only - Unauthorized distribution is prohibited
          </span>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-100 dark:bg-slate-800">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-64 text-center p-6">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <div className="p-4">
              {/* Preview Pages Container */}
              <div className="max-w-3xl mx-auto space-y-4">
                {/* Meta Info Card */}
                {previewData && (
                  <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm mb-4">
                    <div className="flex flex-wrap gap-2">
                      {previewData.subject && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full text-sm font-medium">
                          {previewData.subject}
                        </span>
                      )}
                      {previewData.academicLevel && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                          {academicLevels[previewData.academicLevel] || previewData.academicLevel}
                        </span>
                      )}
                      {previewData.paperType && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                          {previewData.paperType.replace('_', ' ')}
                        </span>
                      )}
                      {previewData.fileName && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm">
                          <FileText className="h-3 w-3" />
                          {previewData.fileName}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Visible Preview Section */}
                <div className="relative bg-white dark:bg-slate-900 rounded-lg shadow-lg overflow-hidden">
                  {/* Watermark */}
                  <div 
                    className="absolute inset-0 pointer-events-none z-10 opacity-5"
                    style={{
                      backgroundImage: `repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 50px,
                        rgba(20, 184, 166, 0.5) 50px,
                        rgba(20, 184, 166, 0.5) 100px
                      )`
                    }}
                  />

                  {/* Content */}
                  <div className="relative p-6 md:p-8">
                    {/* Page Header */}
                    <div className="border-b border-gray-200 dark:border-slate-700 pb-3 mb-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-gray-900 dark:text-white">{previewData?.title || sample.title}</h3>
                        <span className="text-xs text-gray-400 bg-teal-100 dark:bg-teal-900/30 px-2 py-1 rounded">
                          Preview: Page 1 of {totalPages}
                        </span>
                      </div>
                    </div>

                    {/* Preview Content */}
                    <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap min-h-[200px]">
                      {previewData?.preview || 'No preview content available.'}
                    </div>

                    {/* Preview Footer */}
                    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-slate-700 flex justify-between items-center">
                      <span className="text-xs text-teal-600 dark:text-teal-400 font-medium">
                        ✓ Preview: First {previewPages} of {totalPages} pages visible
                      </span>
                      <span className="text-[10px] text-gray-400">
                        © Stack Assignment
                      </span>
                    </div>
                  </div>

                  {/* Preview Badge */}
                  <div className="absolute top-2 right-2 bg-teal-500 text-white text-[10px] px-2 py-1 rounded font-medium z-20">
                    PREVIEW
                  </div>
                </div>

                {/* Locked Pages Section */}
                <div className="relative bg-gray-200 dark:bg-slate-700 rounded-lg shadow-lg overflow-hidden" style={{ minHeight: '300px' }}>
                  {/* Blurred content simulation */}
                  <div className="absolute inset-0 backdrop-blur-[3px] bg-gradient-to-b from-gray-300/60 to-gray-400/60 dark:from-slate-600/60 dark:to-slate-500/60">
                    <div className="p-6 space-y-3">
                      {[...Array(10)].map((_, i) => (
                        <div 
                          key={i} 
                          className="h-3 bg-gray-400/50 dark:bg-slate-500/50 rounded animate-pulse"
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
                        This document has {lockedPages} more pages. 
                        <br />
                        Contact admin to unlock full access.
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
