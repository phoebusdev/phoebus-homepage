'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { ContactFormState } from '@/types'
import {
  getNameErrorMessage,
  getEmailErrorMessage,
  getPhoneErrorMessage,
  getProjectDescriptionErrorMessage,
} from '@/lib/validation'
import { trackEvent } from '@/lib/analytics'
import styles from './ContactForm.module.css'

interface ContactFormProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [formState, setFormState] = useState<ContactFormState>({
    status: 'idle',
    errors: {},
    message: null
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectDescription: ''
  })

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [lastSubmissionTime, setLastSubmissionTime] = useState<number>(0)

  // Track unsaved changes
  useEffect(() => {
    const hasData = !!(formData.name || formData.email || formData.phone || formData.projectDescription)
    setHasUnsavedChanges(hasData && formState.status !== 'success')
  }, [formData, formState.status])

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleClose = useCallback(() => {
    if (hasUnsavedChanges && formState.status !== 'success') {
      const confirmed = window.confirm(
        'You have unsaved changes. Are you sure you want to close the form?'
      )
      if (!confirmed) return
    }
    onClose()
  }, [hasUnsavedChanges, formState.status, onClose])

  const validateField = (field: string, value: string): string | null => {
    switch (field) {
      case 'name':
        return getNameErrorMessage(value)
      case 'email':
        return getEmailErrorMessage(value)
      case 'phone':
        return getPhoneErrorMessage(value || null)
      case 'projectDescription':
        return getProjectDescriptionErrorMessage(value)
      default:
        return null
    }
  }

  const handleBlur = (field: string) => {
    const value = formData[field as keyof typeof formData]
    const error = validateField(field, value)

    setFormState(prev => ({
      ...prev,
      errors: {
        ...prev.errors,
        [field]: error || undefined
      }
    }))
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (formState.errors[field as keyof typeof formState.errors]) {
      setFormState(prev => ({
        ...prev,
        errors: {
          ...prev.errors,
          [field]: undefined
        }
      }))
    }
  }

  const validateAllFields = (): boolean => {
    const errors: ContactFormState['errors'] = {}
    let hasErrors = false

    Object.keys(formData).forEach(field => {
      if (field !== 'phone') { // Phone is optional
        const error = validateField(field, formData[field as keyof typeof formData])
        if (error) {
          errors[field as keyof typeof errors] = error
          hasErrors = true
        }
      } else if (formData.phone) { // Only validate phone if provided
        const error = validateField(field, formData.phone)
        if (error) {
          errors[field as keyof typeof errors] = error
          hasErrors = true
        }
      }
    })

    setFormState(prev => ({ ...prev, errors }))
    return !hasErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Rate limiting: 1 submission per 60 seconds
    const now = Date.now()
    if (now - lastSubmissionTime < 60000) {
      setFormState({
        status: 'error',
        errors: {},
        message: 'Please wait 60 seconds between submissions'
      })
      return
    }

    // Validate all fields
    if (!validateAllFields()) {
      setFormState(prev => ({
        ...prev,
        status: 'error',
        message: 'Please fix the errors above before submitting'
      }))

      // Focus first error field
      const firstErrorField = Object.keys(formState.errors)[0]
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField)
        element?.focus()
      }
      return
    }

    // Set validating status
    setFormState({ status: 'validating', errors: {}, message: null })

    // Set submitting status
    setTimeout(() => {
      setFormState(prev => ({ ...prev, status: 'submitting' }))
    }, 300)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          phone: formData.phone || null,
          timestamp: new Date()
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      // Success!
      setFormState({
        status: 'success',
        errors: {},
        message: 'Thank you! Your message has been sent successfully. We\'ll be in touch soon.'
      })

      setLastSubmissionTime(now)
      setHasUnsavedChanges(false)

      // Track analytics
      trackEvent('contact_form_submission', {
        source: 'homepage',
        hasPhone: !!formData.phone
      })

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', projectDescription: '' })
        setFormState({ status: 'idle', errors: {}, message: null })
      }, 3000)

    } catch (error) {
      setFormState({
        status: 'error',
        errors: {},
        message: error instanceof Error ? error.message : 'Failed to send message. Please try again.'
      })
    }
  }

  const handleRetry = () => {
    setFormState({ status: 'idle', errors: {}, message: null })
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Let's Build Something Great</h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Close contact form"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {formState.status === 'success' ? (
          <div className={styles.successMessage} role="alert">
            <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#4caf50' }}>
              check_circle
            </span>
            <p>{formState.message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Name <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`${styles.input} ${formState.errors.name ? styles.inputError : ''}`}
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                disabled={formState.status === 'submitting' || formState.status === 'validating'}
                aria-describedby={formState.errors.name ? 'name-error' : undefined}
                aria-invalid={!!formState.errors.name}
                required
              />
              {formState.errors.name && (
                <span id="name-error" className={styles.error} role="alert">
                  {formState.errors.name}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email <span className={styles.required}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`${styles.input} ${formState.errors.email ? styles.inputError : ''}`}
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                disabled={formState.status === 'submitting' || formState.status === 'validating'}
                aria-describedby={formState.errors.email ? 'email-error' : undefined}
                aria-invalid={!!formState.errors.email}
                required
              />
              {formState.errors.email && (
                <span id="email-error" className={styles.error} role="alert">
                  {formState.errors.email}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.label}>
                Phone <span className={styles.optional}>(optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={`${styles.input} ${formState.errors.phone ? styles.inputError : ''}`}
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                onBlur={() => handleBlur('phone')}
                disabled={formState.status === 'submitting' || formState.status === 'validating'}
                aria-describedby={formState.errors.phone ? 'phone-error' : undefined}
                aria-invalid={!!formState.errors.phone}
              />
              {formState.errors.phone && (
                <span id="phone-error" className={styles.error} role="alert">
                  {formState.errors.phone}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="projectDescription" className={styles.label}>
                Tell us about your project <span className={styles.required}>*</span>
              </label>
              <textarea
                id="projectDescription"
                name="projectDescription"
                className={`${styles.textarea} ${formState.errors.projectDescription ? styles.inputError : ''}`}
                value={formData.projectDescription}
                onChange={(e) => handleChange('projectDescription', e.target.value)}
                onBlur={() => handleBlur('projectDescription')}
                disabled={formState.status === 'submitting' || formState.status === 'validating'}
                aria-describedby={formState.errors.projectDescription ? 'projectDescription-error' : undefined}
                aria-invalid={!!formState.errors.projectDescription}
                rows={5}
                required
              />
              <span className={styles.charCount}>
                {formData.projectDescription.length} / 2000 characters
              </span>
              {formState.errors.projectDescription && (
                <span id="projectDescription-error" className={styles.error} role="alert">
                  {formState.errors.projectDescription}
                </span>
              )}
            </div>

            {formState.message && formState.status === 'error' && (
              <div className={styles.errorMessage} role="alert">
                <p>{formState.message}</p>
                <button
                  type="button"
                  className={styles.retryButton}
                  onClick={handleRetry}
                >
                  Try Again
                </button>
              </div>
            )}

            <div className={styles.formActions}>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={formState.status === 'submitting' || formState.status === 'validating'}
              >
                {formState.status === 'submitting' || formState.status === 'validating' ? (
                  <>
                    <span className={styles.spinner}></span>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
