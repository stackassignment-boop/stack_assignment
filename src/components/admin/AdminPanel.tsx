'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { 
  LayoutDashboard, 
  Package, 
  MessageSquare, 
  FileText, 
  BookOpen, 
  Users,
  LogOut,
  LogIn,
  DollarSign,
  Clock,
  AlertCircle,
  Eye,
  Trash2,
  Settings,
  Search,
  CheckCircle2,
  ExternalLink,
  Copy,
  Globe,
  Share2,
  Code
} from 'lucide-react';
import { toast } from 'sonner';
import { seoConfig } from '@/lib/seo-config';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
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
  recentOrders: Array<{
    id: string;
    orderNumber: string;
    title: string;
    totalPrice: number;
    status: string;
    createdAt: string;
    customer: { name: string; email: string };
  }>;
  recentInquiries: Array<{
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: string;
    createdAt: string;
  }>;
}

interface Order {
  id: string;
  orderNumber: string;
  title: string;
  description: string;
  subject: string;
  pages: number;
  totalPrice: number;
  status: string;
  paymentStatus: string;
  deadline: string;
  attachments?: string; // JSON string with file URLs
  notes?: string;
  createdAt: string;
  customer: { name: string; email: string; phone?: string };
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  isPublished: boolean;
  createdAt: string;
}

interface Sample {
  id: string;
  title: string;
  slug: string;
  description?: string;
  subject?: string;
  academicLevel?: string;
  paperType?: string;
  pages?: number;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  isPublished: boolean;
  createdAt: string;
}

export default function AdminPanel() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loggingIn, setLoggingIn] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [samples, setSamples] = useState<Sample[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Dialog states
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [showInquiryDialog, setShowInquiryDialog] = useState(false);
  const [priceInput, setPriceInput] = useState<string>('');
  const [showBlogDialog, setShowBlogDialog] = useState(false);
  const [blogForm, setBlogForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    category: '',
    tags: '',
    isPublished: false,
  });
  const [creatingBlog, setCreatingBlog] = useState(false);

  // Sample dialog states
  const [showSampleDialog, setShowSampleDialog] = useState(false);
  const [sampleForm, setSampleForm] = useState({
    title: '',
    description: '',
    subject: '',
    academicLevel: '',
    paperType: '',
    pages: 1,
    isPublished: true,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [creatingSample, setCreatingSample] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);

  // Settings state
  const [currencySettings, setCurrencySettings] = useState({
    defaultCurrency: 'USD',
    currencySymbol: '$',
    currencyRate: 0.012,
  });
  const [savingCurrency, setSavingCurrency] = useState(false);

  // Available currencies
  const AVAILABLE_CURRENCIES = [
    { code: 'USD', symbol: '$', name: 'US Dollar', rate: 0.012 },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 1 },
    { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.011 },
    { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.0095 },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 0.018 },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 0.016 },
    { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', rate: 0.044 },
    { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rate: 0.016 },
    { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', rate: 0.020 },
    { code: 'ZAR', symbol: 'R', name: 'South African Rand', rate: 0.22 },
  ];

  // Check auth status
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        if (data.user?.role === 'admin') {
          loadDashboardData();
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadDashboardData = async () => {
    try {
      const [statsRes, ordersRes, inquiriesRes, blogsRes, samplesRes, settingsRes] = await Promise.all([
        fetch('/api/dashboard/stats'),
        fetch('/api/orders'),
        fetch('/api/inquiries'),
        fetch('/api/blogs'),
        fetch('/api/samples'),
        fetch('/api/admin/settings'),
      ]);

      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data);
      }
      if (ordersRes.ok) {
        const data = await ordersRes.json();
        setOrders(data.orders || []);
      }
      if (inquiriesRes.ok) {
        const data = await inquiriesRes.json();
        setInquiries(data.inquiries || []);
      }
      if (blogsRes.ok) {
        const data = await blogsRes.json();
        setBlogs(data.blogs || []);
      }
      if (samplesRes.ok) {
        const data = await samplesRes.json();
        setSamples(data.samples || []);
      }
      if (settingsRes.ok) {
        const data = await settingsRes.json();
        setCurrencySettings(data.settings);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        toast.success('Login successful!');
        setLoginForm({ email: '', password: '' });
        loadDashboardData();
      } else {
        toast.error(data.error || 'Login failed');
      }
    } catch (error) {
      toast.error('An error occurred during login');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      setStats(null);
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        toast.success('Order status updated');
        loadDashboardData();
        setShowOrderDialog(false);
      } else {
        toast.error('Failed to update order');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const updateOrderPrice = async (orderId: string, price: number) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          totalPrice: price,
          paymentStatus: 'pending_payment'
        }),
      });

      if (res.ok) {
        toast.success('Price updated successfully! Student will be notified.');
        loadDashboardData();
        setShowOrderDialog(false);
      } else {
        toast.error('Failed to update price');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const updateInquiryStatus = async (inquiryId: string, status: string) => {
    try {
      const res = await fetch(`/api/inquiries/${inquiryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        toast.success('Inquiry status updated');
        loadDashboardData();
        setShowInquiryDialog(false);
      } else {
        toast.error('Failed to update inquiry');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const createBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingBlog(true);

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: blogForm.title,
          excerpt: blogForm.excerpt,
          content: blogForm.content,
          featuredImage: blogForm.featuredImage || undefined,
          category: blogForm.category || undefined,
          tags: blogForm.tags ? blogForm.tags.split(',').map(t => t.trim()) : undefined,
          isPublished: blogForm.isPublished,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Blog post created successfully!');
        setBlogForm({
          title: '',
          excerpt: '',
          content: '',
          featuredImage: '',
          category: '',
          tags: '',
          isPublished: false,
        });
        setShowBlogDialog(false);
        loadDashboardData();
      } else {
        toast.error(data.error || 'Failed to create blog');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setCreatingBlog(false);
    }
  };

  const deleteBlog = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      return;
    }

    try {
      const res = await fetch(`/api/blogs/${slug}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Blog post deleted successfully');
        loadDashboardData();
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to delete blog');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      toast.error('Only PDF files are allowed');
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size exceeds 10MB limit');
      return;
    }

    setSelectedFile(file);
    toast.success('File selected: ' + file.name);
  };

  const createSample = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast.error('Please select a PDF file');
      return;
    }

    setCreatingSample(true);
    setUploadingFile(true);

    try {
      const formData = new FormData();
      formData.append('title', sampleForm.title);
      formData.append('description', sampleForm.description || '');
      formData.append('subject', sampleForm.subject || '');
      formData.append('academicLevel', sampleForm.academicLevel || '');
      formData.append('paperType', sampleForm.paperType || '');
      formData.append('pages', sampleForm.pages.toString());
      formData.append('isPublished', sampleForm.isPublished.toString());
      formData.append('file', selectedFile);

      const res = await fetch('/api/samples', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Sample created successfully!');
        setSampleForm({
          title: '',
          description: '',
          subject: '',
          academicLevel: '',
          paperType: '',
          pages: 1,
          isPublished: true,
        });
        setSelectedFile(null);
        setShowSampleDialog(false);
        loadDashboardData();
      } else {
        toast.error(data.error || 'Failed to create sample');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setCreatingSample(false);
      setUploadingFile(false);
    }
  };

  const deleteSample = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this sample? This action cannot be undone.')) {
      return;
    }

    try {
      const res = await fetch(`/api/samples/${slug}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Sample deleted successfully');
        loadDashboardData();
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to delete sample');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; className: string }> = {
      pending: { variant: "secondary", className: "bg-yellow-100 text-yellow-800" },
      confirmed: { variant: "secondary", className: "bg-blue-100 text-blue-800" },
      in_progress: { variant: "secondary", className: "bg-purple-100 text-purple-800" },
      completed: { variant: "secondary", className: "bg-green-100 text-green-800" },
      cancelled: { variant: "destructive", className: "" },
      new: { variant: "secondary", className: "bg-blue-100 text-blue-800" },
      read: { variant: "secondary", className: "bg-gray-100 text-gray-800" },
      replied: { variant: "secondary", className: "bg-green-100 text-green-800" },
      paid: { variant: "secondary", className: "bg-green-100 text-green-800" },
      unpaid: { variant: "secondary", className: "bg-red-100 text-red-800" },
    };
    
    const config = variants[status] || { variant: "outline", className: "" };
    return (
      <Badge variant={config.variant} className={config.className}>
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  const formatPrice = (price: number) => {
    // Convert INR to selected currency using stored rate
    const convertedPrice = price * currencySettings.currencyRate;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencySettings.defaultCurrency,
    }).format(convertedPrice);
  };

  const handleSaveCurrency = async (currencyCode: string) => {
    setSavingCurrency(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'defaultCurrency', value: currencyCode }),
      });

      if (res.ok) {
        const data = await res.json();
        setCurrencySettings({
          defaultCurrency: currencyCode,
          currencySymbol: data.setting.currencySymbol,
          currencyRate: data.setting.currencyRate,
        });
        toast.success(`Currency updated to ${currencyCode}`);
      } else {
        toast.error('Failed to update currency');
      }
    } catch (error) {
      console.error('Error saving currency:', error);
      toast.error('Failed to update currency');
    } finally {
      setSavingCurrency(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Login form
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <LogIn className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@stackassignment.com"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loggingIn}>
                {loggingIn ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user.name}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 sm:grid-cols-7 w-full max-w-3xl gap-1">
            <TabsTrigger value="dashboard" className="flex items-center gap-1 sm:gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-1 sm:gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="flex items-center gap-1 sm:gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Inquiries</span>
            </TabsTrigger>
            <TabsTrigger value="blogs" className="flex items-center gap-1 sm:gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Blogs</span>
            </TabsTrigger>
            <TabsTrigger value="samples" className="flex items-center gap-1 sm:gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Samples</span>
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex items-center gap-1 sm:gap-2">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">SEO</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1 sm:gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {stats && (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{formatPrice(stats.overview.totalRevenue)}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.overview.totalOrders}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.overview.pendingOrders}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">New Inquiries</CardTitle>
                      <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.overview.newInquiries}</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.overview.totalCustomers}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Published Blogs</CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.overview.totalBlogs}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Published Samples</CardTitle>
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.overview.totalSamples}</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Orders */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Latest orders from customers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order #</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {stats.recentOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.orderNumber}</TableCell>
                            <TableCell className="max-w-[200px] truncate">{order.title}</TableCell>
                            <TableCell>{order.customer.name}</TableCell>
                            <TableCell>{formatPrice(order.totalPrice)}</TableCell>
                            <TableCell>{getStatusBadge(order.status)}</TableCell>
                            <TableCell>{formatDate(order.createdAt)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Recent Inquiries */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Inquiries</CardTitle>
                    <CardDescription>Latest customer inquiries</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Subject</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {stats.recentInquiries.map((inquiry) => (
                          <TableRow key={inquiry.id}>
                            <TableCell className="font-medium">{inquiry.name}</TableCell>
                            <TableCell>{inquiry.email}</TableCell>
                            <TableCell className="max-w-[200px] truncate">{inquiry.subject}</TableCell>
                            <TableCell>{getStatusBadge(inquiry.status)}</TableCell>
                            <TableCell>{formatDate(inquiry.createdAt)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Orders</CardTitle>
                <CardDescription>Manage customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order #</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Pages</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.orderNumber}</TableCell>
                          <TableCell className="max-w-[150px] truncate">{order.title}</TableCell>
                          <TableCell>
                            <div>
                              <div>{order.customer.name}</div>
                              <div className="text-xs text-muted-foreground">{order.customer.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>{order.pages}</TableCell>
                          <TableCell>{formatPrice(order.totalPrice)}</TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell>{getStatusBadge(order.paymentStatus)}</TableCell>
                          <TableCell>{formatDate(order.createdAt)}</TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setSelectedOrder(order);
                                setShowOrderDialog(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inquiries Tab */}
          <TabsContent value="inquiries" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Inquiries</CardTitle>
                <CardDescription>Manage customer inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inquiries.map((inquiry) => (
                        <TableRow key={inquiry.id}>
                          <TableCell className="font-medium">{inquiry.name}</TableCell>
                          <TableCell>{inquiry.email}</TableCell>
                          <TableCell className="max-w-[150px] truncate">{inquiry.subject}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{inquiry.message}</TableCell>
                          <TableCell>{getStatusBadge(inquiry.status)}</TableCell>
                          <TableCell>{formatDate(inquiry.createdAt)}</TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setSelectedInquiry(inquiry);
                                setShowInquiryDialog(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blogs Tab */}
          <TabsContent value="blogs" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>All Blogs</CardTitle>
                  <CardDescription>Manage blog posts</CardDescription>
                </div>
                <Button onClick={() => setShowBlogDialog(true)}>
                  <FileText className="h-4 w-4 mr-2" />
                  Add Blog
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Excerpt</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {blogs.map((blog) => (
                        <TableRow key={blog.id}>
                          <TableCell className="font-medium">{blog.title}</TableCell>
                          <TableCell className="text-muted-foreground">{blog.slug}</TableCell>
                          <TableCell className="max-w-[250px] truncate">{blog.excerpt}</TableCell>
                          <TableCell>
                            <Badge variant={blog.isPublished ? "default" : "secondary"}>
                              {blog.isPublished ? 'Published' : 'Draft'}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(blog.createdAt)}</TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => deleteBlog(blog.slug)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Samples Tab */}
          <TabsContent value="samples" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>All Samples</CardTitle>
                  <CardDescription>Manage sample papers</CardDescription>
                </div>
                <Button onClick={() => setShowSampleDialog(true)}>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Add Sample
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>Pages</TableHead>
                        <TableHead>File</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {samples.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                            No samples yet. Click "Add Sample" to create one.
                          </TableCell>
                        </TableRow>
                      ) : (
                        samples.map((sample) => (
                          <TableRow key={sample.id}>
                            <TableCell className="font-medium">{sample.title}</TableCell>
                            <TableCell>{sample.subject || '-'}</TableCell>
                            <TableCell>{sample.academicLevel?.replace('_', ' ') || '-'}</TableCell>
                            <TableCell>{sample.pages || '-'}</TableCell>
                            <TableCell>
                              {sample.fileName ? (
                                <a 
                                  href={`/api/samples/${sample.slug}/download`}
                                  className="text-primary hover:underline flex items-center gap-1"
                                >
                                  <FileText className="h-4 w-4" />
                                  {sample.fileName}
                                </a>
                              ) : sample.fileUrl ? (
                                <a 
                                  href={sample.fileUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline flex items-center gap-1"
                                >
                                  <FileText className="h-4 w-4" />
                                  PDF
                                </a>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge variant={sample.isPublished ? "default" : "secondary"}>
                                {sample.isPublished ? 'Published' : 'Draft'}
                              </Badge>
                            </TableCell>
                            <TableCell>{formatDate(sample.createdAt)}</TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => deleteSample(sample.slug)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Tab */}
          <TabsContent value="seo" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">SEO Score</p>
                      <p className="text-2xl font-bold text-emerald-600">85%</p>
                    </div>
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-full">
                      <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Sitemap URLs</p>
                      <p className="text-2xl font-bold">7</p>
                    </div>
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                      <Globe className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Structured Data</p>
                      <p className="text-2xl font-bold">2</p>
                    </div>
                    <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                      <Code className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="text-2xl font-bold text-emerald-600">Active</p>
                    </div>
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-full">
                      <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* SEO Checklist */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  SEO Checklist
                </CardTitle>
                <CardDescription>
                  Your SEO configuration status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: 'sitemap', title: 'Sitemap.xml', status: 'completed', description: 'Auto-generated sitemap for search engines', link: '/sitemap.xml' },
                    { id: 'robots', title: 'Robots.txt', status: 'completed', description: 'Configured for search engine crawlers', link: '/robots.txt' },
                    { id: 'meta-tags', title: 'Meta Tags', status: 'completed', description: 'Title, description, keywords configured', link: null },
                    { id: 'open-graph', title: 'Open Graph Tags', status: 'completed', description: 'Social media sharing optimized', link: null },
                    { id: 'structured-data', title: 'Structured Data (JSON-LD)', status: 'completed', description: 'Schema.org markup for rich snippets', link: null },
                    { id: 'google-verification', title: 'Google Search Console', status: 'completed', description: 'Verified via Domain Provider', link: 'https://search.google.com/search-console' },
                  ].map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card"
                    >
                      <div className="flex items-center gap-4">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-emerald-100 text-emerald-800">completed</Badge>
                        {task.link && (
                          <a href={task.link} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm">
                              View
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Meta Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Current Meta Configuration</CardTitle>
                <CardDescription>
                  These are your current SEO meta tags (configured in src/lib/seo-config.ts)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Site Name</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input value={seoConfig.siteName} readOnly className="bg-muted" />
                      <Button variant="outline" size="icon" onClick={() => { navigator.clipboard.writeText(seoConfig.siteName); toast.success('Copied!'); }}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Site URL</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input value={seoConfig.siteUrl} readOnly className="bg-muted" />
                      <Button variant="outline" size="icon" onClick={() => { navigator.clipboard.writeText(seoConfig.siteUrl); toast.success('Copied!'); }}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Title</Label>
                    <Input value={seoConfig.title} readOnly className="bg-muted mt-1" />
                    <p className="text-xs text-muted-foreground mt-1">{seoConfig.title.length}/60 characters (recommended)</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                    <textarea 
                      value={seoConfig.description} 
                      readOnly 
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-muted px-3 py-2 text-sm mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">{seoConfig.description.length}/160 characters (recommended)</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Keywords</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {seoConfig.keywords.slice(0, 10).map((keyword, index) => (
                        <Badge key={index} variant="secondary">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sitemap URLs */}
            <Card>
              <CardHeader>
                <CardTitle>Sitemap URLs</CardTitle>
                <CardDescription>
                  URLs included in your sitemap.xml
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { url: seoConfig.siteUrl, priority: '1.0', freq: 'daily' },
                    { url: `${seoConfig.siteUrl}/services`, priority: '0.9', freq: 'weekly' },
                    { url: `${seoConfig.siteUrl}/pricing`, priority: '0.9', freq: 'weekly' },
                    { url: `${seoConfig.siteUrl}/samples`, priority: '0.8', freq: 'weekly' },
                    { url: `${seoConfig.siteUrl}/blog`, priority: '0.8', freq: 'daily' },
                    { url: `${seoConfig.siteUrl}/about`, priority: '0.8', freq: 'monthly' },
                    { url: `${seoConfig.siteUrl}/contact`, priority: '0.7', freq: 'monthly' },
                  ].map((page, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <code className="text-sm text-muted-foreground">{page.url}</code>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">Priority: {page.priority}</Badge>
                        <Badge variant="secondary">{page.freq}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Structured Data */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Structured Data (JSON-LD)
                </CardTitle>
                <CardDescription>
                  Schema.org markup for rich snippets in search results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Organization Schema</h4>
                  <pre className="p-4 rounded-lg bg-slate-900 text-slate-100 text-sm overflow-x-auto">
                    {JSON.stringify({
                      '@context': 'https://schema.org',
                      '@type': 'Organization',
                      name: seoConfig.organization.name,
                      url: seoConfig.siteUrl,
                      logo: seoConfig.organization.logo,
                      sameAs: seoConfig.organization.sameAs,
                    }, null, 2)}
                  </pre>
                </div>
                <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                  <p className="text-sm text-emerald-800 dark:text-emerald-200">
                    ✓ Structured data helps search engines understand your content better. 
                    Test your schema using the{' '}
                    <a
                      href="https://search.google.com/test/rich-results"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-medium"
                    >
                      Google Rich Results Test
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Google Search Console */}
            <Card>
              <CardHeader>
                <CardTitle>Google Search Console</CardTitle>
                <CardDescription>
                  Your website is verified via Domain Name Provider
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                  <div>
                    <p className="font-medium text-emerald-800 dark:text-emerald-200">Verification Complete</p>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300">
                      Your domain is verified in Google Search Console
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <a
                    href="https://search.google.com/search-console"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button>
                      Open Google Search Console
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                  <a
                    href="/sitemap.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline">
                      View Sitemap
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Google Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.02 10.18C12.49 9.76 13.21 9.76 13.68 10.18L22.4 18.05C22.91 18.5 22.91 19.29 22.4 19.74L19.6 22.27C19.13 22.69 18.41 22.69 17.94 22.27L9.22 14.4C8.71 13.95 8.71 13.16 9.22 12.71L12.02 10.18Z"/>
                    <path d="M19.6 1.73L22.4 4.27C22.91 4.72 22.91 5.51 22.4 5.95L10.89 16.33C10.42 16.76 9.7 16.76 9.23 16.33L6.43 13.8C5.92 13.35 5.92 12.56 6.43 12.11L17.94 1.73C18.41 1.3 19.13 1.3 19.6 1.73Z"/>
                    <path d="M1.6 1.73L4.4 4.27C4.91 4.72 4.91 5.51 4.4 5.95L1.6 8.49C1.09 8.93 1.09 9.72 1.6 10.17L4.4 12.71C4.91 13.16 4.91 13.95 4.4 14.4L1.6 16.93C1.09 17.38 1.09 18.17 1.6 18.62L4.4 21.16C4.87 21.58 5.59 21.58 6.06 21.16L8.86 18.62C9.37 18.17 9.37 17.38 8.86 16.93L6.06 14.4C5.55 13.95 5.55 13.16 6.06 12.71L8.86 10.17C9.37 9.72 9.37 8.93 8.86 8.49L6.06 5.95C5.55 5.51 5.55 4.72 6.06 4.27L8.86 1.73C9.33 1.3 10.05 1.3 10.52 1.73L13.32 4.27C13.83 4.72 13.83 5.51 13.32 5.95L10.52 8.49C10.01 8.93 10.01 9.72 10.52 10.17L13.32 12.71C13.83 13.16 13.83 13.95 13.32 14.4L10.52 16.93C10.01 17.38 10.01 18.17 10.52 18.62L13.32 21.16C13.79 21.58 14.51 21.58 14.98 21.16L17.78 18.62C18.29 18.17 18.29 17.38 17.78 16.93L14.98 14.4C14.47 13.95 14.47 13.16 14.98 12.71L17.78 10.17C18.29 9.72 18.29 8.93 17.78 8.49L14.98 5.95C14.47 5.51 14.47 4.72 14.98 4.27L17.78 1.73C18.25 1.3 18.97 1.3 19.44 1.73L1.6 1.73Z"/>
                  </svg>
                  Google Analytics 4
                </CardTitle>
                <CardDescription>
                  Track website traffic and user behavior
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                    <strong>Setup Instructions:</strong>
                  </p>
                  <ol className="text-sm text-blue-700 dark:text-blue-300 space-y-2 list-decimal list-inside">
                    <li>Go to <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="underline font-medium">Google Analytics</a></li>
                    <li>Create a new GA4 property for your website</li>
                    <li>Copy your Measurement ID (format: G-XXXXXXXXXX)</li>
                    <li>Add it to your environment variables as <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">NEXT_PUBLIC_GA_MEASUREMENT_ID</code></li>
                    <li>Deploy your changes</li>
                  </ol>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Your Measurement ID</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      value={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'Not configured'} 
                      readOnly 
                      className="bg-muted" 
                    />
                    <a
                      href="https://analytics.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline">
                        Open GA4
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground">Page Views</p>
                    <p className="text-2xl font-bold text-blue-600">Auto</p>
                    <p className="text-xs text-muted-foreground">Tracked automatically</p>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground">Events</p>
                    <p className="text-2xl font-bold text-purple-600">Custom</p>
                    <p className="text-xs text-muted-foreground">Orders, inquiries, etc.</p>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground">Real-time</p>
                    <p className="text-2xl font-bold text-emerald-600">Active</p>
                    <p className="text-xs text-muted-foreground">Live tracking</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  General Settings
                </CardTitle>
                <CardDescription>
                  Configure your application settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Currency Settings */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Currency Settings</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Set the default currency for displaying prices across the platform
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currency">Default Currency</Label>
                      <Select
                        value={currencySettings.defaultCurrency}
                        onValueChange={handleSaveCurrency}
                        disabled={savingCurrency}
                      >
                        <SelectTrigger id="currency">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          {AVAILABLE_CURRENCIES.map((currency) => (
                            <SelectItem key={currency.code} value={currency.code}>
                              {currency.symbol} {currency.name} ({currency.code})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Current Selection</Label>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                        <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                          {currencySettings.currencySymbol}
                        </span>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {AVAILABLE_CURRENCIES.find(c => c.code === currencySettings.defaultCurrency)?.name || 'US Dollar'}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            1 INR = {currencySettings.currencyRate} {currencySettings.defaultCurrency}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Note:</strong> Prices are stored in INR (Indian Rupee) in the database and converted to the selected currency for display. 
                      The conversion rate is approximate and may need to be updated periodically.
                    </p>
                  </div>
                </div>

                {/* Exchange Rates Table */}
                <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-slate-700">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Exchange Rates (Base: INR)</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Current exchange rates used for currency conversion
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Currency</TableHead>
                          <TableHead>Symbol</TableHead>
                          <TableHead>Code</TableHead>
                          <TableHead>Rate (1 INR = ?)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {AVAILABLE_CURRENCIES.map((currency) => (
                          <TableRow key={currency.code} className={currency.code === currencySettings.defaultCurrency ? 'bg-teal-50 dark:bg-teal-900/20' : ''}>
                            <TableCell className="font-medium">{currency.name}</TableCell>
                            <TableCell className="text-xl">{currency.symbol}</TableCell>
                            <TableCell>{currency.code}</TableCell>
                            <TableCell>{currency.rate}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Order Detail Dialog */}
      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              {selectedOrder?.orderNumber}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              {/* Status Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
                  <Label className="text-muted-foreground">Order Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                </div>
                <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
                  <Label className="text-muted-foreground">Payment Status</Label>
                  <p className="font-medium mt-1">{getStatusBadge(selectedOrder.paymentStatus)}</p>
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
                <Label className="text-muted-foreground">Customer</Label>
                <p className="font-medium">{selectedOrder.customer.name}</p>
                <p className="text-sm text-muted-foreground">{selectedOrder.customer.email}</p>
              </div>

              {/* Order Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Title</Label>
                  <p className="font-medium">{selectedOrder.title}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Subject</Label>
                  <p className="font-medium">{selectedOrder.subject || '-'}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Pages</Label>
                  <p className="font-medium">{selectedOrder.pages}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Deadline</Label>
                  <p className="font-medium">{selectedOrder.deadline ? formatDate(selectedOrder.deadline) : '-'}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Order Date</Label>
                  <p className="font-medium">{formatDate(selectedOrder.createdAt)}</p>
                </div>
              </div>

              {/* Description */}
              {selectedOrder.description && (
                <div>
                  <Label className="text-muted-foreground">Description</Label>
                  <p className="text-sm bg-gray-50 dark:bg-slate-800 rounded-lg p-3 mt-1">{selectedOrder.description}</p>
                </div>
              )}

              {/* Attachments */}
              {selectedOrder.attachments && (
                <div>
                  <Label className="text-muted-foreground">Attachments</Label>
                  <div className="mt-2 space-y-2">
                    {(() => {
                      try {
                        const files = JSON.parse(selectedOrder.attachments);
                        if (!files || files.length === 0) return null;
                        return files.map((file: { name: string; type: string; size: number; url?: string }, index: number) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-slate-800 rounded-lg p-3">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-gray-500" />
                              <div>
                                <span className="text-sm font-medium">{file.name}</span>
                                <span className="text-xs text-gray-500 ml-2">({(file.size / 1024).toFixed(1)} KB)</span>
                              </div>
                            </div>
                            {file.url && (
                              <a
                                href={file.url}
                                download={file.name}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm hover:opacity-90"
                              >
                                Download
                              </a>
                            )}
                          </div>
                        ));
                      } catch {
                        return <span className="text-sm text-muted-foreground">{selectedOrder.attachments}</span>;
                      }
                    })()}
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedOrder.notes && (
                <div>
                  <Label className="text-muted-foreground">Notes</Label>
                  <p className="text-sm bg-gray-50 dark:bg-slate-800 rounded-lg p-3 mt-1 whitespace-pre-wrap">{selectedOrder.notes}</p>
                </div>
              )}
              
              {/* Price Setting Section */}
              <div className="space-y-2 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <Label className="text-amber-800 dark:text-amber-200 font-semibold">
                  Set Price (INR)
                </Label>
                {selectedOrder.totalPrice > 0 ? (
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">
                      Current: {formatPrice(selectedOrder.totalPrice)}
                    </span>
                    <span className="text-xs text-muted-foreground">(Price already set)</span>
                  </div>
                ) : (
                  <p className="text-sm text-amber-700 dark:text-amber-300 mb-2">
                    No price set yet. Enter the amount below:
                  </p>
                )}
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Enter price"
                    value={priceInput}
                    onChange={(e) => setPriceInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={() => {
                      const price = parseFloat(priceInput);
                      if (price > 0) {
                        updateOrderPrice(selectedOrder.id, price);
                        setPriceInput('');
                      } else {
                        toast.error('Please enter a valid price');
                      }
                    }}
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    Set Price
                  </Button>
                </div>
              </div>

              {/* Status Update Section */}
              <div className="space-y-2">
                <Label>Update Status</Label>
                <Select onValueChange={(value) => updateOrderStatus(selectedOrder.id, value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Payment Status Update Section */}
              <div className="space-y-2">
                <Label>Update Payment Status</Label>
                <Select onValueChange={(value) => {
                  fetch(`/api/orders/${selectedOrder.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ paymentStatus: value }),
                  }).then(res => {
                    if (res.ok) {
                      toast.success('Payment status updated');
                      loadDashboardData();
                      setShowOrderDialog(false);
                    }
                  });
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending_quote">Awaiting Quote</SelectItem>
                    <SelectItem value="pending_payment">Payment Due</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Inquiry Detail Dialog */}
      <Dialog open={showInquiryDialog} onOpenChange={setShowInquiryDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
            <DialogDescription>
              From: {selectedInquiry?.email}
            </DialogDescription>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-4">
              <div>
                <Label className="text-muted-foreground">Name</Label>
                <p className="font-medium">{selectedInquiry.name}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Subject</Label>
                <p className="font-medium">{selectedInquiry.subject}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Message</Label>
                <p className="mt-1 p-3 bg-muted rounded-md text-sm">{selectedInquiry.message}</p>
              </div>
              <div className="space-y-2">
                <Label>Update Status</Label>
                <Select onValueChange={(value) => updateInquiryStatus(selectedInquiry.id, value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="read">Read</SelectItem>
                    <SelectItem value="replied">Replied</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Blog Dialog */}
      <Dialog open={showBlogDialog} onOpenChange={setShowBlogDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Blog Post</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new blog post
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={createBlog} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="blog-title">Title *</Label>
              <Input
                id="blog-title"
                value={blogForm.title}
                onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                placeholder="How to paraphrase effectively without Plagiarism"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="blog-excerpt">Excerpt (short description)</Label>
              <Input
                id="blog-excerpt"
                value={blogForm.excerpt}
                onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                placeholder="Brief summary of the blog post..."
                maxLength={300}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="blog-content">Content (HTML supported) *</Label>
              <p className="text-xs text-muted-foreground mb-1">
                Paste only the article content (inside &lt;article&gt; tag). Navigation, header, and footer will be removed automatically.
              </p>
              <textarea
                id="blog-content"
                className="w-full min-h-[300px] p-3 rounded-md border border-input bg-background text-sm"
                value={blogForm.content}
                onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                placeholder="<p>Your blog content here...</p>"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="blog-image">Featured Image URL</Label>
                <Input
                  id="blog-image"
                  value={blogForm.featuredImage}
                  onChange={(e) => setBlogForm({ ...blogForm, featuredImage: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="blog-category">Category</Label>
                <Input
                  id="blog-category"
                  value={blogForm.category}
                  onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                  placeholder="AI Ethics, Writing Tips, etc."
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="blog-tags">Tags (comma-separated)</Label>
              <Input
                id="blog-tags"
                value={blogForm.tags}
                onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                placeholder="AI, writing, academic, plagiarism"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="blog-published"
                checked={blogForm.isPublished}
                onChange={(e) => setBlogForm({ ...blogForm, isPublished: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300"
              />
              <Label htmlFor="blog-published" className="cursor-pointer">
                Publish immediately
              </Label>
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowBlogDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={creatingBlog}>
                {creatingBlog ? 'Creating...' : 'Create Blog'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Create Sample Dialog */}
      <Dialog open={showSampleDialog} onOpenChange={setShowSampleDialog}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Sample</DialogTitle>
            <DialogDescription>
              Upload a sample paper with details
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={createSample} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sample-title">Title *</Label>
              <Input
                id="sample-title"
                value={sampleForm.title}
                onChange={(e) => setSampleForm({ ...sampleForm, title: e.target.value })}
                placeholder="Sample Research Paper on Machine Learning"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sample-description">Description</Label>
              <textarea
                id="sample-description"
                className="w-full min-h-[80px] p-3 rounded-md border border-input bg-background text-sm"
                value={sampleForm.description}
                onChange={(e) => setSampleForm({ ...sampleForm, description: e.target.value })}
                placeholder="Brief description of the sample paper..."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sample-subject">Subject</Label>
                <Input
                  id="sample-subject"
                  value={sampleForm.subject}
                  onChange={(e) => setSampleForm({ ...sampleForm, subject: e.target.value })}
                  placeholder="Computer Science, Business, etc."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sample-level">Academic Level</Label>
                <Select 
                  value={sampleForm.academicLevel} 
                  onValueChange={(value) => setSampleForm({ ...sampleForm, academicLevel: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high_school">High School</SelectItem>
                    <SelectItem value="bachelor">Bachelor</SelectItem>
                    <SelectItem value="master">Master</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sample-type">Paper Type</Label>
                <Select 
                  value={sampleForm.paperType} 
                  onValueChange={(value) => setSampleForm({ ...sampleForm, paperType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="essay">Essay</SelectItem>
                    <SelectItem value="research_paper">Research Paper</SelectItem>
                    <SelectItem value="dissertation">Dissertation</SelectItem>
                    <SelectItem value="thesis">Thesis</SelectItem>
                    <SelectItem value="coursework">Coursework</SelectItem>
                    <SelectItem value="case_study">Case Study</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sample-pages">Number of Pages</Label>
                <Input
                  id="sample-pages"
                  type="number"
                  min="1"
                  value={sampleForm.pages}
                  onChange={(e) => setSampleForm({ ...sampleForm, pages: parseInt(e.target.value) || 1 })}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sample-file">Upload PDF File *</Label>
              <Input
                id="sample-file"
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                disabled={uploadingFile}
                className="flex-1"
              />
              {selectedFile && (
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <FileText className="h-4 w-4" />
                  Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Max file size: 10MB. Only PDF files are accepted. File will be stored in the database.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="sample-published"
                checked={sampleForm.isPublished}
                onChange={(e) => setSampleForm({ ...sampleForm, isPublished: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300"
              />
              <Label htmlFor="sample-published" className="cursor-pointer">
                Publish immediately
              </Label>
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowSampleDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={creatingSample || uploadingFile}>
                {creatingSample ? 'Creating...' : 'Create Sample'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
