'use client'

import React from 'react'
import { Icon } from '@/components/Icon/Icon'
import { NeumorphicCard } from '@/components/NeumorphicCard/NeumorphicCard'
import { Service } from '@/types'
import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation'
import { useMagneticTilt } from '@/hooks/useMagneticTilt'

interface ServiceCardProps extends Service {
  delay?: string
}

export function ServiceCard({
  title,
  description,
  features,
  icon,
  delay = "1"
}: ServiceCardProps) {
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
      className={`relative h-full service-card-animate ${isVisible ? 'visible' : ''}`}
      style={
        {
          '--animation-delay': `${parseInt(delay) * 150}ms`
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
          <div className="flex flex-col h-full">
            <div className="flex-shrink-0 mb-4">
              <Icon
                name={icon}
                className="text-3xl md:text-4xl text-text-primary mb-3"
              />
              <h3 className="text-lg md:text-xl lg:text-2xl mb-2 font-display neumorphic-text-3d line-clamp-2">
                {title}
              </h3>
              <p className="text-sm md:text-base text-text-secondary line-clamp-3">
                {description}
              </p>
            </div>
            <ul className="space-y-1.5 text-xs md:text-sm text-text-secondary flex-grow overflow-y-auto">
              {features.slice(0, 6).map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="mr-2 text-text-primary flex-shrink-0">▸</span>
                  <span className="line-clamp-2">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </NeumorphicCard>
      </div>
    </div>
  )
}