import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // Allows all images from your Cloudinary account
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Added this for your seed/mock data!
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;