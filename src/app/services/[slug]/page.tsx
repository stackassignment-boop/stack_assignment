import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug: string
  }
}

// Generate metadata for each service
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const baseUrl = 'https://www.stackassignment.com'
    const res = await fetch(`${baseUrl}/api/services/${params.slug}`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      return {
        title: 'Service Not Found - Stack Assignment',
      }
    }

    const data = await res.json()
    const service = data.service

    return {
      title: `${service.title} - Service | Stack Assignment`,
      description: service.shortDescription || service.description || `Learn more about our ${service.title} service`,
      keywords: [service.title, 'academic writing service', 'assignment help'].join(', '),
      openGraph: {
        title: service.title,
        description: service.shortDescription || service.description,
        url: `${baseUrl}/services/${service.slug}`,
        type: 'website',
        images: service.image ? [service.image] : [],
      },
    }
  } catch (error) {
    return {
      title: 'Service - Stack Assignment',
    }
  }
}

// Generate static params for all services
export async function generateStaticParams() {
  try {
    const baseUrl = 'https://www.stackassignment.com'
    const res = await fetch(`${baseUrl}/api/services?limit=100`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      return []
    }

    const data = await res.json()
    const services = data.services || []

    return services.map((service: { slug: string }) => ({
      slug: service.slug,
    }))
  } catch (error) {
    console.error('Failed to generate static params for services:', error)
    return []
  }
}

async function getService(slug: string) {
  try {
    const baseUrl = 'https://www.stackassignment.com'
    const res = await fetch(`${baseUrl}/api/services/${slug}`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      return null
    }

    const data = await res.json()
    return data.service
  } catch (error) {
    console.error('Failed to fetch service:', error)
    return null
  }
}

export default function ServiceDetailPage({ params }: PageProps) {
  const service = getService(params.slug)

  if (!service) {
    notFound()
  }

  return (
    <main className="flex-grow">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
          {service.shortDescription && (
            <p className="text-xl opacity-90">{service.shortDescription}</p>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <div dangerouslySetInnerHTML={{ __html: service.description }} />
        </div>

        {service.features && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>
            <ul className="grid md:grid-cols-2 gap-4">
              {JSON.parse(service.features).map((feature: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="mb-6 opacity-90">
            Get expert help with your {service.title} today
          </p>
          <a
            href="/order"
            className="inline-block bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 rounded-xl text-lg font-bold transition shadow-lg hover:shadow-xl"
          >
            Place Your Order
          </a>
        </div>
      </div>
    </main>
  )
}
