'use client';

import { useEffect, useState } from 'react';
import {
  AlertCircle,
  CheckCircle,
  Download,
  ExternalLink,
  Loader2,
  RefreshCw,
  Upload,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  SIMILARITY_STATUSES,
  SIMILARITY_STATUS_LABELS,
  type SimilarityStatus,
} from '@/lib/similarity';

interface AdminSimilarityCheck {
  id: string;
  referenceNumber: string;
  title: string;
  subject: string | null;
  wordCount: number | null;
  notes: string | null;
  fileName: string;
  fileSize: number;
  filePath: string;
  status: string;
  reportFileName: string | null;
  reportFilePath: string | null;
  similarityScore: number | null;
  adminNotes: string | null;
  reviewedAt: string | null;
  createdAt: string;
  customer: { id: string; name: string | null; email: string };
}

const BADGE_VARIANTS: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  pending: 'secondary',
  in_review: 'outline',
  complete: 'default',
  rejected: 'destructive',
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDateTime(value: string): string {
  return new Date(value).toLocaleString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** One queue row, with its own inline form for returning the report. */
function CheckRow({
  check,
  onUpdated,
}: {
  check: AdminSimilarityCheck;
  onUpdated: () => void;
}) {
  const [score, setScore] = useState(
    check.similarityScore !== null ? String(check.similarityScore) : ''
  );
  const [status, setStatus] = useState(check.status);
  const [adminNotes, setAdminNotes] = useState(check.adminNotes ?? '');
  const [reportFile, setReportFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setError(null);
    setSaved(false);
    setSaving(true);

    try {
      const formData = new FormData();
      if (reportFile) formData.append('report', reportFile);
      formData.append('status', status);
      formData.append('similarityScore', score);
      formData.append('adminNotes', adminNotes);

      const res = await fetch(`/api/admin/similarity-checks/${check.id}`, {
        method: 'PATCH',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Update failed');
        return;
      }

      setSaved(true);
      setReportFile(null);
      onUpdated();
    } catch {
      setError('Could not reach the server. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0">
            <CardTitle className="text-base">{check.title}</CardTitle>
            <CardDescription className="mt-1">
              {check.referenceNumber} · {check.customer.name || 'Unnamed'} ({check.customer.email})
              {check.subject ? ` · ${check.subject}` : ''}
              {check.wordCount ? ` · ${check.wordCount} words` : ''}
            </CardDescription>
            <CardDescription>
              Submitted {formatDateTime(check.createdAt)}
              {check.reviewedAt ? ` · last updated ${formatDateTime(check.reviewedAt)}` : ''}
            </CardDescription>
          </div>
          <Badge variant={BADGE_VARIANTS[check.status] ?? 'secondary'}>
            {SIMILARITY_STATUS_LABELS[check.status as SimilarityStatus] ?? check.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {check.notes && (
          <p className="rounded-lg bg-slate-50 dark:bg-slate-900/60 p-3 text-sm">
            <span className="font-medium">Student note:</span> {check.notes}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <a
            href={check.filePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {check.fileName} ({formatBytes(check.fileSize)})
          </a>

          {check.reportFilePath && (
            <a
              href={check.reportFilePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-300 hover:underline"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Current report: {check.reportFileName}
            </a>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <Label htmlFor={`report-${check.id}`}>Turnitin report (PDF)</Label>
            <Input
              id={`report-${check.id}`}
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={(e) => setReportFile(e.target.files?.[0] ?? null)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor={`score-${check.id}`}>Similarity %</Label>
            <Input
              id={`score-${check.id}`}
              type="number"
              min={0}
              max={100}
              step="0.1"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              placeholder="e.g. 12.5"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor={`status-${check.id}`}>Status</Label>
            <select
              id={`status-${check.id}`}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {SIMILARITY_STATUSES.map((value) => (
                <option key={value} value={value}>
                  {SIMILARITY_STATUS_LABELS[value]}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor={`notes-${check.id}`}>Note to the student</Label>
            <Textarea
              id={`notes-${check.id}`}
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              rows={2}
              placeholder="Optional — shown to the student alongside the report"
              className="mt-1"
            />
          </div>
        </div>

        {error && (
          <p role="alert" className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            {error}
          </p>
        )}

        {saved && !error && (
          <p role="status" className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
            <CheckCircle className="h-4 w-4" aria-hidden="true" />
            Saved.
          </p>
        )}

        <Button onClick={handleSave} disabled={saving} size="sm">
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" aria-hidden="true" />
              Saving…
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" aria-hidden="true" />
              Save &amp; send to student
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

export default function SimilarityCheckAdmin() {
  const [checks, setChecks] = useState<AdminSimilarityCheck[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [filter, setFilter] = useState<string>('pending');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Bumping this re-runs the loader. The fetch lives inside the effect so that
  // every setState lands after an await, and the cancelled flag drops responses
  // from a filter the admin has already clicked away from.
  const [refreshKey, setRefreshKey] = useState(0);
  const reload = () => {
    setLoading(true);
    setRefreshKey((key) => key + 1);
  };
  const changeFilter = (value: string) => {
    setLoading(true);
    setFilter(value);
  };

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const query = filter === 'all' ? '' : `?status=${filter}`;
        const res = await fetch(`/api/admin/similarity-checks${query}`);
        const data = await res.json();

        if (cancelled) return;

        if (!res.ok) {
          setError(data.error || 'Could not load similarity checks');
          setChecks([]);
          return;
        }

        setError(null);
        setChecks(Array.isArray(data.checks) ? data.checks : []);
        setCounts(data.counts || {});
      } catch {
        if (!cancelled) {
          setError('Could not reach the server.');
          setChecks([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [filter, refreshKey]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Similarity checks</h2>
          <p className="text-sm text-muted-foreground">
            Download the student&apos;s document, run it through Turnitin, then upload the
            report back here. Saving with a report attached marks the check complete and
            makes it downloadable in the student&apos;s dashboard.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={reload} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
          Refresh
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {(['pending', 'in_review', 'complete', 'rejected', 'all'] as const).map((value) => (
          <Button
            key={value}
            variant={filter === value ? 'default' : 'outline'}
            size="sm"
            onClick={() => changeFilter(value)}
          >
            {value === 'all'
              ? 'All'
              : SIMILARITY_STATUS_LABELS[value as SimilarityStatus]}
            {counts[value] !== undefined ? ` (${counts[value]})` : ''}
          </Button>
        ))}
      </div>

      {error && (
        <p role="alert" className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          {error}
        </p>
      )}

      {loading ? (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          Loading…
        </p>
      ) : checks.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nothing here right now.</p>
      ) : (
        <div className="space-y-4">
          {checks.map((check) => (
            <CheckRow key={check.id} check={check} onUpdated={reload} />
          ))}
        </div>
      )}
    </div>
  );
}
