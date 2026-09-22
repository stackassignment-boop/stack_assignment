'use client';

import { useState } from 'react';
import { Eye, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import RequirementPreviewModal from '@/components/requirements/RequirementPreviewModal';
import { useRouteNavigate } from '@/lib/useRouteNavigate';

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
  const navigate = useRouteNavigate();
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

  // Goes through useRouteNavigate rather than router.push. The order form reads
  // these values out of `window.location.search` in a mount effect, and Next
  // commits the new URL in an effect on AppRouter, which is an ancestor of the
  // page — React runs child effects first, so a soft push would have the form
  // read the URL of *this* page and arrive blank. useRouteNavigate does a full
  // load whenever it is carrying data, which makes the search string
  // authoritative before any component renders.
  const handleGetHelp = () => {
    navigate('order', {
      subject: requirement.title,
      description:
        requirement.description ||
        `Help with: ${requirement.title}\n\nRequirement file: ${requirement.fileName}`,
      ...(requirement.category ? { category: requirement.category } : {}),
    });
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
