# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build for production (checks types and builds)
- `npm run start` - Start production server
- `npm run lint` - Run Next.js linting
- `npm run typecheck` - Run TypeScript type checking without emitting files

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **React**: Version 19 (latest)
- **TypeScript**: 5.x with strict mode enabled
- **Styling**: Tailwind CSS 3.x + Custom CSS (globals.css)
- **Animations**: react-scroll-parallax for scroll-based effects
- **Path Aliases**: `@/*` maps to project root

### Design System: "Soft Plastic Realism"

This project implements a sophisticated **neumorphic design system** documented in DESIGN_SYSTEM.md. The visual language is based on cream-colored soft plastic material with depth effects created through layered shadows.

**Key Design Principles**:
- **Color Palette**: Cream foundation (`#f5f0e8`, `#f0ebe3`) with warm shadows
- **Typography**: Montserrat primary font with three text treatments:
  - `.neumorphic-text-3d` - Standard raised text effect
  - `.plastic-tube-text` - Metallic tube-like headlines with animated shimmer
  - `.matter-plastic-light` - Subtle accent text for emphasis
- **Animations**: Physical movement only (no fade effects), scroll-triggered parallax choreography
- **Components**: All use neumorphic depth effects (raised surfaces, inset shadows)

### Project Structure

```
├── app/
│   ├── globals.css           # Complete design system (keyframes, typography, components)
│   ├── layout.tsx            # Root layout with metadata and background layers
│   └── page.tsx              # Homepage with parallax sections (client component)
├── components/
│   ├── Icon/                 # Material Symbols icon wrapper
│   ├── Navigation/           # Main navigation with mobile hamburger
│   ├── NeumorphicButton/     # Three-layer depth button component
│   ├── NeumorphicCard/       # Raised card with inner content area
│   ├── NeumorphicHamburger/  # Mobile menu toggle
│   ├── NeumorphicNav/        # Slider-style navigation component
│   ├── SectionHeader/        # Section title component
│   └── ServiceCard/          # Service offering card
├── tailwind.config.ts        # Extended colors, animations, border radiuses
├── tsconfig.json             # Strict TypeScript config with path aliases
└── next.config.js            # Package import optimizations
```

### Component Architecture

**All components use CSS Modules pattern** with separate `.tsx` and `.module.css` files for isolation.

**Client vs Server Components**:
- `app/page.tsx` is a client component (`'use client'`) due to parallax and state management
- `app/layout.tsx` is a server component (metadata generation)
- Most individual components can be server components unless they need interactivity

**Hydration Handling**:
The homepage implements a two-phase render to prevent hydration mismatches with parallax:
1. SSR/initial render: Static content without parallax wrapper
2. Client-side mounted: Full parallax effects enabled
This is controlled via `mounted` state and conditional rendering.

### Key Implementation Details

**Parallax System** (react-scroll-parallax):
- Wrapped in `ParallaxProvider` at page root
- Disabled on mobile (`isMobile` state) for performance
- Individual `Parallax` components wrap sections/cards
- Uses `translateY`, `translateX`, and `scale` transforms
- Dynamic import with `ssr: false` to prevent hydration issues

**Responsive Behavior**:
- Mobile: `< 640px` (simplified animations, smaller radii, expanded process cards)
- Tablet: `640px - 1023px`
- Desktop: `≥ 1024px`
- Process cards auto-expand on mobile via CSS media queries

**Background Layers** (layout.tsx):
- `.animated-gradient-bg` - Animated pastel gradient (fixed, z-index: -10)
- `.frosted-glass-bg` - Frosted glass overlay (fixed, z-index: -5)
- Both applied as fixed positioned divs in root layout

**Typography Integration**:
- Montserrat loaded via Google Fonts in globals.css
- Chivo Mono for monospace elements
- Material Symbols Outlined for icons

### TypeScript Configuration

- **Strict mode enabled** for type safety
- **Path aliases**: Use `@/` for imports from project root
  - Example: `import { Button } from '@/components/NeumorphicButton/NeumorphicButton'`
- **Target**: ES2017 for broad compatibility
- **Module resolution**: bundler mode (Next.js 15 requirement)

### Styling System

**Tailwind CSS** is used for utilities with custom extensions:
- Custom colors: `cream-base`, `cream-card`, `shadow-dark`, `shadow-light`, etc.
- Custom animations: `gradient-shift`, `metal-shimmer`, `float`
- Custom border radiuses: `neumorphic` (35px), `neumorphic-sm` (25px)

**Custom CSS** (globals.css) defines:
- All neumorphic component classes (`.neumorphic-card`, `.neumorphic-button`, etc.)
- Typography treatments with complex text-shadow and gradients
- Animation keyframes
- Responsive adjustments and reduced motion support

### Data Architecture

Page data (services, process steps, why-different items) is defined as static arrays in `app/page.tsx`. This keeps content editable in one place and maps to components via `.map()`.

### Performance Considerations

- **Package optimization**: `optimizePackageImports: ['@/components']` in next.config.js
- **Dynamic imports**: Parallax library loaded client-side only
- **Transform-only animations**: All animations use `transform` for 60fps
- **Reduced motion**: CSS respects `prefers-reduced-motion` media query
- **Mobile optimizations**: Simplified shadows and disabled parallax on small screens

## Development Workflow

### Adding New Components

1. Create component directory in `/components`
2. Create `.tsx` file with TypeScript component
3. Create `.module.css` file for component-specific styles
4. Use neumorphic design patterns from globals.css
5. Import and use in pages with `@/components/...` path

### Modifying Design System

- **Global styles**: Edit `app/globals.css`
- **Tailwind config**: Edit `tailwind.config.ts` for theme extensions
- **Typography**: Maintain three-tier system (neumorphic-text-3d, plastic-tube-text, matter-plastic-light)
- **Colors**: Stay within cream palette defined in Tailwind config
- **Reference**: Consult DESIGN_SYSTEM.md for design principles

### Testing Changes

1. Run `npm run dev` for hot-reload development
2. Test on mobile viewport (parallax should disable)
3. Run `npm run typecheck` to catch TypeScript errors
4. Run `npm run build` to verify production build succeeds
5. Test with reduced motion enabled in browser settings

## Important Notes

- **No emoji usage**: Design system is serious and refined
- **Animation philosophy**: Physical movement only, never fade in/out
- **Parallax on desktop only**: Mobile uses static layout for performance
- **Hydration prevention**: Page uses mounted state to prevent mismatches
- **Component isolation**: All components use CSS Modules, not global classes
- **Design reference**: DESIGN_SYSTEM.md is the source of truth for visual decisions
