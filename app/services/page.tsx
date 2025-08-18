'use client'

import { NeumorphicButton } from '@/components/NeumorphicButton/NeumorphicButton'
import { NeumorphicCard } from '@/components/NeumorphicCard/NeumorphicCard'
import { Navigation } from '@/components/Navigation/Navigation'
import { Footer } from '@/components/Footer/Footer'
import { Icon } from '@/components/Icon/Icon'
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

// Detailed service offerings
const webServices = [
  {
    title: "Full-Stack Web Applications",
    icon: "language",
    description: "Complete web applications built with modern frameworks. Serverless architecture that scales effortlessly from startup to enterprise.",
    features: [
      "Next.js & React applications",
      "Node.js backend services", 
      "PostgreSQL & Redis databases",
      "AWS serverless deployment",
      "Real-time functionality",
      "Progressive Web Apps"
    ],
    pricing: "Starting at $15,000",
    timeline: "4-8 weeks"
  },
  {
    title: "E-commerce Platforms",
    icon: "shopping_cart",
    description: "Custom e-commerce solutions that convert visitors into customers. Built for performance, security, and easy management.",
    features: [
      "Stripe payment integration",
      "Inventory management",
      "Order tracking system",
      "Admin dashboard",
      "Mobile-optimized checkout",
      "SEO optimization"
    ],
    pricing: "Starting at $25,000",
    timeline: "6-10 weeks"
  },
  {
    title: "SaaS Applications",
    icon: "cloud",
    description: "Multi-tenant software platforms with subscription management, user authentication, and scalable architecture.",
    features: [
      "User authentication",
      "Subscription billing",
      "Multi-tenant architecture",
      "API development",
      "Analytics dashboard",
      "Email automation"
    ],
    pricing: "Starting at $35,000",
    timeline: "8-12 weeks"
  }
]

const mobileServices = [
  {
    title: "Native iOS Apps",
    icon: "phone_iphone",
    description: "Swift-based iOS applications optimized for performance and App Store approval. Native feel with modern design.",
    features: [
      "Swift & SwiftUI development",
      "Core Data integration",
      "Push notifications",
      "In-app purchases",
      "App Store optimization",
      "TestFlight beta testing"
    ],
    pricing: "Starting at $20,000",
    timeline: "6-10 weeks"
  },
  {
    title: "Cross-Platform Apps",
    icon: "devices",
    description: "React Native applications that work seamlessly on both iOS and Android. One codebase, two platforms.",
    features: [
      "React Native development",
      "Shared business logic",
      "Native performance",
      "Platform-specific UI",
      "Over-the-air updates",
      "Code sharing with web"
    ],
    pricing: "Starting at $30,000",
    timeline: "8-12 weeks"
  }
]

const specialtyServices = [
  {
    title: "API Development",
    icon: "api",
    description: "RESTful and GraphQL APIs built for performance and reliability. Complete documentation and testing included.",
    features: [
      "REST & GraphQL APIs",
      "Authentication & authorization",
      "Rate limiting",
      "Comprehensive testing",
      "API documentation",
      "Monitoring & analytics"
    ],
    pricing: "Starting at $10,000",
    timeline: "3-6 weeks"
  },
  {
    title: "DevOps & Infrastructure",
    icon: "settings",
    description: "Complete deployment pipelines, monitoring, and infrastructure management. Focus on your code, we handle the rest.",
    features: [
      "CI/CD pipelines",
      "AWS infrastructure",
      "Database management",
      "Security hardening",
      "Performance monitoring",
      "Backup strategies"
    ],
    pricing: "Starting at $8,000",
    timeline: "2-4 weeks"
  },
  {
    title: "Consulting & Strategy",
    icon: "lightbulb",
    description: "Technical consulting to guide your project decisions. Architecture reviews, technology selection, and team mentoring.",
    features: [
      "Architecture planning",
      "Technology selection",
      "Code reviews",
      "Team mentoring",
      "Performance audits",
      "Security assessments"
    ],
    pricing: "$200/hour",
    timeline: "Ongoing"
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

export default function ServicesPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

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
          <section className="relative pt-4 pb-12 md:pt-6 md:pb-16 lg:pt-8 lg:pb-20 px-4 w-full">
            <div className="max-w-6xl mx-auto w-full">
              <div className="hero-neumorphic-card text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-relaxed font-display break-words neumorphic-text-3d mb-4">
                  <span className="plastic-tube-text">Our Services</span>
                </h1>
                <p className="text-lg sm:text-xl text-text-secondary max-w-4xl mx-auto mb-8">
                  Complete digital solutions crafted with precision and delivered with transparency.
                </p>
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

        {/* Parallax Background Layer */}
        <Parallax 
          translateY={[-20, 20]}
          className="absolute inset-0 z-0"
        >
          <div className="w-full h-[120vh] bg-gradient-to-br from-[rgba(232,213,242,0.03)] via-[rgba(208,232,227,0.03)] to-[rgba(252,228,214,0.02)]" />
        </Parallax>

        <div className="relative z-10">
          {/* Hero Section - No magnetic attraction */}
          <section className="min-h-screen py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-12 flex items-center">
            <div className="max-w-5xl mx-auto w-full">
              <div className="transform scale-75 origin-center">
                <Parallax 
                  translateY={[-30, 30]} 
                  scale={[1.05, 0.95]}
                >
                  <div className="hero-neumorphic-card text-center">
                    <div className="relative z-10">
                      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed font-display break-words neumorphic-text-3d mb-6">
                        <span className="plastic-tube-text">Our Services</span>
                      </h1>
                      <p className="text-xl sm:text-2xl text-text-secondary max-w-3xl mx-auto mb-8">
                        Complete digital solutions crafted with <span className="matter-plastic-light">precision</span> and 
                        delivered with <span className="matter-plastic-light">transparency</span>. From concept to deployment, 
                        we build products that work exactly as promised.
                      </p>
                      <div className="flex gap-4 flex-wrap justify-center">
                        <NeumorphicButton>
                          Get Free Consultation
                        </NeumorphicButton>
                        <NeumorphicButton>
                          View Pricing
                        </NeumorphicButton>
                      </div>
                    </div>
                  </div>
                </Parallax>
              </div>
            </div>
          </section>

          {/* Web Development Services - Stacked Deck Animation */}
          <WebDevelopmentStackedSection />

          {/* Mobile Development Services - Cascading Cards */}
          <MobileCascadingSection />

          {/* Specialty Services - Enhanced Stacked Deck */}
          <SpecialtyEnhancedSection />
        </div>
        <Footer />
        <Footer />
      </main>
    </ParallaxProvider>
  )
}

// Web Development Section with Stacked Deck Animation
function WebDevelopmentStackedSection() {
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
              Web <span className="plastic-tube-text">Development</span>
            </h2>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
              Modern web applications built with cutting-edge technology. 
              Scalable, secure, and designed for growth.
            </p>
          </div>
          
          <div className="relative h-96 flex items-center justify-center">
            {webServices.map((service, idx) => {
              // Calculate transforms based on progress and card index
              const translateY = progress * idx * 180
              const rotateX = progress * 10
              const scale = 1 - progress * idx * 0.05
              const zIndex = 3 - idx // Inverse z-index (top card = highest)
              
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
  )
}

// Mobile Development Section with Cascading Animation
function MobileCascadingSection() {
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
      
      // Calculate progress based on section position
      const triggerPoint = viewportHeight * 0.8
      const endPoint = viewportHeight * 0.2
      
      // Progress from 0 to 1 as section moves from triggerPoint to endPoint
      const rawProgress = Math.max(0, Math.min(1, (triggerPoint - rect.top) / (triggerPoint - endPoint)))
      
      // Apply smooth easing
      const easedProgress = rawProgress * rawProgress * (3 - 2 * rawProgress)
      
      setProgress(easedProgress)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mounted])

  return (
    <section 
      ref={sectionRef}
      className="scroll-snap-section min-h-screen py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-12 flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="transform scale-75 origin-center" style={{ overflow: 'visible' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display neumorphic-text-3d mb-6">
              Mobile <span className="plastic-tube-text">Applications</span>
            </h2>
            <p className="text-lg md:text-xl text-text-secondary">
              Native and cross-platform mobile apps that deliver exceptional user experiences 
              and perform flawlessly across devices.
            </p>
          </div>
          
          {/* Two Content Cards sliding from sides */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mobileServices.map((service, idx) => (
              <div
                key={idx}
                className="transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(${(1 - (mounted ? progress : 0)) * (idx === 0 ? -1200 : 1200)}px)`,
                }}
              >
                <DetailedServiceCard {...service} index={idx} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Specialty Services Section with Enhanced Stacked Deck
function SpecialtyEnhancedSection() {
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
      
      // Calculate progress based on section position - start later so cards are visible stacked
      const triggerPoint = viewportHeight * 0.9
      const endPoint = viewportHeight * 0.1
      
      // Progress from 0 to 1 as section moves from triggerPoint to endPoint
      const rawProgress = Math.max(0, Math.min(1, (triggerPoint - rect.top) / (triggerPoint - endPoint)))
      
      // Apply cubic-bezier bounce easing: cubic-bezier(0.68, -0.55, 0.265, 1.55)
      const t = rawProgress
      const bounceProgress = 0.68 * t * t * t + (-0.55) * 3 * t * t * (1 - t) + 0.265 * 3 * t * (1 - t) * (1 - t) + 1.55 * (1 - t) * (1 - t) * (1 - t)
      
      setProgress(Math.max(0, Math.min(1, bounceProgress)))
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    
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
              Specialty <span className="plastic-tube-text">Services</span>
            </h2>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
              Specialized technical services to support your development needs. 
              From APIs to infrastructure, we've got you covered.
            </p>
          </div>
          
          <div className="relative h-96 w-full flex items-center justify-center">
            {specialtyServices.map((service, idx) => {
              // Calculate transforms for horizontal spread
              const animProgress = mounted ? progress : 0
              const translateX = animProgress * (idx - 1) * 200 // Spread horizontally: center card stays, others move left/right
              const rotation = animProgress * (idx % 2 === 0 ? -5 : 5) // Alternating rotation
              const scale = 1 + animProgress * idx * 0.02 // Scale increase as they spread
              const baseScale = 1 - idx * 0.05 // Each card 95% size of the one below when stacked
              const finalScale = baseScale * scale
              const zIndex = 3 - idx // Higher z-index for cards that should be on top when stacked
              
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
                  <ServiceStackCard service={service} index={idx} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// Service Stack Card Component for animations
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
        <div className="mt-4 text-lg font-display text-text-primary">{service.pricing}</div>
      </div>
    </NeumorphicCard>
  )
}

// Enhanced Service Card Component with pricing and timeline
function DetailedServiceCard({ title, icon, description, features, pricing, timeline, index }: {
  title: string
  icon: string
  description: string
  features: string[]
  pricing: string
  timeline: string
  index: number
}) {
  return (
    <NeumorphicCard className="h-full">
      <div className="text-center mb-4">
        <Icon name={icon} className="text-4xl text-text-primary mb-4" />
        <h3 className="text-xl font-display neumorphic-text-3d mb-3">
          {title}
        </h3>
        <p className="text-text-secondary mb-4">
          {description}
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-display text-text-primary mb-2">Features Include:</h4>
          <ul className="text-sm text-text-secondary space-y-1">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-center">
                <Icon name="check_circle" className="text-accent-sage mr-2 text-sm" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="border-t border-shadow-dark pt-4 mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-text-secondary">Starting at:</span>
            <span className="font-display text-text-primary">{pricing}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-text-secondary">Timeline:</span>
            <span className="font-display text-text-primary">{timeline}</span>
          </div>
        </div>
      </div>
    </NeumorphicCard>
  )
}