# Reusable Animation Components & Hooks

**Date**: 2025-10-11
**Version**: 2.0.0
**Purpose**: Guide for implementing scroll animations and magnetic tilt on other pages
**Target Audience**: Developers building additional pages for Phoebus Digital site

---

## Table of Contents

1. [Overview](#overview)
2. [Animation Hooks](#animation-hooks)
3. [Implementation Recipes](#implementation-recipes)
4. [Configuration Guidelines](#configuration-guidelines)
5. [Best Practices](#best-practices)
6. [Common Patterns](#common-patterns)
7. [Troubleshooting](#troubleshooting)
8. [Performance Checklist](#performance-checklist)

---

## Overview

The Phoebus Digital homepage uses reusable animation hooks that can be applied to other pages. The system provides:

### Core Hooks

1. **`useIntersectionAnimation`** - Scroll-triggered entrance animations
   - Location: `hooks/useIntersectionAnimation.ts`
   - Payload: ~2KB gzipped
   - Purpose: Detect when elements enter viewport and trigger animations

2. **`useMagneticTilt`** - Cursor-tracking 3D tilt for cards (desktop only)
   - Location: `hooks/useMagneticTilt.ts`
   - Payload: ~2KB gzipped
   - Purpose: Add subtle hover tilt interactions with 3D perspective

### Key Features

- **Performant**: GPU-accelerated transforms, 60fps
- **Accessible**: Respects `prefers-reduced-motion`, works without JavaScript
- **Device-Optimized**: Full animations on desktop, simplified on mobile
- **Lightweight**: < 5KB total payload
- **Reusable**: Apply same patterns across all pages

---

## Animation Hooks

### useIntersectionAnimation

**Purpose**: Trigger CSS animations when elements enter the viewport.

#### API

```typescript
const { ref, isVisible } = useIntersectionAnimation(options)
```

#### Parameters

```typescript
interface UseIntersectionAnimationOptions {
  threshold?: number        // Default: 0.1 (10% visible)
  rootMargin?: string       // Default: '0px 0px -50px 0px'
  triggerOnce?: boolean     // Default: true
}
```

#### Returns

```typescript
{
  ref: React.RefObject<HTMLElement>    // Attach to element to observe
  isVisible: boolean                    // True when element in viewport
}
```

#### Example Usage

```tsx
import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation'

export function MyComponent() {
  const { ref, isVisible } = useIntersectionAnimation({
    threshold: 0.2,      // Trigger when 20% visible
    triggerOnce: true    // Only animate once
  })

  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${isVisible ? 'visible' : ''}`}
    >
      Content here
    </div>
  )
}
```

#### CSS Pattern

```css
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 600ms cubic-bezier(0.4, 0, 0.2, 1),
              transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Accessibility: Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .animate-on-scroll {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
```

---

### useMagneticTilt

**Purpose**: Add 3D cursor-tracking tilt effect to cards and interactive elements.

#### API

```typescript
const { ref, style, handlers, isHovered } = useMagneticTilt(options)
```

#### Parameters

```typescript
interface MagneticTiltOptions {
  maxTilt?: number        // Max tilt angle in degrees (default: 8)
  perspective?: number    // 3D perspective in px (default: 1000)
  scale?: number          // Scale on hover (default: 1.02)
}
```

#### Returns

```typescript
{
  ref: React.RefObject<HTMLElement>           // Attach to tilt element
  style: React.CSSProperties                  // Apply to element
  handlers: {
    onMouseEnter: (e: React.MouseEvent) => void
    onMouseLeave: (e: React.MouseEvent) => void
    onMouseMove?: (e: React.MouseEvent) => void
  }
  isHovered: boolean                          // Hover state
}
```

#### Example Usage

```tsx
import { useMagneticTilt } from '@/hooks/useMagneticTilt'

export function MyCard() {
  const { ref, style, handlers } = useMagneticTilt({
    maxTilt: 3,         // Subtle 3° tilt
    scale: 1.01,        // 1% scale increase
    perspective: 1200   // Deep perspective
  })

  return (
    <div ref={ref} style={style} {...handlers}>
      <div className="card-content">
        Card content here
      </div>
    </div>
  )
}
```

#### Device Support

- **Desktop (> 768px)**: Full magnetic tilt enabled
- **Mobile (≤ 768px)**: Automatically disabled (no hover on touch)
- **Reduced Motion**: Automatically disabled (accessibility)

---

## Implementation Recipes

### Recipe 1: Simple Card with Scroll Animation

**Use Case**: Basic card that slides up when entering viewport

```tsx
'use client'

import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation'
import styles from './SimpleCard.module.css'

export function SimpleCard({ title, description }) {
  const { ref, isVisible } = useIntersectionAnimation({
    threshold: 0.2
  })

  return (
    <div
      ref={ref}
      className={`${styles.card} ${isVisible ? styles.visible : ''}`}
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}
```

```css
/* SimpleCard.module.css */
.card {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 600ms cubic-bezier(0.4, 0, 0.2, 1),
              transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
}

.card.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .card {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
```

---

### Recipe 2: Card with Scroll Animation + Magnetic Tilt

**Use Case**: Interactive card with both entrance animation and hover tilt

```tsx
'use client'

import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation'
import { useMagneticTilt } from '@/hooks/useMagneticTilt'
import styles from './InteractiveCard.module.css'

export function InteractiveCard({ title, description, index }) {
  // Scroll animation hook
  const { ref: animRef, isVisible } = useIntersectionAnimation({
    threshold: 0.2,
    triggerOnce: true
  })

  // Magnetic tilt hook
  const { ref: tiltRef, style: tiltStyle, handlers } = useMagneticTilt({
    maxTilt: 3,
    scale: 1.01,
    perspective: 1200
  })

  return (
    <div
      ref={animRef}
      className={`${styles.cardWrapper} ${isVisible ? styles.visible : ''}`}
      style={{
        '--animation-delay': `${index * 150}ms`
      } as React.CSSProperties}
    >
      <div
        ref={tiltRef}
        style={tiltStyle}
        {...handlers}
        className={styles.card}
      >
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}
```

```css
/* InteractiveCard.module.css */
.cardWrapper {
  opacity: 0;
  transform: translateY(50px) scale(0.95);
  transition: opacity 700ms cubic-bezier(0.34, 1.56, 0.64, 1),
              transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: var(--animation-delay, 0ms);
}

.cardWrapper.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.card {
  /* Card styles */
  background: var(--cream-card);
  padding: 2rem;
  border-radius: var(--neumorphic);
}

@media (prefers-reduced-motion: reduce) {
  .cardWrapper {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
```

**Key Pattern**: Two separate refs
- `animRef`: Controls scroll-triggered entrance animation
- `tiltRef`: Controls magnetic tilt hover interaction

---

### Recipe 3: Staggered List Animation

**Use Case**: Multiple items that animate in sequence (e.g., feature list, team members)

```tsx
'use client'

import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation'
import styles from './StaggeredList.module.css'

interface ListItem {
  id: string
  title: string
  description: string
}

export function StaggeredList({ items }: { items: ListItem[] }) {
  const { ref, isVisible } = useIntersectionAnimation({
    threshold: 0.1
  })

  return (
    <div ref={ref} className={styles.listContainer}>
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`${styles.listItem} ${isVisible ? styles.visible : ''}`}
          style={{
            '--animation-delay': `${index * 100}ms`
          } as React.CSSProperties}
        >
          <h4>{item.title}</h4>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  )
}
```

```css
/* StaggeredList.module.css */
.listItem {
  opacity: 0;
  transform: translateX(-30px);
  transition: opacity 500ms cubic-bezier(0.4, 0, 0.2, 1),
              transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: var(--animation-delay, 0ms);
}

.listItem.visible {
  opacity: 1;
  transform: translateX(0);
}

@media (prefers-reduced-motion: reduce) {
  .listItem {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
```

---

### Recipe 4: Hero Section with Multi-Element Choreography

**Use Case**: Complex hero with multiple elements animating in sequence

```tsx
'use client'

import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation'
import { NeumorphicButton } from '@/components/NeumorphicButton/NeumorphicButton'
import styles from './Hero.module.css'

export function Hero() {
  const { ref, isVisible } = useIntersectionAnimation({
    threshold: 0.1
  })

  return (
    <section
      ref={ref}
      className={`${styles.hero} ${isVisible ? styles.visible : ''}`}
    >
      <h1 className={styles.headline}>
        <span
          className={styles.line}
          style={{ transitionDelay: '0ms' }}
        >
          Your Amazing
        </span>
        <span
          className={styles.line}
          style={{ transitionDelay: '80ms' }}
        >
          Product Title
        </span>
        <span
          className={styles.line}
          style={{ transitionDelay: '160ms' }}
        >
          Goes Here
        </span>
      </h1>

      <p
        className={styles.description}
        style={{ transitionDelay: '300ms' }}
      >
        Compelling description text that explains your value proposition
      </p>

      <div className={styles.ctas}>
        <div style={{ transitionDelay: '450ms' }}>
          <NeumorphicButton variant="primary">Get Started</NeumorphicButton>
        </div>
        <div style={{ transitionDelay: '500ms' }}>
          <NeumorphicButton variant="secondary">Learn More</NeumorphicButton>
        </div>
      </div>
    </section>
  )
}
```

```css
/* Hero.module.css */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
}

.line,
.description,
.ctas > div {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 600ms cubic-bezier(0.4, 0, 0.2, 1),
              transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: var(--animation-delay, 0ms);
}

.hero.visible .line,
.hero.visible .description,
.hero.visible .ctas > div {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .line,
  .description,
  .ctas > div {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
```

---

### Recipe 5: Alternating Side-by-Side Content

**Use Case**: Content sections that alternate left/right (common in landing pages)

```tsx
'use client'

import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation'
import styles from './AlternatingSection.module.css'

interface ContentSection {
  id: string
  title: string
  description: string
  imageUrl: string
}

export function AlternatingSections({ sections }: { sections: ContentSection[] }) {
  return (
    <div className={styles.container}>
      {sections.map((section, index) => {
        const isEven = index % 2 === 0
        return (
          <AlternatingSection
            key={section.id}
            section={section}
            imageOnLeft={isEven}
            index={index}
          />
        )
      })}
    </div>
  )
}

function AlternatingSection({ section, imageOnLeft, index }) {
  const { ref, isVisible } = useIntersectionAnimation({
    threshold: 0.3
  })

  const animationClass = imageOnLeft ? styles.fromLeft : styles.fromRight

  return (
    <div
      ref={ref}
      className={`${styles.section} ${animationClass} ${isVisible ? styles.visible : ''}`}
      style={{
        '--animation-delay': `${index * 100}ms`
      } as React.CSSProperties}
    >
      <div className={styles.content}>
        <h2>{section.title}</h2>
        <p>{section.description}</p>
      </div>
      <div className={styles.image}>
        <img src={section.imageUrl} alt={section.title} />
      </div>
    </div>
  )
}
```

```css
/* AlternatingSection.module.css */
.section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 6rem;
}

.fromLeft {
  opacity: 0;
  transform: translateX(-60px);
  transition: opacity 650ms cubic-bezier(0.4, 0, 0.2, 1),
              transform 650ms cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: var(--animation-delay, 0ms);
}

.fromRight {
  opacity: 0;
  transform: translateX(60px);
  transition: opacity 650ms cubic-bezier(0.4, 0, 0.2, 1),
              transform 650ms cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: var(--animation-delay, 0ms);
}

.fromLeft.visible,
.fromRight.visible {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 768px) {
  .section {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .fromLeft,
  .fromRight {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
```

---

## Configuration Guidelines

### Choosing maxTilt Values

**Small cards (vertical, < 400px wide)**:
- `maxTilt: 3-4` - Noticeable but not excessive
- `scale: 1.01` - Subtle lift
- `perspective: 1200` - Deep 3D effect

**Large cards (horizontal, > 600px wide)**:
- `maxTilt: 2-3` - More restraint for wider surfaces
- `scale: 1.005-1.01` - Minimal scale
- `perspective: 1200-1500` - Deeper perspective

**Interactive elements (buttons, small components)**:
- `maxTilt: 5-8` - More dramatic for small targets
- `scale: 1.02-1.05` - Noticeable lift
- `perspective: 800-1000` - Shallower perspective

### Choosing Animation Durations

**Hero sections**:
- Duration: `600ms` - Feels immediate
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` - Standard deceleration
- Stagger: `80-100ms` between elements

**Cards and content blocks**:
- Duration: `650-750ms` - Balanced
- Easing: `cubic-bezier(0.34, 1.56, 0.64, 1)` - Playful bounce (optional)
- Stagger: `100-150ms` between cards

**List items**:
- Duration: `500ms` - Quick and snappy
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` - Standard deceleration
- Stagger: `50-100ms` between items

**Micro-interactions** (hover states):
- Duration: `200-300ms` - Responsive
- Easing: `ease-out` or `cubic-bezier(0.4, 0, 0.6, 1)`

### Choosing Threshold Values

**Large elements** (hero sections, full-width banners):
- `threshold: 0.1` - Trigger when 10% visible
- Triggers early, feels responsive

**Cards and content blocks**:
- `threshold: 0.2-0.3` - Trigger when 20-30% visible
- Good balance of visibility and timing

**Small elements** (list items, icons):
- `threshold: 0.5` - Trigger when 50% visible
- Ensures element is clearly visible before animating

---

## Best Practices

### 1. Always Use Separate Refs for Animation and Tilt

**❌ Wrong**:
```tsx
const { ref, isVisible } = useIntersectionAnimation()
const { ref: tiltRef, style, handlers } = useMagneticTilt()
// Can't attach both refs to same element!
```

**✅ Correct**:
```tsx
const { ref: animRef, isVisible } = useIntersectionAnimation()
const { ref: tiltRef, style, handlers } = useMagneticTilt()

return (
  <div ref={animRef} className={isVisible ? 'visible' : ''}>
    <div ref={tiltRef} style={style} {...handlers}>
      {/* Content */}
    </div>
  </div>
)
```

---

### 2. Always Include Reduced Motion Support

**Required CSS for all animated elements**:
```css
@media (prefers-reduced-motion: reduce) {
  .your-animated-class {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
    animation: none !important;
  }
}
```

This is a **WCAG 2.1 AA requirement** (Success Criterion 2.3.3).

---

### 3. Use GPU-Accelerated Properties Only

**✅ Allowed**:
- `transform: translate()`
- `transform: scale()`
- `transform: rotate()`
- `opacity`

**❌ Prohibited**:
- `top`, `left`, `right`, `bottom`
- `width`, `height`
- `margin`, `padding`
- `background-position`

---

### 4. Optimize Mobile Experience

**Disable complex animations on mobile**:
```css
@media (max-width: 768px) {
  .complex-animation {
    /* Simplify animation */
    animation-duration: 400ms; /* Faster */
    transform: translateY(20px); /* Shorter distance */
  }
}
```

**Magnetic tilt automatically disabled on mobile** (built into hook).

---

### 5. Set Appropriate Stagger Delays

**Formula**: `delay = index × staggerInterval`

**Recommended stagger intervals**:
- **Hero elements**: 80-100ms (feels coordinated)
- **Cards**: 100-150ms (balanced)
- **List items**: 50-100ms (quick succession)
- **Sections**: 150-200ms (deliberate pacing)

**Maximum stagger**: Keep total animation time < 2 seconds
```
Example: 10 cards × 150ms = 1500ms (1.5s) ✅ Good
         10 cards × 300ms = 3000ms (3s) ❌ Too long
```

---

### 6. Test Above-the-Fold Content

Elements visible on page load will animate immediately. Test this behavior:

```tsx
// Hook automatically detects if element is already in viewport
const { ref, isVisible } = useIntersectionAnimation({
  threshold: 0.1
})

// No additional code needed - hook handles it!
```

---

## Common Patterns

### Pattern 1: Section Header + Cards

```tsx
export function Section({ title, cards }) {
  const headerAnim = useIntersectionAnimation({ threshold: 0.1 })

  return (
    <section>
      <h2
        ref={headerAnim.ref}
        className={`section-header ${headerAnim.isVisible ? 'visible' : ''}`}
      >
        {title}
      </h2>

      <div className="card-grid">
        {cards.map((card, index) => (
          <AnimatedCard key={card.id} card={card} index={index} />
        ))}
      </div>
    </section>
  )
}
```

---

### Pattern 2: Conditional Animation (Mobile vs Desktop)

```tsx
export function ResponsiveCard({ title, description }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768)
  }, [])

  const { ref: animRef, isVisible } = useIntersectionAnimation()
  const tiltConfig = useMagneticTilt({
    maxTilt: isMobile ? 0 : 3, // Disable on mobile
    scale: isMobile ? 1 : 1.01
  })

  return (
    <div ref={animRef} className={isVisible ? 'visible' : ''}>
      <div ref={tiltConfig.ref} style={tiltConfig.style} {...tiltConfig.handlers}>
        {/* Content */}
      </div>
    </div>
  )
}
```

**Note**: `useMagneticTilt` already handles mobile detection internally, so this is optional.

---

### Pattern 3: Reusable Animated Wrapper

```tsx
// components/AnimatedWrapper/AnimatedWrapper.tsx
'use client'

import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation'
import styles from './AnimatedWrapper.module.css'

interface AnimatedWrapperProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function AnimatedWrapper({ children, delay = 0, direction = 'up' }: AnimatedWrapperProps) {
  const { ref, isVisible } = useIntersectionAnimation({
    threshold: 0.2
  })

  return (
    <div
      ref={ref}
      className={`${styles.wrapper} ${styles[direction]} ${isVisible ? styles.visible : ''}`}
      style={{ '--animation-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
```

**Usage**:
```tsx
<AnimatedWrapper delay={150} direction="left">
  <MyComponent />
</AnimatedWrapper>
```

---

## Troubleshooting

### Issue: Animation Not Triggering

**Symptom**: Element doesn't animate when scrolling into view

**Possible Causes**:
1. **Missing `visible` class**: Ensure you're applying the class based on `isVisible`
   ```tsx
   className={`${styles.card} ${isVisible ? styles.visible : ''}`}
   ```

2. **Element already in viewport**: Use threshold `0.1` for above-the-fold content

3. **CSS transition not defined**: Check that your CSS has transition properties

4. **Reduced motion enabled**: Test with reduced motion disabled

**Solution**:
```tsx
// Add debug logging
const { ref, isVisible } = useIntersectionAnimation({ threshold: 0.1 })
console.log('isVisible:', isVisible) // Should toggle to true when scrolling
```

---

### Issue: Magnetic Tilt Not Working

**Symptom**: Cards don't tilt on hover

**Possible Causes**:
1. **Mobile device**: Tilt is disabled on touch devices (intended behavior)

2. **Reduced motion enabled**: Tilt respects accessibility preferences

3. **Missing handlers**: Ensure you're spreading `{...handlers}`

4. **Style not applied**: Ensure you're applying `style={tiltStyle}`

**Solution**:
```tsx
// Verify hook is working
const { ref, style, handlers, isHovered } = useMagneticTilt({ maxTilt: 5 })
console.log('isHovered:', isHovered) // Should be true on hover

return (
  <div ref={ref} style={style} {...handlers}>
    {/* Content */}
  </div>
)
```

---

### Issue: Animation Performance Issues

**Symptom**: Janky animations, frame drops

**Possible Causes**:
1. **Non-GPU properties**: Using `top`, `left`, `width`, etc.
   - **Fix**: Use `transform: translate()` instead

2. **Too many simultaneous animations**: > 10 elements animating at once
   - **Fix**: Increase stagger delay

3. **Complex CSS on animated elements**: Gradients, filters, shadows
   - **Fix**: Simplify or apply to child elements

**Solution**:
```tsx
// Check Chrome DevTools > Performance
// Ensure animations stay at 60fps
// Look for "Recalculate Style" and "Layout" (should be minimal)
```

---

### Issue: Hydration Mismatch

**Symptom**: React hydration error in console

**Cause**: Server renders with `isVisible: false`, but client sees element in viewport

**Solution**: Use `'use client'` directive and handle mounted state
```tsx
'use client'

import { useState, useEffect } from 'react'
import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation'

export function MyComponent() {
  const [mounted, setMounted] = useState(false)
  const { ref, isVisible } = useIntersectionAnimation()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div ref={ref}>{/* Static content */}</div>
  }

  return (
    <div ref={ref} className={isVisible ? 'visible' : ''}>
      {/* Animated content */}
    </div>
  )
}
```

---

## Performance Checklist

Before deploying a new page with animations, verify:

### ✅ Performance

- [ ] All animations use GPU-accelerated properties (`transform`, `opacity`)
- [ ] No scroll event listeners (use Intersection Observer)
- [ ] Lighthouse Performance ≥ 90 (mobile), ≥ 95 (desktop)
- [ ] Chrome DevTools Performance: 60fps during animations
- [ ] Cumulative Layout Shift (CLS) = 0
- [ ] JavaScript bundle increase < 10KB per page

### ✅ Accessibility

- [ ] `@media (prefers-reduced-motion: reduce)` support in all animated CSS
- [ ] `useIntersectionAnimation` respects reduced motion preference
- [ ] Keyboard navigation unaffected by animations
- [ ] Focus indicators visible during animations
- [ ] Screen reader testing (NVDA/VoiceOver)
- [ ] Lighthouse Accessibility ≥ 95

### ✅ Responsive

- [ ] Test on mobile (320px, 375px, 414px)
- [ ] Test on tablet (768px, 1024px)
- [ ] Test on desktop (1440px, 1920px)
- [ ] Magnetic tilt disabled on mobile (< 768px)
- [ ] Simplified animations on mobile
- [ ] No horizontal scroll on any viewport

### ✅ Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS 15+)
- [ ] Chrome Mobile (Android)

### ✅ User Experience

- [ ] Animations guide attention appropriately
- [ ] Stagger timing feels natural (not too fast or slow)
- [ ] Tilt effect is subtle (not disorienting)
- [ ] No distracting or annoying animations
- [ ] Content readable without animations

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-10-11 | Initial documentation for reusable animation components |

---

## Related Documentation

- [INTERACTION_DESIGN_SYSTEM.md](./INTERACTION_DESIGN_SYSTEM.md) - Complete design system reference
- [MOTION_DESIGN_PLAN.md](./MOTION_DESIGN_PLAN.md) - Original motion design plan
- [DESIGN_ANALYSIS.md](./DESIGN_ANALYSIS.md) - Performance and accessibility analysis
- [spec.md](./spec.md) - Feature specification with animation requirements

---

## Support

**Questions or issues?**
- Review existing implementation in `app/page.tsx` (complete examples)
- Check component implementations: `ServiceCard`, `ProcessCard`, `WhyDifferentCard`
- Consult INTERACTION_DESIGN_SYSTEM.md for implementation details
- Test in Chrome DevTools for performance debugging
