import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.britannica.com',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: "insightful-seal-491.convex.cloud",
        port: ''
      }
    ],
  }
};

export default nextConfig;
