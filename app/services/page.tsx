'use client'

import { NeumorphicButton } from '@/components/NeumorphicButton/NeumorphicButton'
import { NeumorphicCard } from '@/components/NeumorphicCard/NeumorphicCard'
import { Navigation } from '@/components/Navigation/Navigation'
import { Footer } from '@/components/Footer/Footer'
import { Icon } from '@/components/Icon/Icon'
import { useState, useEffect } from 'react'

export default function ServicesPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <main className="min-h-screen relative">
        <Navigation />
        <div className="relative z-10">
          <section className="relative pt-4 pb-12 md:pt-6 md:pb-16 lg:pt-8 lg:pb-20 px-4 w-full">
            <div className="max-w-6xl mx-auto w-full">
              <div className="hero-neumorphic-card text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-relaxed font-display break-words neumorphic-text-3d mb-4">
                  <span className="plastic-tube-text">Our Services</span>
                </h1>
                <p className="text-lg sm:text-xl text-text-secondary max-w-4xl mx-auto mb-8">
                  Complete digital solutions crafted with precision and delivered with transparency.
                </p>
                <div style={{ background: 'red', color: 'white', padding: '10px', margin: '10px' }}>
                  DEBUG: Component not mounted - stuck in loading state
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen relative">
      <Navigation />
      <div className="relative z-10">
        <div style={{ background: 'green', color: 'white', padding: '10px', margin: '10px' }}>
          DEBUG: Component is mounted and working!
        </div>
        
        {/* Simple Hero Cards Test */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="space-y-4">
              <div className="hero-neumorphic-card-split">
                <h1 className="text-4xl font-display neumorphic-text-3d">
                  <span className="plastic-tube-text">Our Services</span>
                </h1>
              </div>
              <div className="hero-neumorphic-card-split text-center">
                <Icon name="check_circle" className="text-4xl mb-3 text-bronze" />
                <p className="text-base text-text-secondary font-medium">Complete Solutions</p>
              </div>
              <div className="hero-neumorphic-card-split">
                <h1 className="text-4xl font-display neumorphic-text-3d">
                  <span className="plastic-tube-text">Built Right</span>
                </h1>
              </div>
              <div className="hero-neumorphic-card-split text-center">
                <Icon name="speed" className="text-4xl mb-3 text-sage-green" />
                <p className="text-base text-text-secondary font-medium">Delivered Fast</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}