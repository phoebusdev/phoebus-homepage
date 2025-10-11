'use client'

import { useState } from 'react'
import { NeumorphicButton } from '@/components/NeumorphicButton/NeumorphicButton'
import { ServiceCard } from '@/components/ServiceCard/ServiceCard'
import { ProcessCard } from '@/components/ProcessCard/ProcessCard'
import { WhyDifferentCard } from '@/components/WhyDifferentCard/WhyDifferentCard'
import { Navigation } from '@/components/Navigation/Navigation'
import { ContactForm } from '@/components/ContactForm/ContactForm'
import { services } from '@/data/services'
import { processSteps } from '@/data/processSteps'
import { whyDifferentItems } from '@/data/differentiators'
import { heroContent, servicesSection, processSection, whyDifferentSection } from '@/data/content'
import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation'

export default function HomePage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)

  const openContactForm = () => setIsContactFormOpen(true)
  const closeContactForm = () => setIsContactFormOpen(false)

  // Animation hooks for each section
  const heroAnimation = useIntersectionAnimation({ threshold: 0.1, triggerOnce: true })
  const servicesAnimation = useIntersectionAnimation({ threshold: 0.1, triggerOnce: true })
  const processAnimation = useIntersectionAnimation({ threshold: 0.1, triggerOnce: true })
  const whyDifferentAnimation = useIntersectionAnimation({ threshold: 0.1, triggerOnce: true })

  return (
    <main id="main-content" className="min-h-screen relative">
      <Navigation />

      {/* Hero Section */}
      <section aria-label="Hero" className="relative pt-4 pb-12 md:pt-6 md:pb-16 lg:pt-8 lg:pb-20 px-4 w-full">
        <div className="max-w-6xl mx-auto w-full">
          <div
            ref={heroAnimation.ref}
            className={`hero-neumorphic-card text-center hero-scale-up ${heroAnimation.isVisible ? 'visible' : ''}`}
          >
            <div className="relative z-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-relaxed font-display break-words neumorphic-text-3d mb-4">
                <span
                  className={`plastic-tube-text hero-headline-line ${heroAnimation.isVisible ? 'visible' : ''}`}
                  style={{ transitionDelay: '80ms' }}
                >
                  {heroContent.headline.line1}
                </span>
                <br />
                <span
                  className={`plastic-tube-text hero-headline-line ${heroAnimation.isVisible ? 'visible' : ''}`}
                  style={{ transitionDelay: '160ms' }}
                >
                  {heroContent.headline.line2}
                </span>
                <br />
                <span
                  className={`plastic-tube-text hero-headline-line ${heroAnimation.isVisible ? 'visible' : ''}`}
                  style={{ transitionDelay: '240ms' }}
                >
                  {heroContent.headline.line3}
                </span>
              </h1>
              <p
                className={`text-lg sm:text-xl text-text-secondary max-w-4xl mx-auto mb-8 hero-headline-line ${heroAnimation.isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: '360ms' }}
              >
                We build websites and apps that work <span className="matter-plastic-light">exactly as promised</span>,
                delivered exactly when promised. No hidden fees, no project drag-outs, no vendor lock-in.
                Just clean code, clear timelines, and <span className="matter-plastic-light">complete ownership</span>.
              </p>
              <div className="flex gap-4 flex-wrap justify-center">
                <div
                  className={`hero-headline-line ${heroAnimation.isVisible ? 'visible' : ''}`}
                  style={{ transitionDelay: '480ms' }}
                >
                  <NeumorphicButton onClick={openContactForm}>
                    {heroContent.ctas.primary}
                  </NeumorphicButton>
                </div>
                <div
                  className={`hero-headline-line ${heroAnimation.isVisible ? 'visible' : ''}`}
                  style={{ transitionDelay: '520ms' }}
                >
                  <NeumorphicButton onClick={openContactForm}>
                    {heroContent.ctas.secondary}
                  </NeumorphicButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesAnimation.ref} aria-label="Services" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 section-header-animate ${servicesAnimation.isVisible ? 'visible' : ''}`}>
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
      <section ref={processAnimation.ref} aria-label="Process" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`section-header-animate ${processAnimation.isVisible ? 'visible' : ''}`}>
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
      <section ref={whyDifferentAnimation.ref} aria-label="Why Different" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 section-header-animate ${whyDifferentAnimation.isVisible ? 'visible' : ''}`}>
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

      {/* Contact Form Modal */}
      <ContactForm isOpen={isContactFormOpen} onClose={closeContactForm} />
    </main>
  )
}

