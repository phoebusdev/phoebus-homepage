'use client'

import { Navigation } from '@/components/Navigation/Navigation'
import { NeumorphicButton } from '@/components/NeumorphicButton/NeumorphicButton'
import { NeumorphicCard } from '@/components/NeumorphicCard/NeumorphicCard'
import { Icon } from '@/components/Icon/Icon'
import { Footer } from '@/components/Footer/Footer'
import { PrototypeModal } from '@/components/PrototypeModal/PrototypeModal'
import { usePrototypeModal } from '@/hooks/usePrototypeModal'

export default function PricingPage() {
  const { isOpen, openModal, closeModal } = usePrototypeModal()
  const pricingTiers = [
    {
      name: "Essential Launch",
      price: "$1,500",
      period: "/project",
      pages: "Up to 5 Pages", 
      delivery: "5-7 business days",
      popular: false,
      features: [
        "Custom Visual Prototype (FREE)",
        "Full Domain & Hosting Setup",
        "Responsive & Modern Design", 
        "Basic Contact & Inquiry Form",
        "Social Media Connectivity",
        "Initial SEO Foundation",
        "Content Integration"
      ],
      guarantee: "Unlimited Bug Fixes (Free, Forever) + 1-Month Content Refresh"
    },
    {
      name: "Growth Accelerator",
      price: "$3,000", 
      period: "/project",
      pages: "Up to 10 Pages",
      delivery: "7-10 business days",
      popular: true,
      features: [
        "All Essential Launch features",
        "Enhanced UI/UX with Interactive Elements",
        "Professional Blog/News Section",
        "Advanced Image Gallery/Portfolio",
        "Integrated Google Map & Directions",
        "Newsletter Signup Integration", 
        "Comprehensive Performance Optimization",
        "Analytics Integration"
      ],
      guarantee: "All Essential Launch guarantees + 60 days free content refresh"
    },
    {
      name: "Business Powerhouse",
      price: "$5,000",
      period: "/project", 
      pages: "Up to 15 Pages",
      delivery: "10-14 business days",
      popular: false,
      features: [
        "All Growth Accelerator features",
        "Integrated Web & Mobile App Strategy",
        "Custom Web Application Development",
        "Basic Mobile App (iOS & Android)",
        "Published to App Stores",
        "Advanced Data & User Management",
        "E-commerce Capabilities (Up to 20 Products)",
        "Advanced Security Protocols",
        "In-depth Analytics & Reporting"
      ],
      guarantee: "All Growth Accelerator guarantees + 90 days free content refresh"
    }
  ]

  const uniquePoints = [
    {
      title: "Free Working Prototype",
      description: "See exactly what you're getting before you pay a single dollar",
      icon: "preview"
    },
    {
      title: "100% Ownership Transfer", 
      description: "You own everything - all code, accounts, and passwords",
      icon: "verified_user"
    },
    {
      title: "Fixed Timeline & Price",
      description: "No surprises, no scope creep, no hidden fees ever",
      icon: "schedule"
    },
    {
      title: "No Recurring Dependency",
      description: "No monthly maintenance fees or vendor lock-in",
      icon: "lock_open"
    }
  ]

  const ongoingCosts = [
    {
      item: "Domain Renewal",
      cost: "€15-€30/year",
      description: "Annual domain registration fee"
    },
    {
      item: "Hosting Renewal", 
      cost: "€120-€250/year",
      description: "Web hosting and server costs"
    },
    {
      item: "Apple App Store",
      cost: "$99/year",
      description: "Required for iOS app publishing"
    },
    {
      item: "Google Play Store",
      cost: "$25 one-time",
      description: "One-time fee for Android publishing"
    }
  ]

  const guarantees = [
    "Bug-free forever",
    "30-day content freedom", 
    "Complete ownership",
    "No vendor lock-in",
    "Transparent development",
    "Fixed pricing"
  ]

  return (
    <main className="relative">
      <Navigation />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 md:px-8 lg:px-12 py-16">
        <div className="max-w-5xl w-full text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 plastic-tube-text">
            What You Pay Is What You Get
          </h1>
          <p className="text-lg md:text-xl mb-4 text-text-secondary max-w-3xl mx-auto">
            Tired of development that drags on forever and costs that keep climbing?
          </p>
          <p className="text-base text-text-secondary max-w-3xl mx-auto mb-12">
            Transparent pricing with no surprises, upsells, or recurring dependency fees
          </p>
        </div>
      </section>
      
      {/* Pricing Tiers */}
      <section className="min-h-screen flex items-center py-16 px-6 md:px-8 lg:px-12 bg-gradient-to-b from-transparent to-[#e8e3db]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, idx) => (
              <NeumorphicCard key={idx} className={tier.popular ? "ring-2 ring-[#d4cfc7]" : ""}>
                <div className="p-8 relative">
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-[#d4cfc7] text-[#2a2a2a] px-3 py-1 rounded-full text-xs font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold plastic-tube-text">{tier.price}</span>
                    <span className="text-text-secondary">{tier.period}</span>
                  </div>
                  
                  <div className="mb-4 text-sm text-text-secondary">
                    <div>{tier.pages}</div>
                    <div>{tier.delivery}</div>
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {tier.features.map((feature, featureIdx) => (
                      <li key={featureIdx} className="flex items-start text-sm">
                        <Icon name="check_circle" className="text-text-primary mr-2 mt-0.5 text-base flex-shrink-0" />
                        <span className="text-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mb-6 p-3 bg-[#f0ebe3] rounded">
                    <p className="text-xs text-text-secondary">
                      <strong>Guarantee:</strong> {tier.guarantee}
                    </p>
                  </div>
                  
                  <NeumorphicButton size="medium" className="w-full" onClick={openModal}>
                    Get Your Free Prototype
                  </NeumorphicButton>
                </div>
              </NeumorphicCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* Unique Selling Points */}
      <section className="min-h-screen flex items-center py-16 px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 plastic-tube-text">
              Why Our Pricing Works
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Transparent, fixed pricing with no surprises
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {uniquePoints.map((point, idx) => (
              <NeumorphicCard key={idx}>
                <div className="p-6 text-center">
                  <Icon name={point.icon} className="text-4xl mb-4 text-text-primary mx-auto" />
                  <h3 className="text-lg font-bold mb-3">{point.title}</h3>
                  <p className="text-sm text-text-secondary">{point.description}</p>
                </div>
              </NeumorphicCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* Ongoing Costs */}
      <section className="min-h-screen flex items-center py-16 px-6 md:px-8 lg:px-12 bg-gradient-to-b from-transparent to-[#e8e3db]">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 plastic-tube-text">
              Ongoing Costs (The Only Ones)
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              These are the only costs you'll ever pay after your project is complete
            </p>
          </div>
          
          <NeumorphicCard>
            <div className="p-8">
              <div className="space-y-4">
                {ongoingCosts.map((cost, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-[#f0ebe3] rounded">
                    <div>
                      <h3 className="font-bold">{cost.item}</h3>
                      <p className="text-sm text-text-secondary">{cost.description}</p>
                    </div>
                    <div className="text-lg font-bold plastic-tube-text">
                      {cost.cost}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </NeumorphicCard>
        </div>
      </section>
      
      {/* Guarantees */}
      <section className="min-h-screen flex items-center py-16 px-6 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 plastic-tube-text">
              Our Guarantees
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              What we promise, we deliver
            </p>
          </div>
          
          <NeumorphicCard>
            <div className="p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {guarantees.map((guarantee, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Icon name="verified" className="text-2xl text-text-primary" />
                    <span className="text-lg text-text-secondary">{guarantee}</span>
                  </div>
                ))}
              </div>
            </div>
          </NeumorphicCard>
        </div>
      </section>
      
      {/* Referral Program */}
      <section className="min-h-screen flex items-center py-16 px-6 md:px-8 lg:px-12 bg-gradient-to-b from-transparent to-[#e8e3db]">
        <div className="max-w-4xl mx-auto w-full">
          <NeumorphicCard>
            <div className="p-12 text-center">
              <Icon name="card_giftcard" className="text-6xl mb-6 text-text-primary mx-auto" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 plastic-tube-text">
                Referral Program
              </h2>
              <p className="text-lg text-text-secondary mb-6">
                Love our work? Get 10% commission on every client you refer to us.
              </p>
              <p className="text-sm text-text-secondary mb-8 italic">
                Temporary promotional offer - limited time only
              </p>
              <NeumorphicButton size="large">
                Learn More About Referrals
              </NeumorphicButton>
            </div>
          </NeumorphicCard>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="min-h-screen flex items-center py-16 px-6 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto w-full">
          <NeumorphicCard>
            <div className="p-12 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 plastic-tube-text">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
                Get your free prototype and see exactly what you'll be getting
              </p>
              <NeumorphicButton size="large" onClick={openModal}>
                Get Your Free Prototype
              </NeumorphicButton>
            </div>
          </NeumorphicCard>
        </div>
      </section>
      
      <Footer />
      
      <PrototypeModal 
        isOpen={isOpen} 
        onClose={closeModal} 
        source="Pricing" 
      />
    </main>
  )
}