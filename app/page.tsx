'use client'

import { NeumorphicButton } from '@/components/NeumorphicButton/NeumorphicButton'
import { NeumorphicCard } from '@/components/NeumorphicCard/NeumorphicCard'
import { ServiceCard } from '@/components/ServiceCard/ServiceCard'
import { Navigation } from '@/components/Navigation/Navigation'
import { Icon } from '@/components/Icon/Icon'
import { ScrollReference } from '@/components/ScrollReference/ScrollReference'
import { ResistanceZone } from '@/components/ResistanceZone/ResistanceZone'
import { useState, useEffect } from 'react'
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

// Custom hook for stacked deck animation (from process page)
function useStackedDeckAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      // Calculate when the animation should start (when section enters viewport)
      const triggerPoint = viewportHeight * 0.5
      const animationRange = viewportHeight * 1.5 // 1.5 viewport heights for full animation
      
      // Calculate progress based on scroll position
      const scrollFromTrigger = triggerPoint - rect.top
      const rawProgress = Math.max(0, Math.min(1, scrollFromTrigger / animationRange))
      
      // Apply smooth easing (cubic-bezier equivalent)
      const easedProgress = rawProgress * rawProgress * (3 - 2 * rawProgress)
      
      setProgress(easedProgress)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mounted])

  return { containerRef, progress: mounted ? progress : 0 }
}

// Custom hook for cascading animation
function useCascadingAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      const triggerPoint = viewportHeight * 0.8
      const endPoint = viewportHeight * 0.2
      
      const rawProgress = Math.max(0, Math.min(1, (triggerPoint - rect.top) / (triggerPoint - endPoint)))
      const easedProgress = rawProgress * rawProgress * (3 - 2 * rawProgress)
      
      setProgress(easedProgress)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mounted])

  return { sectionRef, progress: mounted ? progress : 0 }
}

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Prevent hydration mismatch by not rendering until client-side
  if (!mounted) {
    return (
      <main className="min-h-screen relative">
        <Navigation />
        <div className="relative z-10">
          {/* Static content for SSR */}
          <section className="relative pt-4 pb-12 md:pt-6 md:pb-16 lg:pt-8 lg:pb-20 px-4 w-full">
            <div className="max-w-6xl mx-auto w-full">
              <div className="hero-neumorphic-card text-center">
                <div className="relative z-10">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-relaxed font-display break-words neumorphic-text-3d mb-4">
                    <span className="plastic-tube-text">Digital Products</span>
                    <br />
                    <span className="plastic-tube-text">Built Right</span>
                    <br />
                    <span className="plastic-tube-text">Delivered Fast</span>
                  </h1>
                  <p className="text-lg sm:text-xl text-text-secondary max-w-4xl mx-auto mb-8">
                    We build websites and apps that work <span className="matter-plastic-light">exactly as promised</span>,
                    delivered exactly when promised. No hidden fees, no project drag-outs, no vendor lock-in.
                    Just clean code, clear timelines, and <span className="matter-plastic-light">complete ownership</span>.
                  </p>
                  <div className="flex gap-4 flex-wrap justify-center">
                    <NeumorphicButton>
                      Get Your Free Prototype
                    </NeumorphicButton>
                    <NeumorphicButton>
                      See Our Approach
                    </NeumorphicButton>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display neumorphic-text-3d mb-6">
                  Products That <span className="plastic-tube-text">Work</span>, Not Projects That Drag On
                </h2>
                <p className="text-lg text-text-secondary max-w-4xl mx-auto">
                  We build lean but future-proof. Every project starts minimal but architected for easy expansion. 
                  No rebuilds needed when you want to add features later.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {services.map((service, idx) => (
                  <ServiceCard
                    key={idx}
                    title={service.title}
                    description={service.description}
                    features={service.features}
                    icon={service.icon}
                    delay={String(idx + 1)}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-display neumorphic-text-3d mb-6">
                    Your Journey From <span className="plastic-tube-text">Concept To Launch</span>
                  </h2>
                  <p className="text-lg text-text-secondary">
                    We've designed a streamlined process that gets your project from idea to reality 
                    with exceptional speed and quality, starting with a completely free prototype.
                  </p>
                </div>
                <div className="space-y-6">
                  {processSteps.map((step, idx) => (
                    <ProcessCard key={idx} step={step} index={idx} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display neumorphic-text-3d mb-6">
                  Why We're <span className="plastic-tube-text">Different</span>
                </h2>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                  Most agencies want to keep you dependent. We want to set you free.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {whyDifferentItems.map((item, idx) => (
                  <WhyDifferentCard key={idx} item={item} index={idx} />
                ))}
              </div>
            </div>
          </section>
        </div>
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

        {/* Parallax Background Layer */}
        <Parallax 
          translateY={[-20, 20]}
          className="absolute inset-0 z-0"
        >
          <div className="w-full h-[120vh] bg-gradient-to-br from-[rgba(232,213,242,0.03)] via-[rgba(208,232,227,0.03)] to-[rgba(252,228,214,0.02)]" />
        </Parallax>

        <div className="relative z-10">
          {/* Hero Section - Generous side margins */}
          <section className="relative min-h-screen py-20 md:py-24 lg:py-32 px-6 md:px-8 lg:px-12 w-full flex items-center">
            <div className="max-w-5xl mx-auto w-full">
              <Parallax 
                translateY={[-30, 30]} 
                scale={[1.05, 0.95]}
              >
                <div className="hero-neumorphic-card text-center">
                  <div className="relative z-10">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed font-display break-words neumorphic-text-3d mb-6">
                      <span className="plastic-tube-text">Digital Products</span>
                      <br />
                      <span className="plastic-tube-text">Built Right</span>
                      <br />
                      <span className="plastic-tube-text">Delivered Fast</span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-text-secondary max-w-3xl mx-auto mb-8">
                      We build websites and apps that work <span className="matter-plastic-light">exactly as promised</span>,
                      delivered exactly when promised. No hidden fees, no project drag-outs, no vendor lock-in.
                      Just clean code, clear timelines, and <span className="matter-plastic-light">complete ownership</span>.
                    </p>
                    <div className="flex gap-4 flex-wrap justify-center">
                      <NeumorphicButton>
                        Get Your Free Prototype
                      </NeumorphicButton>
                      <NeumorphicButton>
                        See Our Approach
                      </NeumorphicButton>
                    </div>
                  </div>
                </div>
              </Parallax>
            </div>
          </section>

          {/* Services Section - Stacked Deck Animation */}
          <ServicesStackedSection />

          {/* Process Section - Cascading Animation */}
          <ProcessCascadingSection />

          {/* Why We're Different Section - Enhanced Stacked Deck */}
          <WhyDifferentEnhancedSection />
        </div>
        
        {/* Scroll Reference Tool */}
        <ScrollReference />
      </main>
    </ParallaxProvider>
  )
}

// Services Section with Stacked Deck Animation
function ServicesStackedSection() {
  const { containerRef, progress } = useStackedDeckAnimation()

  return (
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
                  <HomeServiceStackCard service={service} index={idx} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// Process Section with Cascading Animation
function ProcessCascadingSection() {
  const { sectionRef, progress } = useCascadingAnimation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="scroll-snap-section min-h-screen py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-12 flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="transform scale-75 origin-center" style={{ overflow: 'visible' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display neumorphic-text-3d mb-6">
              Your Journey From <span className="plastic-tube-text">Concept To Launch</span>
            </h2>
            <p className="text-lg md:text-xl text-text-secondary">
              We've designed a streamlined process that gets your project from idea to reality 
              with exceptional speed and quality, starting with a completely free prototype.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left side - description slides from left */}
            <div
              className="transition-transform duration-500 ease-out flex items-center"
              style={{
                transform: `translateX(${(1 - (mounted ? progress : 0)) * -1200}px)`,
              }}
            >
              <div>
                <h3 className="text-2xl font-display neumorphic-text-3d mb-4">
                  Streamlined <span className="plastic-tube-text">Development</span>
                </h3>
                <p className="text-text-secondary">
                  From discovery to deployment, our proven process eliminates waste and maximizes value. 
                  No surprises, no delays, just results.
                </p>
              </div>
            </div>
            
            {/* Right side - process cards slide from right */}
            <div
              className="transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(${(1 - (mounted ? progress : 0)) * 1200}px)`,
              }}
            >
              <div className="space-y-6">
                {processSteps.map((step, idx) => (
                  <ProcessCard key={idx} step={step} index={idx} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Why Different Section with Enhanced Stacked Deck
function WhyDifferentEnhancedSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      const triggerPoint = viewportHeight * 0.9
      const endPoint = viewportHeight * 0.1
      
      const rawProgress = Math.max(0, Math.min(1, (triggerPoint - rect.top) / (triggerPoint - endPoint)))
      
      // Apply cubic-bezier bounce easing
      const t = rawProgress
      const bounceProgress = 0.68 * t * t * t + (-0.55) * 3 * t * t * (1 - t) + 0.265 * 3 * t * (1 - t) * (1 - t) + 1.55 * (1 - t) * (1 - t) * (1 - t)
      
      setProgress(Math.max(0, Math.min(1, bounceProgress)))
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mounted])

  return (
    <section 
      ref={sectionRef}
      className="scroll-snap-section min-h-screen py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-12 flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="transform scale-75 origin-center" style={{ overflow: 'visible' }}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display neumorphic-text-3d mb-6">
              Why We're <span className="plastic-tube-text">Different</span>
            </h2>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
              Most agencies want to keep you dependent. We want to set you free.
            </p>
          </div>
          
          <div className="relative h-96 w-full flex items-center justify-center">
            {whyDifferentItems.map((item, idx) => {
              const translateX = (mounted ? progress : 0) * (idx - 1.5) * 200
              const rotation = (mounted ? progress : 0) * (idx % 2 === 0 ? -5 : 5)
              const scale = 1 + (mounted ? progress : 0) * idx * 0.02
              const baseScale = 1 - idx * 0.05
              const finalScale = baseScale * scale
              const zIndex = 4 - idx
              
              return (
                <div
                  key={idx}
                  className="absolute transition-transform ease-out"
                  style={{
                    transform: `translateX(${translateX}px) rotate(${rotation}deg) scale(${finalScale})`,
                    zIndex: zIndex,
                    transitionDuration: '0.5s',
                    transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                  }}
                >
                  <WhyDifferentStackCard item={item} index={idx} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// Home Service Stack Card Component
function HomeServiceStackCard({ service, index }: { service: any, index: number }) {
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

// Why Different Stack Card Component
function WhyDifferentStackCard({ item, index }: { item: any, index: number }) {
  const gradients = [
    "bg-gradient-to-br from-[#e8d5f2] to-[#d0e8e3]",
    "bg-gradient-to-br from-[#d0e8e3] to-[#fce4d6]", 
    "bg-gradient-to-br from-[#fce4d6] to-[#d5e3f0]",
    "bg-gradient-to-br from-[#d5e3f0] to-[#f2d5de]"
  ]
  
  return (
    <NeumorphicCard className={`w-80 h-48 ${gradients[index % gradients.length]}`}>
      <div className="text-center p-6">
        <Icon name={item.icon} className="text-4xl text-text-primary mb-3" />
        <h3 className="text-xl font-display neumorphic-text-3d mb-3">{item.title}</h3>
        <p className="text-sm text-text-secondary line-clamp-3">{item.description}</p>
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

