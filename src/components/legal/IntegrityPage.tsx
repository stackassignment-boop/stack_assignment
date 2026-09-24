'use client';

import {
  GraduationCap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BookOpen,
  Users,
  Scale,
  MessageSquare,
  PenLine,
  Lock,
} from 'lucide-react';
import { integrityFaqs } from '@/data/integrity-faqs';

/*
  This page was previously the clearest statement on the site that the business
  produced finished assessments. It said "Our papers are meant to be used as
  MODEL papers for learning purposes only. They should NOT be submitted as your
  own work", listed "Every paper is written from scratch" and "Expert Writers"
  under a heading of "What We Guarantee", and framed the student's obligation as
  citing the purchased material properly.

  That construction does not protect anyone. TEQSA guidance identifies "model
  answer" and "reference paper" wording as marketing for a cheating service, and
  s 114A of the TEQSA Act 2011 turns on whether the work was *provided* — a
  disclaimer telling the student not to submit it does not change that, it
  confirms what was supplied. An integrity page that describes a ghostwriting
  product is worse than having no integrity page, because it is an admission
  published at a predictable URL.

  Rewritten so the page describes a service that never produces the student's
  assessment, and so the boundary is stated as our constraint rather than as the
  student's problem.
*/

const whatWeDo = [
  'Explain the concepts, readings and methods a unit is assessing until they make sense',
  'Talk through your own plan or outline and tell you where the argument does not hold',
  'Edit work you have written for clarity, structure, grammar and referencing',
  'Mark a draft against the rubric your marker will use, and explain each judgement',
  'Show you how to apply AGLC4, APA 7th, Vancouver or Harvard (AU) yourself',
  'Work through past exam questions and practice problems with you',
];

const whatWeWillNot = [
  'Write, part-write or rewrite anything you intend to submit',
  'Sell pre-written papers, model answers, reference essays or exemplars',
  'Sit an online exam, quiz or invigilated assessment as you',
  'Log in to your university account, LMS or email',
  'Post in a discussion board or group task under your name',
  'Guarantee a mark, a grade or a pass — nobody outside your faculty can',
];

const howItWorks = [
  {
    icon: MessageSquare,
    title: 'One-on-one tutoring',
    body: 'A live session on the specific thing you are stuck on. You bring the unit guide, the assessment brief and your attempt so far. You leave with your own notes and a clear idea of what to write next.',
  },
  {
    icon: PenLine,
    title: 'Editing with tracked changes',
    body: 'You send a draft you wrote. It comes back with every change visible and a comment explaining why, so you accept or reject each one deliberately. Nothing is altered silently and no new content is inserted.',
  },
  {
    icon: BookOpen,
    title: 'Feedback against the rubric',
    body: 'We read your draft against the marking criteria for that assessment and tell you which criteria are met, which are thin, and what specifically would move each one up a band. The rewriting is yours.',
  },
];

export default function IntegrityPage() {
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="stack-regional-hero text-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Academic Integrity</h1>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            We tutor, edit and give feedback. We do not write work for submission, and we will not
            pretend the difference is a technicality.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="space-y-12">
          {/* Introduction */}
          <section>
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase px-3 py-1 rounded-full mb-3">
              <GraduationCap className="w-4 h-4" /> Our position
            </div>
            <h2 className="text-2xl font-bold mb-4">One line, and it does not move</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              The work you submit has to be written by you. Everything we offer is built around that
              constraint rather than around a disclaimer at the bottom of the page. We will teach the
              material, read what you have written, and tell you plainly what is not working. We will
              not produce the thing you hand in, in any form, at any price, however the request is
              worded.
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              This is not only a matter of principle. A student who submits someone else&apos;s work
              risks a misconduct finding, a failed unit, a withheld award and, for international
              students, a visa consequence that dwarfs the assignment. The service that sold it to
              them faces nothing. That asymmetry is the whole reason the boundary matters.
            </p>
          </section>

          <hr className="border-slate-200 dark:border-slate-700" />

          {/* The line */}
          <section>
            <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 text-xs font-bold uppercase px-3 py-1 rounded-full mb-3">
              <AlertTriangle className="w-4 h-4" /> Where the line sits
            </div>
            <h2 className="text-2xl font-bold mb-6">What we will and will not do</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow border-l-4 border-green-600">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" /> What we do
                </h3>
                <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
                  {whatWeDo.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-green-600 dark:text-green-400 flex-shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow border-l-4 border-red-600">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600" /> What we refuse
                </h3>
                <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
                  {whatWeWillNot.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-red-600 dark:text-red-400 flex-shrink-0">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              If you ask us for something in the right-hand column, we will say no and explain why.
              We would rather lose the sale than put your degree at risk.
            </p>
          </section>

          <hr className="border-slate-200 dark:border-slate-700" />

          {/* In practice */}
          <section>
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase px-3 py-1 rounded-full mb-3">
              <Users className="w-4 h-4" /> In practice
            </div>
            <h2 className="text-2xl font-bold mb-6">What support actually looks like</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {howItWorks.map(({ icon: Icon, title, body }) => (
                <div key={title} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
                  <Icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-3" />
                  <h3 className="font-bold mb-2">{title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-slate-200 dark:border-slate-700" />

          {/* Australian law */}
          <section>
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase px-3 py-1 rounded-full mb-3">
              <Scale className="w-4 h-4" /> The law in Australia
            </div>
            <h2 className="text-2xl font-bold mb-4">Why this is not just a preference</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              In 2020 the Australian Parliament passed the Prohibiting Academic Cheating Services
              Act, which inserted sections 114A and 114B into the Tertiary Education Quality and
              Standards Agency Act 2011. Section 114A makes it an offence to provide, or arrange for
              a third party to provide, academic cheating services to a student. Section 114B makes
              it a separate offence to advertise them. Both carry penalties of up to two years
              imprisonment, and they reach operators based outside Australia who market to Australian
              students. TEQSA also has the power to have offending websites blocked by Australian
              internet providers.
            </p>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Tutoring, editing, proofreading and feedback sit outside all of that. They are the same
              activities your own university funds through its learning support unit. What the
              legislation targets is the supply of work for a student to submit as their own —
              including when it is dressed up as a &ldquo;model answer&rdquo;, a &ldquo;reference
              paper&rdquo;, a &ldquo;sample written to your brief&rdquo; or a &ldquo;draft for your
              guidance&rdquo;. TEQSA guidance names that vocabulary specifically.
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border-l-4 border-indigo-600">
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <strong>If a service offers to write it for you, that is the offence, not a
                loophole.</strong>{' '}
                A disclaimer telling you not to submit what they just sold you does not change what
                was supplied. Read this page as general information about how we operate, not as
                legal advice.
              </p>
            </div>
          </section>

          <hr className="border-slate-200 dark:border-slate-700" />

          {/* Free help first */}
          <section>
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase px-3 py-1 rounded-full mb-3">
              <BookOpen className="w-4 h-4" /> Before you pay anyone
            </div>
            <h2 className="text-2xl font-bold mb-4">Try your university&apos;s free support first</h2>
            <p className="text-slate-600 dark:text-slate-300">
              Every Australian university runs an academic skills or learning support unit, and the
              cost is already inside your fees. Most offer writing consultations, drop-in sessions,
              maths and statistics help, and workshops on referencing and assessment structure. Your
              unit coordinator can also clarify a brief faster than anyone else, because they wrote
              it. Start there. Come to us when you need more time than they can give you, help
              outside their hours, or someone with real depth in your particular unit.
            </p>
          </section>

          <hr className="border-slate-200 dark:border-slate-700" />

          {/* Student Responsibility */}
          <section>
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase px-3 py-1 rounded-full mb-3">
              <Lock className="w-4 h-4" /> Your part
            </div>
            <h2 className="text-2xl font-bold mb-4">What we need from you</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
              <li>
                Read your university&apos;s academic integrity policy and your unit guide, and tell us
                what they permit — rules on third-party editing differ between institutions and
                sometimes between units
              </li>
              <li>
                Send us your own draft, plan or attempt. We cannot give useful feedback on a blank
                page, and we will not fill one in
              </li>
              <li>
                Declare the use of an editor if your institution requires it, and keep your drafts in
                case you are ever asked to show your process
              </li>
              <li>
                Book with enough time to actually do the revising yourself. A deadline in six hours
                is the situation in which students make decisions they regret
              </li>
              <li>Ask us if you are unsure whether something is allowed. We would rather be asked</li>
            </ul>
          </section>

          <hr className="border-slate-200 dark:border-slate-700" />

          {/* FAQ — mirrors the FAQPage markup emitted by the route */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Common questions</h2>
            <div className="space-y-5">
              {integrityFaqs.map((faq) => (
                <div
                  key={faq.question}
                  className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700"
                >
                  <h3 className="font-bold mb-2 text-slate-900 dark:text-slate-100">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
