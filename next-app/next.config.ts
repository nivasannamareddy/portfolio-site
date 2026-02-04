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
              "frame-ancestors 'self' https://*.sanity.studio https://*.sanity.io http://localhost:3333 http://localhost:3000",
          },
        ],
      },
    ]
  },
}

export default nextConfig
