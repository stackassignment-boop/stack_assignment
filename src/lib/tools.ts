import type { LucideIcon } from 'lucide-react'
import {
  Calculator, Quote, ShieldCheck, ClipboardCheck,
  ScanText, FileType2, Sparkles,
} from 'lucide-react'

export interface StudyTool {
  /** Full name. Used as the card heading on the /tools index. */
  name: string
  /**
   * Shorter label for the header dropdown, where a 288px panel makes a name
   * like "Similarity Report Explainer" wrap onto two lines. Falls back to
   * `name` when omitted.
   */
  navLabel?: string
  href: string
  icon: LucideIcon
  /**
   * `live: false` entries render on the index as visibly "coming soon" rather
   * than as links, and are skipped entirely in the header dropdown. Listing a
   * planned tool as a working link would be both a dead end for visitors and a
   * soft-404 signal for Google, so they stay unlinked until built.
   */
  live: boolean
  cta: string
  blurb: string
}

/**
 * The one list of free tools. Both the /tools index and the header dropdown
 * read from here, so a new tool needs adding in exactly one place and the two
 * surfaces cannot drift apart.
 *
 * Order is deliberate and shared: the similarity check leads because it is the
 * entry point to the draft-check flow, and it is the only item here that feeds
 * a signed-in service rather than ending at a standalone widget.
 */
export const TOOLS: StudyTool[] = [
  {
    name: 'Similarity Report Explainer',
    navLabel: 'Similarity Check',
    href: '/tools/similarity-report',
    icon: ShieldCheck,
    live: true,
    cta: 'Read the guide',
    blurb:
      'A plain-English guide to reading a Turnitin similarity report — what a high percentage does and does not mean, which matches are worth acting on, and how AI-detection flags are actually treated.',
  },
  {
    name: 'WAM Calculator',
    href: '/tools/wam-calculator',
    icon: Calculator,
    live: true,
    cta: 'Open the calculator',
    blurb:
      'Work out your Weighted Average Mark from unit marks and credit points, with the year-level weighting some Australian universities apply. Converts to a 7-point GPA and shows what you need to average to hit a target.',
  },
  {
    name: 'Referencing Generator',
    href: '/tools/referencing-formatter',
    icon: Quote,
    live: true,
    cta: 'Build a reference',
    blurb:
      'APA 7th, Harvard (AU), AGLC4 and Vancouver citations for journal articles, books, chapters and web pages. Builds your in-text citation alongside the reference, and keeps a running list you can copy in one go.',
  },
  {
    name: 'Assignment Draft Checker',
    navLabel: 'Draft Checker',
    href: '/tools/draft-review',
    icon: ClipboardCheck,
    live: true,
    cta: 'Check a draft',
    blurb:
      'Paste a draft and see what a marker notices structurally — word count against target, readability, citation density, overlong sentences, filler phrasing, contractions and passive voice.',
  },
  {
    name: 'PDF to Word Converter',
    navLabel: 'PDF to Word',
    href: '/tools/pdf-to-word',
    icon: FileType2,
    live: true,
    cta: 'Convert a PDF',
    blurb:
      'Turn a PDF reading, unit guide or set of lecture notes into an editable .docx you can annotate and quote from. Converts in your browser, so the file is never uploaded anywhere.',
  },
  {
    name: 'Image to Text (OCR)',
    href: '/tools/image-to-text',
    icon: ScanText,
    live: true,
    cta: 'Extract text',
    blurb:
      'Photographed a slide, a whiteboard or a textbook page? Pull the text out so you can search, quote and revise from it. Handles printed text well; handwriting is hit and miss.',
  },
  {
    name: 'Quiz Generator',
    href: '/tools/quiz-generator',
    icon: Sparkles,
    live: true,
    cta: 'Make practice questions',
    blurb:
      'Paste your notes and get fill-the-gap, definition and short-answer questions back. Active recall beats re-reading, and this turns material you already have into revision you can measure.',
  },
]

/** What the header dropdown shows: live tools only, short labels. */
export const NAV_TOOLS = TOOLS.filter((tool) => tool.live).map((tool) => ({
  label: tool.navLabel ?? tool.name,
  href: tool.href,
  icon: tool.icon,
}))
