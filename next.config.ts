import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['randomuser.me', 'your-supabase-project-url'], 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // OR use 'www.techsmith.com' to allow only specific domains
      },
    ],
  },
};

export default nextConfig;
