import Link from 'next/link'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/lib/seo-config'

const SITE = 'https://www.stackassignment.com'

export interface ToolFaq {
  question: string
  answer: string
}

export interface ToolCta {
  heading: string
  body: React.ReactNode
  href: string
  label: string
  /**
   * Further links shown in the same row as the primary one, at equal weight.
   * The similarity-report guide closes with a card offering both the
   * referencing generator and the integrity guidance; without this the
   * conversion to this shell would have quietly dropped one of them.
   */
  links?: { href: string; label: string }[]
  /** `accent` is the indigo-tinted card used for the page's primary action. */
  tone?: 'accent' | 'plain'
}

export interface ToolPageShellProps {
  /** Absolute canonical URL. Also used in the schema blocks. */
  url: string
  /** Last crumb — the page's own name in the breadcrumb trail. */
  breadcrumbLabel: string
  icon: LucideIcon
  /** Pill text above the heading. */
  badge?: string
  title: string
  intro: React.ReactNode
  /**
   * WebApplication schema. Omit on pages that are guides rather than tools —
   * marking an explainer up as an application is a misrepresentation Google is
   * entitled to act on.
   */
  app?: { name: string; description: string; category?: string }
  faqs: ToolFaq[]
  /**
   * Heading for the FAQ section. Pass `false` to keep the FAQ *schema* while
   * laying the questions out yourself — the WAM calculator does this, because
   * its questions sit inside its guide rather than in a separate band.
   */
  faqHeading: string | false
  /** Sits between the hero and the body. Used for caveats worth reading first. */
  banner?: React.ReactNode
  /** Narrower body for text-heavy guides. */
  bodyWidth?: 'wide' | 'narrow'
  children: React.ReactNode
  /** Cards closing the page. Rendered under the FAQ when there is one. */
  ctas?: ToolCta[]
  /** Show the clickable Home / Free Tools / … trail inside the hero. */
  showBreadcrumbNav?: boolean
}

/**
 * The shared frame for /tools/* pages.
 *
 * Every tool page was carrying its own copy of the same ~70 lines: the three
 * JSON-LD blocks, the indigo hero with its pill and heading, the body
 * container, the FAQ band, and a closing card. The copies had already started
 * to drift — one used `border-white/30` where the rest used `/25`, and the
 * breadcrumb trail appeared on one page only — which is the usual way this kind
 * of duplication announces itself before it becomes a real inconsistency.
 *
 * Everything below the hero is a slot, so a page that needs a different body
 * (the WAM calculator's guide, the similarity explainer's numbered sections)
 * passes it as children rather than fighting the abstraction.
 */
export default function ToolPageShell({
  url,
  breadcrumbLabel,
  icon: Icon,
  badge = 'Free tool',
  title,
  intro,
  app,
  faqs,
  faqHeading,
  banner,
  bodyWidth = 'wide',
  children,
  ctas = [],
  showBreadcrumbNav = false,
}: ToolPageShellProps) {
  const crumbs = [
    { name: 'Home', url: SITE },
    { name: 'Free Tools', url: `${SITE}/tools` },
    { name: breadcrumbLabel, url },
  ]

  const schema = [
    ...(app ? [generateWebApplicationSchema({ ...app, url })] : []),
    generateBreadcrumbSchema(crumbs),
    ...(faqs.length > 0 ? [generateFAQSchema(faqs)] : []),
  ]

  return (
    <main className="flex-grow">
      {/*
        Three schema types, each doing a distinct job: WebApplication marks the
        page up as a free tool (which is what earns it a place in tool round-ups
        and the backlinks that come with them), BreadcrumbList gives the SERP a
        readable path, and FAQPage targets the question queries further down.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          {showBreadcrumbNav && (
            <nav aria-label="Breadcrumb" className="mb-5 text-sm text-white/70">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/tools" className="hover:text-white">
                Free Tools
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">{breadcrumbLabel}</span>
            </nav>
          )}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-4 py-1.5 text-sm font-semibold mb-5">
            <Icon className="h-4 w-4" /> {badge}
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">{intro}</p>
        </div>
      </section>

      <div
        className={
          bodyWidth === 'narrow'
            ? 'max-w-3xl mx-auto px-6 py-12 md:py-16'
            : 'max-w-4xl mx-auto px-6 py-10 md:py-14'
        }
      >
        {banner}
        {children}
      </div>

      {(faqHeading !== false || ctas.length > 0) && (
        <section className="border-t border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900/40">
          <div className="max-w-3xl mx-auto px-6 py-14">
            {faqHeading !== false && (
              <>
                <h2
                  className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-slate-100"
                  style={{ fontFamily: 'Sora, sans-serif' }}
                >
                  {faqHeading}
                </h2>
                <div className="space-y-6">
                  {faqs.map((faq) => (
                    <div key={faq.question}>
                      <h3 className="font-bold text-gray-900 dark:text-slate-100 mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {ctas.map((cta, index) => (
              <div
                key={cta.href + cta.heading}
                className={[
                  index === 0 && faqHeading !== false ? 'mt-10' : 'mt-6',
                  'rounded-2xl border p-6',
                  cta.tone === 'accent'
                    ? 'border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-500/10'
                    : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900',
                ].join(' ')}
              >
                <h3 className="font-bold text-gray-900 dark:text-slate-100 mb-2">{cta.heading}</h3>
                <p className="text-gray-700 dark:text-slate-300 mb-4 leading-relaxed">{cta.body}</p>
                <div className="flex flex-wrap gap-4">
                  {[{ href: cta.href, label: cta.label }, ...(cta.links ?? [])].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="inline-flex items-center gap-1.5 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      {link.label} <ArrowRight className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
