'use client';

import { PenTool, BookOpen, FlaskConical, ClipboardList, Edit3, Laptop, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServicesPageProps {
  onNavigate?: (page: string) => void;
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
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-7 md:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 dark:border-slate-700"
              >
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
            ))}
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
              className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-xl"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              onClick={() => onNavigate?.('pricing')}
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-xl"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
