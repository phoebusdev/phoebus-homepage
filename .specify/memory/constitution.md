<!--
Sync Impact Report:
- Version: 1.1.0 → 2.0.0
- Change Type: Major amendment (principle simplified)
- Modified Principles: IX - Animation Standards (removed philosophy, simplified to technical standards)
- Added Sections: N/A
- Removed Sections: "Near-Miss Parallax Choreography" philosophy language
- Templates Status:
  ✅ plan-template.md - Constitution Check section ready for use
  ✅ spec-template.md - Aligned with accessibility, design, and animation requirements
  ✅ tasks-template.md - Aligned with test-driven and incremental delivery approach
- Follow-up TODOs: None
-->

# Phoebus Digital Homepage Constitution

## Core Principles

### I. Design System Preservation (NON-NEGOTIABLE)

The neumorphic design system is the identity of Phoebus Digital and MUST be preserved in all rebuilds and refactors.

**Rules**:
- Neumorphic CSS classes (`.neumorphic-card`, `.plastic-tube-text`, `.neumorphic-text-3d`, etc.) MUST remain functionally identical
- All typography treatments (plastic-tube-text, matter-plastic-light, neumorphic-text-3d) MUST be preserved
- Cream color palette (`#f5f0e8`, `#f0ebe3`, shadow colors) MUST NOT be altered
- Shadow layering techniques and depth effects MUST remain intact
- Design system documentation (DESIGN_SYSTEM.md, globals.css) serves as source of truth

**Rationale**: The neumorphic "soft plastic realism" aesthetic is core IP and brand differentiation. Changes to design fundamentals require explicit stakeholder approval and cannot be made during technical refactors.

### II. Content Preservation

All existing content (text, messaging, service descriptions, process steps) MUST be preserved character-for-character unless explicitly requested otherwise.

**Rules**:
- Service card descriptions remain identical
- Hero messaging unchanged
- Process step explanations preserved
- "Why We're Different" content maintained
- Only structural/markup changes allowed, not content changes

**Rationale**: Content has been carefully crafted for messaging and SEO. Technical rebuilds must not introduce content drift.

### III. Clean Slate Reconstruction

Rebuilds MUST start from robust foundations, not incremental patches over existing errors.

**Rules**:
- Identify and eliminate root causes of errors, not symptoms
- Refactor component architecture for proper separation of concerns
- Establish clear data flow patterns (props, state, contexts)
- Remove code duplication through proper abstraction
- Document architectural decisions in code comments

**Rationale**: Error-free foundations prevent cascading issues. Patching symptoms leads to technical debt accumulation.

### IV. Accessibility First (NON-NEGOTIABLE)

All UI elements MUST meet WCAG 2.1 AA standards minimum.

**Rules**:
- Text contrast ratios MUST meet 4.5:1 minimum (body text) and 3:1 (large text)
- Interactive elements MUST have visible focus states
- Keyboard navigation MUST work for all interactive elements
- Screen reader support MUST be validated
- Reduced motion preferences MUST be respected
- Touch targets MUST be minimum 44x44px on mobile

**Test Gate**: Run accessibility audit (Lighthouse, axe DevTools) before any feature is considered complete. Score below 90 blocks merge.

**Rationale**: Accessibility is legal compliance, brand reputation, and inclusive design. Non-negotiable in modern web development.

### V. Type Safety & Error Prevention

TypeScript strict mode MUST be enforced, and runtime errors MUST be caught at compile time wherever possible.

**Rules**:
- `strict: true` in tsconfig.json is mandatory
- No `any` types except where absolutely necessary (document with comment justification)
- All component props MUST have explicit TypeScript interfaces
- Event handlers MUST have proper type signatures
- API responses MUST have defined type schemas
- Use discriminated unions for state management where appropriate

**Rationale**: TypeScript prevents entire classes of runtime errors. Strict enforcement saves debugging time and improves code maintainability.

### VI. Component Isolation & Modularity

Components MUST be self-contained, reusable, and follow single responsibility principle.

**Rules**:
- Each component in its own directory with `.tsx` and `.module.css` files
- Components receive data via props, not global state (unless context is justified)
- Side effects isolated to custom hooks or clearly marked effect zones
- Component dependencies must be explicit (no hidden global coupling)
- Shared utilities extracted to `/lib` or `/utils`, not duplicated

**Pattern**:
```
components/
  ComponentName/
    ComponentName.tsx      # Component logic
    ComponentName.module.css  # Component styles
    index.ts              # Clean exports
```

**Rationale**: Isolation enables testing, reuse, and parallel development. Reduces coupling and increases maintainability.

### VII. Performance by Default

All features MUST be optimized for mobile-first performance with 60fps animations and fast page loads.

**Rules**:
- Animations MUST use `transform` and `opacity` only (GPU-accelerated properties)
- Parallax effects MUST be disabled on mobile/tablet viewports
- Images MUST use Next.js Image component with proper sizing
- Code splitting via dynamic imports for heavy dependencies (react-scroll-parallax pattern)
- Hydration mismatches MUST be prevented (mounted state pattern when needed)
- Lighthouse performance score MUST be 90+ on mobile

**Test Gate**: Lighthouse mobile performance audit required before merge. Score below 90 requires optimization.

**Rationale**: Performance directly impacts user experience, SEO rankings, and conversion rates. Mobile users are primary audience.

### VIII. Incremental Validation

Each user story MUST be independently testable and demonstrable before moving to the next priority.

**Rules**:
- Features delivered in priority order (P1 → P2 → P3)
- Each story validated in isolation before proceeding
- Stop at checkpoints to validate story independently
- No story considered complete until manually tested in browser
- Regression testing required when adding new stories

**Rationale**: Incremental validation catches issues early and ensures each delivery adds value without breaking previous work.

### IX. Animation Standards

All animations MUST be performant, accessible, and enhance the neumorphic design without compromising usability.

**Technical Requirements**:
- Animations MUST use Intersection Observer API (NO scroll event listeners)
- Animations MUST use GPU-accelerated properties ONLY:
  - ✅ `transform: translate()`, `scale()`, `rotate()`, `perspective()`
  - ✅ `opacity` (initial state only)
  - ❌ NO `top`, `left`, `width`, `height`, `margin`, `padding`, `background-position`
- Animations MUST respect `prefers-reduced-motion` at both CSS and JavaScript levels
- Animations MUST maintain 60fps (verified in Chrome DevTools Performance tab)
- Animation system bundle impact MUST be < 10KB gzipped per page

**Animation Implementation**:
- **Scroll-triggered animations**: Use `useIntersectionAnimation` hook
  - Threshold: 0.1-0.3 depending on element size
  - Trigger once: `true` for entrance animations
  - Duration: 500-750ms depending on element type
  - Easing: `cubic-bezier(0.4, 0, 0.2, 1)` or `cubic-bezier(0.34, 1.56, 0.64, 1)`
- **Stagger delays**: 50-150ms between sequential elements
- **Desktop hover effects**: Use `useMagneticTilt` hook for card interactions
  - Small/medium cards: `maxTilt: 3°`, `scale: 1.01`, `perspective: 1200px`
  - Large/wide cards: `maxTilt: 2°`, `scale: 1.005`, `perspective: 1200px`
  - Transition: 100ms hover response, 500ms return to neutral

**Device-Specific Behavior**:
- **Desktop (≥ 1024px)**: Full animations + hover tilt
- **Tablet (768-1023px)**: Full animations + hover tilt
- **Mobile (< 768px)**: Simplified animations, NO hover tilt

**Accessibility Requirements** (NON-NEGOTIABLE):
- ALL animated elements MUST include reduced motion CSS:
  ```css
  @media (prefers-reduced-motion: reduce) {
    .animated-element {
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
      animation: none !important;
    }
  }
  ```
- Keyboard navigation MUST remain unaffected by animations
- Focus indicators MUST remain visible during animations
- Screen readers MUST NOT announce animation states
- Content MUST be accessible immediately (no animation-gated content)

**Performance Gates**:
- Lighthouse Performance: ≥ 90 (mobile), ≥ 95 (desktop)
- Cumulative Layout Shift (CLS): 0
- Frame rate: 60fps maintained during all animations
- JavaScript bundle increase: < 10KB gzipped per page

**Rationale**: Animations add polish and visual interest when implemented with performance and accessibility discipline. This principle ensures animations enhance rather than compromise the user experience.

## Quality Gates

Every feature implementation MUST pass these gates before completion:

### Gate 1: Type Safety
- [ ] TypeScript compiles with no errors (`npm run typecheck`)
- [ ] No `any` types without documented justification
- [ ] All component props have explicit interfaces

### Gate 2: Design System Compliance
- [ ] Neumorphic CSS classes used correctly
- [ ] No inline styles that override design system
- [ ] Responsive breakpoints respected (mobile/tablet/desktop)
- [ ] Typography treatments applied per design system guidelines

### Gate 3: Accessibility
- [ ] Lighthouse accessibility score ≥ 90
- [ ] Keyboard navigation tested and functional
- [ ] Focus states visible on all interactive elements
- [ ] Color contrast verified (4.5:1 minimum for body text)

### Gate 4: Performance
- [ ] Lighthouse performance score ≥ 90 (mobile)
- [ ] No layout shifts during page load
- [ ] Animations smooth at 60fps
- [ ] No console errors or warnings

### Gate 5: Browser Testing
- [ ] Manually tested in Chrome/Firefox/Safari
- [ ] Responsive behavior verified (320px → 1920px+ widths)
- [ ] Touch interactions tested on mobile device or simulator

## Development Workflow

### Feature Development Process

1. **Specification** (`/speckit.specify`) - Define requirements and user stories with priorities
2. **Clarification** (`/speckit.clarify`) - Identify underspecified areas before planning
3. **Planning** (`/speckit.plan`) - Create technical implementation plan with gates
4. **Tasks** (`/speckit.tasks`) - Generate dependency-ordered task list by user story
5. **Implementation** (`/speckit.implement`) - Execute tasks with incremental validation
6. **Analysis** (`/speckit.analyze`) - Cross-artifact consistency check post-implementation

### Commit Standards

- Commit after each completed task or logical group of tasks
- Use conventional commit format: `type(scope): description`
  - `feat`: New feature implementation
  - `fix`: Bug fix
  - `refactor`: Code restructuring without behavior change
  - `style`: Design system or CSS changes
  - `perf`: Performance optimization
  - `a11y`: Accessibility improvements
  - `docs`: Documentation updates

### Branch Strategy

- Feature branches created automatically by spec-kit: `001-feature-name`
- Work only on feature branches, never directly on `main`
- Each feature gets its own branch and specification directory

## Technology Constraints

### Mandatory Stack
- **Framework**: Next.js 15+ with App Router
- **React**: Version 19+
- **TypeScript**: 5.x with strict mode
- **Styling**: Tailwind CSS 3.x + Custom CSS (globals.css for design system)
- **Fonts**: Montserrat (primary), Chivo Mono (monospace), Material Symbols (icons)

### Allowed Libraries
- `react-scroll-parallax` for scroll effects (desktop only)
- Next.js built-in components (Image, Link, etc.)
- Any library that doesn't conflict with design system or performance goals

### Prohibited Patterns
- CSS-in-JS that overrides neumorphic design system
- Inline styles except for dynamic values (document why)
- Global state management libraries (Redux, Zustand) unless explicitly justified
- Animation libraries that use non-GPU-accelerated properties
- Any CSS framework that conflicts with Tailwind/design system

## Governance

### Constitution Authority

This constitution supersedes all other development practices and preferences. When in doubt, constitution principles take precedence.

### Amendment Process

1. Amendments require documented rationale
2. Version must increment per semantic versioning:
   - **MAJOR**: Breaking changes to principles or workflow
   - **MINOR**: New principles or expanded guidance
   - **PATCH**: Clarifications, typos, non-semantic refinements
3. All dependent templates must be reviewed for consistency
4. Constitution changes must be committed separately from feature work

### Compliance Review

- All pull requests MUST verify compliance with relevant principles
- Quality gates MUST be checked before marking tasks complete
- Complexity violations MUST be justified in Complexity Tracking section of plan.md
- Review checklist references constitution sections explicitly

### Runtime Guidance

- This constitution provides project-level governance
- CLAUDE.md provides operational guidance for AI assistants working in this codebase
- DESIGN_SYSTEM.md provides design implementation details
- All three documents must remain synchronized

**Version**: 2.0.0 | **Ratified**: 2025-10-09 | **Last Amended**: 2025-10-11
