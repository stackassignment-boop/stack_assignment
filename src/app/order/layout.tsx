import MainLayout from '@/components/layout/MainLayout'

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout>{children}</MainLayout>
}
