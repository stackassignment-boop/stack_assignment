'use client';

import { useState, useEffect, useRef } from 'react';
import { GraduationCap, Moon, Sun, Phone, Menu, X, ChevronDown, User, Shield, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
                className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
                  currentPage === item.id ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
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
              <Phone className="w-4 h-4" /> +91-99073-00710
            </a>

            <Button
              onClick={() => handleNav('order')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white hidden sm:flex"
            >
              Order Now
            </Button>

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
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 py-2">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-slate-700">
                      <p className="text-sm font-medium">{studentUser.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{studentUser.email}</p>
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
                        <p className="text-xs text-gray-500 dark:text-gray-400">View samples & orders</p>
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
