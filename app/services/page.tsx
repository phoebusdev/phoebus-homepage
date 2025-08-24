'use client'

import { NeumorphicButton } from '@/components/NeumorphicButton/NeumorphicButton'
import { NeumorphicCard } from '@/components/NeumorphicCard/NeumorphicCard'
import { ServiceCard } from '@/components/ServiceCard/ServiceCard'
import { Icon } from '@/components/Icon/Icon'
import { PrototypeModal } from '@/components/PrototypeModal/PrototypeModal'
import { usePrototypeModal } from '@/hooks/usePrototypeModal'

export default function ServicesPage() {
  const { isOpen, openModal, closeModal } = usePrototypeModal()
  const services = [
    {
      title: "Full-Stack Web Applications",
      description: "Complete web applications that scale. Built lean but architected for growth.",
      icon: "language",
      features: [
        "Serverless architecture",
        "Real-time dashboards",
        "Progressive web apps",
        "Global content delivery",
        "Advanced caching",
        "Modular architecture"
      ]
    },
    {
      title: "Mobile Applications",
      description: "Native and cross-platform mobile apps that actually work.",
      icon: "smartphone",
      features: [
        "Native iOS/Android development",
        "Cross-platform solutions",
        "Offline-first architecture",
        "Push notifications",
        "App store optimization",
        "Over-the-air updates"
      ]
    },
    {
      title: "E-commerce & Business Systems",
      description: "Complete e-commerce platforms and business systems.",
      icon: "shopping_cart",
      features: [
        "Payment processing",
        "Inventory management",
        "Customer portals",
        "Subscription systems",
        "Multi-vendor capabilities",
        "Advanced analytics"
      ]
    },
    {
      title: "Database & Backend Systems",
      description: "Robust backend systems that handle data properly.",
      icon: "build",
      features: [
        "Scalable database architecture",
        "API development",
        "Webhook handling",
        "Real-time data processing",
        "Advanced security",
        "Automated backups"
      ]
    },
    {
      title: "Analytics & Business Intelligence",
      description: "Custom analytics platforms that give useful insights.",
      icon: "analytics",
      features: [
        "Custom analytics dashboards",
        "A/B testing frameworks",
        "Business intelligence",
        "Automated reporting",
        "Platform integrations",
        "GDPR-compliant data processing"
      ]
    },
    {
      title: "System Integrations & Automation",
      description: "CRM integration, marketing automation, anything that saves you time and reduces manual work.",
      icon: "bolt",
      features: [
        "CRM and marketing platform integrations",
        "Workflow automation and business process optimization",
        "Third-party API integration and management",
        "Data synchronization across multiple platforms",
        "Custom admin panels for non-technical updates",
        "Error tracking and automatic recovery systems"
      ]
    }
  ]

  const howWeWork = [
    {
      title: "Start Minimal, Plan for Everything",
      description: "We build the smallest version that works, but architect it to handle whatever comes next.",
      icon: "rocket_launch"
    },
    {
      title: "Transparent Development Process",
      description: "You see exactly what we're building, when we're building it, and why we made each decision.",
      icon: "visibility"
    },
    {
      title: "Future-Proof Architecture",
      description: "Every system we build is designed to grow with your business, not hold it back.",
      icon: "architecture"
    },
    {
      title: "Set It and Forget It Delivery",
      description: "Once we deploy, you own everything. No ongoing dependencies, no vendor lock-in.",
      icon: "check_circle"
    }
  ]

  const capabilities = [
    {
      title: "Advanced Web Applications",
      description: "Complex, scalable web platforms that handle real business needs.",
      icon: "web"
    },
    {
      title: "Data & Analytics Platforms",
      description: "Custom analytics and business intelligence solutions that actually provide insights.",
      icon: "insights"
    },
    {
      title: "E-commerce & Business Systems",
      description: "Complete business systems that automate operations and drive growth.",
      icon: "storefront"
    },
    {
      title: "Integrations & Automation",
      description: "Connect your tools and automate your workflows to save time and reduce errors.",
      icon: "sync"
    }
  ]

  return (
    <main className="relative">
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 md:px-8 lg:px-12 py-16">
        <div className="max-w-5xl w-full text-center">
          <div className="inline-block mb-6">
            <span className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
              Premium Development Services
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 plastic-tube-text">
            Crafting Digital Excellence
          </h1>
          <p className="text-lg md:text-xl mb-12 text-text-secondary max-w-3xl mx-auto">
            Delivering exceptional digital experiences through efficient, modern development 
            and innovative solutions with remarkable speed.
          </p>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="min-h-screen flex items-center py-16 px-6 md:px-8 lg:px-12 bg-gradient-to-b from-transparent to-[#e8e3db]">
        <div className="max-w-7xl mx-auto w-full">
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
      
      {/* How We Work Section */}
      <section className="min-h-screen flex items-center py-16 px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 plastic-tube-text">
              How We Actually Work
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Build Lean, Architect for Growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {howWeWork.map((principle, idx) => (
              <NeumorphicCard key={idx}>
                <div className="p-8">
                  <Icon name={principle.icon} className="text-4xl mb-4 text-text-primary" />
                  <h3 className="text-xl font-bold mb-3">{principle.title}</h3>
                  <p className="text-text-secondary">{principle.description}</p>
                </div>
              </NeumorphicCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* Capabilities Section */}
      <section className="min-h-screen flex items-center py-16 px-6 md:px-8 lg:px-12 bg-gradient-to-b from-transparent to-[#e8e3db]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 plastic-tube-text">
              What We Can Actually Build
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Enterprise-Grade Capabilities at Startup Speed
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((capability, idx) => (
              <NeumorphicCard key={idx}>
                <div className="p-8">
                  <Icon name={capability.icon} className="text-4xl mb-4 text-text-primary" />
                  <h3 className="text-xl font-bold mb-3">{capability.title}</h3>
                  <p className="text-text-secondary">{capability.description}</p>
                </div>
              </NeumorphicCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="min-h-screen flex items-center py-16 px-6 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto w-full">
          <NeumorphicCard>
            <div className="p-12 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 plastic-tube-text">
                Ready to Build Something That Actually Works?
              </h2>
              <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
                No sales calls, no project scope surprises, no vendor lock-in
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
        source="Services" 
      />
    </main>
  )
}