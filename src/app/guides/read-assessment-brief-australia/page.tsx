import type { Metadata } from 'next';
import GuideArticle from '@/components/seo/GuideArticle';

export const metadata: Metadata = {
  title: "How to Read an Australian University Assessment Brief",
  description: "A step-by-step method for turning an assessment brief and marking rubric into a practical writing plan.",
  alternates: { canonical: "https://www.stackassignment.com/guides/read-assessment-brief-australia" },
};

const sections = [{"heading": "Start with the task verb", "paragraphs": ["Circle the main instruction: analyse, evaluate, compare, discuss, critically assess, design, calculate or another verb. The verb tells you what kind of response the marker is asking for."]}, {"heading": "Extract the constraints", "paragraphs": ["Write down the word count, due date, format, required sources, referencing style, learning outcomes and submission requirements. These constraints are easy to overlook and can cost marks."]}, {"heading": "Use the rubric as a checklist", "paragraphs": ["Turn each criterion into a question you can answer before submission. If a rubric rewards analysis, ask where your analysis occurs. If it rewards evidence, check whether each major claim is supported."], "bullets": ["Map each section of your planned response to one or more criteria.", "Budget words before drafting.", "Keep the assessment question visible while you write.", "Reserve time for a final rubric-based review."]}, {"heading": "Get targeted feedback", "paragraphs": ["If you are stuck, ask for help with the part you cannot interpret: the task wording, structure, evidence, referencing or your own draft. Targeted support is usually more useful than generic writing advice."]}];

export default function GuidePage() {
  return <GuideArticle title="How to Read an Australian University Assessment Brief" eyebrow="Australia \u00b7 Assessment skills" description="A step-by-step method for turning an assessment brief and marking rubric into a practical writing plan." sections={sections} />;
}
