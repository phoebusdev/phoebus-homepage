# Animation Style Guide - Phoebus Digital Homepage

This document outlines the animation patterns and techniques established in the process page that should be applied throughout the entire site.

## Core Animation Principles

### 1. Scroll-Triggered Animations
- **Progress-based**: All animations use scroll progress (0-1) rather than simple triggers
- **Smooth easing**: Use `rawProgress * rawProgress * (3 - 2 * rawProgress)` for smooth interpolation
- **Responsive triggers**: Animations start at 80% viewport and complete at 20% viewport

### 2. Section Structure
```tsx
// Standard section pattern
<section 
  ref={sectionRef}
  className="scroll-snap-section min-h-screen py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-12 flex items-center"
>
  <div className="max-w-7xl mx-auto w-full">
    <div className="transform scale-75 origin-center" style={{ overflow: 'visible' }}>
      {/* Content with animations */}
    </div>
  </div>
</section>
```

### 3. Animation Hook Pattern
```tsx
function useScrollAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      const triggerPoint = viewportHeight * 0.8
      const endPoint = viewportHeight * 0.2
      
      const rawProgress = Math.max(0, Math.min(1, (triggerPoint - rect.top) / (triggerPoint - endPoint)))
      const easedProgress = rawProgress * rawProgress * (3 - 2 * rawProgress)
      
      setProgress(easedProgress)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { sectionRef, progress }
}
```

## Animation Patterns

### 1. Stacked Deck Animation
**Use case**: Cards that start stacked and spread out

**Implementation**:
```tsx
// Basic stacked deck - linear spreading
const translateY = progress * idx * 180
const rotateX = progress * 10
const scale = 1 - progress * idx * 0.05
const zIndex = 4 - idx

// Enhanced stacked deck - horizontal fan
const translateX = progress * (idx - 2) * 200
const rotation = progress * (idx % 2 === 0 ? -8 : 8)
const scale = 1 + progress * idx * 0.03
```

**Key features**:
- Cards start perfectly stacked
- Progressive movement based on index
- Proper z-index management
- Smooth easing transitions

### 2. Cascading Cards Animation
**Use case**: Cards sliding in from different directions

**Implementation**:
```tsx
// Main cards slide from sides
const leftTransform = `translateX(${(1 - progress) * (-window.innerWidth - 100)}px)`
const rightTransform = `translateX(${(1 - progress) * (window.innerWidth + 100)}px)`

// Benefit cards with varied movements
const movements = [
  `translateY(${(1 - progress) * 120}px) rotate(${(1 - progress) * -10}deg)`,
  `translateX(${(1 - progress) * -80}px) translateY(${(1 - progress) * 60}px)`,
  `translateY(${(1 - progress) * 100}px) scale(${0.5 + progress * 0.5})`,
  // ... more patterns
]
```

**Key features**:
- Cards start off-screen
- Different movement patterns per card
- Staggered timing with `transitionDelay`
- Combination transforms (translate + rotate + scale)

### 3. Enhanced Stacked Deck with Bounce
**Use case**: Cards that fan out with bounce effect

**Implementation**:
```tsx
// Cubic-bezier bounce easing
const t = rawProgress
const bounceProgress = 0.68 * t * t * t + (-0.55) * 3 * t * t * (1 - t) + 
                      0.265 * 3 * t * (1 - t) * (1 - t) + 1.55 * (1 - t) * (1 - t) * (1 - t)

// Horizontal spread with alternating rotation
const translateX = progress * (idx - 2) * 200
const rotation = progress * (idx % 2 === 0 ? -5 : 5)
```

**Key features**:
- Cards start stacked, visible briefly
- Bounce easing for satisfying feel
- Horizontal fan-out pattern
- Alternating rotations

## Timing and Easing

### Standard Durations
- **Fast animations**: `duration-75` (75ms) for real-time scroll responsiveness
- **Medium animations**: `duration-500` (500ms) for deliberate movements
- **Slow animations**: `duration-700` (700ms) for impressive reveals

### Easing Functions
- **Linear progress**: `rawProgress = (triggerPoint - rect.top) / (triggerPoint - endPoint)`
- **Smooth easing**: `rawProgress * rawProgress * (3 - 2 * rawProgress)`
- **Bounce easing**: `cubic-bezier(0.68, -0.55, 0.265, 1.55)`

### Staggered Timing
```tsx
// Stagger with delay
style={{
  transitionDelay: `${idx * 100}ms` // 100ms between each element
}}
```

## Design System Integration

### Card Styling
- **Standard card size**: `w-80 h-48` for main content cards
- **Benefit cards**: `w-32 h-32` or `p-4 text-center` for smaller elements
- **Gradient colors**: Use the established color palette
- **Consistent padding**: `p-6` for main cards, `p-4` for smaller cards

### Typography
- **Titles**: Use `font-display neumorphic-text-3d`
- **Highlights**: Use `plastic-tube-text` for emphasis
- **Body text**: Use `text-text-secondary` for descriptions

### Layout Standards
- **Section spacing**: `py-32 md:py-40 lg:py-48`
- **Container width**: `max-w-7xl mx-auto` (increased for animation space)
- **Content scaling**: `transform scale-75 origin-center` for breathing room
- **Overflow handling**: `style={{ overflow: 'visible' }}` for animations

## Performance Considerations

### Optimization Techniques
- Use `transform` properties instead of changing layout properties
- Minimize repaints with `will-change: transform` when needed
- Use `requestAnimationFrame` for smooth scroll calculations
- Implement proper cleanup in useEffect hooks

### Browser Support
- CSS scroll snap with fallback for older browsers
- Transform3d for hardware acceleration
- Proper reduced motion support

## CSS Classes

### Required Global Styles
```css
/* Scroll snap functionality */
html {
  scroll-behavior: smooth;
  scroll-snap-type: y proximity;
}

.scroll-snap-section {
  scroll-snap-align: center;
  scroll-snap-stop: normal;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  
  html {
    scroll-snap-type: none;
  }
}
```

## Implementation Checklist

For each new animated section:

- [ ] Use the standard section structure
- [ ] Implement the scroll animation hook
- [ ] Choose appropriate animation pattern
- [ ] Set proper timing and easing
- [ ] Test with different scroll speeds
- [ ] Verify mobile responsiveness
- [ ] Check reduced motion compliance
- [ ] Ensure proper z-index layering
- [ ] Test scroll snap behavior

## Example Implementation

See `/app/process/page.tsx` for complete implementation examples of all three animation patterns. This file serves as the reference implementation for the site's animation style.

---

**Note**: This animation system prioritizes user experience with smooth, purposeful animations that enhance content presentation without being distracting. All animations should feel natural and contribute to the storytelling of the page.