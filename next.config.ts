import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Isolated prod builds can set NEXT_DIST_DIR without touching the running `.next` (dev).
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    qualities: [70, 75],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'labidallc.com',
          },
        ],
        destination: 'https://www.labidallc.com/:path*',
        permanent: true,
      },
      {
        source: '/services/emergency-roadside-welding',
        destination: '/services/emergency-mobile-welding',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
