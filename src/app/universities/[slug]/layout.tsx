import MainLayout from '@/components/layout/MainLayout'

export default function UniversityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout>{children}</MainLayout>
}
