import type { Metadata } from 'next';
import GuideArticle from '@/components/seo/GuideArticle';

export const metadata: Metadata = {
  title: "Torrens University Assessment & Marking Guide",
  description: "A practical guide to reading a Torrens University assessment brief and using its marking criteria to plan your own response.",
  alternates: { canonical: "https://www.stackassignment.com/guides/torrens-marking-guide" },
};

const sections = [{"heading": "Find the task verb", "paragraphs": ["Identify words such as analyse, evaluate, compare, discuss or justify. Your response structure should reflect what the task actually asks you to do."]}, {"heading": "Turn criteria into headings", "paragraphs": ["Use the marking criteria as a checklist for your draft. Note the evidence, examples or reasoning needed to demonstrate each criterion."]}, {"heading": "Plan evidence", "paragraphs": ["Collect credible sources before drafting and record the details needed for accurate referencing."]}, {"heading": "Pre-submission check", "paragraphs": ["Read the brief again, check the rubric, proofread your own work and make sure the final submission follows the current unit instructions."]}];

export default function GuidePage() {
  return <GuideArticle title="Torrens University Assessment & Marking Guide" eyebrow="Torrens University \u00b7 Assessment planning" description="A practical guide to reading a Torrens University assessment brief and using its marking criteria to plan your own response." sections={sections} />;
}
