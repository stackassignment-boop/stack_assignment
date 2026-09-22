import { Metadata } from 'next'
import { ScanText } from 'lucide-react'
import ImageToText from '@/components/tools/ImageToText'
import ToolPageShell from '@/components/tools/ToolPageShell'
import { region } from '@/lib/seo-config'

const url = 'https://www.stackassignment.com/tools/image-to-text'

export const metadata: Metadata = {
  title: 'Free Image to Text Converter (OCR) | Photo to Text for Students',
  description:
    'Turn photos of lecture slides, textbook pages, whiteboards and handwritten notes into editable text. Free OCR that runs in your browser — no upload, no sign-up.',
  keywords: [
    'image to text converter',
    'photo to text',
    'OCR online free',
    'lecture slide to text',
    'handwriting to text converter',
    'extract text from image free',
    'convert picture to text students',
  ],
  openGraph: {
    title: 'Free Image to Text Converter (OCR) | Photo to Text for Students',
    description:
      'Turn photos of slides, notes and textbook pages into editable text, entirely in your browser.',
    url,
    type: 'website',
    locale: region.ogLocale,
  },
  alternates: { canonical: url },
}

const faqs = [
  {
    question: 'Is my image uploaded to a server?',
    answer:
      'No. Recognition runs entirely in your browser using an OCR engine that downloads to your device on first use. Your image never leaves your computer, which also means the tool keeps working if your connection drops after the page has loaded.',
  },
  {
    question: 'Can it read handwriting?',
    answer:
      'Sometimes, but far less reliably than printed text. Neat, well-spaced handwriting on a flat page in good light has a reasonable chance; cursive, cramped or angled notes usually do not. Printed material — slides, textbook pages, worksheets — is where this works best.',
  },
  {
    question: 'How do I get the most accurate result?',
    answer:
      'Photograph the page straight on rather than at an angle, fill the frame with the text, and use even lighting without shadows or glare. Cropping out everything except the text block before uploading makes a noticeable difference. If a result comes out garbled, retaking the photo usually helps more than retrying the same image.',
  },
  {
    question: 'Can I use extracted text in my assignment?',
    answer:
      'Extracting text does not change who wrote it. If the words came from a textbook, slide deck or journal article, quoting or paraphrasing them in your work still requires a citation exactly as it would if you had typed them out by hand. OCR is a transcription convenience, not a shortcut around attribution.',
  },
  {
    question: 'What languages are supported?',
    answer:
      'This tool is configured for English. Text in other scripts will usually produce unreliable output.',
  },
]

export default function ImageToTextPage() {
  return (
    <ToolPageShell
      url={url}
      breadcrumbLabel="Image to Text"
      icon={ScanText}
      title="Image to text converter"
      intro="Photographed a slide, a whiteboard or a textbook page? Turn it into text you can actually search, quote and study from. Runs in your browser — nothing is uploaded."
      app={{
        name: 'Image to Text Converter',
        description:
          'Free browser-based OCR that converts photos of slides, notes and pages into editable text.',
      }}
      faqs={faqs}
      faqHeading="Questions about OCR"
      ctas={[
        {
          heading: 'More free study tools',
          body: 'Turn extracted notes into practice questions, or check a draft before you submit it.',
          href: '/tools',
          label: 'Browse all tools',
        },
      ]}
    >
      <ImageToText />
    </ToolPageShell>
  )
}
