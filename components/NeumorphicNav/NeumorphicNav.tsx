import React, { useState } from 'react'
import styles from './NeumorphicNav.module.css'

interface NeumorphicNavItem {
  label: string
  href?: string
  onClick?: () => void
}

interface NeumorphicNavProps {
  items: NeumorphicNavItem[]
  defaultActive?: number
}

export function NeumorphicNav({ items, defaultActive = 0 }: NeumorphicNavProps) {
  const [activeIndex, setActiveIndex] = useState(defaultActive)

  const handleItemClick = (index: number, item: NeumorphicNavItem) => {
    setActiveIndex(index)
    if (item.onClick) {
      item.onClick()
    }
  }

  return (
    <div className={styles.nav}>
      {items.map((item, index) => (
        <button
          key={index}
          className={`${styles.navItem} ${index === activeIndex ? styles.active : ''}`}
          onClick={() => handleItemClick(index, item)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}