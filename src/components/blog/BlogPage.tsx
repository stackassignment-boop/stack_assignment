'use client';

const posts = [
  {
    id: '1',
    title: 'How to Finish a 10,000-Word Dissertation in Under 30 Days (Realistic Plan)',
    excerpt:
      'A step-by-step timetable that actually works — including daily word targets, Pomodoro + breaks, chapter outlining templates, and when to use reference managers vs AI tools…',
    category: 'Study Hacks',
    date: 'February 10, 2026',
    slug: 'dissertation-blog',
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    id: '2',
    title: 'APA 7th vs Harvard vs MLA vs Chicago – 2026 Quick Comparison Chart',
    excerpt:
      'Side-by-side examples for in-text citations, reference list entries, DOIs, URLs, et al. usage, and the most common mistakes Indian students make in each style…',
    category: 'Referencing',
    date: 'January 28, 2026',
    slug: 'apa-citation-comparison',
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    id: '3',
    title: 'How to Score 80+ in Online Proctored Exams (Without Cheating)',
    excerpt:
      'Browser lockdown tips • virtual background tricks • note organization • time management during 3-hour exams • what invigilators actually look for…',
    category: 'Exam Preparation',
    date: 'January 15, 2026',
    slug: 'exam-proctored',
    gradient: 'from-emerald-500 to-teal-600',
  },
];

export default function BlogPage() {

  return (
    <main className="flex-grow py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Academic Writing Blog</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Practical tips, guides, referencing help, study strategies and updates for students
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden transition hover:shadow-xl"
            >
              {/* Header image placeholder */}
              <div className={`h-48 bg-gradient-to-br ${post.gradient}`} />

              {/* Content */}
              <div className="p-6 md:p-7">
                <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-2">
                  {post.category} • {post.date}
                </div>
                <h2 className="text-2xl font-bold mb-3 line-clamp-2">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-5 line-clamp-3">{post.excerpt}</p>
                <button className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                  Read full article →
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12 md:mt-16">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-xl text-lg font-semibold transition shadow-md">
            Load More Articles
          </button>
        </div>
      </div>
    </main>
  );
}
