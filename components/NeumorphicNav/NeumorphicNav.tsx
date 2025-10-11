'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import styles from './NeumorphicNav.module.css'

interface NavItem {
  label: string
  href?: string
  onClick?: () => void
}

interface NeumorphicNavProps {
  items: NavItem[]
  defaultActive?: number
}

export function NeumorphicNav({ items, defaultActive = 0 }: NeumorphicNavProps) {
  const [activeIndex, setActiveIndex] = useState(defaultActive)
  const [sliderStyle, setSliderStyle] = useState<{ left: string; width: string }>({
    left: '0.25em',
    width: '100px' // Start with a reasonable default instead of 0px
  })
  const navRefs = useRef<(HTMLButtonElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  const updateSliderPosition = useCallback((index: number) => {
    const activeButton = navRefs.current[index]
    const container = containerRef.current

    if (activeButton && container) {
      const containerRect = container.getBoundingClientRect()
      const buttonRect = activeButton.getBoundingClientRect()

      setSliderStyle({
        left: `${buttonRect.left - containerRect.left}px`,
        width: `${buttonRect.width}px`
      })
    }
  }, [])

  // Mount effect - set initial position
  useEffect(() => {
    setIsMounted(true)

    // Multiple fallbacks to ensure slider positions correctly
    const timeouts = [
      setTimeout(() => updateSliderPosition(activeIndex), 0),
      setTimeout(() => updateSliderPosition(activeIndex), 50),
      setTimeout(() => updateSliderPosition(activeIndex), 100),
    ]

    return () => {
      timeouts.forEach(clearTimeout)
    }
  }, [activeIndex, updateSliderPosition])

  // ResizeObserver-only approach - handles all layout changes
  useEffect(() => {
    const container = containerRef.current
    if (!container || !isMounted) return

    // Use requestAnimationFrame to ensure DOM is ready before measuring
    const updatePosition = () => {
      requestAnimationFrame(() => {
        updateSliderPosition(activeIndex)
      })
    }

    // Initial position
    updatePosition()

    // ResizeObserver for layout changes (font loading, resize, dynamic content)
    const resizeObserver = new ResizeObserver(() => {
      updatePosition()
    })

    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
    }
  }, [activeIndex, updateSliderPosition, isMounted])

  const handleNavClick = (index: number, item: NavItem) => {
    setActiveIndex(index)
    if (item.onClick) {
      item.onClick()
    }
  }

  return (
    <div className={styles.navWrapper}>
      <div className={styles.navContainer} ref={containerRef}>
        <div
          className={styles.navSlider}
          style={sliderStyle}
        />
        {items.map((item, index) => (
          <button
            key={index}
            ref={el => {
              navRefs.current[index] = el
            }}
            className={`${styles.navItem} ${activeIndex === index ? styles.active : ''}`}
            onClick={() => handleNavClick(index, item)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}