'use client'

import { useEffect, useRef } from 'react'

interface SmoothScrollZoneProps {
  children: React.ReactNode
  slowFactor?: number
  zoneId: string
}

export function SmoothScrollZone({ children, slowFactor = 0.6, zoneId }: SmoothScrollZoneProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let isInHoneyZone = false
    let lastScrollTime = 0
    let scrollVelocity = 0
    let isMouseWheel = false

    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current) return

      const now = Date.now()
      const deltaTime = now - lastScrollTime
      lastScrollTime = now

      // Detect mouse wheel vs trackpad
      isMouseWheel = Math.abs(e.deltaY) > 10 && deltaTime < 50

      const section = sectionRef.current
      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      // Define honey zone boundaries
      const optimalStart = viewportHeight * 0.1
      const optimalEnd = viewportHeight * 0.9
      
      // Check if we're in the honey zone
      const inHoneyZone = rect.top <= optimalStart && rect.bottom >= optimalEnd
      
      if (inHoneyZone && !isMouseWheel) {
        // Only apply resistance to trackpad scrolling
        const resistance = slowFactor
        e.preventDefault()
        
        // Apply smooth momentum scrolling
        const scrollAmount = e.deltaY * resistance
        window.scrollBy({
          top: scrollAmount,
          behavior: 'auto'
        })
      }
      
      isInHoneyZone = inHoneyZone
    }

    const handleScroll = () => {
      if (!sectionRef.current) return

      const section = sectionRef.current
      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      // Update honey zone status for visual feedback if needed
      const optimalStart = viewportHeight * 0.1
      const optimalEnd = viewportHeight * 0.9
      const inHoneyZone = rect.top <= optimalStart && rect.bottom >= optimalEnd
      
      if (inHoneyZone !== isInHoneyZone) {
        isInHoneyZone = inHoneyZone
        // Optional: Add visual indicator or debug info
        section.style.transition = 'all 0.3s ease'
      }
    }

    // Use passive: false to allow preventDefault on wheel events
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [slowFactor, zoneId])

  return (
    <div 
      ref={sectionRef}
      data-scroll-zone={zoneId}
    >
      {children}
    </div>
  )
}