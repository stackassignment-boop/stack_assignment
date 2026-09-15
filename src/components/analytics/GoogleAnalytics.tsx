'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'

// Google Analytics 4 Measurement ID
// Get this from your Google Analytics property
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'

// Track page views
function TrackPageViews() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
      
      // Track page view
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      })
    }
  }, [pathname, searchParams])

  return null
}

// Google Analytics Component
export default function GoogleAnalytics() {
  // Don't render if no measurement ID is set
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    return null
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      
      {/* Track page views on route change */}
      <Suspense fallback={null}>
        <TrackPageViews />
      </Suspense>
    </>
  )
}

// Type declaration for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

// Helper function to track custom events
export function trackEvent(
  action: string,
  category: string,
  label: string,
  value?: number
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Pre-defined event tracking functions
export const analytics = {
  // Track when user places an order
  trackOrder: (orderValue: number, orderType: string) => {
    trackEvent('purchase', 'ecommerce', orderType, orderValue)
  },

  // Track when user submits inquiry
  trackInquiry: (subject: string) => {
    trackEvent('inquiry_submit', 'engagement', subject)
  },

  // Track when user starts order form
  trackOrderStart: () => {
    trackEvent('begin_checkout', 'ecommerce', 'order_form_started')
  },

  // Track when user views pricing
  trackPricingView: () => {
    trackEvent('view_item', 'ecommerce', 'pricing_page')
  },

  // Track when user views samples
  trackSampleView: (sampleTitle: string) => {
    trackEvent('view_item', 'engagement', sampleTitle)
  },

  // Track when user views blog post
  trackBlogView: (blogTitle: string) => {
    trackEvent('view_item', 'content', blogTitle)
  },

  // Track contact form submission
  trackContactForm: () => {
    trackEvent('form_submit', 'engagement', 'contact_form')
  },

  // Track WhatsApp click
  trackWhatsAppClick: () => {
    trackEvent('click', 'engagement', 'whatsapp_button')
  },

  // Track CTA button clicks
  trackCTAClick: (ctaName: string) => {
    trackEvent('click', 'cta', ctaName)
  },
}
