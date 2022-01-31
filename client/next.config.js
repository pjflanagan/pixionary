/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/daily',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
