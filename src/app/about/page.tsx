import { Metadata } from 'next'
import { Users, Award, Target, Globe, BookOpen, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us - Stack Assignment',
  description: 'Learn about Stack Assignment - your trusted partner for academic writing assistance. Discover our mission, values, and commitment to student success.',
  keywords: ['about stack assignment', 'academic writing service', 'essay help', 'assignment help'],
  openGraph: {
    title: 'About Us - Stack Assignment',
    description: 'Your trusted partner for academic writing assistance since 2018',
    url: 'https://www.stackassignment.com/about',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Stack Assignment</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Empowering students worldwide with professional academic assistance since 2018
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-slate-800 dark:to-slate-700 p-8 rounded-2xl">
            <Target className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              To provide high-quality, affordable, and accessible academic writing assistance to students worldwide, helping them achieve their educational goals while maintaining academic integrity.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-700 dark:to-slate-800 p-8 rounded-2xl">
            <Globe className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Our Vision</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              To be the most trusted and reliable academic writing partner globally, known for excellence, integrity, and student success.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="bg-gray-50 dark:bg-slate-900 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Our Story</h2>
          </div>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
              Founded in 2018, Stack Assignment began with a simple idea: make academic help accessible to every student who needs it. We noticed that many students struggled with overwhelming workloads, tight deadlines, and complex assignments.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
              What started as a small team of passionate educators and writers has grown into a global network of 500+ expert writers, researchers, and editors. We've helped thousands of students across 50+ countries achieve their academic goals.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Today, we continue to uphold our founding principles: quality, integrity, and student success. Every assignment we deliver is crafted with care, thoroughly researched, and tailored to meet each student's unique needs.
            </p>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">500+</div>
              <p className="text-gray-600 dark:text-gray-400">Expert Writers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">50K+</div>
              <p className="text-gray-600 dark:text-gray-400">Assignments Completed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-pink-600 dark:text-pink-400 mb-2">50+</div>
              <p className="text-gray-600 dark:text-gray-400">Countries Served</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-teal-600 dark:text-teal-400 mb-2">99%</div>
              <p className="text-gray-600 dark:text-gray-400">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-gray-50 dark:bg-slate-900 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Our Values</h2>
            <p className="text-gray-600 dark:text-gray-400">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
              <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400 mb-3" />
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Quality First</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Every assignment undergoes rigorous quality checks to ensure it meets the highest academic standards.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
              <Award className="w-8 h-8 text-amber-600 dark:text-amber-400 mb-3" />
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Academic Integrity</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We provide guidance and reference materials that help students learn and improve their own work.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
              <Users className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Student-Centric</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your success is our priority. We tailor our services to meet your unique needs and deadlines.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
              <BookOpen className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3" />
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Continuous Learning</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We stay updated with the latest academic standards and writing practices to deliver the best results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Why Students Choose Us</h2>
          </div>
          <div className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-2xl shadow-lg">
            <ul className="space-y-4">
              {[
                '24/7 customer support - always here when you need us',
                'Plagiarism-free content with complimentary reports',
                'On-time delivery guarantee or your money back',
                'Affordable pricing with no hidden fees',
                'Expert writers with advanced degrees in their fields',
                'Unlimited revisions until you are satisfied',
                'Secure and confidential service',
                'Money-back guarantee if you are not satisfied',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
