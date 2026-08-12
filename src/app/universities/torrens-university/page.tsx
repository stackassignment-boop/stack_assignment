import { Metadata } from 'next'
import Link from 'next/link'
import {
  CheckCircle2, MapPin, FileText, ShieldCheck, GraduationCap, MessageCircle, Code2,
  Briefcase, Palette, HeartPulse, UtensilsCrossed, School, Microscope, Bot, PenTool,
} from 'lucide-react'
import { StructuredData } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  title: 'Torrens University Assignment Help Australia | Academic Support',
  description:
    'Academic support and assessment guidance for Torrens University students across technology, business, health, hospitality, education, design and research.',
  keywords: [
    'Torrens University assignment help', 'Torrens assignment help', 'Torrens University assessment help',
    'Torrens academic support', 'Torrens IT assignment help', 'Torrens cybersecurity assignment help',
    'Torrens business assignment help', 'Torrens MBA assignment help', 'Torrens hospitality assignment help',
    'Torrens nursing assignment help', 'Torrens education assignment help', 'Torrens design assignment help',
  ],
  openGraph: {
    title: 'Torrens University Assignment Help Australia',
    description: 'Academic support for Torrens University students across technology, business, health, hospitality, education and design.',
    url: 'https://www.stackassignment.com/universities/torrens-university',
    type: 'website',
  },
  alternates: { canonical: 'https://www.stackassignment.com/universities/torrens-university' },
}

const campuses = ['Sydney', 'Melbourne', 'Brisbane', 'Adelaide', 'Blue Mountains', 'Online']

const whyChooseUs = [
  { icon: GraduationCap, title: 'Torrens-Focused Support', desc: 'Support matched to Torrens\' flexible on-campus, online and blended study model.' },
  { icon: Briefcase, title: 'Broad Subject Coverage', desc: 'From technology and business through to health, hospitality, education and design.' },
  { icon: FileText, title: 'Assessment Brief Guidance', desc: 'Help understanding what a report, project or presentation brief actually requires.' },
  { icon: PenTool, title: 'Academic Writing Support', desc: 'Structure, clarity, argument and academic tone across essays and reports.' },
  { icon: CheckCircle2, title: 'Referencing Guidance', desc: 'Support with APA, Harvard and other styles, matched to your specific unit.' },
  { icon: ShieldCheck, title: 'Confidential Online Support', desc: 'A straightforward, confidential service for students at any Torrens campus.' },
]

interface CourseArea { icon: typeof Briefcase; title: string; desc: string; anchor?: string }
const courseAreas: CourseArea[] = [
  { icon: Code2, title: 'Technology', desc: 'Software Engineering, Cybersecurity, Information Technology, AI, Data Analytics and Cloud specialisations.', anchor: '#torrens-technology' },
  { icon: Briefcase, title: 'Business', desc: 'MBA, general business, marketing, event and sports management, business analytics.', anchor: '#torrens-business' },
  { icon: UtensilsCrossed, title: 'Hospitality', desc: 'Hospitality, hotel and tourism management via Blue Mountains International Hotel Management School.' },
  { icon: HeartPulse, title: 'Health', desc: 'Nursing, counselling, nutrition, naturopathy and public health programs.' },
  { icon: School, title: 'Education', desc: 'Education, learning and teaching, inclusive education and leadership programs.' },
  { icon: Palette, title: 'Design', desc: 'Interior, graphic, communication, fashion, UX and web design via Billy Blue College of Design.' },
  { icon: Microscope, title: 'Higher Degrees by Research', desc: 'PhD, Master of Philosophy, Master of Research and Professional Doctorate programs.' },
]

const assessmentSupportItems = [
  'Essays', 'Reports', 'Case studies', 'Presentations', 'Research', 'Literature reviews', 'Projects',
  'Portfolios', 'Data analysis', 'Programming projects', 'Proofreading', 'Referencing', 'Editing',
]

const howItWorks = [
  { step: '1', title: 'Share Your Assessment Requirements', desc: 'Provide the relevant task instructions or assessment brief.' },
  { step: '2', title: 'Tell Us What Support You Need', desc: 'Writing, proofreading, referencing, research, data analysis or subject guidance.' },
  { step: '3', title: 'Get Subject-Specific Support', desc: 'Receive support relevant to your course and study area.' },
  { step: '4', title: 'Review the Guidance', desc: 'Use the feedback and explanations to improve your own work.' },
  { step: '5', title: 'Complete Your Own Submission', desc: 'Ensure your final work follows Torrens requirements and represents your own work.' },
]

const studentResources = [
  'Torrens Assignment Writing Guide', 'Torrens Referencing Guide', 'Torrens IT Study Guide',
  'Torrens Cybersecurity Guide', 'Torrens Business Report Guide', 'Torrens MBA Study Guide',
  'Torrens Hospitality Report Guide', 'Torrens Nursing Assignment Guide', 'Torrens Design Portfolio Guide',
  'Torrens Research Proposal Guide',
]

const faqs = [
  { q: 'What is Torrens University assignment help?', a: 'Academic support built around Torrens\' course structure — covering technology, business, health, hospitality, education, design and research study areas.' },
  { q: 'Can you help with Torrens IT assessments?', a: 'Yes, including Software Engineering, Cybersecurity, and Information Technology assessments across Bachelor, Graduate Certificate and Master level courses.' },
  { q: 'Do you support Torrens nursing assignments?', a: 'Yes — nursing academic writing, case studies and health research support. This is academic writing support, not clinical advice.' },
  { q: 'Can you help with Torrens MBA assessments?', a: 'Yes, including business strategy, leadership, marketing, finance and case study assessments.' },
  { q: 'Do you support Torrens online students?', a: 'Yes — support works the same whether you study on campus, online, or in a blended format.' },
  { q: 'Can you help with Torrens design assessments?', a: 'Yes, including portfolio development guidance and academic writing support for design theory and research components.' },
  { q: 'Do you provide Torrens hospitality academic support?', a: 'Yes, including hospitality and hotel management reports, case studies and academic writing support.' },
  { q: 'Can you help with Torrens education assignments?', a: 'Yes, including education reports, teaching-related assignments and literature reviews.' },
  { q: 'Do you provide Torrens cybersecurity assignment help?', a: 'Yes, across Diploma, Bachelor, Graduate Certificate and Master of Cybersecurity assessments.' },
  { q: 'Can you help with Torrens research degree work?', a: 'Yes — research methodology, literature review, academic writing and referencing guidance for HDR candidates.' },
  { q: 'Do you provide Torrens proofreading and referencing support?', a: 'Yes — proofreading, editing and referencing across APA, Harvard and other styles, matched to your specific unit.' },
  { q: 'Can you help me understand my Torrens assessment brief?', a: 'Yes — upload your assessment brief and get guidance on what\'s being asked and how to structure your response.' },
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
    { '@type': 'ListItem', position: 3, name: 'Torrens University Assignment Help', item: 'https://www.stackassignment.com/universities/torrens-university' },
  ],
}

export default function TorrensUniversityPage() {
  return (
    <main className="flex-grow">
      <StructuredData data={[faqSchema, breadcrumbSchema]} />

      <div className="max-w-5xl mx-auto px-6 pt-6 text-sm text-gray-500 dark:text-slate-400">
        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
        <span className="mx-2">›</span><span>Universities</span><span className="mx-2">›</span>
        <span className="text-gray-700 dark:text-gray-300">Torrens University Assignment Help</span>
      </div>

      <section className="relative text-white py-24 md:py-36 overflow-hidden mt-6">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(135deg, rgba(30,41,59,0.95), rgba(15,23,42,0.97)), url(https://picsum.photos/id/1059/1920/1080)' }} />
        <div className="absolute rounded-full blur-3xl opacity-30 animate-float" style={{ top: '8%', left: '6%', width: '320px', height: '320px', background: 'radial-gradient(circle, #6366f1, transparent 70%)' }} />
        <div className="absolute rounded-full blur-3xl opacity-25 animate-float" style={{ bottom: '10%', right: '8%', width: '280px', height: '280px', background: 'radial-gradient(circle, #a855f7, transparent 70%)', animationDelay: '7s' }} />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 rounded-full px-5 py-2 text-sm font-semibold mb-8 backdrop-blur-sm">
            <GraduationCap className="w-4 h-4" />For Torrens University Students
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
            Torrens University Assignment Help Australia
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-10 font-medium">
            Academic support for Torrens University students across business, technology, health,
            hospitality, education, design and other study areas.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/order" className="bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-10 py-4 rounded-xl text-lg font-bold transition shadow-xl shadow-yellow-400/30 hover:shadow-2xl hover:scale-105 active:scale-95 min-w-[240px]">Get Academic Support</Link>
            <Link href="#torrens-courses" className="border-2 border-white/70 hover:bg-white/10 px-10 py-4 rounded-xl text-lg font-semibold transition min-w-[240px]">View Services</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Torrens University Australia offers a genuinely broad range of undergraduate,
            postgraduate, online and research study options — from technology and business through
            to health, hospitality, education and design, delivered across five campuses (Sydney,
            Melbourne, Brisbane, Adelaide and Blue Mountains) as well as fully online.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            That breadth means Torrens students face very different assessment styles depending on
            their course — a hospitality management report looks nothing like a cybersecurity
            project or a design portfolio. Stack Assignment provides academic support for Torrens
            students across Australia — covering academic writing guidance, research assistance,
            referencing help, proofreading and subject-specific support matched to your actual
            course area.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Whether you study on campus, online, or in a blended format, support works the same
            way — matched to your unit and assessment brief rather than a generic template.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Sora, sans-serif' }}>Why Choose Stack Assignment for Torrens Students?</h2>
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

      <section id="torrens-courses" className="py-16 bg-white dark:bg-slate-950 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Sora, sans-serif' }}>Torrens University Courses We Support</h2>
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

      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ fontFamily: 'Sora, sans-serif' }}>Torrens Assessment Support</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {assessmentSupportItems.map((item) => (
              <div key={item} className="flex items-center gap-2.5 bg-white dark:bg-slate-800 rounded-xl px-4 py-3.5 border border-gray-100 dark:border-slate-700">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /><span className="text-sm font-medium text-gray-700 dark:text-gray-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="torrens-technology" className="py-16 bg-white dark:bg-slate-950 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}><Code2 className="w-6 h-6 text-indigo-600" />Torrens University IT & Technology Assignment Help</h2>
          <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm mb-4">
            Verified current Torrens technology programs include Bachelor, Graduate Certificate and
            Master of Software Engineering (including AI, Cloud Computing, Blockchain and
            Networking & Cybersecurity specialisations), and Diploma through to Master of
            Cybersecurity. Support covers programming (including C++, C# and Python), databases,
            networking, cybersecurity, data analytics and cloud computing.
          </p>
          <p className="text-xs text-gray-400 dark:text-slate-500">
            Specific unit codes weren't published on Torrens' course pages at the level Kaplan,
            CQUniversity or APIC publish them — support is matched to your actual unit outline
            rather than a pre-built code list.
          </p>
        </div>
      </section>

      <section id="torrens-business" className="py-14 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}><Briefcase className="w-6 h-6 text-indigo-600" />Torrens University Business Assignment Help</h2>
          <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm">
            Support for MBA, general business, marketing, event management, sports management and
            business analytics assessments — including business strategy, leadership, case studies
            and research reports. Torrens' MBA lecturers were recognised as Most Inspirational MBA
            Lecturers by MBAus in 2023 and 2024.
          </p>
        </div>
      </section>

      <section className="py-14 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8" style={{ fontFamily: 'Sora, sans-serif' }}>Other Torrens Study Areas We Support</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
              <h3 className="font-bold mb-2 flex items-center gap-2"><UtensilsCrossed className="w-5 h-5 text-indigo-600" />Hospitality</h3>
              <p className="text-sm text-gray-600 dark:text-slate-400">Hospitality and hotel management reports and case studies via Blue Mountains International Hotel Management School.</p>
            </div>
            <div className="bg-gray-50 dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
              <h3 className="font-bold mb-2 flex items-center gap-2"><HeartPulse className="w-5 h-5 text-indigo-600" />Health</h3>
              <p className="text-sm text-gray-600 dark:text-slate-400">Academic writing support for nursing, counselling, nutrition and naturopathy coursework — not clinical advice.</p>
            </div>
            <div className="bg-gray-50 dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
              <h3 className="font-bold mb-2 flex items-center gap-2"><School className="w-5 h-5 text-indigo-600" />Education</h3>
              <p className="text-sm text-gray-600 dark:text-slate-400">Support for education reports, teaching-related assignments and inclusive education coursework.</p>
            </div>
            <div className="bg-gray-50 dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
              <h3 className="font-bold mb-2 flex items-center gap-2"><Palette className="w-5 h-5 text-indigo-600" />Design</h3>
              <p className="text-sm text-gray-600 dark:text-slate-400">Portfolio and academic writing support for interior, graphic, fashion, UX and web design via Billy Blue College of Design.</p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 mt-6">
            <h3 className="font-bold mb-2 flex items-center gap-2"><Microscope className="w-5 h-5 text-indigo-600" />Higher Degrees by Research</h3>
            <p className="text-sm text-gray-600 dark:text-slate-400">Research methodology, literature review, academic writing, data analysis and referencing support for PhD, Master of Philosophy, Master of Research and Professional Doctorate candidates.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>Torrens Referencing & Academic Writing Support</h2>
          <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-7">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Referencing requirements can vary by course and unit at Torrens — always follow the
              style specified for your specific assessment. Support covers APA, Harvard, in-text
              citations, reference lists, paraphrasing, and referencing-focused proofreading.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 flex items-center justify-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}><Bot className="w-8 h-8 text-indigo-600" />Responsible AI & Academic Support</h2>
          <div className="bg-gray-50 dark:bg-slate-900 rounded-2xl p-7 border border-gray-100 dark:border-slate-700">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Students should follow the current assessment instructions and academic-integrity
              requirements of Torrens University and their individual unit before using generative
              AI in assessed work — verify any AI-generated information, follow disclosure
              requirements, and never misrepresent AI output as entirely your own where that isn't
              accurate.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>Academic Integrity & Responsible Academic Support</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-7 border border-gray-100 dark:border-slate-700">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Stack Assignment is not affiliated with, endorsed by, or partnered with Torrens
              University. Our services support understanding assessment requirements, research
              guidance, academic writing, proofreading, editing, referencing and data analysis
              guidance. Students remain fully responsible for their own final submissions and must
              follow Torrens' academic-integrity requirements.
            </p>
            <Link href="/integrity" className="text-indigo-600 dark:text-indigo-400 underline font-medium text-sm">Read our full Academic Integrity policy</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Torrens Academic Support Across Australia</h2>
          <p className="text-gray-600 dark:text-slate-400 leading-relaxed mb-6">Support is delivered online regardless of which Torrens campus you study at, or if you study fully online.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {campuses.map((c) => (
              <span key={c} className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-1.5 rounded-full text-sm font-semibold"><MapPin className="w-3.5 h-3.5" />{c}</span>
            ))}
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ fontFamily: 'Sora, sans-serif' }}>Torrens Student Resources</h2>
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
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wide">Other Australian University Academic Support</h3>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link href="/kaplan-assignment-help" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Kaplan Business School</Link><span className="text-gray-300 dark:text-slate-700">·</span>
            <Link href="/universities/cquniversity" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">CQUniversity</Link><span className="text-gray-300 dark:text-slate-700">·</span>
            <Link href="/universities/apic" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">APIC</Link><span className="text-gray-300 dark:text-slate-700">·</span>
            <Link href="/holmes-institute-assignment-help" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Holmes Institute</Link><span className="text-gray-300 dark:text-slate-700">·</span>
            <Link href="/universities/victoria-university" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Victoria University</Link><span className="text-gray-300 dark:text-slate-700">·</span>
            <Link href="/universities/victorian-institute-of-technology" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Victorian Institute of Technology</Link>
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, white 0%, transparent 8%), radial-gradient(circle at 80% 70%, white 0%, transparent 6%)' }} />
        <div className="max-w-3xl mx-auto px-6 text-center text-white relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Need Support With Your Torrens University Assessment?</h2>
          <p className="text-lg opacity-90 mb-8">Get subject-specific academic guidance for writing, research, IT, business, health, hospitality and other Torrens study areas.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/order" className="inline-block bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-10 py-4 rounded-xl text-lg font-bold transition shadow-xl shadow-yellow-400/30 hover:shadow-2xl hover:scale-105 active:scale-95">Get Academic Support</Link>
            <Link href="/order" className="inline-block border-2 border-white/70 hover:bg-white/10 px-10 py-4 rounded-xl text-lg font-semibold transition">Request a Quote</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
