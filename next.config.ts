import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel deployment configuration - remove static export
  // output: 'export', // Commented out for Vercel
  
  // Environment variables
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  },
  
  // Enable image optimization for Vercel
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif']
  }
};

export default nextConfig;
