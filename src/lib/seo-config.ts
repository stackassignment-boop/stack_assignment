// SEO Configuration for Stack Assignment
//
// PRIMARY MARKET: Australia. Secondary: United Kingdom.
//
// Positioning note: this site sells tutoring, editing on the student's own
// work, and study/reference material — NOT ghostwritten work for submission.
// That distinction is load-bearing in Australia, where the Prohibiting
// Academic Cheating Services Act 2020 inserted ss 114A-114B into the TEQSA Act
// 2011, making it an offence to provide *or advertise* an academic cheating
// service commercially. TEQSA can also block infringing sites. Keep all
// copy, metadata, and keywords in this file on the tutoring/editing side of
// that line — no "we write it for you", no grade guarantees, no
// submission-ready promises.

/** Region constants — imported wherever a locale or currency is needed. */
export const region = {
  /** BCP 47 tag for <html lang>. */
  htmlLang: 'en-AU',
  /** Open Graph locale (underscored form). */
  ogLocale: 'en_AU',
  /** Secondary markets, emitted as alternate OG locales. */
  ogLocaleAlternate: ['en_GB', 'en_NZ'],
  /** ISO 4217 code used in all price-bearing structured data. */
  currency: 'AUD',
  /** ISO 3166-1 alpha-2 for the primary market. */
  country: 'AU',
  /** Ordered by priority — used for schema areaServed. */
  areaServed: ['Australia', 'United Kingdom', 'New Zealand'],
} as const;

export const seoConfig = {
  // Basic Site Info
  siteName: 'Stack Assignment',
  siteUrl: 'https://www.stackassignment.com',

  // Default Meta Tags — AU-first, tutoring/editing positioning
  title: 'Academic Tutoring & Editing for Australian Uni Students | Stack Assignment',
  description:
    'One-on-one tutoring and expert editing for Australian university students. PhD-qualified tutors who know AGLC4, APA 7th and Vancouver referencing, and AU marking rubrics. Since 2010.',
  keywords: [
    // AU tutoring intent
    'academic tutoring Australia',
    'university tutor Australia',
    'assignment feedback Australia',
    'academic support Australian universities',
    // AU editing / proofreading intent
    'essay editing service Australia',
    'thesis editing Australia',
    'dissertation editing Australia',
    'proofreading service Australia',
    // AU referencing (Cluster 1 of the content calendar)
    'AGLC4 referencing guide',
    'APA 7th referencing Australia',
    'Vancouver referencing nursing Australia',
    'Harvard referencing Australia',
    // AU-specific study terms — no UK equivalent, so low competition
    'WAM calculator',
    'weighted average mark calculator',
    // Brand
    'Stack Assignment',
  ],

  // Organization Schema
  organization: {
    name: 'Stack Assignment',
    logo: 'https://www.stackassignment.com/logo.png',
    foundingDate: '2010',
    sameAs: [
      'https://twitter.com/stackassignment',
      'https://www.linkedin.com/company/stackassignment',
    ],
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

/** Shared `areaServed` node list, AU first. */
function areaServedSchema() {
  return region.areaServed.map((name) => ({ '@type': 'Country', name }))
}

// Generate JSON-LD structured data
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    // Dual-typed so Google can read this both as the publishing entity and as
    // an education provider, which is what this business actually is.
    '@type': ['Organization', 'EducationalOrganization'],
    '@id': `${seoConfig.siteUrl}/#organization`,
    name: seoConfig.organization.name,
    url: seoConfig.siteUrl,
    logo: seoConfig.organization.logo,
    foundingDate: seoConfig.organization.foundingDate,
    sameAs: seoConfig.organization.sameAs,
    description: seoConfig.description,
    // Geo-targeting signal. Australia is listed first deliberately.
    areaServed: areaServedSchema(),
    knowsLanguage: ['en-AU', 'en-GB'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['en-AU', 'en-GB'],
      areaServed: region.areaServed,
    },
  }
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${seoConfig.siteUrl}/#website`,
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    inLanguage: region.htmlLang,
    publisher: { '@id': `${seoConfig.siteUrl}/#organization` },
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
  /** Unit the price is quoted in, e.g. 'HUR' for per-hour tutoring. */
  unitCode?: string
  url?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url,
    serviceType: 'Academic tutoring and editing',
    areaServed: areaServedSchema(),
    provider: {
      '@type': 'Organization',
      name: seoConfig.siteName,
      url: seoConfig.siteUrl
    },
    offers: service.price ? {
      '@type': 'Offer',
      price: service.price,
      // AUD, not USD — the primary market pays in Australian dollars and
      // mismatched currency in Offer markup suppresses price rich results.
      priceCurrency: region.currency,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: service.price,
        priceCurrency: region.currency,
        ...(service.unitCode ? { unitCode: service.unitCode } : {}),
      },
    } : undefined
  }
}

// Generate Blog Article Schema for SEO
export function generateArticleSchema(article: {
  title: string
  description: string
  slug: string
  publishedAt: string
  authorName: string
  image?: string
  modifiedAt?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: `${seoConfig.siteUrl}/blog/${article.slug}`,
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt || article.publishedAt,
    inLanguage: region.htmlLang,
    author: {
      '@type': 'Person',
      name: article.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: seoConfig.siteName,
      url: seoConfig.siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: seoConfig.organization.logo,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${seoConfig.siteUrl}/blog/${article.slug}`,
    },
    image: article.image || `${seoConfig.siteUrl}/og-image.png`,
  }
}

// Generate FAQ Schema for SEO
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: region.htmlLang,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Schema for a free interactive tool (WAM calculator, citation formatter).
 *
 * These are the backlink magnets in the content plan, so they get proper
 * WebApplication markup with an explicit free price rather than being left as
 * plain pages.
 */
export function generateWebApplicationSchema(tool: {
  name: string
  description: string
  url: string
  category?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.description,
    url: tool.url,
    applicationCategory: tool.category || 'EducationalApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    inLanguage: region.htmlLang,
    isAccessibleForFree: true,
    areaServed: areaServedSchema(),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: region.currency,
    },
    publisher: { '@id': `${seoConfig.siteUrl}/#organization` },
  }
}

// Generate Sample/Learning Resource Schema for SEO
export function generateSampleSchema(sample: {
  title: string
  description: string
  slug: string
  subject?: string
  academicLevel?: string
  paperType?: string
  pages?: number
  publishedAt?: string
  image?: string
}) {
  const academicLevelLabels: Record<string, string> = {
    high_school: 'High School',
    bachelor: "Bachelor's Degree",
    master: "Master's Degree",
    phd: 'PhD',
  }

  const paperTypeLabels: Record<string, string> = {
    essay: 'Essay',
    research_paper: 'Research Paper',
    dissertation: 'Dissertation',
    thesis: 'Thesis',
    coursework: 'Coursework',
    case_study: 'Case Study',
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: sample.title,
    description: sample.description,
    url: `${seoConfig.siteUrl}/samples/${sample.slug}`,
    inLanguage: region.htmlLang,
    educationalLevel: sample.academicLevel ? academicLevelLabels[sample.academicLevel] || sample.academicLevel : undefined,
    learningResourceType: sample.paperType ? paperTypeLabels[sample.paperType] || sample.paperType : 'Study reference material',
    about: sample.subject ? {
      '@type': 'Thing',
      name: sample.subject,
    } : undefined,
    provider: {
      '@type': 'Organization',
      name: seoConfig.siteName,
      url: seoConfig.siteUrl,
    },
    datePublished: sample.publishedAt,
    image: sample.image || `${seoConfig.siteUrl}/og-image.png`,
    additionalType: 'CreativeWork',
    author: {
      '@type': 'Organization',
      name: seoConfig.siteName,
    },
  }
}

// Generate BreadcrumbList Schema for navigation
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${seoConfig.siteUrl}${item.url}`,
    })),
  }
}
