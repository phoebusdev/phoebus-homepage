'use client'

import { useEffect, useRef } from 'react'

interface MagneticZoneProps {
  children: React.ReactNode
  magnetStrength?: number
  zoneId: string
}

export function ResistanceZone({ children, magnetStrength = 0.08, zoneId }: MagneticZoneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const targetScrollY = useRef<number>(0)
  const isInMagneticZone = useRef<boolean>(false)
  const magneticCenter = useRef<number>(0)
  const lastUserScroll = useRef<number>(0)
  const scrollVelocity = useRef<number>(0)
  const hasSnapped = useRef<boolean>(false)
  const decelerationActive = useRef<boolean>(false)
  const isScrolling = useRef<boolean>(false)
  const scrollTimeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    let observer: IntersectionObserver

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const updateMagneticScroll = () => {
      const currentScroll = window.scrollY
      
      // Don't interfere if we're already programmatically scrolling
      if (isScrolling.current) {
        animationRef.current = requestAnimationFrame(updateMagneticScroll)
        return
      }
      
      if (isInMagneticZone.current) {
        // Calculate scroll velocity
        scrollVelocity.current = currentScroll - lastUserScroll.current
        lastUserScroll.current = currentScroll
        
        // Calculate distance from magnetic center
        const distanceFromCenter = Math.abs(currentScroll - magneticCenter.current)
        const snapDistance = window.innerHeight * 0.1 // Smaller snap zone for precision
        
        // Reset snap flag when far from center
        if (distanceFromCenter > window.innerHeight * 0.25) {
          hasSnapped.current = false
          decelerationActive.current = false
        }
        
        // Only snap when velocity is very low and close to center
        if (Math.abs(scrollVelocity.current) < 0.5 && !hasSnapped.current && !isScrolling.current) {
          if (distanceFromCenter < snapDistance && distanceFromCenter > 5) {
            hasSnapped.current = true
            isScrolling.current = true
            
            // Clear any existing timeout
            if (scrollTimeout.current) {
              clearTimeout(scrollTimeout.current)
            }
            
            // Single, clean snap to perfect position
            window.scrollTo({
              top: magneticCenter.current,
              behavior: 'smooth'
            })
            
            // Reset scrolling flag after animation completes
            scrollTimeout.current = setTimeout(() => {
              isScrolling.current = false
            }, 300) // Wait for smooth scroll to complete
          }
        }
      }

      animationRef.current = requestAnimationFrame(updateMagneticScroll)
    }

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.target === containerRef.current) {
          const isVisible = entry.intersectionRatio > 0.4
          
          if (isVisible && !isInMagneticZone.current) {
            // Calculate optimal viewing position (magnetic center)
            const rect = entry.boundingClientRect
            const viewportHeight = window.innerHeight
            const elementTop = rect.top + window.scrollY
            const elementHeight = rect.height
            
            // Magnetic center: position where element is perfectly centered in viewport
            magneticCenter.current = elementTop + (elementHeight / 2) - (viewportHeight / 2)
            isInMagneticZone.current = true
            lastUserScroll.current = window.scrollY
          } else if (!isVisible) {
            isInMagneticZone.current = false
          }
        }
      })
    }

    if (containerRef.current) {
      // Set up intersection observer
      observer = new IntersectionObserver(handleIntersection, {
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
        rootMargin: '-5% 0px -5% 0px'
      })
      
      observer.observe(containerRef.current)
      
      // Start magnetic effect loop
      updateMagneticScroll()
    }

    return () => {
      if (observer && containerRef.current) {
        observer.unobserve(containerRef.current)
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [magnetStrength, zoneId])

  return (
    <div ref={containerRef} data-magnetic-zone={zoneId}>
      {children}
    </div>
  )
}