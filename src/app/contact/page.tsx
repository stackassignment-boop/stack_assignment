import { Metadata } from 'next'
import { Mail, Phone, Clock, MapPin, MessageSquare, Send } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch | Stack Assignment',
  description: 'Contact Stack Assignment for academic writing assistance. Reach us via email, phone, or WhatsApp. 24/7 support available for all your queries.',
  keywords: ['contact stack assignment', 'academic writing support', 'customer service', 'get help with assignment', 'essay help contact'],
  openGraph: {
    title: 'Contact Us - Stack Assignment',
    description: 'Get in touch with our team for any questions or support',
    url: 'https://www.stackassignment.com/contact',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-indigo-700 text-white py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Have questions? We're here to help 24/7
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md text-center">
            <Mail className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mx-auto mb-3" />
            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Email Us</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">stackassignment@gmail.com</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Response within 24 hours</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md text-center">
            <Phone className="w-10 h-10 text-teal-600 dark:text-teal-400 mx-auto mb-3" />
            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Phone / WhatsApp</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">+91-99073-00710</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Available 24/7</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md text-center">
            <Clock className="w-10 h-10 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Response Time</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Within 30 minutes</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">For urgent queries</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-2xl shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white">Send Us a Message</h2>
            <p className="text-gray-600 dark:text-gray-400">Fill out the form below and we'll get back to you shortly</p>
          </div>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="How can we help?"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Your Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                placeholder="Tell us more about your requirements..."
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send Message
            </button>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-gray-600 dark:text-gray-400">Quick answers to common questions</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'How quickly can you respond to my inquiry?',
                a: 'We typically respond within 30 minutes during business hours and within 2 hours at other times. For urgent matters, feel free to call or WhatsApp us directly.',
              },
              {
                q: 'What information should I include in my inquiry?',
                a: 'Please include your name, email, phone number, and a brief description of what you need help with. The more details you provide, the better we can assist you.',
              },
              {
                q: 'Do you offer free consultations?',
                a: 'Yes! We offer free initial consultations to discuss your requirements and provide you with a quote. No obligation to purchase.',
              },
              {
                q: 'Can I track the progress of my order?',
                a: 'Yes, once you place an order, you can track its progress through your student dashboard. You will also receive regular updates via email.',
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 group"
              >
                <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 dark:text-white flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700 transition">
                  {faq.q}
                  <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Get a free quote for your assignment today. No obligations, just expert help when you need it.
          </p>
          <a
            href="/pricing"
            className="inline-block bg-white text-indigo-600 hover:bg-gray-100 px-10 py-4 rounded-xl text-lg font-bold transition shadow-lg hover:shadow-xl"
          >
            Get a Free Quote
          </a>
        </div>
      </div>
    </main>
  )
}
