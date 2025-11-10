/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // Enable for Docker optimization
  images: {
    domains: [],
  },
};

export default nextConfig;
