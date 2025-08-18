'use client'

import { NeumorphicButton } from '@/components/NeumorphicButton/NeumorphicButton'
import { NeumorphicCard } from '@/components/NeumorphicCard/NeumorphicCard'
import { ServiceCard } from '@/components/ServiceCard/ServiceCard'
import { Navigation } from '@/components/Navigation/Navigation'
import { Footer } from '@/components/Footer/Footer'
import { Icon } from '@/components/Icon/Icon'
import { ScrollDebugTool } from '@/components/ScrollDebugTool/ScrollDebugTool'
import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

const ParallaxProvider = dynamic(
  () => import('react-scroll-parallax').then(mod => mod.ParallaxProvider),
  { ssr: false }
)

const Parallax = dynamic(
  () => import('react-scroll-parallax').then(mod => mod.Parallax),
  { ssr: false }
)

// Service data
const services = [
  {
    title: "Full-Stack Web Applications",
    icon: "language",
    description: "Complete web applications that scale. Built lean but architected for growth. From simple sites to complex multi-tenant platforms.",
    features: [
      "Serverless architecture",
      "Real-time dashboards", 
      "PWAs",
      "Global CDN",
      "Multi-tenant SaaS",
      "API-first development"
    ]
  },
  {
    title: "Mobile Applications", 
    icon: "phone_iphone",
    description: "Native and cross-platform mobile apps that actually work. Built for performance and easy updates without app store hassles.",
    features: [
      "Native iOS/Android",
      "Cross-platform solutions",
      "Offline-first",
      "OTA updates", 
      "Push notifications",
      "App store optimization"
    ]
  },
  {
    title: "E-commerce & Business Systems",
    icon: "shopping_cart", 
    description: "Complete e-commerce platforms and business systems. Payment processing, inventory management, customer portals - everything you need to run and scale.",
    features: [
      "Payment processing",
      "Inventory management",
      "Customer portals",
      "Multi-vendor marketplace",
      "Automated notifications", 
      "Analytics dashboards"
    ]
  }
]

// Process steps data
const processSteps = [
  {
    icon: "search",
    number: "1",
    title: "Discovery & Reality Check",
    shortText: "Understand your needs",
    fullText: "We figure out what you actually need. If we can talk you out of features you don't need, we will."
  },
  {
    icon: "visibility",
    number: "2", 
    title: "Free Prototype",
    shortText: "See it working",
    fullText: "We build a working prototype at no cost. You see exactly how your product will work before paying a dollar."
  },
  {
    icon: "build",
    number: "3",
    title: "Build Phase", 
    shortText: "Fixed price delivery",
    fullText: "Fixed scope, fixed timeline, fixed price. You get daily updates and can see your product being built in real-time."
  },
  {
    icon: "rocket_launch",
    number: "4",
    title: "Deploy & Transfer",
    shortText: "Full ownership", 
    fullText: "We deploy your product and transfer 100% ownership to you. All code, all accounts, all passwords."
  }
]

// Why Different data
const whyDifferentItems = [
  {
    icon: "lock_open",
    title: "No Vendor Lock-In",
    description: "You own everything. All code, all accounts, all passwords. Our ideal client never needs us again after launch."
  },
  {
    icon: "schedule", 
    title: "Fixed Price, Fixed Timeline",
    description: "No surprise invoices, no scope creep, no 'monthly maintenance' fees. What we quote is what you pay."
  },
  {
    icon: "trending_up",
    title: "Built for Growth",
    description: "Lean but future-proof architecture. Start minimal but architected for easy expansion when you're ready."
  },
  {
    icon: "verified",
    title: "Radical Honesty", 
    description: "We'll talk you out of features you don't need. We tell you what you actually need, not what makes us money."
  }
]

// Custom hook for stacked deck animation (exactly like process page)
function useStackedDeckAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      const triggerPoint = viewportHeight * 0.5
      const animationRange = viewportHeight * 1.5
      
      const scrollFromTrigger = triggerPoint - rect.top
      const rawProgress = Math.max(0, Math.min(1, scrollFromTrigger / animationRange))
      
      const easedProgress = rawProgress * rawProgress * (3 - 2 * rawProgress)
      
      setProgress(easedProgress)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { containerRef, progress }
}

// Custom hook for hero card scatter animation
function useHeroScatterAnimation() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [scatterProgress, setScatterProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return

      const rect = heroRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      // Start scattering when hero section approaches the top of viewport
      const triggerPoint = viewportHeight * 0.8 // Start when 80% up from bottom
      const animationRange = viewportHeight * 0.6 // Complete over 60% of viewport height
      
      const scrollFromTrigger = triggerPoint - rect.bottom
      const rawProgress = Math.max(0, Math.min(1, scrollFromTrigger / animationRange))
      
      // Ease out cubic for smooth deceleration
      const easedProgress = 1 - Math.pow(1 - rawProgress, 3)
      
      setScatterProgress(easedProgress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { heroRef, scatterProgress }
}

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { containerRef, progress } = useStackedDeckAnimation()

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!mounted) {
    return (
      <main className="min-h-screen relative">
        <Navigation />
        <div className="relative z-10">
          <section className="relative pt-8 pb-12 md:pt-10 md:pb-16 lg:pt-12 lg:pb-20 px-4 w-full">
            <div className="max-w-6xl mx-auto w-full">
              <div className="transform scale-75 origin-center">
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-12 md:col-span-7">
                    <div className="hero-neumorphic-card-split">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display neumorphic-text-3d">
                        <span className="plastic-tube-text">Digital Products</span>
                      </h1>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <div className="hero-neumorphic-card-split">
                      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display neumorphic-text-3d">
                        <span className="plastic-tube-text">Built Right</span>
                      </h1>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-8">
                    <div className="hero-neumorphic-card-split">
                      <p className="text-lg sm:text-xl text-text-secondary">
                        We build websites and apps that work exactly as promised, delivered exactly when promised.
                      </p>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-4">
                    <div className="hero-neumorphic-card-split">
                      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display neumorphic-text-3d">
                        <span className="plastic-tube-text">Delivered Fast</span>
                      </h1>
                    </div>
                  </div>
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
    <ParallaxProvider 
      scrollAxis="vertical"
      isDisabled={isMobile}
    >
      <main className="min-h-screen relative">
        <Navigation />

        <Parallax 
          translateY={[-20, 20]}
          className="absolute inset-0 z-0"
        >
          <div className="w-full h-[120vh] bg-gradient-to-br from-[rgba(232,213,242,0.03)] via-[rgba(208,232,227,0.03)] to-[rgba(252,228,214,0.02)]" />
        </Parallax>

        <div className="relative z-10">
          {/* Hero Section - Load-Based Card Collage Animation */}
          <section className="min-h-screen py-4 md:py-6 lg:py-8 px-6 md:px-8 lg:px-12 flex items-center">
            <div className="max-w-7xl mx-auto w-full">
              <div className="transform scale-75 origin-center" style={{ overflow: 'visible' }}>
                <div className="relative">
                  {/* Card Collage Layout - Row by Row with Flexible Sizing */}
                  <div className="space-y-4 mb-8">
                    {/* Row 1: Digital Products + No hidden fees */}
                    <div className="grid grid-cols-12 gap-4">
                      {/* Digital Products - auto-sized to content */}
                      <div className="col-span-12 md:col-span-7">
                        <Parallax 
                          translateX={[0, -80]}
                          translateY={[0, -30]}
                          rotate={[0, -10]}
                          startScroll={100}
                          endScroll={800}
                        >
                          <div 
                            className="hero-card-animate"
                            style={{
                              animation: 'heroCardEntry 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both',
                              '--from-x': '-60px',
                              '--from-y': '-40px',
                              '--from-rotate': '-8deg'
                            } as React.CSSProperties}
                          >
                            <div className="hero-neumorphic-card-split">
                              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display neumorphic-text-3d">
                                <span className="plastic-tube-text">Digital Products</span>
                              </h1>
                            </div>
                          </div>
                        </Parallax>
                      </div>
                      {/* No hidden fees - fills remainder */}
                      <div className="col-span-12 md:col-span-5">
                        <Parallax 
                          translateX={[0, 60]}
                          translateY={[0, -30]}
                          rotate={[0, 8]}
                          startScroll={100}
                          endScroll={800}
                        >
                          <div 
                            className="hero-card-animate"
                            style={{
                              animation: 'heroCardEntry 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both',
                              '--from-x': '40px',
                              '--from-y': '-30px',
                              '--from-rotate': '5deg'
                            } as React.CSSProperties}
                          >
                            <div className="hero-neumorphic-card-split text-center h-full flex flex-col justify-center">
                              <Icon name="block" className="text-4xl mb-3 text-bronze" />
                              <p className="text-base text-text-secondary font-medium">No hidden fees</p>
                            </div>
                          </div>
                        </Parallax>
                      </div>
                    </div>

                    {/* Row 2: Built Right + No drag-outs */}
                    <div className="grid grid-cols-12 gap-4">
                      {/* Built Right - auto-sized to content */}
                      <div className="col-span-12 md:col-span-6">
                        <Parallax 
                          translateX={[0, -60]}
                          translateY={[0, -20]}
                          rotate={[0, -5]}
                          startScroll={100}
                          endScroll={800}
                        >
                          <div 
                            className="hero-card-animate"
                            style={{
                              animation: 'heroCardEntry 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both',
                              '--from-x': '-40px',
                              '--from-y': '-20px',
                              '--from-rotate': '-5deg'
                            } as React.CSSProperties}
                          >
                            <div className="hero-neumorphic-card-split">
                              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display neumorphic-text-3d">
                                <span className="plastic-tube-text">Built Right</span>
                              </h1>
                            </div>
                          </div>
                        </Parallax>
                      </div>
                      {/* No drag-outs - fills remainder */}
                      <div className="col-span-12 md:col-span-6">
                        <Parallax 
                          translateX={[0, 80]}
                          translateY={[0, -20]}
                          rotate={[0, 10]}
                          startScroll={100}
                          endScroll={800}
                        >
                          <div 
                            className="hero-card-animate"
                            style={{
                              animation: 'heroCardEntry 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both',
                              '--from-x': '50px',
                              '--from-y': '-20px',
                              '--from-rotate': '8deg'
                            } as React.CSSProperties}
                          >
                            <div className="hero-neumorphic-card-split text-center h-full flex flex-col justify-center">
                              <Icon name="schedule" className="text-4xl mb-3 text-sage-green" />
                              <p className="text-base text-text-secondary font-medium">No drag-outs</p>
                            </div>
                          </div>
                        </Parallax>
                      </div>
                    </div>

                    {/* Row 3: Delivered Fast + No vendor lock-in */}
                    <div className="grid grid-cols-12 gap-4">
                      {/* Delivered Fast - auto-sized to content */}
                      <div className="col-span-12 md:col-span-8">
                        <Parallax 
                          translateX={[0, -50]}
                          translateY={[0, -10]}
                          rotate={[0, -3]}
                          startScroll={100}
                          endScroll={800}
                        >
                          <div 
                            className="hero-card-animate"
                            style={{
                              animation: 'heroCardEntry 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both',
                              '--from-x': '-30px',
                              '--from-y': '-10px',
                              '--from-rotate': '-3deg'
                            } as React.CSSProperties}
                          >
                            <div className="hero-neumorphic-card-split">
                              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display neumorphic-text-3d">
                                <span className="plastic-tube-text">Delivered Fast</span>
                              </h1>
                            </div>
                          </div>
                        </Parallax>
                      </div>
                      {/* No vendor lock-in - fills remainder */}
                      <div className="col-span-12 md:col-span-4">
                        <Parallax 
                          translateX={[0, 70]}
                          translateY={[0, -10]}
                          rotate={[0, 5]}
                          startScroll={100}
                          endScroll={800}
                        >
                          <div 
                            className="hero-card-animate"
                            style={{
                              animation: 'heroCardEntry 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s both',
                              '--from-x': '60px',
                              '--from-y': '-10px',
                              '--from-rotate': '3deg'
                            } as React.CSSProperties}
                          >
                            <div className="hero-neumorphic-card-split text-center h-full flex flex-col justify-center">
                              <Icon name="lock_open" className="text-4xl mb-3 text-salmon-pink" />
                              <p className="text-base text-text-secondary font-medium">No vendor lock-in</p>
                            </div>
                          </div>
                        </Parallax>
                      </div>
                    </div>

                    {/* Row 4: Description - Full width */}
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-12">
                        <Parallax 
                          translateY={[0, 20]}
                          startScroll={100}
                          endScroll={800}
                        >
                          <div 
                            className="hero-card-animate"
                            style={{
                              animation: 'heroCardEntry 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.7s both',
                              '--from-x': '0px',
                              '--from-y': '40px',
                              '--from-rotate': '0deg'
                            } as React.CSSProperties}
                          >
                            <div className="hero-neumorphic-card-split text-center">
                              <p className="text-lg sm:text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto">
                                We build websites and apps that work <span className="matter-plastic-light">exactly as promised</span>,
                                delivered exactly when promised.
                              </p>
                            </div>
                          </div>
                        </Parallax>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons - Animate in from bottom */}
                  <div className="flex gap-4 flex-wrap justify-center">
                    <Parallax 
                      translateX={[0, -50]}
                      translateY={[0, 25]}
                      startScroll={100}
                      endScroll={800}
                    >
                      <div 
                        style={{
                          animation: 'heroCardEntry 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.8s both',
                          '--from-x': '-30px',
                          '--from-y': '40px',
                          '--from-rotate': '0deg'
                        } as React.CSSProperties}
                      >
                        <NeumorphicButton>
                          Get Your Free Prototype
                        </NeumorphicButton>
                      </div>
                    </Parallax>
                    
                    <Parallax 
                      translateX={[0, 50]}
                      translateY={[0, 25]}
                      startScroll={100}
                      endScroll={800}
                    >
                      <div 
                        style={{
                          animation: 'heroCardEntry 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.9s both',
                          '--from-x': '30px',
                          '--from-y': '40px',
                          '--from-rotate': '0deg'
                        } as React.CSSProperties}
                      >
                        <NeumorphicButton>
                          See Our Approach
                        </NeumorphicButton>
                      </div>
                    </Parallax>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services Stacked Deck Animation */}
          <section 
            ref={containerRef}
            className="scroll-snap-section min-h-screen py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-12 flex items-center"
          >
            <div className="max-w-7xl mx-auto w-full">
              <div className="transform scale-75 origin-center" style={{ overflow: 'visible' }}>
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-display neumorphic-text-3d mb-6">
                    Products That <span className="plastic-tube-text">Work</span>, Not Projects That Drag On
                  </h2>
                  <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
                    We build lean but future-proof. Every project starts minimal but architected for easy expansion. 
                    No rebuilds needed when you want to add features later.
                  </p>
                </div>
                
                <div className="relative h-96 flex items-center justify-center">
                  {services.map((service, idx) => {
                    const translateY = progress * idx * 180
                    const rotateX = progress * 10
                    const scale = 1 - progress * idx * 0.05
                    const zIndex = 3 - idx
                    
                    return (
                      <div
                        key={idx}
                        className="absolute transition-transform duration-75 ease-out"
                        style={{
                          transform: `translateY(${translateY}px) rotateX(${rotateX}deg) scale(${scale})`,
                          zIndex: zIndex,
                        }}
                      >
                        <ServiceStackCard service={service} index={idx} />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Process Section - Regular Layout */}
          <section className="scroll-snap-section min-h-screen py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-12 flex items-center">
            <div className="max-w-7xl mx-auto w-full">
              <div className="transform scale-75 origin-center" style={{ overflow: 'visible' }}>
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start md:items-center">
                  <Parallax translateY={[-15, 15]}>
                    <div>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display neumorphic-text-3d mb-6">
                        Your Journey From <span className="plastic-tube-text">Concept To Launch</span>
                      </h2>
                      <p className="text-lg md:text-xl text-text-secondary">
                        We've designed a streamlined process that gets your project from idea to reality 
                        with exceptional speed and quality, starting with a completely free prototype.
                      </p>
                    </div>
                  </Parallax>
                  
                  <div className="space-y-6">
                    {processSteps.map((step, idx) => (
                      <Parallax 
                        key={idx}
                        translateX={idx % 2 === 0 ? [-15, 0] : [15, 0]}
                      >
                        <ProcessCard step={step} index={idx} />
                      </Parallax>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Different Section - Grid Layout */}
          <section className="scroll-snap-section min-h-screen py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-12 flex items-center">
            <div className="max-w-7xl mx-auto w-full">
              <div className="transform scale-75 origin-center" style={{ overflow: 'visible' }}>
                <Parallax translateY={[-20, 10]}>
                  <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display neumorphic-text-3d mb-6">
                      Why We're <span className="plastic-tube-text">Different</span>
                    </h2>
                    <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
                      Most agencies want to keep you dependent. We want to set you free.
                    </p>
                  </div>
                </Parallax>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {whyDifferentItems.map((item, idx) => (
                    <Parallax 
                      key={idx}
                      translateY={[20 + idx * 5, -10 - idx * 2]}
                      easing="easeOutQuad"
                    >
                      <WhyDifferentCard item={item} index={idx} />
                    </Parallax>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
        <Footer />
        
        {/* Debug Tool - only shows in development or when debug=scroll is in URL */}
        <ScrollDebugTool />
      </main>
    </ParallaxProvider>
  )
}

// Service Stack Card Component
function ServiceStackCard({ service, index }: { service: any, index: number }) {
  const gradients = [
    "bg-gradient-to-br from-[#e8d5f2] to-[#d0e8e3]",
    "bg-gradient-to-br from-[#d0e8e3] to-[#fce4d6]", 
    "bg-gradient-to-br from-[#fce4d6] to-[#d5e3f0]"
  ]
  
  return (
    <NeumorphicCard className={`w-80 h-48 ${gradients[index % gradients.length]}`}>
      <div className="text-center p-6">
        <Icon name={service.icon} className="text-4xl text-text-primary mb-3" />
        <h3 className="text-xl font-display neumorphic-text-3d mb-3">{service.title}</h3>
        <p className="text-sm text-text-secondary line-clamp-3">{service.description}</p>
      </div>
    </NeumorphicCard>
  )
}

// Process Card Component  
function ProcessCard({ step, index }: { step: any, index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true)
    }, (index + 1) * 300)

    return () => clearTimeout(timer)
  }, [index])

  return (
    <div className={`card-solution4 ${isExpanded ? 'expanded' : ''}`}>
      <div className="icon-neumorphic">
        <Icon name={step.icon} />
      </div>
      <div className="content-solution4">
        <h3 className="text-lg font-display neumorphic-text-3d mb-2">
          {step.title}
        </h3>
        <p className="text-sm text-text-secondary">
          {step.fullText}
        </p>
      </div>
    </div>
  )
}

// Why Different Card Component
function WhyDifferentCard({ item, index }: { item: any, index: number }) {
  return (
    <NeumorphicCard className="h-full">
      <div className="text-center">
        <Icon name={item.icon} className="text-4xl text-text-primary mb-4" />
        <h3 className="text-xl font-display neumorphic-text-3d mb-3">
          {item.title}
        </h3>
        <p className="text-text-secondary">
          {item.description}
        </p>
      </div>
    </NeumorphicCard>
  )
}