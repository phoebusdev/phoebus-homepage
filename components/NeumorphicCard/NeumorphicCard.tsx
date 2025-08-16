import React from 'react'
import styles from './NeumorphicCard.module.css'

interface NeumorphicCardProps {
  children: React.ReactNode
  className?: string
}

export function NeumorphicCard({ children, className = "", ...props }: NeumorphicCardProps) {
  return (
    <div className={`${styles.card} ${className}`} {...props}>
      <div className={styles.cardOverlay}></div>
      <div className={styles.cardInner}>
        {children}
      </div>
    </div>
  )
}