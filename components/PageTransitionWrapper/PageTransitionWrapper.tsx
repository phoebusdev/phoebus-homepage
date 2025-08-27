'use client'

import React, { ReactNode } from 'react'
import { usePageTransition } from '@/contexts/PageTransitionContext'
import styles from './PageTransitionWrapper.module.css'

interface PageTransitionWrapperProps {
  children: ReactNode
}

export function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
  const { isTransitioning, transitionDirection, isInitialLoad } = usePageTransition()

  // Don't animate on initial page load
  if (isInitialLoad) {
    return <div className={styles.pageWrapper}>{children}</div>
  }

  // Determine animation class based on transition state
  const getAnimationClass = () => {
    if (!transitionDirection) {
      return '' // No animation, centered
    }
    
    // Apply animation based on direction
    // The animation will handle both exit and enter phases
    return transitionDirection === 'forward'
      ? styles.slideForward
      : styles.slideBackward
  }

  return (
    <div 
      className={`${styles.pageWrapper} ${getAnimationClass()}`}
      key={isTransitioning ? 'transitioning' : 'static'}
    >
      {children}
    </div>
  )
}