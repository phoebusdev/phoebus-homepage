'use client'

import { NeumorphicButton } from '@/components/NeumorphicButton/NeumorphicButton'
import { NeumorphicCard } from '@/components/NeumorphicCard/NeumorphicCard'
import { ServiceCard } from '@/components/ServiceCard/ServiceCard'
import { Icon } from '@/components/Icon/Icon'
import { PrototypeModal } from '@/components/PrototypeModal/PrototypeModal'
import { usePrototypeModal } from '@/hooks/usePrototypeModal'

export default function Home() {
  const { isOpen, openModal, closeModal } = usePrototypeModal()
  const services = [
    {
      title: "Full-Stack Web Applications",
      description: "",
      icon: "code",
      features: [
        "Serverless architecture",
        "Real-time dashboards",
        "Progressive web apps",
        "Global content delivery"
      ]
    },
    {
      title: "Mobile Applications",
      description: "",
      icon: "phone_iphone",
      features: [
        "Native iOS/Android development",
        "Cross-platform solutions",
        "Offline-first architecture",
        "Over-the-air updates"
      ]
    },
    {
      title: "E-commerce & Business Systems",
      description: "",
      icon: "shopping_cart",
      features: [
        "Payment processing integration",
        "Inventory management",
        "Customer portals",
        "Multi-vendor marketplace capabilities"
      ]
    },
    {
      title: "Database & Backend Systems",
      description: "",
      icon: "storage",
      features: [
        "Scalable database architecture",
        "API development",
        "Real-time data processing",
        "Automated backups"
      ]
    },
    {
      title: "Analytics & Business Intelligence",
      description: "",
      icon: "analytics",
      features: [
        "Custom analytics dashboards",
        "A/B testing frameworks",
        "Business intelligence",
        "GDPR-compliant data processing"
      ]
    },
    {
      title: "System Integrations & Automation",
      description: "",
      icon: "settings_suggest",
      features: [
        "CRM integrations",
        "Workflow automation",
        "Third-party API integration",
        "Error tracking systems"
      ]
    }
  ]

  const processSteps = [
    {
      number: "01",
      title: "Discovery & Reality Check",
      description: "We figure out what you actually need (not what makes us the most money).",
      icon: "search"
    },
    {
      number: "02",
      title: "Free Prototype",
      description: "We build a working prototype at no cost. You see exactly how your product will work before paying a dollar.",
      icon: "design_services"
    },
    {
      number: "03",
      title: "Build Phase",
      description: "Fixed scope, fixed timeline, fixed price. You get daily updates and can see your product being built in real-time.",
      icon: "code"
    },
    {
      number: "04",
      title: "Deploy & Transfer",
      description: "We deploy your product and transfer 100% ownership to you. All code, all accounts, all passwords.",
      icon: "rocket_launch"
    }
  ]

  const differentiators = [
    {
      icon: "schedule",
      text: "Hit deadlines, period - no delays, no excuses"
    },
    {
      icon: "visibility",
      text: "Complete transparency - what you see is what you get"
    },
    {
      icon: "lock_open",
      text: "Build for independence - ideal client never needs them again"
    },
    {
      icon: "architecture",
      text: "Lean but future-proof architecture for easy expansion"
    },
    {
      icon: "thumb_up",
      text: "Tell clients what they actually need, not what makes most money"
    }
  ]

  return (
    <main className="relative">
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 md:px-8 lg:px-12 py-16">
        <div className="max-w-5xl w-full text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block plastic-tube-text">Digital Products</span>
            <span className="block plastic-tube-text mt-2">Built Right</span>
            <span className="block plastic-tube-text mt-2">Delivered Fast</span>
          </h1>
          
          <p className="text-lg md:text-xl mb-12 text-text-secondary max-w-3xl mx-auto">
            We build websites and apps that work exactly as promised, delivered exactly when promised. 
            No hidden fees, no project drag-outs, no vendor lock-in. Just clean code, clear timelines, 
            and complete ownership.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <NeumorphicButton size="large" onClick={openModal}>
              Get Your Free Prototype
            </NeumorphicButton>
            <NeumorphicButton size="large">
              See Our Approach
            </NeumorphicButton>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="min-h-screen flex items-center py-16 px-6 md:px-8 lg:px-12 bg-gradient-to-b from-transparent to-[#e8e3db]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 plastic-tube-text">
              What We Actually Build
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Products That Work, Not Projects That Drag On
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <ServiceCard
                key={idx}
                title={service.title}
                description={service.description}
                icon={service.icon}
                features={service.features}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="min-h-screen flex items-center py-16 px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 plastic-tube-text">
              Our Process
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Your Journey From Concept To Launch
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <NeumorphicCard key={index}>
                <div className="p-6">
                  <div className="text-5xl font-bold mb-4 plastic-tube-text">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                  <p className="text-sm text-text-secondary">{step.description}</p>
                </div>
              </NeumorphicCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Different Section */}
      <section className="min-h-screen flex items-center py-16 px-6 md:px-8 lg:px-12 bg-gradient-to-b from-transparent to-[#e8e3db]">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 plastic-tube-text">
              Why We're Different From Every Other Dev Shop
            </h2>
            
            <div className="mb-8 max-w-3xl mx-auto">
              <p className="text-xl mb-4 text-text-primary font-semibold">
                Most agencies want dependency; we want to set you free
              </p>
              <p className="text-lg text-text-secondary mb-4">
                Our goal: build it right the first time so you own it completely
              </p>
              <p className="text-base text-text-secondary italic">
                Cut through industry nonsense: No hidden fees. No project scope creep.
              </p>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <NeumorphicCard>
              <div className="p-8">
                <div className="space-y-4">
                  {differentiators.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <Icon name="check_circle" className="text-2xl text-text-primary mt-1 flex-shrink-0" />
                      <p className="text-lg text-text-secondary">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </NeumorphicCard>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="min-h-screen flex items-center py-16 px-6 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto w-full">
          <NeumorphicCard>
            <div className="p-12 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 plastic-tube-text">
                Get Your Free Prototype
              </h2>
              <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
                No sales calls, no project scope surprises, no vendor lock-in. 
                Just a free prototype that shows exactly what we'll build and how it'll work.
              </p>
              <NeumorphicButton size="large" onClick={openModal}>
                Get Your Free Prototype
              </NeumorphicButton>
            </div>
          </NeumorphicCard>
        </div>
      </section>
      
      
      <PrototypeModal 
        isOpen={isOpen} 
        onClose={closeModal} 
        source="Homepage" 
      />
    </main>
  )
}