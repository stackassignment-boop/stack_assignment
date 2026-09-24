'use client';

import { useState, useEffect } from 'react';
import { StructuredData } from '@/components/seo/StructuredData';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string | null;
  category: string | null;
  createdAt: string;
  viewCount: number;
  author: {
    name: string | null;
  };
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs?limit=20');
        if (res.ok) { const data = await res.json(); setBlogs(data.blogs || []); }
      } catch (error) { console.error('Failed to fetch blogs:', error); }
      finally { setLoading(false); }
    };
    fetchBlogs();
  }, []);

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-AU', { month: 'short', day: 'numeric', year: 'numeric' });
  const gradients = ['from-indigo-700 via-indigo-600 to-indigo-500', 'from-purple-700 via-purple-600 to-purple-500', 'from-indigo-700 via-purple-600 to-indigo-500', 'from-indigo-700 via-indigo-600 to-purple-500'];
  const categories = ['All', ...Array.from(new Set(blogs.map(b => b.category).filter(Boolean) as string[]))];
  const filtered = category === 'All' ? blogs : blogs.filter(b => b.category === category);

  if (loading) return <main className="stack-page flex-grow"><div className="stack-container py-20"><div className="stack-skeleton-grid">{[1,2,3,4,5,6].map(i => <div key={i} className="stack-skeleton-card" />)}</div></div></main>;

  return <>
    <StructuredData data={{ '@context': 'https://schema.org', '@type': 'Blog', name: 'Stack Assignment Blog', description: 'Academic writing tips, guides, referencing help and study strategies for Australian and UK students.', url: 'https://www.stackassignment.com/blog', publisher: { '@type': 'Organization', name: 'Stack Assignment', url: 'https://www.stackassignment.com' }, blogPost: blogs.map(blog => ({ '@type': 'BlogPosting', headline: blog.title, url: `https://www.stackassignment.com/blog/${blog.slug}`, datePublished: blog.createdAt })) }} />
    <main className="stack-page flex-grow overflow-hidden">
      <section className="stack-hero stack-blog-hero"><div className="stack-container py-16 md:py-20 relative z-10"><div className="max-w-4xl"><div className="stack-eyebrow"><Sparkles className="h-4 w-4" /> Student knowledge hub</div><h1 className="stack-hero-title">Ideas, guides & <span>study strategies</span></h1><p className="stack-hero-copy">Practical articles for Australian and UK university students — from referencing and assessment briefs to research planning and exam preparation.</p><div className="flex flex-wrap gap-3 mt-7"><span className="stack-pill-dark">AU study guides</span><span className="stack-pill-dark">UK university tips</span><span className="stack-pill-dark">Referencing help</span></div></div></div></section>
      <section className="stack-container -mt-7 relative z-20 pb-20"><div className="stack-blog-toolbar"><div><p className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">LATEST ARTICLES</p><h2 className="text-2xl font-bold mt-1">Learn something useful</h2></div><div className="flex gap-2 flex-wrap">{categories.map(c => <button key={c} onClick={() => setCategory(c)} className={`stack-filter ${category === c ? 'is-active' : ''}`}>{c}</button>)}</div></div>
      {filtered.length === 0 ? <div className="stack-empty"><div className="text-5xl mb-4">✦</div><h2>No articles yet</h2><p>Check back soon for new student guides.</p></div> : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">{filtered.map((blog, index) => <Link key={blog.id} href={`/blog/${blog.slug}`} className="group"><article className="stack-blog-card h-full"><div className={`stack-blog-cover bg-gradient-to-br ${gradients[index % gradients.length]}`} style={blog.featuredImage ? { backgroundImage: `linear-gradient(135deg, rgba(15,23,42,.18), rgba(79,70,229,.22)), url(${blog.featuredImage})` } : undefined}><span>{blog.category || 'Student guide'}</span><div className="absolute bottom-5 left-5 right-5 text-white"><p className="text-xs uppercase tracking-wider font-bold opacity-80">{formatDate(blog.createdAt)}</p><h3 className="text-xl font-bold mt-1 line-clamp-2">{blog.title}</h3></div></div><div className="p-6"><p className="text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">{blog.excerpt || 'Practical advice and guidance for your university study.'}</p><div className="mt-5 flex items-center justify-between text-sm font-bold text-indigo-600"><span>Read article</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></div></div></article></Link>)}</div>}
      <div className="stack-soft-banner mt-12"><div><p className="text-sm font-bold text-indigo-700">Looking for a specific topic?</p><h2 className="text-2xl font-bold mt-1">Browse our guides or explore free study tools.</h2></div><div className="flex gap-3 flex-wrap"><Link href="/guides" className="stack-secondary-button">Browse guides</Link><Link href="/tools" className="stack-primary-button">Free tools <ArrowRight className="h-4 w-4" /></Link></div></div>
      </section>
    </main>
  </>;
}
