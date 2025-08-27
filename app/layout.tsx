import type { Metadata } from 'next'
import { Montserrat, Chivo_Mono } from 'next/font/google'
import { Navigation } from '@/components/Navigation/Navigation'
import { Footer } from '@/components/Footer/Footer'
import { PageTransitionProvider } from '@/contexts/PageTransitionContext'
import { PageTransitionWrapper } from '@/components/PageTransitionWrapper/PageTransitionWrapper'
import './globals.css'

export const metadata: Metadata = {
  title: 'Phoebus Digital - Digital Products Built Right, Delivered Fast',
  description: 'We build websites and apps that work exactly as promised, delivered exactly when promised. No hidden fees, no project drag-outs, no vendor lock-in.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
})

const chivoMono = Chivo_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-chivo-mono",
  weight: ["300", "400", "700"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${chivoMono.variable}`}>
      <body className={`${montserrat.className} antialiased min-h-screen relative overflow-x-hidden`}>
        <PageTransitionProvider>
          <div className="animated-gradient-bg fixed inset-0 -z-10"></div>
          <div className="frosted-glass-bg fixed inset-0 -z-5"></div>
          <div className="relative z-10">
            <Navigation />
            <PageTransitionWrapper>
              {children}
            </PageTransitionWrapper>
            <Footer />
          </div>
        </PageTransitionProvider>
      </body>
    </html>
  )
}