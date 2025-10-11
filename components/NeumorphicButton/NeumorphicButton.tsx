'use client'

import React from 'react'
import styles from './NeumorphicButton.module.css'

interface NeumorphicButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  fullWidth?: boolean
}

export function NeumorphicButton({ children, onClick, className = '', fullWidth = false }: NeumorphicButtonProps) {
  return (
    <button className={`${styles.button} ${fullWidth ? styles.fullWidth : ''} ${className}`} onClick={onClick}>
      <div className={styles.buttonOuter}>
        <div className={styles.buttonInner}>
          <span>{children}</span>
        </div>
      </div>
    </button>
  )
}