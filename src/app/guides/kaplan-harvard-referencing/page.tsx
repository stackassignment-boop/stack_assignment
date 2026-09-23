import type { Metadata } from 'next';
import GuideArticle from '@/components/seo/GuideArticle';

export const metadata: Metadata = {
  title: "Kaplan Harvard Referencing Guide",
  description: "A practical Harvard referencing checklist for Kaplan Business School students. Check your current unit guide when local requirements differ.",
  alternates: { canonical: "https://www.stackassignment.com/guides/kaplan-harvard-referencing" },
  openGraph: { type: 'article', modifiedTime: '2026-09-23', title: "Kaplan Harvard Referencing | Stack Assignment", url: "https://www.stackassignment.com/guides/kaplan-harvard-referencing" },
};

const sections = [{"heading": "Start with your unit instructions", "paragraphs": ["Use the referencing examples supplied by your current Kaplan unit or assessment brief as the final authority."]}, {"heading": "In-text citations", "paragraphs": ["For paraphrases, identify the author and year in the text. For quotations, follow the required details for the source type and any page or location information requested by your unit."]}, {"heading": "Reference-list checks", "paragraphs": ["Keep author names, dates, titles, publication details and links accurate. Make sure sources cited in the assessment are represented in the reference list and vice versa."]}, {"heading": "Before submission", "paragraphs": ["Run a final citation-to-reference cross-check, then proofread punctuation, italics, ordering and URLs."]}];

export default function GuidePage() {
  return <GuideArticle title="Kaplan Harvard Referencing Guide" eyebrow="Kaplan Business School \u00b7 Referencing" description="A practical Harvard referencing checklist for Kaplan Business School students. Check your current unit guide when local requirements differ." sections={sections} canonicalPath="/guides/kaplan-harvard-referencing" />;
}
