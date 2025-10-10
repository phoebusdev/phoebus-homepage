# Implementation Plan: Full Homepage Rebuild

**Branch**: `001-full-homepage-rebuild` | **Date**: 2025-10-09 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-full-homepage-rebuild/spec.md`

## Summary

Rebuild Phoebus Digital homepage on clean foundations while preserving neumorphic design system and all content. Fix all TypeScript errors (currently 100+ errors), implement WCAG 2.1 AA accessibility (target 95+ Lighthouse score), optimize mobile-first performance (90+ mobile, 95+ desktop), add functional contact form with Resend email integration, integrate Vercel Analytics, enhance SEO with structured data and OpenGraph tags, implement error boundaries for resilience, and establish production-ready component architecture. All visual neumorphic components (cards, buttons, text effects) and content must remain pixel-perfect identical.

**Technical Approach**: Clean slate reconstruction using Next.js 15 App Router with TypeScript strict mode, component isolation pattern (separate .tsx and .module.css files), server components where appropriate, dynamic imports for heavy dependencies, accessibility-first development with focus management and ARIA labels, performance optimization through GPU-accelerated animations only, and incremental validation of each user story before proceeding to next.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode enabled, already configured in tsconfig.json)
**Primary Dependencies**:
- Next.js 15.4.6 (App Router)
- React 19.0.0
- react-scroll-parallax 3.4.5 (desktop-only parallax effects)
- Tailwind CSS 3.3.0 (utility classes)
- Resend SDK (email delivery)
- @vercel/analytics (page view and event tracking)

**Storage**: N/A (no database required - contact form submissions sent via email, no persistence)
**Testing**: Manual browser testing (Chrome, Firefox, Safari), Lighthouse audits (performance, accessibility, SEO), keyboard navigation testing, screen reader testing (NVDA/VoiceOver)
**Target Platform**: Web (Next.js deployed on Vercel, server-side rendering + client hydration)
**Project Type**: Web application (Next.js App Router single-page marketing site)
**Performance Goals**:
- Lighthouse mobile: ≥90
- Lighthouse desktop: ≥95
- First Contentful Paint (FCP): ≤1.5s on 3G
- Time to Interactive (TTI): ≤3.5s on 3G
- Cumulative Layout Shift (CLS): 0
- 60fps animations on mobile

**Constraints**:
- Design system preservation: All neumorphic CSS classes must remain visually identical
- Content preservation: All text must match character-for-character
- Bundle size: <150KB gzipped JavaScript
- Accessibility: WCAG 2.1 AA compliance (Lighthouse ≥95)
- Browser support: Modern browsers last 2 versions (Chrome, Firefox, Safari, Mobile Safari, Chrome Mobile)
- No IE11 support

**Scale/Scope**: Single-page marketing site with 4 sections (hero, services, process, differentiators), 1 contact form, mobile navigation menu. Homepage only - no additional pages in initial scope. Estimated concurrent users: 10-100, not high-traffic.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Principle I: Design System Preservation (NON-NEGOTIABLE)
- [x] **PASS**: All neumorphic CSS classes will be preserved in `app/globals.css`
- [x] **PASS**: Cream color palette (#f5f0e8, #f0ebe3, shadows) will not be modified
- [x] **PASS**: Typography treatments (plastic-tube-text, neumorphic-text-3d) remain in globals.css
- [x] **PASS**: Shadow layering and depth effects will be maintained exactly
- [x] **PASS**: DESIGN_SYSTEM.md serves as reference for all visual decisions

**Status**: ✅ NO VIOLATIONS

### Principle II: Content Preservation
- [x] **PASS**: All service descriptions, process steps, differentiators preserved in `/data` directory with exact text
- [x] **PASS**: Hero messaging unchanged (moved to data/content.ts with original text)
- [x] **PASS**: Only component structure changes, not content changes

**Status**: ✅ NO VIOLATIONS

### Principle III: Clean Slate Reconstruction
- [x] **PASS**: NeumorphicNav will be simplified from 5 positioning strategies to 1 robust approach (ResizeObserver-based)
- [x] **PASS**: ProcessCard and WhyDifferentCard extracted to separate component files
- [x] **PASS**: Data structures moved to `/data` directory with TypeScript interfaces
- [x] **PASS**: Proper prop typing eliminates `any` types and key prop errors

**Status**: ✅ NO VIOLATIONS

### Principle IV: Accessibility First (NON-NEGOTIABLE)
- [x] **PASS**: Focus states added to all interactive elements with 3:1 contrast
- [x] **PASS**: Skip navigation link added
- [x] **PASS**: Focus trap implemented for mobile menu using focus-trap-react library
- [x] **PASS**: ARIA labels added to navigation, sections, form inputs
- [x] **PASS**: Semantic HTML landmarks (<nav>, <main>, <section>) implemented
- [x] **PASS**: Color contrast will be verified and fixed (4.5:1 body text, 3:1 large text)
- [x] **PASS**: Keyboard navigation enabled for all features
- [x] **PASS**: Reduced motion respected via CSS media query

**Gate**: Lighthouse accessibility audit ≥90 before merge
**Status**: ✅ NO VIOLATIONS

### Principle V: Type Safety & Error Prevention
- [x] **PASS**: TypeScript strict mode already enabled in tsconfig.json
- [x] **PASS**: All interfaces defined in `/types/index.ts`
- [x] **PASS**: Zero `any` types (all component props explicitly typed)
- [x] **PASS**: Event handlers have proper React.MouseEvent, React.KeyboardEvent signatures

**Gate**: `npm run typecheck` must pass with zero errors before merge
**Status**: ✅ NO VIOLATIONS

### Principle VI: Component Isolation & Modularity
- [x] **PASS**: All components follow ComponentName/ComponentName.tsx + ComponentName.module.css pattern
- [x] **PASS**: Props-based data flow (no global state except analytics context if needed)
- [x] **PASS**: Side effects isolated to custom hooks (useContactForm, useFocusTrap, etc.)
- [x] **PASS**: Shared utilities in `/lib` (validation, analytics helpers)

**Status**: ✅ NO VIOLATIONS

### Principle VII: Performance by Default
- [x] **PASS**: Animations use only `transform` and `opacity` (GPU-accelerated)
- [x] **PASS**: Parallax disabled on <768px viewports
- [x] **PASS**: react-scroll-parallax dynamically imported with `ssr: false`
- [x] **PASS**: Hydration handled via mounted state pattern where needed
- [x] **PASS**: Images use Next.js Image component (when added)

**Gate**: Lighthouse performance ≥90 mobile before merge
**Status**: ✅ NO VIOLATIONS

### Principle VIII: Incremental Validation
- [x] **PASS**: User stories delivered in priority order (P1 → P6)
- [x] **PASS**: Each story validated independently before proceeding
- [x] **PASS**: Manual browser testing at each checkpoint

**Status**: ✅ NO VIOLATIONS

### **CONSTITUTION CHECK RESULT**: ✅ ALL GATES PASS - PROCEED TO PHASE 0

## Project Structure

### Documentation (this feature)

```
specs/001-full-homepage-rebuild/
├── plan.md              # This file (/speckit.plan command output)
├── spec.md              # Feature specification (already created)
├── research.md          # Phase 0 output (created below)
├── data-model.md        # Phase 1 output (created below)
├── quickstart.md        # Phase 1 output (created below)
├── contracts/           # Phase 1 output (created below)
│   └── contact-api.yaml # OpenAPI spec for contact form endpoint
├── checklists/          # Quality validation
│   └── requirements.md  # Spec quality checklist (already created)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

**Selected Structure**: Next.js 15 App Router web application

```
app/
├── globals.css                    # Design system (neumorphic CSS, preserved)
├── layout.tsx                     # Root layout (metadata, analytics integration)
├── page.tsx                       # Homepage (client component with parallax)
├── api/
│   └── contact/
│       └── route.ts               # POST endpoint for contact form (Resend integration)
└── error.tsx                      # Root error boundary

components/
├── ErrorBoundary/
│   ├── ErrorBoundary.tsx          # React error boundary component
│   ├── ErrorBoundary.module.css
│   └── index.ts
├── Icon/
│   ├── Icon.tsx                   # Material Symbols wrapper (preserved)
│   └── index.ts
├── Navigation/
│   ├── Navigation.tsx             # Main nav with mobile menu (refactored)
│   ├── Navigation.module.css      # Preserved styles
│   └── index.ts
├── NeumorphicButton/
│   ├── NeumorphicButton.tsx       # Neumorphic button (preserved visually, typed)
│   ├── NeumorphicButton.module.css # Preserved
│   └── index.ts
├── NeumorphicCard/
│   ├── NeumorphicCard.tsx         # Neumorphic card (preserved visually, typed)
│   ├── NeumorphicCard.module.css  # Preserved
│   └── index.ts
├── NeumorphicNav/
│   ├── NeumorphicNav.tsx          # Navigation slider (SIMPLIFIED - see research.md)
│   ├── NeumorphicNav.module.css   # Preserved
│   └── index.ts
├── NeumorphicHamburger/
│   ├── NeumorphicHamburger.tsx    # Mobile menu toggle (preserved)
│   ├── NeumorphicHamburger.module.css # Preserved
│   └── index.ts
├── ServiceCard/
│   ├── ServiceCard.tsx            # Service offering card (typed)
│   └── index.ts
├── ProcessCard/                   # NEW - extracted from page.tsx
│   ├── ProcessCard.tsx            # Process step expandable card
│   └── index.ts
├── WhyDifferentCard/              # NEW - extracted from page.tsx
│   ├── WhyDifferentCard.tsx       # Differentiator card
│   └── index.ts
├── ContactForm/                   # NEW - contact form modal
│   ├── ContactForm.tsx            # Form with validation, Resend integration
│   ├── ContactForm.module.css
│   └── index.ts
├── SkipNavigation/                # NEW - accessibility skip link
│   ├── SkipNavigation.tsx
│   ├── SkipNavigation.module.css
│   └── index.ts
└── SectionHeader/
    ├── SectionHeader.tsx          # Section title component (preserved)
    └── index.ts

data/
├── services.ts                    # Service offerings array with TypeScript interface
├── processSteps.ts                # Process steps array with TypeScript interface
├── differentiators.ts             # Why Different items array with TypeScript interface
└── content.ts                     # Hero messaging and other text content

types/
└── index.ts                       # All TypeScript interfaces (Service, ProcessStep, etc.)

lib/
├── validation.ts                  # Email validation, form validation utilities
├── analytics.ts                   # Vercel Analytics event tracking helpers
└── resend.ts                      # Resend API client wrapper (if needed)

hooks/
├── useContactForm.ts              # Contact form state and submission logic
├── useFocusTrap.ts                # Focus trap for mobile menu
└── useScrollToSection.ts          # Smooth scroll navigation helper

public/
├── sitemap.xml                    # Generated sitemap
└── og-image.png                   # OpenGraph image (placeholder or logo)
```

**Structure Decision**:
Using Next.js 15 App Router structure (not Pages Router). All components follow isolation pattern with separate .tsx and .module.css files. Data moved to `/data` directory for clear separation. Hooks in `/hooks` for reusable logic. `/lib` for utilities. API routes in `app/api/` for contact form submission. This structure supports server components (layout.tsx, non-interactive content) and client components (page.tsx with parallax, ContactForm, Navigation).

## Complexity Tracking

*No constitution violations - no entries required*

This section is empty because all constitution gates pass without violations. No complexity justifications needed.

---

## Phase 0: Research & Technology Decisions

### Research Tasks

1. **NeumorphicNav Simplification Strategy**
   - **Question**: How to simplify NeumorphicNav from 5 positioning strategies to 1 robust approach?
   - **Research**: Investigate ResizeObserver-only approach vs. ref callback + useLayoutEffect

2. **Focus Trap Implementation**
   - **Question**: Best library or pattern for focus trap in mobile menu?
   - **Research**: Evaluate focus-trap-react vs. custom implementation

3. **Resend API Integration Pattern**
   - **Question**: Client-side API route or server action for form submission?
   - **Research**: Next.js 15 App Router best practices for API routes vs server actions

4. **Vercel Analytics Integration**
   - **Question**: How to integrate @vercel/analytics with Next.js 15 App Router?
   - **Research**: Review Vercel Analytics documentation for App Router

5. **Structured Data Best Practices**
   - **Question**: What LocalBusiness schema properties are required vs. recommended?
   - **Research**: Review schema.org LocalBusiness spec and Google Rich Results guidelines

6. **Form Validation Patterns**
   - **Question**: Real-time vs. on-submit validation for accessibility?
   - **Research**: WCAG best practices for accessible form validation

---

## Phase 1: Design Artifacts

*These will be generated after research is complete*

### Phase 1 Outputs:
- `data-model.md` - Entity definitions and relationships
- `contracts/contact-api.yaml` - OpenAPI spec for contact form API
- `quickstart.md` - Setup and development guide
- Agent context updated in `.claude/` (if using Claude)

---

**Note**: This plan will be completed through Phase 0 (research.md) and Phase 1 (design artifacts) as part of the `/speckit.plan` execution. Tasks.md will be generated separately via `/speckit.tasks`.
