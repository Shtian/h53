/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.yr.no",
      },
    ],
  },
};

export default nextConfig;
