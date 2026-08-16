import MainLayout from '@/components/layout/MainLayout'

export default function InstitutionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout>{children}</MainLayout>
}
