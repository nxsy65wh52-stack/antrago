/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false, // Disable SWC minifier to avoid binary loading issues
  experimental: {
    appDir: true, // Enable the new /app directory (optional, can be false)
  },
}

module.exports = nextConfig
