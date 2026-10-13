import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/offers',
        destination: '/shop',
        permanent: true,
      },
      {
        source: '/on-sale',
        destination: '/shop',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
