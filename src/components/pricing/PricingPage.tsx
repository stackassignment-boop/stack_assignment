'use client';

export default function PricingPage() {
  const plans = [
    {
      name: 'Basic',
      price: '₹249',
      description: 'Best for school/college assignments',
      features: ['5–14 days delivery', 'Undergraduate level', 'Standard formatting', '1 free revision'],
      popular: false,
    },
    {
      name: 'Premium',
      price: '₹499',
      description: "Best for university & postgraduate work",
      features: [
        '3–10 days delivery',
        "Master's / PhD level",
        'Plagiarism report included',
        'Unlimited revisions (within 7 days)',
        'Priority support',
      ],
      popular: true,
    },
    {
      name: 'Urgent',
      price: '₹899+',
      description: 'For tight deadlines',
      features: ['6–48 hours delivery', 'Any academic level', 'Top 10% expert writer', 'Plagiarism + Grammarly report'],
      popular: false,
    },
  ];

  return (
    <main className="flex-grow py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Transparent Pricing</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            No hidden fees • Prices per page (≈275 words) • Urgent orders available 24/7
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`${
                plan.popular
                  ? 'bg-indigo-600 text-white scale-105 relative'
                  : 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700'
              } rounded-2xl shadow-xl p-8 text-center transition hover:shadow-2xl ${
                plan.popular ? 'hover:scale-110' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-indigo-700 px-6 py-1 rounded-full font-bold text-sm">
                  MOST POPULAR
                </div>
              )}
              <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-3xl' : ''}`}>
                {plan.name}
              </h3>
              <p
                className={`mb-6 ${
                  plan.popular ? 'text-indigo-200' : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {plan.description}
              </p>
              <div className={`font-bold mb-2 ${plan.popular ? 'text-6xl' : 'text-5xl'}`}>
                {plan.price}
              </div>
              <p
                className={`text-sm mb-8 ${
                  plan.popular ? 'text-indigo-200' : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                per page
              </p>
              <ul className={`space-y-4 mb-10 text-left ${plan.popular ? '' : ''}`}>
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <svg
                      className={`w-5 h-5 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-green-500'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`block w-full py-4 rounded-xl font-semibold transition ${
                  plan.popular
                    ? 'bg-white text-indigo-700 hover:bg-gray-100'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-16 text-center text-gray-600 dark:text-gray-400">
          <p className="mb-4">
            * Final price may vary based on complexity, research requirements, number of sources,
            etc.
          </p>
          <p>
            Get an exact quote in <strong>60 seconds</strong> using the calculator on the homepage.
          </p>
        </div>
      </div>
    </main>
  );
}
