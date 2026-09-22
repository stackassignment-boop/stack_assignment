'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { GraduationCap, Moon, Sun, Phone, Menu, X, ChevronDown, User, Shield, LogOut, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NAV_TOOLS } from '@/lib/tools';

interface HeaderProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
  studentUser?: { name: string; email: string } | null;
  onLogout?: () => void;
}

// Get initial theme
function getInitialTheme(): boolean {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return saved ? saved === 'dark' : prefersDark;
  }
  return false;
}

export default function Header({ currentPage = 'home', onNavigate, studentUser, onLogout }: HeaderProps) {
  const [isDark, setIsDark] = useState(getInitialTheme);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLoginDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- Free Tools menu ------------------------------------------------
  // Opens on pointer hover, as asked. Hover on its own would strand keyboard
  // and touch users, so the trigger is a real link to /tools (a tap goes to the
  // full index) and focus opens the panel so it can be tabbed through.
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);
  const toolsCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openTools = () => {
    if (toolsCloseTimer.current) {
      clearTimeout(toolsCloseTimer.current);
      toolsCloseTimer.current = null;
    }
    setToolsOpen(true);
  };

  // Closing on a short delay rather than at once: the pointer has to cross a
  // few pixels of dead space travelling from the trigger down to the panel, and
  // an instant close makes the menu impossible to reach on a diagonal.
  const closeTools = () => {
    if (toolsCloseTimer.current) clearTimeout(toolsCloseTimer.current);
    toolsCloseTimer.current = setTimeout(() => setToolsOpen(false), 180);
  };

  // Tabbing out of the whole group closes it; moving between the trigger and
  // the links inside it does not, hence the relatedTarget check.
  const handleToolsBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setToolsOpen(false);
    }
  };

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
        setToolsOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setToolsOpen(false);
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
      if (toolsCloseTimer.current) clearTimeout(toolsCloseTimer.current);
    };
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle('dark', newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'samples', label: 'Samples' },
    { id: 'blog', label: 'Blog' },
  ];

  const handleNav = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
    setMobileMenuOpen(false);
    setLoginDropdownOpen(false);
  };

  return (
    <header className="bg-white dark:bg-slate-900 shadow-lg sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <button 
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 hover:opacity-90 transition cursor-pointer"
          >
            <GraduationCap className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              Stack Assignment
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`relative pb-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
                  currentPage === item.id ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full bg-yellow-400" />
                )}
              </button>
            ))}

            {/* Free Tools */}
            <div
              className="relative"
              ref={toolsRef}
              onMouseEnter={openTools}
              onMouseLeave={closeTools}
              onFocus={openTools}
              onBlur={handleToolsBlur}
            >
              <Link
                href="/tools"
                aria-haspopup="true"
                aria-expanded={toolsOpen}
                onClick={() => setToolsOpen(false)}
                className={`relative flex items-center gap-1 pb-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
                  currentPage === 'tools' ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''
                }`}
              >
                Free Tools
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${toolsOpen ? 'rotate-180' : ''}`}
                />
                {currentPage === 'tools' && (
                  <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full bg-yellow-400" />
                )}
              </Link>

              {toolsOpen && (
                /* Sits at `top-full` and carries its own top padding instead of
                   a margin, so the gap under the trigger stays inside the
                   hoverable area. With a margin the menu closes the moment the
                   pointer enters the gap. */
                <div className="absolute left-0 top-full z-50 pt-3">
                  <div className="w-72 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 shadow-lg">
                    {NAV_TOOLS.map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          onClick={() => setToolsOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                        >
                          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300">
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="font-medium">{tool.label}</span>
                        </Link>
                      );
                    })}
                    <div className="mt-1 border-t border-gray-200 dark:border-slate-700 pt-1">
                      <Link
                        href="/tools"
                        onClick={() => setToolsOpen(false)}
                        className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        All free tools <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <a
              href="tel:+919907300710"
              className="hidden sm:flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {/* TODO: same placeholder +91 (India) number flagged elsewhere
                  (PricingPage phone placeholder, WhatsAppOrderButton) — swap
                  for the real AU support line/number before launch. */}
              <Phone className="w-4 h-4" /> +91-99073-00710
            </a>

            <div className="relative hidden sm:inline-flex">
              <span className="absolute -inset-0.5 rounded-md bg-yellow-400 opacity-60 blur-sm" />
              <Button
                onClick={() => handleNav('order')}
                className="relative bg-indigo-600 hover:bg-indigo-700 text-white"
              >
              {/* Route stays 'order' internally to avoid touching URLs/analytics,
                  but the visible label now matches a booking flow, not a
                  commission-a-document flow. */}
              Book Now
            </Button>
            </div>

            {/* Login Dropdown or User Menu */}
            {studentUser ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  </div>
                  <span className="hidden lg:block text-sm font-medium">{studentUser.name.split(' ')[0]}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${loginDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {loginDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-slate-700">
                      <p className="text-sm font-medium truncate">{studentUser.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 break-all">{studentUser.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        handleNav('student-dashboard');
                        setLoginDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2"
                    >
                      <User className="w-4 h-4" /> Dashboard
                    </button>
                    <button
                      onClick={() => {
                        if (onLogout) onLogout();
                        setLoginDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                    loginDropdownOpen || currentPage === 'admin' || currentPage === 'student-login'
                      ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-900/20'
                      : 'hover:bg-gray-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Login
                  <ChevronDown className={`w-4 h-4 transition-transform ${loginDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {loginDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 py-2 z-50">
                    <button
                      onClick={() => {
                        handleNav('student-login');
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-3"
                    >
                      <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Student</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">View samples & bookings</p>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        handleNav('admin');
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-3"
                    >
                      <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                        <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Admin</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Manage website</p>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 shadow-lg border-t dark:border-slate-700">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`block w-full text-left py-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
                  currentPage === item.id ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
            {/* The desktop nav is hidden below md and hover does not exist on
                touch, so the same tools are listed outright here. */}
            <div className="border-t border-gray-200 dark:border-slate-700 pt-4 mt-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 px-2">Free tools:</p>
              {NAV_TOOLS.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 w-full text-left py-2.5 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
                  >
                    <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <span>{tool.label}</span>
                  </Link>
                );
              })}
              <Link
                href="/tools"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1.5 py-2.5 px-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400"
              >
                All free tools <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="border-t border-gray-200 dark:border-slate-700 pt-4 mt-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 px-2">Login as:</p>
              <button
                onClick={() => handleNav('student-login')}
                className="flex items-center gap-3 w-full text-left py-3 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                <User className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <span>Student</span>
              </button>
              <button
                onClick={() => handleNav('admin')}
                className="flex items-center gap-3 w-full text-left py-3 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>Admin</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
