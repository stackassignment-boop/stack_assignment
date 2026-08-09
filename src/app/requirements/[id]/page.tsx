import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { FileText, Calendar, Tag, ArrowLeft } from 'lucide-react'
import RequirementDetailActions from '@/components/requirements/RequirementDetailActions'

interface PageProps {
  params: Promise<{ id: string }>
}

async function getRequirement(id: string) {
  return db.requirementFile.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      fileName: true,
      fileSize: true,
      fileType: true,
      filePath: true,
      createdAt: true,
    },
  })
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const req = await getRequirement(id)

  if (!req) {
    return { title: 'Requirement Not Found | Stack Assignment' }
  }

  const description =
    req.description?.slice(0, 155) ||
    `${req.title} — assignment help available. Get a quote from Stack Assignment.`

  return {
    title: `${req.title} | Assignment Help | Stack Assignment`,
    description,
    openGraph: {
      title: req.title,
      description,
      url: `https://www.stackassignment.com/requirements/${req.id}`,
      type: 'article',
      publishedTime: req.createdAt.toISOString(),
    },
  }
}

function formatFileSize(bytes: number) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default async function RequirementDetailPage({ params }: PageProps) {
  const { id } = await params
  const req = await getRequirement(id)

  if (!req) {
    notFound()
  }

  return (
    <main className="flex-grow bg-gray-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link
          href="/requirements"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all requirements
        </Link>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm p-8">
          {req.category && (
            <span className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <Tag className="w-3 h-3" />
              {req.category}
            </span>
          )}

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            {req.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-slate-400 mb-6 pb-6 border-b border-gray-100 dark:border-slate-800">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              Posted {formatDate(req.createdAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              {req.fileName} · {formatFileSize(req.fileSize)}
            </span>
          </div>

          {req.description ? (
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap mb-8">
              {req.description}
            </p>
          ) : (
            <p className="text-gray-400 dark:text-slate-500 italic mb-8">
              No additional description provided for this requirement.
            </p>
          )}

          {/* Client-side actions: preview modal + get-help CTA */}
          <RequirementDetailActions requirement={req} />
        </div>
      </div>
    </main>
  )
}
