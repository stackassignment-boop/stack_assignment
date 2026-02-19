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
import AdminPanel from '@/components/admin/AdminPanel';
import OrderPage from '@/components/order/OrderPage';
import StudentLoginPage from '@/components/student/StudentLoginPage';
import StudentDashboard from '@/components/student/StudentDashboard';

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

function HomeContent() {
  const { data: session } = useSession();
  const [currentPage, setCurrentPage] = useState(getPageFromURL);
  const [blogSlug, setBlogSlug] = useState(getSlugFromURL);

  // Update URL when page changes
  const handleNavigate = useCallback((page: string, params?: Record<string, string>) => {
    setCurrentPage(page);
    setBlogSlug(params?.slug || '');
    
    // Build URL with params
    const urlParams = new URLSearchParams();
    urlParams.set('view', page);
    if (params?.slug) {
      urlParams.set('slug', params.slug);
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
        return (
          <>
            <HeroSection onNavigate={handleNavigate} />
            <StatsSection />
            <PortfolioSection onNavigate={handleNavigate} />
            <FAQSection />
            <UniversitiesSection />
          </>
        );
      case 'pricing':
        return <PricingPage onNavigate={handleNavigate} />;
      case 'samples':
        return <SamplesPage />;
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
            <HeroSection onNavigate={handleNavigate} />
            <StatsSection />
            <PricingPage onNavigate={handleNavigate} />
            <TestimonialsSection onNavigate={handleNavigate} />
            <PortfolioSection onNavigate={handleNavigate} />
            <FAQSection />
            <UniversitiesSection />
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
