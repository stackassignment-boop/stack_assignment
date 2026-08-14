import { Metadata } from 'next'
import Link from 'next/link'
import {
  CheckCircle2, MapPin, FileText, ShieldCheck, GraduationCap, MessageCircle, Code2,
  Briefcase, UtensilsCrossed, Megaphone, ShieldAlert, Bot, PenTool, DollarSign, Award,
} from 'lucide-react'
import { StructuredData } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  title: 'Academies Australasia Polytechnic Assignment Help | AAPoly Academic Support',
  description:
    'Academic support and assessment guidance for Academies Australasia Polytechnic (AAPoly) students in Melbourne, Sydney and Perth — business, IT, cyber security, hospitality and project management.',
  keywords: [
    'Academies Australasia Polytechnic assignment help', 'AAPoly assignment help', 'AAPoly assessment help',
    'AAPoly academic support', 'AAPoly IT assignment help', 'AAPoly cyber security assignment help',
    'AAPoly business assignment help', 'AAPoly hospitality assignment help', 'AAPoly project management assignment help',
  ],
  openGraph: {
    title: 'Academies Australasia Polytechnic Assignment Help | AAPoly Academic Support',
    description: 'Academic support for AAPoly students across business, IT, cyber security, hospitality and project management.',
    url: 'https://www.stackassignment.com/universities/academies-australasia-polytechnic',
    type: 'website',
  },
  alternates: { canonical: 'https://www.stackassignment.com/universities/academies-australasia-polytechnic' },
}

const campuses = ['Melbourne (Bourke Street)', 'Melbourne (Commercial Cookery, Carlton)', 'Sydney', 'Perth']

const whyChooseUs = [
  { icon: GraduationCap, title: 'AAPoly-Focused Support', desc: "Support matched to Academies Australasia Polytechnic's degree and vocational course structure." },
  { icon: Briefcase, title: 'Subject-Specific Guidance', desc: 'From IT and cyber security through to business, hospitality and project management.' },
  { icon: FileText, title: 'Assessment Brief Guidance', desc: 'Help interpreting marking rubrics and assessment briefs.' },
  { icon: PenTool, title: 'Academic Writing Support', desc: 'Structure, clarity, argument and academic tone across reports and essays.' },
  { icon: CheckCircle2, title: 'Referencing Guidance', desc: 'Support with APA, Harvard and other styles, matched to your specific unit.' },
  { icon: ShieldCheck, title: 'Confidential Online Support', desc: 'A straightforward, confidential service for AAPoly students at any campus.' },
]

interface CourseArea { icon: typeof Briefcase; title: string; desc: string }
const courseAreas: CourseArea[] = [
  { icon: Code2, title: 'Information Technology', desc: 'Master and Bachelor of Information Technology, plus vocational IT certificates and diplomas.' },
  { icon: ShieldAlert, title: 'Cyber Security', desc: 'Bachelor of Business (Cyber Security) — offered in Sydney and Melbourne.' },
  { icon: Megaphone, title: 'Digital Marketing', desc: 'Bachelor of Business (Digital Marketing) — offered in Sydney and Melbourne.' },
  { icon: Award, title: 'Leadership and Management', desc: 'Bachelor of Business (Leadership and Management), plus vocational Diploma and Advanced Diploma.' },
  { icon: UtensilsCrossed, title: 'Tourism and Hospitality', desc: 'Bachelor of Tourism and Hospitality Management, plus vocational hospitality and commercial cookery qualifications.' },
  { icon: DollarSign, title: 'Accounting', desc: 'Certificate IV, Diploma and Advanced Diploma of Accounting and Bookkeeping.' },
  { icon: Briefcase, title: 'Project Management', desc: 'Diploma and Advanced Diploma of Project Management.' },
]

const assessmentSupportItems = [
  'Essays', 'Reports', 'Case studies', 'Presentations', 'Research', 'Projects', 'Data analysis',
  'Programming projects', 'Business plans', 'Proofreading', 'Referencing', 'Editing',
]

const howItWorks = [
  { step: '1', title: 'Share Your Assessment Requirements', desc: 'Provide the relevant task instructions or assessment brief.' },
  { step: '2', title: 'Tell Us What Support You Need', desc: 'Writing, proofreading, referencing, research, data analysis or subject guidance.' },
  { step: '3', title: 'Get Subject-Specific Support', desc: 'Receive support relevant to your course and unit.' },
  { step: '4', title: 'Review the Guidance', desc: 'Use the feedback and explanations to improve your own work.' },
  { step: '5', title: 'Complete Your Own Submission', desc: 'Ensure your final work follows AAPoly requirements and represents your own work.' },
]

const studentResources = [
  'AAPoly Assignment Writing Guide', 'AAPoly Referencing Guide', 'AAPoly IT Study Guide',
  'AAPoly Cyber Security Guide', 'AAPoly Business Report Guide', 'AAPoly Hospitality Report Guide',
  'AAPoly Project Management Guide',
]

const faqs = [
  { q: 'What is Academies Australasia Polytechnic assignment help?', a: "Academic support built around AAPoly's course structure — covering IT, cyber security, business, hospitality, accounting and project management, at both degree and vocational level." },
  { q: 'Can you help with AAPoly IT assignments?', a: 'Yes, including the Master and Bachelor of Information Technology, plus vocational IT certificates and diplomas.' },
  { q: 'Do you support AAPoly cyber security assessments?', a: 'Yes — Bachelor of Business (Cyber Security) coursework, offered at AAPoly\'s Sydney and Melbourne campuses.' },
  { q: 'Can you help with AAPoly digital marketing assignments?', a: 'Yes, including Bachelor of Business (Digital Marketing) reports and case studies.' },
  { q: 'Do you provide AAPoly business assignment help?', a: 'Yes, across Bachelor of Business specialisations including Leadership and Management, plus vocational business qualifications.' },
  { q: 'Can you help with AAPoly hospitality assessments?', a: 'Yes, including the Bachelor of Tourism and Hospitality Management and vocational hospitality qualifications. This is academic writing support, not practical competency assistance.' },
  { q: 'Do you support AAPoly project management assignments?', a: 'Yes, including the Diploma and Advanced Diploma of Project Management.' },
  { q: 'Can you help with AAPoly accounting assignments?', a: 'Yes, including Certificate IV, Diploma and Advanced Diploma of Accounting and Bookkeeping.' },
  { q: 'Do you support AAPoly students in Perth?', a: 'Yes — support works the same whether you study at AAPoly\'s Melbourne, Sydney or Perth campus.' },
  { q: 'Do you provide AAPoly proofreading and referencing support?', a: 'Yes — proofreading, editing and referencing across APA, Harvard and other styles, matched to your specific unit.' },
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
    { '@type': 'ListItem', position: 3, name: 'Academies Australasia Polytechnic Assignment Help', item: 'https://www.stackassignment.com/universities/academies-australasia-polytechnic' },
  ],
}

export default function AAPolyPage() {
  return (
    <main className="flex-grow">
      <StructuredData data={[faqSchema, breadcrumbSchema]} />

      <div className="max-w-5xl mx-auto px-6 pt-6 text-sm text-gray-500 dark:text-slate-400">
        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
        <span className="mx-2">›</span><span>Universities</span><span className="mx-2">›</span>
        <span className="text-gray-700 dark:text-gray-300">Academies Australasia Polytechnic Assignment Help</span>
      </div>

      <section className="relative text-white py-24 md:py-36 overflow-hidden mt-6">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(135deg, rgba(30,41,59,0.95), rgba(15,23,42,0.97)), url(https://picsum.photos/id/1045/1920/1080)' }} />
        <div className="absolute rounded-full blur-3xl opacity-30 animate-float" style={{ top: '8%', left: '6%', width: '320px', height: '320px', background: 'radial-gradient(circle, #6366f1, transparent 70%)' }} />
        <div className="absolute rounded-full blur-3xl opacity-25 animate-float" style={{ bottom: '10%', right: '8%', width: '280px', height: '280px', background: 'radial-gradient(circle, #a855f7, transparent 70%)', animationDelay: '7s' }} />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 rounded-full px-5 py-2 text-sm font-semibold mb-8 backdrop-blur-sm"><GraduationCap className="w-4 h-4" />For Academies Australasia Polytechnic (AAPoly) Students</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>Academies Australasia Polytechnic Assignment Help</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-10 font-medium">
            Academic support, assessment guidance, proofreading and research assistance for
            AAPoly students in Melbourne, Sydney and Perth.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/order" className="bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-10 py-4 rounded-xl text-lg font-bold transition shadow-xl shadow-yellow-400/30 hover:shadow-2xl hover:scale-105 active:scale-95 min-w-[240px]">Get Academic Support</Link>
            <Link href="#aapoly-courses" className="border-2 border-white/70 hover:bg-white/10 px-10 py-4 rounded-xl text-lg font-semibold transition min-w-[240px]">Request a Quote</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Academies Australasia Polytechnic (AAPoly), part of the wider Academies Australasia
            Group, teaches degree courses in Melbourne, Sydney and Perth — spanning IT, cyber
            security, digital marketing, leadership and management, and tourism and hospitality
            management — alongside vocational qualifications in accounting, commercial cookery,
            marketing and project management.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Stack Assignment provides academic support for AAPoly students — covering academic
            writing guidance, research assistance, referencing help, proofreading and
            subject-specific support across IT, cyber security, business, hospitality and project
            management coursework, at both degree and vocational level.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Whether you study at AAPoly's Melbourne, Sydney or Perth campus, support is delivered
            online and works the same way.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Sora, sans-serif' }}>Why Choose Stack Assignment for AAPoly Students?</h2>
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

      <section id="aapoly-courses" className="py-16 bg-white dark:bg-slate-950 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>AAPoly Courses We Support</h2>
          <p className="text-center text-gray-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto text-sm">
            Verified against AAPoly's current course listing (Sydney &amp; Melbourne, Perth, and vocational).
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courseAreas.map((course) => (
              <div key={course.title} className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center mb-4"><course.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" /></div>
                <h3 className="font-bold text-base mb-1.5">{course.title}</h3>
                <p className="text-gray-500 dark:text-slate-400 text-xs leading-relaxed">{course.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ fontFamily: 'Sora, sans-serif' }}>AAPoly Assessment Support</h2>
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
              Referencing requirements can vary by unit at AAPoly — always follow the style
              specified for your specific assessment.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Students should check their current course and assessment requirements before using
              generative AI in assessed work, and follow AAPoly's academic-integrity requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>Academic Integrity & Responsible Academic Support</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-7 border border-gray-100 dark:border-slate-700">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Stack Assignment is not affiliated with, endorsed by, or partnered with Academies
              Australasia Polytechnic. Our services support understanding assessment requirements,
              research guidance, academic writing, proofreading, editing, referencing and data
              analysis guidance. Students remain fully responsible for their own final submissions
              and must follow AAPoly's academic-integrity requirements.
            </p>
            <Link href="/integrity" className="text-indigo-600 dark:text-indigo-400 underline font-medium text-sm">Read our full Academic Integrity policy</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>AAPoly Academic Support Across Australia</h2>
          <p className="text-gray-600 dark:text-slate-400 leading-relaxed mb-6">Support is delivered online regardless of which AAPoly campus you attend.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {campuses.map((c) => (<span key={c} className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-1.5 rounded-full text-sm font-semibold"><MapPin className="w-3.5 h-3.5" />{c}</span>))}
          </div>
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ fontFamily: 'Sora, sans-serif' }}>AAPoly Student Resources</h2>
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
            <Link href="/universities/apic" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">APIC</Link><span className="text-gray-300 dark:text-slate-700">·</span>
            <Link href="/universities/southern-cross-institute" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Southern Cross Institute</Link>
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, white 0%, transparent 8%), radial-gradient(circle at 80% 70%, white 0%, transparent 6%)' }} />
        <div className="max-w-3xl mx-auto px-6 text-center text-white relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Need Support With Your AAPoly Assessment?</h2>
          <p className="text-lg opacity-90 mb-8">Get subject-specific academic guidance for writing, research, IT, cyber security, business and hospitality.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/order" className="inline-block bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-10 py-4 rounded-xl text-lg font-bold transition shadow-xl shadow-yellow-400/30 hover:shadow-2xl hover:scale-105 active:scale-95">Get Academic Support</Link>
            <Link href="/order" className="inline-block border-2 border-white/70 hover:bg-white/10 px-10 py-4 rounded-xl text-lg font-semibold transition">Request a Quote</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
