import MainLayout from '@/components/layout/MainLayout'

/**
 * Shared chrome for every page under /universities.
 *
 * This replaces 21 individual `layout.tsx` files — one per institution, plus
 * the `[slug]` fallback — that were byte-for-byte identical apart from the name
 * of the exported function. A layout at this level wraps every nested route,
 * so the per-institution copies were pure duplication, and each new university
 * page meant remembering to add another one.
 *
 * Note for anyone adding a page here: do NOT wrap it in `<MainLayout>` again.
 * This layout already does it, and a second wrap renders a second header and
 * footer.
 */
export default function UniversitiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout>{children}</MainLayout>
}
