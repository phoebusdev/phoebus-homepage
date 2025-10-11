import { useEffect, useRef, useState } from 'react'

/**
 * Custom hook for triggering animations when elements enter the viewport
 * Uses Intersection Observer API for performance (no scroll event listeners)
 *
 * @param options - Configuration options for the intersection observer
 * @returns Object with ref to attach to element and isVisible state
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { ref, isVisible } = useIntersectionAnimation({ threshold: 0.2 })
 *
 *   return (
 *     <div ref={ref} className={isVisible ? 'animate-in' : 'animate-out'}>
 *       Content
 *     </div>
 *   )
 * }
 * ```
 */

interface UseIntersectionAnimationOptions {
  /** How much of the element must be visible (0.0 to 1.0) */
  threshold?: number
  /** Margin around the viewport for early triggering */
  rootMargin?: string
  /** Whether to trigger only once or every time element enters/exits */
  triggerOnce?: boolean
}

export function useIntersectionAnimation<T extends HTMLElement>(
  options: UseIntersectionAnimationOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true
  } = options

  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Respect prefers-reduced-motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      // Skip animations, show content immediately
      setIsVisible(true)
      return
    }

    // Create Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            observer.disconnect()
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    // Check if element is already in viewport on mount
    const rect = element.getBoundingClientRect()
    const isInViewport = (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )

    if (isInViewport || rect.top < window.innerHeight) {
      setIsVisible(true)
      if (triggerOnce) {
        observer.disconnect()
      }
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce])

  return { ref, isVisible }
}
