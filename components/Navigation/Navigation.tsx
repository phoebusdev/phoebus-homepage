"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import styles from './Navigation.module.css'
import { NeumorphicButton } from '../NeumorphicButton/NeumorphicButton'
import { NeumorphicHamburger } from '../NeumorphicHamburger/NeumorphicHamburger'
import { NeumorphicNav } from '../NeumorphicNav/NeumorphicNav'
import { NeumorphicCard } from '../NeumorphicCard/NeumorphicCard'

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

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
      <nav className={styles.navigation}>
        <div className={styles.navInner}>
          <div className={styles.navContent}>
            <Link href="/" className="plastic-tube-text text-2xl">
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
                isOpen={mobileMenuOpen}
                onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
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
        >
          <div
            className={styles.mobileMenuContainer}
            onClick={(e) => {
              // Prevent closing when clicking inside the container
              e.stopPropagation()
            }}
          >
            <NeumorphicCard>
              <div className={styles.mobileMenuItems}>
                {navItems.map((item, index) => (
                  <NeumorphicButton
                    key={index}
                    onClick={() => {
                      handleNavClick(item)
                      setMobileMenuOpen(false)
                    }}
                  >
                    {item.label}
                  </NeumorphicButton>
                ))}
                <NeumorphicButton
                  onClick={() => {
                    router.push('/contact')
                    setMobileMenuOpen(false)
                  }}
                >
                  Contact Us
                </NeumorphicButton>
              </div>
            </NeumorphicCard>
          </div>
        </div>
      )}
    </>
  )
}