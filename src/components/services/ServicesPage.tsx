'use client';

import { useState, useEffect } from 'react';
import { PenTool, BookOpen, FlaskConical, ClipboardList, Edit3, Laptop, ArrowRight, Check, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ServicesPageProps {
  onNavigate?: (page: string, params?: Record<string, string>) => void;
}

interface Requirement {
  id: string;
  title: string;
  description?: string;
  category?: string;
  fileName: string;
  fileSize: number;
  filePath: string;
  createdAt: string;
}

const services = [
  {
    icon: PenTool,
    title: 'Essay Writing',
    description: '500–5,000+ words • Any topic • Any deadline • MLA, APA, Harvard, Chicago',
    features: [
      'Argumentative, descriptive, narrative',
      'Literature reviews & critical analysis',
    ],
  },
  {
    icon: BookOpen,
    title: 'Dissertation & Thesis',
    description: 'Full document, chapters, proposal, abstract, literature review, methodology, results',
    features: [
      "Master's & PhD level",
      'Data analysis (SPSS, R, NVivo)',
    ],
  },
  {
    icon: FlaskConical,
    title: 'Research Papers & Articles',
    description: 'Empirical, theoretical, systematic reviews • Any citation style',
    features: [
      'Primary & secondary research',
      'Plagiarism report included',
    ],
  },
  {
    icon: ClipboardList,
    title: 'Assignment & Coursework Help',
    description: 'Homework, case studies, reports, presentations, lab reports',
    features: [
      'Weekly & semester-long support',
      'PowerPoint + speaker notes',
    ],
  },
  {
    icon: Edit3,
    title: 'Editing & Proofreading',
    description: 'Improve structure, grammar, flow, academic tone • Reduce plagiarism',
    features: [
      'Track changes + detailed comments',
      'Formatting & referencing check',
    ],
  },
  {
    icon: Laptop,
    title: 'Online Exam & Quiz Assistance',
    description: 'Live proctored exams, timed quizzes, discussion boards',
    features: [
      'Real-time support',
      'Subject experts available 24/7',
    ],
  },
];

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loadingRequirements, setLoadingRequirements] = useState(true);
  const [expandedService, setExpandedService] = useState<string | null>(null);

  // Fetch requirements on mount
  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        console.log('Fetching requirements...');
        const res = await fetch('/api/requirements');
        console.log('Requirements API response status:', res.status);
        
        if (res.ok) {
          const data = await res.json();
          console.log('Requirements data:', data);
          setRequirements(data.requirements || []);
        } else {
          const errorData = await res.json();
          console.error('Requirements API error:', errorData);
        }
      } catch (error) {
        console.error('Failed to fetch requirements:', error);
      } finally {
        setLoadingRequirements(false);
      }
    };
    fetchRequirements();
  }, []);

  const handleGetAnswer = (requirement: Requirement) => {
    console.log('Get Answer clicked for requirement:', requirement);
    
    // Pre-fill order form with requirement data
    const params: Record<string, string> = {
      subject: requirement.title,
      description: requirement.description || `Help with: ${requirement.title}\n\nRequirement file: ${requirement.fileName}`,
    };
    if (requirement.category) {
      params.category = requirement.category;
    }
    
    console.log('Navigating to order with params:', params);
    onNavigate?.('order', params);
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
  return (
    <div className="bg-gray-50 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-indigo-50 via-white to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Our Academic Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            From high school assignments to PhD dissertations — we cover every level and subject
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {services.map((service, index) => {
              const isExpanded = expandedService === service.title;
              const isAssignmentService = service.title === 'Assignment & Coursework Help';
              
              return (
                <div
                  key={index}
                  className={`bg-white dark:bg-slate-800 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border ${
                    isAssignmentService 
                      ? 'border-indigo-500 ring-2 ring-indigo-200 dark:ring-indigo-800' 
                      : 'border-gray-100 dark:border-slate-700'
                  }`}
                >
                  <div 
                    className={`${isAssignmentService ? 'cursor-pointer' : ''}`}
                    onClick={() => {
                      if (isAssignmentService) {
                        setExpandedService(expandedService === service.title ? null : service.title);
                      }
                    }}
                  >
                    <div className="p-7 md:p-8">
                      <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl flex items-center justify-center mb-6">
                        <service.icon className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {service.description}
                      </p>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Expanded Requirements Section - Only for Assignment & Coursework Help */}
                  {isAssignmentService && isExpanded && requirements.length > 0 && (
                    <div className="border-t border-gray-200 dark:border-slate-700 p-6 bg-gradient-to-b from-indigo-50/50 to-purple-50/50 dark:from-slate-800 dark:to-slate-900">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Available Requirements
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Click 'Get Answer' to pre-fill order with requirement details
                          </p>
                        </div>

                        {requirements.map((requirement) => (
                          <Card key={requirement.id} className="border-2 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 hover:shadow-md">
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                  {requirement.category && (
                                    <Badge className="mb-2" variant="secondary">{requirement.category}</Badge>
                                  )}
                                  <CardTitle className="text-base font-semibold text-gray-900 dark:text-white leading-tight">
                                    {requirement.title}
                                  </CardTitle>
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
                            <CardContent className="space-y-3 pt-2">
                              {requirement.description && (
                                <CardDescription className="line-clamp-2 text-sm">
                                  {requirement.description}
                                </CardDescription>
                              )}
                              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                <span className="font-medium">{requirement.fileName}</span>
                                <span className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">
                                  {formatFileSize(requirement.fileSize)}
                                </span>
                                <span>{formatDate(requirement.createdAt)}</span>
                              </div>
                              <Button
                                type="button"
                                onClick={() => handleGetAnswer(requirement)}
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-sm"
                              >
                                Get Answer
                                <ArrowRight className="ml-2 w-3.5 h-3.5" />
                              </Button>
                            </CardContent>
                          </Card>
                        ))}

                        {requirements.length === 0 && !loadingRequirements && (
                          <div className="text-center py-8">
                            <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                              No requirements available yet
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-12 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              More Services We Offer
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We provide comprehensive academic support across all disciplines and formats
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              'Case Study Analysis',
              'Literature Review',
              'Annotated Bibliography',
              'Lab Reports',
              'Capstone Projects',
              'Personal Statement',
              'Scholarship Essay',
              'Cover Letter',
              'Resume Writing',
              'Business Plan',
              'Grant Proposal',
              'Speech Writing',
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-slate-800 rounded-lg p-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects We Cover */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Subjects We Cover
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: 'Business & Management', icon: '📊' },
              { name: 'Engineering & Technology', icon: '⚙️' },
              { name: 'Medicine & Nursing', icon: '🏥' },
              { name: 'Law & Legal Studies', icon: '⚖️' },
              { name: 'Computer Science', icon: '💻' },
              { name: 'Psychology', icon: '🧠' },
              { name: 'Economics', icon: '📈' },
              { name: 'Education', icon: '📚' },
              { name: 'English Literature', icon: '📖' },
              { name: 'History', icon: '🏛️' },
              { name: 'Sociology', icon: '👥' },
              { name: 'Biology', icon: '🧬' },
              { name: 'Chemistry', icon: '🔬' },
              { name: 'Physics', icon: '🔭' },
              { name: 'Mathematics', icon: '🔢' },
              { name: 'Finance & Accounting', icon: '💰' },
            ].map((subject, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition"
              >
                <span className="text-2xl">{subject.icon}</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {subject.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Why Choose Stack Assignment?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Expert Writers', desc: 'PhD-qualified experts in every field', stat: '500+' },
              { title: 'On-Time Delivery', desc: 'Never miss a deadline', stat: '99.9%' },
              { title: 'Original Content', desc: 'Plagiarism-free guarantee', stat: '100%' },
              { title: 'Support', desc: '24/7 customer assistance', stat: '24/7' },
            ].map((item, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                  {item.stat}
                </div>
                <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-indigo-700 dark:to-indigo-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Not sure which service fits your requirement? Get a free consultation in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => onNavigate?.('order')}
              className="bg-white text-indigo-600 hover:bg-gray-100 px-10 py-6 text-xl font-bold rounded-xl shadow-lg min-w-[280px]"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              onClick={() => onNavigate?.('pricing')}
              className="bg-white text-indigo-600 hover:bg-gray-100 px-10 py-6 text-xl font-bold rounded-xl shadow-lg min-w-[280px]"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
