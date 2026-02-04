import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nivas Annamareddy | Data Analyst & ML Engineer',
  description: 'Data analyst and ML engineer crafting forecasting models and dashboards.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
