'use client';

import { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  FileSearch,
  Loader2,
  Upload,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  SIMILARITY_STATUS_DESCRIPTIONS,
  SIMILARITY_STATUS_LABELS,
  type SimilarityStatus,
} from '@/lib/similarity';

const ACCEPTED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
];
const ACCEPT_ATTR = '.pdf,.doc,.docx,.txt';
const MAX_BYTES = 10 * 1024 * 1024;

interface SimilarityCheck {
  id: string;
  referenceNumber: string;
  title: string;
  subject: string | null;
  wordCount: number | null;
  notes: string | null;
  fileName: string;
  fileSize: number;
  status: string;
  reportFileName: string | null;
  reportFilePath: string | null;
  similarityScore: number | null;
  adminNotes: string | null;
  reviewedAt: string | null;
  createdAt: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

const STATUS_STYLES: Record<string, { className: string; Icon: typeof Clock }> = {
  pending: { className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200', Icon: Clock },
  in_review: { className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200', Icon: Loader2 },
  complete: { className: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200', Icon: CheckCircle },
  rejected: { className: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200', Icon: XCircle },
};

function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.pending;
  const Icon = style.Icon;
  const label = SIMILARITY_STATUS_LABELS[status as SimilarityStatus] ?? status;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${style.className}`}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </span>
  );
}

export default function SimilarityCheckPanel() {
  const [checks, setChecks] = useState<SimilarityCheck[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [wordCount, setWordCount] = useState('');
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Bumping this re-runs the loader below. Keeping the fetch inside the effect
  // (rather than in a callback the effect calls) means every setState happens
  // after an await, and lets the cleanup flag drop responses that arrive after
  // the component has gone away.
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const loadChecks = async () => {
      try {
        const res = await fetch('/api/student/similarity-checks');
        const data = await res.json();
        if (!cancelled) {
          setChecks(Array.isArray(data.checks) ? data.checks : []);
        }
      } catch {
        // The list is non-critical; the form still works if it fails to load.
        if (!cancelled) setChecks([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadChecks();

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null;
    setError(null);

    if (!selected) {
      setFile(null);
      return;
    }

    // Mirror the server's rules so the student finds out before the upload.
    if (!ACCEPTED_TYPES.includes(selected.type)) {
      setError('Please choose a PDF, DOC, DOCX or TXT file.');
      setFile(null);
      event.target.value = '';
      return;
    }

    if (selected.size > MAX_BYTES) {
      setError('That file is larger than 10MB. Please upload a smaller version.');
      setFile(null);
      event.target.value = '';
      return;
    }

    setFile(selected);
  };

  const resetForm = () => {
    setTitle('');
    setSubject('');
    setWordCount('');
    setNotes('');
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (title.trim().length < 3) {
      setError('Please give your document a title of at least 3 characters.');
      return;
    }

    if (!file) {
      setError('Please choose the document you would like checked.');
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title.trim());
      formData.append('subject', subject.trim());
      formData.append('notes', notes.trim());
      formData.append('wordCount', wordCount.trim());

      const res = await fetch('/api/student/similarity-checks', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setSuccess(data.message || 'Your document has been submitted.');
      resetForm();
      setRefreshKey((key) => key + 1);
    } catch {
      setError('We could not reach the server. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-start gap-3">
          <FileSearch className="h-6 w-6 text-primary shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Similarity report
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Upload a draft of your own work and we will run it through our institutional
              similarity checker, then send the report back to you here. Use it to find
              quotes you forgot to reference and paraphrasing that stayed too close to the
              source — before you submit to your university.
            </p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Upload only work you wrote yourself. We check drafts; we do not write or
              rewrite assessable work.
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4"
      >
        <h3 className="font-semibold text-slate-900 dark:text-white">Submit a draft</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="sc-title" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
              Document title <span className="text-red-500">*</span>
            </label>
            <input
              id="sc-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              minLength={3}
              placeholder="e.g. BUSN1001 Reflective Essay"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="sc-subject" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
              Unit or subject
            </label>
            <input
              id="sc-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Management Accounting"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="sc-words" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
              Word count
            </label>
            <input
              id="sc-words"
              type="number"
              min={1}
              value={wordCount}
              onChange={(e) => setWordCount(e.target.value)}
              placeholder="e.g. 2000"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="sc-notes" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
              Anything we should know?
            </label>
            <textarea
              id="sc-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="e.g. the appendix is copied from the unit brief, so I expect that part to flag"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="sc-file" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
              Your document <span className="text-red-500">*</span>
            </label>
            <input
              id="sc-file"
              ref={fileInputRef}
              type="file"
              accept={ACCEPT_ATTR}
              onChange={handleFileChange}
              required
              className="block w-full text-sm text-slate-600 dark:text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:opacity-90"
            />
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              PDF, DOC, DOCX or TXT, up to 10MB.
              {file ? ` Selected: ${file.name} (${formatBytes(file.size)})` : ''}
            </p>
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-lg bg-red-50 dark:bg-red-900/30 p-3 text-sm text-red-700 dark:text-red-200"
          >
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div
            role="status"
            className="flex items-start gap-2 rounded-lg bg-green-50 dark:bg-green-900/30 p-3 text-sm text-green-700 dark:text-green-200"
          >
            <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
            <span>{success}</span>
          </div>
        )}

        <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" aria-hidden="true" />
              Uploading…
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" aria-hidden="true" />
              Submit for checking
            </>
          )}
        </Button>
      </form>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Your submissions</h3>

        {loading ? (
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Loading…
          </div>
        ) : checks.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            You have not submitted anything for checking yet.
          </p>
        ) : (
          <ul className="space-y-4">
            {checks.map((check) => (
              <li
                key={check.id}
                className="rounded-lg border border-slate-200 dark:border-slate-700 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-medium text-slate-900 dark:text-white truncate">
                      {check.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {check.referenceNumber} · {check.fileName} ({formatBytes(check.fileSize)}) ·
                      submitted {formatDate(check.createdAt)}
                    </p>
                  </div>
                  <StatusBadge status={check.status} />
                </div>

                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {SIMILARITY_STATUS_DESCRIPTIONS[check.status as SimilarityStatus] ?? ''}
                </p>

                {check.similarityScore !== null && (
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
                    Similarity index:{' '}
                    <span className="font-semibold">{check.similarityScore}%</span>
                  </p>
                )}

                {check.adminNotes && (
                  <p className="mt-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 p-3 text-sm text-slate-700 dark:text-slate-200">
                    {check.adminNotes}
                  </p>
                )}

                {check.reportFilePath && (
                  <a
                    href={check.reportFilePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Download your report
                    {check.reportFileName ? ` (${check.reportFileName})` : ''}
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
