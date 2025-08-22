# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Phoebus Digital homepage - a neumorphic website implementing the "Soft Plastic Realism" design system. Built with Next.js 15, TypeScript, and a hybrid CSS architecture (Tailwind + CSS Modules).

## Development Commands

```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run typecheck    # Run TypeScript checks (always run before committing)
npm run lint         # Run Next.js linting
```

**Quality checks before committing:**
1. `npm run typecheck` - Ensures TypeScript compilation
2. `npm run build` - Verifies production build works

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + CSS Modules hybrid
- **Animation**: react-scroll-parallax for parallax effects
- **Fonts**: Montserrat (primary), Chivo Mono (code), Material Symbols (icons)

### Design System: "Soft Plastic Realism"

Core neumorphic design with elements appearing carved from cream-colored soft plastic:

- **Colors**: Cream base (#f5f0e8), warm shadows (#d4cfc7), light highlights (#ffffff)
- **Depth**: Multi-layer shadows creating 3D appearance
- **Typography**: Three treatments - `.neumorphic-text-3d`, `.plastic-tube-text`, `.matter-plastic-light`
- **Animation**: Transform-only animations for 60fps performance, no fade effects

### Component Architecture

All neumorphic components follow a nested structure pattern:

```tsx
<Component>
  <div className={styles.componentOuter}>   // Shadow layer
    <div className={styles.componentInner}> // Content layer
      {children}
    </div>
  </div>
</Component>
```

Key components:
- **NeumorphicButton**: Three-layer button with press animations
- **NeumorphicCard**: Base container with complex shadow layering
- **NeumorphicNav**: Animated pill-shaped navigation slider
- **ServiceCard**: Product showcase with hover effects

### Styling Strategy

1. **Tailwind**: Layout, spacing, responsive utilities
2. **CSS Modules**: Component-specific neumorphic effects
3. **Global CSS** (`app/globals.css`): Design system, typography, keyframes
4. **Custom Properties**: Design tokens via `tailwind.config.ts`

### Performance Optimizations

- Transform-only animations with `will-change: transform`
- Hardware acceleration via `translateZ(0)`
- Dynamic imports for parallax components
- Intersection Observer for scroll triggers

## Critical Implementation Notes

### Animation Guidelines
- **No fading**: Elements move through space, never fade
- **Transform-only**: All animations use transform properties for GPU acceleration
- **Scroll physics**: Animation speed responds to scroll velocity
- **Staggered timing**: 150-300ms delays between elements

### Component Creation Pattern
When adding new neumorphic components:
1. Use the nested `outer/inner` div structure
2. Apply shadow patterns from existing components
3. Include CSS Module for complex effects
4. Test transform-only animations at 60fps
5. Verify mobile touch interactions

### File Organization
- Pages: `app/[page]/page.tsx`
- Components: `components/[ComponentName]/[ComponentName].tsx` with matching `.module.css`
- Global styles: `app/globals.css`
- Assets: `public/images/neumorphic/`

### TypeScript Path Aliases
Use `@/` for imports: `import { Component } from '@/components/Component/Component'`

## Page Architecture

### App Router Structure
- **Homepage** (`app/page.tsx`): Hero cards with dual animation system
- **Services** (`app/services/page.tsx`): Complex entry/exit choreography  
- **Process** (`app/process/page.tsx`): Reference implementation for all animation patterns
- **About/Pricing/Contact**: Standard neumorphic layouts

### Component Organization
Each component follows consistent structure:
```
components/[ComponentName]/
├── [ComponentName].tsx        # Main component logic
├── [ComponentName].module.css # Component-specific neumorphic effects (optional)
└── index.ts                   # Export barrel (not implemented)
```

### Key Components
- **NeumorphicButton**: Three-layer button with press animations and size variants
- **NeumorphicCard**: Base container with complex shadow layering patterns
- **NeumorphicNav**: Animated pill-shaped navigation slider with active state
- **ServiceCard**: Product showcase cards with hover effects and gradient backgrounds
- **ScrollDebugTool**: Development-only animation debugging interface
- **Navigation**: Main site navigation with responsive hamburger menu

## Common Issues & Solutions

- **Build failures**: Run `npm run typecheck` to identify TypeScript issues
- **Animation stuttering**: Check for non-transform properties in animations
- **Style conflicts**: Verify CSS Module naming doesn't conflict with Tailwind classes
- **Import errors**: Use `@/` path alias for all internal imports
- **Navigation collision avoidance**: ALWAYS adhere to every step of the navigation collision avoidance approach before making any changes to animations. Account for all other factors, presuming nothing, when calculating collision avoidance (card sizes, section size). Presume nothing.

## Advanced Animation System

### Scroll Debug System
The codebase includes a comprehensive real-time animation debugging system:

- **ScrollDebugContext**: Central state management for all animations with 80+ predefined configs
- **DebugParallax**: Individual element wrapper with live debug capabilities  
- **DualParallax**: Dual animation system (entry/exit) for complex choreography like services cards
- **ScrollDebugTool**: Visual debugging interface with bulk editing, scroll snap controls, and live preview

**Debug activation**: Add `?debug=true` to URL or set development environment

### Animation Configuration Structure
```typescript
interface AnimationConfig {
  id: string              // Unique identifier for debug targeting
  name: string            // Human-readable name for debug tool
  translateX: [number, number]  // [start, end] X translation in pixels
  translateY: [number, number]  // [start, end] Y translation in pixels  
  rotate: [number, number]      // [start, end] rotation in degrees
  startScroll: number           // Scroll position to start animation
  endScroll: number            // Scroll position to end animation
}
```

### Scroll Animation Patterns
Refer to `ANIMATION_STYLE_GUIDE.md` and `SCROLL_ANIMATION_SYSTEM.md` for:
- **Stacked Deck Animation**: Cards that start stacked and spread out
- **Cascading Cards**: Elements sliding in from different directions  
- **Enhanced Stacked Deck with Bounce**: Fan-out pattern with cubic-bezier easing
- **Scroll-triggered**: Progress-based animations using 80% viewport start, 20% end
- **Smooth easing**: `rawProgress * rawProgress * (3 - 2 * rawProgress)`

### Animation Implementation Hook
```tsx
function useScrollAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  
  // Implementation handles viewport calculations and smooth easing
  // See ANIMATION_STYLE_GUIDE.md for complete pattern
}
```

## Asset Generation

### Neumorphic SVG System  
The project includes a script to generate neumorphic design assets:
- **Script**: `scripts/generate-neumorphic-images.js`
- **Output**: `public/images/neumorphic/` (SVG and CSS pairs)
- **Assets**: Buttons, cards, icons, logo text with various sizes
- **Usage**: Reference generated CSS classes in components

## Development Workflow

### Debug-First Animation Development
1. **Enable debug mode**: Add `?debug=true` to URL during development
2. **Use ScrollDebugTool**: Real-time adjustment of animation parameters
3. **Copy configurations**: Export final values from debug tool to code
4. **Test across devices**: Verify mobile performance and reduced motion support

### Section Layout Pattern
Standard section structure for consistent spacing and animation:
```tsx
<section 
  className="scroll-snap-section min-h-screen py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-12 flex items-center"
  data-section="section-name"
>
  <div className="max-w-7xl mx-auto w-full">
    <div className="transform scale-75 origin-center" style={{ overflow: 'visible' }}>
      {/* Animated content */}
    </div>
  </div>
</section>
```

### Animation Integration Requirements
- **Transform-only**: No layout-triggering properties (left, top, width, height)
- **Hardware acceleration**: Use `translateZ(0)` or `will-change: transform` for complex animations
- **Scroll snap compatibility**: Ensure animations don't interfere with section snap points
- **Reduced motion**: All animations must respect `prefers-reduced-motion: reduce`