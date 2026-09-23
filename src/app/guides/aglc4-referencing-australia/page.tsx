import type { Metadata } from 'next';
import GuideArticle from '@/components/seo/GuideArticle';

export const metadata: Metadata = {
  title: "AGLC4 Referencing Basics for Australian Students",
  description: "A practical starting point for Australian law students who need to understand the Australian Guide to Legal Citation, fourth edition.",
  alternates: { canonical: "https://www.stackassignment.com/guides/aglc4-referencing-australia" },
  openGraph: { type: 'article', modifiedTime: '2026-09-23', title: "Aglc4 Referencing Australia | Stack Assignment", url: "https://www.stackassignment.com/guides/aglc4-referencing-australia" },
};

const sections = [{"heading": "What AGLC4 does", "paragraphs": ["AGLC4 is a legal citation style used in Australian legal study. It is built around footnotes and source-specific conventions rather than the author–date pattern used by APA."]}, {"heading": "Start with the source type", "paragraphs": ["Identify whether you are citing a case, legislation, book, journal article, report, website or another source. The citation format depends on that source type."]}, {"heading": "Common checks", "paragraphs": ["Make sure case names, legislation titles, years, court information and pinpoint references are accurate. Do not invent a citation because a similar source uses a different format."], "bullets": ["Use footnotes consistently.", "Check pinpoint references against the actual source.", "Keep your bibliography and footnotes consistent with your faculty requirements.", "Use your law school or unit guide when it gives a requirement that differs from a general example."]}, {"heading": "Before submission", "paragraphs": ["Do a dedicated citation pass after you finish the substantive argument. Check every footnote, then check the bibliography, rather than relying only on an automated formatter."]}];

export default function GuidePage() {
  return <GuideArticle title="AGLC4 Referencing Basics for Australian Students" eyebrow="Australia \u00b7 Law" description="A practical starting point for Australian law students who need to understand the Australian Guide to Legal Citation, fourth edition." sections={sections} canonicalPath="/guides/aglc4-referencing-australia" />;
}
