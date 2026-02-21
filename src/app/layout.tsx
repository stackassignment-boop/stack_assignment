import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import SessionProvider from "@/components/providers/SessionProvider";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { seoConfig } from "@/lib/seo-config";

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
  
  // Icons - Next.js handles these automatically via icon.tsx and apple-icon.tsx
  // But we also provide static fallbacks for search engines
  icons: {
    icon: [
      { url: '/icon', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-icon', sizes: '180x180', type: 'image/png' },
      { url: '/apple-touch-icon.png' },
    ],
  },
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to important origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Facebook App ID - Add your App ID in seo-config.ts */}
        {seoConfig.social.facebookAppId && (
          <meta property="fb:app_id" content={seoConfig.social.facebookAppId} />
        )}
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
