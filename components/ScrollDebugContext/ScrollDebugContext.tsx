'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface AnimationConfig {
  id: string
  name: string
  translateX: [number, number]
  translateY: [number, number]
  rotate: [number, number]
  startScroll: number
  endScroll: number
}

export interface ScrollDebugContextType {
  configs: AnimationConfig[]
  updateConfig: (id: string, field: keyof AnimationConfig, value: any) => void
  getConfig: (id: string) => AnimationConfig | null
  isDebugMode: boolean
  selectedElementId: string | null
  setSelectedElementId: (id: string | null) => void
  currentScrollY: number
  highlightElement: (id: string) => void
  unhighlightElement: () => void
  highlightedElementId: string | null
}

const DEFAULT_CONFIGS: AnimationConfig[] = [
  {
    id: 'digital-products',
    name: 'Digital Products',
    translateX: [0, -80],
    translateY: [0, -30],
    rotate: [0, -10],
    startScroll: 100,
    endScroll: 800
  },
  {
    id: 'built-right',
    name: 'Built Right',
    translateX: [0, -60],
    translateY: [0, -20],
    rotate: [0, -5],
    startScroll: 100,
    endScroll: 800
  },
  {
    id: 'delivered-fast',
    name: 'Delivered Fast',
    translateX: [0, -50],
    translateY: [0, -10],
    rotate: [0, -3],
    startScroll: 100,
    endScroll: 800
  },
  {
    id: 'no-hidden-fees',
    name: 'No Hidden Fees',
    translateX: [0, 60],
    translateY: [0, -30],
    rotate: [0, 8],
    startScroll: 100,
    endScroll: 800
  },
  {
    id: 'no-drag-outs',
    name: 'No Drag-outs',
    translateX: [0, 80],
    translateY: [0, -20],
    rotate: [0, 10],
    startScroll: 100,
    endScroll: 800
  },
  {
    id: 'no-lock-in',
    name: 'No Lock-in',
    translateX: [0, 70],
    translateY: [0, -10],
    rotate: [0, 5],
    startScroll: 100,
    endScroll: 800
  },
  {
    id: 'description-card',
    name: 'Description Card',
    translateX: [0, 0],
    translateY: [0, 20],
    rotate: [0, 0],
    startScroll: 100,
    endScroll: 800
  },
  {
    id: 'cta-button-1',
    name: 'CTA Button 1',
    translateX: [0, -50],
    translateY: [0, 25],
    rotate: [0, 0],
    startScroll: 100,
    endScroll: 800
  },
  {
    id: 'cta-button-2',
    name: 'CTA Button 2',
    translateX: [0, 50],
    translateY: [0, 25],
    rotate: [0, 0],
    startScroll: 100,
    endScroll: 800
  }
]

const ScrollDebugContext = createContext<ScrollDebugContextType | null>(null)

interface ScrollDebugProviderProps {
  children: ReactNode
}

export function ScrollDebugProvider({ children }: ScrollDebugProviderProps) {
  const [configs, setConfigs] = useState<AnimationConfig[]>(DEFAULT_CONFIGS)
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null)
  const [highlightedElementId, setHighlightedElementId] = useState<string | null>(null)
  const [currentScrollY, setCurrentScrollY] = useState(0)
  const [isDebugMode, setIsDebugMode] = useState(false)

  // Check if debug mode should be enabled
  useEffect(() => {
    const showDebug = process.env.NODE_ENV === 'development' || 
                     localStorage.getItem('scroll-debug') === 'true' ||
                     window.location.search.includes('debug=scroll')
    setIsDebugMode(showDebug)
  }, [])

  // Track scroll position
  useEffect(() => {
    if (!isDebugMode) return

    const handleScroll = () => {
      setCurrentScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDebugMode])

  const updateConfig = (id: string, field: keyof AnimationConfig, value: any) => {
    setConfigs(prev => prev.map(config => 
      config.id === id 
        ? { ...config, [field]: value }
        : config
    ))
  }

  const getConfig = (id: string): AnimationConfig | null => {
    return configs.find(config => config.id === id) || null
  }

  const highlightElement = (id: string) => {
    setHighlightedElementId(id)
    // Auto-clear highlight after 3 seconds
    setTimeout(() => {
      setHighlightedElementId(null)
    }, 3000)
  }

  const unhighlightElement = () => {
    setHighlightedElementId(null)
  }

  const value: ScrollDebugContextType = {
    configs,
    updateConfig,
    getConfig,
    isDebugMode,
    selectedElementId,
    setSelectedElementId,
    currentScrollY,
    highlightElement,
    unhighlightElement,
    highlightedElementId
  }

  return (
    <ScrollDebugContext.Provider value={value}>
      {children}
    </ScrollDebugContext.Provider>
  )
}

export function useScrollDebug(): ScrollDebugContextType {
  const context = useContext(ScrollDebugContext)
  if (!context) {
    throw new Error('useScrollDebug must be used within a ScrollDebugProvider')
  }
  return context
}

// Helper function to calculate current transform values based on scroll position
export function calculateTransform(
  config: AnimationConfig,
  scrollY: number
): {
  translateX: number
  translateY: number
  rotate: number
  progress: number
} {
  const { startScroll, endScroll, translateX, translateY, rotate } = config
  
  // Calculate progress (0 to 1) based on scroll position
  const progress = Math.max(0, Math.min(1, (scrollY - startScroll) / (endScroll - startScroll)))
  
  // Interpolate values
  const currentTranslateX = translateX[0] + (translateX[1] - translateX[0]) * progress
  const currentTranslateY = translateY[0] + (translateY[1] - translateY[0]) * progress
  const currentRotate = rotate[0] + (rotate[1] - rotate[0]) * progress
  
  return {
    translateX: currentTranslateX,
    translateY: currentTranslateY,
    rotate: currentRotate,
    progress
  }
}