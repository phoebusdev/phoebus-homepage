'use client'

import React from 'react'
import { Icon } from '@/components/Icon/Icon'
import { NeumorphicCard } from '@/components/NeumorphicCard/NeumorphicCard'
import { DifferentiatorItem } from '@/types'
import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation'
import { useMagneticTilt } from '@/hooks/useMagneticTilt'

interface WhyDifferentCardProps {
  item: DifferentiatorItem
  index: number
}

export function WhyDifferentCard({ item, index }: WhyDifferentCardProps) {
  const { ref: animRef, isVisible } = useIntersectionAnimation({
    threshold: 0.2,
    triggerOnce: true
  })

  const { ref: tiltRef, style: tiltStyle, handlers } = useMagneticTilt({
    maxTilt: 3,
    scale: 1.01,
    perspective: 1200
  })

  return (
    <div
      ref={animRef}
      className={`h-full radial-card ${isVisible ? 'visible' : ''}`}
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
        className="h-full"
      >
        <NeumorphicCard className="h-full">
          <div className="text-center">
            <Icon name={item.icon} className="text-4xl text-text-primary mb-4" />
            <h3 className="text-xl font-display neumorphic-text-3d mb-3">
              {item.title}
            </h3>
            <p className="text-text-secondary">
              {item.description}
            </p>
          </div>
        </NeumorphicCard>
      </div>
    </div>
  )
}
