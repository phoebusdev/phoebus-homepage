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

export interface SectionScrollSnapConfig {
  id: string
  name: string
  enabled: boolean
  alignMode: 'start' | 'center' | 'end'
  stopMode: 'normal' | 'always'
}

export interface GlobalScrollSnapConfig {
  enabled: boolean
  type: 'none' | 'y mandatory' | 'y proximity' | 'x mandatory' | 'x proximity'
  behavior: 'smooth' | 'auto'
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
  globalScrollSnapConfig: GlobalScrollSnapConfig
  sectionScrollSnapConfigs: SectionScrollSnapConfig[]
  updateGlobalScrollSnap: (field: keyof GlobalScrollSnapConfig, value: any) => void
  updateSectionScrollSnap: (sectionId: string, field: keyof SectionScrollSnapConfig, value: any) => void
}

const DEFAULT_CONFIGS: AnimationConfig[] = [
  {
    id: 'digital-products',
    name: 'Digital Products',
    translateX: [0, -185],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 98,
    endScroll: 180
  },
  {
    id: 'built-right',
    name: 'Built Right',
    translateX: [0, -175],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 110,
    endScroll: 250
  },
  {
    id: 'delivered-fast',
    name: 'Delivered Fast',
    translateX: [0, -165],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 130,
    endScroll: 401
  },
  {
    id: 'no-hidden-fees',
    name: 'No Hidden Fees',
    translateX: [0, 185],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 110,
    endScroll: 195
  },
  {
    id: 'no-drag-outs',
    name: 'No Drag-outs',
    translateX: [0, 175],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 90,
    endScroll: 250
  },
  {
    id: 'no-lock-in',
    name: 'No Lock-in',
    translateX: [0, 200],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 100,
    endScroll: 401
  },
  {
    id: 'description-card',
    name: 'Description Card',
    translateX: [0, 130],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 130,
    endScroll: 458
  },
  {
    id: 'cta-button-1',
    name: 'CTA Button 1',
    translateX: [0, -509],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 150,
    endScroll: 601
  },
  {
    id: 'cta-button-2',
    name: 'CTA Button 2',
    translateX: [0, 559],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 165,
    endScroll: 595
  },
  // Services Section - Dual Animation System (Entry + Exit)
  {
    id: 'services-title',
    name: 'Services Section Title',
    translateX: [0, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 100,
    endScroll: 800
  },
  // Services Card 1 - Dual Animations
  {
    id: 'services-card-0-entry',
    name: 'Services Card 1 Entry (from above)',
    translateX: [437, -51],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 400,
    endScroll: 950
  },
  {
    id: 'services-card-0-exit',
    name: 'Services Card 1 Exit (to below)',
    translateX: [0, 1800],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 970,
    endScroll: 1187
  },
  // Services Card 2 - Dual Animations
  {
    id: 'services-card-1-entry',
    name: 'Services Card 2 Entry (from above)',
    translateX: [0, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 1250,
    endScroll: 1450
  },
  {
    id: 'services-card-1-exit',
    name: 'Services Card 2 Exit (to below)',
    translateX: [0, -158],
    translateY: [0, -230],
    rotate: [0, 0],
    startScroll: 950,
    endScroll: 1255
  },
  // Services Card 3 - Dual Animations
  {
    id: 'services-card-2-entry',
    name: 'Services Card 3 Entry (from above)',
    translateX: [-437, 51],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 400,
    endScroll: 950
  },
  {
    id: 'services-card-2-exit',
    name: 'Services Card 3 Exit (to below)',
    translateX: [0, -1800],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 970,
    endScroll: 1187
  },
  // Process Section Cards
  {
    id: 'process-title',
    name: 'Process Section Title',
    translateX: [0, 0],
    translateY: [-15, 15],
    rotate: [0, 0],
    startScroll: 100,
    endScroll: 800
  },
  {
    id: 'process-step-0',
    name: 'Process Step 1 (Discovery)',
    translateX: [-15, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 100,
    endScroll: 800
  },
  {
    id: 'process-step-1',
    name: 'Process Step 2 (Prototype)',
    translateX: [15, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 100,
    endScroll: 800
  },
  {
    id: 'process-step-2',
    name: 'Process Step 3 (Build)',
    translateX: [-15, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 100,
    endScroll: 800
  },
  {
    id: 'process-step-3',
    name: 'Process Step 4 (Deploy)',
    translateX: [15, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 100,
    endScroll: 800
  },
  // Why Different Section Cards
  {
    id: 'why-different-title',
    name: 'Why Different Section Title',
    translateX: [0, 0],
    translateY: [-20, 10],
    rotate: [0, 0],
    startScroll: 100,
    endScroll: 800
  },
  {
    id: 'why-different-0',
    name: 'Why Different 1 (No Lock-In)',
    translateX: [0, 0],
    translateY: [20, -10],
    rotate: [0, 0],
    startScroll: 100,
    endScroll: 800
  },
  {
    id: 'why-different-1',
    name: 'Why Different 2 (Fixed Price)',
    translateX: [0, 0],
    translateY: [25, -12],
    rotate: [0, 0],
    startScroll: 100,
    endScroll: 800
  },
  {
    id: 'why-different-2',
    name: 'Why Different 3 (Built for Growth)',
    translateX: [0, 0],
    translateY: [30, -14],
    rotate: [0, 0],
    startScroll: 100,
    endScroll: 800
  },
  {
    id: 'why-different-3',
    name: 'Why Different 4 (Radical Honesty)',
    translateX: [0, 0],
    translateY: [35, -16],
    rotate: [0, 0],
    startScroll: 100,
    endScroll: 800
  },
  // About Section - Real scroll positions at ~4000px
  {
    id: 'about-title',
    name: 'About Section Title',
    translateX: [0, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 4100,
    endScroll: 4300
  },
  {
    id: 'about-content',
    name: 'About Content Text',
    translateX: [0, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 4150,
    endScroll: 4350
  },
  {
    id: 'about-features',
    name: 'About Features Card',
    translateX: [0, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 4200,
    endScroll: 4400
  },
  // Contact Section - Real scroll positions at ~4800px
  {
    id: 'contact-title',
    name: 'Contact Section Title',
    translateX: [0, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 4800,
    endScroll: 5000
  },
  {
    id: 'contact-cta-1',
    name: 'Contact Email Card',
    translateX: [0, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 4850,
    endScroll: 5050
  },
  {
    id: 'contact-cta-2',
    name: 'Contact Phone Card',
    translateX: [0, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 4900,
    endScroll: 5100
  },
  {
    id: 'contact-final-cta',
    name: 'Contact Final CTA Button',
    translateX: [0, 0],
    translateY: [0, 0],
    rotate: [0, 0],
    startScroll: 4950,
    endScroll: 5150
  }
]

const ScrollDebugContext = createContext<ScrollDebugContextType | null>(null)

interface ScrollDebugProviderProps {
  children: ReactNode
}

const DEFAULT_GLOBAL_SCROLL_SNAP: GlobalScrollSnapConfig = {
  enabled: true,
  type: 'y proximity',
  behavior: 'smooth'
}

const DEFAULT_SECTION_SCROLL_SNAP_CONFIGS: SectionScrollSnapConfig[] = [
  {
    id: 'hero',
    name: 'Hero Section',
    enabled: true,
    alignMode: 'center',
    stopMode: 'normal'
  },
  {
    id: 'services',
    name: 'Services Section',
    enabled: true,
    alignMode: 'center',
    stopMode: 'normal'
  },
  {
    id: 'process',
    name: 'Process Section',
    enabled: true,
    alignMode: 'center',
    stopMode: 'normal'
  },
  {
    id: 'why-different',
    name: 'Why Different Section',
    enabled: true,
    alignMode: 'center',
    stopMode: 'normal'
  },
  {
    id: 'about',
    name: 'About Section',
    enabled: true,
    alignMode: 'center',
    stopMode: 'normal'
  },
  {
    id: 'contact',
    name: 'Contact Section',
    enabled: true,
    alignMode: 'center',
    stopMode: 'normal'
  }
]

export function ScrollDebugProvider({ children }: ScrollDebugProviderProps) {
  const [configs, setConfigs] = useState<AnimationConfig[]>(DEFAULT_CONFIGS)
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null)
  const [highlightedElementId, setHighlightedElementId] = useState<string | null>(null)
  const [currentScrollY, setCurrentScrollY] = useState(0)
  const [isDebugMode, setIsDebugMode] = useState(false)
  const [globalScrollSnapConfig, setGlobalScrollSnapConfig] = useState<GlobalScrollSnapConfig>(DEFAULT_GLOBAL_SCROLL_SNAP)
  const [sectionScrollSnapConfigs, setSectionScrollSnapConfigs] = useState<SectionScrollSnapConfig[]>(DEFAULT_SECTION_SCROLL_SNAP_CONFIGS)

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

  const updateGlobalScrollSnap = (field: keyof GlobalScrollSnapConfig, value: any) => {
    setGlobalScrollSnapConfig(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const updateSectionScrollSnap = (sectionId: string, field: keyof SectionScrollSnapConfig, value: any) => {
    setSectionScrollSnapConfigs(prev => prev.map(config => 
      config.id === sectionId 
        ? { ...config, [field]: value }
        : config
    ))
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

  // Dynamic CSS injection for scroll snap changes
  useEffect(() => {
    if (!isDebugMode) return

    const styleId = 'scroll-snap-debug-styles'
    let styleElement = document.getElementById(styleId) as HTMLStyleElement
    
    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = styleId
      document.head.appendChild(styleElement)
    }

    const scrollSnapType = globalScrollSnapConfig.enabled ? globalScrollSnapConfig.type : 'none'
    const scrollBehavior = globalScrollSnapConfig.behavior

    // Generate section-specific CSS rules
    const sectionRules = sectionScrollSnapConfigs
      .filter(config => config.enabled)
      .map(config => `
        .scroll-snap-section[data-section="${config.id}"] {
          scroll-snap-align: ${config.alignMode} !important;
          scroll-snap-stop: ${config.stopMode} !important;
        }
      `)
      .join('\n')

    styleElement.textContent = `
      html {
        scroll-snap-type: ${scrollSnapType} !important;
        scroll-behavior: ${scrollBehavior} !important;
      }
      ${sectionRules}
    `

    return () => {
      if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement)
      }
    }
  }, [isDebugMode, globalScrollSnapConfig, sectionScrollSnapConfigs])

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
    highlightedElementId,
    globalScrollSnapConfig,
    sectionScrollSnapConfigs,
    updateGlobalScrollSnap,
    updateSectionScrollSnap
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