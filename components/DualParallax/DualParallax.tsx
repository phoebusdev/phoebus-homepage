'use client'

import React, { ReactNode, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useScrollDebug, AnimationConfig, calculateTransform } from '@/components/ScrollDebugContext/ScrollDebugContext'

const Parallax = dynamic(
  () => import('react-scroll-parallax').then(mod => mod.Parallax),
  { ssr: false }
)

interface DualParallaxProps {
  children: ReactNode
  entryDebugId: string
  exitDebugId: string
  className?: string
  style?: React.CSSProperties
}

export function DualParallax({
  children,
  entryDebugId,
  exitDebugId,
  className,
  style
}: DualParallaxProps) {
  const { isDebugMode, getConfig, highlightedElementId, currentScrollY } = useScrollDebug()
  
  // Get both animation configs
  const entryConfig = isDebugMode ? getConfig(entryDebugId) : null
  const exitConfig = isDebugMode ? getConfig(exitDebugId) : null
  
  // Calculate current transform values for both animations
  const entryTransform = entryConfig ? calculateTransform(entryConfig, currentScrollY) : null
  const exitTransform = exitConfig ? calculateTransform(exitConfig, currentScrollY) : null
  
  // Combine transforms
  const combinedTransform = useMemo(() => {
    let combinedX = 0
    let combinedY = 0
    let combinedRotate = 0
    
    if (entryTransform) {
      combinedX += entryTransform.translateX
      combinedY += entryTransform.translateY
      combinedRotate += entryTransform.rotate
    }
    
    if (exitTransform) {
      combinedX += exitTransform.translateX
      combinedY += exitTransform.translateY
      combinedRotate += exitTransform.rotate
    }
    
    return {
      translateX: combinedX,
      translateY: combinedY,
      rotate: combinedRotate
    }
  }, [entryTransform, exitTransform])
  
  // Apply highlighting effect if either animation is highlighted
  const isHighlighted = highlightedElementId === entryDebugId || highlightedElementId === exitDebugId
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
    top: '-80px',
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

  // If not in debug mode, render static content
  if (!isDebugMode) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <div
      data-debug-id-entry={entryDebugId}
      data-debug-id-exit={exitDebugId}
      style={{
        ...style,
        ...highlightStyle,
        position: 'relative',
        transform: `translateX(${combinedTransform.translateX}px) translateY(${combinedTransform.translateY}px) rotate(${combinedTransform.rotate}deg)`,
        transition: 'transform 0.1s ease-out'
      }}
      className={className}
    >
      {children}
      
      {/* Debug Info Overlay */}
      {showDebugInfo && (
        <div style={debugInfoStyle}>
          Entry: {entryConfig?.name} | Exit: {exitConfig?.name}<br/>
          Combined: X:{combinedTransform.translateX.toFixed(1)} Y:{combinedTransform.translateY.toFixed(1)} R:{combinedTransform.rotate.toFixed(1)}°
        </div>
      )}
    </div>
  )
}