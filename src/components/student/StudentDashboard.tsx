'use client';

import { useState, useEffect } from 'react';
import { User, FileText, Package, LogOut, Clock, CheckCircle, AlertCircle, Eye, Download, Plus, ChevronRight, Mail, Phone, Calendar, Settings, Edit2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StudentDashboardProps {
  user: { name: string; email: string };
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
}

interface Sample {
  id: string;
  title: string;
  slug: string;
  subject: string;
  academicLevel: string;
  pages: number;
}

interface Order {
  id: string;
  orderNumber: string;
  title: string;
  subject: string;
  status: string;
  paymentStatus: string;
  totalPrice: number;
  deadline: string;
  pages: number;
  createdAt: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
  lastLoginAt?: string;
}

export default function StudentDashboard({ user, onNavigate, onLogout }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [samples, setSamples] = useState<Sample[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedPhone, setEditedPhone] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch samples
        const samplesRes = await fetch('/api/samples');
        if (samplesRes.ok) {
          const samplesData = await samplesRes.json();
          setSamples(samplesData.samples || []);
        }

        // Fetch student orders
        const ordersRes = await fetch('/api/student/orders');
        if (ordersRes.ok) {
          const ordersData = await ordersRes.json();
          setOrders(ordersData.orders || []);
        }

        // Fetch user profile
        const profileRes = await fetch('/api/student/profile');
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setProfile(profileData.profile);
          setEditedName(profileData.profile?.name || user.name);
          setEditedPhone(profileData.profile?.phone || '');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.name]);

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch('/api/student/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editedName,
          phone: editedPhone,
        }),
      });

      if (response.ok) {
        setProfile(prev => prev ? { ...prev, name: editedName, phone: editedPhone } : null);
        setEditingProfile(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'delivered':
      case 'paid':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      case 'in_progress':
      case 'processing':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400';
      case 'pending':
        return 'text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400';
      case 'cancelled':
      case 'failed':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'delivered':
      case 'paid':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">Student Dashboard</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Welcome back, {user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => onNavigate?.('order')}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Order
              </Button>
              <Button
                onClick={() => {
                  if (onLogout) onLogout();
                  onNavigate?.('home');
                }}
                variant="outline"
                className="border-gray-300 dark:border-slate-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Card & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Card */}
          <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 h-20"></div>
            <div className="px-6 pb-6 -mt-10">
              {/* Avatar */}
              <div className="flex justify-center">
                {profile?.avatar ? (
                  <img 
                    src={profile.avatar} 
                    alt={profile.name}
                    className="w-20 h-20 rounded-full border-4 border-white dark:border-slate-900 shadow-lg"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full border-4 border-white dark:border-slate-900 shadow-lg bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
                    <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                      {getInitials(profile?.name || user.name)}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="text-center mt-4">
                {editingProfile ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-center font-semibold"
                      placeholder="Your name"
                    />
                    <input
                      type="tel"
                      value={editedPhone}
                      onChange={(e) => setEditedPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-center"
                      placeholder="Phone number"
                    />
                    <div className="flex gap-2 justify-center">
                      <Button size="sm" onClick={handleUpdateProfile} className="bg-teal-600 hover:bg-teal-700">
                        <Save className="w-4 h-4 mr-1" /> Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingProfile(false)}>
                        <X className="w-4 h-4 mr-1" /> Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {profile?.name || user.name}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">{profile?.email || user.email}</p>
                    {profile?.phone && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{profile.phone}</p>
                    )}
                    <button 
                      onClick={() => setEditingProfile(true)}
                      className="mt-3 text-sm text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 justify-center mx-auto"
                    >
                      <Edit2 className="w-3 h-3" /> Edit Profile
                    </button>
                  </>
                )}
              </div>

              {/* Profile Details */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{profile?.email || user.email}</span>
                </div>
                {profile?.phone && (
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{profile.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Member since {profile?.createdAt ? formatDate(profile.createdAt) : 'N/A'}</span>
                </div>
                {profile?.lastLoginAt && (
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>Last login: {formatDateTime(profile.lastLoginAt)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{samples.length}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Available Samples</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{orders.length}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {orders.filter(o => o.status === 'pending' || o.status === 'in_progress').length}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Active Orders</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {orders.filter(o => o.status === 'completed' || o.status === 'delivered').length}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Completed Orders</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition ${
              activeTab === 'overview'
                ? 'text-teal-600 dark:text-teal-400 border-teal-600 dark:border-teal-400'
                : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('samples')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition ${
              activeTab === 'samples'
                ? 'text-teal-600 dark:text-teal-400 border-teal-600 dark:border-teal-400'
                : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Samples
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition ${
              activeTab === 'orders'
                ? 'text-teal-600 dark:text-teal-400 border-teal-600 dark:border-teal-400'
                : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            My Orders
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition ${
              activeTab === 'settings'
                ? 'text-teal-600 dark:text-teal-400 border-teal-600 dark:border-teal-400'
                : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Settings className="w-4 h-4 inline mr-1" />
            Settings
          </button>
        </div>

        {/* Tab Content */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden">
                  <div className="p-4 border-b border-gray-200 dark:border-slate-800 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
                    <button 
                      onClick={() => setActiveTab('orders')}
                      className="text-sm text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
                    >
                      View all <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="divide-y divide-gray-200 dark:divide-slate-800">
                    {orders.slice(0, 3).map((order) => (
                      <div key={order.id} className="p-4 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{order.title}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {order.orderNumber} • {order.pages} pages
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                    {orders.length === 0 && (
                      <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                        <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No orders yet</p>
                        <Button
                          onClick={() => onNavigate?.('order')}
                          className="mt-4 bg-teal-600 hover:bg-teal-700 text-white"
                        >
                          Place Your First Order
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Available Samples */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden">
                  <div className="p-4 border-b border-gray-200 dark:border-slate-800 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Sample Library</h3>
                    <button 
                      onClick={() => setActiveTab('samples')}
                      className="text-sm text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
                    >
                      View all <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="divide-y divide-gray-200 dark:divide-slate-800">
                    {samples.slice(0, 3).map((sample) => (
                      <div key={sample.id} className="p-4 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{sample.title}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {sample.subject} • {sample.pages} pages
                            </p>
                          </div>
                          <Button
                            onClick={() => onNavigate?.('samples')}
                            size="sm"
                            variant="outline"
                            className="border-teal-600 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                    {samples.length === 0 && (
                      <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                        <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No samples available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Samples Tab */}
            {activeTab === 'samples' && (
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-slate-800">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    All Samples ({samples.length})
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    As a registered student, you have full access to all samples
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                  {samples.map((sample) => (
                    <div key={sample.id} className="border border-gray-200 dark:border-slate-800 rounded-lg p-4 hover:border-teal-500 transition">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 dark:text-white truncate">{sample.title}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{sample.subject}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-slate-800 rounded">
                              {sample.academicLevel}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {sample.pages} pages
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button
                          onClick={() => onNavigate?.('samples')}
                          size="sm"
                          className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Full
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-300 dark:border-slate-700"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-slate-800 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">My Orders</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Track your order status and download completed work
                    </p>
                  </div>
                  <Button
                    onClick={() => onNavigate?.('order')}
                    className="bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Order
                  </Button>
                </div>
                {orders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-slate-800">
                        <tr>
                          <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Order</th>
                          <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Subject</th>
                          <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Pages</th>
                          <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Deadline</th>
                          <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Amount</th>
                          <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                          <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Payment</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-slate-800">
                        {orders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition">
                            <td className="px-4 py-4">
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">{order.title}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{order.orderNumber}</p>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">{order.subject}</td>
                            <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">{order.pages}</td>
                            <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                              {formatDate(order.deadline)}
                            </td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
                              ₹{order.totalPrice.toFixed(2)}
                            </td>
                            <td className="px-4 py-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(order.status)}`}>
                                {getStatusIcon(order.status)}
                                {order.status}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.paymentStatus)}`}>
                                {order.paymentStatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <Package className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No orders yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Start by placing your first order
                    </p>
                    <Button
                      onClick={() => onNavigate?.('order')}
                      className="bg-teal-600 hover:bg-teal-700 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Place Order
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-slate-800">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Account Settings</h3>
                </div>
                <div className="p-6 space-y-6">
                  {/* Profile Section */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Profile Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Full Name</label>
                        <input
                          type="text"
                          value={profile?.name || user.name}
                          readOnly
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Email</label>
                        <input
                          type="email"
                          value={profile?.email || user.email}
                          readOnly
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Phone</label>
                        <input
                          type="tel"
                          value={profile?.phone || 'Not set'}
                          readOnly
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Member Since</label>
                        <input
                          type="text"
                          value={profile?.createdAt ? formatDate(profile.createdAt) : 'N/A'}
                          readOnly
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-200 dark:border-slate-800">
                    <Button
                      variant="outline"
                      className="text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={() => {
                        if (onLogout) onLogout();
                        onNavigate?.('home');
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out of All Devices
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
