import type { Metadata } from 'next';
import GuideArticle from '@/components/seo/GuideArticle';

export const metadata: Metadata = {
  title: "How to Plan a UK University Assignment",
  description: "A practical planning method for essays, reports and other university assessments in the UK.",
  alternates: { canonical: "https://www.stackassignment.com/guides/plan-uk-university-assignment" },
  openGraph: { type: 'article', modifiedTime: '2026-09-23', title: "Plan Uk University Assignment | Stack Assignment", url: "https://www.stackassignment.com/guides/plan-uk-university-assignment" },
};

const sections = [{"heading": "Decode the question", "paragraphs": ["Identify the topic, task verb, scope and any required comparison or evaluation. Rewrite the question in your own words before you search for sources."]}, {"heading": "Build a simple structure", "paragraphs": ["A useful first plan is introduction, focused body sections and conclusion. The exact structure depends on the assignment type: a business report may need an executive summary and recommendations, while an essay may not."]}, {"heading": "Plan evidence before paragraphs", "paragraphs": ["For each major point, decide what evidence you need and where it will come from. This prevents a common problem: collecting sources first and only later trying to find an argument for them."], "bullets": ["Create a one-page outline before drafting.", "Assign an approximate word budget to each section.", "Keep the marking criteria beside your outline.", "Leave time for editing, referencing and proofreading."]}, {"heading": "Review against the question", "paragraphs": ["Before submission, read the question again and highlight where your draft answers each part. A polished essay that does not directly answer the question is still a weak submission."]}];

export default function GuidePage() {
  return <GuideArticle title="How to Plan a UK University Assignment" eyebrow="United Kingdom \u00b7 Assessment skills" description="A practical planning method for essays, reports and other university assessments in the UK." sections={sections} canonicalPath="/guides/plan-uk-university-assignment" />;
}
