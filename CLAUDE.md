# Working in this repository

Next.js 16 App Router, Tailwind CSS v4, Prisma against Neon Postgres, NextAuth
(Google + credentials), Vercel Blob for uploads. Deployed on Vercel.

Read this before changing anything. Most of what follows is not a preference — it
is a list of things that have already gone wrong here, each written down the first
time it cost something.

## Never run `npm run build`

The script is:

```
node scripts/copy-pdf-worker.mjs && prisma generate && prisma db push --accept-data-loss && next build
```

`prisma db push --accept-data-loss` pushes the schema straight at the **production**
database. There is no migrations directory, so there is no safe local equivalent.
The first build of any commit must be Vercel's.

For the same reason, never run `prisma db push`, `prisma migrate dev` or
`prisma migrate reset` directly. `prisma generate` alone is fine — it only writes
the client into `node_modules`, and you need it before `tsc` will type-check.

## The two gates

```bash
npx tsc --noEmit    # must be 0
npx eslint src      # must be 0
```

Both are at zero. Any error you see is yours.

**`tsc` is the only type gate.** `next.config.ts` sets
`typescript: { ignoreBuildErrors: true }`, so a type error does not stop a deploy —
it ships and fails at runtime. Treat `tsc` as blocking even though the build won't.

**Lint `src`, not `.`.** `npx eslint .` reports about 1,200 problems, every one of
them from `public/pdf-worker/pdf.worker.min.mjs` — a minified file that
`npm install` copies in via postinstall. It is gitignored but not eslint-ignored.
The number is identical before and after any change, so it tells you nothing.
`npx next lint` reports 0 regardless, because it doesn't load the react-hooks rules
this project configures; never quote it as evidence.

If `npm install` fails with `ENOTEMPTY ... rename ajv`, you are installing onto a
Windows mount. Copy the tree to native disk and run the gates there, against the
commit rather than the working directory.

## Branches

**Vercel builds `master`.** The repository's *default* branch is `main`, which has
a completely unrelated history — its own root commit, no merge base with `master`,
and 291 files that differ. Commit to `master`. Leave `main` alone; that is the
owner's standing instruction.

## Query-parameter links must not be `<Link>`

This site began as a single page switching content on `?view=`. That layer is gone,
but one consequence of it is still live.

`OrderPage` reads `subject`, `description`, `email` and `phone` from
`window.location.search` inside a mount effect. React flushes child effects before
parent effects, and Next.js commits the URL in an effect on an ancestor of every
page — so a soft `<Link>` navigation makes that effect read the **previous** URL.
The quote form then arrives empty, with no error anywhere.

Any CTA carrying query parameters must be a plain `<a href>`, or must assign
`window.location.href`. Every one in the repo currently is; keep it that way.

Related, and worth re-checking after any order-form change: `service` defaults to
`'editing'`, and the editing tab blocks submit without a file upload — while the
prefill effect never sets `service`. So an inbound `/order?subject=...` link can
land on a tab it cannot be submitted from. The quote path has broken twice already,
by two different mechanisms.

## Sizes go in `rem`, never `px`

`globals.css` contains `@media (min-width: 1024px) { html { font-size: 90% } }`.
The whole site renders at 90% on desktop, which only works because every size is in
rem. A hardcoded `min-w-[240px]` renders about 11% larger than everything beside it.

Tailwind's own spacing utilities are already rem-based and safe — `py-16`, `gap-6`,
`mt-4`. It is arbitrary values in square brackets that need care.

Two related conventions: `.stack-container` is the page container on every route,
and hero sections use `py-16 md:py-20` on the inner container (`/about` and
`/contact` use `py-20 md:py-24`). `globals.css` does not override `--spacing`, so
Tailwind's default 0.25rem-per-unit scale applies and px arithmetic on spacing
utilities is real.

## Prisma

Check `prisma/schema.prisma` before trusting any field name. The `Order` model has
no `completedAt`, no `deliveredAt` and no `assignedWriter` — writing to one of those
returned a 500 from the admin panel, and a `Record<string, unknown>` in the handler
stopped the type checker from catching it. Be wary of `Record<string, unknown>` or
`any` on anything that reaches Prisma.

## zod is v4

Two breaking changes bite here. A parse failure exposes `.error.issues`, not
`.error.errors`. And `z.record()` needs both a key and a value schema —
`z.record(z.string())` is a type error. Because build-time type checking is off,
either mistake reaches production.

## `src/components/ui/` has 12 primitives, not the full set

badge, button, card, dialog, input, label, select, table, tabs, textarea, toast,
toaster. The other 35 were removed along with their 26 Radix dependencies, so an
import of `@/components/ui/accordion` fails twice over: no file, no package.

To bring one back: `git show main:src/components/ui/accordion.tsx` plus reinstalling
its Radix package. Not `npx shadcn@latest add`, which refetches upstream and
discards local edits.

## Verifying a refactor

Compare **content, not line counts**. A green build and a symmetric diff have both
hidden a dropped internal link here. The checks that actually work:

- route count — `find src/app -name page.tsx | wc -l` (currently 78)
- unique internal paths across `.ts` **and** `.tsx` (currently 100 — searching only
  `.tsx` misses the 52 generated from data modules)
- page titles, descriptions and canonicals, hashed
- for a styling change: every changed line must still contain `className=`, and the
  multiset of spacing tokens removed and added should balance

There is no browser in the sandboxed environment, so spacing changes cannot be
screenshotted. Say that plainly rather than implying a visual check happened.

## Content is regulated

This is an Australian-facing academic support site. Section 114A of the TEQSA Act
makes it a criminal offence to provide or advertise academic cheating services, and
the Australian Consumer Law prohibits misleading claims. Copy must frame the service
as support — drafting help, feedback, tutoring, model answers, editing — never as
work the student submits as their own. No grade guarantees. No invented order
counts, ratings, review schema or countdown timers; nine components doing exactly
that were deliberately kept out of this repo.

See `.claude/agents/teqsa-copy-check.md` before shipping any student-facing copy.

## The agents in `.claude/agents/`

`pre-push-gate` (run before every push), `seo-metadata-auditor` (run after any
refactor or cleanup), `code-reviewer` (advisory, on a diff), `teqsa-copy-check`
(run on any copy change). They encode the rules above with the exact commands.
