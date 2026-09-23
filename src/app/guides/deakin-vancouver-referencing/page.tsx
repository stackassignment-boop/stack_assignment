import type { Metadata } from 'next';
import GuideArticle from '@/components/seo/GuideArticle';

export const metadata: Metadata = {
  title: "Deakin Vancouver Referencing Guide",
  description: "A practical Vancouver-style referencing checklist for Deakin University students, especially health and science coursework.",
  alternates: { canonical: "https://www.stackassignment.com/guides/deakin-vancouver-referencing" },
};

const sections = [{"heading": "Use the current Deakin instructions", "paragraphs": ["Always compare your references with the current unit guide or library guidance because requirements can change between courses and assessment tasks."]}, {"heading": "Number sources consistently", "paragraphs": ["Vancouver uses numbered citations. Keep numbering consistent with the order required by your course and do not renumber citations manually without checking the whole document."]}, {"heading": "Reference details", "paragraphs": ["Check author names, article or book title, journal details, year, volume, issue, pages and DOI or URL as applicable to the source."]}, {"heading": "Final review", "paragraphs": ["Check that each citation points to the correct reference and that the reference list contains only sources used in the assessment."]}];

export default function GuidePage() {
  return <GuideArticle title="Deakin Vancouver Referencing Guide" eyebrow="Deakin University \u00b7 Referencing" description="A practical Vancouver-style referencing checklist for Deakin University students, especially health and science coursework." sections={sections} />;
}
