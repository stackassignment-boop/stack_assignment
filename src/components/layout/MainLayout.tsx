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
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100">
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
