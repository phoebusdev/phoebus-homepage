'use client'

import { NeumorphicButton, PrototypeButton } from '@/components/NeumorphicButton/NeumorphicButton'
import { NeumorphicCard } from '@/components/NeumorphicCard/NeumorphicCard'
import { ServiceCard } from '@/components/ServiceCard/ServiceCard'
import { Navigation } from '@/components/Navigation/Navigation'
import { Icon } from '@/components/Icon/Icon'
import { useState, useEffect } from 'react'

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

// CTA benefits data
const ctaBenefits = [
  { text: "No complex contracts", icon: "✗", color: "bronze" },
  { text: "See it working first", icon: "👁", color: "sage" },
  { text: "Fixed transparent pricing", icon: "$", color: "sage" },
  { text: "You own everything", icon: "🔓", color: "sage" },
  { text: "Launch in weeks, not months", icon: "🚀", color: "sage" }
]

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section 
        className="relative z-10 pt-4 pb-12 md:pt-6 md:pb-16 lg:pt-8 lg:pb-20 px-4 w-full"
      >
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
                <PrototypeButton source="homepage-hero" intent="primary" size="lg">
                  Get Your Free Prototype
                </PrototypeButton>
                <NeumorphicButton>
                  See Our Approach
                </NeumorphicButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
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

      {/* Process Section */}
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

      {/* Why We're Different Section */}
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

      {/* Final CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display neumorphic-text-3d mb-6">
                Ready to Build Something <span className="plastic-tube-text">Real</span>?
              </h2>
              <p className="text-lg text-text-secondary mb-8">
                Start with a free prototype. See exactly what we'll build before you pay a dollar. 
                No sales calls, no surprises, just working software.
              </p>
            </div>
            <div className="space-y-3">
              {ctaBenefits.map((benefit, idx) => (
                <CTABenefitCard key={idx} benefit={benefit} index={idx} />
              ))}
            </div>
          </div>
          <div className="text-center mt-12">
            <PrototypeButton source="homepage-cta" intent="primary" size="lg">
              Get Your Free Prototype
            </PrototypeButton>
          </div>
        </div>
      </section>
    </main>
  )
}

// Process Card Component
function ProcessCard({ step, index }: { step: any, index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true)
    }, (index + 1) * 500)

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
    <div 
      className="opacity-0"
      style={{
        animation: `fadeInUp 0.6s ease forwards ${index * 0.15}s`
      }}
    >
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
    </div>
  )
}

// CTA Benefit Card Component  
function CTABenefitCard({ benefit, index }: { benefit: any, index: number }) {
  const colorClass = benefit.color === 'bronze' ? 'text-bronze' : 'text-sage-green'
  
  return (
    <div 
      className="flex items-center gap-3 opacity-0"
      style={{
        animation: `slideInRight 0.6s ease forwards ${index * 0.1}s`
      }}
    >
      <span className={`text-2xl ${colorClass}`}>
        {benefit.icon}
      </span>
      <span className="text-text-secondary">
        {benefit.text}
      </span>
    </div>
  )
}