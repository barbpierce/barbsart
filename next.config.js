/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  
};
module.exports = {
  images: {
    domains: ["media.graphassets.com"],
  },
  nextConfig,
};
