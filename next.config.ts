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

  // Webpack configuration to exclude browser-only packages from SSR
  webpack: (config, { isServer }) => {
    // Exclude input-otp from server bundle as it uses browser-only APIs
    if (isServer) {
      config.externals = [...(config.externals || []), 'input-otp'];
    }
    return config;
  },
};

// Updated to handle browser-only packages in SSR
export default nextConfig;
