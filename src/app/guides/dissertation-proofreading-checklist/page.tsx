import type { Metadata } from 'next';
import GuideArticle from '@/components/seo/GuideArticle';

export const metadata: Metadata = {
  title: "Dissertation Proofreading Checklist",
  description: "A practical final-pass checklist for UK university dissertations and major research projects.",
  alternates: { canonical: "https://www.stackassignment.com/guides/dissertation-proofreading-checklist" },
  openGraph: { type: 'article', modifiedTime: '2026-09-23', title: "Dissertation Proofreading Checklist | Stack Assignment", url: "https://www.stackassignment.com/guides/dissertation-proofreading-checklist" },
};

const sections = [{"heading": "Proofread in layers", "paragraphs": ["Do not try to fix everything at once. Start with structure and argument, then evidence and citations, then sentence-level clarity, and finally spelling, punctuation and formatting."]}, {"heading": "Check the argument", "paragraphs": ["Read the introduction and conclusion together. They should clearly describe the research problem, approach, key findings and contribution. Then check whether the main chapters actually support that argument."]}, {"heading": "Check references and presentation", "paragraphs": ["Confirm that every citation is accounted for and that the required reference style is applied consistently. Then check headings, tables, figures, page numbers, contents pages and appendices."], "bullets": ["Run a spelling and grammar check, but do not accept every automated suggestion blindly.", "Check table and figure labels against references in the text.", "Confirm the final word count using the university rules.", "Read the assessment rubric one final time."]}, {"heading": "Get a second pair of eyes", "paragraphs": ["A proofreading session is most useful when the reviewer works on the document you wrote and explains recurring problems. You remain responsible for the final dissertation and its academic integrity."]}];

export default function GuidePage() {
  return <GuideArticle title="Dissertation Proofreading Checklist" eyebrow="United Kingdom \u00b7 Dissertation support" description="A practical final-pass checklist for UK university dissertations and major research projects." sections={sections} canonicalPath="/guides/dissertation-proofreading-checklist" />;
}
