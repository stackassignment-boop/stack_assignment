import { Metadata } from 'next'
import { FileType2 } from 'lucide-react'
import PdfToWord from '@/components/tools/PdfToWord'
import ToolPageShell from '@/components/tools/ToolPageShell'
import { region } from '@/lib/seo-config'
const url = 'https://www.stackassignment.com/tools/pdf-to-word'

export const metadata: Metadata = {
  title: 'Free PDF to Word Converter | No Upload, No Sign-Up',
  description:
    'Convert PDF lecture notes, readings and unit guides into an editable Word (.docx) document. Runs entirely in your browser — your file is never uploaded.',
  keywords: [
    'PDF to Word converter free',
    'PDF to DOCX online',
    'convert PDF to editable Word',
    'PDF to Word no upload',
    'free PDF converter students',
    'extract text from PDF',
  ],
  openGraph: {
    title: 'Free PDF to Word Converter | No Upload, No Sign-Up',
    description:
      'Convert PDFs into editable Word documents in your browser. Nothing is uploaded.',
    url,
    type: 'website',
    locale: region.ogLocale,
  },
  alternates: { canonical: url },
}

const faqs = [
  {
    question: 'Is my PDF uploaded anywhere?',
    answer:
      'No. Both the text extraction and the Word file generation happen in your browser. Your document never reaches a server, which is worth knowing if the PDF contains unpublished research, marked work or anything else you would rather not hand to a third-party converter site.',
  },
  {
    question: 'Will the formatting be preserved exactly?',
    answer:
      'No, and no converter can promise this honestly. PDFs describe where ink sits on a page rather than document structure, so text and paragraph breaks carry across well, while multi-column layouts, tables, figures, headers and footnotes often do not. Expect a clean editable draft that needs tidying, not a pixel-perfect copy.',
  },
  {
    question: 'Why did it produce almost no text?',
    answer:
      'Your PDF is probably a scan — an image of a page rather than real text. Nothing can be extracted because there is no text layer to extract. Use the Image to Text tool instead, which runs optical character recognition on the picture itself.',
  },
  {
    question: 'Can it handle password-protected PDFs?',
    answer:
      'No. Encrypted or password-protected files will fail to open. Remove the protection through the application that created it, or open it with the password and re-save an unprotected copy first.',
  },
  {
    question: 'Can I convert a reading and submit parts of it?',
    answer:
      'Converting a document does not change who wrote it or who owns it. Course readings, textbook chapters and journal articles remain the work of their authors — quoting or paraphrasing any of that material in an assignment still requires a citation, exactly as it would if you had typed it out yourself.',
  },
]

export default function PdfToWordPage() {
  return (
    <ToolPageShell
      url={url}
      breadcrumbLabel="PDF to Word"
      icon={FileType2}
      title="PDF to Word converter"
      intro="Turn a PDF into an editable Word document so you can annotate readings, pull quotes, or work with a unit guide properly. Converts in your browser — nothing is uploaded."
      app={{
        name: 'PDF to Word Converter',
        description: 'Free browser-based PDF to Word (.docx) converter. No upload required.',
      }}
      faqs={faqs}
      faqHeading="Questions about converting PDFs"
      ctas={[
        {
          heading: 'Scanned PDF instead?',
          body: 'If your PDF is a photographed or scanned page, there is no text layer to extract. Our OCR tool reads the image directly.',
          href: '/tools/image-to-text',
          label: 'Try Image to Text',
        },
      ]}
    >
      <PdfToWord />
    </ToolPageShell>
  )
}
