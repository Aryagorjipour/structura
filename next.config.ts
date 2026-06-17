import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // BASE_PATH set by CI for GitHub Pages subdirectory deployment
  basePath: process.env.BASE_PATH ?? '',
};

export default nextConfig;
