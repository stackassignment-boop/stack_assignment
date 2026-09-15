'use client';

import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PortfolioSection from '@/components/home/PortfolioSection';
import FAQSection from '@/components/home/FAQSection';
import UniversitiesSection from '@/components/home/UniversitiesSection';
import PricingPage from '@/components/pricing/PricingPage';
import TrustBadges from '@/components/marketing/TrustBadges';
import ReferralBanner from '@/components/marketing/ReferralBanner';
import { useRouteNavigate } from '@/lib/useRouteNavigate';

/**
 * Client boundary for `/`, following the same pattern as OrderRoute and
 * PricingRoute: the route's `page.tsx` stays a server component (so it can
 * export metadata) and everything needing a click handler lives in here.
 *
 * This component used to be the whole site. `src/app/page.tsx` was a
 * `'use client'` page that read `?view=` out of `window.location.search` during
 * render and switched between fifteen different page components, which is why
 * `/?view=order` and `/?view=admin` threw hydration errors: `/` is statically
 * prerendered, so the server HTML was always the home page, while the browser
 * immediately rendered OrderPage or AdminPanel instead. Those views now have
 * real routes and `src/middleware.ts` redirects the old URLs to them, so this
 * file renders one thing only — the home page.
 */
export default function HomeRoute() {
  const navigate = useRouteNavigate();

  return (
    <MainLayout>
      {/*
        Removed from this page, deliberately:
          - UrgencyBanner / ExamStressBanner ("Sleep While We Write —
            $20 Off") — an explicit offer to write work for a student.
          - GradeGuaranteeBadge — a guaranteed grade only means anything
            if the work is submitted for assessment.
          - LiveActivityFeed / SocialProofWidget — both contained no
            fetch call at all: the "live" order feed and the five-star
            testimonials attributed to Harvard, Oxford, MIT, Stanford and
            Cambridge were hardcoded fabrications. Beyond the academic
            integrity problem, fabricated testimonials and fake activity
            feeds are misleading conduct under the Australian Consumer
            Law (Competition and Consumer Act 2010 Sch 2 ss 18, 29).
          - PriceMatchGuarantee — "Guaranteed lowest prices" is an
            absolute claim that has to be substantiable, and competing on
            cheapness works against the expert-tutoring positioning.
      */}
      <HeroSection onNavigate={navigate} />
      <StatsSection />
      <HowItWorksSection onNavigate={navigate} />
      <PricingPage onNavigate={navigate} />
      <TestimonialsSection onNavigate={navigate} />
      <PortfolioSection onNavigate={navigate} />

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
    </MainLayout>
  );
}
