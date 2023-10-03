/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  // basePath: '/static',
  trailingSlash: true
}

module.exports = {
  experimental: {
    forceSwcTransforms: true,
  },
}

module.exports = nextConfig
