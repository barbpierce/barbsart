/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  webpack(config) {
    config.infrastructureLogging = { debug: /PackFileCache/ };
    return config;
  },
};
module.exports = {
  images: {
    domains: ["media.graphassets.com"],
  },
  nextConfig,
};
