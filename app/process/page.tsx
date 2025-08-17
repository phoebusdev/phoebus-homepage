'use client'

import { NeumorphicButton } from '@/components/NeumorphicButton/NeumorphicButton'
import { NeumorphicCard } from '@/components/NeumorphicCard/NeumorphicCard'
import { Navigation } from '@/components/Navigation/Navigation'
import { Footer } from '@/components/Footer/Footer'
import { Icon } from '@/components/Icon/Icon'
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

// Process steps data for stacked deck
const processSteps = [
  {
    number: "1",
    title: "Discovery & Strategy",
    description: "We start by understanding your vision, goals, and technical requirements. This phase includes stakeholder interviews, technical assessments, and project scoping.",
    icon: "search",
    color: "bg-gradient-to-br from-[#e8d5f2] to-[#d0e8e3]"
  },
  {
    number: "2", 
    title: "Design & Prototyping",
    description: "Our team creates detailed wireframes, user experience flows, and interactive prototypes. We validate concepts early to ensure optimal user journeys.",
    icon: "design_services",
    color: "bg-gradient-to-br from-[#d0e8e3] to-[#fce4d6]"
  },
  {
    number: "3",
    title: "Development & Testing",
    description: "We build your product using modern technologies and best practices. Continuous testing ensures reliability, performance, and security throughout development.",
    icon: "code",
    color: "bg-gradient-to-br from-[#fce4d6] to-[#d5e3f0]"
  },
  {
    number: "4",
    title: "Launch & Support",
    description: "We deploy your product and provide comprehensive handover documentation. Ongoing support ensures smooth operations and continuous improvement.",
    icon: "rocket_launch",
    color: "bg-gradient-to-br from-[#d5e3f0] to-[#f2d5de]"
  }
]

// Custom hook for stacked deck animation
function useStackedDeckAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
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
  }, [])

  return { containerRef, progress }
}

export default function ProcessPage() {
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
        <Footer />
        <div className="relative z-10">
          <section className="relative pt-4 pb-12 md:pt-6 md:pb-16 lg:pt-8 lg:pb-20 px-4 w-full">
            <div className="max-w-6xl mx-auto w-full">
              <div className="hero-neumorphic-card text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-relaxed font-display break-words neumorphic-text-3d mb-4">
                  <span className="plastic-tube-text">Our Process</span>
                </h1>
                <p className="text-lg sm:text-xl text-text-secondary max-w-4xl mx-auto mb-8">
                  A refined development process that delivers exceptional results.
                </p>
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
        <Footer />

        {/* Parallax Background Layer */}
        <Parallax 
          translateY={[-20, 20]}
          className="absolute inset-0 z-0"
        >
          <div className="w-full h-[120vh] bg-gradient-to-br from-[rgba(232,213,242,0.03)] via-[rgba(208,232,227,0.03)] to-[rgba(252,228,214,0.02)]" />
        </Parallax>

        <div className="relative z-10">
          {/* Hero Section */}
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
                        <span className="plastic-tube-text">Our Process</span>
                      </h1>
                      <p className="text-xl sm:text-2xl text-text-secondary max-w-3xl mx-auto mb-8">
                        A <span className="matter-plastic-light">refined development process</span> that 
                        delivers exceptional results through proven methodologies and transparent collaboration.
                      </p>
                      <div className="flex gap-4 flex-wrap justify-center">
                        <NeumorphicButton>
                          Start Your Project
                        </NeumorphicButton>
                        <NeumorphicButton>
                          View Timeline
                        </NeumorphicButton>
                      </div>
                    </div>
                  </div>
                </Parallax>
              </div>
            </div>
          </section>

          {/* Stacked Deck Animation */}
          <section 
            ref={containerRef}
            className="scroll-snap-section min-h-screen py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-12 flex items-center"
          >
            <div className="max-w-5xl mx-auto w-full">
              <div className="transform scale-75 origin-center">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-display neumorphic-text-3d mb-6">
                    Our <span className="plastic-tube-text">Four-Phase</span> Approach
                  </h2>
                  <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
                    Each phase builds upon the last, creating a comprehensive development journey
                    from initial concept to successful launch.
                  </p>
                </div>
                
                <div className="relative h-96 flex items-center justify-center">
                  {processSteps.map((step, idx) => {
                    // Calculate transforms based on progress and card index
                    const translateY = progress * idx * 180
                    const rotateX = progress * 10
                    const scale = 1 - progress * idx * 0.05
                    const zIndex = 4 - idx // Inverse z-index (top card = highest)
                    
                    return (
                      <div
                        key={idx}
                        className="absolute transition-transform duration-75 ease-out"
                        style={{
                          transform: `translateY(${translateY}px) rotateX(${rotateX}deg) scale(${scale})`,
                          zIndex: zIndex,
                        }}
                      >
                        <StackedCard step={step} index={idx} />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Cascading Cards Animation */}
          <CascadingCardsSection />

          {/* Enhanced Stacked Deck Animation */}
          <EnhancedStackedDeckSection />

        </div>
      </main>
    </ParallaxProvider>
  )
}

// StackedCard Component
function StackedCard({ step, index }: { step: any, index: number }) {
  return (
    <NeumorphicCard className={`w-80 h-48 ${step.color}`}>
      <div className="text-center p-6">
        <div className="text-4xl font-bold text-text-primary mb-2">{step.number}</div>
        <h3 className="text-xl font-display neumorphic-text-3d mb-3">{step.title}</h3>
        <p className="text-sm text-text-secondary">{step.description}</p>
      </div>
    </NeumorphicCard>
  )
}

// Cascading Cards Section with custom scroll trigger animation
function CascadingCardsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
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
  }, [])

  const cascadingContent = {
    header: {
      title: "End-to-End Excellence",
      subtitle: "From concept to launch, we handle every aspect of your digital product development"
    },
    leftCard: {
      title: "Technical Excellence",
      description: "Modern architecture, clean code, comprehensive testing, and performance optimization ensure your product scales effortlessly.",
      features: ["Scalable Architecture", "Clean Code Standards", "Automated Testing", "Performance Monitoring"]
    },
    rightCard: {
      title: "Business Focus", 
      description: "We align every technical decision with your business goals, ensuring the final product drives real value and measurable results.",
      features: ["ROI Optimization", "Market Validation", "User Analytics", "Growth Strategy"]
    },
    benefits: [
      "Faster Time to Market",
      "Reduced Development Risk", 
      "Scalable Architecture",
      "Ongoing Support",
      "Complete Ownership"
    ]
  }

  return (
    <section 
      ref={sectionRef}
      className="scroll-snap-section min-h-screen py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-12 flex items-center"
    >
      <div className="max-w-5xl mx-auto w-full">
        <div className="transform scale-75 origin-center">
          {/* Header Card - positioned at top center */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display neumorphic-text-3d mb-6">
              {cascadingContent.header.title}
            </h2>
            <p className="text-lg md:text-xl text-text-secondary">
              {cascadingContent.header.subtitle}
            </p>
          </div>
          
          {/* Two Content Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Left Card */}
            <div
              className="transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(${(1 - progress) * (-window.innerWidth - 100)}px)`,
              }}
            >
              <CascadingCard content={cascadingContent.leftCard} />
            </div>
            
            {/* Right Card */}
            <div
              className="transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(${(1 - progress) * (window.innerWidth + 100)}px)`,
              }}
            >
              <CascadingCard content={cascadingContent.rightCard} />
            </div>
          </div>
          
          {/* 5 Benefit Cards with varied movements */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {cascadingContent.benefits.map((benefit, idx) => {
              // Create different movement patterns for each benefit card
              const movements = [
                `translateY(${(1 - progress) * 120}px) rotate(${(1 - progress) * -10}deg)`, // From bottom with rotation
                `translateX(${(1 - progress) * -80}px) translateY(${(1 - progress) * 60}px)`, // From bottom-left
                `translateY(${(1 - progress) * 100}px) scale(${0.5 + progress * 0.5})`, // From bottom with scale
                `translateX(${(1 - progress) * 80}px) translateY(${(1 - progress) * 60}px)`, // From bottom-right
                `translateY(${(1 - progress) * 140}px) rotate(${(1 - progress) * 15}deg)` // From bottom with opposite rotation
              ]
              
              return (
                <div
                  key={idx}
                  className="transition-transform duration-700 ease-out"
                  style={{
                    transform: movements[idx],
                    transitionDelay: `${idx * 100}ms` // Stagger the animations
                  }}
                >
                  <BenefitCard benefit={benefit} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// Individual card components
function CascadingCard({ content }: { content: any }) {
  return (
    <NeumorphicCard className="p-6 h-full">
      <h3 className="text-xl font-display neumorphic-text-3d mb-4">{content.title}</h3>
      <p className="text-text-secondary mb-4">{content.description}</p>
      <ul className="space-y-2">
        {content.features.map((feature: string, idx: number) => (
          <li key={idx} className="flex items-center text-sm">
            <Icon name="arrow_forward" className="text-accent-sage mr-2 text-xs" />
            {feature}
          </li>
        ))}
      </ul>
    </NeumorphicCard>
  )
}

function BenefitCard({ benefit }: { benefit: string }) {
  return (
    <NeumorphicCard className="p-4 text-center h-full">
      <div className="text-sm font-display text-text-primary">{benefit}</div>
    </NeumorphicCard>
  )
}

// Enhanced Stacked Deck Section
function EnhancedStackedDeckSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
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
  }, [])

  const techStackCards = [
    {
      title: "Frontend",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      icon: "computer",
      color: "bg-gradient-to-br from-[#e8d5f2] to-[#d0e8e3]"
    },
    {
      title: "Backend", 
      technologies: ["Node.js", "Python", "PostgreSQL", "Redis"],
      icon: "storage",
      color: "bg-gradient-to-br from-[#d0e8e3] to-[#fce4d6]"
    },
    {
      title: "Database",
      technologies: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch"],
      icon: "database",
      color: "bg-gradient-to-br from-[#fce4d6] to-[#d5e3f0]"
    },
    {
      title: "DevOps",
      technologies: ["AWS", "Docker", "Kubernetes", "GitHub Actions"],
      icon: "cloud",
      color: "bg-gradient-to-br from-[#d5e3f0] to-[#f2d5de]"
    },
    {
      title: "Testing",
      technologies: ["Jest", "Cypress", "Playwright", "Testing Library"],
      icon: "bug_report",
      color: "bg-gradient-to-br from-[#f2d5de] to-[#e8d5f2]"
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="scroll-snap-section min-h-screen py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-12 flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="transform scale-75 origin-center" style={{ overflow: 'visible' }}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display neumorphic-text-3d mb-6">
              Technology <span className="plastic-tube-text">Stack</span>
            </h2>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
              Our carefully selected technology stack ensures scalability, performance, and maintainability
              across every layer of your application.
            </p>
          </div>
          
          <div className="relative h-96 w-full flex items-center justify-center">
            {techStackCards.map((card, idx) => {
              // Calculate transforms for horizontal spread
              const translateX = progress * (idx - 2) * 200 // Spread horizontally: center card stays, others move left/right
              const rotation = progress * (idx % 2 === 0 ? -5 : 5) // Alternating rotation
              const scale = 1 + progress * idx * 0.02 // Scale increase as they spread
              const baseScale = 1 - idx * 0.05 // Each card 95% size of the one below when stacked
              const finalScale = baseScale * scale
              const zIndex = 5 - idx // Higher z-index for cards that should be on top when stacked
              
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
                  <EnhancedStackedCard card={card} index={idx} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// Enhanced Stacked Card Component
function EnhancedStackedCard({ card, index }: { card: any, index: number }) {
  return (
    <NeumorphicCard className={`w-80 h-56 ${card.color}`}>
      <div className="text-center p-6">
        <Icon name={card.icon} className="text-4xl text-text-primary mb-3" />
        <h3 className="text-xl font-display neumorphic-text-3d mb-4">{card.title}</h3>
        <div className="grid grid-cols-2 gap-2 text-sm text-text-secondary">
          {card.technologies.map((tech: string, idx: number) => (
            <div key={idx} className="text-xs bg-white/20 rounded-lg py-1 px-2">
              {tech}
            </div>
          ))}
        </div>
      </div>
    </NeumorphicCard>
  )
}

