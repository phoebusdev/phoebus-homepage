'use client'

import { useState, useEffect } from 'react'

export function ScrollReference() {
  const [scrollData, setScrollData] = useState({
    scrollY: 0,
    scrollPercent: 0,
    viewportHeight: 0,
    documentHeight: 0,
    visibleElements: [] as string[]
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateScrollData = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollPercent = Math.round((scrollY / (documentHeight - viewportHeight)) * 100)

      // Find visible elements
      const sections = document.querySelectorAll('section')
      const visibleElements: string[] = []
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        const isInViewport = rect.top < viewportHeight && rect.bottom > 0
        
        if (isInViewport) {
          // Try to get a descriptive name for the section
          const heading = section.querySelector('h1, h2, h3')
          const sectionName = heading?.textContent?.trim() || `Section ${index + 1}`
          
          // Calculate how much of the section is visible
          const visibleTop = Math.max(0, -rect.top)
          const visibleBottom = Math.min(rect.height, viewportHeight - rect.top)
          const visiblePercent = Math.round(((visibleBottom - visibleTop) / rect.height) * 100)
          
          visibleElements.push(`${sectionName} (${visiblePercent}% visible)`)
        }
      })

      setScrollData({
        scrollY: Math.round(scrollY),
        scrollPercent,
        viewportHeight,
        documentHeight,
        visibleElements
      })
    }

    updateScrollData()
    window.addEventListener('scroll', updateScrollData)
    window.addEventListener('resize', updateScrollData)

    return () => {
      window.removeEventListener('scroll', updateScrollData)
      window.removeEventListener('resize', updateScrollData)
    }
  }, [])

  // Toggle visibility with Ctrl+Shift+R
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'R') {
        e.preventDefault()
        setIsVisible(!isVisible)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isVisible])

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-black/80 text-white px-3 py-2 rounded text-sm font-mono hover:bg-black/90 transition-colors"
        >
          Show Scroll Ref
        </button>
      </div>
    )
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-black/90 text-white p-4 rounded-lg font-mono text-xs max-w-xs">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-sm">Scroll Reference</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-300 hover:text-white ml-2"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-2">
        <div>
          <strong>Scroll Position:</strong> {scrollData.scrollY}px
        </div>
        <div>
          <strong>Scroll Progress:</strong> {scrollData.scrollPercent}%
        </div>
        <div>
          <strong>Viewport:</strong> {scrollData.viewportHeight}px
        </div>
        <div>
          <strong>Total Height:</strong> {scrollData.documentHeight}px
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-600">
        <strong className="block mb-2">Visible Sections:</strong>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {scrollData.visibleElements.map((element, index) => (
            <div key={index} className="text-xs text-gray-300">
              • {element}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-600 text-xs text-gray-400">
        Press Ctrl+Shift+R to toggle
      </div>
    </div>
  )
}