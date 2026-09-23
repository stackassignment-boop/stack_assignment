import type { Metadata } from 'next';
import GuideArticle from '@/components/seo/GuideArticle';

export const metadata: Metadata = {
  title: "Victoria University Turnitin & Assignment Checklist",
  description: "A student-focused checklist for preparing an assessment for Turnitin and final submission at Victoria University. Follow your current unit instructions for the exact process.",
  alternates: { canonical: "https://www.stackassignment.com/guides/vun-turnitin" },
};

const sections = [{"heading": "Understand what Turnitin does", "paragraphs": ["Turnitin can compare submitted text with sources in its database. A similarity report is a review aid, not a substitute for correct citation and academic judgement."]}, {"heading": "Check your draft", "paragraphs": ["Review quotations, paraphrases, citations and references before submission. Make sure borrowed ideas are clearly attributed."]}, {"heading": "Follow the unit process", "paragraphs": ["Use the current LMS and assessment instructions supplied by your unit for upload attempts, file types, deadlines and any required checks."]}, {"heading": "Submit your own work", "paragraphs": ["Make sure the final submission represents your own work and follows your university and unit academic-integrity requirements."]}];

export default function GuidePage() {
  return <GuideArticle title="Victoria University Turnitin & Assignment Checklist" eyebrow="Victoria University \u00b7 Assessment preparation" description="A student-focused checklist for preparing an assessment for Turnitin and final submission at Victoria University. Follow your current unit instructions for the exact process." sections={sections} />;
}
