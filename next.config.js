const dns = require("dns");
dns.setDefaultResultOrder("ipv4first")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['yulian.codes', 'upload.wikimedia.org', 'www.dropbox.com'],
  },
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  typescript: {
    // Temp
    ignoreBuildErrors: true,
  },
  eslint: {
    // Temp
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig


