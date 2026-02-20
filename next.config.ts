import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  
  // Production optimizations
  poweredByHeader: false,
  
  // Image optimization domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Experimental features for serverless
  experimental: {
    serverComponentsExternalPackages: ['@vercel/blob'],
  },
};

export default nextConfig;
