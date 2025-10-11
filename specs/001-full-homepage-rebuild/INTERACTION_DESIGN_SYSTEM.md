# Phoebus Digital Interaction Design System

**Version**: 2.0.0
**Last Updated**: 2025-10-11
**Status**: Production Ready

---

## Table of Contents

1. [Overview](#overview)
2. [Animation System](#animation-system)
3. [Magnetic Tilt Interactions](#magnetic-tilt-interactions)
4. [Implementation Patterns](#implementation-patterns)
5. [Performance Standards](#performance-standards)
6. [Accessibility Guidelines](#accessibility-guidelines)
7. [Component Recipes](#component-recipes)

---

## Overview

The Phoebus Digital homepage uses scroll-triggered animations and desktop hover effects to enhance the neumorphic design. All animations are:

- **Performant**: GPU-accelerated, 60fps, < 8KB payload
- **Accessible**: Respect `prefers-reduced-motion`, keyboard navigation unaffected
- **Device-Optimized**: Full animations on desktop, simplified on mobile
- **Progressive**: Work without JavaScript, enhanced with it

**Key Features:**
- Scroll-triggered entrance animations using Intersection Observer
- Magnetic 3D tilt on card hover (desktop only)
- Staggered timing for visual rhythm
- Mobile-optimized with simplified animations

---

## Animation System

### Technical Foundation

**Implementation**: `useIntersectionAnimation` hook
**API Used**: Intersection Observer (no scroll event listeners)
**Performance**: GPU-accelerated transforms only (`transform`, `opacity`)
**Payload**: < 3KB gzipped

### Hook Usage

```typescript
import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation'

const { ref, isVisible } = useIntersectionAnimation({
  threshold: 0.2,        // 20% of element must be visible
  rootMargin: '0px 0px -50px 0px', // Trigger 50px before viewport bottom
  triggerOnce: true      // Animate only once
})
```

### Animation Classes

#### Hero Section - Scale Up with Staggered Lines

**CSS Class**: `.hero-scale-up`, `.hero-headline-line`

```css
/* Initial state */
.hero-scale-up {
  opacity: 0;
  transform: scale(0.95) translateY(30px);
  transition: opacity 600ms cubic-bezier(0.4, 0, 0.2, 1),
              transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Visible state */
.hero-scale-up.visible {
  opacity: 1;
  transform: scale(1) translateY(0);
}
```

**Stagger Pattern**:
- Hero card: 0ms (immediate)
- Line 1: 80ms
- Line 2: 160ms
- Line 3: 240ms
- Paragraph: 360ms
- Primary CTA: 480ms
- Secondary CTA: 520ms

**Usage**:
```tsx
<div ref={heroAnimation.ref} className={`hero-scale-up ${heroAnimation.isVisible ? 'visible' : ''}`}>
  <span style={{ transitionDelay: '80ms' }} className={`hero-headline-line ${heroAnimation.isVisible ? 'visible' : ''}`}>
    First Line
  </span>
</div>
```

#### Service Cards - Slide Up with Scale

**CSS Class**: `.service-card-animate`

```css
.service-card-animate {
  opacity: 0;
  transform: translateY(50px) scale(0.95);
  transition: opacity 700ms cubic-bezier(0.34, 1.56, 0.64, 1),
              transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: var(--animation-delay, 0ms);
}
```

**Stagger**: 150ms between cards
**Easing**: Cubic-bezier with slight overshoot (1.56) for natural bounce

**Usage**:
```tsx
<div className={`service-card-animate ${isVisible ? 'visible' : ''}`}
     style={{ '--animation-delay': `${index * 150}ms` }}>
  {/* Card content */}
</div>
```

#### Process Cards - Alternating Wave

**CSS Classes**: `.process-card-left`, `.process-card-right`

```css
/* Slide from left */
.process-card-left {
  opacity: 0;
  transform: translateX(-60px);
  transition: opacity 650ms cubic-bezier(0.4, 0, 0.2, 1),
              transform 650ms cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: var(--animation-delay, 0ms);
}

/* Slide from right */
.process-card-right {
  opacity: 0;
  transform: translateX(60px);
  /* Same transition as left */
}
```

**Pattern**: Alternating based on index
- Index 0 (even): slide from left
- Index 1 (odd): slide from right
- Index 2 (even): slide from left
- Index 3 (odd): slide from right

**Stagger**: 150ms between cards

**Usage**:
```tsx
const animationClass = index % 2 === 0 ? 'process-card-left' : 'process-card-right'

<div className={`${animationClass} ${isVisible ? 'visible' : ''}`}
     style={{ '--animation-delay': `${index * 150}ms` }}>
  {/* Card content */}
</div>
```

#### Why Different Cards - Radial Expansion

**CSS Class**: `.radial-card`

```css
.radial-card {
  opacity: 0;
  transform: var(--radial-start) scale(0.92);
  transition: opacity 750ms cubic-bezier(0.34, 1.56, 0.64, 1),
              transform 750ms cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: var(--animation-delay, 0ms);
}
```

**Stagger**: 150ms between cards
**Effect**: Cards scale up from 92% to 100% creating expansion feel

#### Section Headers

**CSS Class**: `.section-header-animate`

```css
.section-header-animate {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 600ms cubic-bezier(0.4, 0, 0.2, 1),
              transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Timing**: No delay - animates immediately when section enters viewport

### Mobile Optimizations

On viewports < 768px:

- Reduced animation distances (30px instead of 50-60px)
- Shorter transition durations (400ms)
- Process cards: All slide from bottom (no alternating directions)
- Simplified easing curves

```css
@media (max-width: 768px) {
  .service-card-animate {
    transform: translateY(30px) scale(0.95);
    transition-duration: 400ms;
  }

  .process-card-left,
  .process-card-right {
    transform: translateY(30px); /* No horizontal movement on mobile */
  }
}
```

---

## Magnetic Tilt Interactions

### Technical Foundation

**Implementation**: `useMagneticTilt` hook
**Technology**: React synthetic events + 3D CSS transforms
**Performance**: Event listeners attached on hover only
**Payload**: < 2KB gzipped

### Purpose

Magnetic tilt adds subtle 3D depth on desktop card hovers:
- Detects hover and tracks cursor position
- Tilts card in 3D space following cursor
- Maintains subtlety (2-3° max tilt)
- Scales card slightly (1.005-1.01x)
- Disabled on mobile and reduced motion

### Hook Usage

```typescript
import { useMagneticTilt } from '@/hooks/useMagneticTilt'

const { ref, style, handlers, isHovered } = useMagneticTilt({
  maxTilt: 3,           // Maximum tilt angle in degrees
  scale: 1.01,          // Scale on hover (1.01 = 1% larger)
  perspective: 1200     // 3D perspective distance in pixels
})
```

### Configuration by Component Type

#### Service Cards (Vertical, Medium)
```typescript
maxTilt: 3,
scale: 1.01,
perspective: 1200
```
- **Rationale**: Standard vertical cards benefit from noticeable tilt
- **Effect**: Clear 3D rotation, subtle scale up
- **Feel**: Responsive and engaging

#### Process Cards (Horizontal, Wide)
```typescript
maxTilt: 2,
scale: 1.005,
perspective: 1200
```
- **Rationale**: Wide cards need more restraint (excessive tilt looks unnatural)
- **Effect**: Very subtle tilt, minimal scale
- **Feel**: Sophisticated and restrained

#### Why Different Cards (Vertical, Medium)
```typescript
maxTilt: 3,
scale: 1.01,
perspective: 1200
```
- **Rationale**: Same as service cards - balanced engagement
- **Effect**: Clear 3D rotation, subtle scale up
- **Feel**: Responsive and engaging

### Implementation Pattern

```tsx
const { ref: animRef, isVisible } = useIntersectionAnimation({
  threshold: 0.2,
  triggerOnce: true
})

const { ref: tiltRef, style: tiltStyle, handlers } = useMagneticTilt({
  maxTilt: 3,
  scale: 1.01,
  perspective: 1200
})

return (
  <div ref={animRef} className={`service-card-animate ${isVisible ? 'visible' : ''}`}>
    <div ref={tiltRef} style={tiltStyle} {...handlers} className="h-full">
      {/* Card content */}
    </div>
  </div>
)
```

**Key Points**:
- Separate refs for animation container and tilt wrapper
- Animation controls entrance, tilt controls hover interaction
- Spread handlers to attach onMouseEnter, onMouseLeave, onMouseMove

### Tilt Calculation

The hook calculates tilt based on cursor position relative to card center:

```typescript
// Get card center
const centerX = rect.left + rect.width / 2
const centerY = rect.top + rect.height / 2

// Calculate distance from center
const deltaX = e.clientX - centerX
const deltaY = e.clientY - centerY

// Convert to percentage (-1 to 1)
const percentX = deltaX / (rect.width / 2)
const percentY = deltaY / (rect.height / 2)

// Apply max tilt (inverted Y for natural feel)
const rotateY = percentX * maxTilt
const rotateX = -percentY * maxTilt
```

**Result**: Cursor at top-left → card tilts toward top-left (natural feel)

### Transform Applied

```css
transform: perspective(1200px)
           rotateX(2.5deg)        /* Tilt on X axis */
           rotateY(-1.8deg)       /* Tilt on Y axis */
           scale(1.01);           /* Slight scale up */
```

**Transition**:
- **While hovering**: `100ms ease-out` (responsive)
- **When leaving**: `500ms cubic-bezier(0.4, 0, 0.2, 1)` (smooth return)

### Device Considerations

**Desktop (> 768px)**:
- Full magnetic tilt enabled
- Smooth cursor tracking
- 3D perspective active

**Mobile (≤ 768px)**:
- Magnetic tilt **disabled** (no hover state on touch)
- Only scroll-triggered animations play
- Performance optimized

**Reduced Motion**:
- Magnetic tilt **disabled** (respects user preference)
- Cards still visible and functional
- No transforms applied

---

## Implementation Patterns

### Pattern 1: Card with Animation + Magnetic Tilt

**Best for**: Service cards, Why Different cards, any vertical card grid

```tsx
'use client'

import { NeumorphicCard } from '@/components/NeumorphicCard/NeumorphicCard'
import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation'
import { useMagneticTilt } from '@/hooks/useMagneticTilt'

export function MyCard({ content, index }) {
  // Scroll-triggered animation
  const { ref: animRef, isVisible } = useIntersectionAnimation({
    threshold: 0.2,
    triggerOnce: true
  })

  // Magnetic tilt on hover
  const { ref: tiltRef, style: tiltStyle, handlers } = useMagneticTilt({
    maxTilt: 3,
    scale: 1.01,
    perspective: 1200
  })

  return (
    <div
      ref={animRef}
      className={`service-card-animate ${isVisible ? 'visible' : ''}`}
      style={{ '--animation-delay': `${index * 150}ms` }}
    >
      <div ref={tiltRef} style={tiltStyle} {...handlers} className="h-full">
        <NeumorphicCard className="h-full">
          {/* Card content */}
        </NeumorphicCard>
      </div>
    </div>
  )
}
```

### Pattern 2: Wide Card with Subtle Tilt

**Best for**: Process cards, timeline items, horizontal layouts

```tsx
export function ProcessCard({ step, index }) {
  const { ref: animRef, isVisible } = useIntersectionAnimation({
    threshold: 0.3,
    triggerOnce: true
  })

  const { ref: tiltRef, style: tiltStyle, handlers } = useMagneticTilt({
    maxTilt: 2,        // Less tilt for wide cards
    scale: 1.005,      // Minimal scale
    perspective: 1200
  })

  const animationClass = index % 2 === 0 ? 'process-card-left' : 'process-card-right'

  return (
    <div
      ref={animRef}
      className={`${animationClass} ${isVisible ? 'visible' : ''}`}
      style={{ '--animation-delay': `${index * 150}ms` }}
    >
      <div ref={tiltRef} style={tiltStyle} {...handlers}>
        {/* Card content */}
      </div>
    </div>
  )
}
```

### Pattern 3: Section Header with Simple Animation

**Best for**: Section titles, headers, no tilt needed

```tsx
export function SectionHeader({ title }) {
  const { ref, isVisible } = useIntersectionAnimation({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <div ref={ref} className={`section-header-animate ${isVisible ? 'visible' : ''}`}>
      <h2>{title}</h2>
    </div>
  )
}
```

### Pattern 4: Hero Section with Complex Stagger

**Best for**: Hero sections, complex multi-element intros

```tsx
export function Hero() {
  const { ref, isVisible } = useIntersectionAnimation({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <section ref={ref} className={`hero-scale-up ${isVisible ? 'visible' : ''}`}>
      <h1>
        <span
          className={`plastic-tube-text hero-headline-line ${isVisible ? 'visible' : ''}`}
          style={{ transitionDelay: '80ms' }}
        >
          Line 1
        </span>
        <span
          className={`plastic-tube-text hero-headline-line ${isVisible ? 'visible' : ''}`}
          style={{ transitionDelay: '160ms' }}
        >
          Line 2
        </span>
      </h1>
      <div
        className={`hero-headline-line ${isVisible ? 'visible' : ''}`}
        style={{ transitionDelay: '480ms' }}
      >
        <Button>CTA</Button>
      </div>
    </section>
  )
}
```

---

## Performance Standards

### JavaScript Bundle

- **Animation hook**: < 3KB gzipped
- **Magnetic tilt hook**: < 2KB gzipped
- **Total interaction payload**: < 8KB gzipped

### Runtime Performance

- **Frame rate**: Maintain 60fps during scroll and hover
- **GPU acceleration**: All transforms use `transform` and `opacity` only
- **Event listeners**: Attached on hover, not globally
- **Intersection Observer**: Efficient viewport detection without scroll events

### Performance Testing

```bash
# Build for production
npm run build

# Lighthouse audit (target scores)
- Performance: 90+ (mobile), 95+ (desktop)
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+
```

### Optimization Checklist

- ✅ Use `will-change: transform` on animated elements
- ✅ Avoid layout-triggering properties (width, height, margin, padding)
- ✅ Use `transform` and `opacity` exclusively for animations
- ✅ Debounce or throttle frequent events (if needed)
- ✅ Remove event listeners on component unmount
- ✅ Disable heavy animations on mobile devices
- ✅ Test with Chrome DevTools Performance tab

---

## Accessibility Guidelines

### Reduced Motion Support

**System Preference**: `prefers-reduced-motion: reduce`

**Implementation**:

1. **CSS Level** - Instant state changes:
```css
@media (prefers-reduced-motion: reduce) {
  .hero-scale-up,
  .service-card-animate,
  .process-card-left,
  .process-card-right,
  .radial-card {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
```

2. **JavaScript Level** - Skip animations in hooks:
```typescript
useEffect(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    setIsVisible(true) // Show immediately
    return
  }

  // Normal animation logic
}, [])
```

### Keyboard Navigation

All interactive elements must remain keyboard accessible:

- Cards with tilt are **not** interactive themselves
- Inner buttons/links must have proper focus states
- Focus indicators must be visible (3:1 contrast minimum)

### Screen Reader Support

- Animations are visual only - no impact on screen reader experience
- Content is available immediately in DOM
- ARIA labels and semantic HTML remain unchanged

### Progressive Enhancement

**Without JavaScript**:
- All content visible immediately
- No animations play
- Cards display in static state
- Site remains fully functional

**With JavaScript Disabled**:
```html
<noscript>
  <style>
    .hero-scale-up,
    .service-card-animate {
      opacity: 1 !important;
      transform: none !important;
    }
  </style>
</noscript>
```

---

## Component Recipes

### Recipe 1: Animated Card Grid

```tsx
interface CardGridProps {
  items: Array<{ id: string; title: string; description: string }>
}

export function AnimatedCardGrid({ items }: CardGridProps) {
  const { ref, isVisible } = useIntersectionAnimation({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <section ref={ref}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <AnimatedCard key={item.id} item={item} index={index} isVisible={isVisible} />
        ))}
      </div>
    </section>
  )
}

function AnimatedCard({ item, index, isVisible }) {
  const { ref: tiltRef, style: tiltStyle, handlers } = useMagneticTilt({
    maxTilt: 3,
    scale: 1.01,
    perspective: 1200
  })

  return (
    <div
      className={`service-card-animate ${isVisible ? 'visible' : ''}`}
      style={{ '--animation-delay': `${index * 150}ms` }}
    >
      <div ref={tiltRef} style={tiltStyle} {...handlers}>
        <NeumorphicCard>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </NeumorphicCard>
      </div>
    </div>
  )
}
```

### Recipe 2: Alternating Timeline

```tsx
interface TimelineItem {
  id: string
  title: string
  description: string
}

export function AlternatingTimeline({ items }: { items: TimelineItem[] }) {
  const { ref, isVisible } = useIntersectionAnimation({
    threshold: 0.2,
    triggerOnce: true
  })

  return (
    <section ref={ref}>
      <div className="space-y-6">
        {items.map((item, index) => (
          <TimelineCard key={item.id} item={item} index={index} isVisible={isVisible} />
        ))}
      </div>
    </section>
  )
}

function TimelineCard({ item, index, isVisible }) {
  const { ref: tiltRef, style: tiltStyle, handlers } = useMagneticTilt({
    maxTilt: 2,
    scale: 1.005,
    perspective: 1200
  })

  const animationClass = index % 2 === 0 ? 'process-card-left' : 'process-card-right'

  return (
    <div
      className={`${animationClass} ${isVisible ? 'visible' : ''}`}
      style={{ '--animation-delay': `${index * 150}ms` }}
    >
      <div ref={tiltRef} style={tiltStyle} {...handlers}>
        {/* Timeline item content */}
      </div>
    </div>
  )
}
```

### Recipe 3: Staggered Hero

```tsx
export function StaggeredHero({ headline, subheadline, ctas }) {
  const { ref, isVisible } = useIntersectionAnimation({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <section ref={ref} className={`hero-scale-up ${isVisible ? 'visible' : ''}`}>
      <h1>
        {headline.lines.map((line, index) => (
          <span
            key={index}
            className={`hero-headline-line ${isVisible ? 'visible' : ''}`}
            style={{ transitionDelay: `${(index + 1) * 80}ms` }}
          >
            {line}
          </span>
        ))}
      </h1>

      <p
        className={`hero-headline-line ${isVisible ? 'visible' : ''}`}
        style={{ transitionDelay: '360ms' }}
      >
        {subheadline}
      </p>

      <div className="flex gap-4">
        {ctas.map((cta, index) => (
          <div
            key={cta.id}
            className={`hero-headline-line ${isVisible ? 'visible' : ''}`}
            style={{ transitionDelay: `${480 + index * 40}ms` }}
          >
            <Button>{cta.text}</Button>
          </div>
        ))}
      </div>
    </section>
  )
}
```

---

## Summary

This interaction design system provides:

✅ **Consistent motion language** across all components
✅ **Performance-optimized** GPU-accelerated animations
✅ **Accessible** with reduced motion support
✅ **Reusable patterns** for rapid development
✅ **Sophisticated micro-interactions** via magnetic tilt
✅ **Mobile-optimized** with simplified animations
✅ **Production-ready** with comprehensive documentation

**Next Steps**:
1. Apply patterns to new pages
2. Test across browsers and devices
3. Gather user feedback on interaction subtlety
4. Iterate on timing values based on analytics

---

**Maintained by**: Phoebus Digital Development Team
**Questions**: Refer to MOTION_DESIGN_PLAN.md for detailed animation choreography
