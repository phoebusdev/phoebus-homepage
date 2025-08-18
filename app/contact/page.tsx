'use client'

import { NeumorphicButton } from '@/components/NeumorphicButton/NeumorphicButton'
import { NeumorphicCard } from '@/components/NeumorphicCard/NeumorphicCard'
import { Navigation } from '@/components/Navigation/Navigation'
import { Footer } from '@/components/Footer/Footer'
import { Icon } from '@/components/Icon/Icon'
import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

const ParallaxProvider = dynamic(
  () => import('react-scroll-parallax').then(mod => mod.ParallaxProvider),
  { ssr: false }
)

const Parallax = dynamic(
  () => import('react-scroll-parallax').then(mod => mod.Parallax),
  { ssr: false }
)

// Contact methods data
const contactMethods = [
  {
    icon: "email",
    title: "Email Us",
    description: "Send us a detailed message about your project",
    action: "hello@phoebusdigital.com",
    color: "bg-gradient-to-br from-[#e8d5f2] to-[#d0e8e3]"
  },
  {
    icon: "schedule",
    title: "Book a Call",
    description: "Schedule a free 30-minute consultation",
    action: "calendly.com/phoebus",
    color: "bg-gradient-to-br from-[#d0e8e3] to-[#fce4d6]"
  },
  {
    icon: "chat",
    title: "Live Chat",
    description: "Quick questions? Chat with us directly",
    action: "Start Chat",
    color: "bg-gradient-to-br from-[#fce4d6] to-[#d5e3f0]"
  }
]

// FAQ data specific to contact/getting started
const contactFaqs = [
  {
    question: "What information do you need to provide a quote?",
    answer: "Basic project scope, target timeline, and any specific technical requirements. We can usually provide a ballpark estimate within 24 hours."
  },
  {
    question: "Do you offer free consultations?",
    answer: "Yes! We provide a free 30-minute consultation to discuss your project and determine if we're a good fit."
  },
  {
    question: "How quickly can you start a new project?",
    answer: "Most projects can start within 1-2 weeks of signing. Rush projects may be accommodated based on current workload."
  },
  {
    question: "What's the typical response time?",
    answer: "We respond to all inquiries within 4 business hours, usually much faster. Urgent requests get immediate attention."
  }
]

// Process steps for getting started
const getStartedSteps = [
  {
    step: "1",
    title: "Initial Contact",
    description: "Reach out via email, phone, or our contact form with your project details."
  },
  {
    step: "2", 
    title: "Discovery Call",
    description: "30-minute free consultation to understand your needs and goals."
  },
  {
    step: "3",
    title: "Proposal & Quote",
    description: "Detailed proposal with fixed pricing, timeline, and deliverables."
  },
  {
    step: "4",
    title: "Project Kickoff",
    description: "Contract signed and project begins with your free prototype."
  }
]

// Custom hook for cascading animation
function useCascadingAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      const triggerPoint = viewportHeight * 0.8
      const endPoint = viewportHeight * 0.2
      
      const rawProgress = Math.max(0, Math.min(1, (triggerPoint - rect.top) / (triggerPoint - endPoint)))
      const easedProgress = rawProgress * rawProgress * (3 - 2 * rawProgress)
      
      setProgress(easedProgress)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { sectionRef, progress }
}

export default function ContactPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { sectionRef, progress } = useCascadingAnimation()

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    projectType: 'web-app'
  })

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission (placeholder)
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We\'ll get back to you within 4 hours.')
  }

  if (!mounted) {
    return (
      <main className="min-h-screen relative">
        <Navigation />
        <Footer />
        <div className="relative z-10">
          <section className="relative pt-4 pb-12 md:pt-6 md:pb-16 lg:pt-8 lg:pb-20 px-4 w-full">
            <div className="max-w-6xl mx-auto w-full">
              <div className="hero-neumorphic-card text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-relaxed font-display break-words neumorphic-text-3d mb-4">
                  <span className="plastic-tube-text">Contact Us</span>
                </h1>
                <p className="text-lg sm:text-xl text-text-secondary max-w-4xl mx-auto mb-8">
                  Ready to build something amazing? Let's talk.
                </p>
              </div>
            </div>
          </section>
        </div>
        <Footer />
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
        <Footer />

        <Parallax 
          translateY={[-20, 20]}
          className="absolute inset-0 z-0"
        >
          <div className="w-full h-[120vh] bg-gradient-to-br from-[rgba(232,213,242,0.03)] via-[rgba(208,232,227,0.03)] to-[rgba(252,228,214,0.02)]" />
        </Parallax>

        <div className="relative z-10">
          {/* Hero Section */}
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
                        <span className="plastic-tube-text">Let's Build Together</span>
                      </h1>
                      <p className="text-xl sm:text-2xl text-text-secondary max-w-3xl mx-auto mb-8">
                        Ready to turn your idea into reality? <span className="matter-plastic-light">Get a free consultation</span> and 
                        see how we can bring your vision to life with <span className="matter-plastic-light">transparent pricing 
                        and reliable delivery</span>.
                      </p>
                      <div className="flex gap-4 flex-wrap justify-center">
                        <NeumorphicButton>
                          Start Your Project
                        </NeumorphicButton>
                        <NeumorphicButton>
                          Schedule Call
                        </NeumorphicButton>
                      </div>
                    </div>
                  </div>
                </Parallax>
              </div>
            </div>
          </section>

          {/* Contact Methods - Cascading Animation */}
          <section 
            ref={sectionRef}
            className="scroll-snap-section min-h-screen py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-12 flex items-center"
          >
            <div className="max-w-7xl mx-auto w-full">
              <div className="transform scale-75 origin-center" style={{ overflow: 'visible' }}>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-display neumorphic-text-3d mb-6">
                    Get In <span className="plastic-tube-text">Touch</span>
                  </h2>
                  <p className="text-lg md:text-xl text-text-secondary">
                    Choose the method that works best for you. We respond quickly to all inquiries.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {contactMethods.map((method, idx) => (
                    <div
                      key={idx}
                      className="transition-transform duration-500 ease-out"
                      style={{
                        transform: `translateY(${(1 - progress) * (100 + idx * 50)}px) rotate(${(1 - progress) * (idx % 2 === 0 ? -5 : 5)}deg)`,
                        transitionDelay: `${idx * 100}ms`
                      }}
                    >
                      <ContactMethodCard method={method} index={idx} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Contact Form Section */}
          <section className="scroll-snap-section min-h-screen py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-12 flex items-center">
            <div className="max-w-5xl mx-auto w-full">
              <div className="transform scale-75 origin-center">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                  <Parallax translateY={[-15, 15]}>
                    <div>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display neumorphic-text-3d mb-6">
                        Send Us a <span className="plastic-tube-text">Message</span>
                      </h2>
                      <p className="text-lg md:text-xl text-text-secondary mb-8">
                        Tell us about your project and we'll get back to you within 4 hours 
                        with next steps and a ballpark estimate.
                      </p>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-display text-text-primary">Getting Started Process:</h3>
                        {getStartedSteps.map((step, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-accent-sage text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {step.step}
                            </div>
                            <div>
                              <h4 className="font-display text-text-primary">{step.title}</h4>
                              <p className="text-sm text-text-secondary">{step.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Parallax>
                  
                  <Parallax translateY={[15, -15]}>
                    <NeumorphicCard>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-display text-text-primary mb-2">
                              Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              className="w-full p-3 rounded-lg border border-shadow-dark bg-white/50 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-sage"
                              placeholder="Your full name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-display text-text-primary mb-2">
                              Email *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="w-full p-3 rounded-lg border border-shadow-dark bg-white/50 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-sage"
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-display text-text-primary mb-2">
                              Company
                            </label>
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleInputChange}
                              className="w-full p-3 rounded-lg border border-shadow-dark bg-white/50 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-sage"
                              placeholder="Your company (optional)"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-display text-text-primary mb-2">
                              Project Type
                            </label>
                            <select
                              name="projectType"
                              value={formData.projectType}
                              onChange={handleInputChange}
                              className="w-full p-3 rounded-lg border border-shadow-dark bg-white/50 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-sage"
                            >
                              <option value="web-app">Web Application</option>
                              <option value="mobile-app">Mobile App</option>
                              <option value="ecommerce">E-commerce</option>
                              <option value="saas">SaaS Platform</option>
                              <option value="api">API Development</option>
                              <option value="consulting">Consulting</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-display text-text-primary mb-2">
                            Project Description *
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            rows={5}
                            className="w-full p-3 rounded-lg border border-shadow-dark bg-white/50 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-sage"
                            placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                          />
                        </div>
                        
                        <NeumorphicButton type="submit" className="w-full">
                          Send Message
                        </NeumorphicButton>
                      </form>
                    </NeumorphicCard>
                  </Parallax>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="scroll-snap-section min-h-screen py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-12 flex items-center">
            <div className="max-w-5xl mx-auto w-full">
              <div className="transform scale-75 origin-center">
                <Parallax translateY={[-20, 10]}>
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display neumorphic-text-3d mb-6">
                      Common <span className="plastic-tube-text">Questions</span>
                    </h2>
                    <p className="text-lg md:text-xl text-text-secondary">
                      Quick answers to help you get started.
                    </p>
                  </div>
                </Parallax>
                
                <div className="space-y-6">
                  {contactFaqs.map((faq, idx) => (
                    <Parallax 
                      key={idx}
                      translateY={[20 + idx * 5, -10]}
                      easing="easeOutQuad"
                    >
                      <ContactFAQCard faq={faq} index={idx} />
                    </Parallax>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </main>
    </ParallaxProvider>
  )
}

// Contact Method Card Component
function ContactMethodCard({ method, index }: { method: any, index: number }) {
  return (
    <NeumorphicCard className={`h-full ${method.color}`}>
      <div className="text-center p-6">
        <Icon name={method.icon} className="text-4xl text-text-primary mb-4" />
        <h3 className="text-xl font-display neumorphic-text-3d mb-3">
          {method.title}
        </h3>
        <p className="text-text-secondary mb-4">
          {method.description}
        </p>
        <div className="text-accent-sage font-display">
          {method.action}
        </div>
      </div>
    </NeumorphicCard>
  )
}

// Contact FAQ Card Component
function ContactFAQCard({ faq, index }: { faq: any, index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <NeumorphicCard className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-display text-text-primary">{faq.question}</h3>
          <Icon 
            name={isOpen ? "expand_less" : "expand_more"} 
            className="text-text-secondary transition-transform duration-200"
          />
        </div>
        {isOpen && (
          <div className="mt-4 pt-4 border-t border-shadow-dark">
            <p className="text-text-secondary">{faq.answer}</p>
          </div>
        )}
      </div>
    </NeumorphicCard>
  )
}