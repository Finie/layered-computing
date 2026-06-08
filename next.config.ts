import type { NextConfig } from "next";
import path from "node:path";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  basePath,
  images: {
    unoptimized: true,
  },
  output: "export",
  outputFileTracingRoot: path.join(__dirname),
  reactStrictMode: true,
  trailingSlash: true,
};

export default nextConfig;
