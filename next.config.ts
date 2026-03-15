import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      { source: '/rss.xml', destination: '/rss' },
    ]
  },
};

export default nextConfig;
