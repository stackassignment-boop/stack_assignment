'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  GraduationCap,
  Loader2,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  UserPlus,
  LogIn,
  LogOut,
  LayoutDashboard,
  ShoppingCart,
  MessageSquare,
  FileText,
  Briefcase,
  FolderOpen,
  Star,
  Settings,
  Plus,
  Pencil,
  Trash2,
  Search,
  IndianRupee,
  Calendar,
  Clock,
  TrendingUp,
  Users,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

// Types
interface User {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  role: string;
  avatar: string | null;
}

interface Order {
  id: string;
  orderNumber: string;
  title: string;
  description: string;
  subject: string;
  academicLevel: string;
  paperType: string;
  pages: number;
  totalPrice: number;
  deadline: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
  customer?: {
    id: string;
    name: string | null;
    email: string;
  };
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
  priority: string;
  source: string;
  createdAt: string;
}

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  isPublished: boolean;
  viewCount: number;
  createdAt: string;
  author?: {
    name: string | null;
  };
}

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string | null;
  icon: string | null;
  isActive: boolean;
  order: number;
}

interface Sample {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  subject: string | null;
  academicLevel: string | null;
  paperType: string | null;
  pages: number | null;
  isPublished: boolean;
  viewCount: number;
}

interface Testimonial {
  id: string;
  customerName: string;
  customerTitle: string | null;
  avatar: string | null;
  rating: number;
  content: string;
  isApproved: boolean;
  createdAt: string;
}

interface DashboardStats {
  overview: {
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
    totalRevenue: number;
    totalCustomers: number;
    newInquiries: number;
    totalBlogs: number;
    totalSamples: number;
  };
  recentOrders: Order[];
  recentInquiries: Inquiry[];
  orderStatusDistribution: { status: string; count: number }[];
}

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  // Data states
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [samples, setSamples] = useState<Sample[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Dialog states
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showInquiryDialog, setShowInquiryDialog] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<Record<string, unknown> | null>(null);

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch {
      // Not logged in
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setUser(data.user);
      setSuccess('Login successful!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    setActiveSection('dashboard');
  };

  // Fetch data functions
  const fetchDashboardStats = useCallback(async () => {
    try {
      const response = await fetch('/api/dashboard/stats');
      if (response.ok) {
        const data = await response.json();
        setDashboardStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    }
  }, []);

  const fetchOrders = useCallback(async (page = 1) => {
    try {
      const response = await fetch(`/api/orders?page=${page}&limit=10`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
        setTotalPages(data.pagination.totalPages);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  }, []);

  const fetchInquiries = useCallback(async (page = 1) => {
    try {
      const response = await fetch(`/api/inquiries?page=${page}&limit=10`);
      if (response.ok) {
        const data = await response.json();
        setInquiries(data.inquiries);
        setTotalPages(data.pagination.totalPages);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
    }
  }, []);

  const fetchBlogs = useCallback(async (page = 1) => {
    try {
      const response = await fetch(`/api/blogs?page=${page}&limit=10`);
      if (response.ok) {
        const data = await response.json();
        setBlogs(data.blogs);
        setTotalPages(data.pagination.totalPages);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    }
  }, []);

  const fetchServices = useCallback(async () => {
    try {
      const response = await fetch('/api/services');
      if (response.ok) {
        const data = await response.json();
        setServices(data.services);
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
    }
  }, []);

  const fetchSamples = useCallback(async (page = 1) => {
    try {
      const response = await fetch(`/api/samples?page=${page}&limit=10`);
      if (response.ok) {
        const data = await response.json();
        setSamples(data.samples);
        setTotalPages(data.pagination.totalPages);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error('Failed to fetch samples:', error);
    }
  }, []);

  const fetchTestimonials = useCallback(async () => {
    try {
      const response = await fetch('/api/testimonials');
      if (response.ok) {
        const data = await response.json();
        setTestimonials(data.testimonials);
      }
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    }
  }, []);

  // Fetch data when section changes
  useEffect(() => {
    if (user) {
      switch (activeSection) {
        case 'dashboard':
          fetchDashboardStats();
          break;
        case 'orders':
          fetchOrders();
          break;
        case 'inquiries':
          fetchInquiries();
          break;
        case 'blogs':
          fetchBlogs();
          break;
        case 'services':
          fetchServices();
          break;
        case 'samples':
          fetchSamples();
          break;
        case 'testimonials':
          fetchTestimonials();
          break;
      }
    }
  }, [user, activeSection, fetchDashboardStats, fetchOrders, fetchInquiries, fetchBlogs, fetchServices, fetchSamples, fetchTestimonials]);

  // Status badge helper
  const getStatusBadge = (status: string) => {
    const variants: Record<string, { bg: string; text: string }> = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      confirmed: { bg: 'bg-blue-100', text: 'text-blue-800' },
      in_progress: { bg: 'bg-indigo-100', text: 'text-indigo-800' },
      review: { bg: 'bg-purple-100', text: 'text-purple-800' },
      completed: { bg: 'bg-green-100', text: 'text-green-800' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800' },
      refunded: { bg: 'bg-gray-100', text: 'text-gray-800' },
      new: { bg: 'bg-blue-100', text: 'text-blue-800' },
      resolved: { bg: 'bg-green-100', text: 'text-green-800' },
      closed: { bg: 'bg-gray-100', text: 'text-gray-800' },
    };
    const style = variants[status] || variants.pending;
    return (
      <Badge className={`${style.bg} ${style.text} hover:${style.bg}`}>
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  // Format date
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Update order status
  const updateOrderStatus = async (orderId: string, status: string, paymentStatus?: string) => {
    try {
      const body: Record<string, string> = { status };
      if (paymentStatus) body.paymentStatus = paymentStatus;

      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        fetchOrders(currentPage);
        setShowOrderDialog(false);
      }
    } catch (error) {
      console.error('Failed to update order:', error);
    }
  };

  // Update inquiry status
  const updateInquiryStatus = async (inquiryId: string, status: string, priority?: string, notes?: string) => {
    try {
      const body: Record<string, string> = { status };
      if (priority) body.priority = priority;
      if (notes) body.notes = notes;

      const response = await fetch(`/api/inquiries/${inquiryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        fetchInquiries(currentPage);
        setShowInquiryDialog(false);
      }
    } catch (error) {
      console.error('Failed to update inquiry:', error);
    }
  };

  // Delete function
  const deleteItem = async (type: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      let endpoint = '';
      switch (type) {
        case 'order':
          endpoint = `/api/orders/${id}`;
          break;
        case 'inquiry':
          endpoint = `/api/inquiries/${id}`;
          break;
        case 'blog':
          endpoint = `/api/blogs/${blogs.find(b => b.id === id)?.slug}`;
          break;
        case 'service':
          endpoint = `/api/services/${services.find(s => s.id === id)?.slug}`;
          break;
        case 'sample':
          endpoint = `/api/samples/${samples.find(s => s.id === id)?.slug}`;
          break;
        case 'testimonial':
          endpoint = `/api/testimonials?id=${id}`;
          break;
      }

      const response = await fetch(endpoint, { method: 'DELETE' });
      if (response.ok) {
        // Refresh data
        switch (type) {
          case 'order':
            fetchOrders(currentPage);
            break;
          case 'inquiry':
            fetchInquiries(currentPage);
            break;
          case 'blog':
            fetchBlogs(currentPage);
            break;
          case 'service':
            fetchServices();
            break;
          case 'sample':
            fetchSamples(currentPage);
            break;
          case 'testimonial':
            fetchTestimonials();
            break;
        }
      }
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  // Login page
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-indigo-600 rounded-xl">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Stack Assignment</h1>
            </div>
            <p className="text-slate-600 dark:text-slate-400">Admin Dashboard</p>
          </div>

          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle>Welcome</CardTitle>
              <CardDescription>Sign in to manage your academic writing service</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-4 bg-green-50 border-green-200 text-green-800">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@stackassignment.com"
                      className="pl-10"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              <div className="mt-4 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm text-muted-foreground">
                <p className="font-medium mb-1">Demo Credentials:</p>
                <p>Email: admin@stackassignment.com</p>
                <p>Password: admin123</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Dashboard layout
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
    { id: 'blogs', label: 'Blogs', icon: FileText },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'samples', label: 'Samples', icon: FolderOpen },
    { id: 'testimonials', label: 'Testimonials', icon: Star },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-indigo-600" />
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Stack Assignment</h1>
              <p className="text-xs text-slate-500">Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900 dark:text-white">{user.name || user.email}</p>
              <Badge variant="outline" className="text-xs">{user.role}</Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-slate-800 min-h-[calc(100vh-64px)] border-r dark:border-slate-700">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeSection === item.id
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Dashboard */}
          {activeSection === 'dashboard' && dashboardStats && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h2>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">Total Orders</p>
                        <p className="text-2xl font-bold">{dashboardStats.overview.totalOrders}</p>
                      </div>
                      <ShoppingCart className="w-8 h-8 text-indigo-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">Pending Orders</p>
                        <p className="text-2xl font-bold text-yellow-600">{dashboardStats.overview.pendingOrders}</p>
                      </div>
                      <Clock className="w-8 h-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">Total Revenue</p>
                        <p className="text-2xl font-bold text-green-600">{formatCurrency(dashboardStats.overview.totalRevenue)}</p>
                      </div>
                      <IndianRupee className="w-8 h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">New Inquiries</p>
                        <p className="text-2xl font-bold text-blue-600">{dashboardStats.overview.newInquiries}</p>
                      </div>
                      <MessageSquare className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Orders & Inquiries */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-64">
                      <div className="space-y-3">
                        {dashboardStats.recentOrders.map((order) => (
                          <div key={order.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <div>
                              <p className="font-medium text-sm">{order.orderNumber}</p>
                              <p className="text-xs text-slate-500">{order.title.substring(0, 30)}...</p>
                            </div>
                            <div className="text-right">
                              {getStatusBadge(order.status)}
                              <p className="text-xs text-slate-500 mt-1">{formatCurrency(order.totalPrice)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Inquiries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-64">
                      <div className="space-y-3">
                        {dashboardStats.recentInquiries.map((inquiry) => (
                          <div key={inquiry.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <div>
                              <p className="font-medium text-sm">{inquiry.name}</p>
                              <p className="text-xs text-slate-500">{inquiry.subject || 'No subject'}</p>
                            </div>
                            <div className="text-right">
                              {getStatusBadge(inquiry.status)}
                              <p className="text-xs text-slate-500 mt-1">{formatDate(inquiry.createdAt)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Orders Section */}
          {activeSection === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Orders</h2>
                <Button onClick={() => fetchOrders(currentPage)}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order #</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Deadline</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.orderNumber}</TableCell>
                          <TableCell className="max-w-xs truncate">{order.title}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{order.customer?.name || 'N/A'}</p>
                              <p className="text-xs text-slate-500">{order.customer?.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell>{getStatusBadge(order.paymentStatus)}</TableCell>
                          <TableCell>{formatDate(order.deadline)}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedOrder(order);
                                setShowOrderDialog(true);
                              }}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Inquiries Section */}
          {activeSection === 'inquiries' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Inquiries</h2>
                <Button onClick={() => fetchInquiries(currentPage)}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inquiries.map((inquiry) => (
                        <TableRow key={inquiry.id}>
                          <TableCell className="font-medium">{inquiry.name}</TableCell>
                          <TableCell>{inquiry.email}</TableCell>
                          <TableCell className="max-w-xs truncate">{inquiry.subject || 'N/A'}</TableCell>
                          <TableCell>{getStatusBadge(inquiry.status)}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{inquiry.priority}</Badge>
                          </TableCell>
                          <TableCell>{inquiry.source}</TableCell>
                          <TableCell>{formatDate(inquiry.createdAt)}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedInquiry(inquiry);
                                setShowInquiryDialog(true);
                              }}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Blogs Section */}
          {activeSection === 'blogs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Blog Posts</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {blogs.map((blog) => (
                        <TableRow key={blog.id}>
                          <TableCell className="font-medium">{blog.title}</TableCell>
                          <TableCell>{blog.category || 'N/A'}</TableCell>
                          <TableCell>{blog.author?.name || 'Unknown'}</TableCell>
                          <TableCell>
                            {blog.isPublished ? (
                              <Badge className="bg-green-100 text-green-800">Published</Badge>
                            ) : (
                              <Badge variant="secondary">Draft</Badge>
                            )}
                          </TableCell>
                          <TableCell>{blog.viewCount}</TableCell>
                          <TableCell>{formatDate(blog.createdAt)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => deleteItem('blog', blog.id)}>
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Services Section */}
          {activeSection === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Services</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Service
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                  <Card key={service.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        {service.isActive ? (
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        ) : (
                          <Badge variant="secondary">Inactive</Badge>
                        )}
                      </div>
                      <CardDescription>{service.shortDescription}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                        {service.description}
                      </p>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm">
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => deleteItem('service', service.id)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Samples Section */}
          {activeSection === 'samples' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Sample Papers</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Sample
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>Pages</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {samples.map((sample) => (
                        <TableRow key={sample.id}>
                          <TableCell className="font-medium">{sample.title}</TableCell>
                          <TableCell>{sample.subject || 'N/A'}</TableCell>
                          <TableCell>{sample.academicLevel || 'N/A'}</TableCell>
                          <TableCell>{sample.pages || 'N/A'}</TableCell>
                          <TableCell>
                            {sample.isPublished ? (
                              <Badge className="bg-green-100 text-green-800">Published</Badge>
                            ) : (
                              <Badge variant="secondary">Draft</Badge>
                            )}
                          </TableCell>
                          <TableCell>{sample.viewCount}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => deleteItem('sample', sample.id)}>
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Testimonials Section */}
          {activeSection === 'testimonials' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Testimonials</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Testimonial
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="font-semibold">{testimonial.customerName}</p>
                          <p className="text-sm text-slate-500">{testimonial.customerTitle}</p>
                        </div>
                        {testimonial.isApproved ? (
                          <Badge className="bg-green-100 text-green-800">Approved</Badge>
                        ) : (
                          <Badge variant="secondary">Pending</Badge>
                        )}
                      </div>
                      <div className="flex mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < testimonial.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                        &ldquo;{testimonial.content}&rdquo;
                      </p>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm">
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => deleteItem('testimonial', testimonial.id)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Order Dialog */}
      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              {selectedOrder?.orderNumber}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-500">Title</Label>
                  <p className="font-medium">{selectedOrder.title}</p>
                </div>
                <div>
                  <Label className="text-slate-500">Subject</Label>
                  <p className="font-medium">{selectedOrder.subject}</p>
                </div>
                <div>
                  <Label className="text-slate-500">Academic Level</Label>
                  <p className="font-medium">{selectedOrder.academicLevel}</p>
                </div>
                <div>
                  <Label className="text-slate-500">Paper Type</Label>
                  <p className="font-medium">{selectedOrder.paperType}</p>
                </div>
                <div>
                  <Label className="text-slate-500">Pages</Label>
                  <p className="font-medium">{selectedOrder.pages}</p>
                </div>
                <div>
                  <Label className="text-slate-500">Total Price</Label>
                  <p className="font-medium">{formatCurrency(selectedOrder.totalPrice)}</p>
                </div>
                <div>
                  <Label className="text-slate-500">Deadline</Label>
                  <p className="font-medium">{formatDate(selectedOrder.deadline)}</p>
                </div>
                <div>
                  <Label className="text-slate-500">Payment Status</Label>
                  {getStatusBadge(selectedOrder.paymentStatus)}
                </div>
              </div>
              <div>
                <Label className="text-slate-500">Description</Label>
                <p className="text-sm">{selectedOrder.description}</p>
              </div>
              <div>
                <Label className="text-slate-500">Customer</Label>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{selectedOrder.customer?.name}</p>
                  <p className="text-slate-500">({selectedOrder.customer?.email})</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <Label>Update Status</Label>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {['pending', 'confirmed', 'in_progress', 'review', 'completed'].map((status) => (
                    <Button
                      key={status}
                      size="sm"
                      variant={selectedOrder.status === status ? 'default' : 'outline'}
                      onClick={() => updateOrderStatus(selectedOrder.id, status)}
                    >
                      {status.replace('_', ' ')}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Inquiry Dialog */}
      <Dialog open={showInquiryDialog} onOpenChange={setShowInquiryDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-500">Name</Label>
                  <p className="font-medium">{selectedInquiry.name}</p>
                </div>
                <div>
                  <Label className="text-slate-500">Email</Label>
                  <p className="font-medium">{selectedInquiry.email}</p>
                </div>
                <div>
                  <Label className="text-slate-500">Phone</Label>
                  <p className="font-medium">{selectedInquiry.phone || 'N/A'}</p>
                </div>
                <div>
                  <Label className="text-slate-500">Source</Label>
                  <p className="font-medium">{selectedInquiry.source}</p>
                </div>
              </div>
              <div>
                <Label className="text-slate-500">Subject</Label>
                <p className="font-medium">{selectedInquiry.subject || 'N/A'}</p>
              </div>
              <div>
                <Label className="text-slate-500">Message</Label>
                <p className="text-sm">{selectedInquiry.message}</p>
              </div>

              <div className="border-t pt-4">
                <Label>Update Status</Label>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {['new', 'in_progress', 'resolved', 'closed'].map((status) => (
                    <Button
                      key={status}
                      size="sm"
                      variant={selectedInquiry.status === status ? 'default' : 'outline'}
                      onClick={() => updateInquiryStatus(selectedInquiry.id, status)}
                    >
                      {status.replace('_', ' ')}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
