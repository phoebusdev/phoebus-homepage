import styles from './SkipNavigation.module.css'

export function SkipNavigation() {
  return (
    <a href="#main-content" className={styles.skipLink}>
      Skip to main content
    </a>
  )
}
