'use client'

import { Navigation } from '@/components/Navigation/Navigation'
import { NeumorphicButton } from '@/components/NeumorphicButton/NeumorphicButton'
import { NeumorphicCard } from '@/components/NeumorphicCard/NeumorphicCard'
import { ServiceCard } from '@/components/ServiceCard/ServiceCard'
import { NeumorphicNav } from '@/components/NeumorphicNav/NeumorphicNav'
import { Icon } from '@/components/Icon/Icon'
import { Footer } from '@/components/Footer/Footer'
import { useState } from 'react'

export default function Home() {
  const [activeServiceTab, setActiveServiceTab] = useState(0)
  
  const serviceCategories = ['All', 'Development', 'Design', 'Strategy']
  
  const services = [
    {
      title: "Web Development",
      description: "Custom web solutions built with cutting-edge technology",
      icon: "code",
      features: [
        "React & Next.js Development",
        "Full-Stack Applications",
        "API Integration",
        "Performance Optimization",
        "Progressive Web Apps",
        "E-commerce Solutions"
      ],
      category: 'Development'
    },
    {
      title: "Mobile Apps",
      description: "Native and cross-platform mobile experiences",
      icon: "phone_iphone",
      features: [
        "iOS & Android Development",
        "React Native Apps",
        "Flutter Solutions",
        "App Store Optimization",
        "Push Notifications",
        "Offline Functionality"
      ],
      category: 'Development'
    },
    {
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that users love",
      icon: "design_services",
      features: [
        "User Interface Design",
        "User Experience Research",
        "Wireframing & Prototyping",
        "Design Systems",
        "Responsive Design",
        "Accessibility Standards"
      ],
      category: 'Design'
    },
    {
      title: "Brand Identity",
      description: "Distinctive visual identities that stand out",
      icon: "palette",
      features: [
        "Logo Design",
        "Brand Guidelines",
        "Color Schemes",
        "Typography Selection",
        "Marketing Materials",
        "Social Media Assets"
      ],
      category: 'Design'
    },
    {
      title: "Digital Strategy",
      description: "Data-driven strategies for sustainable growth",
      icon: "analytics",
      features: [
        "Market Analysis",
        "SEO Optimization",
        "Content Strategy",
        "Analytics Setup",
        "Conversion Optimization",
        "Growth Planning"
      ],
      category: 'Strategy'
    },
    {
      title: "Consulting",
      description: "Expert guidance for digital transformation",
      icon: "group",
      features: [
        "Technical Architecture",
        "Team Training",
        "Process Optimization",
        "Technology Selection",
        "Security Audits",
        "Performance Reviews"
      ],
      category: 'Strategy'
    }
  ]
  
  const filteredServices = activeServiceTab === 0 
    ? services 
    : services.filter(s => s.category === serviceCategories[activeServiceTab])

  return (
    <main className="relative">
      <Navigation />
      
      {/* Hero Section - Centered and Elegant */}
      <section className="min-h-screen flex items-center justify-center px-6 md:px-8 lg:px-12 py-20">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4 neumorphic-text-3d">
              PHOEBUS
            </h1>
            <h2 className="text-3xl md:text-4xl lg:text-5xl plastic-tube-text mb-8">
              DIGITAL EXCELLENCE
            </h2>
            <p className="text-xl md:text-2xl mb-12 matter-plastic-light max-w-3xl mx-auto">
              Transforming Ideas Into Digital Reality
            </p>
            
            {/* Hero Cards Grid - Symmetrical Layout */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
              <NeumorphicCard>
                <div className="aspect-square flex flex-col items-center justify-center p-6">
                  <Icon name="rocket_launch" className="text-5xl mb-3 text-text-primary" />
                  <span className="text-sm font-semibold">Launch Fast</span>
                </div>
              </NeumorphicCard>
              
              <NeumorphicCard>
                <div className="aspect-square flex flex-col items-center justify-center p-6">
                  <Icon name="design_services" className="text-5xl mb-3 text-text-primary" />
                  <span className="text-sm font-semibold">Design First</span>
                </div>
              </NeumorphicCard>
              
              <NeumorphicCard>
                <div className="aspect-square flex flex-col items-center justify-center p-6">
                  <Icon name="code" className="text-5xl mb-3 text-text-primary" />
                  <span className="text-sm font-semibold">Clean Code</span>
                </div>
              </NeumorphicCard>
              
              <NeumorphicCard>
                <div className="aspect-square flex flex-col items-center justify-center p-6">
                  <Icon name="analytics" className="text-5xl mb-3 text-text-primary" />
                  <span className="text-sm font-semibold">Data Driven</span>
                </div>
              </NeumorphicCard>
            </div>
            
            <div className="flex gap-4 justify-center">
              <NeumorphicButton size="large">
                Start Your Project
              </NeumorphicButton>
              <NeumorphicButton size="large">
                View Our Work
              </NeumorphicButton>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section with Filter Tabs */}
      <section className="py-20 px-6 md:px-8 lg:px-12 bg-gradient-to-b from-transparent to-[#e8e3db]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 neumorphic-text-3d">
              Our Services
            </h2>
            <p className="text-xl matter-plastic-light mb-8">
              Comprehensive solutions for your digital needs
            </p>
            
            {/* Service Filter */}
            <div className="flex justify-center mb-12">
              <NeumorphicNav 
                items={serviceCategories}
                activeIndex={activeServiceTab}
                onItemClick={setActiveServiceTab}
              />
            </div>
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, idx) => (
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
      
      {/* Process Section - Horizontal Flow */}
      <section className="py-20 px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 neumorphic-text-3d">
              How We Work
            </h2>
            <p className="text-xl matter-plastic-light">
              A proven process that delivers results
            </p>
          </div>
          
          {/* Process Steps - Horizontal with Connectors */}
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#d4cfc7] via-[#e0dbd3] to-[#d4cfc7] -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {[
                { icon: 'search', title: 'Discovery', desc: 'We dive deep into understanding your vision, goals, and challenges' },
                { icon: 'design_services', title: 'Design', desc: 'Crafting beautiful, intuitive solutions that delight users' },
                { icon: 'code', title: 'Development', desc: 'Building robust, scalable products with clean code' },
                { icon: 'rocket_launch', title: 'Launch', desc: 'Deploying your solution and ensuring long-term success' }
              ].map((step, index) => (
                <div key={index} className="relative">
                  <NeumorphicCard>
                    <div className="p-8 text-center">
                      <div className="text-7xl font-bold mb-4 neumorphic-text-3d">
                        {index + 1}
                      </div>
                      <Icon name={step.icon} className="text-5xl mb-4 text-text-primary" />
                      <h3 className="text-xl font-bold mb-3 plastic-tube-text">{step.title}</h3>
                      <p className="text-sm text-text-secondary">{step.desc}</p>
                    </div>
                  </NeumorphicCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 px-6 md:px-8 lg:px-12 bg-gradient-to-b from-transparent to-[#e8e3db]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '150+', label: 'Projects Completed' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '5+', label: 'Years Experience' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat, idx) => (
              <NeumorphicCard key={idx}>
                <div className="p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2 plastic-tube-text">
                    {stat.number}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {stat.label}
                  </div>
                </div>
              </NeumorphicCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Work Section */}
      <section className="py-20 px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 neumorphic-text-3d">
              Featured Work
            </h2>
            <p className="text-xl matter-plastic-light">
              Some of our recent projects
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'E-Commerce Platform', type: 'Web Development', colors: ['#60a5fa', '#a78bfa'] },
              { title: 'Mobile Banking App', type: 'Mobile Development', colors: ['#4ade80', '#14b8a6'] },
              { title: 'SaaS Dashboard', type: 'UI/UX Design', colors: ['#fb923c', '#ef4444'] },
              { title: 'Healthcare Portal', type: 'Full Stack', colors: ['#c084fc', '#ec4899'] },
              { title: 'Education Platform', type: 'Web Application', colors: ['#facc15', '#fb923c'] },
              { title: 'Fitness Tracker', type: 'Mobile App', colors: ['#818cf8', '#60a5fa'] }
            ].map((project, idx) => (
              <NeumorphicCard key={idx}>
                <div className="aspect-video bg-gradient-to-br p-8 flex items-end relative overflow-hidden"
                     style={{ 
                       background: `linear-gradient(135deg, ${project.colors[0]}33, ${project.colors[1]}33)`
                     }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon name="image" className="text-6xl opacity-20" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                    <p className="text-sm text-text-secondary">{project.type}</p>
                  </div>
                </div>
              </NeumorphicCard>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <NeumorphicButton size="large">
              View All Projects
            </NeumorphicButton>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 px-6 md:px-8 lg:px-12 bg-gradient-to-b from-transparent to-[#e8e3db]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 neumorphic-text-3d">
              Client Success Stories
            </h2>
          </div>
          
          <div className="grid gap-8">
            {[
              { 
                quote: "Phoebus Digital transformed our online presence. The attention to detail and technical expertise is unmatched.",
                author: "Sarah Chen",
                role: "CEO, TechStart"
              },
              { 
                quote: "Working with Phoebus was a game-changer. They delivered on time, on budget, and exceeded our expectations.",
                author: "Michael Rodriguez",
                role: "Founder, GrowthLabs"
              }
            ].map((testimonial, idx) => (
              <NeumorphicCard key={idx}>
                <div className="p-8">
                  <Icon name="format_quote" className="text-4xl mb-4 text-text-primary opacity-50" />
                  <p className="text-lg mb-6 italic">{testimonial.quote}</p>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-text-secondary">{testimonial.role}</div>
                  </div>
                </div>
              </NeumorphicCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-32 px-6 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <NeumorphicCard>
            <div className="p-12 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 neumorphic-text-3d">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-xl mb-8 matter-plastic-light">
                Let&apos;s transform your ideas into reality
              </p>
              <p className="text-base text-text-secondary mb-8 max-w-2xl mx-auto">
                Join hundreds of satisfied clients who have trusted us to bring their digital visions to life. 
                No hidden fees, no surprises, just exceptional results.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <NeumorphicButton size="large">
                  Start Your Project
                </NeumorphicButton>
                <NeumorphicButton size="large">
                  Schedule a Call
                </NeumorphicButton>
              </div>
            </div>
          </NeumorphicCard>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}