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
  Briefcase,
  Network,
  Award,
  ExternalLink,
  Bot,
  PenTool,
  Database,
} from 'lucide-react'
import { StructuredData } from '@/components/seo/StructuredData'

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: 'APIC Assignment Help Australia | Asia Pacific International College',
  description:
    'APIC assignment help and academic support for Asia Pacific International College students in IT, business, business information systems, project management and MBA.',
  keywords: [
    'APIC assignment help',
    'Asia Pacific International College assignment help',
    'APIC assessment help',
    'APIC academic support',
    'APIC IT assignment help',
    'APIC business assignment help',
    'APIC project management assignment help',
    'APIC business information systems assignment help',
    'APIC MBA assignment help',
    'APIC postgraduate assignment help',
    'APIC programming assignment help',
    'APIC database assignment help',
    'APIC cybersecurity assignment help',
  ],
  openGraph: {
    title: 'APIC Assignment Help Australia | Asia Pacific International College',
    description:
      'Academic support, assessment guidance and referencing help for Asia Pacific International College (APIC) students across Australia.',
    url: 'https://www.stackassignment.com/universities/apic',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.stackassignment.com/universities/apic',
  },
}

// ---------------------------------------------------------------------------
// Data — verified directly against apicollege.edu.au (the correct
// institution: Asia Pacific International College, CRICOS 03048D,
// PRV12007). An earlier draft of this page was built against the wrong
// "Australian Pacific International College" (a separate VET provider at
// apic.edu.au) and has been discarded entirely.
// ---------------------------------------------------------------------------
const campuses = [
  { city: 'Sydney', address: 'Level 6, 1-3 Fitzwilliam Street, Parramatta NSW 2150' },
  { city: 'Melbourne', address: 'Level 3, 655 Collins Street, Docklands VIC 3008' },
  { city: 'Brisbane', address: 'Level 2, 269 Wickham Street, Fortitude Valley QLD 4006' },
]

const whyChooseUs = [
  { icon: GraduationCap, title: 'APIC-Focused Academic Support', desc: "Support built around APIC's actual unit structure and project-based assessment style." },
  { icon: Briefcase, title: 'Subject-Specific Guidance', desc: 'From IT and business information systems through to project management and MBA subjects.' },
  { icon: FileText, title: 'Assessment Brief Interpretation', desc: 'Help understanding what a project, report or presentation brief is actually asking for.' },
  { icon: PenTool, title: 'Academic Writing Support', desc: 'Guidance on structure, clarity, argument and academic tone across reports and projects.' },
  { icon: CheckCircle2, title: 'Referencing Guidance', desc: 'Support with APA, Harvard and other referencing styles, matched to your specific unit requirements.' },
  { icon: ShieldCheck, title: 'Confidential Online Support', desc: 'A straightforward, confidential service for APIC students at any of the three campuses.' },
]

interface CourseArea {
  icon: typeof Briefcase
  title: string
  desc: string
  anchor?: string
}

const courseAreas: CourseArea[] = [
  { icon: Code2, title: 'Information Technology', desc: 'Bachelor of IT, Bachelor of IT (Computer Networks and Security), Grad Cert, and Master of IT (including AI, Enterprise Networks, and Cyber Security specialisations).', anchor: '#apic-it-support' },
  { icon: Database, title: 'Business Information Systems', desc: 'Diploma and Bachelor of Business Information Systems — sitting between business and IT.' },
  { icon: Briefcase, title: 'Business', desc: 'Diploma and Bachelor of Business, including Accounting, Analytics & AI, and Project Management specialisations.' },
  { icon: Network, title: 'Project Management', desc: 'Grad Cert, Grad Diploma, and Master of Project Management and Business (MPMB), including ICT and Health Management specialisations.' },
  { icon: Award, title: 'Business Administration / MBA', desc: 'Grad Cert and Grad Diploma of Business Management, and MBA (including Health Management, Project Management, and IT specialisations).' },
]

const assessmentSupportItems = [
  'Written assessments', 'Reports', 'Projects', 'Presentations', 'Case studies', 'Research',
  'Reflective writing', 'Data analysis', 'IT projects', 'Business reports', 'Management projects', 'Proofreading', 'Referencing', 'Editing',
]

// Verified directly against APIC's own Bachelor of Information Technology
// course page (apicollege.edu.au/courses/bachelor-of-information-technology).
interface Unit {
  code: string
  name: string
  prereq: string
  support: string
}

const apicUnits: Unit[] = [
  { code: 'BIS1001', name: 'Foundations of Information Systems', prereq: 'Nil', support: 'Information systems assignment guidance' },
  { code: 'BIS1002', name: 'Data and Information Management', prereq: 'Nil', support: 'Data management guidance' },
  { code: 'BIS1003', name: 'Introduction to Programming', prereq: 'Nil', support: 'Programming assignment guidance' },
  { code: 'BIS2001', name: 'IT Infrastructure and Networking', prereq: 'BIS1001', support: 'Networking assignment guidance' },
  { code: 'BIS2002', name: 'Systems Analysis and Design', prereq: 'BIS1001', support: 'Systems analysis guidance' },
  { code: 'BIS2003', name: 'IS Project Management', prereq: 'BIS1001', support: 'Project management guidance' },
  { code: 'BIS2005', name: 'Enterprise Architecture', prereq: 'BIS1001', support: 'Architecture/systems design guidance' },
  { code: 'BIS2004', name: 'Object Oriented Programming', prereq: 'BIS1003', support: 'OOP assignment guidance' },
  { code: 'BIS3001', name: 'Data Analytics for Business', prereq: 'BIS1002', support: 'Data analytics guidance' },
  { code: 'BIS3004', name: 'IS Security and Risk Management', prereq: 'BIS2001', support: 'Security/risk assignment guidance' },
  { code: 'BIS3005', name: 'Cloud Computing', prereq: 'BIS2005', support: 'Cloud computing assignment guidance' },
  { code: 'ICT3050', name: 'Routing and Switching', prereq: 'BIS2001', support: 'Networking assignment guidance' },
  { code: 'ICT3051', name: 'Enterprise Networking', prereq: 'BIS2001', support: 'Enterprise networking guidance' },
  { code: 'ICT3052', name: 'Digital Forensics', prereq: 'BIS2001', support: 'Digital forensics assignment guidance' },
  { code: 'ICT3053', name: 'Cyber Defence', prereq: 'BIS2001', support: 'Cybersecurity assignment guidance' },
  { code: 'BUS1001', name: 'Professional Development and Business Communication', prereq: 'Nil', support: 'Communication/writing guidance' },
  { code: 'BUS2003', name: 'Sustainability and Ethics', prereq: 'Nil', support: 'Essay and ethics assignment guidance' },
  { code: 'ICT3054', name: 'IT Capstone Industry Project A', prereq: 'BUS2003 & BIS2003', support: 'Capstone project guidance' },
  { code: 'ICT3055', name: 'IT Capstone Industry Project B', prereq: 'ICT3054', support: 'Capstone project guidance' },
]

const howItWorks = [
  { step: '1', title: 'Share Your Assessment Requirements', desc: 'Provide the relevant task instructions, unit information or assessment brief.' },
  { step: '2', title: 'Tell Us What Support You Need', desc: 'Choose writing, proofreading, referencing, research, data analysis, programming or subject guidance.' },
  { step: '3', title: 'Get Subject-Specific Support', desc: 'Receive support relevant to your course and unit.' },
  { step: '4', title: 'Review the Guidance', desc: 'Use the feedback and explanations to improve your own work.' },
  { step: '5', title: 'Complete Your Own Submission', desc: 'Ensure the final assessment follows APIC requirements and represents your own work.' },
]

const studentResources = [
  'APIC Assignment Writing Guide', 'APIC Report Writing Guide', 'APIC Referencing Guide',
  'APIC IT Assignment Guide', 'APIC Programming Guide', 'APIC Database Guide',
  'APIC Cybersecurity Study Guide', 'APIC Business Report Guide', 'APIC Project Management Guide',
  'APIC MBA Assignment Guide', 'APIC Research Guide', 'APIC Presentation Guide',
]

const faqs = [
  { q: 'What is APIC assignment help?', a: 'Academic support built around Asia Pacific International College\'s (APIC) courses — covering IT, business, business information systems, project management and MBA subjects, matched to real APIC unit codes where relevant.' },
  { q: 'What is Asia Pacific International College?', a: 'Asia Pacific International College (APIC) is an Australian Institute of Higher Education offering undergraduate and postgraduate degrees in IT, business, business information systems, project management and business administration, with campuses in Sydney, Melbourne and Brisbane.' },
  { q: 'Do you provide APIC assessment support?', a: 'Yes — support for written assessments, reports, projects, presentations and case studies, matched to your unit outline and assessment brief.' },
  { q: 'Can you help with APIC IT assignments?', a: 'Yes, including programming, networking, systems analysis, cybersecurity and database subjects across the Bachelor and Master of Information Technology.' },
  { q: 'Can you help with APIC programming assessments?', a: 'Yes — including units like BIS1003 Introduction to Programming and BIS2004 Object Oriented Programming.' },
  { q: 'Do you provide APIC database assignment support?', a: 'Yes, including units like BIS1002 Data and Information Management and related database design and data analytics work.' },
  { q: 'Can you help with APIC cybersecurity assessments?', a: 'Yes — including units like ICT3053 Cyber Defence, ICT3052 Digital Forensics and BIS3004 IS Security and Risk Management.' },
  { q: 'Do you provide APIC business assignment help?', a: 'Yes, across the Bachelor of Business and its Accounting, Analytics & AI, and Project Management specialisations.' },
  { q: 'Can you help with APIC project management assessments?', a: 'Yes, across the Graduate Certificate, Graduate Diploma, and Master of Project Management and Business (MPMB).' },
  { q: 'Do you provide APIC MBA academic support?', a: 'Yes, including the MBA and its Health Management, Project Management, and Information Technology specialisations.' },
  { q: 'Do you provide APIC proofreading and referencing support?', a: "Yes — proofreading, editing, and referencing guidance across APA, Harvard and other styles. APIC doesn't use one universal referencing style, so we match whatever your specific unit requires." },
  { q: 'Can you help me understand my APIC assessment requirements?', a: "Yes — upload your assessment brief or unit information and get guidance on what's being asked and how to structure your response." },
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

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.stackassignment.com' },
    { '@type': 'ListItem', position: 2, name: 'Universities', item: 'https://www.stackassignment.com/universities' },
    { '@type': 'ListItem', position: 3, name: 'APIC Assignment Help', item: 'https://www.stackassignment.com/universities/apic' },
  ],
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function APICPage() {
  return (
    <main className="flex-grow">
      <StructuredData data={[faqSchema, breadcrumbSchema]} />

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-6 pt-6 text-sm text-gray-500 dark:text-slate-400">
        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
        <span className="mx-2">›</span>
        <span>Universities</span>
        <span className="mx-2">›</span>
        <span className="text-gray-700 dark:text-gray-300">APIC Assignment Help</span>
      </div>

      {/* HERO */}
      <section className="relative text-white py-24 md:py-36 overflow-hidden mt-6">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(135deg, rgba(30,41,59,0.95), rgba(15,23,42,0.97)), url(https://picsum.photos/id/1043/1920/1080)' }} />
        <div className="absolute rounded-full blur-3xl opacity-30 animate-float" style={{ top: '8%', left: '6%', width: '320px', height: '320px', background: 'radial-gradient(circle, #6366f1, transparent 70%)' }} />
        <div className="absolute rounded-full blur-3xl opacity-25 animate-float" style={{ bottom: '10%', right: '8%', width: '280px', height: '280px', background: 'radial-gradient(circle, #a855f7, transparent 70%)', animationDelay: '7s' }} />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 rounded-full px-5 py-2 text-sm font-semibold mb-8 backdrop-blur-sm">
            <GraduationCap className="w-4 h-4" />
            For Asia Pacific International College (APIC) Students
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
            APIC Assignment Help Australia
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-10 font-medium">
            Academic support, assessment guidance, research assistance, proofreading and study
            resources for Asia Pacific International College students.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/order" className="bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-10 py-4 rounded-xl text-lg font-bold transition shadow-xl shadow-yellow-400/30 hover:shadow-2xl hover:scale-105 active:scale-95 min-w-[240px]">
              Get APIC Academic Support
            </Link>
            <Link href="#apic-courses" className="border-2 border-white/70 hover:bg-white/10 px-10 py-4 rounded-xl text-lg font-semibold transition min-w-[240px]">
              View APIC Services
            </Link>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Asia Pacific International College (APIC) takes a distinctive approach to assessment —
            rather than traditional exams, most units are assessed through real-world projects,
            presentations and teamwork, across IT, business information systems, business, project
            management and MBA programs at its Sydney, Melbourne and Brisbane campuses.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            That project-based structure means APIC students often need support with a different
            mix of tasks than students in exam-heavy programs — structuring a business report,
            working through a systems analysis project, preparing a presentation, or interpreting
            what a capstone industry project actually requires.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Stack Assignment provides academic support for APIC students across Australia —
            covering academic writing guidance, research assistance, referencing help, proofreading,
            data analysis guidance and subject-specific support matched to your actual course and
            unit, from programming and database subjects through to project management and MBA
            coursework.
          </p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
            Why Choose Stack Assignment for APIC Academic Support?
          </h2>
          <p className="text-center text-gray-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            Built around APIC's project-based assessment style.
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

      {/* APIC COURSES WE SUPPORT */}
      <section id="apic-courses" className="py-16 bg-white dark:bg-slate-950 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
            APIC Courses We Support
          </h2>
          <p className="text-center text-gray-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            Verified against APIC's current course catalogue.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
              return (
                <div key={course.title} className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
                  {inner}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* APIC ASSESSMENT SUPPORT */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
            APIC Assessment Support
          </h2>
          <p className="text-center text-gray-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto text-sm">
            APIC's own site confirms assessment is project- and presentation-based rather than
            traditional exams — not every course uses every format below.
          </p>
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

      {/* APIC IT ASSIGNMENT SUPPORT + UNIT TABLE */}
      <section id="apic-it-support" className="py-16 bg-white dark:bg-slate-950 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 rounded-full px-5 py-2 text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-5">
              <Code2 className="w-4 h-4" />
              Bachelor & Master of Information Technology
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
              APIC IT Assignment & Academic Support
            </h2>
            <p className="text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
              Support for programming, databases, networking, cybersecurity, systems analysis and
              enterprise architecture, matched to your specific unit.
            </p>
          </div>

          <h3 className="font-bold text-lg mb-4">APIC IT Units & Academic Support</h3>
          <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">
            Sourced directly from the Bachelor of Information Technology course structure on
            apicollege.edu.au.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-slate-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-800 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Unit Code</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Unit Name</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200 hidden sm:table-cell">Prerequisite</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Academic Support</th>
                </tr>
              </thead>
              <tbody>
                {apicUnits.map((u, i) => (
                  <tr key={u.code} className={i % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-gray-50/60 dark:bg-slate-900'}>
                    <td className="px-4 py-3 font-mono font-semibold text-indigo-700 dark:text-indigo-400 whitespace-nowrap">{u.code}</td>
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{u.name}</td>
                    <td className="px-4 py-3 text-gray-400 dark:text-slate-500 whitespace-nowrap hidden sm:table-cell">{u.prereq}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-slate-400">{u.support}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 dark:text-slate-500 mt-6 text-center max-w-2xl mx-auto">
            Course structures, units and assessment requirements may change. Students should
            verify current information through official APIC course documentation and their unit
            materials. Source:{' '}
            <a href="https://apicollege.edu.au/courses/bachelor-of-information-technology/" target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-1">
              APIC Bachelor of IT course page <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>
      </section>

      {/* PROJECT MANAGEMENT SUPPORT */}
      <section className="py-14 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}>
            <Network className="w-6 h-6 text-indigo-600" />
            APIC Project Management Academic Support
          </h2>
          <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm mb-3">
            Support for project planning, risk management, project governance, quality, reporting,
            stakeholder management and project documentation across APIC's Graduate Certificate,
            Graduate Diploma and Master of Project Management and Business (MPMB).
          </p>
          <p className="text-gray-500 dark:text-slate-500 text-xs">
            Many APIC postgraduate programs, including MPMB and MBA, include a capstone
            <strong> PRJ6001 Applied Project</strong> unit — support is available for this unit's
            research and report requirements.
          </p>
        </div>
      </section>

      {/* MBA SUPPORT */}
      <section className="py-14 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}>
            <Award className="w-6 h-6 text-indigo-600" />
            APIC MBA & Postgraduate Assignment Support
          </h2>
          <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm">
            Support across APIC's MBA (including Health Management, Project Management and IT
            specialisations), Graduate Certificate and Graduate Diploma of Business Management —
            covering strategic management, research reports, case studies, presentations and the
            PRJ6001 Applied Project capstone unit where relevant.
          </p>
        </div>
      </section>

      {/* REFERENCING & ACADEMIC WRITING */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
            APIC Referencing & Academic Writing Support
          </h2>
          <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-7">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              APIC doesn't use one universal referencing style across every course — follow the
              style specified for your specific unit and assessment. Support covers:
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

      {/* GENERATIVE AI */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 flex items-center justify-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}>
            <Bot className="w-8 h-8 text-indigo-600" />
            APIC & Responsible Use of Generative AI
          </h2>
          <div className="bg-gray-50 dark:bg-slate-900 rounded-2xl p-7 border border-gray-100 dark:border-slate-700">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Students should check the current APIC assessment instructions and academic-integrity
              requirements before using generative AI in assessed work. A few responsible practices
              worth keeping in mind:
            </p>
            <ul className="space-y-2">
              {[
                'Verify any information or sources AI tools provide',
                'Follow your specific assessment instructions',
                'Disclose AI use where required',
                "Don't misrepresent AI-generated work as entirely your own where that isn't accurate",
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
            APIC Academic Integrity & Responsible Academic Support
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-7 border border-gray-100 dark:border-slate-700">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Stack Assignment is not affiliated with, endorsed by, or partnered with Asia Pacific
              International College. Our services are designed to support APIC students through:
            </p>
            <ul className="grid sm:grid-cols-2 gap-2 mb-4">
              {['Assessment interpretation', 'Research guidance', 'Academic writing guidance', 'Proofreading', 'Editing', 'Referencing support', 'Data analysis guidance', 'Programming explanations'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Students remain fully responsible for their own final submissions and must follow
              APIC's academic-integrity requirements. It's worth reading APIC's own academic
              integrity policy before using any academic support service, including ours.
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
            What APIC Students Get
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

      {/* CAMPUSES */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            APIC Academic Support Across Australia
          </h2>
          <p className="text-gray-600 dark:text-slate-400 leading-relaxed mb-8">
            Support is delivered online, regardless of which APIC campus you study at — we're not
            physically located at any APIC campus.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {campuses.map((c) => (
              <div key={c.city} className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-gray-100 dark:border-slate-700">
                <div className="flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-200 mb-1.5">
                  <MapPin className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  {c.city}
                </div>
                <p className="text-xs text-gray-500 dark:text-slate-400">{c.address}</p>
              </div>
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
            APIC Student Resources
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
            Other Australian Academic Support
          </h3>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link href="/kaplan-assignment-help" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Kaplan Business School</Link>
            <span className="text-gray-300 dark:text-slate-700">·</span>
            <Link href="/universities/cquniversity" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">CQUniversity</Link>
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
            Need Support With Your APIC Assessment?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Get subject-specific academic guidance for writing, research, IT, project management,
            hospitality, management and other APIC study areas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/order" className="inline-block bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-10 py-4 rounded-xl text-lg font-bold transition shadow-xl shadow-yellow-400/30 hover:shadow-2xl hover:scale-105 active:scale-95">
              Get APIC Academic Support
            </Link>
            <Link href="/order" className="inline-block border-2 border-white/70 hover:bg-white/10 px-10 py-4 rounded-xl text-lg font-semibold transition">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
