# Stack Assignment

Academic tutoring, study-support and editing service for the Australian market.
Next.js 16 App Router, TypeScript, Tailwind 4, Prisma against Neon Postgres,
NextAuth for student and admin sessions, Vercel Blob for file storage.

- 43 pages and 34 API routes; the production build emits 128 static pages
- 21 institution-specific pages (18 under `/universities/`, plus dedicated pages
  for Holmes Institute, Kaplan and Melbourne Institute of Technology)
- A WAM (Weighted Average Mark) calculator at `/tools/wam-calculator`

## Getting started

```bash
npm install                 # runs prisma generate via postinstall
cp .env.example .env        # then fill in the values listed below
npm run dev                 # http://localhost:3000
```

Required environment variables: `DATABASE_URL` and `DIRECT_URL` (Neon Postgres —
the second is the non-pooled connection Prisma needs for migrations),
`NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`,
`BLOB_READ_WRITE_TOKEN`, and `NEXT_PUBLIC_GA_MEASUREMENT_ID`.

Useful scripts: `npm run db:push` to sync the schema, `npm run db:seed` to load
seed data (this one runs under `bun`), `npm run lint`, and
`node node_modules/typescript/bin/tsc --noEmit` to type-check.

## Positioning constraints — read before editing any copy

The site is deliberately worded as **tutoring, study support and editing**, never
as ghostwriting or work-for-submission, and it makes **no guarantees about
grades**. This is not a stylistic preference. Australian consumer law treats
outcome guarantees as actionable representations, and TEQSA's academic-integrity
provisions bear directly on how services like this may be advertised.

Concretely, that means: no "guaranteed HD", no "we write your assignment", no
countdown timers or scarcity banners, and no claims that work will be accepted or
graded a particular way. Samples are framed as model answers and learning
material. `/integrity` states the boundary explicitly. If you add copy, match the
register of the existing pages rather than reaching for conversion language.

## Two things that will bite you

**Legacy `?view=` URLs.** The site was originally a single page that switched
content on a `view` query parameter. `src/middleware.ts` now 308-redirects all 18
of those legacy values to real routes, stripping the parameter so the redirect is
provably terminal. It runs only on `/`. Don't reintroduce query-parameter routing;
it caused a hydration mismatch on the statically prerendered home page and split
ranking signals across duplicate URLs.

**Navigating to a page that reads the query string.** React flushes a child's
effects before its parent's, and Next.js commits the new URL inside an effect on
`AppRouter` — an ancestor of every page. So after a client-side `<Link>` click, a
freshly mounted page's own mount effect still sees the URL it navigated *from*.

`OrderPage` reads `subject`, `description`, `email` and `phone` out of
`window.location.search` in a mount effect. Any link that carries those
parameters must therefore trigger a **full page load**, not a client transition.
That's why `useRouteNavigate` assigns `window.location.href` when parameters are
present, and why the parameter-carrying calls to action are plain `<a>` elements
rather than `<Link>`. If you convert one to `<Link>`, the quote silently arrives
empty — no error, no warning.

## Known issues worth fixing

`next.config.ts` sets `typescript.ignoreBuildErrors: true`, so type errors never
fail a build. There are currently 20 across eight files
(`api/auth/[...nextauth]`, `api/blogs`, `api/migrate-blogs`, `api/orders/[id]`,
`api/pricing/calculate`, `requirements/page`, `PortfolioSection`,
`TestimonialsSection`). Until that flag comes off, `tsc --noEmit` is the only gate.

The `build` script runs `prisma db push --accept-data-loss` before `next build`.
That executes against whatever `DATABASE_URL` points at — in production, your live
Neon database — on **every deploy**. A schema edit that drops a column would take
the data with it, without prompting. Consider moving to `prisma migrate deploy`.

The `start` script runs `node .next/standalone/server.js`, but `next.config.ts`
does not set `output: 'standalone'`, so that file is never produced and
`npm start` fails. Irrelevant on Vercel, which doesn't use the script.

`src/app/api/auth/[...nextauth]/route.ts` falls back to a hardcoded, guessable
string when `NEXTAUTH_SECRET` is unset. Anyone who knows it can forge a session
for any account, including admin. Delete the fallback so the app fails loudly
instead.

The form at `src/app/contact/page.tsx` has no `onSubmit` and no `action` — it
renders, validates nothing, and submits nowhere.

## Layout

```
src/app/           routes; api/ holds the 34 endpoints
src/components/    feature folders (home, order, samples, admin, student, tools…)
src/components/ui/ the 12 shadcn primitives actually in use
src/lib/           seo-config.ts, auth helpers, Prisma client, pricing
src/middleware.ts  legacy ?view= redirects, matcher '/' only
prisma/            schema.prisma (postgresql) and seed.ts
scripts/           check-neon.ts, a Neon connectivity probe
public/            static assets, including universities/ imagery
```

`DEPLOYMENT.md` covers pushing to GitHub and deploying. Files that were part of
the original scaffold but unused now live in `unused files/` one level up, with a
`WHAT-THIS-IS.md` explaining each and how to restore it.
