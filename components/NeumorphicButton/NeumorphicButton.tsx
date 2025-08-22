'use client'

import React from 'react'
import styles from './NeumorphicButton.module.css'

interface NeumorphicButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  size?: 'small' | 'medium' | 'large'
  type?: 'button' | 'submit' | 'reset'
}

export function NeumorphicButton({ 
  children, 
  onClick, 
  className = '',
  size = 'medium',
  type = 'button'
}: NeumorphicButtonProps) {
  const sizeClasses = {
    small: 'text-sm px-4 py-2',
    medium: 'text-base px-6 py-3',
    large: 'text-lg px-8 py-4'
  }
  
  return (
    <button 
      type={type}
      className={`${styles.button} ${sizeClasses[size]} ${className}`} 
      onClick={onClick}
    >
      <div className={styles.buttonOuter}>
        <div className={styles.buttonInner}>
          <span>{children}</span>
        </div>
      </div>
    </button>
  )
}

interface PrototypeButtonProps {
  children: React.ReactNode
  source?: string
  intent?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
  className?: string
  onClick?: () => void
}

export function PrototypeButton({
  children,
  source,
  intent = "primary",
  size = "md",
  className = "",
  onClick,
  ...props
}: PrototypeButtonProps) {
  return (
    <NeumorphicButton 
      className={`${intent === "primary" ? "bg-gradient-to-r from-[#8fad7f] to-[#7a9970] text-white" : ""} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </NeumorphicButton>
  )
}