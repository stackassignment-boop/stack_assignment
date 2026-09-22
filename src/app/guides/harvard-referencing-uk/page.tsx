import type { Metadata } from 'next';
import GuideArticle from '@/components/seo/GuideArticle';

export const metadata: Metadata = {
  title: "Harvard Referencing Guide for UK Students",
  description: "A practical introduction to Harvard-style author\u2013date referencing for essays, reports and university coursework in the UK.",
  alternates: { canonical: "https://www.stackassignment.com/guides/harvard-referencing-uk" },
};

const sections = [{"heading": "Understand the author–date system", "paragraphs": ["Harvard normally uses an author surname and publication year in the text, with full publication information in the reference list. Universities can use different Harvard variants, so your institutional guide takes priority."]}, {"heading": "Paraphrasing and quotations", "paragraphs": ["Paraphrasing still requires a citation. Direct quotations need quotation marks and, where required by the institutional variant, a page number or other locator."]}, {"heading": "Build the reference list carefully", "paragraphs": ["Record the author, year, title, publisher or journal details and stable URL/DOI while researching. Then apply the exact Harvard variant required by your university."], "bullets": ["Do not mix multiple Harvard variants in one assignment.", "Check every in-text citation against the reference list.", "Keep capitalisation and punctuation consistent.", "Check web sources for author, publication date and access requirements where applicable."]}, {"heading": "Use your university guide", "paragraphs": ["UK universities often publish their own Harvard guidance. Use that guide alongside a general explanation, particularly for unusual source types."]}];

export default function GuidePage() {
  return <GuideArticle title="Harvard Referencing Guide for UK Students" eyebrow="United Kingdom \u00b7 Referencing" description="A practical introduction to Harvard-style author\u2013date referencing for essays, reports and university coursework in the UK." sections={sections} />;
}
