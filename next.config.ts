import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // BASE_PATH set by CI for GitHub Pages subdirectory deployment
  basePath: process.env.BASE_PATH ?? '',
  // Expose to client components so <img src> can be prefixed correctly
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.BASE_PATH ?? '',
  },
};

export default nextConfig;
