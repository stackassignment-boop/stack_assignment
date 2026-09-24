'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface BlogDetailPageProps {
  slug: string;
  onNavigate?: (page: string) => void;
}

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featuredImage: string | null;
  category: string | null;
  tags: string | null;
  createdAt: string;
  viewCount: number;
  author: {
    name: string | null;
  };
}

export default function BlogDetailPage({ slug, onNavigate }: BlogDetailPageProps) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<any>(null);

  // Declared inside the effect that calls it — see the note in BlogPage.tsx.
  // The `slug` dependency is what re-runs it, so nothing else needs a handle on
  // it. `stale` guards against a slug change landing out of order: without it a
  // slow response for the previous slug could overwrite the newer post.
  useEffect(() => {
    let stale = false;

    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${slug}`);
        const data = await res.json();
        if (stale) return;
        setApiResponse(data);

        if (res.ok) {
          if (data.blog) {
            setBlog(data.blog);
          } else {
            setError('No blog data received from API');
          }
        } else {
          setError(data.error || `HTTP ${res.status}: Blog post not found`);
        }
      } catch (err) {
        if (stale) return;
        const errorMsg = err instanceof Error ? err.message : 'Failed to load blog post';
        setError(errorMsg);
        console.error('Failed to fetch blog:', err);
      } finally {
        if (!stale) setLoading(false);
      }
    };

    fetchBlog();

    return () => {
      stale = true;
    };
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleNav = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  // Clean blog content - remove navigation and extra headers
  const cleanContent = (content: string): string => {
    // Remove nav elements
    let cleaned = content.replace(/<nav[\s\S]*?<\/nav>/gi, '');
    // Remove header elements (but not h1-h6)
    cleaned = cleaned.replace(/<header[\s\S]*?<\/header>/gi, '');
    // Remove footer elements
    cleaned = cleaned.replace(/<footer[\s\S]*?<\/footer>/gi, '');
    // Remove any duplicate h1 that might be in the content
    // Keep only the first h1 if it matches the title
    return cleaned;
  };

  if (loading) {
    return (
      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-slate-200 rounded-xl mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 bg-slate-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !blog) {
    return (
      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">Blog Not Found</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            {error || 'The blog post you are looking for does not exist.'}
          </p>
          
          {/* Debug info - only show in development or if error */}
          {error && process.env.NODE_ENV === 'development' && (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-left">
              <p className="text-sm font-semibold text-red-800 dark:text-red-400 mb-2">Debug Info:</p>
              <pre className="text-xs text-red-700 dark:text-red-300 overflow-auto max-h-64">
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            </div>
          )}
          
          {onNavigate ? (
            <Button onClick={() => handleNav('blog')}>
              ← Back to Blog
            </Button>
          ) : (
            <Link href="/blog">
              <Button>
                ← Back to Blog
              </Button>
            </Link>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        {onNavigate ? (
          <Button
            variant="ghost"
            className="mb-6 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            onClick={() => handleNav('blog')}
          >
            ← Back to Blog
          </Button>
        ) : (
          <Link href="/blog" className="mb-6 inline-block">
            <Button
              variant="ghost"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              ← Back to Blog
            </Button>
          </Link>
        )}

        {/* Hero Image */}
        {blog.featuredImage && (
          <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>
        )}

        {/* Category & Date */}
        <div className="flex items-center gap-3 mb-4">
          {blog.category && (
            <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-sm font-medium">
              {blog.category}
            </span>
          )}
          <span className="text-slate-500 dark:text-slate-400 text-sm">
            {formatDate(blog.createdAt)}
          </span>
          <span className="text-slate-400 dark:text-slate-500 text-sm">
            {blog.viewCount} views
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
          {blog.title}
        </h1>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            {blog.excerpt}
          </p>
        )}

        {/* Author - Hidden for admin-created blogs */}
        {/* {blog.author.name && (
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                {blog.author.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-medium">{blog.author.name}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Author</p>
            </div>
          </div>
        )} */}

        {/* Content */}
        <article
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white
            prose-h1:text-3xl prose-h1:mb-4 prose-h1:mt-8
            prose-h2:text-2xl prose-h2:mb-3 prose-h2:mt-6
            prose-h3:text-xl prose-h3:mb-2 prose-h3:mt-4
            prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-slate-900 dark:prose-strong:text-white
            prose-ul:my-4 prose-ol:my-4 prose-li:my-1
            prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:pl-4 prose-blockquote:italic
            prose-img:rounded-xl prose-img:shadow-lg
            prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
            prose-pre:bg-slate-900 prose-pre:rounded-xl prose-pre:overflow-x-auto
            prose-table:border-collapse prose-th:border prose-th:border-slate-300 prose-th:px-4 prose-th:py-2 prose-th:bg-slate-100
            prose-td:border prose-td:border-slate-300 prose-td:px-4 prose-td:py-2
          "
          dangerouslySetInnerHTML={{ __html: cleanContent(blog.content) }}
        />

        {/* Tags */}
        {blog.tags && (
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {JSON.parse(blog.tags).map((tag: string, index: number) => (
                <span
                  key={index}
                  className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Back to Blog */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 text-center">
          {onNavigate ? (
            <Button
              variant="outline"
              onClick={() => handleNav('blog')}
              className="px-8"
            >
              ← Back to All Articles
            </Button>
          ) : (
            <Link href="/blog">
              <Button variant="outline" className="px-8">
                ← Back to All Articles
              </Button>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
