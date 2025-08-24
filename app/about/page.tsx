'use client'

import { NeumorphicButton } from '@/components/NeumorphicButton/NeumorphicButton'
import { NeumorphicCard } from '@/components/NeumorphicCard/NeumorphicCard'
import { Icon } from '@/components/Icon/Icon'
import { PrototypeModal } from '@/components/PrototypeModal/PrototypeModal'
import { usePrototypeModal } from '@/hooks/usePrototypeModal'

export default function AboutPage() {
  const { isOpen, openModal, closeModal } = usePrototypeModal()
  const agencyProblems = [
    {
      title: "Monthly Maintenance Fees",
      description: "Agencies create dependency with recurring fees for basic maintenance",
      icon: "money_off"
    },
    {
      title: "Stretched Project Timelines",
      description: "Projects drag on indefinitely with moving goalposts and scope creep",
      icon: "schedule"
    },
    {
      title: "Proprietary Code Control",
      description: "You never truly own what you pay for - they keep the keys",
      icon: "lock"
    }
  ]

  const antiAgencyPrinciples = [
    {
      title: "Build Products, Not Dependencies",
      description: "We create solutions that work independently, not systems that require ongoing maintenance contracts",
      icon: "build"
    },
    {
      title: "Clean, Documented Code",
      description: "Every line of code is documented and readable - you'll understand exactly what you own",
      icon: "code"
    },
    {
      title: "Complete Ownership Transfer",
      description: "All accounts, passwords, and intellectual property transfer to you upon completion",
      icon: "key"
    },
    {
      title: "No Recurring Fees",
      description: "Once built and delivered, you never owe us another dollar unless you choose new features",
      icon: "block"
    }
  ]

  const workPrinciples = [
    {
      title: "Radical Transparency",
      description: "You see exactly what we're building, when, and why every decision is made",
      icon: "visibility"
    },
    {
      title: "Deadline Integrity",
      description: "We hit deadlines, period. No delays, no excuses, no moving goalposts",
      icon: "schedule"
    },
    {
      title: "Build for Independence",
      description: "Our ideal client never needs us again - we built it right the first time",
      icon: "lock_open"
    },
    {
      title: "Honest Consultation",
      description: "We tell you what you actually need, not what makes us the most money",
      icon: "thumb_up"
    },
    {
      title: "Future-Proof Architecture",
      description: "Systems designed to grow with your business, not hold it back",
      icon: "architecture"
    },
    {
      title: "Complete Ownership",
      description: "Everything we build becomes 100% yours - code, accounts, documentation, everything",
      icon: "verified_user"
    }
  ]

  const whyChooseUs = [
    {
      title: "Industry Experience",
      description: "Deep expertise across multiple sectors and business models",
      icon: "work"
    },
    {
      title: "Quality-Driven Approach",
      description: "We focus on building it right, not building it fast and cheap",
      icon: "star"
    },
    {
      title: "Streamlined Methodology",
      description: "Efficient processes that deliver results without bureaucracy",
      icon: "speed"
    },
    {
      title: "High-Performing Solutions",
      description: "Every product we deliver is optimized for performance and scalability",
      icon: "trending_up"
    },
    {
      title: "Transparent Communication",
      description: "Clear, honest communication at every stage of the project",
      icon: "chat"
    }
  ]

  return (
    <main className="relative">
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 md:px-8 lg:px-12 py-16">
        <div className="max-w-5xl w-full text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 plastic-tube-text">
            The Story Behind Digital Excellence
          </h1>
          <p className="text-lg md:text-xl mb-12 text-text-secondary max-w-4xl mx-auto">
            Learn about our mission, values, and the unique approach that allows us to deliver exceptional digital solutions
          </p>
        </div>
      </section>
      
      {/* Why We Exist Section */}
      <section className="min-h-screen flex items-center py-16 px-6 md:px-8 lg:px-12 bg-gradient-to-b from-transparent to-[#e8e3db]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 plastic-tube-text">
              Why We Exist
            </h2>
            <p className="text-xl mb-4 text-text-primary font-semibold">
              Built to Fight Agency Nonsense
            </p>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Challenging traditional agency dependency models
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {agencyProblems.map((problem, idx) => (
              <NeumorphicCard key={idx}>
                <div className="p-8 text-center">
                  <Icon name={problem.icon} className="text-4xl mb-4 text-red-500 mx-auto" />
                  <h3 className="text-lg font-bold mb-3">{problem.title}</h3>
                  <p className="text-sm text-text-secondary">{problem.description}</p>
                </div>
              </NeumorphicCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* Anti-Agency Approach Section */}
      <section className="min-h-screen flex items-center py-16 px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 plastic-tube-text">
              Our Anti-Agency Approach
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Building products, not dependencies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {antiAgencyPrinciples.map((principle, idx) => (
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
      
      {/* Why Choose Us Section */}
      <section className="min-h-screen flex items-center py-16 px-6 md:px-8 lg:px-12 bg-gradient-to-b from-transparent to-[#e8e3db]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 plastic-tube-text">
              Why Choose Phoebus Digital
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Dedicated team of developers, designers, and digital strategists
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((reason, idx) => (
              <NeumorphicCard key={idx}>
                <div className="p-6 text-center">
                  <Icon name={reason.icon} className="text-4xl mb-4 text-text-primary mx-auto" />
                  <h3 className="text-lg font-bold mb-3">{reason.title}</h3>
                  <p className="text-sm text-text-secondary">{reason.description}</p>
                </div>
              </NeumorphicCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* How We Work Section */}
      <section className="min-h-screen flex items-center py-16 px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 plastic-tube-text">
              How We Work: Anti-Agency Principles
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              No egos, no games, just exceptional work
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workPrinciples.map((principle, idx) => (
              <NeumorphicCard key={idx}>
                <div className="p-6">
                  <Icon name={principle.icon} className="text-3xl mb-4 text-text-primary" />
                  <h3 className="text-lg font-bold mb-3">{principle.title}</h3>
                  <p className="text-sm text-text-secondary">{principle.description}</p>
                </div>
              </NeumorphicCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Philosophy Section */}
      <section className="min-h-screen flex items-center py-16 px-6 md:px-8 lg:px-12 bg-gradient-to-b from-transparent to-[#e8e3db]">
        <div className="max-w-4xl mx-auto w-full">
          <NeumorphicCard>
            <div className="p-12 md:p-16 text-center">
              <Icon name="group" className="text-6xl mb-6 text-text-primary mx-auto" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6 plastic-tube-text">
                Our Team Philosophy
              </h2>
              <p className="text-lg text-text-secondary mb-6">
                Dedicated team of developers, designers, and digital strategists committed to one simple motto:
              </p>
              <p className="text-xl font-semibold text-text-primary italic mb-8">
                "No egos, no games, just exceptional work"
              </p>
              <p className="text-base text-text-secondary">
                We're passionate about creating high-performing solutions that actually solve problems and drive real business growth.
              </p>
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
                Ready for Development That Actually Works?
              </h2>
              <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
                Experience honest development and complete ownership with no vendor lock-in
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
        source="About" 
      />
    </main>
  )
}