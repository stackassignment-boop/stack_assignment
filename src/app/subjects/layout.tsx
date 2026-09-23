import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';

export const metadata: Metadata = {
  title: 'University Subject Support',
  description: 'Subject-specific tutoring, assessment guidance, draft feedback and study resources for university students in Australia and the UK.',
  alternates: { canonical: 'https://www.stackassignment.com/subjects' },
};

export default function SubjectsLayout({ children }: { children: React.ReactNode }) { return <MainLayout>{children}</MainLayout>; }
