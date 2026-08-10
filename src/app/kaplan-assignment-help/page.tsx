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
  AlertCircle,
  Briefcase,
  DollarSign,
  Megaphone,
  Users,
  BarChart3,
  Utensils,
  Award,
  Database,
  Network,
  Search,
  Globe,
  PenTool,
  ClipboardCheck,
  ExternalLink,
} from 'lucide-react'
import { StructuredData } from '@/components/seo/StructuredData'

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: 'Kaplan Business School Assignment Help Australia | Stack Assignment',
  description:
    'Academic support, assessment guidance, proofreading, referencing and research assistance for Kaplan Business School (KBS) students across Australia — business, accounting, marketing, IT, and MBA.',
  keywords: [
    'Kaplan Business School assignment help',
    'KBS assignment help',
    'Kaplan assignment help',
    'Kaplan Business School assessment help',
    'KBS assessment help',
    'Kaplan Business School assignment help Australia',
    'KBS academic support',
    'KBS academic writing help',
    'KBS report writing help',
    'KBS Harvard referencing',
    'KBS business assignment help',
    'KBS accounting assignment help',
    'KBS marketing assignment help',
    'KBS IT assignment help',
    'KBS MBA assignment help',
  ],
  openGraph: {
    title: 'Kaplan Business School Assignment Help Australia | Stack Assignment',
    description:
      'Academic support, assessment guidance, proofreading and referencing help for Kaplan Business School students across Australia.',
    url: 'https://www.stackassignment.com/kaplan-assignment-help',
    type: 'website',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const campuses = ['Adelaide', 'Brisbane', 'Melbourne', 'Perth', 'Sydney']

const whyChooseUs = [
  {
    icon: GraduationCap,
    title: 'KBS-Focused Academic Support',
    desc: "Support built around Kaplan Business School's own unit structure, trimester calendar and assessment style — not a generic template.",
  },
  {
    icon: Briefcase,
    title: 'Subject-Specific Assistance',
    desc: 'From business and accounting through to IT and analytics, matched to the specific course area your assessment falls under.',
  },
  {
    icon: ClipboardCheck,
    title: 'Assessment Brief Guidance',
    desc: 'Help interpreting marking rubrics and assessment briefs, so you understand exactly what is being asked before you start.',
  },
  {
    icon: PenTool,
    title: 'Academic Writing & Proofreading',
    desc: 'Feedback and proofreading support on structure, clarity, argument and academic tone.',
  },
  {
    icon: FileText,
    title: "Harvard Referencing Support",
    desc: "Guidance based on Kaplan's own Harvard referencing guide, including in-text citations and reference lists.",
  },
  {
    icon: ShieldCheck,
    title: 'Confidential Online Support',
    desc: 'A straightforward, confidential service for students studying at any Kaplan campus across Australia.',
  },
]

interface CourseArea {
  icon: typeof Briefcase
  title: string
  desc: string
  anchor?: string
}

const courseAreasDetailed: CourseArea[] = [
  {
    icon: Briefcase,
    title: 'Business',
    desc: 'Business reports, business analysis, strategy and management-focused assessments.',
  },
  {
    icon: DollarSign,
    title: 'Accounting & Finance',
    desc: 'Accounting, financial reporting, financial analysis and finance-related assessments.',
  },
  {
    icon: Megaphone,
    title: 'Marketing',
    desc: 'Marketing, digital marketing, consumer behaviour and strategic marketing assessments.',
  },
  {
    icon: Users,
    title: 'Management',
    desc: 'Management, organisational behaviour, leadership, and operations and project management.',
  },
  {
    icon: BarChart3,
    title: 'Business Analytics',
    desc: 'Business analytics, quantitative analysis, data analysis, data visualisation and business intelligence.',
  },
  {
    icon: Code2,
    title: 'Information Technology',
    desc: 'Programming, databases, information systems, networking, cybersecurity and web development.',
    anchor: '#kbs-it-support',
  },
  {
    icon: Utensils,
    title: 'Hospitality & Tourism',
    desc: 'Hospitality management, tourism, service operations and related business assessments.',
  },
  {
    icon: Award,
    title: 'MBA & Postgraduate',
    desc: 'MBA, postgraduate business, management, analytics, accounting and IT-related academic support.',
  },
]

const assessmentSupportItems = [
  'Essay support',
  'Business report support',
  'Case study guidance',
  'Research report support',
  'Presentation support',
  'PowerPoint support',
  'Project support',
  'Data analysis support',
  'Academic proofreading',
  'Editing',
  'Referencing guidance',
  'Assessment brief interpretation',
]

const howItWorks = [
  {
    step: '1',
    title: 'Share Your Assessment Brief',
    desc: 'Upload your unit outline, assessment brief or marking rubric so we understand exactly what your assessment requires.',
  },
  {
    step: '2',
    title: 'Tell Us What Support You Need',
    desc: 'Let us know whether you need help with structure, research, referencing, data analysis, or reviewing a draft.',
  },
  {
    step: '3',
    title: 'Get Matched With Relevant Expertise',
    desc: 'Your request is matched to support with relevant experience in that specific subject area.',
  },
  {
    step: '4',
    title: 'Receive Guidance & Feedback',
    desc: 'Get guidance, feedback, model answers or reference material to help you understand the topic and approach.',
  },
  {
    step: '5',
    title: 'Complete Your Own Work',
    desc: 'Use the support and guidance provided to complete and improve your own original submission.',
  },
]

// IT subjects — sourced directly from Kaplan Business School's own Subject
// Offerings document (kbs.edu.au/documents/subject-offerings, published
// June 2026). Prerequisites shown as they appear in that document. "Nil"
// means no prerequisite. One correction worth flagging: TEC205 is
// "Bitcoin", not "Introduction to Information Networks" (that's TEC105).
interface Subject {
  code: string
  name: string
  prereq: string | null
}

interface SubjectCategory {
  label: string
  icon: typeof Database
  undergrad: Subject[]
  postgrad: Subject[]
}

const itCategories: SubjectCategory[] = [
  {
    label: 'Programming',
    icon: Code2,
    undergrad: [
      { code: 'TEC102', name: 'Fundamentals of Programming', prereq: null },
      { code: 'TEC206', name: 'Intermediate Programming', prereq: 'TEC102' },
      { code: 'TEC304', name: 'Advanced Programming', prereq: 'TEC206' },
      { code: 'TEC305', name: 'Algorithms and Data Structures', prereq: 'TEC102' },
    ],
    postgrad: [
      { code: 'TECH1200', name: 'Programming in Python', prereq: null },
      { code: 'TECH6100', name: 'Intermediate Programming', prereq: 'TECH1200' },
      { code: 'TECH6200', name: 'Advanced Programming', prereq: 'TECH6100' },
      { code: 'TECH6300', name: 'Algorithms and Data Structures', prereq: 'TECH1200' },
    ],
  },
  {
    label: 'Data & Analytics',
    icon: BarChart3,
    undergrad: [
      { code: 'TEC201', name: 'Data Visualisation in R', prereq: 'TEC102' },
      { code: 'TEC202', name: 'Artificial Intelligence and Machine Learning in IT', prereq: 'TEC102' },
      { code: 'TEC301', name: 'Machine Learning Applications', prereq: 'TEC102 & TEC104' },
    ],
    postgrad: [
      { code: 'TECH3100', name: 'Data Visualisation in R', prereq: 'TECH1200' },
      { code: 'TECH3200', name: 'Artificial Intelligence and Machine Learning in IT', prereq: 'TECH1200' },
      { code: 'TECH3300', name: 'Machine Learning Applications', prereq: 'TECH1200 & TECH1400' },
    ],
  },
  {
    label: 'Cybersecurity',
    icon: ShieldCheck,
    undergrad: [
      { code: 'TEC108', name: 'Cyber Security', prereq: 'TEC103 & TEC105' },
      { code: 'TEC308', name: 'Penetration Testing', prereq: 'TEC102 & TEC108' },
    ],
    postgrad: [
      { code: 'TECH2400', name: 'Cyber Security', prereq: 'TECH1300 & TECH2100' },
      { code: 'TECH5100', name: 'Penetration Testing', prereq: 'TECH1200 & TECH2400' },
    ],
  },
  {
    label: 'Networking',
    icon: Network,
    undergrad: [
      { code: 'TEC105', name: 'Introduction to Information Networks', prereq: null },
    ],
    postgrad: [
      { code: 'TECH2100', name: 'Information Networks', prereq: null },
    ],
  },
  {
    label: 'Databases',
    icon: Database,
    undergrad: [
      { code: 'TEC104', name: 'Database Design and Management', prereq: null },
    ],
    postgrad: [
      { code: 'TECH1400', name: 'Database Design and Management', prereq: null },
    ],
  },
  {
    label: 'Information Systems',
    icon: Briefcase,
    undergrad: [
      { code: 'TEC100', name: 'Introduction to Information Technology', prereq: null },
      { code: 'TEC101', name: 'Professional Practice and Communication in IT', prereq: null },
      { code: 'TEC103', name: 'Information Systems in Business', prereq: null },
      { code: 'TEC106', name: 'IT Project Management', prereq: 'TEC103' },
      { code: 'TEC203', name: 'UX and Design Thinking', prereq: 'TEC101' },
      { code: 'TEC207', name: 'Service and Operations Management in IT', prereq: 'TEC101' },
    ],
    postgrad: [
      { code: 'TECH1100', name: 'Professional Practice and Communication in IT', prereq: null },
      { code: 'TECH1300', name: 'Information Systems in Business', prereq: null },
      { code: 'TECH2200', name: 'IT Project Management', prereq: 'TECH1300' },
      { code: 'TECH2300', name: 'Service and Operations Management in IT', prereq: 'TECH1100' },
      { code: 'TECH4100', name: 'UX and Design Thinking', prereq: 'TECH1100' },
    ],
  },
  {
    label: 'Web Development',
    icon: Globe,
    undergrad: [
      { code: 'TEC302', name: 'Website Development', prereq: 'TEC102' },
      { code: 'TEC303', name: 'Mobile Development', prereq: 'TEC102' },
    ],
    postgrad: [
      { code: 'TECH4200', name: 'Website Development', prereq: 'TECH1200' },
      { code: 'TECH4300', name: 'Mobile Development', prereq: 'TECH1200' },
    ],
  },
  {
    label: 'Digital Forensics',
    icon: Search,
    undergrad: [
      { code: 'TEC204', name: 'Digital Forensics', prereq: 'TEC108' },
    ],
    postgrad: [
      { code: 'TECH5200', name: 'Digital Forensics', prereq: 'TECH2400' },
    ],
  },
  {
    label: 'Other IT Subjects',
    icon: Code2,
    undergrad: [
      { code: 'TEC205', name: 'Bitcoin', prereq: 'TEC102' },
      { code: 'TEC307', name: 'IT Capstone', prereq: 'Final or penultimate trimester only' },
    ],
    postgrad: [
      { code: 'TECH5300', name: 'Bitcoin', prereq: 'TECH1200' },
      { code: 'TECH8000', name: 'IT Capstone', prereq: 'Final or penultimate trimester only' },
    ],
  },
]

// Future standalone resource pages — not yet built. Left as non-linked
// placeholders per instruction, rather than fake links.
const studentResources = [
  'KBS Harvard Referencing Guide',
  'How to Structure a KBS Business Report',
  'KBS Assessment Checklist',
  'How to Write a Business Case Study',
  'KBS Presentation Guide',
  'Academic Writing Guide',
  'KBS Data Analysis Guide',
  'Report Writing Guide',
]

const faqs = [
  {
    q: 'What is Kaplan Business School assignment help?',
    a: "It's academic support built specifically around Kaplan Business School's (KBS) courses, unit structure and assessment style — covering business, accounting, marketing, management, analytics, IT and MBA subjects, plus KBS's Harvard referencing conventions.",
  },
  {
    q: 'Do you provide KBS assessment support?',
    a: 'Yes — support for essays, business reports, case studies, research reports, presentations, projects and data analysis assessments, matched to your specific unit outline and marking rubric.',
  },
  {
    q: 'Can you help with KBS business assignments?',
    a: 'Yes, across core business subjects including business reports, business analysis, strategy and management-focused assessments.',
  },
  {
    q: 'Do you provide KBS accounting support?',
    a: 'Yes — accounting, financial reporting and financial analysis assessments, including guidance on structure and calculation methodology.',
  },
  {
    q: 'Can you help with KBS marketing assessments?',
    a: 'Yes, including marketing plans, digital marketing, consumer behaviour and market research assessments.',
  },
  {
    q: 'Do you provide KBS IT assignment support?',
    a: "Yes — programming, databases, information systems, networking, cybersecurity and web development, matched to KBS's actual TEC and TECH subject codes and prerequisites (see the IT section below).",
  },
  {
    q: 'Can you help with KBS MBA assessments?',
    a: 'Yes, across MBA and postgraduate business, analytics, accounting and IT-related subjects at the postgraduate level.',
  },
  {
    q: 'Do you provide KBS Harvard referencing support?',
    a: "Yes. Kaplan Business School uses its own Harvard referencing guide rather than a generic Harvard style, and referencing is a meaningful part of your assessment weighting. Support is based on that specific guide.",
  },
  {
    q: 'Can you proofread my KBS assessment?',
    a: 'Yes — proofreading and editing support covering structure, clarity, academic tone, grammar and referencing consistency.',
  },
  {
    q: 'Can you help me understand my KBS assessment brief?',
    a: "Yes — upload your assessment brief or marking rubric and get guidance on what's actually being asked, how marks are allocated, and how to structure your response accordingly.",
  },
  {
    q: 'Do you provide KBS data analysis support?',
    a: 'Yes, including guidance on data visualisation, quantitative analysis and interpreting results for business analytics and related subjects.',
  },
  {
    q: 'How does KBS academic support work?',
    a: 'Share your assessment brief, tell us what kind of support you need, and get matched with relevant subject guidance — from there, you use that support to complete and improve your own original submission.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function KaplanAssignmentHelpPage() {
  return (
    <main className="flex-grow">
      <StructuredData data={faqSchema} />

      {/* 1. HERO */}
      <section className="relative text-white py-24 md:py-36 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(30,41,59,0.95), rgba(15,23,42,0.97)), url(https://picsum.photos/id/1005/1920/1080)',
          }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-30 animate-float"
          style={{ top: '8%', left: '6%', width: '320px', height: '320px', background: 'radial-gradient(circle, #6366f1, transparent 70%)' }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-25 animate-float"
          style={{ bottom: '10%', right: '8%', width: '280px', height: '280px', background: 'radial-gradient(circle, #a855f7, transparent 70%)', animationDelay: '7s' }}
        />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 rounded-full px-5 py-2 text-sm font-semibold mb-8 backdrop-blur-sm">
            <GraduationCap className="w-4 h-4" />
            For Kaplan Business School (KBS) Students
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
            Kaplan Business School Assignment Help
          </h1>

          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-10 font-medium">
            Academic support, assessment guidance, proofreading, research assistance and study
            resources for Kaplan Business School students across Australia.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              href="/order"
              className="bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-10 py-4 rounded-xl text-lg font-bold transition shadow-xl shadow-yellow-400/30 hover:shadow-2xl hover:scale-105 active:scale-95 min-w-[240px]"
            >
              Get KBS Academic Support
            </Link>
            <Link
              href="#kbs-courses"
              className="border-2 border-white/70 hover:bg-white/10 px-10 py-4 rounded-xl text-lg font-semibold transition min-w-[240px]"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Studying at Kaplan Business School (KBS) means working through a fast-paced trimester
            structure across business, accounting, marketing, management, analytics, IT and MBA
            coursework — often with tight turnarounds between assessments. Many KBS students look
            for support at some point during their studies, whether that's help understanding an
            assessment brief, structuring a business report, interpreting a marking rubric,
            working through a data analysis task, or getting a case study proofread before
            submission.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Stack Assignment provides academic support for KBS students across Australia — covering
            academic writing guidance, research assistance, referencing help (including KBS's own
            Harvard referencing guide), proofreading, and subject-specific support across every
            core course area KBS offers, from undergraduate business subjects through to
            postgraduate MBA and IT coursework.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Whether you're studying at KBS's Adelaide, Brisbane, Melbourne, Perth or Sydney campus,
            our support works the same way — online, subject-matched, and built around your actual
            assessment brief rather than a generic template.
          </p>
        </div>
      </section>

      {/* 3. WHY CHOOSE STACKASSIGNMENT */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
            Why Choose Stack Assignment for KBS Academic Support?
          </h2>
          <p className="text-center text-gray-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            Built around the specifics of studying at Kaplan Business School.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseUs.map((item) => (
              <div
                key={item.title}
                className="bg-white dark:bg-slate-800 rounded-2xl p-7 shadow-md border border-gray-100 dark:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. KBS COURSES WE SUPPORT */}
      <section id="kbs-courses" className="py-16 bg-white dark:bg-slate-950 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
            Kaplan Business School Courses We Support
          </h2>
          <p className="text-center text-gray-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            Support spans every core KBS course area — not just IT.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {courseAreasDetailed.map((course) => {
              const cardInner = (
                <>
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center mb-4">
                    <course.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-bold text-base mb-1.5">{course.title}</h3>
                  <p className="text-gray-500 dark:text-slate-400 text-xs leading-relaxed">
                    {course.desc}
                  </p>
                </>
              )

              if (course.anchor) {
                return (
                  <a
                    key={course.title}
                    href={course.anchor}
                    className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-800 block"
                  >
                    {cardInner}
                  </a>
                )
              }

              // Dedicated pages for these course areas don't exist yet —
              // rendered as non-linked cards rather than fake/broken links.
              // See summary notes for suggested future URLs.
              return (
                <div
                  key={course.title}
                  className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700"
                >
                  {cardInner}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 6. KBS ASSESSMENT SUPPORT */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
            KBS Assessment Support
          </h2>
          <p className="text-center text-gray-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
            Guidance across every common KBS assessment type.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {assessmentSupportItems.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2.5 bg-white dark:bg-slate-800 rounded-xl px-4 py-3.5 border border-gray-100 dark:border-slate-700"
              >
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. KBS HARVARD REFERENCING */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
            KBS Harvard Referencing Help
          </h2>
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-800/50 border border-indigo-100 dark:border-slate-700 rounded-2xl p-7">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Kaplan Business School uses its own Harvard referencing guide rather than a generic
              Harvard style, and referencing accuracy is a meaningful part of your assessment
              weighting. Support covers:
            </p>
            <ul className="space-y-2 mb-4">
              {['In-text citations', 'Reference lists', 'Academic source selection', 'Paraphrasing', 'Citation consistency', 'Referencing-focused proofreading'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-gray-500 dark:text-slate-400 text-xs mb-5">
              A standalone KBS Harvard referencing guide is planned for a future resource page.
            </p>
            <Link
              href="/order?subject=KBS%20Harvard%20Referencing%20Help"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition"
            >
              Need Help With KBS Referencing? <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. IT SUBJECT SUPPORT (existing content, preserved & reorganized) */}
      <section id="kbs-it-support" className="py-16 bg-gray-50 dark:bg-slate-900 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 rounded-full px-5 py-2 text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-5">
              <Code2 className="w-4 h-4" />
              Bachelor & Master of IT
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
              Kaplan Business School IT Assignment Support
            </h2>
            <p className="text-gray-600 dark:text-slate-400 max-w-2xl mx-auto mb-2">
              Every subject code below is taken directly from Kaplan's own subject offerings
              guide, including prerequisites, organised by topic area.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 rounded-2xl p-6 mb-10">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-base mb-2">Subjects Build on Each Other</h3>
                <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
                  Several programming subjects have prerequisites, so check you've completed
                  the earlier subject before enrolling. For example:
                </p>
                <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
                  <span className="bg-gray-50 dark:bg-slate-700 px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-slate-600">TEC102 — Fundamentals of Programming</span>
                  <ArrowRight className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span className="bg-gray-50 dark:bg-slate-700 px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-slate-600">TEC206 — Intermediate Programming</span>
                  <ArrowRight className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span className="bg-gray-50 dark:bg-slate-700 px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-slate-600">TEC304 — Advanced Programming</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {itCategories.map((cat) => (
              <div key={cat.label}>
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <cat.icon className="w-5 h-5 text-indigo-600" />
                  {cat.label}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-slate-700">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-gray-100 dark:bg-slate-800 text-left">
                          <th className="px-3 py-2 font-semibold text-gray-600 dark:text-gray-300" colSpan={3}>
                            Bachelor of IT
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cat.undergrad.map((s, i) => (
                          <tr key={s.code} className={i % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-gray-50/60 dark:bg-slate-900'}>
                            <td className="px-3 py-2 font-mono font-semibold text-indigo-700 dark:text-indigo-400 whitespace-nowrap">{s.code}</td>
                            <td className="px-3 py-2 text-gray-800 dark:text-gray-200">{s.name}</td>
                            <td className="px-3 py-2 text-gray-400 dark:text-slate-500 whitespace-nowrap">{s.prereq ?? 'None'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-slate-700">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-gray-100 dark:bg-slate-800 text-left">
                          <th className="px-3 py-2 font-semibold text-gray-600 dark:text-gray-300" colSpan={3}>
                            Master / Grad Cert / Grad Dip of IT
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cat.postgrad.map((s, i) => (
                          <tr key={s.code} className={i % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-gray-50/60 dark:bg-slate-900'}>
                            <td className="px-3 py-2 font-mono font-semibold text-indigo-700 dark:text-indigo-400 whitespace-nowrap">{s.code}</td>
                            <td className="px-3 py-2 text-gray-800 dark:text-gray-200">{s.name}</td>
                            <td className="px-3 py-2 text-gray-400 dark:text-slate-500 whitespace-nowrap">{s.prereq ?? 'None'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 dark:text-slate-500 mt-8 text-center max-w-2xl mx-auto">
            Subject codes, prerequisites and course offerings may change. Students should verify
            their current subject information through Kaplan Business School's official student
            portal and course documentation. Source:{' '}
            <a
              href="https://www.kbs.edu.au/documents/subject-offerings"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-1"
            >
              Kaplan Business School Subject Offerings <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>
      </section>

      {/* 9. LOCATION / CAMPUS SUPPORT */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Kaplan Business School Assignment Support Across Australia
          </h2>
          <p className="text-gray-600 dark:text-slate-400 leading-relaxed mb-6">
            Whichever KBS campus you're studying at, support is delivered the same way — entirely
            online, so location doesn't limit access to it.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {campuses.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-1.5 rounded-full text-sm font-semibold"
              >
                <MapPin className="w-3.5 h-3.5" />
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 10. HOW IT WORKS */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Sora, sans-serif' }}>
            How KBS Academic Support Works
          </h2>
          <div className="space-y-5">
            {howItWorks.map((item) => (
              <div key={item.step} className="flex gap-5 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1">{item.title}</h3>
                  <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. ACADEMIC INTEGRITY */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
            Academic Integrity & Responsible Academic Support
          </h2>
          <div className="bg-gray-50 dark:bg-slate-900 rounded-2xl p-7 border border-gray-100 dark:border-slate-700">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Stack Assignment is not affiliated with, endorsed by, or partnered with Kaplan
              Business School. Our services are designed to support KBS students through:
            </p>
            <ul className="grid sm:grid-cols-2 gap-2 mb-4">
              {['Research guidance', 'Academic writing guidance', 'Proofreading', 'Editing', 'Referencing assistance', 'Data analysis guidance', 'Assessment interpretation', 'Study support and learning resources'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Students remain fully responsible for their own final submissions. Kaplan Business
              School has its own academic integrity policies covering originality and appropriate
              use of support services, and it's worth reading these before using any academic
              support service, including ours.
            </p>
            <Link href="/integrity" className="text-indigo-600 dark:text-indigo-400 underline font-medium text-sm">
              Read our full Academic Integrity policy
            </Link>
          </div>
        </div>
      </section>

      {/* 12/13. CREDIBLE BENEFITS (replaces unverified numeric claims for this page specifically) */}
      <section className="py-14 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="text-center text-sm font-semibold text-gray-500 dark:text-gray-400 mb-6 uppercase tracking-wide">
            What KBS Students Get
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Subject-specific support', 'Academic writing assistance', 'Confidential service', 'Referencing support', 'Proofreading', 'Research guidance', 'Data analysis assistance', 'Assessment brief guidance'].map((item) => (
              <div key={item} className="flex items-center gap-2.5 bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm border border-gray-100 dark:border-slate-700">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. STUDENT RESOURCES */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
            KBS Student Resources
          </h2>
          <p className="text-center text-gray-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
            Dedicated guides for these topics are planned — check back soon.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {studentResources.map((item) => (
              <div
                key={item}
                className="flex items-center justify-between bg-gray-50 dark:bg-slate-800 rounded-xl px-4 py-3.5 border border-gray-100 dark:border-slate-700"
              >
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{item}</span>
                <span className="text-xs text-gray-400 dark:text-slate-500 flex-shrink-0 ml-3">Coming soon</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15. FAQ */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ fontFamily: 'Sora, sans-serif' }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((item) => (
              <div
                key={item.q}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 transition hover:shadow-md"
              >
                <h3 className="font-bold text-lg mb-2 flex items-start gap-2">
                  <MessageCircle className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                  {item.q}
                </h3>
                <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed pl-7">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-slate-500 mt-6">
            Read our full{' '}
            <Link href="/integrity" className="text-indigo-600 dark:text-indigo-400 underline font-medium">
              Academic Integrity policy
            </Link>{' '}
            before ordering.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, white 0%, transparent 8%), radial-gradient(circle at 80% 70%, white 0%, transparent 6%)',
          }}
        />
        <div className="max-w-3xl mx-auto px-6 text-center text-white relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Get KBS Academic Support
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Get a free quote for your KBS assessment — takes less than a minute.
          </p>
          <Link
            href="/order"
            className="inline-block bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-10 py-4 rounded-xl text-lg font-bold transition shadow-xl shadow-yellow-400/30 hover:shadow-2xl hover:scale-105 active:scale-95"
          >
            Request a Quote →
          </Link>
        </div>
      </section>
    </main>
  )
}
