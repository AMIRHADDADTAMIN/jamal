/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true
  },
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com"]
  },
  typescript: {
    ignoreBuildErrors: false
  }
};

module.exports = nextConfig;