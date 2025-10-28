'use client'

import { useState } from 'react'
import { NeumorphicButton } from '@/components/NeumorphicButton/NeumorphicButton'
import { NeumorphicCard } from '@/components/NeumorphicCard/NeumorphicCard'
import { Icon } from '@/components/Icon/Icon'

interface PrototypeModalProps {
  isOpen: boolean
  onClose: () => void
  source?: string // Track where the request came from
}

export function PrototypeModal({ isOpen, onClose, source }: PrototypeModalProps) {
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
      const response = await fetch('/api/prototype', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: source || 'Website'
        }),
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
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose()
          setSubmitStatus('idle')
        }, 2000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Prototype request error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="max-w-2xl w-full h-fit max-h-[95vh] flex flex-col">
        <NeumorphicCard className="flex-1 overflow-hidden">
          <div className="p-4 md:p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold plastic-tube-text">
                Get Your Free Prototype
              </h2>
              <button
                onClick={onClose}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                <Icon name="close" className="text-2xl" />
              </button>
            </div>

            {submitStatus === 'success' ? (
              <div className="text-center py-8">
                <Icon name="check_circle" className="text-6xl text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  Request Sent Successfully!
                </h3>
                <p className="text-text-secondary mb-4">
                  We'll contact you within 24 hours to discuss your free prototype.
                </p>
                <p className="text-sm text-text-secondary">
                  Closing automatically...
                </p>
              </div>
            ) : (
              <>
                <p className="text-text-secondary mb-6">
                  Tell us about your project and we'll build you a working prototype at no cost. 
                  See exactly what you'll get before making any commitment.
                </p>

                <form onSubmit={handleSubmit} className="space-y-3 flex-1 flex flex-col">
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
                      Project Description
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-3 rounded-lg border border-[#d4cfc7] bg-white/50 text-text-primary focus:outline-none focus:ring-2 focus:ring-[#d4cfc7]"
                      placeholder="Tell us about your project idea, goals, and any specific requirements..."
                    />
                  </div>

                  {/* Status Messages */}
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                      <div className="flex items-center">
                        <Icon name="error" className="text-red-500 mr-2" />
                        <span>Failed to send request. Please try again or contact us directly.</span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <NeumorphicButton
                      type="button"
                      onClick={onClose}
                      className="flex-1"
                    >
                      Cancel
                    </NeumorphicButton>
                    <NeumorphicButton
                      type="submit"
                      size="medium"
                      className="flex-1"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <Icon name="hourglass_empty" className="animate-spin mr-2" />
                          Sending...
                        </div>
                      ) : (
                        'Get Free Prototype'
                      )}
                    </NeumorphicButton>
                  </div>
                </form>
              </>
            )}
          </div>
        </NeumorphicCard>
      </div>
    </div>
  )
}