import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import SessionProvider from "@/components/providers/SessionProvider";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import {
  seoConfig,
  region,
  generateOrganizationSchema,
  generateWebSiteSchema,
} from "@/lib/seo-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  title: {
    default: seoConfig.title,
    template: `%s | ${seoConfig.siteName}`,
  },
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  authors: [{ name: seoConfig.siteName }],
  creator: seoConfig.siteName,
  publisher: seoConfig.siteName,
  
  // Verification
  verification: {
    google: seoConfig.googleSiteVerification || undefined,
    other: seoConfig.bingSiteVerification ? {
      'msvalidate.01': seoConfig.bingSiteVerification,
    } : undefined,
  },
  
  // Icons - Using static favicon from public folder
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: '/favicon.png',
  },
  
  // Open Graph
  openGraph: {
    type: 'website',
    // Primary market is Australia. This was previously en_US, which told
    // Facebook/LinkedIn (and contributed a weak signal to Google) that the
    // site was aimed at a US audience.
    locale: region.ogLocale,
    alternateLocale: [...region.ogLocaleAlternate],
    url: seoConfig.siteUrl,
    siteName: seoConfig.siteName,
    title: seoConfig.title,
    description: seoConfig.description,
    images: [
      {
        url: `${seoConfig.siteUrl}/og-image.png`,
        width: 1344,
        height: 768,
        alt: seoConfig.siteName,
        type: 'image/png',
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.title,
    description: seoConfig.description,
    site: seoConfig.social.twitter,
    images: [`${seoConfig.siteUrl}/og-image.png`],
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Alternates
  alternates: {
    canonical: seoConfig.siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={region.htmlLang} suppressHydrationWarning>
      <head>
        {/* Preconnect to important origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Facebook App ID - Add your App ID in seo-config.ts */}
        {seoConfig.social.facebookAppId && (
          <meta property="fb:app_id" content={seoConfig.social.facebookAppId} />
        )}
        {/*
          Sitewide Organization + WebSite graph. These helpers existed in
          seo-config.ts but were never rendered anywhere, so the site was
          publishing no entity or publisher markup at all. Emitting them once
          in the root layout covers every route, and both carry the AU-first
          `areaServed` geo signal.

          Inlined as a plain script rather than via <StructuredData>, which is
          a 'use client' component — this keeps the markup server-rendered and
          ships no extra JavaScript.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              generateOrganizationSchema(),
              generateWebSiteSchema(),
            ]),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <GoogleAnalytics />
        <SessionProvider>
          {children}
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
