/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['yulian.codes', 'upload.wikimedia.org', 'www.dropbox.com', 'firebasestorage.googleapis.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://yegor.codes/api/:path*',
      },
    ]
  },
}

module.exports = nextConfig


