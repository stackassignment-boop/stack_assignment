import MainLayout from '@/components/layout/MainLayout'

export default function HolmesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout>{children}</MainLayout>
}
