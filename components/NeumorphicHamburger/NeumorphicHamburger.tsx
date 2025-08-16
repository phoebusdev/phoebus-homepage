import React from 'react'
import styles from './NeumorphicHamburger.module.css'

interface NeumorphicHamburgerProps {
  isOpen: boolean
  onToggle: () => void
}

export function NeumorphicHamburger({ isOpen, onToggle }: NeumorphicHamburgerProps) {
  return (
    <button
      className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
      onClick={onToggle}
      aria-label="Toggle menu"
    >
      <div className={styles.hamburgerInner}>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
      </div>
    </button>
  )
}