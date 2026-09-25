import { Metadata } from 'next'
import Link from 'next/link'
import {
  CheckCircle2, MapPin, FileText, ShieldCheck, GraduationCap, MessageCircle, Code2,
  Briefcase, HeartPulse, Palette, ShieldAlert, Bot, PenTool, Scale,
} from 'lucide-react'
import { StructuredData } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  title: 'De Montfort University Assignment Help | DMU Academic Support UK',
  description:
    'Academic support and assessment guidance for De Montfort University (DMU) students in Leicester and London — computing, cybersecurity, business, law, health and design.',
  keywords: [
    'De Montfort University assignment help', 'DMU assignment help', 'DMU assessment help',
    'De Montfort University academic support', 'DMU computing assignment help',
    'DMU cybersecurity assignment help', 'DMU business assignment help', 'DMU law assignment help',
    'DMU report writing help',
  ],
  openGraph: {
    title: 'De Montfort University Assignment Help | DMU Academic Support UK',
    description: 'Academic support for DMU students across computing, cybersecurity, business, law, health and design.',
    url: 'https://www.stackassignment.com/universities/de-montfort-university',
    type: 'website',
  },
  alternates: { canonical: 'https://www.stackassignment.com/universities/de-montfort-university' },
}

const campuses = ['Leicester (main campus)', 'London (postgraduate)']

const whyChooseUs = [
  { icon: GraduationCap, title: 'DMU-Focused Support', desc: "Support matched to De Montfort University's faculty structure and UK marking conventions." },
  { icon: Briefcase, title: 'Subject-Specific Guidance', desc: 'From computing and cybersecurity through to business, law, health and design.' },
  { icon: FileText, title: 'Assessment Brief Guidance', desc: 'Help interpreting marking rubrics and assessment briefs.' },
  { icon: PenTool, title: 'Academic Writing Support', desc: 'Structure, clarity, argument and academic tone across essays and reports.' },
  { icon: CheckCircle2, title: 'Referencing Guidance', desc: 'Support with Harvard, APA and other UK referencing conventions.' },
  { icon: ShieldCheck, title: 'Confidential Online Support', desc: 'A straightforward, confidential service for DMU students in Leicester and London.' },
]

interface CourseArea { icon: typeof Briefcase; title: string; desc: string; anchor?: string }
const courseAreas: CourseArea[] = [
  { icon: Code2, title: 'Computing', desc: 'Business intelligence, database management, game development, IT consultancy, software engineering, machine learning and robotics.', anchor: '#dmu-computing' },
  { icon: ShieldAlert, title: 'Cybersecurity', desc: "DMU's Cyber Security Centre holds NCSC Academic Centre of Excellence gold-standard status." },
  { icon: Briefcase, title: 'Business & Law', desc: 'Business and Law faculty coursework, taught primarily from the Hugh Aston Building.' },
  { icon: HeartPulse, title: 'Health & Life Sciences', desc: 'Health-related coursework and academic writing support — not clinical advice.' },
  { icon: Palette, title: 'Art, Design & Humanities', desc: 'Design, humanities and creative subject academic support.' },
  { icon: Scale, title: 'Engineering', desc: 'Mechanical, electrical and civil engineering coursework via the Queens Building.' },
]

const assessmentSupportItems = [
  'Essays', 'Reports', 'Case studies', 'Presentations', 'Research', 'Dissertations', 'Projects',
  'Programming projects', 'Data analysis', 'Proofreading', 'Referencing', 'Editing',
]

const howItWorks = [
  { step: '1', title: 'Share Your Assessment Requirements', desc: 'Provide the relevant task instructions or assessment brief.' },
  { step: '2', title: 'Tell Us What Support You Need', desc: 'Writing, proofreading, referencing, research, data analysis or subject guidance.' },
  { step: '3', title: 'Get Subject-Specific Support', desc: 'Receive support relevant to your course and unit.' },
  { step: '4', title: 'Review the Guidance', desc: 'Use the feedback and explanations to improve your own work.' },
  { step: '5', title: 'Complete Your Own Submission', desc: 'Ensure your final work follows DMU requirements and represents your own work.' },
]

const studentResources = [
  'DMU Assignment Writing Guide', 'DMU Referencing Guide', 'DMU Cybersecurity Study Guide',
  'DMU Computing Study Guide', 'DMU Business Report Guide', 'DMU Dissertation Guide',
]

const faqs = [
  { q: 'What is De Montfort University assignment help?', a: "Academic support built around DMU's course structure — covering computing, cybersecurity, business, law, health and design, at its Leicester and London campuses." },
  { q: 'Can you help with DMU computing assignments?', a: 'Yes, including business intelligence, database management, game development, software engineering, machine learning and robotics coursework.' },
  { q: 'Do you support DMU cybersecurity assessments?', a: "Yes — DMU's Cyber Security Centre holds gold-standard 'Academic Centre of Excellence in Cyber Security Education' status from the UK's National Cyber Security Centre, and we support coursework across its cybersecurity programs." },
  { q: 'Can you help with DMU business and law assignments?', a: 'Yes, including business reports, case studies and law essays via the Faculty of Business and Law.' },
  { q: 'Do you provide DMU dissertation support?', a: 'Yes, including structure, research methodology, and referencing guidance for undergraduate and postgraduate dissertations.' },
  { q: 'Can you help with DMU engineering assignments?', a: 'Yes, including mechanical, electrical and civil engineering coursework.' },
  { q: 'Do you support DMU London campus students?', a: "Yes — support works the same whether you study at DMU's Leicester campus or its newer London postgraduate campus." },
  { q: 'Can you help with DMU health and life sciences assignments?', a: 'Yes — academic writing and research support. This is not clinical or medical advice.' },
  { q: 'Do you provide DMU proofreading and referencing support?', a: 'Yes — proofreading, editing and Harvard/APA referencing support, matched to your specific module.' },
  { q: 'Can you help me understand my DMU assessment brief?', a: "Yes — upload your assessment brief and get guidance on what's being asked and how to structure your response." },
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
    { '@type': 'ListItem', position: 3, name: 'De Montfort University Assignment Help', item: 'https://www.stackassignment.com/universities/de-montfort-university' },
  ],
}

export default function DeMontfortUniversityPage() {
  return (
    <main className="flex-grow">
      <StructuredData data={[faqSchema, breadcrumbSchema]} />

      <div className="max-w-5xl mx-auto px-6 pt-6 text-sm text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
        <span className="mx-2">›</span><span>Universities</span><span className="mx-2">›</span>
        <span className="text-slate-700 dark:text-slate-300">De Montfort University Assignment Help</span>
      </div>

      <section className="relative text-white py-24 md:py-36 overflow-hidden mt-6">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute rounded-full blur-3xl opacity-30 animate-float" style={{ top: '8%', left: '6%', width: '320px', height: '320px', background: 'radial-gradient(circle, #6366f1, transparent 70%)' }} />
        <div className="absolute rounded-full blur-3xl opacity-25 animate-float" style={{ bottom: '10%', right: '8%', width: '280px', height: '280px', background: 'radial-gradient(circle, #a855f7, transparent 70%)', animationDelay: '7s' }} />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 rounded-full px-5 py-2 text-sm font-semibold mb-8 backdrop-blur-sm"><GraduationCap className="w-4 h-4" />For De Montfort University (DMU) Students</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>De Montfort University Assignment Help</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-10 font-medium">
            Academic support, assessment guidance, proofreading and research assistance for
            De Montfort University students in the UK.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/order" className="bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-10 py-4 rounded-xl text-lg font-bold transition shadow-xl shadow-yellow-400/30 hover:shadow-2xl hover:scale-105 active:scale-95 min-w-[15rem]">Get Academic Support</Link>
            <Link href="#dmu-courses" className="border-2 border-white/70 hover:bg-white/10 px-10 py-4 rounded-xl text-lg font-semibold transition min-w-[15rem]">Request a Quote</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            De Montfort University (DMU), based in Leicester with a newer postgraduate campus in
            London, traces its roots back to the Leicester School of Art in 1870 and gained
            university status in 1992. Its Cyber Security Centre holds gold-standard "Academic
            Centre of Excellence in Cyber Security Education" status from the UK's National Cyber
            Security Centre — the first university in the East Midlands to achieve it.
          </p>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Stack Assignment provides academic support for DMU students — covering academic writing
            guidance, research assistance, referencing help, proofreading and subject-specific
            support across computing, cybersecurity, business, law, health and design.
          </p>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Support is delivered entirely online, matched to your module and assessment brief.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Sora, sans-serif' }}>Why Choose Stack Assignment for DMU Students?</h2>
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

      <section id="dmu-courses" className="py-16 bg-white dark:bg-slate-950 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Sora, sans-serif' }}>De Montfort University Courses We Support</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courseAreas.map((course) => {
              const inner = (<>
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center mb-4"><course.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" /></div>
                <h3 className="font-bold text-base mb-1.5">{course.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{course.desc}</p>
              </>)
              if (course.anchor) return <a key={course.title} href={course.anchor} className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-800 block">{inner}</a>
              return <div key={course.title} className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">{inner}</div>
            })}
          </div>
        </div>
      </section>

      <section id="dmu-computing" className="py-14 bg-slate-50 dark:bg-slate-900 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}><Code2 className="w-6 h-6 text-indigo-600" />DMU Computing Assignment Help</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm mb-3">Support across DMU's computing course areas:</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {['Business Intelligence', 'Cybersecurity', 'Database Management', 'Network Security', 'Game Development & Programming', 'IT Consultancy', 'Software Engineering', 'Machine Learning & Data Analytics'].map((s) => (
              <div key={s} className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-100 dark:border-slate-700"><CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />{s}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ fontFamily: 'Sora, sans-serif' }}>DMU Assessment Support</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {assessmentSupportItems.map((item) => (
              <div key={item} className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-3.5 border border-slate-100 dark:border-slate-700">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /><span className="text-sm font-medium text-slate-700 dark:text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 flex items-center justify-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}><Bot className="w-8 h-8 text-indigo-600" />Referencing & Responsible AI</h2>
          <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-7">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Referencing requirements can vary by module at DMU — always follow the style
              specified for your specific assessment (commonly Harvard style in the UK).
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Students should check their current module and assessment requirements before using
              generative AI in assessed work, and follow DMU's academic-integrity requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>Academic Integrity & Responsible Academic Support</h2>
          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-7 border border-slate-100 dark:border-slate-700">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Stack Assignment is not affiliated with, endorsed by, or partnered with De Montfort
              University. Our services support understanding assessment requirements, research
              guidance, academic writing, proofreading, editing, referencing and data analysis
              guidance. Students remain fully responsible for their own final submissions and must
              follow DMU's academic-integrity requirements.
            </p>
            <Link href="/integrity" className="text-indigo-600 dark:text-indigo-400 underline font-medium text-sm">Read our full Academic Integrity policy</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>DMU Academic Support in the UK</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">Support is delivered online regardless of your DMU campus.</p>
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
              <div key={item.step} className="flex gap-5 bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold flex-shrink-0">{item.step}</div>
                <div><h3 className="font-bold text-base mb-1">{item.title}</h3><p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ fontFamily: 'Sora, sans-serif' }}>DMU Student Resources</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {studentResources.map((item) => (
              <div key={item} className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-xl px-4 py-3.5 border border-slate-100 dark:border-slate-700">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{item}</span><span className="text-xs text-slate-400 dark:text-slate-500 flex-shrink-0 ml-3">Coming soon</span>
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
              <div key={item.q} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 transition hover:shadow-md">
                <h3 className="font-bold text-lg mb-2 flex items-start gap-2"><MessageCircle className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />{item.q}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed pl-7">{item.a}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 dark:text-slate-500 mt-6">Read our full <Link href="/integrity" className="text-indigo-600 dark:text-indigo-400 underline font-medium">Academic Integrity policy</Link> before ordering.</p>
        </div>
      </section>

      <section className="py-10 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-wide">Other University Assignment Support</h3>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link href="/kaplan-assignment-help" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Kaplan Business School</Link><span className="text-slate-300 dark:text-slate-700">·</span>
            <Link href="/universities/liverpool-hope-university" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Liverpool Hope University</Link>
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden stack-cta-band">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, white 0%, transparent 8%), radial-gradient(circle at 80% 70%, white 0%, transparent 6%)' }} />
        <div className="max-w-3xl mx-auto px-6 text-center text-white relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Need Support With Your DMU Assessment?</h2>
          <p className="text-lg opacity-90 mb-8">Get subject-specific academic guidance for writing, research, computing, cybersecurity and business.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/order" className="inline-block bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-10 py-4 rounded-xl text-lg font-bold transition shadow-xl shadow-yellow-400/30 hover:shadow-2xl hover:scale-105 active:scale-95">Get Academic Support</Link>
            <Link href="/order" className="inline-block border-2 border-white/70 hover:bg-white/10 px-10 py-4 rounded-xl text-lg font-semibold transition">Request a Quote</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
