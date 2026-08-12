import { Metadata } from 'next'
import Link from 'next/link'
import {
  CheckCircle2, MapPin, FileText, ShieldCheck, GraduationCap, MessageCircle, Code2,
  Briefcase, Award, Network, ShieldAlert, Bot, PenTool, UtensilsCrossed,
} from 'lucide-react'
import { StructuredData } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  title: 'Victorian Institute of Technology Assignment Help | VIT Academic Support',
  description:
    'Academic support for VIT students in IT, business, MBA, cybersecurity, networking, software engineering, analytics, hospitality and more.',
  keywords: [
    'Victorian Institute of Technology assignment help', 'VIT assignment help Australia', 'VIT assessment help',
    'VIT academic support', 'VIT BITS assignment help', 'VIT MITS assignment help', 'VIT MBA assignment help',
    'VIT business assignment help', 'VIT cybersecurity assignment help', 'VIT networking assignment help',
    'VIT software engineering assignment help', 'VIT business analytics assignment help',
  ],
  openGraph: {
    title: 'Victorian Institute of Technology Assignment Help | VIT Academic Support',
    description: 'Academic support for VIT students in IT, business, MBA, cybersecurity, networking and more.',
    url: 'https://www.stackassignment.com/universities/victorian-institute-of-technology',
    type: 'website',
  },
  alternates: { canonical: 'https://www.stackassignment.com/universities/victorian-institute-of-technology' },
}

const campuses = ['Sydney', 'Melbourne', 'Geelong', 'Adelaide']

const whyChooseUs = [
  { icon: GraduationCap, title: 'VIT-Focused Support', desc: 'Support matched to VIT\'s actual BITS, MITS, MBA and BBus specialisation structure.' },
  { icon: Briefcase, title: 'Specialisation-Specific Guidance', desc: 'From AI/Analytics and Cyber Security through to Finance and Tourism specialisations.' },
  { icon: FileText, title: 'Assessment Brief Guidance', desc: 'Help understanding what a specific assessment is actually asking for.' },
  { icon: PenTool, title: 'Academic Writing Support', desc: 'Structure, clarity, argument and academic tone across reports and case studies.' },
  { icon: CheckCircle2, title: 'Referencing Guidance', desc: 'Support with APA, Harvard and other styles, matched to your specific unit.' },
  { icon: ShieldCheck, title: 'Confidential Online Support', desc: 'A straightforward, confidential service for VIT students at any campus.' },
]

interface CourseArea { icon: typeof Briefcase; title: string; desc: string; anchor?: string }
const courseAreas: CourseArea[] = [
  { icon: Code2, title: 'BITS', desc: 'Bachelor of Information Technology and Systems — AI & Analytics, Application Development, Cyber Security and Networking specialisations.', anchor: '#vit-bits' },
  { icon: Network, title: 'MITS', desc: 'Master of Information Technology and Systems — Software Engineering, Business Analytics, Information Systems and Cyber Security specialisations.', anchor: '#vit-mits' },
  { icon: Award, title: 'MBA', desc: 'Finance, Information Systems, Leadership & Management, Tourism & Hospitality Management, and Project Management specialisations.', anchor: '#vit-mba' },
  { icon: Briefcase, title: 'BBus', desc: 'International Business, Tourism & Hospitality, Accounting, HR Management, Marketing and Business Technology specialisations.', anchor: '#vit-bbus' },
  { icon: UtensilsCrossed, title: 'Vocational', desc: 'Certificate and Diploma-level IT and hospitality qualifications, including Kitchen Management and Commercial Cookery.' },
]

const assessmentSupportItems = [
  'Essays', 'Reports', 'Case studies', 'Presentations', 'Research', 'Projects', 'Business plans',
  'Data analysis', 'Programming projects', 'Network design projects', 'Proofreading', 'Referencing',
]

const howItWorks = [
  { step: '1', title: 'Share Your Assessment Requirements', desc: 'Provide the relevant task instructions or assessment brief.' },
  { step: '2', title: 'Tell Us What Support You Need', desc: 'Writing, proofreading, referencing, research, data analysis or subject guidance.' },
  { step: '3', title: 'Get Subject-Specific Support', desc: 'Receive support relevant to your course and specialisation.' },
  { step: '4', title: 'Review the Guidance', desc: 'Use the feedback and explanations to improve your own work.' },
  { step: '5', title: 'Complete Your Own Submission', desc: 'Ensure your final work follows VIT requirements and represents your own work.' },
]

const studentResources = [
  'VIT Assignment Writing Guide', 'VIT Referencing Guide', 'VIT BITS Study Guide', 'VIT MITS Study Guide',
  'VIT Cybersecurity Guide', 'VIT Networking Guide', 'VIT MBA Study Guide', 'VIT Business Analytics Guide',
  'VIT Tourism & Hospitality Report Guide', 'VIT Presentation Guide',
]

const faqs = [
  { q: 'What is Victorian Institute of Technology assignment help?', a: 'Academic support built around VIT\'s actual course structure — BITS, MITS, MBA, BBus and vocational qualifications, matched to their real specialisations.' },
  { q: 'Can you help with VIT BITS assessments?', a: 'Yes, across all four BITS specialisations: AI & Analytics, Application Development, Cyber Security and Networking.' },
  { q: 'Can you help with VIT MITS?', a: 'Yes, across all four MITS specialisations: Software Engineering, Business Analytics, Information Systems and Cyber Security, plus the Graduate Diploma and Graduate Certificate pathways.' },
  { q: 'Do you provide VIT MBA assignment support?', a: 'Yes, across all five MBA specialisations: Finance, Information Systems, Leadership & Management, Tourism and Hospitality Management, and Project Management.' },
  { q: 'Can you help with VIT cybersecurity assessments?', a: 'Yes — both the BITS Cyber Security specialisation and MITS Cyber Security specialisation.' },
  { q: 'Do you provide VIT networking assignment help?', a: 'Yes, including the BITS Networking specialisation.' },
  { q: 'Can you help with VIT software engineering assessments?', a: 'Yes — the MITS Software Engineering specialisation, including programming and systems design assessments.' },
  { q: 'Do you support VIT business analytics assignments?', a: 'Yes, across both the MITS Business Analytics specialisation and general data analysis assessments.' },
  { q: 'Can you help with VIT Bachelor of Business assignments?', a: 'Yes, across BBus specialisations: International Business Management, Tourism and Hospitality Management, Accounting, HR Management, Marketing and Business Technology.' },
  { q: 'Do you support VIT tourism and hospitality assessments?', a: 'Yes, across both the BBus and MBA Tourism and Hospitality Management specialisations.' },
  { q: 'Do you provide VIT proofreading and referencing support?', a: 'Yes — proofreading, editing and referencing across APA, Harvard and other styles, matched to your specific unit.' },
  { q: 'Can you help me understand my VIT assessment requirements?', a: 'Yes — upload your assessment brief and get guidance on what\'s being asked and how to structure your response.' },
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
    { '@type': 'ListItem', position: 3, name: 'Victorian Institute of Technology Assignment Help', item: 'https://www.stackassignment.com/universities/victorian-institute-of-technology' },
  ],
}

export default function VITPage() {
  return (
    <main className="flex-grow">
      <StructuredData data={[faqSchema, breadcrumbSchema]} />

      <div className="max-w-5xl mx-auto px-6 pt-6 text-sm text-gray-500 dark:text-slate-400">
        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
        <span className="mx-2">›</span><span>Universities</span><span className="mx-2">›</span>
        <span className="text-gray-700 dark:text-gray-300">Victorian Institute of Technology Assignment Help</span>
      </div>

      <section className="relative text-white py-24 md:py-36 overflow-hidden mt-6">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(135deg, rgba(30,41,59,0.95), rgba(15,23,42,0.97)), url(https://picsum.photos/id/1074/1920/1080)' }} />
        <div className="absolute rounded-full blur-3xl opacity-30 animate-float" style={{ top: '8%', left: '6%', width: '320px', height: '320px', background: 'radial-gradient(circle, #6366f1, transparent 70%)' }} />
        <div className="absolute rounded-full blur-3xl opacity-25 animate-float" style={{ bottom: '10%', right: '8%', width: '280px', height: '280px', background: 'radial-gradient(circle, #a855f7, transparent 70%)', animationDelay: '7s' }} />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 rounded-full px-5 py-2 text-sm font-semibold mb-8 backdrop-blur-sm"><GraduationCap className="w-4 h-4" />For Victorian Institute of Technology (VIT) Students</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>Victorian Institute of Technology Assignment Help</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-10 font-medium">
            Academic support for VIT students in IT, business, MBA, cybersecurity, networking,
            software engineering, analytics, hospitality and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/order" className="bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-10 py-4 rounded-xl text-lg font-bold transition shadow-xl shadow-yellow-400/30 hover:shadow-2xl hover:scale-105 active:scale-95 min-w-[240px]">Get Academic Support</Link>
            <Link href="#vit-courses" className="border-2 border-white/70 hover:bg-white/10 px-10 py-4 rounded-xl text-lg font-semibold transition min-w-[240px]">View Services</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            The Victorian Institute of Technology (VIT) is built heavily around specialisation —
            its Bachelor and Master of Information Technology and Systems (BITS and MITS), MBA, and
            Bachelor of Business all branch into named specialisations, from AI & Analytics and
            Cyber Security through to Finance and Tourism & Hospitality Management.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            That specialisation-first structure means VIT assessments are often closely tied to a
            named stream rather than a generic subject — a BITS Cyber Security assessment looks
            different from a BITS Networking one, even within the same degree. Stack Assignment
            provides academic support for VIT students across Australia, matched to your actual
            specialisation and unit rather than a generic template.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Whether you study at VIT's Sydney, Melbourne, Geelong or Adelaide campus, or fully
            online, support works the same way.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Sora, sans-serif' }}>Why Choose Stack Assignment for VIT Students?</h2>
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

      <section id="vit-courses" className="py-16 bg-white dark:bg-slate-950 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Sora, sans-serif' }}>VIT Courses We Support</h2>
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

      <section id="vit-bits" className="py-14 bg-gray-50 dark:bg-slate-900 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}><Code2 className="w-6 h-6 text-indigo-600" />VIT Bachelor of Information Technology and Systems (BITS) Support</h2>
          <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm mb-3">Support across all four verified BITS specialisations:</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {['Artificial Intelligence and Analytics', 'Application Development', 'Cyber Security', 'Networking'].map((s) => (
              <div key={s} className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-lg px-3 py-2 text-sm border border-gray-100 dark:border-slate-700"><CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />{s}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="vit-mits" className="py-14 bg-white dark:bg-slate-950 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}><Network className="w-6 h-6 text-indigo-600" />VIT Master of Information Technology and Systems (MITS) Support</h2>
          <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm mb-3">Support across all four verified MITS specialisations, plus the Graduate Diploma (GDITS) and Graduate Certificate (GCITS) pathways:</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {['Software Engineering', 'Business Analytics', 'Information Systems', 'Cyber Security'].map((s) => (
              <div key={s} className="flex items-center gap-2 bg-gray-50 dark:bg-slate-800 rounded-lg px-3 py-2 text-sm border border-gray-100 dark:border-slate-700"><CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />{s}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="vit-mba" className="py-14 bg-gray-50 dark:bg-slate-900 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}><Award className="w-6 h-6 text-indigo-600" />VIT MBA Assignment Help</h2>
          <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm mb-3">Support across all five verified MBA specialisations, plus the Graduate Diploma (GDBA) and Graduate Certificate (GCBA) of Business Administration:</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {['Finance', 'Information Systems', 'Leadership and Management', 'Tourism and Hospitality Management', 'Project Management'].map((s) => (
              <div key={s} className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-lg px-3 py-2 text-sm border border-gray-100 dark:border-slate-700"><CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />{s}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="vit-bbus" className="py-14 bg-white dark:bg-slate-950 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}><Briefcase className="w-6 h-6 text-indigo-600" />VIT Bachelor of Business (BBus) Assignment Help</h2>
          <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm mb-3">Support across all six verified BBus specialisations, plus the Diploma of Business (DipBus):</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {['International Business Management', 'Tourism and Hospitality Management', 'Accounting', 'Human Resource Management', 'Marketing', 'Business Technology'].map((s) => (
              <div key={s} className="flex items-center gap-2 bg-gray-50 dark:bg-slate-800 rounded-lg px-3 py-2 text-sm border border-gray-100 dark:border-slate-700"><CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />{s}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}><ShieldAlert className="w-6 h-6 text-indigo-600" />VIT Vocational Assessment Support</h2>
          <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm">
            Academic and documentation support for VIT's vocational qualifications, including
            Certificate IV in Information Technology, Diploma and Advanced Diploma of Information
            Technology, and hospitality qualifications through to Advanced Diploma of Hospitality
            Management. This covers written assessment support only — not a substitute for
            practical competency requirements.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ fontFamily: 'Sora, sans-serif' }}>VIT Assessment Support</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {assessmentSupportItems.map((item) => (
              <div key={item} className="flex items-center gap-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl px-4 py-3.5 border border-gray-100 dark:border-slate-700">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /><span className="text-sm font-medium text-gray-700 dark:text-gray-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>VIT Referencing & Responsible AI</h2>
          <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-7">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Referencing requirements can vary by unit at VIT — always follow the style specified
              for your specific assessment. Support covers APA, Harvard, in-text citations and
              reference lists.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex items-start gap-2">
              <Bot className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
              On generative AI: always follow VIT's current assessment instructions and
              academic-integrity requirements before using AI tools in assessed work.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>Academic Integrity & Responsible Academic Support</h2>
          <div className="bg-gray-50 dark:bg-slate-900 rounded-2xl p-7 border border-gray-100 dark:border-slate-700">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Stack Assignment is not affiliated with, endorsed by, or partnered with the Victorian
              Institute of Technology. Our services support understanding assessment requirements,
              research guidance, academic writing, proofreading, editing, referencing and data
              analysis guidance. Students remain fully responsible for their own final submissions
              and must follow VIT's academic-integrity requirements.
            </p>
            <Link href="/integrity" className="text-indigo-600 dark:text-indigo-400 underline font-medium text-sm">Read our full Academic Integrity policy</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>VIT Academic Support Across Australia</h2>
          <p className="text-gray-600 dark:text-slate-400 leading-relaxed mb-6">Support is delivered online regardless of which VIT campus you study at.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {campuses.map((c) => (<span key={c} className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-1.5 rounded-full text-sm font-semibold"><MapPin className="w-3.5 h-3.5" />{c}</span>))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Sora, sans-serif' }}>How It Works</h2>
          <div className="space-y-5">
            {howItWorks.map((item) => (
              <div key={item.step} className="flex gap-5 bg-gray-50 dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold flex-shrink-0">{item.step}</div>
                <div><h3 className="font-bold text-base mb-1">{item.title}</h3><p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ fontFamily: 'Sora, sans-serif' }}>VIT Student Resources</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {studentResources.map((item) => (
              <div key={item} className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-xl px-4 py-3.5 border border-gray-100 dark:border-slate-700">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{item}</span><span className="text-xs text-gray-400 dark:text-slate-500 flex-shrink-0 ml-3">Coming soon</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ fontFamily: 'Sora, sans-serif' }}>Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((item) => (
              <div key={item.q} className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 transition hover:shadow-md">
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
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wide">Other Australian University Academic Support</h3>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link href="/kaplan-assignment-help" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Kaplan Business School</Link><span className="text-gray-300 dark:text-slate-700">·</span>
            <Link href="/universities/cquniversity" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">CQUniversity</Link><span className="text-gray-300 dark:text-slate-700">·</span>
            <Link href="/universities/apic" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">APIC</Link><span className="text-gray-300 dark:text-slate-700">·</span>
            <Link href="/holmes-institute-assignment-help" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Holmes Institute</Link><span className="text-gray-300 dark:text-slate-700">·</span>
            <Link href="/universities/torrens-university" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Torrens University</Link><span className="text-gray-300 dark:text-slate-700">·</span>
            <Link href="/universities/victoria-university" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Victoria University</Link>
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, white 0%, transparent 8%), radial-gradient(circle at 80% 70%, white 0%, transparent 6%)' }} />
        <div className="max-w-3xl mx-auto px-6 text-center text-white relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Need Support With Your VIT Assessment?</h2>
          <p className="text-lg opacity-90 mb-8">Get subject-specific academic guidance for writing, research, IT, business, MBA and other VIT study areas.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/order" className="inline-block bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-10 py-4 rounded-xl text-lg font-bold transition shadow-xl shadow-yellow-400/30 hover:shadow-2xl hover:scale-105 active:scale-95">Get Academic Support</Link>
            <Link href="/order" className="inline-block border-2 border-white/70 hover:bg-white/10 px-10 py-4 rounded-xl text-lg font-semibold transition">Request a Quote</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
