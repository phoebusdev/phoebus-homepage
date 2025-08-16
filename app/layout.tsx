import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Phoebus Digital - Digital Products Built Right, Delivered Fast',
  description: 'We build websites and apps that work exactly as promised, delivered exactly when promised. No hidden fees, no project drag-outs, no vendor lock-in.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="animated-gradient-bg fixed inset-0 -z-10"></div>
        <div className="frosted-glass-bg fixed inset-0 -z-5"></div>
        {children}
      </body>
    </html>
  )
}