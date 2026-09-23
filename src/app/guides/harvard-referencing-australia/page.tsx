import type { Metadata } from 'next';
import GuideArticle from '@/components/seo/GuideArticle';

export const metadata: Metadata = {
  title: "Harvard Referencing Guide for Australian Students",
  description: "A practical Harvard referencing checklist for Australian university essays, reports and case studies. Check your current unit guide when requirements differ.",
  alternates: { canonical: "https://www.stackassignment.com/guides/harvard-referencing-australia" },
};

const sections = [{"heading": "Check the required version", "paragraphs": ["Harvard is used in different forms. Start with your university or unit guide and follow its examples when they differ from a general guide."]}, {"heading": "In-text citations", "paragraphs": ["Use the author and year information required by your institution. Keep spelling, dates and punctuation consistent throughout the assessment."]}, {"heading": "Reference-list checks", "paragraphs": ["Record complete source details while researching, then check authors, dates, titles, publication information and DOI or URL before submission."]}, {"heading": "Final cross-check", "paragraphs": ["Every source cited in the assessment should be checked against the reference list, and unused references should be removed."]}];

export default function GuidePage() {
  return <GuideArticle title="Harvard Referencing Guide for Australian Students" eyebrow="Australia \u00b7 Referencing" description="A practical Harvard referencing checklist for Australian university essays, reports and case studies. Check your current unit guide when requirements differ." sections={sections} />;
}
