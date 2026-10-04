import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: '/contact', destination: '/about#contact-form', permanent: false }];
  },
};

export default nextConfig;
