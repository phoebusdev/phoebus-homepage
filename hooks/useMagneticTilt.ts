import { useRef, useState, useCallback, useEffect } from 'react'

interface MagneticTiltOptions {
  maxTilt?: number // Maximum tilt angle in degrees
  perspective?: number // Perspective value for 3D effect
  scale?: number // Scale on hover
}

export function useMagneticTilt<T extends HTMLElement>(
  options: MagneticTiltOptions = {}
) {
  const {
    maxTilt = 8,
    perspective = 1000,
    scale = 1.02
  } = options

  const ref = useRef<T>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const [isEnabled, setIsEnabled] = useState(true)

  // Check for reduced motion preference and mobile
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    // TEMP: Force enable for testing - ignoring both checks
    const enabled = true // !prefersReducedMotion && !isMobile

    setIsEnabled(enabled)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement> | MouseEvent) => {
    if (!ref.current || !isEnabled) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate distance from center
    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY

    // Convert to percentage of card size
    const percentX = deltaX / (rect.width / 2)
    const percentY = deltaY / (rect.height / 2)

    // Calculate tilt (inverted for natural feel)
    const rotateY = percentX * maxTilt
    const rotateX = -percentY * maxTilt

    setTilt({ rotateX, rotateY })
  }, [maxTilt, isEnabled])

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!isEnabled) return
    setIsHovered(true)
  }, [isEnabled])

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!isEnabled) return
    setIsHovered(false)
    setTilt({ rotateX: 0, rotateY: 0 })
  }, [isEnabled])

  const style = isEnabled ? {
    transform: `perspective(${perspective}px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${isHovered ? scale : 1})`,
    transition: isHovered
      ? 'transform 0.1s ease-out'
      : 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  } : {}

  return {
    ref,
    style,
    handlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onMouseMove: isHovered ? handleMouseMove : undefined,
    },
    isHovered,
  }
}
