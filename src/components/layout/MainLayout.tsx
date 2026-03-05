'use client';

import { useState, useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useRouter, usePathname } from 'next/navigation';

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
    if (pathname.startsWith('/about')) return 'home';
    if (pathname.startsWith('/contact')) return 'home';
    if (pathname.startsWith('/order')) return 'order';
    return 'home';
  };

  const currentPage = getCurrentPage();

  // Navigate to main page with query params for compatibility
  const handleNavigate = useCallback((page: string) => {
    if (page === 'home') {
      router.push('/');
    } else if (page === 'blog') {
      router.push('/blog');
    } else if (page === 'services') {
      router.push('/services');
    } else if (page === 'samples') {
      router.push('/samples');
    } else if (page === 'pricing') {
      router.push('/pricing');
    } else if (page === 'order') {
      router.push('/order');
    } else if (page === 'admin') {
      router.push('/?view=admin');
    } else if (page === 'student-login') {
      router.push('/?view=student-login');
    } else if (page === 'student-dashboard') {
      router.push('/?view=student-dashboard');
    }
  }, [router]);

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
    </div>
  );
}
