import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "frame-ancestors 'self' https://nivas-portfolio.sanity.studio https://*.sanity.studio http://localhost:3333 http://localhost:3000",
          },
        ],
      },
    ]
  },
}

export default nextConfig
