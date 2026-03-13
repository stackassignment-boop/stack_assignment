'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Search, ArrowRight, Eye } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RequirementPreviewModal from '@/components/requirements/RequirementPreviewModal';

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
  const [previewRequirement, setPreviewRequirement] = useState<Requirement | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Categories
  const categories = ['all', 'Programming', 'Essay', 'Research Paper', 'Case Study', 'Coursework', 'Lab Report'];

  // Handle navigation
  const handleNavigate = useCallback((page: string, params?: Record<string, string>) => {
    const urlParams = new URLSearchParams();
    urlParams.set('view', page);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          urlParams.set(key, value);
        }
      });
    }

    window.location.href = `/?${urlParams.toString()}`;
  }, []);

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
    handleNavigate('order', {
      subject: requirement.title,
      description: requirement.description || `Help with: ${requirement.title}\n\nRequirement file: ${requirement.fileName}`,
      ...(requirement.category && { category: requirement.category }),
    });
  };

  const handlePreview = (requirement: Requirement) => {
    setPreviewRequirement(requirement);
    setShowPreviewModal(true);
  };

  const handleClosePreview = () => {
    setShowPreviewModal(false);
    setPreviewRequirement(null);
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
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950">
      <Header
        currentPage="requirements"
        onNavigate={handleNavigate}
        studentUser={null}
        onLogout={() => {}}
      />

      <main className="flex-grow">
        {/* Page Header */}
        <div className="bg-white dark:bg-slate-800 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Assignment & Coursework Help
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Browse requirements and get expert help
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => handleNavigate('services')}
              >
                ← Back to Services
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 dark:text-gray-400">
                        {requirement.fileName}
                      </span>
                      {requirement.fileType === 'application/pdf' ? (
                        <Badge variant="secondary" className="text-xs">
                          PDF
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          {requirement.fileType.split('/')[1]?.toUpperCase() || 'FILE'}
                        </Badge>
                      )}
                    </div>
                    <span className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded text-xs">
                      {formatFileSize(requirement.fileSize)}
                    </span>
                    <span className="text-gray-400 dark:text-gray-500 text-xs">
                      {formatDate(requirement.createdAt)}
                    </span>
                  </div>
                  
                  <div className="flex flex gap-2">
                    <Button
                      onClick={() => handlePreview(requirement)}
                      variant="outline"
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {requirement.fileType === 'application/pdf' ? 'Preview' : 'View'}
                    </Button>
                    <Button
                      onClick={() => handleGetAnswer(requirement)}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold"
                    >
                      Get Answer
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        </div>
      </main>

      <Footer onNavigate={handleNavigate} />

      {/* Preview Modal */}
      {previewRequirement && (
        <RequirementPreviewModal
          requirement={previewRequirement}
          isOpen={showPreviewModal}
          onClose={handleClosePreview}
        />
      )}
    </div>
  );
}
