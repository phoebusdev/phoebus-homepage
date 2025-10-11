'use client'

import React from 'react'
import { Icon } from '@/components/Icon/Icon'
import { ProcessStep } from '@/types'
import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation'
import { useMagneticTilt } from '@/hooks/useMagneticTilt'

interface ProcessCardProps {
  step: ProcessStep
  index: number
}

export function ProcessCard({ step, index }: ProcessCardProps) {
  const { ref: animRef, isVisible } = useIntersectionAnimation<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true
  })

  const { ref: tiltRef, style: tiltStyle, handlers } = useMagneticTilt<HTMLDivElement>({
    maxTilt: 2,
    scale: 1.005,
    perspective: 1200
  })

  // Alternate between left and right animations
  const animationClass = index % 2 === 0 ? 'process-card-left' : 'process-card-right'

  return (
    <div
      ref={animRef}
      className={`${animationClass} ${isVisible ? 'visible' : ''}`}
      style={
        {
          '--animation-delay': `${index * 150}ms`
        } as React.CSSProperties
      }
    >
      <div
        ref={tiltRef}
        style={tiltStyle}
        {...handlers}
        className="card-solution4 expanded"
      >
        <div className="icon-neumorphic">
          <Icon name={step.icon} />
        </div>
        <div className="content-solution4">
          <h3 className="text-lg font-display neumorphic-text-3d mb-2">
            {step.title}
          </h3>
          <p className="text-sm text-text-secondary">
            {step.fullText}
          </p>
        </div>
      </div>
    </div>
  )
}
