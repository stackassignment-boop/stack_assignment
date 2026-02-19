'use client';

import { useState, useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PortfolioSection from '@/components/home/PortfolioSection';
import FAQSection from '@/components/home/FAQSection';
import UniversitiesSection from '@/components/home/UniversitiesSection';
import PricingPage from '@/components/pricing/PricingPage';
import SamplesPage from '@/components/samples/SamplesPage';
import BlogPage from '@/components/blog/BlogPage';
import BlogDetailPage from '@/components/blog/BlogDetailPage';
import PrivacyPage from '@/components/legal/PrivacyPage';
import TermsPage from '@/components/legal/TermsPage';
import IntegrityPage from '@/components/legal/IntegrityPage';
import ServicesPage from '@/components/services/ServicesPage';
import AdminPanel from '@/components/admin/AdminPanel';
import OrderPage from '@/components/order/OrderPage';
import StudentLoginPage from '@/components/student/StudentLoginPage';
import StudentDashboard from '@/components/student/StudentDashboard';
import LiveActivityFeed from '@/components/fomo/LiveActivityFeed';
import UrgencyBanner from '@/components/fomo/UrgencyBanner';
import SocialProofWidget from '@/components/fomo/SocialProofWidget';
import FloatingActions from '@/components/marketing/FloatingActions';
import DraggableFloatingWidget from '@/components/marketing/DraggableFloatingWidget';
import GradeGuaranteeBadge from '@/components/marketing/GradeGuaranteeBadge';
import PriceMatchGuarantee from '@/components/marketing/PriceMatchGuarantee';
import TrustBadges from '@/components/marketing/TrustBadges';
import ReferralBanner from '@/components/marketing/ReferralBanner';
import ExamStressBanner from '@/components/marketing/ExamStressBanner';

// Get page from URL
function getPageFromURL(): string {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('view') || 'home';
  }
  return 'home';
}

// Get slug from URL
function getSlugFromURL(): string {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('slug') || '';
  }
  return '';
}

// Get preview from URL
function getPreviewFromURL(): string {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('preview') || '';
  }
  return '';
}

function HomeContent() {
  const { data: session } = useSession();
  const [currentPage, setCurrentPage] = useState(getPageFromURL);
  const [blogSlug, setBlogSlug] = useState(getSlugFromURL);
  const [previewSlug, setPreviewSlug] = useState(getPreviewFromURL);

  // Update URL when page changes
  const handleNavigate = useCallback((page: string, params?: Record<string, string>) => {
    setCurrentPage(page);
    setBlogSlug(params?.slug || '');
    setPreviewSlug(params?.preview || '');
    
    // Build URL with params
    const urlParams = new URLSearchParams();
    urlParams.set('view', page);
    if (params?.slug) {
      urlParams.set('slug', params.slug);
    }
    if (params?.preview) {
      urlParams.set('preview', params.preview);
    }
    
    window.history.pushState({}, '', `/?${urlParams.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle student login
  const handleStudentLogin = useCallback((user: { name: string; email: string }) => {
    // Session is managed by NextAuth
    handleNavigate('student-dashboard');
  }, [handleNavigate]);

  // Handle student logout
  const handleStudentLogout = useCallback(async () => {
    await signOut({ redirect: false });
    handleNavigate('home');
  }, [handleNavigate]);

  // Get student user from session
  const studentUser = session?.user ? {
    name: session.user.name || 'Student',
    email: session.user.email || '',
  } : null;

  // Admin panel has its own layout
  if (currentPage === 'admin') {
    return <AdminPanel />;
  }

  // Student login page has its own layout
  if (currentPage === 'student-login') {
    return (
      <StudentLoginPage 
        onNavigate={handleNavigate}
        onLogin={handleStudentLogin}
      />
    );
  }

  // Student dashboard has its own layout
  if (currentPage === 'student-dashboard' && studentUser) {
    return (
      <StudentDashboard 
        user={studentUser}
        onNavigate={handleNavigate}
        onLogout={handleStudentLogout}
      />
    );
  }

  // Render the appropriate page
  const renderPage = () => {
    switch (currentPage) {
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} />;
      case 'pricing':
        return <PricingPage onNavigate={handleNavigate} />;
      case 'samples':
        return <SamplesPage previewSlug={previewSlug} />;
      case 'blog':
        return <BlogPage onNavigate={handleNavigate} />;
      case 'blog-detail':
        return <BlogDetailPage slug={blogSlug} onNavigate={handleNavigate} />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      case 'integrity':
        return <IntegrityPage />;
      case 'order':
        return <OrderPage onNavigate={handleNavigate} />;
      case 'home':
      default:
        return (
          <>
            <UrgencyBanner onNavigate={handleNavigate} />
            <HeroSection onNavigate={handleNavigate} />
            <StatsSection />
            
            {/* Marketing Guarantees */}
            <section className="py-8 bg-gray-50 dark:bg-slate-900">
              <div className="max-w-6xl mx-auto px-6 space-y-4">
                <GradeGuaranteeBadge variant="inline" onNavigate={handleNavigate} />
                <PriceMatchGuarantee variant="inline" />
              </div>
            </section>
            
            <PricingPage onNavigate={handleNavigate} />
            
            {/* Exam Stress Banner */}
            <section className="py-8 bg-white dark:bg-slate-950">
              <div className="max-w-6xl mx-auto px-6">
                <ExamStressBanner variant="banner" />
              </div>
            </section>
            
            <TestimonialsSection onNavigate={handleNavigate} />
            <PortfolioSection onNavigate={handleNavigate} />
            
            {/* Referral Program */}
            <section className="py-8 bg-gray-50 dark:bg-slate-900">
              <div className="max-w-6xl mx-auto px-6">
                <ReferralBanner variant="full" />
              </div>
            </section>
            
            <FAQSection />
            <UniversitiesSection />
            
            {/* Trust Badges Full */}
            <section className="py-8 bg-white dark:bg-slate-950">
              <div className="max-w-6xl mx-auto px-6">
                <TrustBadges variant="full" />
              </div>
            </section>
            
            {/* FOMO Elements */}
            <LiveActivityFeed />
            <SocialProofWidget />
            <FloatingActions />
            <DraggableFloatingWidget />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100">
      <Header 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        studentUser={studentUser}
        onLogout={handleStudentLogout}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function HomePage() {
  return <HomeContent />;
}
