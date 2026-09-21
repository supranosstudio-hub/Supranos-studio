import type { NextConfig } from "next";

// Static export: no server, no serverless functions, no paid hosting required.
// Output lands in ./out and can be hosted for free on GitHub Pages, Netlify,
// Cloudflare Pages, or Vercel's free tier as static files.
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
