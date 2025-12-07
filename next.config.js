/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },

  env: {
    NEXT_PUBLIC_GOOGLE_CLIENT_ID:517061859674-s3agjbpk3lupq3b4fccqllejrp545i3s.apps.googleusercontent.com,
    BASE_URL:https://levelupbackend.supersheldon.online/,
  },

  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
