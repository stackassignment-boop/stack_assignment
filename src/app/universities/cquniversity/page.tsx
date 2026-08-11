import { Metadata } from 'next'
import Link from 'next/link'
import {
  CheckCircle2,
  MapPin,
  FileText,
  ShieldCheck,
  GraduationCap,
  MessageCircle,
  Code2,
  ArrowRight,
  Briefcase,
  DollarSign,
  Megaphone,
  HeartPulse,
  HardHat,
  School,
  Award,
  ExternalLink,
  Bot,
  PenTool,
} from 'lucide-react'
import { StructuredData } from '@/components/seo/StructuredData'

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: 'CQUniversity Assignment Help Australia | Stack Assignment',
  description:
    'Academic support, assessment guidance, proofreading and research assistance for CQUniversity (CQU) students across Australia — business, nursing, engineering, education and IT.',
  keywords: [
    'CQUniversity assignment help',
    'CQU assignment help',
    'CQUniversity assignment help Australia',
    'CQU assessment help',
    'CQUniversity assessment help',
    'CQU academic support',
    'CQU academic writing help',
    'CQU report writing help',
    'CQU essay help',
    'CQU case study help',
    'CQU proofreading',
    'CQU referencing help',
  ],
  openGraph: {
    title: 'CQUniversity Assignment Help Australia | Stack Assignment',
    description:
      'Academic support, assessment guidance and referencing help for CQUniversity students across Australia.',
    url: 'https://www.stackassignment.com/universities/cquniversity',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.stackassignment.com/universities/cquniversity',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

// Verified via CQUniversity's own handbook.cqu.edu.au unit profile pages
// and unit prerequisite/co-requisite references. Campus offerings for
// COIT11226/COIT12208 confirmed: Brisbane, Cairns, Melbourne, Online,
// Rockhampton, Sydney, Townsville.
const campuses = ['Rockhampton', 'Cairns', 'Townsville', 'Brisbane', 'Melbourne', 'Sydney', 'Online']

const whyChooseUs = [
  { icon: GraduationCap, title: 'CQU-Focused Academic Support', desc: "Support built around CQUniversity's course structure and assessment style, not a generic template." },
  { icon: Briefcase, title: 'Subject-Specific Assistance', desc: 'From business and nursing through to engineering and IT, matched to your specific course area.' },
  { icon: FileText, title: 'Assessment Brief Guidance', desc: 'Help interpreting marking rubrics and assessment briefs so you know exactly what is required.' },
  { icon: PenTool, title: 'Academic Writing Support', desc: 'Guidance on structure, clarity, argument and academic tone across essays, reports and case studies.' },
  { icon: CheckCircle2, title: 'Referencing Guidance', desc: 'Support with APA, Harvard and other referencing styles, matched to your specific unit requirements.' },
  { icon: ShieldCheck, title: 'Confidential Online Support', desc: 'A straightforward, confidential service for CQU students studying on campus or online.' },
]

interface CourseArea {
  icon: typeof Briefcase
  title: string
  desc: string
  anchor?: string
}

const courseAreas: CourseArea[] = [
  { icon: Briefcase, title: 'Business & Management', desc: 'Business reports, business analysis, management, strategy, operations and project management.' },
  { icon: DollarSign, title: 'Accounting & Finance', desc: 'Accounting, financial analysis, financial reporting and finance assessments.' },
  { icon: Megaphone, title: 'Marketing', desc: 'Marketing, digital marketing, consumer behaviour and market research assessments.' },
  { icon: HeartPulse, title: 'Health & Nursing', desc: 'Nursing academic writing, health sciences, healthcare management and nursing case studies.' },
  { icon: HardHat, title: 'Engineering', desc: 'Civil, electrical and mechanical engineering reports, projects and technical writing.' },
  { icon: School, title: 'Education', desc: 'Education reports, teaching-related assignments and education case studies.' },
  { icon: Code2, title: 'Information Technology', desc: 'Programming, databases, networking, cybersecurity, web development and systems analysis.', anchor: '#cqu-it-support' },
  { icon: Award, title: 'MBA & Postgraduate', desc: 'Postgraduate business, management and analytics academic support.' },
]

const assessmentSupportItems = [
  'Essays', 'Reports', 'Case studies', 'Research papers', 'Literature reviews', 'Presentations',
  'Projects', 'Reflective writing', 'Data analysis', 'Programming projects', 'Database projects',
  'Engineering reports', 'Nursing academic assessments', 'Education assignments', 'Proofreading',
  'Editing', 'Referencing',
]

const itSupportItems = [
  'Programming', 'Python', 'Java', 'C++', 'SQL', 'Databases', 'Web Development', 'Networking',
  'Cybersecurity', 'Data Analytics', 'Data Visualisation', 'Systems Analysis', 'Software Engineering',
  'ICT Project Management',
]

// Unit codes verified against handbook.cqu.edu.au unit profile pages and
// cross-referenced prerequisite/co-requisite listings on other CQU unit
// pages (see summary notes). Confidence is high but not certified —
// students should always check their current unit outline.
interface Unit {
  code: string
  name: string
  support: string
}

const cquUnits: Unit[] = [
  { code: 'COIT11222', name: 'Programming Fundamentals', support: 'Programming and assessment guidance' },
  { code: 'COIT11226', name: 'Systems Analysis', support: 'Systems analysis and report guidance' },
  { code: 'COIT11237', name: 'Database Design & Implementation', support: 'Database and SQL guidance' },
  { code: 'COIT11238', name: 'Networked Infrastructure Foundations', support: 'Networking assignment guidance' },
  { code: 'COIT12208', name: 'ICT Project Management', support: 'Project management assignment guidance' },
  { code: 'COIT11223', name: 'ICT Ethics and Governance in Society', support: 'Ethics and governance essay guidance' },
  { code: 'COIS12036', name: 'Human-Computer Interaction', support: 'HCI assignment guidance' },
  { code: 'COIT11239', name: 'Professional Communications Skills for ICT', support: 'Communication and referencing guidance' },
]

const howItWorks = [
  { step: '1', title: 'Share Your Assessment Brief', desc: 'Upload or provide the relevant assessment instructions.' },
  { step: '2', title: 'Tell Us What You Need', desc: 'Choose academic writing, research guidance, proofreading, referencing, data analysis or subject support.' },
  { step: '3', title: 'Get Subject-Specific Support', desc: 'Connect with appropriate academic and subject expertise.' },
  { step: '4', title: 'Review the Guidance', desc: 'Use the feedback, explanations and resources to improve your understanding and work.' },
  { step: '5', title: 'Complete Your Own Submission', desc: 'Ensure the final work complies with your CQU assessment requirements and academic-integrity rules.' },
]

const studentResources = [
  'CQU Assignment Writing Guide', 'CQU Referencing Guide', 'How to Write a CQU Business Report',
  'CQU Nursing Assignment Guide', 'CQU Engineering Report Guide', 'CQU IT Project Guide',
  'CQU Programming Assignment Guide', 'CQU Case Study Writing Guide', 'CQU Academic Integrity Guide',
  'CQU Generative AI Guide', 'CQU Literature Review Guide', 'CQU Presentation Guide',
]

const faqs = [
  { q: 'What is CQU assignment help?', a: "Academic support built around CQUniversity's courses and assessment style — covering business, nursing, engineering, education and IT subjects, plus referencing and proofreading support." },
  { q: 'Do you provide CQUniversity assessment support?', a: 'Yes — support for essays, reports, case studies, research papers, presentations and data analysis assessments, matched to your unit outline and marking rubric.' },
  { q: 'Can you help with CQU business assignments?', a: 'Yes, including business reports, business analysis, management, strategy and operations assessments.' },
  { q: 'Do you provide CQU nursing academic support?', a: 'Yes — nursing academic writing, case studies, health research and literature reviews. This is academic writing support only, not clinical advice or real-world patient care guidance.' },
  { q: 'Can you help with CQU IT assignments?', a: 'Yes, including programming, databases, networking, cybersecurity, web development and systems analysis, matched to specific CQU unit codes where relevant (see the IT section below).' },
  { q: 'Can you help with CQU programming units?', a: 'Yes — Python, Java, C++ and general programming assignment guidance, including units like COIT11222 Programming Fundamentals.' },
  { q: 'Do you provide CQU engineering academic support?', a: 'Yes, including engineering reports, project documentation, technical writing and data analysis for engineering assessments.' },
  { q: 'Can you help with CQU reports and case studies?', a: 'Yes — structure, argument, evidence and referencing guidance for business, nursing, engineering and education case studies and reports.' },
  { q: 'Do you provide CQU referencing support?', a: "Yes. CQU doesn't use one universal referencing style across every course — students should follow the referencing style specified for their individual unit, and we support APA, Harvard and other formats accordingly." },
  { q: 'Can you help me understand my CQU assessment brief?', a: "Yes — upload your assessment brief or marking rubric and get guidance on what's being asked and how to structure your response." },
  { q: 'Do you provide CQU proofreading?', a: 'Yes — proofreading and editing covering structure, clarity, grammar and referencing consistency.' },
  { q: 'Can I use generative AI for my CQU assessment?', a: "That depends on your specific unit and assessment instructions — AI permissions can vary between assessments at CQU. Always check your assessment instructions and follow CQU's requirements, including acknowledging AI use where required." },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function CQUniversityPage() {
  return (
    <main className="flex-grow">
      <StructuredData data={faqSchema} />

      {/* HERO */}
      <section className="relative text-white py-24 md:py-36 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'linear-gradient(135deg, rgba(30,41,59,0.95), rgba(15,23,42,0.97)), url(https://picsum.photos/id/1011/1920/1080)' }}
        />
        <div className="absolute rounded-full blur-3xl opacity-30 animate-float" style={{ top: '8%', left: '6%', width: '320px', height: '320px', background: 'radial-gradient(circle, #6366f1, transparent 70%)' }} />
        <div className="absolute rounded-full blur-3xl opacity-25 animate-float" style={{ bottom: '10%', right: '8%', width: '280px', height: '280px', background: 'radial-gradient(circle, #a855f7, transparent 70%)', animationDelay: '7s' }} />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 rounded-full px-5 py-2 text-sm font-semibold mb-8 backdrop-blur-sm">
            <GraduationCap className="w-4 h-4" />
            For CQUniversity (CQU) Students
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
            CQUniversity Assignment Help Australia
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-10 font-medium">
            Academic support, assessment guidance, proofreading, research assistance and study
            resources for CQUniversity students.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/order" className="bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-10 py-4 rounded-xl text-lg font-bold transition shadow-xl shadow-yellow-400/30 hover:shadow-2xl hover:scale-105 active:scale-95 min-w-[240px]">
              Get CQU Academic Support
            </Link>
            <Link href="#cqu-courses" className="border-2 border-white/70 hover:bg-white/10 px-10 py-4 rounded-xl text-lg font-semibold transition min-w-[240px]">
              View CQU Services
            </Link>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            CQUniversity (CQU) students study across a genuinely wide range of disciplines — business,
            nursing, engineering, education and IT among them — often across multiple campuses or
            fully online. That breadth means assessment styles vary a lot between courses: a nursing
            case study calls for different structure and evidence than an engineering project report
            or an IT programming assignment.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Stack Assignment provides academic support for CQU students across Australia — covering
            academic writing guidance, research assistance, referencing help, proofreading, data
            analysis guidance and subject-specific support matched to your actual course area, from
            business reports and case studies through to programming assignments and literature
            reviews.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Whether you're studying at Rockhampton, Cairns, Townsville, Brisbane, Melbourne, Sydney
            or online, support works the same way — matched to your unit and assessment brief rather
            than a generic template.
          </p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
            Why Choose Stack Assignment for CQU Academic Support?
          </h2>
          <p className="text-center text-gray-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            Built around the breadth of what CQU students actually study.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="bg-white dark:bg-slate-800 rounded-2xl p-7 shadow-md border border-gray-100 dark:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CQU COURSES WE SUPPORT */}
      <section id="cqu-courses" className="py-16 bg-white dark:bg-slate-950 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
            CQUniversity Courses We Support
          </h2>
          <p className="text-center text-gray-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            Support spans CQU's full course breadth — not just IT.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {courseAreas.map((course) => {
              const inner = (
                <>
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center mb-4">
                    <course.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-bold text-base mb-1.5">{course.title}</h3>
                  <p className="text-gray-500 dark:text-slate-400 text-xs leading-relaxed">{course.desc}</p>
                </>
              )
              if (course.anchor) {
                return (
                  <a key={course.title} href={course.anchor} className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-800 block">
                    {inner}
                  </a>
                )
              }
              // Dedicated pages for these course areas don't exist yet —
              // non-linked cards rather than fake/broken links.
              return (
                <div key={course.title} className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
                  {inner}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CQU ASSESSMENT SUPPORT */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ fontFamily: 'Sora, sans-serif' }}>
            CQU Assessment Support
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {assessmentSupportItems.map((item) => (
              <div key={item} className="flex items-center gap-2.5 bg-white dark:bg-slate-800 rounded-xl px-4 py-3.5 border border-gray-100 dark:border-slate-700">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CQU IT ASSIGNMENT SUPPORT */}
      <section id="cqu-it-support" className="py-16 bg-white dark:bg-slate-950 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 rounded-full px-5 py-2 text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-5">
              <Code2 className="w-4 h-4" />
              Bachelor & Associate Degree of IT
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
              CQUniversity IT Assignment Support
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mb-12">
            {itSupportItems.map((item) => (
              <div key={item} className="flex items-center gap-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl px-4 py-3 border border-gray-100 dark:border-slate-700">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{item}</span>
              </div>
            ))}
          </div>

          {/* UNIT-LEVEL SEO SECTION */}
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
            CQU Unit & Subject Academic Support
          </h2>
          <p className="text-center text-gray-500 dark:text-slate-400 mb-8 max-w-2xl mx-auto text-sm">
            Verified against CQUniversity's own unit profile handbook.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-slate-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-800 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Unit Code</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Unit Name</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Academic Support</th>
                </tr>
              </thead>
              <tbody>
                {cquUnits.map((u, i) => (
                  <tr key={u.code} className={i % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-gray-50/60 dark:bg-slate-900'}>
                    <td className="px-4 py-3 font-mono font-semibold text-indigo-700 dark:text-indigo-400 whitespace-nowrap">{u.code}</td>
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{u.name}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-slate-400">{u.support}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 dark:text-slate-500 mt-6 text-center max-w-2xl mx-auto">
            Course structures, unit codes and assessment requirements can change. Students should
            verify current information through CQUniversity's official course and student
            resources. Source:{' '}
            <a href="https://handbook.cqu.edu.au" target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-1">
              CQUniversity Handbook <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>
      </section>

      {/* CQU BUSINESS & MANAGEMENT */}
      <section className="py-14 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}>
            <Briefcase className="w-6 h-6 text-indigo-600" />
            CQU Business & Management Academic Support
          </h2>
          <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm">
            Support for business reports, management reports, marketing, accounting, finance,
            business analytics, project management, case studies and research assessments across
            CQU's business courses.
          </p>
        </div>
      </section>

      {/* CQU NURSING & HEALTH */}
      <section className="py-14 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}>
            <HeartPulse className="w-6 h-6 text-indigo-600" />
            CQU Nursing & Health Academic Support
          </h2>
          <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm mb-3">
            Support for nursing academic writing, nursing case studies, health research, literature
            reviews, referencing and academic proofreading.
          </p>
          <p className="text-gray-500 dark:text-slate-500 text-xs bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg px-4 py-3">
            This is academic writing support only — it does not include clinical decision-making
            or real-world patient treatment guidance.
          </p>
        </div>
      </section>

      {/* CQU ENGINEERING */}
      <section className="py-14 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}>
            <HardHat className="w-6 h-6 text-indigo-600" />
            CQU Engineering Academic Support
          </h2>
          <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm">
            Support for engineering reports, research, project documentation, data analysis and
            technical writing across civil, electrical and mechanical engineering assessments.
          </p>
        </div>
      </section>

      {/* CQU EDUCATION */}
      <section className="py-14 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}>
            <School className="w-6 h-6 text-indigo-600" />
            CQU Education & Teaching Academic Support
          </h2>
          <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm">
            Support for education reports, teaching-related assignments, education case studies,
            literature reviews and research writing.
          </p>
        </div>
      </section>

      {/* REFERENCING & ACADEMIC WRITING */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
            CQU Referencing & Academic Writing Support
          </h2>
          <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-7">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              CQU doesn't use one universal referencing style across every course — the required
              style (APA, Harvard, or another format) is specified for each individual unit and
              assessment, so it's worth checking your unit outline before you start referencing.
              Support covers:
            </p>
            <ul className="grid sm:grid-cols-2 gap-2">
              {['APA referencing', 'Harvard referencing', 'In-text citations', 'Reference lists', 'Academic source selection', 'Paraphrasing', 'Literature reviews', 'Referencing-focused proofreading'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* GENERATIVE AI SECTION */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 flex items-center justify-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}>
            <Bot className="w-8 h-8 text-indigo-600" />
            CQU Generative AI & Academic Integrity
          </h2>
          <div className="bg-gray-50 dark:bg-slate-900 rounded-2xl p-7 border border-gray-100 dark:border-slate-700">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Generative AI permissions can vary between individual assessments at CQU — some may
              allow limited AI use with acknowledgement, others may not permit it at all. A few
              things worth keeping in mind:
            </p>
            <ul className="space-y-2 mb-4">
              {[
                'Always check your specific assessment instructions before using AI tools',
                'Follow CQUniversity\'s current requirements on generative AI use',
                'AI-generated material may need to be acknowledged where permitted',
                'Verify any information or sources AI tools provide — they can be inaccurate',
                'AI output should never be represented as entirely your own work where that isn\'t accurate',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ACADEMIC INTEGRITY */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
            CQU Academic Integrity & Responsible Academic Support
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-7 border border-gray-100 dark:border-slate-700">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Stack Assignment is not affiliated with, endorsed by, or partnered with CQUniversity.
              Our services are designed to support CQU students through:
            </p>
            <ul className="grid sm:grid-cols-2 gap-2 mb-4">
              {['Assessment interpretation', 'Research guidance', 'Academic writing guidance', 'Proofreading', 'Editing', 'Referencing support', 'Data analysis guidance', 'Study resources and subject explanations'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Students remain fully responsible for their own final assessment submissions and
              must comply with CQU's academic-integrity requirements, including its policies on
              contract cheating and outsourcing assessed work. It's worth reading CQU's own
              academic integrity policy before using any academic support service, including ours.
            </p>
            <Link href="/integrity" className="text-indigo-600 dark:text-indigo-400 underline font-medium text-sm">
              Read our full Academic Integrity policy
            </Link>
          </div>
        </div>
      </section>

      {/* CREDIBLE BENEFITS (replaces unverified numeric claims for this page) */}
      <section className="py-14 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="text-center text-sm font-semibold text-gray-500 dark:text-gray-400 mb-6 uppercase tracking-wide">
            What CQU Students Get
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Subject-specific support', 'Academic writing assistance', 'Confidential service', 'Referencing support', 'Proofreading', 'Research guidance', 'Data analysis assistance', 'Assessment brief guidance'].map((item) => (
              <div key={item} className="flex items-center gap-2.5 bg-gray-50 dark:bg-slate-800 rounded-lg p-3 shadow-sm border border-gray-100 dark:border-slate-700">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CQU LOCATIONS */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            CQUniversity Academic Support Across Australia
          </h2>
          <p className="text-gray-600 dark:text-slate-400 leading-relaxed mb-6">
            Whichever CQU campus you study at — or if you study fully online — support is delivered
            the same way, entirely online.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {campuses.map((c) => (
              <span key={c} className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-1.5 rounded-full text-sm font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Sora, sans-serif' }}>
            How It Works
          </h2>
          <div className="space-y-5">
            {howItWorks.map((item) => (
              <div key={item.step} className="flex gap-5 bg-gray-50 dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold flex-shrink-0">{item.step}</div>
                <div>
                  <h3 className="font-bold text-base mb-1">{item.title}</h3>
                  <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STUDENT RESOURCES */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
            CQU Student Resources
          </h2>
          <p className="text-center text-gray-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
            Dedicated guides for these topics are planned — check back soon.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {studentResources.map((item) => (
              <div key={item} className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-xl px-4 py-3.5 border border-gray-100 dark:border-slate-700">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{item}</span>
                <span className="text-xs text-gray-400 dark:text-slate-500 flex-shrink-0 ml-3">Coming soon</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ fontFamily: 'Sora, sans-serif' }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((item) => (
              <div key={item.q} className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 transition hover:shadow-md">
                <h3 className="font-bold text-lg mb-2 flex items-start gap-2">
                  <MessageCircle className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                  {item.q}
                </h3>
                <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed pl-7">{item.a}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-slate-500 mt-6">
            Read our full{' '}
            <Link href="/integrity" className="text-indigo-600 dark:text-indigo-400 underline font-medium">Academic Integrity policy</Link>{' '}
            before ordering.
          </p>
        </div>
      </section>

      {/* OTHER UNIVERSITIES */}
      <section className="py-10 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wide">
            Support for Other Australian Universities
          </h3>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link href="/kaplan-assignment-help" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Kaplan Business School</Link>
            <span className="text-gray-300 dark:text-slate-700">·</span>
            <Link href="/melbourne-institute-of-technology-assignment-help" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Melbourne Institute of Technology</Link>
            <span className="text-gray-300 dark:text-slate-700">·</span>
            <Link href="/holmes-institute-assignment-help" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Holmes Institute</Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, white 0%, transparent 8%), radial-gradient(circle at 80% 70%, white 0%, transparent 6%)' }} />
        <div className="max-w-3xl mx-auto px-6 text-center text-white relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Get CQU Academic Support
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Get a free quote for your CQU assessment — takes less than a minute.
          </p>
          <Link href="/order" className="inline-block bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-10 py-4 rounded-xl text-lg font-bold transition shadow-xl shadow-yellow-400/30 hover:shadow-2xl hover:scale-105 active:scale-95">
            Request a Quote →
          </Link>
        </div>
      </section>
    </main>
  )
}
