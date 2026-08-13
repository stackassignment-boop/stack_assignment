import { Metadata } from 'next'
import Link from 'next/link'
import {
  CheckCircle2, MapPin, FileText, ShieldCheck, GraduationCap, MessageCircle, Code2,
  Briefcase, HeartPulse, Scale, School, Bot, PenTool,
} from 'lucide-react'
import { StructuredData } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  title: 'La Trobe University Assignment Help | Academic & Assessment Support',
  description:
    'Academic support and assessment guidance for La Trobe University students across cybersecurity, IT, business, health sciences, law and education, in Melbourne and beyond.',
  keywords: [
    'La Trobe University assignment help', 'La Trobe assignment help', 'La Trobe assessment help',
    'La Trobe academic support', 'La Trobe IT assignment help', 'La Trobe cybersecurity assignment help',
    'La Trobe business assignment help', 'La Trobe nursing assignment help', 'La Trobe report writing help',
  ],
  openGraph: {
    title: 'La Trobe University Assignment Help | Academic & Assessment Support',
    description: 'Academic support for La Trobe University students across cybersecurity, IT, business, health and education.',
    url: 'https://www.stackassignment.com/universities/la-trobe-university',
    type: 'website',
  },
  alternates: { canonical: 'https://www.stackassignment.com/universities/la-trobe-university' },
}

const campuses = ['Bundoora (Melbourne)', 'Bendigo', 'Albury-Wodonga', 'Shepparton', 'Sydney', 'Online']

const whyChooseUs = [
  { icon: GraduationCap, title: 'La Trobe-Focused Support', desc: "Support matched to La Trobe's course structure across five faculties." },
  { icon: Briefcase, title: 'Subject-Specific Guidance', desc: 'From cybersecurity and IT through to business, health and law.' },
  { icon: FileText, title: 'Assessment Brief Guidance', desc: 'Help interpreting marking rubrics and assessment briefs.' },
  { icon: PenTool, title: 'Academic Writing Support', desc: 'Structure, clarity, argument and academic tone across reports and essays.' },
  { icon: CheckCircle2, title: 'Referencing Guidance', desc: 'Support with APA, Harvard and other styles, matched to your specific unit.' },
  { icon: ShieldCheck, title: 'Confidential Online Support', desc: 'A straightforward, confidential service for La Trobe students at any campus.' },
]

interface CourseArea { icon: typeof Briefcase; title: string; desc: string; anchor?: string }
const courseAreas: CourseArea[] = [
  { icon: Code2, title: 'IT & Cybersecurity', desc: 'Cybersecurity, artificial intelligence, computer science and IT fundamentals.', anchor: '#latrobe-it' },
  { icon: Briefcase, title: 'Business, Economics & Law', desc: 'Business, accounting, economics, management and business operations.' },
  { icon: HeartPulse, title: 'Health Sciences', desc: 'Nursing, health sciences and allied health coursework.' },
  { icon: School, title: 'Education', desc: 'Education, teaching and early childhood coursework.' },
  { icon: Scale, title: 'Law', desc: 'Law and legal studies academic support.' },
]

const assessmentSupportItems = [
  'Essays', 'Reports', 'Case studies', 'Presentations', 'Research', 'Literature reviews', 'Projects',
  'Data analysis', 'Programming projects', 'Penetration testing reports', 'Proofreading', 'Referencing',
]

const howItWorks = [
  { step: '1', title: 'Share Your Assessment Requirements', desc: 'Provide the relevant task instructions or assessment brief.' },
  { step: '2', title: 'Tell Us What Support You Need', desc: 'Writing, proofreading, referencing, research, data analysis or subject guidance.' },
  { step: '3', title: 'Get Subject-Specific Support', desc: 'Receive support relevant to your course and unit.' },
  { step: '4', title: 'Review the Guidance', desc: 'Use the feedback and explanations to improve your own work.' },
  { step: '5', title: 'Complete Your Own Submission', desc: 'Ensure your final work follows La Trobe requirements and represents your own work.' },
]

const studentResources = [
  'La Trobe Assignment Writing Guide', 'La Trobe Referencing Guide', 'La Trobe Cybersecurity Study Guide',
  'La Trobe IT Study Guide', 'La Trobe Business Report Guide', 'La Trobe Nursing Assignment Guide',
]

const faqs = [
  { q: 'What is La Trobe University assignment help?', a: "Academic support built around La Trobe's course structure — covering cybersecurity, IT, business, health sciences, law and education." },
  { q: 'Can you help with La Trobe IT assessments?', a: 'Yes, including computer science, artificial intelligence and general IT fundamentals assessments.' },
  { q: 'Can you help with La Trobe cybersecurity assessments?', a: 'Yes — including units covering cyber risk management, cyber security principles, network engineering fundamentals and introduction to programming, across the Bachelor and Master of Cybersecurity.' },
  { q: 'Do you support La Trobe nursing assignments?', a: 'Yes — nursing academic writing, case studies and health research support. This is academic writing support, not clinical advice.' },
  { q: 'Can you help with La Trobe business assignments?', a: 'Yes, including business reports, accounting, economics and management assessments.' },
  { q: 'Do you provide La Trobe law academic support?', a: 'Yes — academic writing, research and referencing support for law and legal studies coursework. This is not legal advice.' },
  { q: 'Can you help with La Trobe education assignments?', a: 'Yes, including education reports and teaching-related coursework.' },
  { q: 'Do you support La Trobe Sydney campus students?', a: 'Yes — support works the same whether you study at Bundoora, a regional Victorian campus, Sydney, or fully online.' },
  { q: 'Can you help with La Trobe AI and machine learning assessments?', a: 'Yes, including natural language processing and machine learning assignment support relevant to the Master of Artificial Intelligence.' },
  { q: 'Do you provide La Trobe proofreading and referencing support?', a: 'Yes — proofreading, editing and referencing across APA, Harvard and other styles, matched to your specific unit.' },
  { q: 'Can you help me understand my La Trobe assessment brief?', a: "Yes — upload your assessment brief and get guidance on what's being asked and how to structure your response." },
  { q: 'Do you provide La Trobe postgraduate academic support?', a: 'Yes, including support for Master of Cybersecurity, Master of Artificial Intelligence and other postgraduate coursework.' },
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
    { '@type': 'ListItem', position: 3, name: 'La Trobe University Assignment Help', item: 'https://www.stackassignment.com/universities/la-trobe-university' },
  ],
}

export default function LaTrobeUniversityPage() {
  return (
    <main className="flex-grow">
      <StructuredData data={[faqSchema, breadcrumbSchema]} />

      <div className="max-w-5xl mx-auto px-6 pt-6 text-sm text-gray-500 dark:text-slate-400">
        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
        <span className="mx-2">›</span><span>Universities</span><span className="mx-2">›</span>
        <span className="text-gray-700 dark:text-gray-300">La Trobe University Assignment Help</span>
      </div>

      <section className="relative text-white py-24 md:py-36 overflow-hidden mt-6">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(135deg, rgba(30,41,59,0.95), rgba(15,23,42,0.97)), url(https://picsum.photos/id/1043/1920/1080)' }} />
        <div className="absolute rounded-full blur-3xl opacity-30 animate-float" style={{ top: '8%', left: '6%', width: '320px', height: '320px', background: 'radial-gradient(circle, #6366f1, transparent 70%)' }} />
        <div className="absolute rounded-full blur-3xl opacity-25 animate-float" style={{ bottom: '10%', right: '8%', width: '280px', height: '280px', background: 'radial-gradient(circle, #a855f7, transparent 70%)', animationDelay: '7s' }} />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 rounded-full px-5 py-2 text-sm font-semibold mb-8 backdrop-blur-sm"><GraduationCap className="w-4 h-4" />For La Trobe University Students</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>La Trobe University Assignment Help</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-10 font-medium">
            Academic support, assessment guidance, proofreading and research assistance for
            La Trobe University students across Victoria, Sydney and online.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/order" className="bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-10 py-4 rounded-xl text-lg font-bold transition shadow-xl shadow-yellow-400/30 hover:shadow-2xl hover:scale-105 active:scale-95 min-w-[240px]">Get Academic Support</Link>
            <Link href="#latrobe-courses" className="border-2 border-white/70 hover:bg-white/10 px-10 py-4 rounded-xl text-lg font-semibold transition min-w-[240px]">Request a Quote</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            La Trobe University teaches across six Victorian campuses — led by its Bundoora
            (Melbourne) campus — plus a campus in Sydney, spanning five faculties: Education,
            Health Sciences, Humanities and Social Sciences, Business/Economics/Law, and Science,
            Technology and Engineering. Its cybersecurity programs are backed by the Optus La Trobe
            Cyber Security Research Hub and dedicated IoT and CISCO networking labs.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Stack Assignment provides academic support for La Trobe students across Australia —
            covering academic writing guidance, research assistance, referencing help, proofreading
            and subject-specific support across cybersecurity, IT, business, health sciences, law
            and education.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Whether you study at Bundoora, a regional Victorian campus, Sydney, or fully online,
            support works the same way — matched to your unit and assessment brief.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Sora, sans-serif' }}>Why Choose Stack Assignment for La Trobe Students?</h2>
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

      <section id="latrobe-courses" className="py-16 bg-white dark:bg-slate-950 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Sora, sans-serif' }}>La Trobe University Courses We Support</h2>
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

      <section id="latrobe-it" className="py-16 bg-gray-50 dark:bg-slate-900 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 flex items-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}><Code2 className="w-6 h-6 text-indigo-600" />La Trobe University IT & Cybersecurity Assignment Help</h2>
          <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm mb-4">
            Verified units from La Trobe's Master of Cybersecurity core:
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-slate-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white dark:bg-slate-950 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Unit Code</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Unit Name</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Academic Support</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { code: 'CSE5CRM', name: 'Cyber Risk Management and Compliance', support: 'Risk/compliance report guidance' },
                  { code: 'CSE4004', name: 'Cyber Security Principles', support: 'Cybersecurity fundamentals guidance' },
                  { code: 'CSE4DBF', name: 'Database Fundamentals', support: 'Database assignment guidance' },
                  { code: 'CSE4IFU', name: 'Information Technology Fundamentals', support: 'IT fundamentals guidance' },
                  { code: 'CSE5010', name: 'Inside the Mind of a Hacker', support: 'Ethical hacking assignment guidance' },
                  { code: 'CSE4IP', name: 'Introduction to Programming', support: 'Programming assignment guidance' },
                  { code: 'CSE4001', name: 'Network Engineering Fundamentals', support: 'Networking assignment guidance' },
                  { code: 'CSE5003', name: 'Professional Practices and Entrepreneurship in IT', support: 'Professional practice guidance' },
                ].map((u, i) => (
                  <tr key={u.code} className={i % 2 === 0 ? 'bg-gray-50/60 dark:bg-slate-900' : 'bg-white dark:bg-slate-950'}>
                    <td className="px-4 py-3 font-mono font-semibold text-indigo-700 dark:text-indigo-400 whitespace-nowrap">{u.code}</td>
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{u.name}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-slate-400">{u.support}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 dark:text-slate-500 mt-4">
            Course structures and unit codes may change. Students should verify current information
            through La Trobe's official course documentation.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ fontFamily: 'Sora, sans-serif' }}>La Trobe Assessment Support</h2>
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 flex items-center justify-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}><Bot className="w-8 h-8 text-indigo-600" />Referencing & Responsible AI</h2>
          <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-7">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Referencing requirements can vary by unit at La Trobe — always follow the style
              specified for your specific assessment.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Students should check their current course and assessment requirements before using
              generative AI in assessed work, and follow La Trobe's academic-integrity requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>Academic Integrity & Responsible Academic Support</h2>
          <div className="bg-gray-50 dark:bg-slate-900 rounded-2xl p-7 border border-gray-100 dark:border-slate-700">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Stack Assignment is not affiliated with, endorsed by, or partnered with La Trobe
              University. Our services support understanding assessment requirements, research
              guidance, academic writing, proofreading, editing, referencing and data analysis
              guidance. Students remain fully responsible for their own final submissions and must
              follow La Trobe's academic-integrity requirements.
            </p>
            <Link href="/integrity" className="text-indigo-600 dark:text-indigo-400 underline font-medium text-sm">Read our full Academic Integrity policy</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>La Trobe Academic Support Across Australia</h2>
          <p className="text-gray-600 dark:text-slate-400 leading-relaxed mb-6">Support is delivered online regardless of your La Trobe campus.</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ fontFamily: 'Sora, sans-serif' }}>La Trobe Student Resources</h2>
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
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wide">Other University Assignment Support</h3>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link href="/kaplan-assignment-help" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Kaplan Business School</Link><span className="text-gray-300 dark:text-slate-700">·</span>
            <Link href="/universities/cquniversity" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">CQUniversity</Link><span className="text-gray-300 dark:text-slate-700">·</span>
            <Link href="/universities/deakin-university" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Deakin University</Link><span className="text-gray-300 dark:text-slate-700">·</span>
            <Link href="/universities/victoria-university" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Victoria University</Link>
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, white 0%, transparent 8%), radial-gradient(circle at 80% 70%, white 0%, transparent 6%)' }} />
        <div className="max-w-3xl mx-auto px-6 text-center text-white relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Need Support With Your La Trobe Assessment?</h2>
          <p className="text-lg opacity-90 mb-8">Get subject-specific academic guidance for writing, research, cybersecurity, IT and other La Trobe study areas.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/order" className="inline-block bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-10 py-4 rounded-xl text-lg font-bold transition shadow-xl shadow-yellow-400/30 hover:shadow-2xl hover:scale-105 active:scale-95">Get Academic Support</Link>
            <Link href="/order" className="inline-block border-2 border-white/70 hover:bg-white/10 px-10 py-4 rounded-xl text-lg font-semibold transition">Request a Quote</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
