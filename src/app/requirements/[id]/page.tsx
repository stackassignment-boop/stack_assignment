import { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { FileText, Calendar, Tag, ArrowLeft } from 'lucide-react'
import RequirementDetailActions from '@/components/requirements/RequirementDetailActions'
import { region, generateBreadcrumbSchema } from '@/lib/seo-config'
import {
  extractRequirementId,
  isIndexable,
  requirementPath,
} from '@/lib/requirement-url'

interface PageProps {
  params: Promise<{ id: string }>
}

const SITE = 'https://www.stackassignment.com'

// Same reasoning as the list page — force fresh data per request so a
// newly uploaded requirement's detail page is reachable immediately,
// not only after the next deployment.
export const dynamic = 'force-dynamic'

// The route param is whatever was in the URL: either the canonical
// `some-title-{cuid}` slug or a legacy bare `{cuid}`. Both resolve to the same
// record; the page component redirects the legacy form to the canonical one so
// only a single URL is ever indexed.
async function getRequirement(segment: string) {
  const id = extractRequirementId(segment)
  if (!id) return null

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
    return { title: 'Requirement Not Found | Stack Assignment', robots: { index: false, follow: false } }
  }

  const canonical = `${SITE}${requirementPath(req)}`
  const description =
    req.description?.trim().slice(0, 155) ||
    `${req.title} — tutoring and editing support available. Get a quote from Stack Assignment.`

  // Index only pages carrying a real explanation of the assessment. A page with
  // a bare title has nothing to rank and, published at scale, would drag down
  // quality signals for the whole domain — so the thin ones stay out of the
  // index. `follow` stays true either way so internal links are still crawled.
  const indexable = isIndexable(req)

  return {
    // Keyword-first. The unit code and assessment type live in `title`, and
    // they need to be the first thing in the tag, not trailing behind a brand.
    title: `${req.title} | Stack Assignment`,
    description,
    alternates: { canonical },
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      title: req.title,
      description,
      url: canonical,
      type: 'article',
      locale: region.ogLocale,
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
  return date.toLocaleDateString('en-AU', {
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

  // Send legacy `/requirements/{cuid}` links, and any hand-edited slug, to the
  // canonical keyword URL. Without this the same record would be reachable at
  // two addresses and the ranking signal would split between them.
  const canonicalPath = requirementPath(req)
  if (`/requirements/${id}` !== canonicalPath) {
    redirect(canonicalPath)
  }

  const canonical = `${SITE}${canonicalPath}`
  const summary = req.description?.trim() ?? ''

  // Structured data. `Article` rather than anything document-flavoured: what is
  // published here is an explanation of the assessment, not the assessment
  // brief itself. The breadcrumb markup matches the site convention of keeping
  // the JSON-LD after the visible trail was removed.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: req.title,
        description: summary.slice(0, 250) || req.title,
        datePublished: req.createdAt.toISOString(),
        dateModified: req.createdAt.toISOString(),
        inLanguage: region.htmlLang,
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
        author: { '@type': 'Organization', name: 'Stack Assignment', url: SITE },
        publisher: {
          '@type': 'Organization',
          name: 'Stack Assignment',
          url: SITE,
        },
        ...(req.category ? { about: req.category } : {}),
      },
      generateBreadcrumbSchema([
        { name: 'Home', url: SITE },
        // Matches the footer's anchor text for the same destination. It also
        // avoids describing the section as a collection of university briefs,
        // which is not what is published here — the indexed content is the
        // explanation written for each assessment, not the brief itself.
        { name: 'Assignment Help', url: `${SITE}/requirements` },
        { name: req.title, url: canonical },
      ]),
    ],
  }

  return (
    <main className="flex-grow bg-slate-50 dark:bg-slate-950 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link
          href="/requirements"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all requirements
        </Link>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-8">
          {req.category && (
            <span className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <Tag className="w-3 h-3" />
              {req.category}
            </span>
          )}

          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
            {req.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
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
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap mb-8">
              {req.description}
            </p>
          ) : (
            <p className="text-slate-400 dark:text-slate-500 italic mb-8">
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
