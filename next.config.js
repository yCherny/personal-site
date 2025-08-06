/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['yulian.codes', 'upload.wikimedia.org', 'www.dropbox.com', 'firebasestorage.googleapis.com', 'www.googleapis.com/'],
  },

}

module.exports = nextConfig


