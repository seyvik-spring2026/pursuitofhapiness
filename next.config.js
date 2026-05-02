/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev',
      },
    ],
  },
}

module.exports = nextConfig
