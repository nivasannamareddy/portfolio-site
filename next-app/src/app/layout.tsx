import type { Metadata } from 'next'
import './globals.css'
import VisualEditingOverlay from '@/components/VisualEditing'

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
        <VisualEditingOverlay />
      </body>
    </html>
  )
}
