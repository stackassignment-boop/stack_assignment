import type { Metadata } from 'next';
import RegionLandingPage from '@/components/seo/RegionLandingPage';

export const metadata: Metadata = {
  title: 'Academic Support UK | Tutoring, Proofreading & Study Help',
  description: 'Academic tutoring, dissertation proofreading, assessment guidance and study resources for UK university students. Explore university-specific support and free study tools.',
  alternates: {
    canonical: 'https://www.stackassignment.com/uk/academic-support',
    languages: {
      'en-AU': 'https://www.stackassignment.com/australia/academic-support',
      'en-GB': 'https://www.stackassignment.com/uk/academic-support',
      'x-default': 'https://www.stackassignment.com/australia/academic-support',
    },
  },
  openGraph: { title: 'Academic Support for UK University Students', description: 'Tutoring, assessment guidance, dissertation proofreading and free study resources for students across the UK.', locale: 'en_GB' },
};

export default function UKAcademicSupportPage() { return <RegionLandingPage region="uk" />; }
