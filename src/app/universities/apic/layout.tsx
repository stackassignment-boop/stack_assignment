import MainLayout from '@/components/layout/MainLayout'

export default function APICLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout>{children}</MainLayout>
}
