'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Loader2, Upload, X } from 'lucide-react';

interface OrderPageProps {
  onNavigate?: (page: string, params?: Record<string, string>) => void;
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

/**
 * Country codes offered by the phone-number select below. Ordered longest-first
 * so that e.g. "+61" is preferred over "+6" when matching a prefix.
 */
const DIAL_CODES = ['+61', '+64', '+44', '+91', '+1'];

/**
 * Splits a phone number into a dial code and a national number.
 *
 * The order form keeps the country code in a separate select and prepends it on
 * submit, so a value that already carries its own code has to be split — or
 * submission doubles the prefix ("+91" + "+91 98765 43210").
 *
 * The returned `dialCode` tells the caller what to do with the select:
 *   - a listed code  -> set the select to it
 *   - `''`           -> an international number we don't list; the full number
 *                       (including "+") is kept, so the select must be cleared
 *                       to avoid stamping the wrong country onto it
 *   - `null`         -> no code present at all; leave the select as it is
 */
function splitPhone(raw: string): { dialCode: string | null; nationalNumber: string } {
  const trimmed = raw.trim();

  for (const code of DIAL_CODES) {
    if (trimmed.startsWith(code)) {
      return { dialCode: code, nationalNumber: trimmed.slice(code.length).trim() };
    }
  }

  if (trimmed.startsWith('+')) {
    // Keep the "+" and the country digits together and blank the select, so the
    // number submits exactly as the customer wrote it rather than being
    // silently re-badged with the default country code.
    return { dialCode: '', nationalNumber: trimmed };
  }

  return { dialCode: null, nationalNumber: trimmed };
}

// The four services offered, in tab order. Single source of truth: the tab
// strip renders from this, and the `?service=` URL parameter is validated
// against it, so the two can never drift apart.
const ORDER_SERVICES = [
  { key: 'editing', label: 'Editing' },
  { key: 'tutoring', label: 'Tutoring' },
  { key: 'samples', label: 'Worked Examples' },
  { key: 'examprep', label: 'Exam Prep' },
] as const;

const ORDER_SERVICE_KEYS: readonly string[] = ORDER_SERVICES.map((s) => s.key);

export default function OrderPage({ onNavigate }: OrderPageProps) {
  // Default was 'writing' — commissioning a finished document from scratch,
  // which is the ghostwriting model this site no longer offers. 'editing'
  // matches what the homepage, FAQ, and pricing calculator now describe as
  // the primary service: work on the student's own draft.
  const [service, setService] = useState('editing');
  // Whether the visitor actually picked this service, as opposed to landing
  // on the default. Editing requires a draft upload, so enforcing that on
  // someone who never chose editing turns every inbound quote link into a
  // dead end — see the guard in handleSubmit.
  const [serviceExplicit, setServiceExplicit] = useState(false);
  const [pages, setPages] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
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
    // Defaults to Australia. This form previously opened on '+91', so every
    // Australian student had to notice the mismatch and change it before their
    // own number would submit correctly. A stored or URL-supplied number still
    // wins over this default — splitPhone() reads its real country code.
    timezone: '+61',
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
                // Split rather than stripping a hard-coded "+91": a stored
                // number for any other country would otherwise keep its own
                // code and submit doubled (e.g. "+91" + "+61412345678").
                // This also has to set `timezone`, because a URL-supplied
                // country code may already have changed the select.
                const { dialCode, nationalNumber } = splitPhone(profileData.profile.phone);
                setFormData(prev => {
                  // This fetch resolves *after* the synchronous URL-prefill
                  // effect below has run, so an unconditional write would
                  // silently replace the number the visitor just typed into the
                  // pricing quote modal with their older stored one. Only fill
                  // a phone field that is still empty. (Email is different: it
                  // is readOnly for signed-in users, so the account address is
                  // meant to win.)
                  if (prev.phone) return prev;
                  return {
                    ...prev,
                    phone: nationalNumber,
                    ...(dialCode !== null ? { timezone: dialCode } : {}),
                  };
                });
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

    // Check for pre-filled data from URL parameters
    //
    // react-hooks/set-state-in-effect is switched off for this block, and it is
    // the only place in the codebase where that is done. The rule is right in
    // general — a synchronous setState in an effect forces a second render pass
    // — but the alternatives are all worse here:
    //
    //   * Reading the query string in a useState initialiser makes the first
    //     client render differ from the prerendered HTML, i.e. a hydration
    //     mismatch on the page that every paid enquiry passes through.
    //   * Deriving the values during render is not possible: these seed fields
    //     the visitor then edits, so they have to become state.
    //   * Taking them from the server component's searchParams instead would
    //     opt /order out of static rendering entirely.
    //
    // The cost is bounded: it runs once on mount with [] deps, and React
    // batches every write below into a single additional render. Inbound quote
    // links (/order?service=…&subject=…&phone=…) depend on it, so it is
    // deliberately left as is rather than restructured.
    /* eslint-disable react-hooks/set-state-in-effect */
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const subject = urlParams.get('subject');
      const description = urlParams.get('description');
      const email = urlParams.get('email');
      const phone = urlParams.get('phone');
      const incomingService = urlParams.get('service');

      // A CTA can name the service it means, e.g. /order?service=samples.
      // Validated against the tab list so a stale or hand-edited link can
      // never select a service the form cannot render.
      if (incomingService && ORDER_SERVICE_KEYS.includes(incomingService)) {
        setService(incomingService);
        setServiceExplicit(true);
      }

      if (subject) {
        setFormData(prev => ({ ...prev, subject }));
      }
      if (description) {
        setFormData(prev => ({ ...prev, description }));
      }
      if (email) {
        // Applied unconditionally, but the session fetch above resolves later
        // and overwrites this for signed-in users — so an account email always
        // wins over one typed into the pricing quote form.
        setFormData(prev => ({ ...prev, email }));
      }
      if (phone) {
        // The phone input holds the national number only; the country code
        // lives in the `timezone` select and is prepended on submit. An
        // incoming value like "+91 98765 43210" must therefore be split, or
        // submission would produce "+91+91 98765 43210".
        const { dialCode, nationalNumber } = splitPhone(phone);
        setFormData(prev => ({
          ...prev,
          phone: nationalNumber,
          ...(dialCode !== null ? { timezone: dialCode } : {}),
        }));
      }
    }
    /* eslint-enable react-hooks/set-state-in-effect */
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

    // Editing works on the student's own document, so a draft is the point
    // of the service, not an optional attachment — the file input's
    // `required` attribute doesn't reliably block submission while hidden,
    // so this is the real guard.
    // Only when the visitor actually chose Editing, via the tab strip or an
    // explicit `?service=editing` link. Editing is also the default, and
    // inbound CTAs (services, samples, the Kaplan page) carry only `subject`,
    // so enforcing this on the default turned every one of those links into a
    // dead end: the student was asked for a draft they had not written yet,
    // and left. Capture the lead, ask for the draft in the follow-up.
    if (
      service === 'editing' &&
      serviceExplicit &&
      uploadedFiles.filter(f => f.url && !f.error).length === 0
    ) {
      setError('Please upload the draft you\u2019d like us to edit.');
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900 py-10 md:py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Order Submitted Successfully!
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Thank you for your order. We will contact you shortly via email and phone.
            </p>
            <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4 mb-6">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Your Order Number</p>
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
                    deadlineTime: '12:00', timezone: '+61', description: '',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900 py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Book Tutoring or Editing With an Expert
          </h1>
          
          <div className="mt-5 mx-auto max-w-2xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-2 border-green-400 dark:border-green-600 rounded-xl px-5 py-3.5 shadow-md">
            <p className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-2 flex-wrap">
              🎁 <span>For New Customers Use Coupon Code</span>
              <code className="bg-green-600 text-white px-3 py-1 rounded-md font-mono text-sm">NewtoStack33</code>
              <span>to get 33% discount.</span>
            </p>
          </div>
          
          {/*
            Was ['writing', 'rewriting', 'editing'] — "writing" a document
            from scratch is the exact service this site has moved away from
            everywhere else (Hero, FAQ, Pricing). These four now match the
            four services in PricingPage.tsx.
          */}
          <div className="flex flex-wrap justify-center gap-0 mt-6 max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-xl p-1.5 shadow-lg border border-slate-200 dark:border-slate-700">
            {ORDER_SERVICES.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => { setService(key); setServiceExplicit(true); }}
                className={`flex-1 min-w-[7rem] py-3 px-4 rounded-lg font-bold text-sm transition-all ${
                  service === key
                    ? 'bg-indigo-600 text-white shadow-lg -translate-y-0.5'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {label}
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
            <Card className="shadow-md border-slate-200 dark:border-slate-700">
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
                  className={isSignedIn ? "bg-slate-100 dark:bg-slate-700 cursor-not-allowed" : ""}
                />
              </CardContent>
            </Card>

            <Card className="shadow-md border-slate-200 dark:border-slate-700">
              <CardContent className="p-5 md:p-6">
                <Label className="block text-sm font-bold mb-2.5">Phone Number <span className="text-red-500">*</span></Label>
                <div className="flex gap-2">
                  <select 
                    className="px-3 py-3 rounded-lg border-2 border-slate-300 dark:border-slate-600 dark:bg-slate-700 w-28"
                    value={formData.timezone}
                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  >
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+64">🇳🇿 +64</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+91">🇮🇳 +91</option>
                    {/* Selected when a number already carries an unlisted
                        country code; the code then stays in the field itself. */}
                    <option value="">🌐 Other</option>
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

            <Card className="shadow-md border-slate-200 dark:border-slate-700">
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

            <Card className="shadow-md border-slate-200 dark:border-slate-700">
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
                    className="px-4 py-3 rounded-lg border-2 border-slate-300 dark:border-slate-600 dark:bg-slate-700"
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

            <Card className="shadow-md border-slate-200 dark:border-slate-700">
              <CardContent className="p-5 md:p-6">
                {/*
                  Label and unit now match the service selected, same mapping
                  as PricingPage.tsx, rather than always saying "pages" —
                  tutoring and exam prep aren't priced or measured in pages.
                */}
                <Label className="block text-sm font-bold mb-2.5">
                  {service === 'tutoring' && 'No. of hours'}
                  {service === 'examprep' && 'No. of sessions'}
                  {(service === 'editing' || service === 'samples') && (
                    <>No. of pages <span className="text-xs font-normal text-slate-500">(1 page = 250 words)</span></>
                  )}
                </Label>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setPages(Math.max(1, pages - 1))} className="w-12 h-12 bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 rounded-lg font-bold text-xl flex items-center justify-center transition active:scale-95">−</button>
                  <Input type="number" value={pages} readOnly className="w-20 text-center text-xl font-bold" />
                  <button type="button" onClick={() => setPages(pages + 1)} className="w-12 h-12 bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 rounded-lg font-bold text-xl flex items-center justify-center transition active:scale-95">+</button>
                  {(service === 'editing' || service === 'samples') && (
                    <span className="ml-2 text-slate-600 dark:text-slate-400 font-semibold">{wordCount.toLocaleString()} Words</span>
                  )}
                </div>
                {service === 'editing' && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                    Enter the length of the draft you're uploading below — this is editing on your own work, not a new document written from scratch.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            <Card className="shadow-md border-slate-200 dark:border-slate-700">
              <CardContent className="p-5 md:p-6">
                {/*
                  Label, placeholder, and upload copy now vary by service.
                  Previously this always said "Describe your assignment:
                  topic, requirements..." and "Add Files" — wording written
                  for commissioning a document from a brief, not for a
                  student handing over their own work to be edited or
                  discussed. Editing in particular should make clear the
                  file being attached is the student's draft, not a brief.
                */}
                <Label className="block text-sm font-bold mb-2.5">
                  {service === 'editing' && <>What would you like feedback on? <span className="text-red-500">*</span></>}
                  {service === 'tutoring' && <>What do you need help with? <span className="text-red-500">*</span></>}
                  {service === 'samples' && <>What topic or question is this for? <span className="text-red-500">*</span></>}
                  {service === 'examprep' && <>What's the exam or viva on? <span className="text-red-500">*</span></>}
                </Label>
                <textarea
                  required
                  rows={8}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-lg border-2 border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder={
                    service === 'editing'
                      ? 'Tell us about your draft: subject, referencing style, any specific concerns (structure, argument, grammar)...'
                      : service === 'tutoring'
                      ? 'Tell us the concept, module, or assignment brief you\u2019d like to work through together...'
                      : service === 'samples'
                      ? 'Tell us the topic, subject, and referencing style for the reference material you need...'
                      : 'Tell us the subject, format (written exam, viva, practical), and what you\u2019d like to focus on...'
                  }
                />

                {/* File Upload */}
                <div className="mt-4">
                  <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-sm cursor-pointer transition">
                    <Upload className="w-4 h-4" />
                    {service === 'editing' ? 'Upload Your Draft' : 'Add Files'}
                    <input 
                      type="file" 
                      multiple 
                      required={service === 'editing' && serviceExplicit}
                      className="hidden" 
                      onChange={handleFileChange} 
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.txt,.zip" 
                    />
                  </label>
                  <p className="text-xs text-slate-500 mt-2">
                    {service === 'editing'
                      ? 'Upload the document you\u2019ve written so far \u2014 we edit and give feedback on your own work. Max 10MB per file.'
                      : 'Max 10MB per file'}
                  </p>
                  
                  {uploadedFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-sm font-medium">
                        {uploadedFiles.filter(f => f.url).length} of {uploadedFiles.length} file(s) uploaded
                      </p>
                      <div className="space-y-1 max-h-48 overflow-y-auto">
                        {uploadedFiles.map((file) => (
                          <div key={file.id} className="flex items-center justify-between bg-slate-50 dark:bg-slate-700 rounded-lg px-3 py-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-sm">
                                {file.uploading ? '⏳' : file.error ? '❌' : '✅'}
                              </span>
                              <span className="text-sm text-slate-700 dark:text-slate-300 truncate max-w-[200px]">{file.name}</span>
                              <span className="text-xs text-slate-500">({(file.size / 1024).toFixed(1)} KB)</span>
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

                {/*
                  Removed: an animated green "live" pulse next to the text
                  "178 experts available now!".

                  The 178 was `useState(178)` and `setExpertCount` was never
                  called anywhere, so it was a hardcoded constant presented as a
                  real-time availability count — and it sat directly above the
                  submit button, at the exact point of conversion. A specific
                  figure published to prospective customers is a representation
                  under the Australian Consumer Law (Competition and Consumer
                  Act 2010 Sch 2 ss 18, 29); presenting a fixed number as live
                  data is the kind that is misleading rather than mere puffery,
                  because its persuasive force comes entirely from the claim
                  that it is current.

                  Nothing replaces it. A truthful "we will match you with a
                  tutor in your discipline" reassurance already appears above.
                */}

                <label className="mt-5 flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" required checked={formData.terms} onChange={(e) => setFormData({ ...formData, terms: e.target.checked })} className="mt-1 w-5 h-5 rounded border-slate-300 text-indigo-600 cursor-pointer" />
                  {/*
                    Was "I accept the T&C and agree to receive offers." Consent
                    to receive marketing cannot validly be bundled into a
                    mandatory checkbox whose real purpose is accepting the
                    terms — under the Spam Act 2003 (Cth) consent for commercial
                    electronic messages has to be given for that purpose, and a
                    required tick-to-proceed box is not that. `formData.terms`
                    is also never sent to the API, so the "consent" was not
                    being recorded anywhere in the first place.

                    The checkbox now covers only what it can legitimately
                    cover, and links to the two policies so the student can
                    actually read what they are accepting.

                    ⚠ FOR THE OWNER: if you want to email offers to enquirers,
                    add a separate, optional, unticked opt-in and store the
                    result against the order — that is what makes the consent
                    real and defensible.
                  */}
                  <span className="text-sm text-slate-600">
                    I accept the{' '}
                    <Link href="/terms" className="text-indigo-600 font-medium hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-indigo-600 font-medium hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>

                <Button
                  type="submit"
                  disabled={submitting || uploadedFiles.some(f => f.uploading)}
                  className="mt-6 w-full bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-extrabold py-6 rounded-xl text-lg shadow-lg disabled:opacity-50"
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
