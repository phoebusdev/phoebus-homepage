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

// Pricing tiers data
const pricingTiers = [
  {
    title: "Starter",
    price: "$15,000",
    period: "Fixed Price",
    description: "Perfect for small businesses and MVPs. Complete web application with essential features.",
    features: [
      "Responsive web application",
      "User authentication",
      "Admin dashboard",
      "Database integration",
      "Basic analytics",
      "Email notifications",
      "Mobile optimized",
      "SSL security",
      "3 months support"
    ],
    popular: false,
    color: "bg-gradient-to-br from-[#e8d5f2] to-[#d0e8e3]"
  },
  {
    title: "Professional",
    price: "$35,000",
    period: "Fixed Price",
    description: "Advanced features for growing businesses. SaaS platforms with subscription management.",
    features: [
      "Everything in Starter",
      "Multi-tenant architecture",
      "Subscription billing",
      "Advanced analytics",
      "API development",
      "Third-party integrations",
      "Real-time features",
      "Performance optimization",
      "6 months support",
      "Priority updates"
    ],
    popular: true,
    color: "bg-gradient-to-br from-[#d0e8e3] to-[#fce4d6]"
  },
  {
    title: "Enterprise",
    price: "Custom",
    period: "Quote",
    description: "Large-scale applications with custom requirements. White-glove service and ongoing support.",
    features: [
      "Everything in Professional",
      "Custom architecture",
      "Dedicated team",
      "Advanced security",
      "Compliance ready",
      "Load balancing",
      "Disaster recovery",
      "24/7 monitoring",
      "12 months support",
      "Training included"
    ],
    popular: false,
    color: "bg-gradient-to-br from-[#fce4d6] to-[#d5e3f0]"
  }
]

// FAQ data
const faqs = [
  {
    question: "What's included in the fixed price?",
    answer: "Everything needed to build and launch your product: design, development, testing, deployment, and initial support. No hidden fees or surprise costs."
  },
  {
    question: "How long does development take?",
    answer: "Most projects are completed within 4-12 weeks depending on complexity. We provide detailed timelines during the discovery phase."
  },
  {
    question: "Do you provide ongoing maintenance?",
    answer: "Yes, we include support periods with all packages. After that, you own everything and can maintain it yourself or hire us for ongoing work."
  },
  {
    question: "What if I need changes during development?",
    answer: "Minor adjustments are included. Major scope changes are handled through clear change requests with transparent pricing."
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

export default function PricingPage() {
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
                  <span className="plastic-tube-text">Pricing</span>
                </h1>
                <p className="text-lg sm:text-xl text-text-secondary max-w-4xl mx-auto mb-8">
                  Transparent pricing with no surprises. Fixed costs, clear timelines.
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
        <Footer />

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
                        <span className="plastic-tube-text">Transparent Pricing</span>
                      </h1>
                      <p className="text-xl sm:text-2xl text-text-secondary max-w-3xl mx-auto mb-8">
                        No surprises, no hidden fees. <span className="matter-plastic-light">Fixed pricing</span> for 
                        fixed scope with <span className="matter-plastic-light">clear timelines</span>. 
                        You know exactly what you'll pay before we start.
                      </p>
                      <div className="flex gap-4 flex-wrap justify-center">
                        <NeumorphicButton>
                          Get Free Quote
                        </NeumorphicButton>
                        <NeumorphicButton>
                          Book Consultation
                        </NeumorphicButton>
                      </div>
                    </div>
                  </div>
                </Parallax>
              </div>
            </div>
          </section>

          {/* Pricing Tiers - Stacked Deck Animation */}
          <section 
            ref={containerRef}
            className="scroll-snap-section min-h-screen py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-12 flex items-center"
          >
            <div className="max-w-7xl mx-auto w-full">
              <div className="transform scale-75 origin-center" style={{ overflow: 'visible' }}>
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-display neumorphic-text-3d mb-6">
                    Choose Your <span className="plastic-tube-text">Package</span>
                  </h2>
                  <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
                    Each package includes everything you need from design to deployment. 
                    All prices are fixed with no ongoing fees.
                  </p>
                </div>
                
                <div className="relative h-96 flex items-center justify-center">
                  {pricingTiers.map((tier, idx) => {
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
                        <PricingCard tier={tier} index={idx} />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="scroll-snap-section min-h-screen py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-12 flex items-center">
            <div className="max-w-5xl mx-auto w-full">
              <div className="transform scale-75 origin-center">
                <Parallax translateY={[-20, 10]}>
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display neumorphic-text-3d mb-6">
                      Frequently Asked <span className="plastic-tube-text">Questions</span>
                    </h2>
                    <p className="text-lg md:text-xl text-text-secondary">
                      Everything you need to know about our pricing and process.
                    </p>
                  </div>
                </Parallax>
                
                <div className="space-y-6">
                  {faqs.map((faq, idx) => (
                    <Parallax 
                      key={idx}
                      translateY={[20 + idx * 5, -10]}
                      easing="easeOutQuad"
                    >
                      <FAQCard faq={faq} index={idx} />
                    </Parallax>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </main>
    </ParallaxProvider>
  )
}

// Pricing Card Component
function PricingCard({ tier, index }: { tier: any, index: number }) {
  return (
    <NeumorphicCard className={`w-80 h-64 ${tier.color} ${tier.popular ? 'ring-2 ring-accent-sage' : ''}`}>
      <div className="text-center p-6 relative">
        {tier.popular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent-sage text-white px-3 py-1 rounded-full text-xs font-display">
            Most Popular
          </div>
        )}
        <h3 className="text-xl font-display neumorphic-text-3d mb-2">{tier.title}</h3>
        <div className="text-3xl font-bold text-text-primary mb-1">{tier.price}</div>
        <div className="text-sm text-text-secondary mb-3">{tier.period}</div>
        <p className="text-xs text-text-secondary line-clamp-3 mb-4">{tier.description}</p>
        <div className="text-xs text-text-secondary">
          {tier.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-center justify-center mb-1">
              <Icon name="check" className="text-accent-sage mr-1" style={{ fontSize: '12px' }} />
              {feature}
            </div>
          ))}
          <div className="text-accent-sage font-display">
            +{tier.features.length - 3} more features
          </div>
        </div>
      </div>
    </NeumorphicCard>
  )
}

// FAQ Card Component
function FAQCard({ faq, index }: { faq: any, index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <NeumorphicCard className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-display text-text-primary">{faq.question}</h3>
          <Icon 
            name={isOpen ? "expand_less" : "expand_more"} 
            className="text-text-secondary transition-transform duration-200"
          />
        </div>
        {isOpen && (
          <div className="mt-4 pt-4 border-t border-shadow-dark">
            <p className="text-text-secondary">{faq.answer}</p>
          </div>
        )}
      </div>
    </NeumorphicCard>
  )
}