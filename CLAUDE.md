# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Phoebus Digital homepage - a sophisticated neumorphic website built with Next.js, featuring the "Soft Plastic Realism" design system. The project implements a complete neumorphic design framework with advanced animations and a carefully crafted visual aesthetic.

## Development Commands

### Primary Development
```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run typecheck    # Run TypeScript checks (use before committing)
npm run lint         # Run Next.js linting
```

### Quality Assurance
Always run before committing changes:
1. `npm run typecheck` - Ensures TypeScript compilation
2. `npm run build` - Verifies production build works
3. `npm run lint` - Checks code style and catches common issues

## Architecture

### Core Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict configuration
- **Styling**: Tailwind CSS + CSS Modules hybrid approach
- **Animation**: Framer Motion for GPU-optimized parallax and scroll animations
- **Fonts**: Montserrat (primary), Chivo Mono (code), Material Symbols (icons)

### Design System: "Soft Plastic Realism"
The entire interface is built around a neumorphic design philosophy where elements appear carved from or molded into cream-colored soft plastic. Key principles:

- **Color Palette**: Cream foundation (`#f5f0e8`) with warm shadows
- **Typography**: Metallic text effects with plastic tube styling
- **Depth**: Multiple shadow layers create convincing 3D appearance
- **Animation**: Physical movement patterns - NO fade effects allowed

### File Structure
```
app/
├── globals.css          # Complete design system CSS with neumorphic utilities
├── layout.tsx           # Root layout with suppressHydrationWarning for browser extensions
└── page.tsx             # Homepage with scroll-triggered animations

components/
├── NeumorphicCard/      # Raised card surfaces with complex shadow layering
├── NeumorphicButton/    # Three-layer button structure with press animations
├── NeumorphicNav/       # Animated pill-shaped navigation slider
├── Navigation/          # Top navigation with responsive hamburger menu
└── [Other]/             # Service cards, section headers, etc.

public/images/neumorphic/ # SVG assets with companion CSS for neumorphic elements
scripts/                  # Utility scripts for generating design assets
```

## Component Patterns

### Neumorphic Components
All main UI components follow the neumorphic design system:

- **NeumorphicCard**: Base container with `cardOuter` → `cardInner` structure
- **NeumorphicButton**: Complex three-layer button with hover/press states
- **NeumorphicNav**: Animated slider navigation with smooth transitions

Each component uses CSS Modules for isolation while sharing design tokens through Tailwind custom properties.

### Animation Architecture
Built on Framer Motion with scroll-triggered choreography:

- **Scroll Physics**: User scroll speed influences animation characteristics
- **Staggered Timing**: Elements enter with 150-300ms delays
- **Transform-Only**: All animations use only transform properties for 60fps performance
- **Hardware Acceleration**: `will-change: transform` and `translateZ(0)` on animated elements

### Styling Approach
Hybrid CSS architecture combining:

1. **Tailwind CSS**: Utility classes for layout, spacing, responsive design
2. **CSS Modules**: Component-specific styles for complex neumorphic effects
3. **CSS Custom Properties**: Design tokens defined in `tailwind.config.ts`
4. **Global Styles**: Typography system and animation keyframes in `globals.css`

## Important Development Notes

### Hydration Considerations
The layout includes `suppressHydrationWarning={true}` on the body element to prevent browser extension conflicts. This is intentional and should not be removed.

### Performance Optimizations
- All animations use transform-only for GPU acceleration
- Intersection Observer API for scroll triggers
- Reduced motion support for accessibility
- Hardware acceleration enabled on animated elements

### Browser Extension Compatibility
Browser extensions often inject attributes into the DOM, causing hydration mismatches. The `suppressHydrationWarning` on the body element specifically addresses this common issue.

### Design System Compliance
When adding new components:

1. Follow the cream color palette from `tailwind.config.ts`
2. Use neumorphic shadow patterns from existing components
3. Implement proper depth hierarchy with multiple shadow layers
4. Ensure animations use transform-only properties
5. Test on mobile devices for touch interactions

### Animation Guidelines
- **No fading**: Elements move through space, never fade in/out
- **Individual timing**: Each element has unique animation characteristics
- **Scroll physics**: Animation speed should respond to user scroll velocity
- **Near-miss choreography**: Elements should appear to almost collide but pass smoothly

### Responsive Behavior
- **Mobile**: Reduced shadow intensity, simplified animations
- **Tablet**: Intermediate complexity
- **Desktop**: Full neumorphic effects and complex animations

## Troubleshooting

### Common Issues
- **Hydration errors**: Usually caused by browser extensions, verify `suppressHydrationWarning` is present
- **Animation stuttering**: Check for non-transform properties in animations
- **Build failures**: Run `npm run typecheck` to identify TypeScript issues
- **Style conflicts**: Verify CSS Module naming doesn't conflict with Tailwind classes

### Typography System
Three main text treatments available:
- `.neumorphic-text-3d`: Standard raised text effect
- `.plastic-tube-text`: Metallic tube-like letters with shimmer
- `.matter-plastic-light`: Subtle textured appearance

### Testing Animations
Use browser dev tools to:
1. Check for layout thrashing (avoid non-transform animations)
2. Monitor frame rate during scroll (should maintain 60fps)
3. Test with reduced motion preferences enabled
4. Verify animations work on touch devices