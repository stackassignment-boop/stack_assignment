'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import RequirementPreviewModal from '@/components/requirements/RequirementPreviewModal';

interface RequirementDetailActionsProps {
  requirement: {
    id: string;
    title: string;
    description: string | null;
    category: string | null;
    fileName: string;
    filePath: string;
    fileType: string;
  };
}

export default function RequirementDetailActions({ requirement }: RequirementDetailActionsProps) {
  const router = useRouter();
  const [showPreview, setShowPreview] = useState(false);

  const handlePreview = () => {
    const previewable =
      requirement.fileType === 'application/pdf' ||
      requirement.fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      requirement.fileType === 'application/msword';

    if (previewable) {
      setShowPreview(true);
    } else {
      toast.error('Only PDF and Word (.docx) files can be previewed.');
    }
  };

  const handleGetHelp = () => {
    const params = new URLSearchParams();
    params.set('subject', requirement.title);
    params.set(
      'description',
      requirement.description || `Help with: ${requirement.title}\n\nRequirement file: ${requirement.fileName}`
    );
    if (requirement.category) {
      params.set('category', requirement.category);
    }
    router.push(`/order?${params.toString()}`);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handlePreview}
          disabled={
            requirement.fileType !== 'application/pdf' &&
            requirement.fileType !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' &&
            requirement.fileType !== 'application/msword'
          }
          className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-gray-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 rounded-xl px-6 py-3 font-semibold text-gray-700 dark:text-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Eye className="w-4 h-4" />
          Preview File
        </button>
        <button
          onClick={handleGetHelp}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl px-6 py-3 font-semibold transition"
        >
          Get Help With This
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {showPreview && (
        <RequirementPreviewModal
          requirement={requirement}
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
}
