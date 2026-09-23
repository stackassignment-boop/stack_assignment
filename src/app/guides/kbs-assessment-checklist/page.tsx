import type { Metadata } from 'next';
import GuideArticle from '@/components/seo/GuideArticle';

export const metadata: Metadata = {
  title: "Kaplan Business School Assessment Checklist",
  description: "A practical checklist for Kaplan Business School students to review an assessment brief, plan a response and proofread before submission.",
  alternates: { canonical: "https://www.stackassignment.com/guides/kbs-assessment-checklist" },
  openGraph: { type: 'article', modifiedTime: '2026-09-23', title: "Kbs Assessment Checklist | Stack Assignment", url: "https://www.stackassignment.com/guides/kbs-assessment-checklist" },
};

const sections = [{"heading": "Read the question carefully", "paragraphs": ["Highlight the task verbs and identify the topic, scope, evidence requirements and deliverable."]}, {"heading": "Use the rubric", "paragraphs": ["Turn each marking criterion into a checklist for your draft. Make sure your sections and evidence clearly address what is being assessed."]}, {"heading": "Check evidence and referencing", "paragraphs": ["Use credible sources, record source details as you research and apply the referencing style required by your current unit."]}, {"heading": "Final review", "paragraphs": ["Check word count, structure, formatting, citations, references, file type and submission instructions before you submit your own work."]}];

export default function GuidePage() {
  return <GuideArticle title="Kaplan Business School Assessment Checklist" eyebrow="Kaplan Business School \u00b7 Assessment planning" description="A practical checklist for Kaplan Business School students to review an assessment brief, plan a response and proofread before submission." sections={sections} canonicalPath="/guides/kbs-assessment-checklist" />;
}
