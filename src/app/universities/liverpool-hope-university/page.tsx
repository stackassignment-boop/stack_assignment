import { Metadata } from 'next'
import Link from 'next/link'
import {
  CheckCircle2, MapPin, FileText, ShieldCheck, GraduationCap, MessageCircle, Code2,
  Briefcase, School, Palette, Scale, Users, Bot, PenTool,
} from 'lucide-react'
import { StructuredData } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  title: 'Liverpool Hope University Assignment Help | Academic Support UK',
  description:
    'Academic support and assessment guidance for Liverpool Hope University students — business, education, psychology, computer science and law, plus combined honours degrees.',
  keywords: [
    'Liverpool Hope University assignment help', 'Liverpool Hope assignment help', 'Liverpool Hope assessment help',
    'Liverpool Hope academic support', 'Liverpool Hope business assignment help',
    'Liverpool Hope education assignment help', 'Liverpool Hope psychology assignment help',
    'Liverpool Hope computer science assignment help', 'Liverpool Hope report writing help',
  ],
  openGraph: {
    title: 'Liverpool Hope University Assignment Help | Academic Support UK',
    description: 'Academic support for Liverpool Hope University students across business, education, psychology and computer science.',
    url: 'https://www.stackassignment.com/universities/liverpool-hope-university',
    type: 'website',
  },
  alternates: { canonical: 'https://www.stackassignment.com/universities/liverpool-hope-university' },
}

const whyChooseUs = [
  { icon: GraduationCap, title: 'Hope-Focused Support', desc: "Support matched to Liverpool Hope's four-faculty structure and combined-honours degree model." },
  { icon: Briefcase, title: 'Subject-Specific Guidance', desc: 'From business and education through to psychology, computer science and law.' },
  { icon: FileText, title: 'Assessment Brief Guidance', desc: 'Help interpreting marking rubrics and assessment briefs.' },
  { icon: PenTool, title: 'Academic Writing Support', desc: 'Structure, clarity, argument and academic tone across essays and reports.' },
  { icon: CheckCircle2, title: 'Referencing Guidance', desc: 'Support with Harvard, APA and other UK referencing conventions.' },
  { icon: ShieldCheck, title: 'Confidential Online Support', desc: 'A straightforward, confidential service for Liverpool Hope students.' },
]

interface CourseArea { icon: typeof Briefcase; title: string; desc: string }
const courseAreas: CourseArea[] = [
  { icon: Briefcase, title: 'Business, Law and Criminology', desc: 'Liverpool Hope Business School coursework, plus law and criminology.' },
  { icon: Palette, title: 'Creative Arts and Humanities', desc: 'Creative and performing arts, and humanities coursework.' },
  { icon: School, title: 'Education and Social Sciences', desc: 'Education, teaching, and social sciences coursework.' },
  { icon: Code2, title: 'Human and Digital Sciences', desc: 'Computer science and the environment, health and sport sciences, and psychology.' },
  { icon: Users, title: 'Combined Honours', desc: "One of the UK's widest choices of joint honours degrees, spanning arts, humanities, sciences and education." },
  { icon: Scale, title: 'Law & Criminology', desc: 'Academic support for law and criminology coursework — not legal advice.' },
]

const assessmentSupportItems = [
  'Essays', 'Reports', 'Case studies', 'Presentations', 'Research', 'Dissertations', 'Projects',
  'Literature reviews', 'Data analysis', 'Proofreading', 'Referencing', 'Editing',
]

const howItWorks = [
  { step: '1', title: 'Share Your Assessment Requirements', desc: 'Provide the relevant task instructions or assessment brief.' },
  { step: '2', title: 'Tell Us What Support You Need', desc: 'Writing, proofreading, referencing, research, data analysis or subject guidance.' },
  { step: '3', title: 'Get Subject-Specific Support', desc: 'Receive support relevant to your course and unit.' },
  { step: '4', title: 'Review the Guidance', desc: 'Use the feedback and explanations to improve your own work.' },
  { step: '5', title: 'Complete Your Own Submission', desc: 'Ensure your final work follows Liverpool Hope requirements and represents your own work.' },
]

const studentResources = [
  'Liverpool Hope Assignment Writing Guide', 'Liverpool Hope Referencing Guide', 'Liverpool Hope Dissertation Guide',
  'Liverpool Hope Business Report Guide', 'Liverpool Hope Education Assignment Guide', 'Liverpool Hope Psychology Guide',
]

const faqs = [
  { q: 'What is Liverpool Hope University assignment help?', a: "Academic support built around Liverpool Hope's four-faculty structure — covering business, education, psychology, computer science, humanities and law." },
  { q: 'Can you help with Liverpool Hope combined/joint honours assignments?', a: "Yes — Liverpool Hope offers one of the UK's widest choices of joint honours degrees, and we support assignments across both subjects in a combined degree." },
  { q: 'Do you support Liverpool Hope education assignments?', a: 'Yes, including education reports, lesson-plan related coursework and teaching case studies via the School of Education.' },
  { q: 'Can you help with Liverpool Hope psychology assessments?', a: 'Yes — academic writing and research support for psychology coursework via the School of Psychology.' },
  { q: 'Do you provide Liverpool Hope business assignment help?', a: 'Yes, including business reports and case studies via Liverpool Hope Business School.' },
  { q: 'Can you help with Liverpool Hope computer science assignments?', a: 'Yes, including coursework via the School of Computer Science and the Environment.' },
  { q: 'Do you support Liverpool Hope dissertation writing?', a: 'Yes, including structure, research methodology and referencing guidance for undergraduate and postgraduate dissertations.' },
  { q: 'Can you help with Liverpool Hope law and criminology assignments?', a: 'Yes — academic writing, research and referencing support. This is not legal advice.' },
  { q: 'Do you provide Liverpool Hope proofreading and referencing support?', a: 'Yes — proofreading, editing and referencing across Harvard, APA and other UK conventions.' },
  { q: 'Can you help me understand my Liverpool Hope assessment brief?', a: "Yes — upload your assessment brief and get guidance on what's being asked and how to structure your response." },
]

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })),
}
const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.stackassignment.com' },
    { '@type': 'ListItem', position: 2, name: 'Universities', item: 'https://www.stackassignment.com/universities' },
    { '@type': 'ListItem', position: 3, name: 'Liverpool Hope University Assignment Help', item: 'https://www.stackassignment.com/universities/liverpool-hope-university' },
  ],
}

export default function LiverpoolHopeUniversityPage() {
  return (
    <main className="flex-grow">
      <StructuredData data={[faqSchema, breadcrumbSchema]} />

      <div className="max-w-5xl mx-auto px-6 py-5 text-sm text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
        <span className="mx-2">›</span><span>Universities</span><span className="mx-2">›</span>
        <span className="text-slate-700 dark:text-slate-300">Liverpool Hope University Assignment Help</span>
      </div>

      <section className="relative text-white py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute rounded-full blur-3xl opacity-30 animate-float" style={{ top: '8%', left: '6%', width: '320px', height: '320px', background: 'radial-gradient(circle, #6366f1, transparent 70%)' }} />
        <div className="absolute rounded-full blur-3xl opacity-25 animate-float" style={{ bottom: '10%', right: '8%', width: '280px', height: '280px', background: 'radial-gradient(circle, #a855f7, transparent 70%)', animationDelay: '7s' }} />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 rounded-full px-5 py-2 text-sm font-semibold mb-8 backdrop-blur-sm"><GraduationCap className="w-4 h-4" />For Liverpool Hope University Students</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>Liverpool Hope University Assignment Help</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-10 font-medium">
            Academic support, assessment guidance, proofreading and research assistance for
            Liverpool Hope University students.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/order" className="bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-10 py-4 rounded-xl text-lg font-bold transition shadow-xl shadow-yellow-400/30 hover:shadow-2xl hover:scale-105 active:scale-95 min-w-[15rem]">Get Academic Support</Link>
            <Link href="#hope-courses" className="border-2 border-white/70 hover:bg-white/10 px-10 py-4 rounded-xl text-lg font-semibold transition min-w-[15rem]">Request a Quote</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Liverpool Hope University is organised across four faculties — Business, Law and
            Criminology; Creative Arts and Humanities; Education and Social Sciences; and Human and
            Digital Sciences — and is genuinely distinctive for offering one of the UK's widest
            ranges of combined/joint honours degrees, letting students study across arts,
            humanities, sciences, social sciences and education. It ranks in the top 3 in the North
            West for research intensity (REF 2021).
          </p>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Stack Assignment provides academic support for Liverpool Hope students — covering
            academic writing guidance, research assistance, referencing help, proofreading and
            subject-specific support across business, education, psychology, computer science,
            humanities and law.
          </p>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Support is delivered entirely online, matched to your module and assessment brief.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Sora, sans-serif' }}>Why Choose Stack Assignment for Liverpool Hope Students?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="bg-white dark:bg-slate-800 rounded-2xl p-7 shadow-md border border-slate-100 dark:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4"><item.icon className="w-7 h-7 text-white" /></div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="hope-courses" className="py-16 bg-white dark:bg-slate-950 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Sora, sans-serif' }}>Liverpool Hope University Courses We Support</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courseAreas.map((course) => (
              <div key={course.title} className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center mb-4"><course.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" /></div>
                <h3 className="font-bold text-base mb-1.5">{course.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{course.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ fontFamily: 'Sora, sans-serif' }}>Liverpool Hope Assessment Support</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {assessmentSupportItems.map((item) => (
              <div key={item} className="flex items-center gap-2.5 bg-white dark:bg-slate-800 rounded-xl px-4 py-3.5 border border-slate-100 dark:border-slate-700">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /><span className="text-sm font-medium text-slate-700 dark:text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 flex items-center justify-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}><Bot className="w-8 h-8 text-indigo-600" />Referencing & Responsible AI</h2>
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-2xl p-7">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Referencing requirements can vary by module at Liverpool Hope — always follow the
              style specified for your specific assessment.
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Students should check their current module and assessment requirements before using
              generative AI in assessed work, and follow Liverpool Hope's academic-integrity
              requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>Academic Integrity & Responsible Academic Support</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-7 border border-slate-100 dark:border-slate-700">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Stack Assignment is not affiliated with, endorsed by, or partnered with Liverpool
              Hope University. Our services support understanding assessment requirements, research
              guidance, academic writing, proofreading, editing, referencing and data analysis
              guidance. Students remain fully responsible for their own final submissions and must
              follow Liverpool Hope's academic-integrity requirements.
            </p>
            <Link href="/integrity" className="text-indigo-600 dark:text-indigo-400 underline font-medium text-sm">Read our full Academic Integrity policy</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Liverpool Hope Academic Support in the UK</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">Support is delivered online regardless of your Liverpool Hope campus.</p>
          <span className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-1.5 rounded-full text-sm font-semibold"><MapPin className="w-3.5 h-3.5" />Liverpool, UK</span>
        </div>
      </section>

      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Sora, sans-serif' }}>How It Works</h2>
          <div className="space-y-5">
            {howItWorks.map((item) => (
              <div key={item.step} className="flex gap-5 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold flex-shrink-0">{item.step}</div>
                <div><h3 className="font-bold text-base mb-1">{item.title}</h3><p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ fontFamily: 'Sora, sans-serif' }}>Liverpool Hope Student Resources</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {studentResources.map((item) => (
              <div key={item} className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-3.5 border border-slate-100 dark:border-slate-700">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{item}</span><span className="text-xs text-slate-400 dark:text-slate-500 flex-shrink-0 ml-3">Coming soon</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ fontFamily: 'Sora, sans-serif' }}>Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((item) => (
              <div key={item.q} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 transition hover:shadow-md">
                <h3 className="font-bold text-lg mb-2 flex items-start gap-2"><MessageCircle className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />{item.q}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed pl-7">{item.a}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 dark:text-slate-500 mt-6">Read our full <Link href="/integrity" className="text-indigo-600 dark:text-indigo-400 underline font-medium">Academic Integrity policy</Link> before ordering.</p>
        </div>
      </section>

      <section className="py-10 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-wide">Other University Assignment Support</h3>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link href="/kaplan-assignment-help" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Kaplan Business School</Link><span className="text-slate-300 dark:text-slate-700">·</span>
            <Link href="/universities/de-montfort-university" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">De Montfort University</Link>
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden stack-cta-band">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, white 0%, transparent 8%), radial-gradient(circle at 80% 70%, white 0%, transparent 6%)' }} />
        <div className="max-w-3xl mx-auto px-6 text-center text-white relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Need Support With Your Liverpool Hope Assessment?</h2>
          <p className="text-lg opacity-90 mb-8">Get subject-specific academic guidance for writing, research, business, education, psychology and computer science.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/order" className="inline-block bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-10 py-4 rounded-xl text-lg font-bold transition shadow-xl shadow-yellow-400/30 hover:shadow-2xl hover:scale-105 active:scale-95">Get Academic Support</Link>
            <Link href="/order" className="inline-block border-2 border-white/70 hover:bg-white/10 px-10 py-4 rounded-xl text-lg font-semibold transition">Request a Quote</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
