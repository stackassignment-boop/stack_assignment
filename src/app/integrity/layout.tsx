import MainLayout from '@/components/layout/MainLayout'

export default function IntegrityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout>{children}</MainLayout>
}
