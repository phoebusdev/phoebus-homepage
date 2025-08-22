'use client'

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './NeumorphicNav.module.css'

interface NavItem {
  label: string
  href?: string
  onClick?: () => void
}

interface NeumorphicNavProps {
  items: (NavItem | string)[]
  defaultActive?: number
  activeIndex?: number
  onItemClick?: (index: number) => void
}

export function NeumorphicNav({ 
  items, 
  defaultActive = 0,
  activeIndex: controlledActiveIndex,
  onItemClick
}: NeumorphicNavProps) {
  const [internalActiveIndex, setInternalActiveIndex] = useState(defaultActive)
  const activeIndex = controlledActiveIndex !== undefined ? controlledActiveIndex : internalActiveIndex
  const [sliderStyle, setSliderStyle] = useState<{ left: string; width: string }>({
    left: '0.25em',
    width: '0px'
  })
  const [mounted, setMounted] = useState(false)
  const navRefs = useRef<(HTMLButtonElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  // Use useLayoutEffect for immediate DOM measurements
  useLayoutEffect(() => {
    setMounted(true)
  }, [])

  // Update slider position when activeIndex changes
  useEffect(() => {
    if (mounted) {
      updateSliderPosition(activeIndex)
    }
  }, [activeIndex, mounted])

  // Multiple strategies to ensure initial position is set
  useEffect(() => {
    if (!mounted) return

    // Strategy 1: Immediate update
    updateSliderPosition(activeIndex)

    // Strategy 2: RequestAnimationFrame
    const rafId = requestAnimationFrame(() => {
      updateSliderPosition(activeIndex)
    })

    // Strategy 3: Small delay for complex layouts
    const timer = setTimeout(() => {
      updateSliderPosition(activeIndex)
    }, 50)

    // Strategy 4: Window load event
    const handleLoad = () => {
      updateSliderPosition(activeIndex)
    }
    window.addEventListener('load', handleLoad)

    // Strategy 5: ResizeObserver for layout shifts
    let resizeObserver: ResizeObserver | null = null
    if (containerRef.current && typeof ResizeObserver !== 'undefined') {
      let resizeTimeout: NodeJS.Timeout
      resizeObserver = new ResizeObserver(() => {
        clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(() => {
          updateSliderPosition(activeIndex)
        }, 10)
      })
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(timer)
      window.removeEventListener('load', handleLoad)
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [mounted, activeIndex])

  const updateSliderPosition = (index: number) => {
    const activeButton = navRefs.current[index]
    const container = containerRef.current

    if (activeButton && container) {
      const containerRect = container.getBoundingClientRect()
      const buttonRect = activeButton.getBoundingClientRect()

      const left = buttonRect.left - containerRect.left
      const width = buttonRect.width

      setSliderStyle({
        left: `${left}px`,
        width: `${width}px`
      })
    }
  }

  const handleNavClick = (index: number, item: NavItem | string) => {
    if (controlledActiveIndex === undefined) {
      setInternalActiveIndex(index)
    }
    if (onItemClick) {
      onItemClick(index)
    }
    if (typeof item !== 'string' && item.onClick) {
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
              // Update slider position when the active button ref is set
              if (el && index === activeIndex && mounted) {
                requestAnimationFrame(() => {
                  updateSliderPosition(activeIndex)
                })
              }
            }}
            className={`${styles.navItem} ${activeIndex === index ? styles.active : ''}`}
            onClick={() => handleNavClick(index, item)}
          >
            {typeof item === 'string' ? item : item.label}
          </button>
        ))}
      </div>
    </div>
  )
}