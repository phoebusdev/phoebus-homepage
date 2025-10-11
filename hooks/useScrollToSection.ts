import { useCallback } from 'react'

/**
 * Custom hook for smooth scrolling to sections
 * @returns scrollToSection function that accepts a section ID
 */
export function useScrollToSection() {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)

    if (element) {
      // Get the element's position
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - 80 // 80px offset for fixed header

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }, [])

  return scrollToSection
}
