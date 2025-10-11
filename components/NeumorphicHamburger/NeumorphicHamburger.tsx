import React, { forwardRef } from 'react'
import styles from './NeumorphicHamburger.module.css'

interface NeumorphicHamburgerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean
  onToggle: () => void
}

export const NeumorphicHamburger = forwardRef<HTMLButtonElement, NeumorphicHamburgerProps>(
  ({ isOpen, onToggle, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
        onClick={onToggle}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        {...props}
      >
      <div className={styles.hamburgerInner}>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
      </div>
    </button>
  )
})

NeumorphicHamburger.displayName = 'NeumorphicHamburger'