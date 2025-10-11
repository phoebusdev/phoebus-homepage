"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect, useRef } from 'react'
import styles from './Navigation.module.css'
import { NeumorphicButton } from '../NeumorphicButton/NeumorphicButton'
import { NeumorphicHamburger } from '../NeumorphicHamburger/NeumorphicHamburger'
import { NeumorphicNav } from '../NeumorphicNav/NeumorphicNav'
import { NeumorphicCard } from '../NeumorphicCard/NeumorphicCard'
import { useFocusTrap } from '@/hooks/useFocusTrap'

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const mobileMenuRef = useFocusTrap<HTMLDivElement>(mobileMenuOpen)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Process', href: '/process' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' }
  ]

  const handleNavClick = (item: { href?: string }) => {
    if (item.href) {
      router.push(item.href)
    }
  }

  // Close menu on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <>
      {/* Navigation */}
      <nav className={styles.navigation} aria-label="Main navigation">
        <div className={styles.navInner}>
          <div className={styles.navContent}>
            <Link href="/" className="plastic-tube-text text-2xl" aria-label="Phoebus Digital home">
              phoebusdigital
            </Link>
            <div className={styles.navDesktop}>
              <NeumorphicNav
                items={navItems.map(item => ({
                  ...item,
                  onClick: () => handleNavClick(item)
                }))}
                defaultActive={0}
              />
            </div>
            <div className={styles.navMobile}>
              <NeumorphicHamburger
                ref={hamburgerRef}
                isOpen={mobileMenuOpen}
                onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle mobile menu"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className={styles.mobileMenuOverlay}
          onClick={(e) => {
            // Close menu when clicking on the overlay (outside the card)
            if (e.target === e.currentTarget) {
              setMobileMenuOpen(false)
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div
            id="mobile-menu"
            ref={mobileMenuRef}
            className={styles.mobileMenuContainer}
            onClick={(e) => {
              // Prevent closing when clicking inside the container
              e.stopPropagation()
            }}
          >
            <NeumorphicCard>
              <nav className={styles.mobileMenuItems} aria-label="Mobile menu navigation">
                {navItems.map((item, index) => (
                  <NeumorphicButton
                    key={index}
                    fullWidth={true}
                    onClick={() => {
                      handleNavClick(item)
                      setMobileMenuOpen(false)
                    }}
                  >
                    {item.label}
                  </NeumorphicButton>
                ))}
                <NeumorphicButton
                  fullWidth={true}
                  onClick={() => {
                    router.push('/contact')
                    setMobileMenuOpen(false)
                  }}
                >
                  Contact Us
                </NeumorphicButton>
              </nav>
            </NeumorphicCard>
          </div>
        </div>
      )}
    </>
  )
}