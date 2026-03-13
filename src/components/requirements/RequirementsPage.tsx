'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Search, ArrowRight, Filter } from 'lucide-react';
import { toast } from 'sonner';

interface Requirement {
  id: string;
  title: string;
  description?: string;
  category?: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  filePath: string;
  createdAt: string;
}

export default function RequirementsPage() {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Categories
  const categories = ['all', 'Programming', 'Essay', 'Research Paper', 'Case Study', 'Coursework', 'Lab Report'];

  // Fetch requirements
  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        setLoading(true);
        console.log('Fetching requirements...');
        const params = new URLSearchParams();
        if (searchQuery) {
          params.set('search', searchQuery);
        }
        if (selectedCategory !== 'all') {
          params.set('category', selectedCategory);
        }
        
        const res = await fetch(`/api/requirements?${params.toString()}`);
        console.log('Requirements API status:', res.status);
        
        if (res.ok) {
          const data = await res.json();
          console.log('Requirements data:', data);
          setRequirements(data.requirements || []);
        } else {
          const errorData = await res.json();
          console.error('Requirements API error:', errorData);
          toast.error('Failed to load requirements');
        }
      } catch (error) {
        console.error('Failed to fetch requirements:', error);
        toast.error('Failed to load requirements');
      } finally {
        setLoading(false);
      }
    };
    fetchRequirements();
  }, [searchQuery, selectedCategory]);

  const handleGetAnswer = (requirement: Requirement) => {
    // Pre-fill order form with requirement data
    const params = new URLSearchParams();
    params.set('view', 'order');
    params.set('subject', requirement.title);
    params.set('description', requirement.description || `Help with: ${requirement.title}\n\nRequirement file: ${requirement.fileName}`);
    if (requirement.category) {
      params.set('category', requirement.category);
    }
    
    window.location.href = `/?${params.toString()}`;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const filteredRequirements = requirements.filter(requirement => {
    const matchesSearch = searchQuery === '' || 
      requirement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      requirement.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      requirement.fileName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || requirement.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Assignment & Coursework Help</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Browse requirements and get expert help
                </p>
              </div>
            </div>
            <a
              href="/?view=services"
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              ← Back to Services
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="p-4">
            <div className="flex flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search requirements by title, description, or filename..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-64">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="capitalize">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <span className="ml-4 text-gray-600 dark:text-gray-400">Loading requirements...</span>
          </div>
        ) : filteredRequirements.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
                No requirements available yet
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                Check back later or contact support
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredRequirements.map((requirement) => (
              <Card key={requirement.id} className="border-2 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      {requirement.category && (
                        <Badge className="mb-2" variant="secondary">{requirement.category}</Badge>
                      )}
                      <CardTitle className="text-base font-semibold text-gray-900 dark:text-white leading-tight">
                        {requirement.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {requirement.description || 'No description provided'}
                      </CardDescription>
                    </div>
                    <a
                      href={requirement.filePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0"
                      title="Download requirement file"
                    >
                      <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                        <Download className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      {requirement.fileName}
                    </span>
                    <span className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded text-xs">
                      {formatFileSize(requirement.fileSize)}
                    </span>
                    <span className="text-gray-400 dark:text-gray-500 text-xs">
                      {formatDate(requirement.createdAt)}
                    </span>
                  </div>
                  
                  <div className="flex flex gap-2">
                    <a
                      href={requirement.filePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="outline" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Preview File
                      </Button>
                    </a>
                    <Button
                      onClick={() => handleGetAnswer(requirement)}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold"
                    >
                      Get Answer
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  
                  <div className="text-xs text-gray-400 dark:text-gray-500 text-center pt-2 border-t border-gray-100 dark:border-slate-700 mt-2">
                    <p className="flex items-center justify-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Searchable by students</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* SEO Content for Search Engines */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>SEO Information</CardTitle>
              <CardDescription>
                This page displays all assignment and coursework requirements with their full content for SEO purposes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <strong>Why this is SEO-friendly:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>✅ All requirement titles are displayed as visible text on the page</li>
                <li>✅ Descriptions provide searchable content for students</li>
                <li>✅ Categories help organize content by subject area</li>
                <li>✅ File names are indexed and searchable</li>
                <li>✅ Internal linking from files helps search engines discover related content</li>
                <li>✅ Fresh content is frequently indexed by search engines</li>
              </ul>
              <p className="mt-4">
                <strong>Searchable by students for:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Assignment titles (e.g., "CS101 Programming Assignment")</li>
                <li>Course names (e.g., "Marketing 101")</li>
                <li>Keywords in descriptions</li>
                <li>File names</li>
                <li>Categories (Programming, Essay, Research Paper, etc.)</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-indigo-950">
          <CardContent className="py-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-indigo-100 text-lg mb-6">
              Contact us and we'll help you find the right requirements for your course
            </p>
            <Button
              onClick={() => window.open('/?view=contact', '_self')}
              variant="secondary"
              className="bg-white text-indigo-600 hover:bg-gray-50"
            >
              Contact Support
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            © 2024 StackAssignment. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
