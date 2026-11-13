import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false, // GSAP ScrollTrigger works smoothest without double-mount in dev
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.higgs.ai' },
      { protocol: 'https', hostname: 'd8j0ntlcm91z4.cloudfront.net' },
      { protocol: 'https', hostname: 'i.redd.it' },
      { protocol: 'https', hostname: 'content.jdmagicbox.com' },
      { protocol: 'https', hostname: 'images.jdmagicbox.com' },
      { protocol: 'https', hostname: 'b.zmtcdn.com' },
      { protocol: 'https', hostname: 'www.yovizag.com' }
    ]
  }
};

export default nextConfig;

