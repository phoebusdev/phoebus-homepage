'use client'

import React, { ReactNode, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useScrollDebug, AnimationConfig, calculateTransform } from '@/components/ScrollDebugContext/ScrollDebugContext'

const Parallax = dynamic(
  () => import('react-scroll-parallax').then(mod => mod.Parallax),
  { ssr: false }
)

interface DebugParallaxProps {
  children: ReactNode
  debugId: string
  // Fallback props for when debug is disabled
  translateX?: [number, number]
  translateY?: [number, number]
  rotate?: [number, number]
  startScroll?: number
  endScroll?: number
  className?: string
  style?: React.CSSProperties
}

export function DebugParallax({
  children,
  debugId,
  translateX = [0, 0],
  translateY = [0, 0],
  rotate = [0, 0],
  startScroll = 0,
  endScroll = 1000,
  className,
  style
}: DebugParallaxProps) {
  const { isDebugMode, getConfig, highlightedElementId, currentScrollY } = useScrollDebug()
  const elementRef = useRef<HTMLDivElement>(null)
  
  // Get debug config or use fallback values
  const debugConfig = isDebugMode ? getConfig(debugId) : null
  const config: AnimationConfig = debugConfig || {
    id: debugId,
    name: debugId,
    translateX,
    translateY,
    rotate,
    startScroll,
    endScroll
  }

  // Calculate current transform values for visual feedback
  const currentTransform = calculateTransform(config, currentScrollY)
  
  // Apply highlighting effect
  const isHighlighted = highlightedElementId === debugId
  const highlightStyle: React.CSSProperties = isHighlighted ? {
    boxShadow: '0 0 20px rgba(115, 185, 158, 0.6), inset 0 0 20px rgba(115, 185, 158, 0.2)',
    outline: '2px solid rgba(115, 185, 158, 0.8)',
    outlineOffset: '4px',
    transition: 'box-shadow 0.3s ease, outline 0.3s ease',
    position: 'relative',
    zIndex: 9999
  } : {}

  // Debug info overlay
  const showDebugInfo = isDebugMode && isHighlighted
  
  const debugInfoStyle: React.CSSProperties = {
    position: 'absolute',
    top: '-60px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(0, 0, 0, 0.9)',
    color: 'white',
    padding: '8px 12px',
    borderRadius: '8px',
    fontSize: '12px',
    whiteSpace: 'nowrap',
    zIndex: 10000,
    fontFamily: 'monospace',
    pointerEvents: 'none'
  }

  return (
    <Parallax
      translateX={config.translateX}
      translateY={config.translateY}
      rotate={config.rotate}
      startScroll={config.startScroll}
      endScroll={config.endScroll}
      className={className}
    >
      <div
        ref={elementRef}
        data-debug-id={debugId}
        style={{
          ...style,
          ...highlightStyle,
          position: 'relative'
        }}
      >
        {children}
        
        {/* Debug Info Overlay */}
        {showDebugInfo && (
          <div style={debugInfoStyle}>
            {config.name} | Progress: {(currentTransform.progress * 100).toFixed(1)}% | 
            X: {currentTransform.translateX.toFixed(1)} | 
            Y: {currentTransform.translateY.toFixed(1)} | 
            R: {currentTransform.rotate.toFixed(1)}°
          </div>
        )}
      </div>
    </Parallax>
  )
}

// Convenience component for non-debug Parallax elements
export function StaticParallax({
  children,
  ...parallaxProps
}: {
  children: ReactNode
  translateX?: [number, number]
  translateY?: [number, number]
  rotate?: [number, number]
  startScroll?: number
  endScroll?: number
  className?: string
  easing?: string
}) {
  return (
    <Parallax {...parallaxProps}>
      {children}
    </Parallax>
  )
}