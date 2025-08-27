'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

interface PageTransitionContextType {
  isTransitioning: boolean
  transitionDirection: 'forward' | 'backward' | null
  currentPath: string
  isInitialLoad: boolean
  startTransition: (fromPath: string, toPath: string) => void
  endTransition: () => void
  setCurrentPath: (path: string) => void
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  isTransitioning: false,
  transitionDirection: null,
  currentPath: '',
  isInitialLoad: true,
  startTransition: () => {},
  endTransition: () => {},
  setCurrentPath: () => {}
})

// Define page order for directional transitions
const PAGE_ORDER = [
  '/',
  '/services',
  '/process', 
  '/pricing',
  '/about',
  '/contact'
]

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionDirection, setTransitionDirection] = useState<'forward' | 'backward' | null>(null)
  const [currentPath, setCurrentPath] = useState(pathname)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const previousPathRef = useRef(pathname)

  // Handle initial load
  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false)
    }
  }, [isInitialLoad])

  // Track path changes for browser navigation
  useEffect(() => {
    if (pathname !== previousPathRef.current && !isInitialLoad && !isTransitioning) {
      // Browser back/forward navigation detected
      const fromIndex = PAGE_ORDER.indexOf(previousPathRef.current)
      const toIndex = PAGE_ORDER.indexOf(pathname)
      
      const direction = fromIndex === -1 || toIndex === -1 || toIndex > fromIndex 
        ? 'forward' 
        : 'backward'
      
      setTransitionDirection(direction)
      setIsTransitioning(true)
      setCurrentPath(pathname)
      
      setTimeout(() => {
        setIsTransitioning(false)
        setTimeout(() => {
          setTransitionDirection(null)
        }, 50)
      }, 450)
    }
    previousPathRef.current = pathname
  }, [pathname, isInitialLoad, isTransitioning])

  const startTransition = useCallback((fromPath: string, toPath: string) => {
    if (isTransitioning) return // Prevent overlapping transitions
    
    const fromIndex = PAGE_ORDER.indexOf(fromPath)
    const toIndex = PAGE_ORDER.indexOf(toPath)
    
    // Determine direction based on page indices
    const direction = fromIndex === -1 || toIndex === -1 || toIndex > fromIndex 
      ? 'forward' 
      : 'backward'
    
    setTransitionDirection(direction)
    setIsTransitioning(true)
  }, [isTransitioning])

  const endTransition = useCallback(() => {
    setIsTransitioning(false)
    // Keep direction for a bit to allow exit animations to complete
    setTimeout(() => {
      setTransitionDirection(null)
    }, 50)
  }, [])

  return (
    <PageTransitionContext.Provider 
      value={{ 
        isTransitioning, 
        transitionDirection,
        currentPath,
        isInitialLoad,
        startTransition,
        endTransition,
        setCurrentPath
      }}
    >
      {children}
    </PageTransitionContext.Provider>
  )
}

export const usePageTransition = () => useContext(PageTransitionContext)