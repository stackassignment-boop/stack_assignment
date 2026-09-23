import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';

export const metadata: Metadata = {
  title: 'University Study Guides',
  description: 'Practical university study, assessment and referencing guides for students in Australia and the UK.',
  alternates: { canonical: 'https://www.stackassignment.com/guides' },
};

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
