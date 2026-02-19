'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { CreditCard, Wallet, Clock, CheckCircle, AlertCircle, ArrowLeft, Copy, Check, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaymentPageProps {
  orderId: string;
  onNavigate?: (page: string) => void;
}

interface OrderDetails {
  id: string;
  orderNumber: string;
  title: string;
  subject: string;
  pages: number;
  totalPrice: number;
  deadline: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

// Currency options with conversion rates (base: INR)
const CURRENCIES = {
  INR: { symbol: '₹', name: 'Indian Rupee', rate: 1 },
  USD: { symbol: '$', name: 'US Dollar', rate: 0.012 },
  EUR: { symbol: '€', name: 'Euro', rate: 0.011 },
  GBP: { symbol: '£', name: 'British Pound', rate: 0.0095 },
  AUD: { symbol: 'A$', name: 'Australian Dollar', rate: 0.018 },
  CAD: { symbol: 'C$', name: 'Canadian Dollar', rate: 0.016 },
  AED: { symbol: 'د.إ', name: 'UAE Dirham', rate: 0.044 },
  SGD: { symbol: 'S$', name: 'Singapore Dollar', rate: 0.016 },
  NZD: { symbol: 'NZ$', name: 'New Zealand Dollar', rate: 0.020 },
  ZAR: { symbol: 'R', name: 'South African Rand', rate: 0.22 },
};

type CurrencyCode = keyof typeof CURRENCIES;

export default function PaymentPage({ orderId, onNavigate }: PaymentPageProps) {
  const { data: session } = useSession();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'bank' | 'upi'>('razorpay');
  const [copied, setCopied] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('USD');
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  const formatPrice = (priceInINR: number, currency: CurrencyCode): string => {
    const converted = priceInINR * CURRENCIES[currency].rate;
    const symbol = CURRENCIES[currency].symbol;
    
    // Round to 2 decimal places for non-INR currencies
    if (currency === 'INR') {
      return `${symbol}${Math.round(converted)}`;
    }
    return `${symbol}${converted.toFixed(2)}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch currency settings first
        const settingsRes = await fetch('/api/settings');
        if (settingsRes.ok) {
          const settingsData = await settingsRes.json();
          if (settingsData.currency?.code) {
            setSelectedCurrency(settingsData.currency.code as CurrencyCode);
          }
        }

        // Fetch order details
        const response = await fetch(`/api/student/orders/${orderId}`);
        if (response.ok) {
          const data = await response.json();
          setOrder(data.order);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchData();
    }
  }, [orderId]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePayment = async () => {
    // In a real implementation, you would integrate with Razorpay or other payment gateway
    alert('Payment integration will be set up. For now, please contact admin to confirm payment.');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Order Not Found</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">This order doesn't exist or you don't have access.</p>
          <Button onClick={() => onNavigate?.('student-dashboard')} className="bg-teal-600 hover:bg-teal-700">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // If price is not set by admin yet
  if (order.totalPrice === 0 || order.paymentStatus === 'pending_quote') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-10">
        <div className="max-w-2xl mx-auto px-4">
          <button
            onClick={() => onNavigate?.('student-dashboard')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-800 p-8 text-center">
            <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-amber-600 dark:text-amber-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Waiting for Quote
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our team is reviewing your order. We will send you the price quote shortly.
              You will receive an email notification once the amount is set.
            </p>
            
            <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Order Number</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{order.orderNumber}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-left bg-gray-50 dark:bg-slate-800 rounded-xl p-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Subject</p>
                <p className="font-medium text-gray-900 dark:text-white">{order.subject}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Pages</p>
                <p className="font-medium text-gray-900 dark:text-white">{order.pages}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Deadline</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(order.deadline).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                <p className="font-medium text-amber-600 dark:text-amber-400">Pending Quote</p>
              </div>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
              Need help? Contact us at{' '}
              <a href="tel:+919907300710" className="text-teal-600 dark:text-teal-400 hover:underline">
                +91-99073-00710
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Payment page for orders with price set
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => onNavigate?.('student-dashboard')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800 p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Order Number</p>
                  <p className="font-medium text-gray-900 dark:text-white">{order.orderNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Title</p>
                  <p className="font-medium text-gray-900 dark:text-white">{order.title}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Subject</p>
                  <p className="font-medium text-gray-900 dark:text-white">{order.subject}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Pages</p>
                  <p className="font-medium text-gray-900 dark:text-white">{order.pages}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Deadline</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(order.deadline).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Currency Selector */}
              <div className="mb-4">
                <div className="relative">
                  <button
                    onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                    className="w-full flex items-center justify-between px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition"
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {CURRENCIES[selectedCurrency].name}
                      </span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {CURRENCIES[selectedCurrency].symbol}
                    </span>
                  </button>
                  
                  {showCurrencyDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                      {Object.entries(CURRENCIES).map(([code, info]) => (
                        <button
                          key={code}
                          onClick={() => {
                            setSelectedCurrency(code as CurrencyCode);
                            setShowCurrencyDropdown(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 dark:hover:bg-slate-700 transition ${
                            selectedCurrency === code ? 'bg-teal-50 dark:bg-teal-900/20' : ''
                          }`}
                        >
                          <span className="text-sm text-gray-700 dark:text-gray-300">{info.name}</span>
                          <span className="font-medium text-gray-900 dark:text-white">{info.symbol}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200 dark:border-slate-700">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Amount to Pay</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatPrice(order.totalPrice, selectedCurrency)}
                    </span>
                    {selectedCurrency !== 'INR' && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        ≈ ₹{order.totalPrice} INR (for payment)
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800 p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Select Payment Method</h2>

              {/* Payment Method Tabs */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setPaymentMethod('razorpay')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition ${
                    paymentMethod === 'razorpay'
                      ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                      : 'border-gray-200 dark:border-slate-700 hover:border-gray-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-sm font-medium">Card/UPI</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition ${
                    paymentMethod === 'upi'
                      ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                      : 'border-gray-200 dark:border-slate-700 hover:border-gray-300'
                  }`}
                >
                  <Wallet className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-sm font-medium">UPI</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('bank')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition ${
                    paymentMethod === 'bank'
                      ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                      : 'border-gray-200 dark:border-slate-700 hover:border-gray-300'
                  }`}
                >
                  <Wallet className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-sm font-medium">Bank</span>
                </button>
              </div>

              {/* Razorpay/Card Payment */}
              {paymentMethod === 'razorpay' && (
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    Pay securely using Razorpay. Supports Credit Card, Debit Card, UPI, Net Banking, and Wallets.
                  </p>
                  <Button
                    onClick={handlePayment}
                    className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-lg"
                  >
                    Pay {formatPrice(order.totalPrice, selectedCurrency)} with Razorpay
                  </Button>
                  {selectedCurrency !== 'INR' && (
                    <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                      Payment will be processed in INR (₹{order.totalPrice})
                    </p>
                  )}
                </div>
              )}

              {/* UPI Payment */}
              {paymentMethod === 'upi' && (
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    Pay directly using UPI. Scan the QR code or use the UPI ID below.
                  </p>
                  <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 text-center">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Amount: {formatPrice(order.totalPrice, selectedCurrency)}
                      {selectedCurrency !== 'INR' && (
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 block mt-1">
                          (₹{order.totalPrice} INR)
                        </span>
                      )}
                    </p>
                    <div className="w-48 h-48 bg-white mx-auto mb-4 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                      <span className="text-gray-400 text-sm">QR Code</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <code className="bg-white dark:bg-slate-700 px-3 py-2 rounded-lg font-mono">
                        stackassignment@upi
                      </code>
                      <button
                        onClick={() => handleCopy('stackassignment@upi')}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-slate-600 rounded-lg"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    After payment, share screenshot on WhatsApp for confirmation
                  </p>
                </div>
              )}

              {/* Bank Transfer */}
              {paymentMethod === 'bank' && (
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    Transfer the amount to our bank account and share the screenshot for confirmation.
                  </p>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 space-y-3">
                    <div className="text-center pb-3 border-b border-gray-200 dark:border-slate-600">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Amount to Transfer</p>
                      <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                        {formatPrice(order.totalPrice, selectedCurrency)}
                      </p>
                      {selectedCurrency !== 'INR' && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          ≈ ₹{order.totalPrice} INR
                        </p>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Account Name</span>
                      <span className="font-medium text-gray-900 dark:text-white">Stack Assignment</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Account Number</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 dark:text-white">1234567890123</span>
                        <button
                          onClick={() => handleCopy('1234567890123')}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-slate-600 rounded"
                        >
                          {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">IFSC Code</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 dark:text-white">ABCD0123456</span>
                        <button
                          onClick={() => handleCopy('ABCD0123456')}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-slate-600 rounded"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Bank Name</span>
                      <span className="font-medium text-gray-900 dark:text-white">State Bank of India</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">SWIFT Code</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 dark:text-white">SBININBB123</span>
                        <button
                          onClick={() => handleCopy('SBININBB123')}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-slate-600 rounded"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-200 dark:border-slate-600">
                      For international transfers (SWIFT), additional bank fees may apply.
                    </p>
                  </div>
                </div>
              )}

              {/* Contact Support */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Having trouble? Contact us at{' '}
                  <a href="tel:+919907300710" className="text-teal-600 dark:text-teal-400 hover:underline">
                    +91-99073-00710
                  </a>
                  {' '}or{' '}
                  <a 
                    href="https://wa.me/919907300710?text=Hi, I need help with payment for order: ${order.orderNumber}"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 dark:text-teal-400 hover:underline"
                  >
                    WhatsApp
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
