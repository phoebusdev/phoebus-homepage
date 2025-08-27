'use client'

import { useRouter, usePathname } from 'next/navigation'
import { usePageTransition } from '@/contexts/PageTransitionContext'
import { useCallback } from 'react'

export function useNavigationTransition() {
  const router = useRouter()
  const pathname = usePathname()
  const { startTransition, endTransition, setCurrentPath, isTransitioning } = usePageTransition()

  const navigate = useCallback((href: string) => {
    // Don't navigate if we're already there or transitioning
    if (href === pathname || isTransitioning) return

    // Start the transition BEFORE navigation to capture old content
    startTransition(pathname, href)
    
    // Small delay to let the PageTransitionWrapper capture the old content
    setTimeout(() => {
      router.push(href)
      setCurrentPath(href)
    }, 10)
    
    // End transition after animation completes
    setTimeout(() => {
      endTransition()
    }, 550) // Match animation duration plus buffer
  }, [pathname, router, startTransition, endTransition, setCurrentPath, isTransitioning])

  return { navigate }
}