import MainLayout from '@/components/layout/MainLayout'

export default function KaplanLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout>{children}</MainLayout>
}
