'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Loader2, Upload, X } from 'lucide-react';

interface OrderPageProps {
  onNavigate?: (page: string) => void;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploading: boolean;
  error?: string;
}

export default function OrderPage({ onNavigate }: OrderPageProps) {
  const [service, setService] = useState('writing');
  const [pages, setPages] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [expertCount, setExpertCount] = useState(178);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [error, setError] = useState('');
  const [loadingUser, setLoadingUser] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    subject: '',
    deadlineDate: '',
    deadlineTime: '12:00',
    timezone: '+91',
    description: '',
    coupon: '',
    terms: false
  });

  // Fetch user session on mount
  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const res = await fetch('/api/auth/session');
        if (res.ok) {
          const data = await res.json();
          if (data?.user?.email) {
            setFormData(prev => ({ ...prev, email: data.user.email }));
            setIsSignedIn(true);
            const profileRes = await fetch('/api/student/profile');
            if (profileRes.ok) {
              const profileData = await profileRes.json();
              if (profileData.profile?.phone) {
                setFormData(prev => ({
                  ...prev,
                  phone: profileData.profile.phone.replace(/^\+91/, '')
                }));
              }
            }
          }
        }
      } catch (err) {
        console.error('Error fetching session:', err);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUserSession();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('=== handleFileChange called ===');
    
    if (!e.target.files) {
      console.log('No files in input');
      return;
    }
    
    const newFiles = Array.from(e.target.files);
    console.log('Files selected:', newFiles.length);
    
    // Clear the input so same file can be selected again
    e.target.value = '';
    
    for (const file of newFiles) {
      console.log('Processing file:', file.name, file.size, 'bytes');
      
      // Validate file size
      if (file.size > 10 * 1024 * 1024) {
        setError(`File "${file.name}" exceeds 10MB limit.`);
        continue;
      }
      
      // Generate unique ID for this file
      const fileId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Add file with uploading status
      setUploadedFiles(prev => [...prev, {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        url: '',
        uploading: true,
      }]);
      
      console.log('Starting upload for:', file.name);
      
      try {
        // Upload file to blob storage
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);
        
        console.log('Calling /api/upload...');
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });
        
        console.log('Upload response status:', uploadRes.status);
        
        const uploadData = await uploadRes.json();
        console.log('Upload response:', uploadData);
        
        if (uploadRes.ok && uploadData.url) {
          console.log('Upload successful! URL:', uploadData.url);
          setUploadedFiles(prev => prev.map(f => 
            f.id === fileId
              ? { ...f, url: uploadData.url, uploading: false }
              : f
          ));
        } else {
          console.error('Upload failed:', uploadData.error);
          setUploadedFiles(prev => prev.map(f => 
            f.id === fileId
              ? { ...f, uploading: false, error: uploadData.error || 'Upload failed' }
              : f
          ));
        }
      } catch (err) {
        console.error('Upload error:', err);
        setUploadedFiles(prev => prev.map(f => 
          f.id === fileId
            ? { ...f, uploading: false, error: 'Upload failed' }
            : f
        ));
      }
    }
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    console.log('=== handleSubmit called ===');
    console.log('Uploaded files:', uploadedFiles);
    
    // Check if any files are still uploading
    if (uploadedFiles.some(f => f.uploading)) {
      setError('Please wait for files to finish uploading.');
      return;
    }
    
    setSubmitting(true);

    try {
      // Prepare attachments - only successfully uploaded files
      const attachments = uploadedFiles
        .filter(f => f.url && !f.error)
        .map(f => ({
          name: f.name,
          type: f.type,
          size: f.size,
          url: f.url,
        }));
      
      console.log('Submitting order with', attachments.length, 'attachments');
      
      const requestBody = {
        email: formData.email,
        phone: `${formData.timezone}${formData.phone}`,
        subject: formData.subject,
        description: formData.description,
        deadline: formData.deadlineDate,
        deadlineTime: formData.deadlineTime,
        pages: pages,
        service: service,
        coupon: formData.coupon || null,
        attachments: attachments,
      };
      
      console.log('Request body:', requestBody);
      
      const response = await fetch('/api/orders/public', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log('Response:', response.status, data);
      
      if (response.ok && data.success) {
        setOrderNumber(data.order.orderNumber);
        setSubmitted(true);
      } else {
        setError(data.error || 'Failed to submit order. Please try again.');
      }
    } catch (err) {
      console.error('Order submission error:', err);
      setError('An error occurred. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const wordCount = pages * 250;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900 py-10 md:py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Order Submitted Successfully!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Thank you for your order. We will contact you shortly via email and phone.
            </p>
            <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Your Order Number</p>
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{orderNumber}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => onNavigate?.('home')} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8">
                Back to Home
              </Button>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    email: '', phone: '', subject: '', deadlineDate: '',
                    deadlineTime: '12:00', timezone: '+91', description: '',
                    coupon: '', terms: false
                  });
                  setPages(1);
                  setUploadedFiles([]);
                }}
                variant="outline"
                className="px-8"
              >
                Place Another Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900 py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Get Instant Help From 450+ Experts
          </h1>
          
          <div className="mt-5 mx-auto max-w-2xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-2 border-green-400 dark:border-green-600 rounded-xl px-5 py-3.5 shadow-md">
            <p className="text-sm md:text-base font-bold text-gray-800 dark:text-gray-200 flex items-center justify-center gap-2 flex-wrap">
              🎁 <span>For New Customers Use Coupon Code</span>
              <code className="bg-green-600 text-white px-3 py-1 rounded-md font-mono text-sm">NewtoStack33</code>
              <span>to get 33% discount.</span>
            </p>
          </div>
          
          <div className="flex justify-center gap-0 mt-6 max-w-xl mx-auto bg-white dark:bg-slate-800 rounded-xl p-1.5 shadow-lg border border-gray-200 dark:border-slate-700">
            {['writing', 'rewriting', 'editing'].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setService(s)}
                className={`flex-1 py-3 px-6 rounded-lg font-bold text-sm transition-all capitalize ${
                  service === s
                    ? 'bg-indigo-600 text-white shadow-lg -translate-y-0.5'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="max-w-6xl mx-auto mb-6">
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl text-center">
              {error}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Left Column */}
          <div className="space-y-5">
            <Card className="shadow-md border-gray-200 dark:border-slate-700">
              <CardContent className="p-5 md:p-6">
                <Label className="block text-sm font-bold mb-2.5">E-mail <span className="text-red-500">*</span></Label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={loadingUser ? "Loading..." : "Enter email for communication"}
                  disabled={loadingUser}
                  readOnly={isSignedIn}
                  className={isSignedIn ? "bg-gray-100 dark:bg-slate-700 cursor-not-allowed" : ""}
                />
              </CardContent>
            </Card>

            <Card className="shadow-md border-gray-200 dark:border-slate-700">
              <CardContent className="p-5 md:p-6">
                <Label className="block text-sm font-bold mb-2.5">Phone Number <span className="text-red-500">*</span></Label>
                <div className="flex gap-2">
                  <select 
                    className="px-3 py-3 rounded-lg border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-700 w-28"
                    value={formData.timezone}
                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+64">🇳🇿 +64</option>
                  </select>
                  <Input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="flex-1"
                    placeholder="Phone Number"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-gray-200 dark:border-slate-700">
              <CardContent className="p-5 md:p-6">
                <Label className="block text-sm font-bold mb-2.5">Subject/CourseCode <span className="text-red-500">*</span></Label>
                <Input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Eg. UNCC100 Self & Community"
                />
              </CardContent>
            </Card>

            <Card className="shadow-md border-gray-200 dark:border-slate-700">
              <CardContent className="p-5 md:p-6">
                <Label className="block text-sm font-bold mb-2.5">Deadline <span className="text-red-500">*</span></Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Input
                    type="date"
                    required
                    value={formData.deadlineDate}
                    onChange={(e) => setFormData({ ...formData, deadlineDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  <select 
                    className="px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-700"
                    value={formData.deadlineTime}
                    onChange={(e) => setFormData({ ...formData, deadlineTime: e.target.value })}
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                        {i === 0 ? '12:00 AM' : i < 12 ? `${i}:00 AM` : i === 12 ? '12:00 PM' : `${i - 12}:00 PM`}
                      </option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-gray-200 dark:border-slate-700">
              <CardContent className="p-5 md:p-6">
                <Label className="block text-sm font-bold mb-2.5">
                  No. of pages <span className="text-xs font-normal text-gray-500">(1 page = 250 words)</span>
                </Label>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setPages(Math.max(1, pages - 1))} className="w-12 h-12 bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-500 rounded-lg font-bold text-xl flex items-center justify-center transition active:scale-95">−</button>
                  <Input type="number" value={pages} readOnly className="w-20 text-center text-xl font-bold" />
                  <button type="button" onClick={() => setPages(pages + 1)} className="w-12 h-12 bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-500 rounded-lg font-bold text-xl flex items-center justify-center transition active:scale-95">+</button>
                  <span className="ml-2 text-gray-600 dark:text-gray-400 font-semibold">{wordCount.toLocaleString()} Words</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            <Card className="shadow-md border-gray-200 dark:border-slate-700">
              <CardContent className="p-5 md:p-6">
                <Label className="block text-sm font-bold mb-2.5">Assignment Description <span className="text-red-500">*</span></Label>
                <textarea
                  required
                  rows={8}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-lg border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Describe your assignment: topic, requirements, formatting style, references needed..."
                />

                {/* File Upload */}
                <div className="mt-4">
                  <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-sm cursor-pointer transition">
                    <Upload className="w-4 h-4" />
                    Add Files
                    <input 
                      type="file" 
                      multiple 
                      className="hidden" 
                      onChange={handleFileChange} 
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.txt,.zip" 
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-2">Max 10MB per file</p>
                  
                  {uploadedFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-sm font-medium">
                        {uploadedFiles.filter(f => f.url).length} of {uploadedFiles.length} file(s) uploaded
                      </p>
                      <div className="space-y-1 max-h-48 overflow-y-auto">
                        {uploadedFiles.map((file) => (
                          <div key={file.id} className="flex items-center justify-between bg-gray-50 dark:bg-slate-700 rounded-lg px-3 py-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-sm">
                                {file.uploading ? '⏳' : file.error ? '❌' : '✅'}
                              </span>
                              <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[200px]">{file.name}</span>
                              <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                            </div>
                            <button type="button" onClick={() => removeFile(file.id)} className="text-red-500 hover:text-red-700 p-1">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <Label className="block text-sm font-semibold mb-2">Coupon Code</Label>
                  <Input
                    type="text"
                    value={formData.coupon}
                    onChange={(e) => setFormData({ ...formData, coupon: e.target.value })}
                    placeholder="e.g., NewtoStack33"
                  />
                </div>

                <div className="mt-5 flex items-center gap-2 text-sm">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="font-bold text-green-600">{expertCount}</span>
                  <span className="text-gray-600">experts available now!</span>
                </div>

                <label className="mt-5 flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" required checked={formData.terms} onChange={(e) => setFormData({ ...formData, terms: e.target.checked })} className="mt-1 w-5 h-5 rounded border-gray-300 text-indigo-600 cursor-pointer" />
                  <span className="text-sm text-gray-600">I accept the <span className="text-indigo-600 font-medium">T&C</span> and agree to receive offers.</span>
                </label>

                <Button
                  type="submit"
                  disabled={submitting || uploadedFiles.some(f => f.uploading)}
                  className="mt-6 w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold py-6 rounded-xl text-lg shadow-lg disabled:opacity-50"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" />Submitting...</span>
                  ) : uploadedFiles.some(f => f.uploading) ? (
                    <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" />Uploading files...</span>
                  ) : 'Submit Order'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}
