'use client';

import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, UserPlus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import DraggableFloatingWidget from '@/components/marketing/DraggableFloatingWidget';

interface StudentLoginPageProps {
  onNavigate?: (page: string) => void;
  onLogin?: (user: { name: string; email: string }) => void;
}

export default function StudentLoginPage({ onNavigate, onLogin }: StudentLoginPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError('');
    
    try {
      // Redirect to student dashboard after Google login
      await signIn('google', {
        callbackUrl: '/?view=student-dashboard',
      });
    } catch (err) {
      setError('An error occurred with Google login.');
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isLogin) {
        // Login with credentials using NextAuth
        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.error) {
          setError('Invalid email or password');
        } else if (result?.ok) {
          if (onLogin) {
            onLogin({ name: formData.email, email: formData.email });
          }
          // Redirect to dashboard
          window.location.href = '/?view=student-dashboard';
        }
      } else {
        // Register
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }

        const response = await fetch('/api/student/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'register',
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccess('Account created successfully! You can now login.');
          setIsLogin(true);
          setFormData({ ...formData, password: '', confirmPassword: '' });
        } else {
          setError(data.error || 'Registration failed');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button 
            onClick={() => onNavigate?.('home')}
            className="flex items-center gap-2 hover:opacity-90 transition cursor-pointer"
          >
            <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <span className="text-xl font-bold text-teal-600 dark:text-teal-400">Student Portal</span>
          </button>
          <button
            onClick={() => onNavigate?.('home')}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition"
          >
            ← Back to Website
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-800 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-slate-800">
              <button
                onClick={() => { setIsLogin(true); setError(''); setSuccess(''); }}
                className={`flex-1 py-4 text-center font-medium transition ${
                  isLogin 
                    ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 border-b-2 border-teal-600 dark:border-teal-400' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => { setIsLogin(false); setError(''); setSuccess(''); }}
                className={`flex-1 py-4 text-center font-medium transition ${
                  !isLogin 
                    ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 border-b-2 border-teal-600 dark:border-teal-400' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Register
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
              {/* Error/Success Messages */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm p-3 rounded-lg">
                  {success}
                </div>
              )}

              {/* Name Field (Register only) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required={!isLogin}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                  />
                </div>
              </div>

              {/* Phone Field (Register only) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Phone Number (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                    />
                  </div>
                </div>
              )}

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field (Register only) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      required={!isLogin}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                    />
                  </div>
                </div>
              )}

              {/* Forgot Password (Login only) */}
              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm text-teal-600 dark:text-teal-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </span>
                ) : isLogin ? (
                  'Login'
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <UserPlus className="w-5 h-5" />
                    Create Account
                  </span>
                )}
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200 dark:border-slate-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-slate-900 px-2 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Google Login Button */}
              <Button
                type="button"
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                variant="outline"
                className="w-full py-3 border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 font-medium rounded-lg transition"
              >
                {googleLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Connecting...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </span>
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }}
                  className="ml-1 text-teal-600 dark:text-teal-400 font-medium hover:underline"
                >
                  {isLogin ? 'Register' : 'Login'}
                </button>
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Student benefits:</p>
            <div className="flex flex-wrap justify-center gap-3 text-xs">
              <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full">
                View Full Samples
              </span>
              <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full">
                Track Orders
              </span>
              <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full">
                Special Discounts
              </span>
            </div>
          </div>
        </div>
      </main>
      {/* WhatsApp Floating Widget */}
      <DraggableFloatingWidget />
    </div>
  );
}
