import type { Metadata } from 'next';
import GuideArticle from '@/components/seo/GuideArticle';

export const metadata: Metadata = {
  title: "CQU APA Referencing Guide",
  description: "A practical APA 7 checklist for CQUniversity students preparing essays, reports and research-based assessments.",
  alternates: { canonical: "https://www.stackassignment.com/guides/cqu-apa-referencing" },
  openGraph: { type: 'article', modifiedTime: '2026-09-23', title: "Cqu Apa Referencing | Stack Assignment", url: "https://www.stackassignment.com/guides/cqu-apa-referencing" },
};

const sections = [{"heading": "Check your unit guide first", "paragraphs": ["Referencing requirements can vary by unit or discipline. Use the current assessment instructions supplied by CQUniversity as your final check."]}, {"heading": "In-text citations", "paragraphs": ["Use the author-date approach for paraphrased ideas and include the required location information for direct quotations when available."]}, {"heading": "Reference-list checks", "paragraphs": ["Verify authors, publication dates, titles, source type, DOI or URL and consistency between in-text citations and the reference list."]}, {"heading": "Final review", "paragraphs": ["Check every citation against the reference list and remove unused references before submission."]}];

export default function GuidePage() {
  return <GuideArticle title="CQU APA Referencing Guide" eyebrow="CQUniversity \u00b7 Referencing" description="A practical APA 7 checklist for CQUniversity students preparing essays, reports and research-based assessments." sections={sections} canonicalPath="/guides/cqu-apa-referencing" />;
}
