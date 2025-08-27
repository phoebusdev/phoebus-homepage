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

    // Start the transition
    startTransition(pathname, href)
    
    // Small delay to let exit animation start
    setTimeout(() => {
      router.push(href)
      setCurrentPath(href)
      
      // End transition after animation completes
      setTimeout(() => {
        endTransition()
      }, 450)
    }, 50)
  }, [pathname, router, startTransition, endTransition, setCurrentPath, isTransitioning])

  return { navigate }
}