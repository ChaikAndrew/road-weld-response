import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ];
  },
};

export default nextConfig;
