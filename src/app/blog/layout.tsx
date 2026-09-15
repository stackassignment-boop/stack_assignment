import MainLayout from '@/components/layout/MainLayout'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout>{children}</MainLayout>
}
