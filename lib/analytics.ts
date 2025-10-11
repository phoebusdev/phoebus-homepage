// Vercel Analytics helper functions

import { track } from '@vercel/analytics'

/**
 * Tracks a custom event in Vercel Analytics
 * @param eventName - Name of the event to track
 * @param properties - Optional properties to attach to the event
 */
export function trackEvent(
  eventName: string,
  properties?: Record<string, string | number | boolean>
): void {
  try {
    track(eventName, properties)
  } catch (error) {
    // Gracefully handle analytics failures - don't break the app
    console.error('Analytics tracking error:', error)
  }
}

/**
 * Tracks contact form submission
 * @param formLocation - Where the form was submitted from (e.g., "hero", "footer")
 */
export function trackContactFormSubmission(formLocation: string): void {
  trackEvent('contact_form_submission', {
    formLocation
  })
}

/**
 * Tracks CTA button clicks
 * @param buttonText - Text of the button that was clicked
 * @param buttonLocation - Location of the button on the page
 */
export function trackCTAClick(buttonText: string, buttonLocation: string): void {
  trackEvent('cta_click', {
    buttonText,
    buttonLocation
  })
}
