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

## Common Issues & Solutions

- **Build failures**: Run `npm run typecheck` to identify TypeScript issues
- **Animation stuttering**: Check for non-transform properties in animations
- **Style conflicts**: Verify CSS Module naming doesn't conflict with Tailwind classes
- **Import errors**: Use `@/` path alias for all internal imports