'use client'

import { Navigation } from '@/components/Navigation/Navigation'
import { NeumorphicButton } from '@/components/NeumorphicButton/NeumorphicButton'
import { NeumorphicCard } from '@/components/NeumorphicCard/NeumorphicCard'
import { Icon } from '@/components/Icon/Icon'
import { Footer } from '@/components/Footer/Footer'
import { PrototypeModal } from '@/components/PrototypeModal/PrototypeModal'
import { usePrototypeModal } from '@/hooks/usePrototypeModal'

export default function ProcessPage() {
  const { isOpen, openModal, closeModal } = usePrototypeModal()
  const processSteps = [
    {
      number: "01",
      title: "Discovery & Reality Check",
      tagline: "We figure out what you actually need (not what makes us the most money)",
      icon: "search",
      keyPoints: [
        "Detailed requirements analysis",
        "Technical architecture planning", 
        "Honest assessment of needs vs wants",
        "Clear project scope with fixed timeline/cost",
        "Honest consultation and strategy session"
      ]
    },
    {
      number: "02", 
      title: "Free Prototype",
      tagline: "We build a working prototype at no cost",
      icon: "ads_click",
      keyPoints: [
        "Fully functional prototype (not just designs)",
        "Core user flows working",
        "Real data integration",
        "Mobile-responsive",
        "Performance-tested",
        "Technical architecture demonstration"
      ]
    },
    {
      number: "03",
      title: "Build Phase", 
      tagline: "Fixed scope, fixed timeline, fixed price",
      icon: "rocket_launch",
      keyPoints: [
        "Daily progress updates",
        "Transparent development",
        "Automated testing",
        "Performance optimization",
        "Regular client review sessions"
      ]
    },
    {
      number: "04",
      title: "Deploy & Transfer",
      tagline: "We deploy your product and transfer 100% ownership to you",
      icon: "redeem",
      keyPoints: [
        "Complete code documentation",
        "Hosting/domain accounts in client's name",
        "Admin training",
        "Monitoring/analytics setup",
        "Optional team training"
      ]
    }
  ]

  const differentiators = [
    {
      title: "Deadlines We Actually Hit",
      description: "No delays, no excuses, no moving goalposts",
      icon: "schedule"
    },
    {
      title: "Complete Transparency", 
      description: "You see exactly what we're building, when, and why",
      icon: "visibility"
    },
    {
      title: "Built for Independence",
      description: "You own everything - no vendor lock-in ever",
      icon: "lock_open"
    },
    {
      title: "Future-Proof Architecture",
      description: "Systems that grow with your business",
      icon: "architecture"
    }
  ]

  const timeline = [
    {
      day: "Day 1",
      activity: "Initial Consultation",
      description: "Deep dive into your needs and goals"
    },
    {
      day: "Days 3-5",
      activity: "Free Prototype Delivery", 
      description: "Working prototype with core functionality"
    },
    {
      day: "Days 7-30",
      activity: "Build Phase",
      description: "Full development with daily updates"
    },
    {
      day: "Final Stage",
      activity: "Launch & Handover",
      description: "Complete ownership transfer"
    }
  ]

  return (
    <main className="relative">
      <Navigation />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 md:px-8 lg:px-12 py-16">
        <div className="max-w-5xl w-full text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 plastic-tube-text">
            How We Build Products That Actually Work
          </h1>
          <p className="text-lg md:text-xl mb-12 text-text-secondary max-w-4xl mx-auto">
            No mysteries, no scope creep, no surprise costs. We show you exactly what we're building 
            before we build it, deliver exactly when promised, and hand over complete ownership.
          </p>
        </div>
      </section>
      
      {/* Process Steps Section */}
      <section className="min-h-screen flex items-center py-16 px-6 md:px-8 lg:px-12 bg-gradient-to-b from-transparent to-[#e8e3db]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {processSteps.map((step, idx) => (
              <NeumorphicCard key={idx}>
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="text-4xl font-bold plastic-tube-text mr-4">
                      {step.number}
                    </div>
                    <Icon name={step.icon} className="text-3xl text-text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-text-secondary mb-4 italic">"{step.tagline}"</p>
                  
                  <ul className="space-y-2">
                    {step.keyPoints.map((point, pointIdx) => (
                      <li key={pointIdx} className="flex items-start text-sm text-text-secondary">
                        <span className="mr-2 text-text-primary">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </NeumorphicCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* Differentiators Section */}
      <section className="min-h-screen flex items-center py-16 px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 plastic-tube-text">
              Why Our Process Works
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Four key differentiators that set us apart
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((diff, idx) => (
              <NeumorphicCard key={idx}>
                <div className="p-6 text-center">
                  <Icon name={diff.icon} className="text-4xl mb-4 text-text-primary mx-auto" />
                  <h3 className="text-lg font-bold mb-3">{diff.title}</h3>
                  <p className="text-sm text-text-secondary">{diff.description}</p>
                </div>
              </NeumorphicCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="min-h-screen flex items-center py-16 px-6 md:px-8 lg:px-12 bg-gradient-to-b from-transparent to-[#e8e3db]">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 plastic-tube-text">
              Timeline Breakdown
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              From first call to full ownership transfer
            </p>
          </div>
          
          <div className="space-y-6">
            {timeline.map((item, idx) => (
              <NeumorphicCard key={idx}>
                <div className="p-6 flex items-center gap-6">
                  <div className="text-2xl font-bold plastic-tube-text min-w-[120px]">
                    {item.day}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">{item.activity}</h3>
                    <p className="text-text-secondary">{item.description}</p>
                  </div>
                </div>
              </NeumorphicCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* Key Promises Section */}
      <section className="min-h-screen flex items-center py-16 px-6 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto w-full">
          <NeumorphicCard>
            <div className="p-12 md:p-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 plastic-tube-text">
                  Our Promises to You
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "No mysteries",
                  "No scope creep", 
                  "No surprise costs",
                  "Complete ownership transfer",
                  "Transparent development process",
                  "Fixed timeline and budget"
                ].map((promise, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Icon name="check_circle" className="text-xl text-text-primary" />
                    <span className="text-text-secondary">{promise}</span>
                  </div>
                ))}
              </div>
            </div>
          </NeumorphicCard>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="min-h-screen flex items-center py-16 px-6 md:px-8 lg:px-12 bg-gradient-to-b from-transparent to-[#e8e3db]">
        <div className="max-w-4xl mx-auto w-full">
          <NeumorphicCard>
            <div className="p-12 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 plastic-tube-text">
                Want to See This Process in Action?
              </h2>
              <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
                Start with a free prototype
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
        source="Process" 
      />
    </main>
  )
}