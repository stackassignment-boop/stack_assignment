'use client';

import { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Check, Sparkles, User, Clock, FileText, Mail } from 'lucide-react';

interface QuizStep {
  question: string;
  subtitle: string;
  options: { value: string; label: string; icon?: string }[];
  icon: React.ReactNode;
}

const quizSteps: QuizStep[] = [
  {
    question: "What's your subject?",
    subtitle: "Select your area of study",
    options: [
      { value: 'Business', label: 'Business & Management', icon: '📊' },
      { value: 'Nursing', label: 'Nursing & Healthcare', icon: '🏥' },
      { value: 'Law', label: 'Law & Legal Studies', icon: '⚖️' },
      { value: 'STEM', label: 'STEM & Technology', icon: '🔬' },
      { value: 'Arts', label: 'Arts & Humanities', icon: '🎨' },
      { value: 'Other', label: 'Other Subject', icon: '📚' },
    ],
    icon: <FileText className="w-6 h-6" />,
  },
  {
    question: "What's your academic level?",
    subtitle: "Help us match the right writer",
    options: [
      { value: 'high_school', label: 'High School', icon: '🎓' },
      { value: 'bachelor', label: "Bachelor's Degree", icon: '📚' },
      { value: 'master', label: "Master's Degree", icon: '🎓' },
      { value: 'phd', label: 'PhD / Doctorate', icon: '🔬' },
    ],
    icon: <User className="w-6 h-6" />,
  },
  {
    question: "When do you need it?",
    subtitle: "Select your deadline",
    options: [
      { value: '24hrs', label: 'Within 24 hours', icon: '⚡' },
      { value: '3days', label: 'In 3 days', icon: '📅' },
      { value: '1week', label: 'In 1 week', icon: '📆' },
      { value: '2weeks', label: '2+ weeks', icon: '🗓️' },
    ],
    icon: <Clock className="w-6 h-6" />,
  },
];

interface SubjectFinderQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubjectFinderQuiz({ isOpen, onClose }: SubjectFinderQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (value: string) => {
    const stepKeys = ['subject', 'academicLevel', 'deadline'];
    setAnswers(prev => ({ ...prev, [stepKeys[currentStep]]: value }));
    
    if (currentStep < quizSteps.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const getWriterMatch = () => {
    const writerCount = Math.floor(Math.random() * 5) + 2;
    const qualifications = answers.academicLevel === 'phd' ? 'PhD' : 
                          answers.academicLevel === 'master' ? "Master's" : 
                          'Expert';
    return { count: writerCount, qualification: qualifications };
  };

  if (!isOpen) return null;

  const step = quizSteps[currentStep];
  const writerMatch = getWriterMatch();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">Find Your Perfect Writer</span>
          </div>
          <p className="text-sm opacity-90">Answer 3 quick questions for instant match</p>
          
          {/* Progress */}
          <div className="flex gap-2 mt-4">
            {quizSteps.map((_, i) => (
              <div 
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i <= currentStep ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isSubmitted ? (
            currentStep < quizSteps.length ? (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{step.question}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{step.subtitle}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {step.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSelect(option.value)}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                        answers[Object.keys(answers)[currentStep]] === option.value
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                          : 'border-gray-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600'
                      }`}
                    >
                      <span className="text-2xl">{option.icon}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{option.label}</span>
                    </button>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-6">
                  <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="flex items-center gap-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <span className="text-sm text-gray-400">
                    Step {currentStep + 1} of {quizSteps.length}
                  </span>
                </div>
              </>
            ) : (
              /* Email capture step */
              <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-green-600 dark:text-green-400">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Get Your Instant Quote</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Enter your email for personalized pricing</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-slate-700 rounded-xl focus:border-indigo-500 focus:outline-none dark:bg-slate-900 dark:text-white"
                  />
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    Get My Quote <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
            )
          ) : (
            /* Success state */
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Perfect Match Found! 🎉
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We have <span className="font-bold text-indigo-600">{writerMatch.count} {writerMatch.qualification} writers</span> specialized in {answers.subject} available now!
              </p>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">Avg. response time:</span> 2 minutes
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">Starting at:</span> $8.99/page
                </p>
              </div>
              <button
                onClick={onClose}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-colors"
              >
                Start Order Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
