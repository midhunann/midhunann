import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/about', destination: '/', permanent: true },
      { source: '/contact', destination: '/#contact', permanent: true },
      { source: '/blog/:path*', destination: '/', permanent: true },
      { source: '/projects/:path*', destination: '/#projects', permanent: true },
    ];
  },
};

export default nextConfig;
