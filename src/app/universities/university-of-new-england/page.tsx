import { Metadata } from 'next'
import Link from 'next/link'
import {
  CheckCircle2, MapPin, FileText, ShieldCheck, GraduationCap, MessageCircle, Code2,
  Briefcase, HeartPulse, School, Leaf, Bot, PenTool, Scale,
} from 'lucide-react'
import { StructuredData } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  title: 'University of New England Assignment Help | UNE Academic Support',
  description:
    'Academic support and assessment guidance for University of New England (UNE) students — business, education, nursing, agriculture, science and law, mostly studying online.',
  keywords: [
    'University of New England assignment help', 'UNE assignment help', 'UNE assessment help',
    'University of New England academic support', 'UNE business assignment help',
    'UNE education assignment help', 'UNE nursing assignment help', 'UNE agriculture assignment help',
    'UNE online assignment help', 'UNE report writing help',
  ],
  openGraph: {
    title: 'University of New England Assignment Help | UNE Academic Support',
    description: 'Academic support for UNE students across business, education, nursing, agriculture and science.',
    url: 'https://www.stackassignment.com/universities/university-of-new-england',
    type: 'website',
  },
  alternates: { canonical: 'https://www.stackassignment.com/universities/university-of-new-england' },
}

const campuses = ['Armidale (main campus)', 'Tamworth', 'Taree', 'Sydney', 'Online (85%+ of students)']

const whyChooseUs = [
  { icon: GraduationCap, title: 'UNE-Focused Support', desc: "Support matched to UNE's course structure, built for a mostly-online student body." },
  { icon: Briefcase, title: 'Subject-Specific Guidance', desc: 'From business and education through to nursing, agriculture and science.' },
  { icon: FileText, title: 'Assessment Brief Guidance', desc: 'Help interpreting marking rubrics and assessment briefs.' },
  { icon: PenTool, title: 'Academic Writing Support', desc: 'Structure, clarity, argument and academic tone across reports and essays.' },
  { icon: CheckCircle2, title: 'Referencing Guidance', desc: 'Support with APA, Harvard and other styles, matched to your specific unit.' },
  { icon: ShieldCheck, title: 'Confidential Online Support', desc: 'A straightforward, confidential service built for online-first UNE students.' },
]

interface CourseArea { icon: typeof Briefcase; title: string; desc: string }
const courseAreas: CourseArea[] = [
  { icon: Briefcase, title: 'Business', desc: 'Business degrees and coursework, largely delivered online.' },
  { icon: School, title: 'Education', desc: "Education degrees — UNE is one of Australia's largest providers of online teacher education." },
  { icon: HeartPulse, title: 'Nursing & Health', desc: 'Nursing and health science academic writing and research support.' },
  { icon: Leaf, title: 'Agriculture & Science', desc: 'Agriculture, environmental science and general science, supported by UNE\'s SMART Farm research facility.' },
  { icon: Code2, title: 'Rural Medicine & Health', desc: 'Academic support for coursework via UNE\'s School of Rural Medicine — not clinical advice.' },
  { icon: Scale, title: 'Law & Justice', desc: 'Law and justice studies academic support.' },
]

const assessmentSupportItems = [
  'Essays', 'Reports', 'Case studies', 'Presentations', 'Research', 'Literature reviews', 'Projects',
  'Data analysis', 'Nursing assessments', 'Agricultural science reports', 'Proofreading', 'Referencing',
]

const howItWorks = [
  { step: '1', title: 'Share Your Assessment Requirements', desc: 'Provide the relevant task instructions or assessment brief.' },
  { step: '2', title: 'Tell Us What Support You Need', desc: 'Writing, proofreading, referencing, research, data analysis or subject guidance.' },
  { step: '3', title: 'Get Subject-Specific Support', desc: 'Receive support relevant to your course and unit.' },
  { step: '4', title: 'Review the Guidance', desc: 'Use the feedback and explanations to improve your own work.' },
  { step: '5', title: 'Complete Your Own Submission', desc: 'Ensure your final work follows UNE requirements and represents your own work.' },
]

const studentResources = [
  'UNE Assignment Writing Guide', 'UNE Referencing Guide', 'UNE Online Study Guide',
  'UNE Education Report Guide', 'UNE Nursing Assignment Guide', 'UNE Agriculture Report Guide',
]

const faqs = [
  { q: 'What is University of New England assignment help?', a: "Academic support built around UNE's course structure — covering business, education, nursing, agriculture, science and law. UNE teaches over 85% of its students fully online." },
  { q: 'Can you help with UNE education assignments?', a: "Yes — UNE is one of Australia's largest providers of online teacher education, and we support education reports, lesson-plan related coursework and teaching case studies." },
  { q: 'Do you support UNE nursing assignments?', a: 'Yes — nursing academic writing, case studies and health research support. This is academic writing support, not clinical advice.' },
  { q: 'Can you help with UNE agriculture and science assignments?', a: "Yes, including agricultural science reports and research writing, relevant to coursework connected with UNE's SMART Farm research facility." },
  { q: 'Do you provide UNE business assignment help?', a: 'Yes, including business reports and coursework, largely delivered through UNE\'s online study model.' },
  { q: 'Can you help with UNE online students specifically?', a: 'Yes — since the large majority of UNE students study fully online, our support is built around that experience by default.' },
  { q: 'Do you support UNE law and justice assignments?', a: 'Yes — academic writing, research and referencing support for law and justice coursework. This is not legal advice.' },
  { q: 'Can you help with UNE rural medicine and health coursework?', a: 'Yes — academic writing and research support for coursework via the School of Rural Medicine. This is not clinical or medical advice.' },
  { q: 'Do you provide UNE proofreading and referencing support?', a: 'Yes — proofreading, editing and referencing across APA, Harvard and other styles, matched to your specific unit.' },
  { q: 'Can you help me understand my UNE assessment brief?', a: "Yes — upload your assessment brief and get guidance on what's being asked and how to structure your response." },
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
    { '@type': 'ListItem', position: 3, name: 'University of New England Assignment Help', item: 'https://www.stackassignment.com/universities/university-of-new-england' },
  ],
}

export default function UniversityOfNewEnglandPage() {
  return (
    <main className="flex-grow">
      <StructuredData data={[faqSchema, breadcrumbSchema]} />

      <div className="max-w-5xl mx-auto px-6 pt-6 text-sm text-gray-500 dark:text-slate-400">
        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
        <span className="mx-2">›</span><span>Universities</span><span className="mx-2">›</span>
        <span className="text-gray-700 dark:text-gray-300">University of New England Assignment Help</span>
      </div>

      <section className="relative text-white py-24 md:py-36 overflow-hidden mt-6">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(135deg, rgba(30,41,59,0.95), rgba(15,23,42,0.97)), url(https://picsum.photos/id/1067/1920/1080)' }} />
        <div className="absolute rounded-full blur-3xl opacity-30 animate-float" style={{ top: '8%', left: '6%', width: '320px', height: '320px', background: 'radial-gradient(circle, #6366f1, transparent 70%)' }} />
        <div className="absolute rounded-full blur-3xl opacity-25 animate-float" style={{ bottom: '10%', right: '8%', width: '280px', height: '280px', background: 'radial-gradient(circle, #a855f7, transparent 70%)', animationDelay: '7s' }} />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 rounded-full px-5 py-2 text-sm font-semibold mb-8 backdrop-blur-sm"><GraduationCap className="w-4 h-4" />For University of New England (UNE) Students</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>University of New England Assignment Help</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-10 font-medium">
            Academic support, assessment guidance, proofreading and research assistance for
            UNE students, wherever you're studying from.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/order" className="bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-10 py-4 rounded-xl text-lg font-bold transition shadow-xl shadow-yellow-400/30 hover:shadow-2xl hover:scale-105 active:scale-95 min-w-[240px]">Get Academic Support</Link>
            <Link href="#une-courses" className="border-2 border-white/70 hover:bg-white/10 px-10 py-4 rounded-xl text-lg font-semibold transition min-w-[240px]">Request a Quote</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Established in 1938, the University of New England (UNE) is genuinely different from
            most other Australian universities in one key respect: more than 85% of its students
            study fully online, spread across the country rather than concentrated on the Armidale
            campus. UNE has held a 5-star Good Universities Guide rating for overall student
            experience for 20 straight years, and ranks #1 in NSW for social equity.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Stack Assignment provides academic support for UNE students — covering academic writing
            guidance, research assistance, referencing help, proofreading and subject-specific
            support across business, education, nursing, agriculture, science and law.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Since most UNE students already study online, our support fits naturally into that
            experience — matched to your unit and assessment brief.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Sora, sans-serif' }}>Why Choose Stack Assignment for UNE Students?</h2>
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

      <section id="une-courses" className="py-16 bg-white dark:bg-slate-950 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Sora, sans-serif' }}>University of New England Courses We Support</h2>
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ fontFamily: 'Sora, sans-serif' }}>UNE Assessment Support</h2>
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
              Referencing requirements can vary by unit at UNE — always follow the style specified
              for your specific assessment.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Students should check their current course and assessment requirements before using
              generative AI in assessed work, and follow UNE's academic-integrity requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>Academic Integrity & Responsible Academic Support</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-7 border border-gray-100 dark:border-slate-700">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Stack Assignment is not affiliated with, endorsed by, or partnered with the
              University of New England. Our services support understanding assessment
              requirements, research guidance, academic writing, proofreading, editing, referencing
              and data analysis guidance. Students remain fully responsible for their own final
              submissions and must follow UNE's academic-integrity requirements.
            </p>
            <Link href="/integrity" className="text-indigo-600 dark:text-indigo-400 underline font-medium text-sm">Read our full Academic Integrity policy</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>UNE Academic Support Across Australia</h2>
          <p className="text-gray-600 dark:text-slate-400 leading-relaxed mb-6">Support is delivered online regardless of your UNE campus — a natural fit given most UNE students already study remotely.</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ fontFamily: 'Sora, sans-serif' }}>UNE Student Resources</h2>
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

      <section className="py-10 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wide">Other University Assignment Support</h3>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link href="/kaplan-assignment-help" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Kaplan Business School</Link><span className="text-gray-300 dark:text-slate-700">·</span>
            <Link href="/universities/university-of-newcastle" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">University of Newcastle</Link><span className="text-gray-300 dark:text-slate-700">·</span>
            <Link href="/universities/university-of-sunshine-coast" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">University of the Sunshine Coast</Link>
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, white 0%, transparent 8%), radial-gradient(circle at 80% 70%, white 0%, transparent 6%)' }} />
        <div className="max-w-3xl mx-auto px-6 text-center text-white relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Need Support With Your UNE Assessment?</h2>
          <p className="text-lg opacity-90 mb-8">Get subject-specific academic guidance for writing, research, business, education, nursing and agriculture.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/order" className="inline-block bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-10 py-4 rounded-xl text-lg font-bold transition shadow-xl shadow-yellow-400/30 hover:shadow-2xl hover:scale-105 active:scale-95">Get Academic Support</Link>
            <Link href="/order" className="inline-block border-2 border-white/70 hover:bg-white/10 px-10 py-4 rounded-xl text-lg font-semibold transition">Request a Quote</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
