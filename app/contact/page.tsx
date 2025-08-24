'use client'

import { Navigation } from '@/components/Navigation/Navigation'
import { NeumorphicButton } from '@/components/NeumorphicButton/NeumorphicButton'
import { NeumorphicCard } from '@/components/NeumorphicCard/NeumorphicCard'
import { Icon } from '@/components/Icon/Icon'
import { Footer } from '@/components/Footer/Footer'
import { PrototypeModal } from '@/components/PrototypeModal/PrototypeModal'
import { usePrototypeModal } from '@/hooks/usePrototypeModal'
import { useState } from 'react'

export default function ContactPage() {
  const { isOpen, openModal, closeModal } = usePrototypeModal()
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    projectType: 'web-app'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          company: '',
          message: '',
          projectType: 'web-app'
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactMethods = [
    {
      icon: "phone",
      title: "Call Us",
      description: "For immediate assistance and consultations",
      action: "+1 (416) 768-1201",
      color: "bg-gradient-to-br from-[#e8d5f2] to-[#d0e8e3]"
    },
    {
      icon: "email",
      title: "Email Us",
      description: "Send us a detailed message about your project",
      action: "phoebusdigitalsolutions@gmail.com",
      color: "bg-gradient-to-br from-[#d0e8e3] to-[#fce4d6]"
    },
    {
      icon: "public",
      title: "Serving Globally",
      description: "Remote services available worldwide",
      action: "Working Remotely",
      color: "bg-gradient-to-br from-[#fce4d6] to-[#d5e3f0]"
    }
  ]

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

  return (
    <main className="relative">
      <Navigation />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 md:px-8 lg:px-12 py-16">
        <div className="max-w-5xl w-full text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 plastic-tube-text">
            Let's Build Something Amazing Together
          </h1>
          <p className="text-lg md:text-xl mb-8 text-text-secondary max-w-4xl mx-auto">
            Ready to turn your idea into reality? Get a free consultation and see how we can bring your vision to life with transparent pricing and reliable delivery.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <NeumorphicButton size="large" onClick={openModal}>
              Get Your Free Prototype
            </NeumorphicButton>
            <NeumorphicButton size="large">
              Schedule a Call
            </NeumorphicButton>
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="min-h-screen flex items-center py-16 px-6 md:px-8 lg:px-12 bg-gradient-to-b from-transparent to-[#e8e3db]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 plastic-tube-text">
              Get In Touch
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Choose the method that works best for you. We respond quickly to all inquiries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, idx) => (
              <NeumorphicCard key={idx} className={`h-full ${method.color}`}>
                <div className="text-center p-8">
                  <Icon name={method.icon} className="text-4xl text-text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">{method.title}</h3>
                  <p className="text-text-secondary mb-4">{method.description}</p>
                  <p className="text-text-primary font-semibold">{method.action}</p>
                </div>
              </NeumorphicCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="min-h-screen flex items-center py-16 px-6 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 plastic-tube-text">
                Send Us a Message
              </h2>
              <p className="text-lg text-text-secondary mb-8">
                Tell us about your project and we'll get back to you within 4 hours with next steps and a ballpark estimate.
              </p>
              
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-text-primary">Getting Started Process:</h3>
                {getStartedSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-[#d4cfc7] text-[#2a2a2a] rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-text-primary mb-1">{step.title}</h4>
                      <p className="text-sm text-text-secondary">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <NeumorphicCard>
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-text-primary mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 rounded-lg border border-[#d4cfc7] bg-white/50 text-text-primary focus:outline-none focus:ring-2 focus:ring-[#d4cfc7]"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-text-primary mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 rounded-lg border border-[#d4cfc7] bg-white/50 text-text-primary focus:outline-none focus:ring-2 focus:ring-[#d4cfc7]"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-text-primary mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-lg border border-[#d4cfc7] bg-white/50 text-text-primary focus:outline-none focus:ring-2 focus:ring-[#d4cfc7]"
                        placeholder="Your company (optional)"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-text-primary mb-2">
                        Project Type
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-lg border border-[#d4cfc7] bg-white/50 text-text-primary focus:outline-none focus:ring-2 focus:ring-[#d4cfc7]"
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
                    <label className="block text-sm font-bold text-text-primary mb-2">
                      Project Description *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full p-3 rounded-lg border border-[#d4cfc7] bg-white/50 text-text-primary focus:outline-none focus:ring-2 focus:ring-[#d4cfc7]"
                      placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                    />
                  </div>
                  
                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                      <div className="flex items-center">
                        <Icon name="check_circle" className="text-green-500 mr-2" />
                        <span>Message sent successfully! We'll get back to you within 4 hours.</span>
                      </div>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                      <div className="flex items-center">
                        <Icon name="error" className="text-red-500 mr-2" />
                        <span>Failed to send message. Please try again or contact us directly.</span>
                      </div>
                    </div>
                  )}
                  
                  <NeumorphicButton 
                    type="submit" 
                    size="large" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <Icon name="hourglass_empty" className="animate-spin mr-2" />
                        Sending...
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </NeumorphicButton>
                </form>
              </div>
            </NeumorphicCard>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="min-h-screen flex items-center py-16 px-6 md:px-8 lg:px-12 bg-gradient-to-b from-transparent to-[#e8e3db]">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 plastic-tube-text">
              Common Questions
            </h2>
            <p className="text-lg text-text-secondary">
              Quick answers to help you get started.
            </p>
          </div>
          
          <div className="space-y-6">
            {contactFaqs.map((faq, idx) => (
              <ContactFAQCard key={idx} faq={faq} index={idx} />
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
      
      <PrototypeModal 
        isOpen={isOpen} 
        onClose={closeModal} 
        source="Contact" 
      />
    </main>
  )
}

// Contact FAQ Card Component
function ContactFAQCard({ faq, index }: { faq: any, index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <NeumorphicCard className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-text-primary">{faq.question}</h3>
          <Icon 
            name={isOpen ? "expand_less" : "expand_more"} 
            className="text-text-secondary transition-transform duration-200"
          />
        </div>
        {isOpen && (
          <div className="mt-4 pt-4 border-t border-[#d4cfc7]/30">
            <p className="text-text-secondary">{faq.answer}</p>
          </div>
        )}
      </div>
    </NeumorphicCard>
  )
}