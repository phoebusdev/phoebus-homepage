# Motion Design Plan: "Tasteful Dynamic Motion"

**Date**: 2025-10-10
**Purpose**: Add sophisticated, performant motion throughout the homepage
**Philosophy**: "Near-Miss Parallax Choreography" - Physical movement only, no fading
**Status**: Proposed

---

## Executive Summary

This plan proposes adding tasteful, dynamic motion to the Phoebus Digital homepage using lightweight,  performant techniques that honor the existing "soft plastic realism" neumorphic design system. All animations will use GPU-accelerated transforms, Intersection Observer API (not scroll events), and respect the constitution's performance and accessibility requirements.

**Key Principles**:
- **No Fading**: Elements move through physical space, never fade in/out
- **Near-Miss Choreography**: Elements appear to almost collide but pass smoothly
- **Performance First**: Intersection Observer + GPU transforms only
- **Accessibility**: Respects `prefers-reduced-motion`
- **Progressive Enhancement**: Works without JavaScript, enhanced with it

---

## Design Philosophy: "Near-Miss Parallax Choreography"

### Core Principles (from DESIGN_SYSTEM.md)

1. **No Fading**: Elements never fade in/out—they move through physical space
2. **Individual Movement**: Each element has its own timing and trajectory
3. **Near-Miss Timing**: Elements appear to almost collide but pass by smoothly
4. **Velocity Awareness**: Movement speed affects other elements (momentum)
5. **Scroll Physics**: User scroll speed influences animation characteristics

### Visual Behavior Goals

**What users should experience**:
- Elements feel like they're moving through 3D space
- Smooth, choreographed entrances with staggered timing
- Natural, physics-based easing (cubic-bezier, not linear)
- Tactile, responsive micro-interactions
- Subtle depth shifts that reinforce the neumorphic aesthetic

---

## Motion Inventory: Section-by-Section Analysis

### 1. Hero Section

**Current State**: Static on page load
**Proposed Motion**:
- **Hero card**: Gentle scale-up + slide up from below (transform: translate + scale)
- **Headline lines**: Staggered slide-in from left, 80ms between each line
- **Subheadline**: Slide up from below with 120ms delay after headline
- **CTA Buttons**: Slide in from left (primary) and right (secondary) with near-miss timing

**Timing Choreography**:
```
0ms:     Hero card begins scale (0.95 → 1.0) + translateY(30px → 0)
80ms:    "Digital Products" slides in from left
160ms:   "Built Right" slides in from left
240ms:   "Delivered Fast" slides in from left
360ms:   Subheadline paragraph slides up
480ms:   Primary button slides from left
520ms:   Secondary button slides from right (near-miss with primary)
```

**Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` - Material Design standard deceleration
**Duration**: 600ms per element
**Distance**: 30-40px translates, 0.05 scale range

---

### 2. Services Section (3 Cards)

**Current State**: Static grid, has `delay` prop infrastructure in place
**Proposed Motion**:
- **Section header**: Slide up from below when entering viewport
- **Service Cards**: Staggered slide-up + subtle scale, 150ms between cards
- **Card Entry Pattern**: Cards slide from below-left diagonal path

**Timing Choreography** (triggered when section enters viewport):
```
0ms:     Section header slides up (translateY(40px → 0))
200ms:   Service Card 1 begins (translateY(50px → 0) + scale(0.95 → 1))
350ms:   Service Card 2 begins
500ms:   Service Card 3 begins
```

**Easing**: `cubic-bezier(0.34, 1.56, 0.64, 1)` - Gentle bounce for playful feel
**Duration**: 700ms per card
**Distance**: 50px translateY, 0.95 → 1.0 scale

**Implementation**:
- Use existing `delay` prop (already in ServiceCard component)
- Add `useIntersectionAnimation` custom hook for viewport detection
- Apply animation classes via CSS Modules

---

### 3. Process Section (4 Expandable Cards)

**Current State**: Cards always expanded (mobile) or expandable (desktop)
**Proposed Motion**:

**Desktop (≥1024px)**:
- **Section header**: Slide in from left when entering viewport
- **Process Cards**: Alternate slide directions creating wave effect
  - Card 1: Slide from left
  - Card 2: Slide from right
  - Card 3: Slide from left
  - Card 4: Slide from right
- **Card Expansion**: Smooth width transition when user hovers/interacts

**Mobile (<1024px)**:
- **Cards**: Simple slide-up from below with staggered timing
- **No hover expansion**: Touch-friendly, cards always expanded

**Timing Choreography** (viewport intersection):
```
0ms:     Section header slides from left (translateX(-40px → 0))
150ms:   Card 1 slides from left (translateX(-60px → 0))
300ms:   Card 2 slides from right (translateX(60px → 0))
450ms:   Card 3 slides from left (translateX(-60px → 0))
600ms:   Card 4 slides from right (translateX(60px → 0))
```

**Easing**:
- Entrance: `cubic-bezier(0.4, 0, 0.2, 1)` - Standard deceleration
- Expansion: `cubic-bezier(0.4, 0, 0.2, 1)` - Consistent with entrance

**Duration**: 650ms per card entrance, 600ms card expansion
**Distance**: 60px horizontal translates

**Special Considerations**:
- Respect existing `.card-solution4` and `.expanded` classes
- Maintain current hover/click expansion logic
- Add animation classes without breaking mobile behavior

---

### 4. Why We're Different Section (4 Cards)

**Current State**: Static 2×2 grid
**Proposed Motion**:
- **Section header**: Slide up from below when entering viewport
- **Cards**: Radial expansion from center with staggered timing
  - Cards appear to "push outward" from center point
  - Creates organic, spreading effect

**Timing Choreography** (viewport intersection):
```
0ms:     Section header slides up (translateY(40px → 0))
200ms:   All 4 cards begin simultaneous radial movement
         Card 1 (top-left): translateX(-30px) + translateY(-30px)
         Card 2 (top-right): translateX(30px) + translateY(-30px)
         Card 3 (bottom-left): translateX(-30px) + translateY(30px)
         Card 4 (bottom-right): translateX(30px) + translateY(30px)
```

**Easing**: `cubic-bezier(0.34, 1.56, 0.64, 1)` - Playful bounce effect
**Duration**: 750ms
**Distance**: 30px diagonal translates, 0.92 → 1.0 scale

---

## Micro-Interactions: Button & Component Behaviors

### NeumorphicButton Hover/Active States

**Current State**: Shadow transitions on hover/active (already implemented)
**Enhancement**: Add subtle vertical shift and scale

**Proposed**:
```css
.button:hover {
  transform: translateY(-2px) scale(1.02);
  transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.button:active {
  transform: translateY(0) scale(0.98);
  transition: transform 100ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Rationale**: Reinforces the physical "button press" metaphor with subtle depth change

---

### NeumorphicNav Slider Movement

**Current State**: Smooth slider animation with cubic-bezier easing (already good!)
**Enhancement**: None needed - current implementation is excellent

---

### NeumorphicCard Hover (Desktop Only)

**Current State**: No hover effects per constitution ("Cards: Static")
**Proposed**: Maintain static cards, no hover animations

**Rationale**: Cards are content containers, not interactive buttons. Hover would be distracting.

---

### Navigation Menu (Mobile)

**Current State**: Menu opens/closes with focus trap
**Enhancement**: Add slide-in animation for menu overlay

**Proposed**:
```css
@keyframes slideInFromTop {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mobileMenuOverlay {
  animation: slideInFromTop 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Note**: This uses `opacity` for the overlay fade (acceptable for overlays), but menu card itself slides

---

## Technical Implementation Strategy

### 1. Custom Hook: `useIntersectionAnimation`

**Purpose**: Detect when elements enter viewport and trigger animations
**Replaces**: Heavy scroll event listeners or react-scroll-parallax library

```typescript
// hooks/useIntersectionAnimation.ts
import { useEffect, useRef, useState } from 'react'

interface UseIntersectionAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useIntersectionAnimation(
  options: UseIntersectionAnimationOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -100px 0px',
    triggerOnce = true
  } = options

  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      setIsVisible(true) // Show immediately, skip animations
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            observer.disconnect()
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce])

  return { ref, isVisible }
}
```

**Usage Example**:
```tsx
export function ServiceCard({ title, description, delay }: ServiceCardProps) {
  const { ref, isVisible } = useIntersectionAnimation()

  return (
    <div
      ref={ref}
      className={`
        ${styles.card}
        ${isVisible ? styles.visible : styles.hidden}
      `}
      style={{ '--animation-delay': `${delay}00ms` } as React.CSSProperties}
    >
      {/* Card content */}
    </div>
  )
}
```

---

### 2. CSS Animation Classes

**Create**: `app/globals.css` animation utilities

```css
/* Animation Keyframes */
@keyframes slideUpFade {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideFromLeft {
  from {
    opacity: 0;
    transform: translateX(-60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideFromRight {
  from {
    opacity: 0;
    transform: translateX(60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleUpGently {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(30px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes radialExpand {
  from {
    opacity: 0;
    transform: var(--radial-start) scale(0.92);
  }
  to {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
}

/* Animation Utility Classes */
.animate-on-scroll {
  opacity: 0;
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.animate-on-scroll.visible {
  opacity: 1;
  transform: translate(0, 0) scale(1);
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .animate-on-scroll,
  *[class*="animate-"] {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### 3. Component-Level Integration

**ServiceCard Example**:

```tsx
// components/ServiceCard/ServiceCard.tsx
'use client'

import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation'
import styles from './ServiceCard.module.css'

export function ServiceCard({ title, description, features, icon, delay }: ServiceCardProps) {
  const { ref, isVisible } = useIntersectionAnimation({
    threshold: 0.2,
    triggerOnce: true
  })

  return (
    <div
      ref={ref}
      className={`${styles.card} ${isVisible ? styles.visible : ''}`}
      style={
        {
          '--animation-delay': `${parseInt(delay) * 150}ms`
        } as React.CSSProperties
      }
    >
      {/* Card content */}
    </div>
  )
}
```

```css
/* components/ServiceCard/ServiceCard.module.css */
.card {
  opacity: 0;
  transform: translateY(50px) scale(0.95);
  transition:
    opacity 700ms cubic-bezier(0.34, 1.56, 0.64, 1),
    transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: var(--animation-delay, 0ms);
}

.card.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .card {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

---

## Performance Considerations

### ✅ Allowed (GPU-Accelerated)
- `transform: translate()` - 2D movement
- `transform: translate3d()` - 3D movement (better performance)
- `transform: scale()` - Scaling
- `transform: rotate()` - Rotation
- `opacity` - Fading (used sparingly, mainly for initial state)

### ❌ Prohibited (CPU-Heavy)
- `top`, `left`, `right`, `bottom` for animation
- `width`, `height` for animation (except process card expansion - already optimized)
- `margin`, `padding` for animation
- `background-position` animation (removed in performance fixes)
- `box-shadow` animation (only transition on state change)

### Browser Paint Optimization

**Use `will-change` sparingly**:
```css
.animating-element {
  will-change: transform, opacity;
}

/* Remove after animation completes */
.animating-element.animation-complete {
  will-change: auto;
}
```

**Force GPU compositing**:
```css
.hardware-accelerated {
  transform: translate3d(0, 0, 0);
  /* OR */
  transform: translateZ(0);
}
```

---

## Accessibility: Reduced Motion Support

### Implementation

```css
/* Global override */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Hook Integration

```typescript
export function useIntersectionAnimation(options = {}) {
  // ... existing code

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      setIsVisible(true) // Skip animation, show immediately
      return
    }

    // ... rest of intersection observer logic
  }, [])

  return { ref, isVisible }
}
```

---

## Mobile vs Desktop Behavior

### Mobile (<768px)
- **Simplified animations**: Shorter distances, faster durations
- **No parallax**: All sections scroll normally
- **Touch-optimized**: Immediate visual feedback on tap
- **Reduced complexity**: Fewer simultaneous animations

```css
@media (max-width: 768px) {
  .animate-on-scroll {
    /* Reduce animation distance */
    --translate-distance: 20px;
    /* Faster duration */
    animation-duration: 400ms !important;
  }
}
```

### Desktop (≥768px)
- **Full animations**: Complete choreography as designed
- **Hover micro-interactions**: Subtle button lifts, etc.
- **Complex timing**: Multi-element near-miss choreography
- **Parallax considerations**: Optional subtle parallax (future enhancement)

---

## Implementation Phases

### Phase 1: Foundation (Priority: P1)
**Goal**: Set up animation infrastructure

- [ ] Create `hooks/useIntersectionAnimation.ts`
- [ ] Add animation keyframes to `app/globals.css`
- [ ] Add reduced motion support globally
- [ ] Test hook with single component (ServiceCard)
- [ ] Verify performance (60fps, no jank)

**Success Criteria**:
- Hook works with Intersection Observer
- Animations respect `prefers-reduced-motion`
- Lighthouse performance score remains ≥90

---

### Phase 2: Hero Section (Priority: P2)
**Goal**: Animate hero entrance

- [ ] Add `useIntersectionAnimation` to hero section
- [ ] Implement staggered headline animation
- [ ] Implement CTA button near-miss timing
- [ ] Add hero card scale-up effect
- [ ] Test on mobile and desktop

**Success Criteria**:
- Hero animates on page load smoothly
- No layout shifts (CLS = 0)
- Works on mobile Safari and Chrome Mobile

---

### Phase 3: Service Cards (Priority: P2)
**Goal**: Animate service card entrances

- [ ] Update ServiceCard component with animation support
- [ ] Use existing `delay` prop for stagger timing
- [ ] Add slide-up + scale animation
- [ ] Test 3-card stagger effect
- [ ] Verify mobile performance

**Success Criteria**:
- Cards animate in sequence (150ms stagger)
- Animation feels natural and smooth
- No performance degradation

---

### Phase 4: Process Section (Priority: P3)
**Goal**: Animate process cards with alternating directions

- [ ] Add animation support to ProcessCard component
- [ ] Implement alternating left/right slide pattern
- [ ] Ensure mobile cards slide from below
- [ ] Preserve existing expansion logic
- [ ] Test hover expansion timing

**Success Criteria**:
- Cards create "wave" effect on desktop
- Mobile shows simple slide-up
- Expansion animation unaffected

---

### Phase 5: Why Different Section (Priority: P3)
**Goal**: Animate radial expansion of differentiator cards

- [ ] Update WhyDifferentCard with animation support
- [ ] Implement radial expansion from center
- [ ] Set custom `--radial-start` CSS variables per card
- [ ] Test 2×2 grid expansion effect
- [ ] Verify responsive behavior

**Success Criteria**:
- Cards "push outward" from center smoothly
- Radial pattern visible and satisfying
- Works on all viewport sizes

---

### Phase 6: Micro-Interactions (Priority: P4)
**Goal**: Polish button and navigation interactions

- [ ] Add subtle scale/translate to NeumorphicButton hover
- [ ] Enhance button active state feedback
- [ ] Add mobile menu slide-in animation
- [ ] Polish navigation menu item transitions
- [ ] Test touch interactions on mobile

**Success Criteria**:
- Buttons feel tactile and responsive
- No performance impact from hover states
- Mobile interactions feel snappy

---

### Phase 7: Polish & Testing (Priority: P5)
**Goal**: Final refinements and cross-browser testing

- [ ] Fine-tune all animation durations and easings
- [ ] Test on Chrome, Firefox, Safari (desktop)
- [ ] Test on Mobile Safari (iOS) and Chrome Mobile (Android)
- [ ] Run Lighthouse performance audit (mobile + desktop)
- [ ] Verify accessibility with reduced motion enabled
- [ ] Test with keyboard navigation
- [ ] Check 60fps with Chrome DevTools Performance tab

**Success Criteria**:
- Lighthouse Performance ≥90 mobile, ≥95 desktop
- Lighthouse Accessibility ≥95
- No console errors or warnings
- Smooth 60fps animations confirmed

---

## Testing Strategy

### Manual Testing Checklist

**Visual Quality**:
- [ ] Animations feel natural and physically plausible
- [ ] Timing creates "near-miss" effect (elements appear coordinated)
- [ ] No janky or stuttering movement
- [ ] Easing curves feel appropriate (not robotic)

**Performance**:
- [ ] Chrome DevTools Performance: 60fps maintained during animations
- [ ] Lighthouse Mobile Performance: ≥90
- [ ] Lighthouse Desktop Performance: ≥95
- [ ] No layout shifts (CLS = 0)
- [ ] Animations complete within expected duration

**Accessibility**:
- [ ] `prefers-reduced-motion: reduce` disables animations
- [ ] Keyboard navigation unaffected by animations
- [ ] Screen reader doesn't announce animation states
- [ ] Focus indicators remain visible during animations

**Browser Compatibility**:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS 15+)
- [ ] Chrome Mobile (Android)

**Responsive Behavior**:
- [ ] 320px viewport (iPhone SE)
- [ ] 375px viewport (iPhone 12)
- [ ] 768px viewport (iPad portrait)
- [ ] 1024px viewport (iPad landscape)
- [ ] 1920px+ viewport (desktop)

---

## Animation Timing Reference

### Durations
- **Hero Section**: 600ms per element
- **Service Cards**: 700ms per card
- **Process Cards**: 650ms entrance, 600ms expansion
- **Why Different Cards**: 750ms radial expansion
- **Micro-interactions**: 200ms hover, 100ms active

### Stagger Delays
- **Hero Headlines**: 80ms between lines
- **Hero CTAs**: 480ms (primary), 520ms (secondary)
- **Service Cards**: 150ms between cards
- **Process Cards**: 150ms between cards
- **Why Different Cards**: Simultaneous (0ms stagger)

### Easing Curves
- **Standard Deceleration**: `cubic-bezier(0.4, 0, 0.2, 1)`
- **Playful Bounce**: `cubic-bezier(0.34, 1.56, 0.64, 1)`
- **Quick Snap**: `cubic-bezier(0.4, 0, 0.6, 1)`

---

## Future Enhancements (Post-MVP)

### Scroll Velocity-Based Animations
**Concept**: Animation characteristics change based on scroll speed
- **Fast scroll**: Shorter animations, quicker reveals
- **Slow scroll**: Longer animations, more detailed choreography

**Implementation**: Track scroll velocity in custom hook, adjust CSS variables dynamically

---

### Cursor-Aware Micro-Interactions
**Concept**: Elements subtly respond to cursor proximity (desktop only)
- **Buttons**: Slight magnetic pull toward cursor
- **Cards**: Subtle tilt based on cursor position (3D effect)

**Implementation**: Mouse move event listener with requestAnimationFrame throttling

---

### Sophisticated Parallax (Desktop Only, Optional)
**Concept**: Lightweight CSS-only parallax without scroll libraries
- **Background layers**: Fixed attachment with transform
- **Hero elements**: Slight vertical shift on scroll

**Implementation**:
```css
.parallax-bg {
  background-attachment: fixed;
  transform: translateZ(0); /* GPU acceleration */
}
```

---

## Success Metrics

### Performance Gates
- ✅ Lighthouse Performance: ≥90 mobile, ≥95 desktop
- ✅ Lighthouse Accessibility: ≥95
- ✅ 60fps maintained during all animations
- ✅ No layout shifts (CLS = 0)
- ✅ JavaScript bundle size increase: <5KB gzipped

### User Experience Goals
- ✅ Animations enhance comprehension (direct attention appropriately)
- ✅ Motion feels cohesive and branded
- ✅ No distracting or annoying animations
- ✅ Interactions feel responsive and tactile
- ✅ Design system integrity maintained

---

## Related Documents

- [DESIGN_SYSTEM.md](../../DESIGN_SYSTEM.md) - Animation philosophy, "Near-Miss Parallax Choreography"
- [Constitution](.specify/memory/constitution.md) - Principle VII: Performance by Default
- [PERFORMANCE_FIXES.md](./PERFORMANCE_FIXES.md) - Why previous parallax was removed
- [spec.md](./spec.md) - Functional requirements for animations
- [tasks.md](./tasks.md) - Implementation task list

---

## Approval & Sign-Off

**Status**: ⏳ Awaiting Review
**Proposed By**: Claude Code
**Date**: 2025-10-10

**Review Checklist**:
- [ ] Aligns with constitution Principle VII (Performance by Default)
- [ ] Respects design system animation philosophy
- [ ] Performance requirements achievable
- [ ] Accessibility requirements met
- [ ] Implementation phases reasonable
- [ ] Testing strategy comprehensive

**Approved By**: _____________
**Date**: _____________

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-10-10 | Initial motion design plan proposal |

