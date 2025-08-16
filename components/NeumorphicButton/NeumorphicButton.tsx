import React from 'react'
import styles from './NeumorphicButton.module.css'

interface NeumorphicButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function NeumorphicButton({ children, className = "", ...props }: NeumorphicButtonProps) {
  return (
    <button className={`${styles.button} ${className}`} {...props}>
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
}

export function PrototypeButton({
  children,
  source,
  intent = "primary",
  size = "md",
  className = "",
  ...props
}: PrototypeButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  }

  const intentClasses = {
    primary: styles.prototypeButton,
    secondary: ""
  }

  return (
    <button 
      className={`${styles.button} ${intentClasses[intent]} ${className}`}
      {...props}
    >
      <div className={styles.buttonOuter}>
        <div className={styles.buttonInner}>
          <span>{children}</span>
        </div>
      </div>
    </button>
  )
}