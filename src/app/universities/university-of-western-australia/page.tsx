import { Metadata } from 'next'
import Link from 'next/link'
import {
  CheckCircle2, MapPin, FileText, ShieldCheck, GraduationCap, MessageCircle, Code2,
  Briefcase, HardHat, Scale, HeartPulse, Microscope, Bot, PenTool, DollarSign,
} from 'lucide-react'
import { StructuredData } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  title: 'University of Western Australia Assignment Help | UWA Academic Support',
  description:
    'Academic support and assessment guidance for University of Western Australia (UWA) students in Perth — computer science, engineering, business, law and science.',
  keywords: [
    'University of Western Australia assignment help', 'UWA assignment help', 'UWA assessment help',
    'UWA academic support', 'UWA computer science assignment help', 'UWA business assignment help',
    'UWA engineering assignment help', 'UWA accounting assignment help', 'UWA report writing help',
  ],
  openGraph: {
    title: 'University of Western Australia Assignment Help | UWA Academic Support',
    description: 'Academic support for UWA students across computer science, engineering, business, law and science.',
    url: 'https://www.stackassignment.com/universities/university-of-western-australia',
    type: 'website',
  },
  alternates: { canonical: 'https://www.stackassignment.com/universities/university-of-western-australia' },
}

const whyChooseUs = [
  { icon: GraduationCap, title: 'UWA-Focused Support', desc: "Support matched to UWA's course structure across its Business School and School of Engineering." },
  { icon: Briefcase, title: 'Subject-Specific Guidance', desc: 'From computer science and engineering through to business, law and science.' },
  { icon: FileText, title: 'Assessment Brief Guidance', desc: 'Help interpreting marking rubrics and assessment briefs.' },
  { icon: PenTool, title: 'Academic Writing Support', desc: 'Structure, clarity, argument and academic tone across reports and essays.' },
  { icon: CheckCircle2, title: 'Referencing Guidance', desc: 'Support with APA, Harvard and other styles, matched to your specific course.' },
  { icon: ShieldCheck, title: 'Confidential Online Support', desc: 'A straightforward, confidential service for UWA students.' },
]

interface CourseArea { icon: typeof Briefcase; title: string; desc: string; anchor?: string }
const courseAreas: CourseArea[] = [
  { icon: Code2, title: 'Computer Science', desc: 'Bachelor of Advanced Computer Science (Honours), including AI, Cybersecurity & Data Science, and Quantum Computing specialisations.', anchor: '#uwa-cs' },
  { icon: HardHat, title: 'Engineering', desc: 'Bachelor and Master of Professional Engineering, including a Software Engineering specialisation.' },
  { icon: Briefcase, title: 'Business', desc: 'UWA Business School — Accounting and Finance, Economics, Management and Organisations, Marketing.', anchor: '#uwa-business' },
  { icon: Scale, title: 'Law', desc: 'UWA Law School academic support.' },
  { icon: HeartPulse, title: 'Health & Medical Sciences', desc: 'Academic writing and research support for health-related coursework — not clinical advice.' },
  { icon: Microscope, title: 'Science', desc: 'Biological Sciences, Earth Sciences, Molecular Sciences and Physics coursework.' },
]

const assessmentSupportItems = [
  'Essays', 'Reports', 'Case studies', 'Presentations', 'Research', 'Literature reviews', 'Projects',
  'Data analysis', 'Programming projects', 'Lab reports', 'Proofreading', 'Referencing', 'Editing',
]

const howItWorks = [
  { step: '1', title: 'Share Your Assessment Requirements', desc: 'Provide the relevant task instructions or assessment brief.' },
  { step: '2', title: 'Tell Us What Support You Need', desc: 'Writing, proofreading, referencing, research, data analysis or subject guidance.' },
  { step: '3', title: 'Get Subject-Specific Support', desc: 'Receive support relevant to your course and unit.' },
  { step: '4', title: 'Review the Guidance', desc: 'Use the feedback and explanations to improve your own work.' },
  { step: '5', title: 'Complete Your Own Submission', desc: 'Ensure your final work follows UWA requirements and represents your own work.' },
]

const studentResources = [
  'UWA Assignment Writing Guide', 'UWA Referencing Guide', 'UWA Computer Science Study Guide',
  'UWA Business Report Guide', 'UWA Engineering Report Guide', 'UWA Science Lab Report Guide',
]

const faqs = [
  { q: 'What is University of Western Australia assignment help?', a: "Academic support built around UWA's course structure — covering computer science, engineering, business, law and science." },
  { q: 'Can you help with UWA computer science assignments?', a: 'Yes, including the Bachelor of Advanced Computer Science (Honours) and its Artificial Intelligence, Cybersecurity, and Quantum Computing specialisations.' },
  { q: 'Do you support UWA engineering assignments?', a: 'Yes, including reports and technical writing for the Bachelor and Master of Professional Engineering, including Software Engineering.' },
  { q: 'Can you help with UWA business assignments?', a: 'Yes, across UWA Business School disciplines: Accounting and Finance, Economics, Management and Organisations, and Marketing.' },
  { q: 'Do you provide UWA law academic support?', a: 'Yes — academic writing, research and referencing support for law coursework. This is not legal advice.' },
  { q: 'Can you help with UWA science lab reports?', a: 'Yes, including lab reports and research writing across Biological Sciences, Earth Sciences, Molecular Sciences and Physics.' },
  { q: 'Do you support UWA health-related coursework?', a: 'Yes — academic writing and research support. This is not clinical or medical advice.' },
  { q: 'Can you help with UWA cybersecurity assessments?', a: 'Yes, including the International Cybersecurity Computing and Data Science specialisation within Advanced Computer Science.' },
  { q: 'Do you provide UWA proofreading and referencing support?', a: 'Yes — proofreading, editing and referencing across APA, Harvard and other styles, matched to your specific course.' },
  { q: 'Can you help me understand my UWA assessment brief?', a: "Yes — upload your assessment brief and get guidance on what's being asked and how to structure your response." },
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
    { '@type': 'ListItem', position: 3, name: 'University of Western Australia Assignment Help', item: 'https://www.stackassignment.com/universities/university-of-western-australia' },
  ],
}

export default function UWAPage() {
  return (
    <main className="flex-grow">
      <StructuredData data={[faqSchema, breadcrumbSchema]} />

      <div className="max-w-5xl mx-auto px-6 pt-6 text-sm text-gray-500 dark:text-slate-400">
        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
        <span className="mx-2">›</span><span>Universities</span><span className="mx-2">›</span>
        <span className="text-gray-700 dark:text-gray-300">University of Western Australia Assignment Help</span>
      </div>

      <section className="relative text-white py-24 md:py-36 overflow-hidden mt-6">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(135deg, rgba(30,41,59,0.95), rgba(15,23,42,0.97)), url(https://picsum.photos/id/1088/1920/1080)' }} />
        <div className="absolute rounded-full blur-3xl opacity-30 animate-float" style={{ top: '8%', left: '6%', width: '320px', height: '320px', background: 'radial-gradient(circle, #6366f1, transparent 70%)' }} />
        <div className="absolute rounded-full blur-3xl opacity-25 animate-float" style={{ bottom: '10%', right: '8%', width: '280px', height: '280px', background: 'radial-gradient(circle, #a855f7, transparent 70%)', animationDelay: '7s' }} />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 rounded-full px-5 py-2 text-sm font-semibold mb-8 backdrop-blur-sm"><GraduationCap className="w-4 h-4" />For University of Western Australia (UWA) Students</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>University of Western Australia Assignment Help</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-10 font-medium">
            Academic support, assessment guidance, proofreading and research assistance for
            UWA students in Perth.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/order" className="bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-10 py-4 rounded-xl text-lg font-bold transition shadow-xl shadow-yellow-400/30 hover:shadow-2xl hover:scale-105 active:scale-95 min-w-[240px]">Get Academic Support</Link>
            <Link href="#uwa-courses" className="border-2 border-white/70 hover:bg-white/10 px-10 py-4 rounded-xl text-lg font-semibold transition min-w-[240px]">Request a Quote</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            The University of Western Australia (UWA) is a Group of Eight research university in
            Perth, teaching across schools including the Business School (established 1911),
            School of Engineering, School of Physics, Mathematics and Computing, Law School, and
            Medical School. Its Bachelor of Advanced Computer Science (Honours) offers
            specialisations in Artificial Intelligence, International Cybersecurity Computing and
            Data Science, and Quantum Computing.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Stack Assignment provides academic support for UWA students — covering academic writing
            guidance, research assistance, referencing help, proofreading and subject-specific
            support across computer science, engineering, business, law and science.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Support is delivered entirely online, matched to your unit and assessment brief rather
            than a generic template.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Sora, sans-serif' }}>Why Choose Stack Assignment for UWA Students?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="bg-white dark:bg-slate-800 rounded-2xl p-7 shadow-md border border-gray-100 dark:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4"><item.icon className="w-7 h-7 text-white" /></div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="uwa-courses" className="py-16 bg-white dark:bg-slate-950 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Sora, sans-serif' }}>UWA Courses We Support</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courseAreas.map((course) => {
              const inner = (<>
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center mb-4"><course.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" /></div>
                <h3 className="font-bold text-base mb-1.5">{course.title}</h3>
                <p className="text-gray-500 dark:text-slate-400 text-xs leading-relaxed">{course.desc}</p>
              </>)
              if (course.anchor) return <a key={course.title} href={course.anchor} className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-800 block">{inner}</a>
              return <div key={course.title} className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">{inner}</div>
            })}
          </div>
        </div>
      </section>

      <section id="uwa-cs" className="py-14 bg-gray-50 dark:bg-slate-900 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}><Code2 className="w-6 h-6 text-indigo-600" />UWA Computer Science Assignment Help</h2>
          <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm mb-3">Support across the Bachelor of Advanced Computer Science (Honours) [BH008] specialisations:</p>
          <div className="grid sm:grid-cols-3 gap-2">
            {['Artificial Intelligence', 'International Cybersecurity Computing and Data Science', 'Quantum Computing'].map((s) => (
              <div key={s} className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-lg px-3 py-2 text-sm border border-gray-100 dark:border-slate-700"><CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />{s}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="uwa-business" className="py-14 bg-white dark:bg-slate-950 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}><DollarSign className="w-6 h-6 text-indigo-600" />UWA Business Assignment Help</h2>
          <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm mb-3">
            UWA Business School (established 1911) covers four disciplines — support available across all four:
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            {['Accounting and Finance', 'Economics', 'Management and Organisations', 'Marketing'].map((s) => (
              <div key={s} className="flex items-center gap-2 bg-gray-50 dark:bg-slate-800 rounded-lg px-3 py-2 text-sm border border-gray-100 dark:border-slate-700"><CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />{s}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ fontFamily: 'Sora, sans-serif' }}>UWA Assessment Support</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {assessmentSupportItems.map((item) => (
              <div key={item} className="flex items-center gap-2.5 bg-white dark:bg-slate-800 rounded-xl px-4 py-3.5 border border-gray-100 dark:border-slate-700">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /><span className="text-sm font-medium text-gray-700 dark:text-gray-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 flex items-center justify-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}><Bot className="w-8 h-8 text-indigo-600" />Referencing & Responsible AI</h2>
          <div className="bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-700 rounded-2xl p-7">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Referencing requirements can vary by course at UWA — always follow the style
              specified for your specific assessment.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Students should check their current course and assessment requirements before using
              generative AI in assessed work, and follow UWA's academic-integrity requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>Academic Integrity & Responsible Academic Support</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-7 border border-gray-100 dark:border-slate-700">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Stack Assignment is not affiliated with, endorsed by, or partnered with the University
              of Western Australia. Our services support understanding assessment requirements,
              research guidance, academic writing, proofreading, editing, referencing and data
              analysis guidance. Students remain fully responsible for their own final submissions
              and must follow UWA's academic-integrity requirements.
            </p>
            <Link href="/integrity" className="text-indigo-600 dark:text-indigo-400 underline font-medium text-sm">Read our full Academic Integrity policy</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>UWA Academic Support in Perth and Online</h2>
          <p className="text-gray-600 dark:text-slate-400 leading-relaxed mb-6">Support is delivered online regardless of your UWA course or campus.</p>
          <span className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-1.5 rounded-full text-sm font-semibold"><MapPin className="w-3.5 h-3.5" />Crawley, Perth</span>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Sora, sans-serif' }}>How It Works</h2>
          <div className="space-y-5">
            {howItWorks.map((item) => (
              <div key={item.step} className="flex gap-5 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold flex-shrink-0">{item.step}</div>
                <div><h3 className="font-bold text-base mb-1">{item.title}</h3><p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ fontFamily: 'Sora, sans-serif' }}>UWA Student Resources</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {studentResources.map((item) => (
              <div key={item} className="flex items-center justify-between bg-gray-50 dark:bg-slate-800 rounded-xl px-4 py-3.5 border border-gray-100 dark:border-slate-700">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{item}</span><span className="text-xs text-gray-400 dark:text-slate-500 flex-shrink-0 ml-3">Coming soon</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ fontFamily: 'Sora, sans-serif' }}>Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((item) => (
              <div key={item.q} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 transition hover:shadow-md">
                <h3 className="font-bold text-lg mb-2 flex items-start gap-2"><MessageCircle className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />{item.q}</h3>
                <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed pl-7">{item.a}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-slate-500 mt-6">Read our full <Link href="/integrity" className="text-indigo-600 dark:text-indigo-400 underline font-medium">Academic Integrity policy</Link> before ordering.</p>
        </div>
      </section>

      <section className="py-10 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wide">Other University Assignment Support</h3>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link href="/kaplan-assignment-help" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Kaplan Business School</Link><span className="text-gray-300 dark:text-slate-700">·</span>
            <Link href="/universities/unsw-sydney" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">UNSW Sydney</Link><span className="text-gray-300 dark:text-slate-700">·</span>
            <Link href="/universities/deakin-university" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Deakin University</Link>
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, white 0%, transparent 8%), radial-gradient(circle at 80% 70%, white 0%, transparent 6%)' }} />
        <div className="max-w-3xl mx-auto px-6 text-center text-white relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Need Support With Your UWA Assessment?</h2>
          <p className="text-lg opacity-90 mb-8">Get subject-specific academic guidance for writing, research, computer science, engineering and business.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/order" className="inline-block bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-10 py-4 rounded-xl text-lg font-bold transition shadow-xl shadow-yellow-400/30 hover:shadow-2xl hover:scale-105 active:scale-95">Get Academic Support</Link>
            <Link href="/order" className="inline-block border-2 border-white/70 hover:bg-white/10 px-10 py-4 rounded-xl text-lg font-semibold transition">Request a Quote</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
