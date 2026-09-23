import type { Metadata } from 'next';
import GuideArticle from '@/components/seo/GuideArticle';

export const metadata: Metadata = {
  title: "UWA Assignment Cover Sheet Checklist",
  description: "A practical checklist for preparing an assignment submission at the University of Western Australia. Always follow the current instructions for your unit.",
  alternates: { canonical: "https://www.stackassignment.com/guides/uwa-assignment-cover-sheet" },
};

const sections = [{"heading": "Check the assessment brief", "paragraphs": ["Confirm the required submission format, naming convention, word count, file type and any cover-page requirements."]}, {"heading": "Confirm your details", "paragraphs": ["Use the student and unit information requested by the current assessment instructions and avoid adding information that is not required."]}, {"heading": "Check declarations and references", "paragraphs": ["Complete any required declarations and make sure citations and references are consistent."]}, {"heading": "Final file check", "paragraphs": ["Open the final file, check page numbering and formatting, confirm the correct file is attached, and keep a copy of what you submitted."]}];

export default function GuidePage() {
  return <GuideArticle title="UWA Assignment Cover Sheet Checklist" eyebrow="UWA \u00b7 Assessment preparation" description="A practical checklist for preparing an assignment submission at the University of Western Australia. Always follow the current instructions for your unit." sections={sections} />;
}
