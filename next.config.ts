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

  // Empty turbopack config to use Turbopack defaults
  turbopack: {},

  async redirects() {
    return [
      {
        // Holmes Institute already has a dedicated page at this URL —
        // redirect the new /universities/ convention here instead of
        // building a duplicate page for the same institution.
        source: '/universities/holmes-institute',
        destination: '/holmes-institute-assignment-help',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
