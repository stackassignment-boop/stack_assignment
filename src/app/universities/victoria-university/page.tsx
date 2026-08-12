import { Metadata } from 'next'
import Link from 'next/link'
import {
  CheckCircle2, MapPin, FileText, ShieldCheck, GraduationCap, MessageCircle, Code2,
  Briefcase, HeartPulse, HardHat, School, UtensilsCrossed, Scale, Bot, PenTool, Wrench,
} from 'lucide-react'
import { StructuredData } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  title: 'Victoria University Assignment Help Australia | VU Academic Support',
  description:
    'Academic support for VU university, VU Online and TAFE students across IT, cyber security, data science, business, health, education, engineering and more.',
  keywords: [
    'Victoria University assignment help', 'VU assignment help', 'VU assessment help',
    'Victoria University academic support', 'VU IT assignment help', 'VU cyber security assignment help',
    'VU data science assignment help', 'VU business assignment help', 'VU nursing assignment help',
    'VU TAFE assignment help', 'VU Online assignment help',
  ],
  openGraph: {
    title: 'Victoria University Assignment Help Australia | VU Academic Support',
    description: 'Academic support for VU university, VU Online and TAFE students across IT, business, health, education and more.',
    url: 'https://www.stackassignment.com/universities/victoria-university',
    type: 'website',
  },
  alternates: { canonical: 'https://www.stackassignment.com/universities/victoria-university' },
}

const campuses = ['Footscray Park', 'City Tower (Melbourne)', 'Sydney', 'Brisbane', 'VU Online']

const whyChooseUs = [
  { icon: GraduationCap, title: 'VU-Focused Support', desc: 'Support matched to VU\'s distinctive Block Model\u00ae (one subject at a time) study structure.' },
  { icon: Briefcase, title: 'University + TAFE Coverage', desc: 'Support across VU\'s university, TAFE and VU Online offerings.' },
  { icon: FileText, title: 'Assessment Brief Guidance', desc: 'Help interpreting marking rubrics and assessment briefs so you know exactly what\'s required.' },
  { icon: PenTool, title: 'Academic Writing Support', desc: 'Guidance on structure, clarity, argument and academic tone across reports and essays.' },
  { icon: CheckCircle2, title: 'Referencing Guidance', desc: 'Support with APA, Harvard and other styles, matched to your specific unit.' },
  { icon: ShieldCheck, title: 'Confidential Online Support', desc: 'A straightforward, confidential service for VU students at any campus, or fully online.' },
]

interface CourseArea { icon: typeof Briefcase; title: string; desc: string; anchor?: string }
const courseAreas: CourseArea[] = [
  { icon: Code2, title: 'IT, Cyber Security & Data Science', desc: 'Information technology, cybersecurity, data science, software development and AI.', anchor: '#vu-it' },
  { icon: Briefcase, title: 'Business', desc: 'Business, accounting, marketing, management, finance and business analytics.', anchor: '#vu-business' },
  { icon: HeartPulse, title: 'Health, Biomedicine & Nursing', desc: 'Nursing, health, biomedical science and public health programs.' },
  { icon: HardHat, title: 'Engineering, Science & Built Environment', desc: 'Engineering, science, mathematics and built environment programs.' },
  { icon: School, title: 'Education & Early Childhood', desc: 'Early childhood, education, teaching and educational leadership.' },
  { icon: UtensilsCrossed, title: 'Hospitality, Tourism & Events', desc: 'Hospitality, tourism, events and hotel management.' },
  { icon: Scale, title: 'Law, Justice & Legal Practice', desc: 'Law, criminal justice and legal practice academic support.' },
  { icon: Wrench, title: 'TAFE', desc: 'Academic and documentation support for VU TAFE written assessments and reports.' },
]

const assessmentSupportItems = [
  'Essays', 'Reports', 'Case studies', 'Presentations', 'Research', 'Projects', 'Reflective writing',
  'Data analysis', 'Programming projects', 'Business reports', 'Nursing assessments', 'Proofreading', 'Referencing',
]

const howItWorks = [
  { step: '1', title: 'Share Your Assessment Requirements', desc: 'Provide the relevant task instructions or assessment brief.' },
  { step: '2', title: 'Tell Us What Support You Need', desc: 'Writing, proofreading, referencing, research, data analysis or subject guidance.' },
  { step: '3', title: 'Get Subject-Specific Support', desc: 'Receive support relevant to your course and study area.' },
  { step: '4', title: 'Review the Guidance', desc: 'Use the feedback and explanations to improve your own work.' },
  { step: '5', title: 'Complete Your Own Submission', desc: 'Ensure your final work follows VU requirements and represents your own work.' },
]

const studentResources = [
  'VU Assignment Writing Guide', 'VU Referencing Guide', 'VU IT Study Guide', 'VU Cybersecurity Guide',
  'VU Data Science Guide', 'VU Business Report Guide', 'VU Nursing Assignment Guide',
  'VU Block Model Study Guide', 'VU TAFE Assessment Guide', 'VU Online Study Guide',
]

const faqs = [
  { q: 'What is Victoria University assignment help?', a: 'Academic support built around VU\'s course structure — covering university, TAFE and VU Online study, including its distinctive Block Model\u00ae, across IT, business, health, education and more.' },
  { q: 'Can you help with VU IT assessments?', a: 'Yes, including information technology, software development, networking and database assessments.' },
  { q: 'Can you help with VU cyber security assessments?', a: 'Yes — cybersecurity assignment and assessment support across VU\'s cyber security programs.' },
  { q: 'Do you support VU data science assignments?', a: 'Yes, including data analytics, statistics and data science project support.' },
  { q: 'Do you support VU TAFE assessments?', a: 'Yes — academic and documentation support for written VU TAFE assessments and reports. This doesn\'t replace practical competency assessment.' },
  { q: 'Can you help VU Online students?', a: 'Yes — support works the same for VU Online students as on-campus students.' },
  { q: 'Do you provide VU nursing academic support?', a: 'Yes — nursing academic writing, case studies and health research support. This is academic writing support, not clinical advice.' },
  { q: 'Can you help with VU business assignments?', a: 'Yes, including business reports, accounting, marketing and management assessments.' },
  { q: 'Do you provide VU engineering academic support?', a: 'Yes, including engineering reports, technical writing and project documentation.' },
  { q: 'Can you help with VU education assignments?', a: 'Yes, including education reports and early childhood coursework.' },
  { q: 'What is the VU Block Model\u00ae?', a: 'It\'s VU\'s distinctive teaching structure where you study one subject at a time in smaller classes, rather than juggling multiple subjects simultaneously — our support is matched to that pace.' },
  { q: 'Do you provide VU proofreading and referencing support?', a: 'Yes — proofreading, editing and referencing across APA, Harvard and other styles, matched to your specific unit.' },
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
    { '@type': 'ListItem', position: 3, name: 'Victoria University Assignment Help', item: 'https://www.stackassignment.com/universities/victoria-university' },
  ],
}

export default function VictoriaUniversityPage() {
  return (
    <main className="flex-grow">
      <StructuredData data={[faqSchema, breadcrumbSchema]} />

      <div className="max-w-5xl mx-auto px-6 pt-6 text-sm text-gray-500 dark:text-slate-400">
        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
        <span className="mx-2">›</span><span>Universities</span><span className="mx-2">›</span>
        <span className="text-gray-700 dark:text-gray-300">Victoria University Assignment Help</span>
      </div>

      <section className="relative text-white py-24 md:py-36 overflow-hidden mt-6">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(135deg, rgba(30,41,59,0.95), rgba(15,23,42,0.97)), url(https://picsum.photos/id/1063/1920/1080)' }} />
        <div className="absolute rounded-full blur-3xl opacity-30 animate-float" style={{ top: '8%', left: '6%', width: '320px', height: '320px', background: 'radial-gradient(circle, #6366f1, transparent 70%)' }} />
        <div className="absolute rounded-full blur-3xl opacity-25 animate-float" style={{ bottom: '10%', right: '8%', width: '280px', height: '280px', background: 'radial-gradient(circle, #a855f7, transparent 70%)', animationDelay: '7s' }} />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 rounded-full px-5 py-2 text-sm font-semibold mb-8 backdrop-blur-sm"><GraduationCap className="w-4 h-4" />For Victoria University (VU) Students</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>Victoria University Assignment Help Australia</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-10 font-medium">
            Academic support for VU university, VU Online and TAFE students across IT, business,
            health, education, engineering, hospitality and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/order" className="bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-10 py-4 rounded-xl text-lg font-bold transition shadow-xl shadow-yellow-400/30 hover:shadow-2xl hover:scale-105 active:scale-95 min-w-[240px]">Get Academic Support</Link>
            <Link href="#vu-courses" className="border-2 border-white/70 hover:bg-white/10 px-10 py-4 rounded-xl text-lg font-semibold transition min-w-[240px]">View Services</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Victoria University (VU) offers TAFE, undergraduate, postgraduate, research and
            foundation courses, plus VU Online — all taught through VU's distinctive Block Model®,
            where students study one subject at a time in smaller classes rather than juggling
            several subjects simultaneously.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            That structure, combined with VU's genuinely broad course range — IT, cyber security
            and data science through to health, engineering, hospitality, law and trades — means
            students often need support at different points across a fast-moving single-subject
            term. Stack Assignment provides academic support for VU students across Australia,
            covering academic writing guidance, research assistance, referencing help, proofreading
            and subject-specific support matched to your actual unit.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Whether you study at Footscray Park, City Tower, Sydney, Brisbane or through VU Online,
            support works the same way.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Sora, sans-serif' }}>Why Choose Stack Assignment for VU Students?</h2>
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

      <section id="vu-courses" className="py-16 bg-white dark:bg-slate-950 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Sora, sans-serif' }}>Victoria University Courses & Subject Areas We Support</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
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

      <section id="vu-it" className="py-16 bg-gray-50 dark:bg-slate-900 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}><Code2 className="w-6 h-6 text-indigo-600" />Victoria University IT, Cyber Security & Data Science Assignment Help</h2>
          <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm">
            Support for information technology, cybersecurity, data science, software development,
            networking, database and AI/analytics assessments across VU's "IT, cyber security &amp;
            data science" study area.
          </p>
        </div>
      </section>

      <section id="vu-business" className="py-14 bg-white dark:bg-slate-950 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}><Briefcase className="w-6 h-6 text-indigo-600" />Victoria University Business Assignment Help</h2>
          <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm">
            Support for business, accounting, marketing, management, finance, business analytics,
            international business and entrepreneurship assessments.
          </p>
        </div>
      </section>

      <section className="py-14 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8" style={{ fontFamily: 'Sora, sans-serif' }}>Other VU Study Areas We Support</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
              <h3 className="font-bold mb-2 flex items-center gap-2"><HeartPulse className="w-5 h-5 text-indigo-600" />Health, Biomedicine & Nursing</h3>
              <p className="text-sm text-gray-600 dark:text-slate-400">Academic writing support for nursing, health and biomedical science coursework — not clinical advice.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
              <h3 className="font-bold mb-2 flex items-center gap-2"><HardHat className="w-5 h-5 text-indigo-600" />Engineering, Science & Built Environment</h3>
              <p className="text-sm text-gray-600 dark:text-slate-400">Engineering reports, technical writing, science and built environment project documentation.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
              <h3 className="font-bold mb-2 flex items-center gap-2"><School className="w-5 h-5 text-indigo-600" />Education & Early Childhood</h3>
              <p className="text-sm text-gray-600 dark:text-slate-400">Support for education reports, early childhood coursework and teaching-related assignments.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
              <h3 className="font-bold mb-2 flex items-center gap-2"><UtensilsCrossed className="w-5 h-5 text-indigo-600" />Hospitality, Tourism & Events</h3>
              <p className="text-sm text-gray-600 dark:text-slate-400">Hospitality, tourism and events management reports and case studies.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
              <h3 className="font-bold mb-2 flex items-center gap-2"><Scale className="w-5 h-5 text-indigo-600" />Law, Justice & Legal Practice</h3>
              <p className="text-sm text-gray-600 dark:text-slate-400">Academic support for law and criminal justice coursework — not legal advice.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
              <h3 className="font-bold mb-2 flex items-center gap-2"><Wrench className="w-5 h-5 text-indigo-600" />VU TAFE</h3>
              <p className="text-sm text-gray-600 dark:text-slate-400">Support for written TAFE assessments and reports — not a substitute for practical competency assessment.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ fontFamily: 'Sora, sans-serif' }}>VU Assessment Support</h2>
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 flex items-center justify-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}><Bot className="w-8 h-8 text-indigo-600" />VU Online & Responsible AI Support</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-7 border border-gray-100 dark:border-slate-700">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              For VU Online students, support works exactly the same as for on-campus students —
              writing, research, referencing, data analysis and subject guidance. On generative AI:
              always follow VU's current assessment instructions and academic-integrity
              requirements before using AI tools, verify any AI-generated information, and never
              misrepresent AI output as entirely your own where that isn't accurate.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>Academic Integrity & Responsible Academic Support</h2>
          <div className="bg-gray-50 dark:bg-slate-900 rounded-2xl p-7 border border-gray-100 dark:border-slate-700">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Stack Assignment is not affiliated with, endorsed by, or partnered with Victoria
              University. Our services support understanding assessment requirements, research
              guidance, academic writing, proofreading, editing, referencing and data analysis
              guidance. Students remain fully responsible for their own final submissions and must
              follow VU's academic-integrity requirements.
            </p>
            <Link href="/integrity" className="text-indigo-600 dark:text-indigo-400 underline font-medium text-sm">Read our full Academic Integrity policy</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>VU Academic Support Across Australia</h2>
          <p className="text-gray-600 dark:text-slate-400 leading-relaxed mb-6">Support is delivered online regardless of your VU campus, or if you study through VU Online.</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ fontFamily: 'Sora, sans-serif' }}>VU Student Resources</h2>
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
            <Link href="/universities/victorian-institute-of-technology" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Victorian Institute of Technology</Link>
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, white 0%, transparent 8%), radial-gradient(circle at 80% 70%, white 0%, transparent 6%)' }} />
        <div className="max-w-3xl mx-auto px-6 text-center text-white relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Need Support With Your Victoria University Assessment?</h2>
          <p className="text-lg opacity-90 mb-8">Get subject-specific academic guidance for writing, research, IT, business, health, engineering and other VU study areas.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/order" className="inline-block bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-10 py-4 rounded-xl text-lg font-bold transition shadow-xl shadow-yellow-400/30 hover:shadow-2xl hover:scale-105 active:scale-95">Get Academic Support</Link>
            <Link href="/order" className="inline-block border-2 border-white/70 hover:bg-white/10 px-10 py-4 rounded-xl text-lg font-semibold transition">Request a Quote</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
