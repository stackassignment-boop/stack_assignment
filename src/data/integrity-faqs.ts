/**
 * Single source of truth for the /integrity FAQ.
 *
 * Google's structured data guidelines require FAQPage markup to reproduce
 * content that is actually visible on the page. Keeping one array and consuming
 * it from both the route (which emits the JSON-LD) and the component (which
 * renders the visible list) means the two cannot drift apart — which is the
 * usual way sites end up with a manual action for mismatched FAQ markup.
 *
 * Lives in src/data rather than beside the component because the route is a
 * server component and the page body is a client component; a plain data module
 * can be imported by both without dragging one boundary into the other.
 */
export const integrityFaqs: { question: string; answer: string }[] = [
  {
    question: 'Will you write my assignment for me?',
    answer:
      'No. We will not write, part-write, rewrite or supply any work intended for submission, and we do not sell pre-written papers, model answers or reference essays. We teach the material, review what you have written and explain what to change. The submitted work has to be yours.',
  },
  {
    question: 'Is using a tutoring or editing service legal in Australia?',
    answer:
      'Tutoring and editing are ordinary, legitimate academic support and are used openly by Australian universities themselves. What is against the law is the other thing: since the Prohibiting Academic Cheating Services Act 2020 amended the TEQSA Act 2011, providing or advertising work for a student to submit as their own is a criminal offence under sections 114A and 114B, with penalties of up to two years imprisonment. That applies to offshore providers marketing to Australian students, not only to local ones. This is general information rather than legal advice.',
  },
  {
    question: 'Does getting my essay edited count as academic misconduct?',
    answer:
      'It depends on your institution and sometimes on the individual unit. Most Australian universities permit proofreading and editing that improves clarity, grammar, structure and referencing, and prohibit editing that changes the substance of your argument or adds content you did not write. Some require you to declare that an editor was used. Check your unit guide and your university’s academic integrity policy before you engage anyone, including us, and tell us what your policy allows so we can work inside it.',
  },
  {
    question: 'What happens to the work I send you?',
    answer:
      'Your drafts are used only to give you feedback. We do not resell them, publish them, add them to a samples library or reuse them for another student. We also will not upload your work to a third-party similarity checker without asking you first, because doing so can place your own text in a database and cause it to be flagged when you submit.',
  },
  {
    question: 'What if my university already offers free help?',
    answer:
      'Use it. Every Australian university funds an academic skills or learning support unit, and most run free drop-in sessions, workshops and writing consultations included in your fees. Start there. Paid support is worth it when you need more time than they can give you, help outside their hours, or someone with depth in your specific unit.',
  },
]
