'use client';

import { useState, useEffect } from 'react';
import { X, Lock, MessageCircle, LogIn, FileText, Shield } from 'lucide-react';

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
  const [showCopyright, setShowCopyright] = useState(false);

  // Copyright protection
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
    }

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.userSelect = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const totalPages = sample.pages || 3;
  const previewPages = Math.max(1, Math.ceil(totalPages / 3));
  const lockedPages = totalPages - previewPages;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center" 
      onKeyDown={handleKeyDown}
      style={{ userSelect: 'none' }}
    >
      {/* Copyright Warning */}
      {showCopyright && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[60] bg-red-600 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-pulse">
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
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col m-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
          <div className="flex-1 pr-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {sample.title}
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

        {/* Copyright Notice */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800 px-4 py-2 flex items-center gap-2">
          <Shield className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <span className="text-xs text-amber-700 dark:text-amber-300">
            © Copyright Protected - Unauthorized copying or distribution is prohibited
          </span>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-4">
            {/* Preview Section (1/3 Visible) */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-teal-200 dark:border-teal-800 overflow-hidden">
              <div className="bg-teal-50 dark:bg-teal-900/30 px-4 py-2 border-b border-teal-200 dark:border-teal-800">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
                    📄 Preview Available ({previewPages} page{previewPages > 1 ? 's' : ''})
                  </span>
                  <span className="text-xs bg-teal-600 text-white px-2 py-0.5 rounded">
                    UNLOCKED
                  </span>
                </div>
              </div>
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                  {sample.fileName || 'Sample Document'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  First {previewPages} of {totalPages} pages available for preview
                </p>
              </div>
            </div>

            {/* Locked Section (2/3 Blurred) */}
            <div className="relative rounded-xl overflow-hidden" style={{ minHeight: '200px' }}>
              {/* Blurred Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-300/80 to-gray-400/80 dark:from-slate-600/80 dark:to-slate-700/80 backdrop-blur-sm">
                {/* Fake content lines */}
                <div className="p-6 space-y-3">
                  {[...Array(6)].map((_, i) => (
                    <div 
                      key={i} 
                      className="h-3 bg-gray-400/50 dark:bg-slate-500/50 rounded"
                      style={{ width: `${50 + Math.random() * 45}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Lock Overlay */}
              <div className="relative flex flex-col items-center justify-center py-12 px-6 text-center">
                <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-4">
                  <Lock className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {lockedPages} Pages Locked
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-xs">
                  This document has {lockedPages} more pages. Contact admin to get full access.
                </p>
                <div className="flex gap-3">
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

        {/* Footer Legend */}
        <div className="flex items-center justify-center gap-6 py-3 px-4 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-teal-600"></span>
            <span>Preview ({previewPages})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-amber-500"></span>
            <span>Locked ({lockedPages})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
