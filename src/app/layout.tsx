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
  
  // Icons
  icons: {
    icon: [
      { url: '/favicon.png' },
      { url: '/favicon.ico' },
    ],
    apple: '/apple-touch-icon.png',
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
        url: `${seoConfig.siteUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
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
    images: [`${seoConfig.siteUrl}/twitter-image.png`],
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
