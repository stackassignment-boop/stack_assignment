import { Metadata } from 'next'
import Link from 'next/link'
import {
  CheckCircle2, MapPin, FileText, ShieldCheck, GraduationCap, MessageCircle, Code2,
  Briefcase, HeartPulse, School, ShieldAlert, Bot, PenTool, Scale,
} from 'lucide-react'
import { StructuredData } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  title: 'University of Bedfordshire Assignment Help | Academic Support UK',
  description:
    'Academic support and assessment guidance for University of Bedfordshire students in Luton and Bedford — computing, cybersecurity, business, nursing and education.',
  keywords: [
    'University of Bedfordshire assignment help', 'Beds assignment help', 'Bedfordshire assessment help',
    'University of Bedfordshire academic support', 'Bedfordshire computing assignment help',
    'Bedfordshire cybersecurity assignment help', 'Bedfordshire business assignment help',
    'Bedfordshire nursing assignment help', 'Bedfordshire report writing help',
  ],
  openGraph: {
    title: 'University of Bedfordshire Assignment Help | Academic Support UK',
    description: 'Academic support for University of Bedfordshire students across computing, cybersecurity, business, nursing and education.',
    url: 'https://www.stackassignment.com/universities/university-of-bedfordshire',
    type: 'website',
  },
  alternates: { canonical: 'https://www.stackassignment.com/universities/university-of-bedfordshire' },
}

const campuses = ['Luton (University Square)', 'Bedford', 'Milton Keynes', 'Aylesbury']

const whyChooseUs = [
  { icon: GraduationCap, title: 'Bedfordshire-Focused Support', desc: "Support matched to the University of Bedfordshire's school structure and UK marking conventions." },
  { icon: Briefcase, title: 'Subject-Specific Guidance', desc: 'From computing and cybersecurity through to business, nursing and education.' },
  { icon: FileText, title: 'Assessment Brief Guidance', desc: 'Help interpreting marking rubrics and assessment briefs.' },
  { icon: PenTool, title: 'Academic Writing Support', desc: 'Structure, clarity, argument and academic tone across essays and reports.' },
  { icon: CheckCircle2, title: 'Referencing Guidance', desc: 'Support with Harvard, APA and other UK referencing conventions.' },
  { icon: ShieldCheck, title: 'Confidential Online Support', desc: 'A straightforward, confidential service for Bedfordshire students at any campus.' },
]

interface CourseArea { icon: typeof Briefcase; title: string; desc: string; anchor?: string }
const courseAreas: CourseArea[] = [
  { icon: Code2, title: 'Computing, Engineering & Creative Industries', desc: 'Computer science, software engineering, games and creative technology coursework.' },
  { icon: ShieldAlert, title: 'Cybersecurity', desc: "BCS-accredited cybersecurity programs, backed by a dedicated Security Operations Centre and industry partnerships with Cisco, CompTIA and EC-Council.", anchor: '#beds-cyber' },
  { icon: Briefcase, title: 'Business', desc: 'Business School coursework, including management, marketing and finance.' },
  { icon: HeartPulse, title: 'Nursing & Health', desc: 'Nursing and midwifery, with strong NHS links — academic writing support, not clinical advice.' },
  { icon: School, title: 'Education', desc: 'Education degrees and teaching-related coursework.' },
  { icon: Scale, title: 'Law', desc: 'Law academic support — not legal advice.' },
]

const assessmentSupportItems = [
  'Essays', 'Reports', 'Case studies', 'Presentations', 'Research', 'Dissertations', 'Projects',
  'Programming projects', 'Nursing assessments', 'Proofreading', 'Referencing', 'Editing',
]

const howItWorks = [
  { step: '1', title: 'Share Your Assessment Requirements', desc: 'Provide the relevant task instructions or assessment brief.' },
  { step: '2', title: 'Tell Us What Support You Need', desc: 'Writing, proofreading, referencing, research, data analysis or subject guidance.' },
  { step: '3', title: 'Get Subject-Specific Support', desc: 'Receive support relevant to your course and unit.' },
  { step: '4', title: 'Review the Guidance', desc: 'Use the feedback and explanations to improve your own work.' },
  { step: '5', title: 'Complete Your Own Submission', desc: 'Ensure your final work follows Bedfordshire requirements and represents your own work.' },
]

const studentResources = [
  'Bedfordshire Assignment Writing Guide', 'Bedfordshire Referencing Guide', 'Bedfordshire Cybersecurity Study Guide',
  'Bedfordshire Computing Study Guide', 'Bedfordshire Business Report Guide', 'Bedfordshire Nursing Assignment Guide',
]

const faqs = [
  { q: 'What is University of Bedfordshire assignment help?', a: "Academic support built around the University of Bedfordshire's course structure — covering computing, cybersecurity, business, nursing and education, across its Luton, Bedford, Milton Keynes and Aylesbury campuses." },
  { q: 'Can you help with Bedfordshire computing assignments?', a: 'Yes, including computer science, software engineering and games/creative technology coursework via the School of Computing, Engineering and Creative Industries.' },
  { q: 'Do you support Bedfordshire cybersecurity assessments?', a: "Yes — Bedfordshire's cybersecurity programs are BCS-accredited and backed by a dedicated Security Operations Centre and industry partnerships with Cisco, CompTIA and EC-Council." },
  { q: 'Can you help with Bedfordshire nursing assignments?', a: 'Yes — nursing academic writing, case studies and health research support. This is academic writing support, not clinical advice.' },
  { q: 'Do you provide Bedfordshire business assignment help?', a: 'Yes, including business reports and coursework via the Business School.' },
  { q: 'Can you help with Bedfordshire dissertation writing?', a: 'Yes, including structure, research methodology and referencing guidance for undergraduate and postgraduate dissertations.' },
  { q: 'Do you support Bedfordshire students at Milton Keynes or Aylesbury?', a: 'Yes — support works the same whether you study at Luton, Bedford, Milton Keynes or Aylesbury.' },
  { q: 'Can you help with Bedfordshire education assignments?', a: 'Yes, including education reports and teaching-related coursework.' },
  { q: 'Do you provide Bedfordshire proofreading and referencing support?', a: 'Yes — proofreading, editing and Harvard/APA referencing support, matched to your specific module.' },
  { q: 'Can you help me understand my Bedfordshire assessment brief?', a: "Yes — upload your assessment brief and get guidance on what's being asked and how to structure your response." },
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
    { '@type': 'ListItem', position: 3, name: 'University of Bedfordshire Assignment Help', item: 'https://www.stackassignment.com/universities/university-of-bedfordshire' },
  ],
}

export default function UniversityOfBedfordshirePage() {
  return (
    <main className="flex-grow">
      <StructuredData data={[faqSchema, breadcrumbSchema]} />

      <div className="max-w-5xl mx-auto px-6 py-5 text-sm text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
        <span className="mx-2">›</span><span>Universities</span><span className="mx-2">›</span>
        <span className="text-slate-700 dark:text-slate-300">University of Bedfordshire Assignment Help</span>
      </div>

      <section className="relative text-white py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute rounded-full blur-3xl opacity-30 animate-float" style={{ top: '8%', left: '6%', width: '320px', height: '320px', background: 'radial-gradient(circle, #6366f1, transparent 70%)' }} />
        <div className="absolute rounded-full blur-3xl opacity-25 animate-float" style={{ bottom: '10%', right: '8%', width: '280px', height: '280px', background: 'radial-gradient(circle, #a855f7, transparent 70%)', animationDelay: '7s' }} />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 rounded-full px-5 py-2 text-sm font-semibold mb-8 backdrop-blur-sm"><GraduationCap className="w-4 h-4" />For University of Bedfordshire Students</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>University of Bedfordshire Assignment Help</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-10 font-medium">
            Academic support, assessment guidance, proofreading and research assistance for
            University of Bedfordshire students.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/order" className="bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-10 py-4 rounded-xl text-lg font-bold transition shadow-xl shadow-yellow-400/30 hover:shadow-2xl hover:scale-105 active:scale-95 min-w-[15rem]">Get Academic Support</Link>
            <Link href="#beds-courses" className="border-2 border-white/70 hover:bg-white/10 px-10 py-4 rounded-xl text-lg font-semibold transition min-w-[15rem]">Request a Quote</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            The University of Bedfordshire teaches across campuses in Luton, Bedford, Milton
            Keynes and Aylesbury, with particular strength in cybersecurity — its programs are
            BCS-accredited, backed by a dedicated Security Operations Centre, and supported by
            industry partnerships with Cisco, CompTIA and EC-Council. Its nursing and midwifery
            programs maintain strong links with the NHS.
          </p>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Stack Assignment provides academic support for Bedfordshire students — covering
            academic writing guidance, research assistance, referencing help, proofreading and
            subject-specific support across computing, cybersecurity, business, nursing and
            education.
          </p>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Support is delivered entirely online, matched to your module and assessment brief.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Sora, sans-serif' }}>Why Choose Stack Assignment for Bedfordshire Students?</h2>
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

      <section id="beds-courses" className="py-16 bg-white dark:bg-slate-950 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Sora, sans-serif' }}>University of Bedfordshire Courses We Support</h2>
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

      <section id="beds-cyber" className="py-14 bg-slate-50 dark:bg-slate-900 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}><ShieldAlert className="w-6 h-6 text-indigo-600" />Bedfordshire Cybersecurity Assignment Help</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
            Bedfordshire's cybersecurity programs hold BCS (Chartered Institute for IT)
            accreditation, and students benefit from hands-on access to a dedicated Security
            Operations Centre alongside industry partnerships with Cisco, CompTIA and EC-Council —
            we support coursework across penetration testing, network security, threat analysis
            and general cybersecurity modules.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ fontFamily: 'Sora, sans-serif' }}>Bedfordshire Assessment Support</h2>
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
              Referencing requirements can vary by module at Bedfordshire — always follow the style
              specified for your specific assessment.
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Students should check their current module and assessment requirements before using
              generative AI in assessed work, and follow Bedfordshire's academic-integrity
              requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>Academic Integrity & Responsible Academic Support</h2>
          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-7 border border-slate-100 dark:border-slate-700">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Stack Assignment is not affiliated with, endorsed by, or partnered with the
              University of Bedfordshire. Our services support understanding assessment
              requirements, research guidance, academic writing, proofreading, editing, referencing
              and data analysis guidance. Students remain fully responsible for their own final
              submissions and must follow Bedfordshire's academic-integrity requirements.
            </p>
            <Link href="/integrity" className="text-indigo-600 dark:text-indigo-400 underline font-medium text-sm">Read our full Academic Integrity policy</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Bedfordshire Academic Support in the UK</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">Support is delivered online regardless of your Bedfordshire campus.</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ fontFamily: 'Sora, sans-serif' }}>Bedfordshire Student Resources</h2>
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
            <Link href="/universities/de-montfort-university" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">De Montfort University</Link><span className="text-slate-300 dark:text-slate-700">·</span>
            <Link href="/universities/solent-university" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Solent University</Link>
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden stack-cta-band">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, white 0%, transparent 8%), radial-gradient(circle at 80% 70%, white 0%, transparent 6%)' }} />
        <div className="max-w-3xl mx-auto px-6 text-center text-white relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Need Support With Your Bedfordshire Assessment?</h2>
          <p className="text-lg opacity-90 mb-8">Get subject-specific academic guidance for writing, research, computing, cybersecurity, business and nursing.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/order" className="inline-block bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-10 py-4 rounded-xl text-lg font-bold transition shadow-xl shadow-yellow-400/30 hover:shadow-2xl hover:scale-105 active:scale-95">Get Academic Support</Link>
            <Link href="/order" className="inline-block border-2 border-white/70 hover:bg-white/10 px-10 py-4 rounded-xl text-lg font-semibold transition">Request a Quote</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
