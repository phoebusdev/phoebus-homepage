'use client'

import React, { ReactNode, useState, useEffect, useRef } from 'react'
import { usePageTransition } from '@/contexts/PageTransitionContext'
import { usePathname } from 'next/navigation'
import styles from './PageTransitionWrapper.module.css'

interface PageTransitionWrapperProps {
  children: ReactNode
}

interface PreservedContent {
  element: HTMLDivElement | null
  pathname: string
}

export function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
  const { isTransitioning, transitionDirection, isInitialLoad } = usePageTransition()
  const pathname = usePathname()
  const [preservedContent, setPreservedContent] = useState<PreservedContent | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const previousPathRef = useRef(pathname)
  const isTransitioningRef = useRef(false)

  // Preserve old content when transition starts
  useEffect(() => {
    // If transition just started and we have content to preserve
    if (isTransitioning && !isTransitioningRef.current && contentRef.current) {
      // Clone the current DOM content
      const clonedContent = contentRef.current.cloneNode(true) as HTMLDivElement
      
      // Remove any animation classes from the clone
      clonedContent.className = styles.pageContent
      
      setPreservedContent({
        element: clonedContent,
        pathname: previousPathRef.current
      })
    }
    
    // Track transition state
    isTransitioningRef.current = isTransitioning

    // Clear preserved content after transition ends
    if (!isTransitioning && preservedContent) {
      setTimeout(() => {
        setPreservedContent(null)
      }, 100)
    }
  }, [isTransitioning, preservedContent])

  // Update path reference
  useEffect(() => {
    if (pathname !== previousPathRef.current) {
      previousPathRef.current = pathname
    }
  }, [pathname])

  // Don't animate on initial page load
  if (isInitialLoad) {
    return (
      <div className={styles.pageWrapper}>
        <div ref={contentRef} className={styles.pageContent}>
          {children}
        </div>
      </div>
    )
  }

  // During transition with preserved content
  if (isTransitioning && preservedContent?.element) {
    const isForward = transitionDirection === 'forward'
    
    return (
      <div className={styles.pageWrapper}>
        <div className={`${styles.slideContainer} ${isForward ? styles.slideForward : styles.slideBackward}`}>
          {isForward ? (
            <>
              {/* Forward: old page on left, new page on right */}
              <div 
                className={styles.pageContent}
                dangerouslySetInnerHTML={{ __html: preservedContent.element.innerHTML }}
              />
              <div ref={contentRef} className={styles.pageContent}>
                {children}
              </div>
            </>
          ) : (
            <>
              {/* Backward: new page on left, old page on right */}
              <div ref={contentRef} className={styles.pageContent}>
                {children}
              </div>
              <div 
                className={styles.pageContent}
                dangerouslySetInnerHTML={{ __html: preservedContent.element.innerHTML }}
              />
            </>
          )}
        </div>
      </div>
    )
  }

  // Normal render (no transition)
  return (
    <div className={styles.pageWrapper}>
      <div ref={contentRef} className={styles.pageContent}>
        {children}
      </div>
    </div>
  )
}