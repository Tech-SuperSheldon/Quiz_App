import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "www.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "lh4.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
