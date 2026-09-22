import type { Metadata } from 'next';
import GuideArticle from '@/components/seo/GuideArticle';

export const metadata: Metadata = {
  title: "APA 7 Referencing Guide for Australian Students",
  description: "A practical introduction to APA 7 for essays, reports, literature reviews and other university assessments in Australia.",
  alternates: { canonical: "https://www.stackassignment.com/guides/apa-7-referencing-australia" },
};

const sections = [{"heading": "What APA 7 is for", "paragraphs": ["APA 7 is an author–date referencing system used by many universities and disciplines. The key idea is simple: identify the source in the text and give the reader enough information in the reference list to find it."]}, {"heading": "In-text citations", "paragraphs": ["For a paraphrase, normally include the author surname and year, such as (Smith, 2026). For a direct quotation, include a page number when one is available. Always check your unit guide because lecturers can specify local requirements."]}, {"heading": "Reference-list basics", "paragraphs": ["Every source cited in your assessment should normally appear in the reference list, and every reference-list entry should normally be cited in the text. Keep author names, dates, titles, publication details and URLs/DOIs accurate."], "bullets": ["Check that the spelling of author names is consistent.", "Use the correct source type rather than copying a reference format from an unrelated source.", "Prefer a DOI when the source provides one.", "Run your final reference list against the citations in your document."]}, {"heading": "A better workflow", "paragraphs": ["Create your references while researching rather than leaving them until the final hour. Save the source details immediately, then format and check them before submission. Stack Assignment also provides a free referencing formatter for common styles."]}];

export default function GuidePage() {
  return <GuideArticle title="APA 7 Referencing Guide for Australian Students" eyebrow="Australia \u00b7 Referencing" description="A practical introduction to APA 7 for essays, reports, literature reviews and other university assessments in Australia." sections={sections} />;
}
