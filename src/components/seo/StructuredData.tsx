'use client';

// Structured Data Component for injecting JSON-LD schemas
// This improves SEO by providing rich snippets to search engines

interface StructuredDataProps {
  data: object | object[];
}

export function StructuredData({ data }: StructuredDataProps) {
  const jsonData = Array.isArray(data) ? data : [data];
  
  return (
    <>
      {jsonData.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

// Sample Page Structured Data
interface SampleStructuredDataProps {
  title: string;
  description?: string;
  slug: string;
  subject?: string;
  academicLevel?: string;
  paperType?: string;
  pages?: number;
}

export function SampleStructuredData({
  title,
  description,
  slug,
  subject,
  academicLevel,
  paperType,
}: SampleStructuredDataProps) {
  const siteUrl = 'https://www.stackassignment.com';
  const siteName = 'Stack Assignment';
  
  const academicLevelLabels: Record<string, string> = {
    high_school: 'High School',
    bachelor: "Bachelor's Degree",
    master: "Master's Degree",
    phd: 'PhD',
  };

  const paperTypeLabels: Record<string, string> = {
    essay: 'Essay',
    research_paper: 'Research Paper',
    dissertation: 'Dissertation',
    thesis: 'Thesis',
    coursework: 'Coursework',
    case_study: 'Case Study',
  };

  const learningResourceSchema = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: title,
    description: description || `Academic ${paperTypeLabels[paperType || ''] || 'paper'} sample in ${subject || 'various subjects'}`,
    url: `${siteUrl}/samples/${slug}`,
    educationalLevel: academicLevel ? academicLevelLabels[academicLevel] : undefined,
    learningResourceType: paperType ? paperTypeLabels[paperType] : 'Academic Paper',
    about: subject ? {
      '@type': 'Thing',
      name: subject,
    } : undefined,
    provider: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Samples',
        item: `${siteUrl}/samples`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: `${siteUrl}/samples/${slug}`,
      },
    ],
  };

  return <StructuredData data={[learningResourceSchema, breadcrumbSchema]} />;
}

// Blog Article Structured Data
interface ArticleStructuredDataProps {
  title: string;
  description?: string;
  slug: string;
  authorName: string;
  publishedAt: string;
  image?: string;
}

export function ArticleStructuredData({
  title,
  description,
  slug,
  authorName,
  publishedAt,
  image,
}: ArticleStructuredDataProps) {
  const siteUrl = 'https://www.stackassignment.com';
  const siteName = 'Stack Assignment';
  
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: `${siteUrl}/blog/${slug}`,
    datePublished: publishedAt,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${slug}`,
    },
    image: image || `${siteUrl}/og-image.png`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: `${siteUrl}/blog/${slug}`,
      },
    ],
  };

  return <StructuredData data={[articleSchema, breadcrumbSchema]} />;
}

// Services Page Structured Data
interface ServiceStructuredDataProps {
  services: {
    name: string;
    description: string;
    url?: string;
  }[];
}

export function ServicesStructuredData({ services }: ServiceStructuredDataProps) {
  const siteUrl = 'https://www.stackassignment.com';
  
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Academic Writing Services',
    description: 'Professional academic writing and assignment help services',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
        url: service.url || `${siteUrl}/services`,
        provider: {
          '@type': 'Organization',
          name: 'Stack Assignment',
          url: siteUrl,
        },
      },
    })),
  };

  return <StructuredData data={itemListSchema} />;
}
