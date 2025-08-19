'use client'

import { NeumorphicButton } from '@/components/NeumorphicButton/NeumorphicButton'
import { NeumorphicCard } from '@/components/NeumorphicCard/NeumorphicCard'
import { Navigation } from '@/components/Navigation/Navigation'
import { Footer } from '@/components/Footer/Footer'
import { Icon } from '@/components/Icon/Icon'
import { ScrollDebugTool } from '@/components/ScrollDebugTool/ScrollDebugTool'
import { ScrollDebugProvider } from '@/components/ScrollDebugContext/ScrollDebugContext'
import { DebugParallax, StaticParallax } from '@/components/DebugParallax/DebugParallax'
import { DualParallax } from '@/components/DualParallax/DualParallax'
import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

const ParallaxProvider = dynamic(
  () => import('react-scroll-parallax').then(mod => mod.ParallaxProvider),
  { ssr: false }
)

// Service data
const services = [
  {
    title: "Full-Stack Web Applications",
    icon: "language",
    description: "Complete web applications that scale. Built lean but architected for growth. From simple sites to complex multi-tenant platforms."
  },
  {
    title: "Mobile Applications", 
    icon: "phone_iphone",
    description: "Native and cross-platform mobile apps that actually work. Built for performance and easy updates without app store hassles."
  },
  {
    title: "E-commerce & Business Systems",
    icon: "shopping_cart", 
    description: "Complete e-commerce platforms and business systems. Payment processing, inventory management, customer portals - everything you need to run and scale."
  }
]

// Process steps data
const processSteps = [
  {
    icon: "search",
    number: "1",
    title: "Discovery & Reality Check",
    fullText: "We figure out what you actually need. If we can talk you out of features you don't need, we will."
  },
  {
    icon: "visibility",
    number: "2", 
    title: "Free Prototype",
    fullText: "We build a working prototype at no cost. You see exactly how your product will work before paying a dollar."
  },
  {
    icon: "build",
    number: "3",
    title: "Build Phase", 
    fullText: "Fixed scope, fixed timeline, fixed price. You get daily updates and can see your product being built in real-time."
  },
  {
    icon: "rocket_launch",
    number: "4",
    title: "Deploy & Transfer",
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
    <ScrollDebugProvider>
      <ParallaxProvider 
        scrollAxis="vertical"
        isDisabled={isMobile}
      >
        <main className="min-h-screen relative">
          <Navigation />

          <StaticParallax 
            translateY={[-20, 20]}
            className="absolute inset-0 z-0"
          >
            <div className="w-full h-[120vh] bg-gradient-to-br from-[rgba(232,213,242,0.03)] via-[rgba(208,232,227,0.03)] to-[rgba(252,228,214,0.02)]" />
          </StaticParallax>

        <div className="relative z-10">
          {/* Hero Section - Load-Based Card Collage Animation */}
          <section className="scroll-snap-section min-h-screen py-4 md:py-6 lg:py-8 px-6 md:px-8 lg:px-12 flex items-center" data-section="hero">
            <div className="max-w-7xl mx-auto w-full">
              <div className="transform scale-75 origin-center" style={{ overflow: 'visible' }}>
                <div className="relative">
                  {/* Card Collage Layout - Row by Row with Flexible Sizing */}
                  <div className="space-y-4 mb-8">
                    {/* Row 1: Digital Products + No hidden fees */}
                    <div className="grid grid-cols-12 gap-4">
                      {/* Digital Products - auto-sized to content */}
                      <div className="col-span-12 md:col-span-7">
                        <DualParallax
                          entryDebugId="digital-products-entry"
                          exitDebugId="digital-products-exit"
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
                        </DualParallax>
                      </div>
                      {/* No hidden fees - fills remainder */}
                      <div className="col-span-12 md:col-span-5">
                        <DualParallax
                          entryDebugId="no-hidden-fees-entry"
                          exitDebugId="no-hidden-fees-exit"
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
                        </DualParallax>
                      </div>
                    </div>

                    {/* Row 2: Built Right + No drag-outs */}
                    <div className="grid grid-cols-12 gap-4">
                      {/* Built Right - auto-sized to content */}
                      <div className="col-span-12 md:col-span-6">
                        <DualParallax
                          entryDebugId="built-right-entry"
                          exitDebugId="built-right-exit"
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
                        </DualParallax>
                      </div>
                      {/* No drag-outs - fills remainder */}
                      <div className="col-span-12 md:col-span-6">
                        <DualParallax
                          entryDebugId="no-drag-outs-entry"
                          exitDebugId="no-drag-outs-exit"
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
                        </DualParallax>
                      </div>
                    </div>

                    {/* Row 3: Delivered Fast + No vendor lock-in */}
                    <div className="grid grid-cols-12 gap-4">
                      {/* Delivered Fast - auto-sized to content */}
                      <div className="col-span-12 md:col-span-8">
                        <DualParallax
                          entryDebugId="delivered-fast-entry"
                          exitDebugId="delivered-fast-exit"
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
                        </DualParallax>
                      </div>
                      {/* No vendor lock-in - fills remainder */}
                      <div className="col-span-12 md:col-span-4">
                        <DualParallax
                          entryDebugId="no-lock-in-entry"
                          exitDebugId="no-lock-in-exit"
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
                        </DualParallax>
                      </div>
                    </div>

                    {/* Row 4: Description - Full width */}
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-12">
                        <DualParallax
                          entryDebugId="description-card-entry"
                          exitDebugId="description-card-exit"
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
                        </DualParallax>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons - Animate in from bottom */}
                  <div className="flex gap-4 flex-wrap justify-center">
                    <DualParallax
                      entryDebugId="cta-button-1-entry"
                      exitDebugId="cta-button-1-exit"
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
                    </DualParallax>
                    
                    <DualParallax
                      entryDebugId="cta-button-2-entry"
                      exitDebugId="cta-button-2-exit"
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
                    </DualParallax>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section - Standardized Layout */}
          <section className="scroll-snap-section min-h-screen py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-12 flex items-center" data-section="services">
            <div className="max-w-7xl mx-auto w-full">
              <div className="transform scale-75 origin-center" style={{ overflow: 'visible' }}>
                <DebugParallax 
                  debugId="services-title"
                  translateX={[0, 0]}
                  translateY={[0, 0]}
                  rotate={[0, 0]}
                  startScroll={100}
                  endScroll={800}
                >
                  <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display neumorphic-text-3d mb-6">
                      Products That <span className="plastic-tube-text">Work</span>, Not Projects That Drag On
                    </h2>
                    <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
                      We build lean but future-proof. Every project starts minimal but architected for easy expansion. 
                      No rebuilds needed when you want to add features later.
                    </p>
                  </div>
                </DebugParallax>
                
                {/* Services Cards Grid - Dual Animation System */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {services.map((service, idx) => (
                    <DualParallax
                      key={idx}
                      entryDebugId={`services-card-${idx}-entry`}
                      exitDebugId={`services-card-${idx}-exit`}
                    >
                      <NeumorphicCard className={`h-48 ${['bg-gradient-to-br from-[#e8d5f2] to-[#d0e8e3]', 'bg-gradient-to-br from-[#d0e8e3] to-[#fce4d6]', 'bg-gradient-to-br from-[#fce4d6] to-[#d5e3f0]'][idx % 3]}`}>
                        <div className="text-center p-6">
                          <Icon name={service.icon} className="text-4xl text-text-primary mb-3" />
                          <h3 className="text-xl font-display neumorphic-text-3d mb-3">{service.title}</h3>
                          <p className="text-sm text-text-secondary line-clamp-3">{service.description}</p>
                        </div>
                      </NeumorphicCard>
                    </DualParallax>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Process Section - Regular Layout */}
          <section className="scroll-snap-section min-h-screen py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-12 flex items-center" data-section="process">
            <div className="max-w-7xl mx-auto w-full">
              <div className="transform scale-75 origin-center" style={{ overflow: 'visible' }}>
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start md:items-center">
                  <DualParallax
                    entryDebugId="process-title-entry"
                    exitDebugId="process-title-exit"
                  >
                    <div>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display neumorphic-text-3d mb-6">
                        Your Journey From <span className="plastic-tube-text">Concept To Launch</span>
                      </h2>
                      <p className="text-lg md:text-xl text-text-secondary">
                        We've designed a streamlined process that gets your project from idea to reality 
                        with exceptional speed and quality, starting with a completely free prototype.
                      </p>
                    </div>
                  </DualParallax>
                  
                  <div className="space-y-6">
                    {processSteps.map((step, idx) => (
                      <DualParallax
                        key={idx}
                        entryDebugId={`process-step-${idx}-entry`}
                        exitDebugId={`process-step-${idx}-exit`}
                      >
                        <div className="card-solution4 expanded">
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
                      </DualParallax>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Different Section - Grid Layout */}
          <section className="scroll-snap-section min-h-screen py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-12 flex items-center" data-section="why-different">
            <div className="max-w-7xl mx-auto w-full">
              <div className="transform scale-75 origin-center" style={{ overflow: 'visible' }}>
                <DualParallax
                  entryDebugId="why-different-title-entry"
                  exitDebugId="why-different-title-exit"
                >
                  <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display neumorphic-text-3d mb-6">
                      Why We're <span className="plastic-tube-text">Different</span>
                    </h2>
                    <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
                      Most agencies want to keep you dependent. We want to set you free.
                    </p>
                  </div>
                </DualParallax>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {whyDifferentItems.map((item, idx) => (
                    <DualParallax
                      key={idx}
                      entryDebugId={`why-different-${idx}-entry`}
                      exitDebugId={`why-different-${idx}-exit`}
                    >
                      <WhyDifferentCard item={item} index={idx} />
                    </DualParallax>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="scroll-snap-section min-h-screen py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-12 flex items-center" data-section="about">
            <div className="max-w-7xl mx-auto w-full">
              <div className="transform scale-75 origin-center" style={{ overflow: 'visible' }}>
                <DualParallax
                  entryDebugId="about-title-entry"
                  exitDebugId="about-title-exit"
                >
                  <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display neumorphic-text-3d mb-6">
                      Why Choose <span className="plastic-tube-text">Phoebus Digital?</span>
                    </h2>
                  </div>
                </DualParallax>
                
                {/* About Content Grid */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                  <DualParallax
                    entryDebugId="about-content-entry"
                    exitDebugId="about-content-exit"
                  >
                    <div className="space-y-6">
                      <p className="text-lg md:text-xl text-text-secondary">
                        Phoebus Digital was founded with a simple mission: provide exceptional digital solutions to our personal network with unprecedented speed and value.
                      </p>
                      <p className="text-lg md:text-xl text-text-secondary">
                        By limiting our client base to our extended network, we can maintain the highest standards of quality while offering exceptional pricing and turnaround times that traditional agencies simply cannot match.
                      </p>
                      <div className="pt-4">
                        <NeumorphicButton>
                          Start Your Project Today
                        </NeumorphicButton>
                      </div>
                    </div>
                  </DualParallax>
                  
                  <DualParallax
                    entryDebugId="about-features-entry"
                    exitDebugId="about-features-exit"
                  >
                    <NeumorphicCard className="p-8">
                      <div className="space-y-4">
                        {[
                          "Years of industry experience across multiple sectors",
                          "Exclusive focus on our personal network for higher quality",
                          "Streamlined development methodology for faster delivery",
                          "Passion for creating elegant, high-performing digital solutions",
                          "Commitment to transparent communication throughout the process"
                        ].map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <Icon name="check_circle" className="text-xl text-sage-green mt-1 flex-shrink-0" />
                            <span className="text-text-secondary">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </NeumorphicCard>
                  </DualParallax>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="scroll-snap-section min-h-screen py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-12 flex items-center" data-section="contact">
            <div className="max-w-7xl mx-auto w-full">
              <div className="transform scale-75 origin-center" style={{ overflow: 'visible' }}>
                <DualParallax
                  entryDebugId="contact-title-entry"
                  exitDebugId="contact-title-exit"
                >
                  <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display neumorphic-text-3d mb-6">
                      Get Your <span className="plastic-tube-text">Free Prototype</span>
                    </h2>
                    <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
                      Ready to transform your vision into reality? Start with a completely free prototype and see how our streamlined approach can bring your digital dreams to life.
                    </p>
                  </div>
                </DualParallax>
                
                {/* Contact CTA Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <DualParallax
                    entryDebugId="contact-cta-1-entry"
                    exitDebugId="contact-cta-1-exit"
                  >
                    <NeumorphicCard className="text-center p-8 h-full">
                      <Icon name="mail" className="text-4xl text-salmon-pink mb-4" />
                      <h3 className="text-xl font-display neumorphic-text-3d mb-3">Email Us</h3>
                      <p className="text-text-secondary mb-4">For detailed inquiries and project discussions</p>
                      <p className="text-sm font-mono text-text-primary bg-surface-secondary px-3 py-2 rounded-lg">
                        phoebusdigitalsolutions@gmail.com
                      </p>
                    </NeumorphicCard>
                  </DualParallax>
                  
                  <DualParallax
                    entryDebugId="contact-cta-2-entry"
                    exitDebugId="contact-cta-2-exit"
                  >
                    <NeumorphicCard className="text-center p-8 h-full">
                      <Icon name="phone" className="text-4xl text-sage-green mb-4" />
                      <h3 className="text-xl font-display neumorphic-text-3d mb-3">Call Us</h3>
                      <p className="text-text-secondary mb-4">For immediate assistance and consultations</p>
                      <p className="text-sm font-mono text-text-primary bg-surface-secondary px-3 py-2 rounded-lg">
                        +1 (416) 768-1201
                      </p>
                    </NeumorphicCard>
                  </DualParallax>
                </div>
                
                {/* Final CTA */}
                <DualParallax
                  entryDebugId="contact-final-cta-entry"
                  exitDebugId="contact-final-cta-exit"
                >
                  <div className="text-center mt-12">
                    <NeumorphicButton>
                      Get Your Free Prototype
                    </NeumorphicButton>
                  </div>
                </DualParallax>
              </div>
            </div>
          </section>
        </div>
        <Footer />
        
        {/* Debug Tool - only shows in development or when debug=scroll is in URL */}
        <ScrollDebugTool />
      </main>
    </ParallaxProvider>
  </ScrollDebugProvider>
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