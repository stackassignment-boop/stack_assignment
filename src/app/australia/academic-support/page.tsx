import type { Metadata } from 'next';
import RegionLandingPage from '@/components/seo/RegionLandingPage';

export const metadata: Metadata = {
  title: 'Academic Support Australia | Tutoring, Proofreading & Study Help',
  description: 'Academic tutoring, assessment guidance, proofreading and study resources for Australian university students. Explore university-specific support and free study tools.',
  alternates: {
    canonical: 'https://www.stackassignment.com/australia/academic-support',
    languages: {
      'en-AU': 'https://www.stackassignment.com/australia/academic-support',
      'en-GB': 'https://www.stackassignment.com/uk/academic-support',
      'x-default': 'https://www.stackassignment.com/australia/academic-support',
    },
  },
  openGraph: { title: 'Academic Support for Australian University Students', description: 'Tutoring, assessment guidance, proofreading and free study resources for students across Australia.', locale: 'en_AU' },
};

export default function AustraliaAcademicSupportPage() { return <RegionLandingPage region="au" />; }
