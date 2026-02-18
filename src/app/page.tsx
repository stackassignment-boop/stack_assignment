'use client';

import { useState, useEffect } from 'react';
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
import PrivacyPage from '@/components/legal/PrivacyPage';
import TermsPage from '@/components/legal/TermsPage';
import IntegrityPage from '@/components/legal/IntegrityPage';
import AdminPanel from '@/components/admin/AdminPanel';
import OrderPage from '@/components/order/OrderPage';

// Get initial page from URL
function getInitialPage(): string {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    return params.get('view') || 'home';
  }
  return 'home';
}

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(getInitialPage);

  // Update URL when page changes
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.history.pushState({}, '', `/?view=${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin panel has its own layout
  if (currentPage === 'admin') {
    return <AdminPanel />;
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
        return <PricingPage />;
      case 'samples':
        return <SamplesPage />;
      case 'blog':
        return <BlogPage />;
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
            <PricingPage />
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
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
