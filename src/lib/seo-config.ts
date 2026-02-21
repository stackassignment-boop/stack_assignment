// SEO Configuration for Stack Assignment
// Update these values to match your business

export const seoConfig = {
  // Basic Site Info
  siteName: 'Stack Assignment',
  siteUrl: 'https://www.stackassignment.com',
  
  // Default Meta Tags
  title: 'Stack Assignment - Expert Academic Writing Help & Assignment Solutions',
  description: 'Professional academic writing & assignment assistance since 2010. PhD-qualified writers, 100% original content, on-time delivery. Expert help for essays, dissertations, research papers, and more.',
  keywords: [
    'academic writing',
    'assignment help',
    'essay writing',
    'dissertation help',
    'research paper',
    'thesis writing',
    'homework help',
    'university assignment',
    'Stack Assignment',
    'programming help',
    'coding assistance',
    'homework help',
  ],
  
  // Organization Schema
  organization: {
    name: 'Stack Assignment',
    logo: 'https://www.stackassignment.com/logo.png',
    sameAs: [
      'https://twitter.com/stackassignment',
      'https://www.linkedin.com/company/stackassignment',
    ]
  },
  
  // Social Media
  social: {
    twitter: '@stackassignment',
    facebook: 'https://facebook.com/stackassignment',
    facebookAppId: '', // Add your Facebook App ID here (optional - for Facebook analytics)
  },
  
  // Google Search Console Verification
  // Since you used domain provider verification, this can be left empty or used for meta tag verification
  googleSiteVerification: '',
  
  // Bing Webmaster Tools Verification
  // Verified automatically via Google account sign-in
  bingSiteVerification: 'verified',
}

// Generate JSON-LD structured data
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: seoConfig.organization.name,
    url: seoConfig.siteUrl,
    logo: seoConfig.organization.logo,
    sameAs: seoConfig.organization.sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English']
    }
  }
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${seoConfig.siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  }
}

export function generateServiceSchema(service: {
  name: string
  description: string
  price?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: seoConfig.siteName,
      url: seoConfig.siteUrl
    },
    offers: service.price ? {
      '@type': 'Offer',
      price: service.price,
      priceCurrency: 'USD'
    } : undefined
  }
}
