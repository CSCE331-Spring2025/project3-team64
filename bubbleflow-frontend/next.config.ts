import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors. Make sure you really want to ignore lint issues.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['openweathermap.org', 'lh3.googleusercontent.com'],
  },
};

export default nextConfig;
