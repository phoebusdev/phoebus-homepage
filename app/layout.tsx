import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SkipNavigation } from '@/components/SkipNavigation'
import './globals.css'

export const metadata: Metadata = {
  title: 'Phoebus Digital - Digital Products Built Right, Delivered Fast',
  description: 'Custom web development, mobile app development, and e-commerce platforms. We build websites and apps that work exactly as promised, delivered exactly when promised. No hidden fees, no project drag-outs, no vendor lock-in.',
  keywords: ['web development', 'mobile app development', 'e-commerce platforms', 'custom software development', 'digital products', 'web applications', 'mobile applications'],
  authors: [{ name: 'Phoebus Digital' }],
  creator: 'Phoebus Digital',
  publisher: 'Phoebus Digital',
  metadataBase: new URL('https://phoebusdigital.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://phoebusdigital.com',
    title: 'Phoebus Digital - Digital Products Built Right, Delivered Fast',
    description: 'Custom web development, mobile app development, and e-commerce platforms built with excellence.',
    siteName: 'Phoebus Digital',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Phoebus Digital - Digital Products Built Right',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phoebus Digital - Digital Products Built Right, Delivered Fast',
    description: 'Custom web development, mobile app development, and e-commerce platforms built with excellence.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://phoebusdigital.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Phoebus Digital',
    description: 'Custom web development, mobile app development, and e-commerce platforms',
    url: 'https://phoebusdigital.com',
    telephone: '+1-XXX-XXX-XXXX',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    sameAs: [
      'https://twitter.com/phoebusdigital',
      'https://linkedin.com/company/phoebusdigital',
    ],
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased">
        <SkipNavigation />
        <div className="animated-gradient-bg fixed inset-0 -z-10"></div>
        <div className="frosted-glass-bg fixed inset-0 -z-5"></div>
        {children}
        <Analytics />
      </body>
    </html>
  )
}