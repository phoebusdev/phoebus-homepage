'use client'

import { NeumorphicButton } from '@/components/NeumorphicButton/NeumorphicButton'
import { NeumorphicCard } from '@/components/NeumorphicCard/NeumorphicCard'
import { ServiceCard } from '@/components/ServiceCard/ServiceCard'
import { Navigation } from '@/components/Navigation/Navigation'
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

          {/* Web Development Services */}
          <section className="scroll-snap-section min-h-screen py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-12 flex items-center">
              <div className="max-w-5xl mx-auto w-full">
                <div className="transform scale-75 origin-center">
                  <Parallax translateY={[-15, 15]}>
                    <div className="text-center mb-12 md:mb-16">
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display neumorphic-text-3d mb-6">
                        Web <span className="plastic-tube-text">Development</span>
                      </h2>
                      <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
                        Modern web applications built with cutting-edge technology. 
                        Scalable, secure, and designed for growth.
                      </p>
                    </div>
                  </Parallax>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {webServices.map((service, idx) => (
                      <Parallax 
                        key={idx}
                        translateY={[30, -5]} 
                        translateX={idx % 2 === 0 ? [-5, 5] : [5, -5]}
                        className="h-full"
                      >
                        <DetailedServiceCard {...service} index={idx} />
                      </Parallax>
                    ))}
                  </div>
                </div>
              </div>
            </section>

          {/* Mobile Development Services */}
          <section className="scroll-snap-section min-h-screen py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-12 flex items-center">
              <div className="max-w-5xl mx-auto w-full">
                <div className="transform scale-75 origin-center">
                  <Parallax translateY={[-15, 15]}>
                    <div className="text-center mb-12 md:mb-16">
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display neumorphic-text-3d mb-6">
                        Mobile <span className="plastic-tube-text">Applications</span>
                      </h2>
                      <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
                        Native and cross-platform mobile apps that deliver exceptional user experiences 
                        and perform flawlessly across devices.
                      </p>
                    </div>
                  </Parallax>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                    {mobileServices.map((service, idx) => (
                      <Parallax 
                        key={idx}
                        translateY={[30, -5]} 
                        translateX={idx % 2 === 0 ? [-5, 5] : [5, -5]}
                        className="h-full"
                      >
                        <DetailedServiceCard {...service} index={idx} />
                      </Parallax>
                    ))}
                  </div>
                </div>
              </div>
            </section>

          {/* Specialty Services */}
          <section className="scroll-snap-section min-h-screen py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-12 flex items-center">
              <div className="max-w-5xl mx-auto w-full">
                <div className="transform scale-75 origin-center">
                  <Parallax translateY={[-15, 15]}>
                    <div className="text-center mb-12 md:mb-16">
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display neumorphic-text-3d mb-6">
                        Specialty <span className="plastic-tube-text">Services</span>
                      </h2>
                      <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
                        Specialized technical services to support your development needs. 
                        From APIs to infrastructure, we've got you covered.
                      </p>
                    </div>
                  </Parallax>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {specialtyServices.map((service, idx) => (
                      <Parallax 
                        key={idx}
                        translateY={[30, -5]} 
                        translateX={idx % 2 === 0 ? [-5, 5] : [5, -5]}
                        className="h-full"
                      >
                        <DetailedServiceCard {...service} index={idx} />
                      </Parallax>
                    ))}
                  </div>
                </div>
              </div>
            </section>
        </div>
      </main>
    </ParallaxProvider>
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