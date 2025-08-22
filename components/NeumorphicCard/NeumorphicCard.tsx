import React from 'react'
import styles from './NeumorphicCard.module.css'

interface NeumorphicCardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function NeumorphicCard({ children, className = "", onClick, ...props }: NeumorphicCardProps) {
  return (
    <div className={`${styles.card} ${className}`} onClick={onClick} {...props}>
      <div className={styles.cardOverlay}></div>
      <div className={styles.cardInner}>
        {children}
      </div>
    </div>
  )
}