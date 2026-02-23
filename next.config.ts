import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['tailwind-merge', 'clsx'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
