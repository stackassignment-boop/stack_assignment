'use client';

import { useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DraggableFloatingWidget from '@/components/marketing/DraggableFloatingWidget';
import { useRouter, usePathname } from 'next/navigation';
import { useRouteNavigate } from '@/lib/useRouteNavigate';

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * The site chrome: header, footer and the floating contact widget.
 *
 * Sixteen route folders use this *as* their `layout.tsx`, via
 * `export { default } from '@/components/layout/MainLayout'`. Each of them
 * previously declared its own wrapper component — same import, same
 * `return <MainLayout>{children}</MainLayout>`, only the function name differed.
 * That is duplication with nowhere for a change to go: adding a notice bar or
 * changing the page shell meant editing sixteen files, or editing one and
 * quietly leaving fifteen behind.
 *
 * Re-exporting keeps every URL exactly where it was — no directories moved, no
 * route group introduced. This file is a client component, so those layout
 * modules stay server modules that simply hand Next a reference to it; children
 * are still server-rendered and passed straight through.
 *
 * Sections that need more than the shared chrome (guides, subjects,
 * universities, and the root layout) keep their own layout files, because they
 * add metadata or structured data of their own.
 */
export default function MainLayout({ children }: MainLayoutProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // Get current page from pathname
  const getCurrentPage = () => {
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/services')) return 'services';
    if (pathname.startsWith('/pricing')) return 'pricing';
    if (pathname.startsWith('/samples')) return 'samples';
    if (pathname.startsWith('/blog')) return 'blog';
    if (pathname.startsWith('/tools')) return 'tools';
    if (pathname.startsWith('/about')) return 'home';
    if (pathname.startsWith('/contact')) return 'home';
    if (pathname.startsWith('/universities')) return 'universities';
    if (pathname.startsWith('/order')) return 'order';
    return 'home';
  };

  const currentPage = getCurrentPage();

  // Shared with the page-level routes so header/footer navigation and
  // in-page calls to action resolve pages the same way — and so that any
  // params (e.g. a carried-over pricing quote) are preserved rather than dropped.
  const handleNavigate = useRouteNavigate();

  // Handle student logout
  const handleStudentLogout = useCallback(async () => {
    await signOut({ redirect: false });
    router.push('/');
  }, [router]);

  // Get student user from session
  const studentUser = session?.user ? {
    name: session.user.name || 'Student',
    email: session.user.email || '',
  } : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        studentUser={studentUser}
        onLogout={handleStudentLogout}
      />
      <main className="flex-grow">
        {children}
      </main>
      <Footer onNavigate={handleNavigate} />
      <DraggableFloatingWidget />
    </div>
  );
}
