'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  ClipboardCheck,
  FilePenLine,
  FlaskConical,
  GraduationCap,
  Laptop,
  Library,
  MessageCircle,
  PenTool,
  SearchCheck,
  Sparkles,
  Target,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServicesPageProps {
  onNavigate?: (page: string, params?: Record<string, string>) => void;
}

function orderHref(subject: string): string {
  return `/order?${new URLSearchParams({ subject }).toString()}`;
}

const services = [
  {
    icon: PenTool,
    eyebrow: 'Writing support',
    title: 'Essay Planning & Writing Support',
    description:
      'Turn your brief into a clear structure with guidance on argument, evidence, academic tone and referencing.',
    features: ['Essay structure & argument planning', 'Critical analysis guidance', 'APA, Harvard, MLA & Chicago'],
    tone: 'violet',
    href: orderHref('Essay Planning & Writing Support'),
  },
  {
    icon: BookOpen,
    eyebrow: 'Research support',
    title: 'Dissertation & Thesis Support',
    description:
      'Practical support across research planning, chapter structure, literature reviews, methodology and editing.',
    features: ['Proposal & chapter planning', 'Literature review support', 'SPSS, R & NVivo guidance'],
    tone: 'cyan',
    href: orderHref('Dissertation & Thesis Support'),
  },
  {
    icon: FlaskConical,
    eyebrow: 'Research & evidence',
    title: 'Research Papers & Articles',
    description:
      'Strengthen research questions, evidence selection, academic structure and citation consistency.',
    features: ['Primary & secondary research', 'Evidence and source organisation', 'Citation and reference checks'],
    tone: 'blue',
    href: orderHref('Research Papers & Articles Support'),
  },
  {
    icon: ClipboardCheck,
    eyebrow: 'Assessment support',
    title: 'Coursework & Assessment Support',
    description:
      'Work through reports, case studies, presentations, lab reports and other university assessment formats.',
    features: ['Assessment brief breakdown', 'Case study & report structure', 'Presentation planning'],
    tone: 'emerald',
    href: orderHref('Coursework & Assessment Support'),
  },
  {
    icon: FilePenLine,
    eyebrow: 'Polish your draft',
    title: 'Editing & Proofreading',
    description:
      'Improve a draft you have prepared with tracked changes, academic language, flow, formatting and references.',
    features: ['Tracked changes & comments', 'Grammar and academic tone', 'Formatting & referencing review'],
    tone: 'amber',
    href: orderHref('Editing & Proofreading'),
  },
  {
    icon: Target,
    eyebrow: 'Prepare with confidence',
    title: 'Exam & Revision Preparation',
    description:
      'Build a focused revision plan with topic explanations, practice questions and study strategies.',
    features: ['Topic-by-topic revision', 'Practice questions & feedback', 'Study plans for busy schedules'],
    tone: 'rose',
    href: orderHref('Exam & Revision Preparation'),
  },
];

const quickServices = [
  'Case Study Analysis',
  'Literature Review',
  'Annotated Bibliography',
  'Lab Report Support',
  'Capstone Project Guidance',
  'Personal Statement Editing',
  'Scholarship Essay Review',
  'Cover Letter Editing',
  'Resume & CV Review',
  'Business Plan Guidance',
  'Grant Proposal Support',
  'Presentation & Speaker Notes',
];

const subjects = [
  { name: 'Business & Management', icon: BriefcaseBusiness, href: '/subjects/business-management' },
  { name: 'IT, Computing & Cyber Security', icon: Laptop, href: '/subjects/it-computing-cyber-security' },
  { name: 'Nursing & Health', icon: Award, href: '/subjects/nursing-health' },
  { name: 'Engineering', icon: FlaskConical, href: '/subjects/engineering' },
  { name: 'Accounting & Finance', icon: Library, href: '/subjects/accounting-finance' },
  { name: 'Education & Social Sciences', icon: GraduationCap, href: '/subjects/education-social-sciences' },
];

const standards = [
  { title: 'Australian university support', text: 'AU English, APA 7, Harvard, AGLC4 and university-specific assessment conventions.' },
  { title: 'UK university support', text: 'UK English, Harvard, APA 7, OSCOLA and common UK assessment formats.' },
  { title: 'Your work stays yours', text: 'We focus on tutoring, editing, planning, study resources and feedback on your own academic work.' },
];

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  return (
    <div className="stack-page overflow-hidden">
      {/* Hero */}
      <section className="relative isolate border-b border-slate-200/70 bg-slate-950 text-white dark:border-slate-800">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-indigo-500/25 blur-3xl" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-indigo-400/15 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-purple-500/15 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:44px_44px]" />
        </div>

        <div className="stack-container relative py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_.92fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200 backdrop-blur">
                <Sparkles className="h-4 w-4 text-indigo-300" />
                Academic support for Australia & the UK
              </div>

              <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Support that makes your
                <span className="block bg-gradient-to-r from-yellow-300 via-indigo-200 to-purple-300 bg-clip-text text-transparent">
                  next assessment clearer.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                Get practical tutoring, editing, research guidance and study support matched to your subject, university and assessment requirements.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 rounded-xl bg-yellow-400 px-7 text-base font-bold text-slate-950 shadow-xl shadow-indigo-950/30 hover:bg-yellow-300">
                  <Link href="/order">
                    Book support
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 rounded-xl border-white/20 bg-white/5 px-7 text-base font-semibold text-white hover:bg-white/10 hover:text-white">
                  <Link href="/contact">
                    Talk to our team
                    <MessageCircle className="h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
                {['AU & UK support', 'Tracked editing', 'Referencing guidance', 'Flexible study help'].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/15">
                      <Check className="h-3.5 w-3.5 text-emerald-300" />
                    </span>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="rounded-[2rem] border border-white/15 bg-white/[0.08] p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
                <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-5 sm:p-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-300">Start here</p>
                      <h2 className="mt-1 text-xl font-bold">What do you need help with?</h2>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-200">
                      <SearchCheck className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {(
                      [
                        ['Essay or report', 'Structure, argument & referencing', PenTool],
                        ['Dissertation', 'Research, chapters & editing', BookOpen],
                        ['Coursework', 'Briefs, cases & presentations', ClipboardCheck],
                        ['Exam preparation', 'Revision & practice support', Target],
                      ] as const
                    ).map(([title, text, Icon]) => (
                        <Link
                          key={title}
                          href={orderHref(title)}
                          className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-indigo-300/30 hover:bg-white/[0.08]"
                        >
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/25 to-indigo-400/15 text-indigo-200">
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-semibold text-white">{title}</span>
                            <span className="mt-0.5 block text-sm text-slate-400">{text}</span>
                          </span>
                          <ChevronRight className="h-5 w-5 text-slate-500 transition group-hover:translate-x-1 group-hover:text-indigo-300" />
                        </Link>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-indigo-300/10 bg-indigo-300/[0.06] p-4 text-sm text-slate-300">
                    <span className="font-semibold text-white">Not sure which option fits?</span> Send us your brief and we can help you identify the right type of support.
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white shadow-xl backdrop-blur-md sm:block">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-300" />
                Support for AU & UK students
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro strip */}
      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="stack-container grid gap-6 py-7 md:grid-cols-3">
          {[
            { icon: GraduationCap, title: 'Matched to your level', text: 'Undergraduate, postgraduate and research support.' },
            { icon: SearchCheck, title: 'Brief-first approach', text: 'We focus on your rubric, instructions and learning goals.' },
            { icon: MessageCircle, title: 'Human guidance', text: 'Clear communication before you commit to a service.' },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-4 rounded-2xl bg-slate-50 px-5 py-4 dark:bg-slate-950/70">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main services */}
      <section className="py-16 sm:py-20">
        <div className="stack-container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">Explore support</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl dark:text-white">Choose the support you need</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
              Clear, modern support options for assignments, research, editing and exam preparation — without the clutter of a traditional service catalogue.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-900/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-700"
                >
                  <div className={`absolute right-0 top-0 h-32 w-32 translate-x-12 -translate-y-12 rounded-full blur-3xl ${
                    service.tone === 'violet' ? 'bg-purple-400/20' :
                    service.tone === 'cyan' ? 'bg-indigo-400/20' :
                    service.tone === 'blue' ? 'bg-indigo-400/20' :
                    service.tone === 'emerald' ? 'bg-emerald-400/20' :
                    service.tone === 'amber' ? 'bg-amber-400/20' : 'bg-rose-400/20'
                  }`} />

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-50 text-indigo-600 shadow-sm dark:from-indigo-500/20 dark:to-indigo-500/10 dark:text-indigo-300">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-500 dark:border-slate-700 dark:text-slate-400">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="relative mt-6">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">{service.eyebrow}</p>
                    <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white">{service.title}</h3>
                    <p className="mt-3 min-h-[4.5rem] text-[0.9375rem] leading-6 text-slate-600 dark:text-slate-400">{service.description}</p>
                  </div>

                  <ul className="relative mt-5 space-y-3 border-t border-slate-100 pt-5 dark:border-slate-800">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/10">
                          <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="relative mt-7 inline-flex items-center gap-2 font-bold text-indigo-600 transition group-hover:gap-3 dark:text-indigo-400">
                    Explore support <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="border-y border-slate-200 bg-slate-50 py-16 dark:border-slate-800 dark:bg-slate-950/70">
        <div className="stack-container">
          <div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-700 dark:text-indigo-300">Built around your context</span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl dark:text-white">One service page. Two study markets. A consistent experience.</h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-400">
                Stack Assignment is structured for students in Australia and the UK, with regional language, referencing and assessment expectations built into the experience.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/australia/academic-support" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm hover:border-indigo-300 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                  Explore Australia support <ArrowRight className="ml-1 inline h-4 w-4" />
                </Link>
                <Link href="/uk/academic-support" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm hover:border-indigo-300 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                  Explore UK support <ArrowRight className="ml-1 inline h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {standards.map((item, index) => (
                <div key={item.title} className="stack-card p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
                    <span className="text-sm font-extrabold">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-950 dark:text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick services */}
      <section className="py-16 sm:py-20">
        <div className="stack-container">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">More ways we can help</span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">Popular academic support</h2>
            </div>
            <Link href="/subjects" className="inline-flex items-center gap-2 font-bold text-indigo-600 hover:gap-3 dark:text-indigo-400">
              Browse subjects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {quickServices.map((item) => (
              <Link key={item} href={orderHref(item)} className="group flex min-h-16 items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-700 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-700 dark:hover:text-indigo-300">
                <span>{item}</span>
                <ChevronRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-indigo-500" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="bg-white py-16 dark:bg-slate-900">
        <div className="stack-container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">Find your discipline</span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">Support across popular subjects</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">Explore dedicated subject pages with study guidance and relevant resources.</p>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => {
              const Icon = subject.icon;
              return (
                <Link key={subject.name} href={subject.href} className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-indigo-200 hover:bg-white hover:shadow-lg dark:border-slate-800 dark:bg-slate-950 dark:hover:border-indigo-700 dark:hover:bg-slate-900">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold text-slate-900 dark:text-white">{subject.name}</span>
                    <span className="mt-1 block text-sm text-slate-500 dark:text-slate-400">View subject resources</span>
                  </span>
                  <ArrowRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-indigo-600" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-700 to-purple-700 py-16 text-white sm:py-20">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-indigo-300/15 blur-3xl" />
        <div className="stack-container relative text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
            <Sparkles className="h-7 w-7" />
          </div>
          <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">Not sure which support is right for you?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-indigo-100">
            Share your assessment brief, subject and deadline. We can help you identify the most suitable tutoring, editing or study-support option.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-xl bg-yellow-400 px-8 font-bold text-slate-950 hover:bg-yellow-300">
              <Link href="/order">Start your request <ArrowRight className="h-5 w-5" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-xl border-white/25 bg-white/5 px-8 font-bold text-white hover:bg-white/10 hover:text-white">
              <Link href="/contact">Contact support <MessageCircle className="h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
