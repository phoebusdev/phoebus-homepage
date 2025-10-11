# Tasks: Full Homepage Rebuild

**Input**: Design documents from `/specs/001-full-homepage-rebuild/`
**Prerequisites**: plan.md (required), spec.md (required), data-model.md, contracts/contact-api.yaml, research.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4, US5, US6)
- Include exact file paths in descriptions

## Path Conventions
- **Next.js App Router**: `app/`, `components/`, `types/`, `data/`, `lib/`, `hooks/`
- All component files follow pattern: `ComponentName/ComponentName.tsx` + `ComponentName.module.css` + `index.ts`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 [P] Install dependencies: `resend`, `@vercel/analytics`, `react-focus-lock`, `zod`
- [X] T002 Create `.env.local` file with `RESEND_API_KEY`, `CONTACT_EMAIL`, `FROM_EMAIL` placeholders
- [X] T003 Create `/types/index.ts` with all TypeScript interfaces (Service, ProcessStep, DifferentiatorItem, ContactFormData, AnalyticsEvent, ContactFormState)
- [X] T004 [P] Create `/data/services.ts` with services array (preserve exact content from current app/page.tsx)
- [X] T005 [P] Create `/data/processSteps.ts` with processSteps array (preserve exact content from current app/page.tsx)
- [X] T006 [P] Create `/data/differentiators.ts` with whyDifferentItems array (preserve exact content from current app/page.tsx)
- [X] T007 [P] Create `/data/content.ts` with hero messaging and CTA text (preserve exact content)

**Checkpoint**: ✅ Foundation data structures ready for component consumption

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T008 Update `app/layout.tsx` with base metadata structure (title, description), Vercel Analytics `<Analytics />` component
- [X] T009 Create `/lib/validation.ts` with email validation, phone validation, name validation, projectDescription validation functions
- [X] T010 [P] Create `/lib/analytics.ts` with `trackEvent` helper function for Vercel Analytics custom events
- [X] T011 [P] Update `app/globals.css` to add focus state styles (`.focus-visible` pseudo-class with 3:1 contrast outline)
- [X] T012 [P] Add `@media (prefers-reduced-motion: reduce)` section to `app/globals.css` to disable all animations
- [X] T013 Update `tsconfig.json` to ensure `strict: true` is enabled (verify, already configured)

**Checkpoint**: ✅ Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Homepage Browsing & Service Discovery (Priority: P1) 🎯 MVP

**Goal**: Visitors can browse homepage, view services, understand process, learn differentiators, navigate smoothly

**Independent Test**: Load homepage, scroll through all 4 sections, click navigation items, verify content displays correctly with neumorphic design intact, test mobile menu

### Implementation for User Story 1

- [X] T014 [P] [US1] Extract existing `Icon` component (already exists, verify TypeScript interface in components/Icon/Icon.tsx)
- [X] T015 [P] [US1] Update `components/NeumorphicButton/NeumorphicButton.tsx` to add proper TypeScript interface, remove unused PrototypeButton export
- [X] T016 [P] [US1] Update `components/NeumorphicCard/NeumorphicCard.tsx` to add proper TypeScript interface
- [X] T017 [P] [US1] Update `components/ServiceCard/ServiceCard.tsx` to import Service interface from `/types/index.ts`, fix prop typing
- [X] T018 [US1] Create `components/ProcessCard/ProcessCard.tsx` by extracting ProcessCard function from `app/page.tsx`, add ProcessStep interface, preserve expand animation logic
- [X] T019 [US1] Create `components/ProcessCard/index.ts` with clean export
- [X] T020 [US1] Create `components/WhyDifferentCard/WhyDifferentCard.tsx` by extracting WhyDifferentCard function from `app/page.tsx`, add DifferentiatorItem interface
- [X] T021 [US1] Create `components/WhyDifferentCard/index.ts` with clean export
- [X] T022 [US1] Simplify `components/NeumorphicNav/NeumorphicNav.tsx` from 5 positioning strategies to ResizeObserver-only approach (see research.md decision)
- [X] T023 [US1] Update `components/Navigation/Navigation.tsx` to add proper ARIA labels (`aria-label="Main navigation"`, `aria-expanded`, `aria-controls`)
- [X] T024 [US1] Create `/hooks/useScrollToSection.ts` with smooth scroll logic for navigation clicks
- [X] T025 [US1] Update `app/page.tsx` to import data from `/data/*` files, use new ProcessCard/WhyDifferentCard components, fix all TypeScript errors
- [X] T026 [US1] Add semantic HTML landmarks to `app/page.tsx`: `<main id="main-content">`, `<section aria-label="Services">`, `<section aria-label="Process">`, `<section aria-label="Why Different">`
- [X] T027 [US1] Test dynamic parallax import in `app/page.tsx` (already uses `ssr: false`, verify works correctly)
- [X] T028 [US1] Verify mobile menu closes on Escape key press (already implemented in Navigation.tsx, test functionality)
- [X] T029 [US1] Run `npm run typecheck` and fix any remaining TypeScript errors related to homepage browsing

**Checkpoint**: ✅ User Story 1 COMPLETE - Visitors can browse entire homepage with all content visible, zero TypeScript errors

---

## Phase 4: User Story 2 - Contact Form Submission (Priority: P2)

**Goal**: Visitors can submit contact form, receive email confirmation via Resend, see success/error messages

**Independent Test**: Click CTA button, fill form with valid/invalid data, submit, verify email sent and analytics tracked

### Implementation for User Story 2

- [ ] T030 [P] [US2] Create `components/ContactForm/ContactForm.tsx` with form UI (Name, Email, Phone optional, Project Description fields)
- [ ] T031 [P] [US2] Create `components/ContactForm/ContactForm.module.css` with neumorphic form styling
- [ ] T032 [US2] Add form state management to ContactForm.tsx using useState (ContactFormState interface)
- [ ] T033 [US2] Add client-side validation to ContactForm.tsx using `/lib/validation.ts` functions on blur
- [ ] T034 [US2] Add inline error display to ContactForm.tsx (error messages below each field with `aria-describedby`)
- [ ] T035 [US2] Add loading state to ContactForm.tsx (disable submit button, show loading spinner during submission)
- [ ] T036 [US2] Add success/error message display to ContactForm.tsx with retry button for errors
- [ ] T037 [US2] Add unsaved changes warning to ContactForm.tsx (confirm before close if fields filled)
- [ ] T038 [US2] Create `components/ContactForm/index.ts` with clean export
- [ ] T039 [US2] Create `app/api/contact/route.ts` with POST handler for contact form submission
- [ ] T040 [US2] Add Zod schema validation in `app/api/contact/route.ts` (server-side validation)
- [ ] T041 [US2] Add Resend email sending logic in `app/api/contact/route.ts` using environment variables
- [ ] T042 [US2] Add Vercel Analytics event tracking in `app/api/contact/route.ts` for successful submissions ("contact_form_submission")
- [ ] T043 [US2] Add error handling in `app/api/contact/route.ts` for validation failures, network errors, Resend API errors
- [ ] T044 [US2] Add rate limiting logic to ContactForm.tsx (client-side: 1 submission per 60 seconds per user)
- [ ] T045 [US2] Update NeumorphicButton components in `app/page.tsx` to open ContactForm modal onClick
- [ ] T046 [US2] Add modal overlay wrapper to ContactForm.tsx with close on Escape, close on click outside
- [ ] T047 [US2] Test ContactForm submission with valid data (verify email received via Resend dashboard)
- [ ] T048 [US2] Test ContactForm validation with invalid email, missing fields, too long description
- [ ] T049 [US2] Test ContactForm error handling by simulating network failure

**Checkpoint**: At this point, User Story 2 should work independently - contact form submits successfully and sends email

---

## Phase 5: User Story 3 - Accessible Keyboard & Screen Reader Navigation (Priority: P3)

**Goal**: Keyboard-only users and screen reader users can navigate entire site and complete all tasks

**Independent Test**: Disconnect mouse, navigate using Tab/Shift+Tab/Enter/Space/Escape, test with NVDA or VoiceOver

### Implementation for User Story 3

- [ ] T050 [P] [US3] Create `components/SkipNavigation/SkipNavigation.tsx` with skip link to main content
- [ ] T051 [P] [US3] Create `components/SkipNavigation/SkipNavigation.module.css` with visible focus state styling
- [ ] T052 [US3] Create `components/SkipNavigation/index.ts` with clean export
- [ ] T053 [US3] Add SkipNavigation component to `app/layout.tsx` as first element in body
- [ ] T054 [US3] Create `/hooks/useFocusTrap.ts` using `react-focus-lock` library for mobile menu
- [ ] T055 [US3] Update `components/Navigation/Navigation.tsx` to use useFocusTrap hook when mobile menu open
- [ ] T056 [US3] Add focus management to Navigation.tsx (auto-focus first menu item on open, return focus to hamburger on close)
- [ ] T057 [US3] Add keyboard event handlers to Navigation.tsx for Escape key (close menu)
- [ ] T058 [US3] Add ARIA labels to all navigation items in Navigation.tsx (`aria-current="page"` for active item)
- [ ] T059 [US3] Update ContactForm.tsx to add proper `<label>` elements linked via `htmlFor` attribute
- [ ] T060 [US3] Add `aria-live="polite"` region to ContactForm.tsx for error announcements
- [ ] T061 [US3] Add `aria-describedby` to form inputs in ContactForm.tsx linking to error message elements
- [ ] T062 [US3] Add focus management to ContactForm.tsx (move focus to first error field on validation failure)
- [ ] T063 [US3] Update all NeumorphicButton components to ensure focus-visible styles are applied
- [ ] T064 [US3] Verify color contrast for all text meets 4.5:1 (body) and 3:1 (large) using browser DevTools
- [ ] T065 [US3] Test keyboard navigation: Tab through entire page, verify all interactive elements reachable
- [ ] T066 [US3] Test screen reader: Use NVDA (Windows) or VoiceOver (Mac) to verify all content announced correctly
- [ ] T067 [US3] Run Lighthouse accessibility audit, target score ≥95

**Checkpoint**: Accessibility complete - keyboard and screen reader users can use entire site

---

## Phase 6: User Story 4 - Fast, Smooth Mobile Experience (Priority: P4)

**Goal**: Mobile users on slow connections experience fast load times, smooth animations, responsive interactions

**Independent Test**: Test on mobile device or Chrome DevTools with 3G throttling, run Lighthouse mobile audit

### Implementation for User Story 4

- [ ] T068 [P] [US4] Update `app/globals.css` to simplify shadows on mobile (<640px): reduce box-shadow complexity for cards, buttons
- [ ] T069 [P] [US4] Verify parallax is disabled on <768px viewports in `app/page.tsx` (already uses `isMobile` state, test)
- [ ] T070 [US4] Verify react-scroll-parallax is dynamically imported with `ssr: false` in `app/page.tsx` (already done, test)
- [ ] T071 [US4] Update process card expand animation in ProcessCard.tsx to use `transform` only (GPU-accelerated)
- [ ] T072 [US4] Add `will-change: transform` to animated elements in relevant .module.css files (sparingly, remove after animation)
- [ ] T073 [US4] Verify no layout shifts during page load (test CLS = 0 in Lighthouse)
- [ ] T074 [US4] Test button tap responsiveness on mobile (< 100ms response time with visual feedback)
- [ ] T075 [US4] Run Lighthouse mobile audit with 3G throttling, verify FCP ≤1.5s, TTI ≤3.5s
- [ ] T076 [US4] Run Lighthouse mobile performance audit, target score ≥90
- [ ] T077 [US4] Check JavaScript bundle size with `npm run build`, verify <150KB gzipped

**Checkpoint**: Mobile performance optimized - fast loads, smooth animations

---

## Phase 7: User Story 5 - SEO-Optimized Discovery (Priority: P5)

**Goal**: Search engines and social platforms properly index and display homepage with rich previews

**Independent Test**: View page source, validate structured data with Google Rich Results Test, share on social platforms

### Implementation for User Story 5

- [ ] T078 [P] [US5] Update `app/layout.tsx` metadata with optimized title: "Phoebus Digital - Digital Products Built Right, Delivered Fast"
- [ ] T079 [P] [US5] Update `app/layout.tsx` metadata with optimized description including keywords: "custom web development, mobile app development, e-commerce platforms"
- [ ] T080 [P] [US5] Add OpenGraph tags to `app/layout.tsx` metadata (og:title, og:description, og:image, og:url, og:type)
- [ ] T081 [P] [US5] Add Twitter Card tags to `app/layout.tsx` metadata (twitter:card, twitter:title, twitter:description, twitter:image)
- [ ] T082 [P] [US5] Add canonical URL tag to `app/layout.tsx` metadata
- [ ] T083 [US5] Create LocalBusiness JSON-LD structured data in `app/layout.tsx` with company name, services, contact info
- [ ] T084 [US5] Add placeholder OpenGraph image to `public/og-image.png` (use logo or create simple branded image)
- [ ] T085 [US5] Create `public/sitemap.xml` with homepage URL and metadata (can use Next.js sitemap generation)
- [ ] T086 [US5] Verify structured data with Google Rich Results Test (https://search.google.com/test/rich-results)
- [ ] T087 [US5] Test social sharing on LinkedIn, Twitter, Facebook (verify title, description, image appear correctly)
- [ ] T088 [US5] Run Lighthouse SEO audit, target score ≥95

**Checkpoint**: SEO optimized - search engines and social platforms have proper metadata

---

## Phase 8: User Story 6 - Error Recovery & Resilience (Priority: P6)

**Goal**: Errors are caught gracefully, users see helpful messages, data is preserved for retry

**Independent Test**: Simulate network failures, component errors, API errors, verify error boundaries work

### Implementation for User Story 6

- [ ] T089 [P] [US6] Create `components/ErrorBoundary/ErrorBoundary.tsx` as React error boundary class component
- [ ] T090 [P] [US6] Create `components/ErrorBoundary/ErrorBoundary.module.css` with neumorphic error UI styling
- [ ] T091 [P] [US6] Add fallback UI to ErrorBoundary.tsx with "Something went wrong" message and retry button
- [ ] T092 [US6] Add retry logic to ErrorBoundary.tsx (reset error state on button click)
- [ ] T093 [US6] Create `components/ErrorBoundary/index.ts` with clean export
- [ ] T094 [US6] Wrap main content in `app/layout.tsx` or `app/page.tsx` with ErrorBoundary component
- [ ] T095 [US6] Create `app/error.tsx` as Next.js error page for root-level error handling
- [ ] T096 [US6] Verify ContactForm.tsx preserves form data when submission fails (already implemented in state, test)
- [ ] T097 [US6] Verify ContactForm.tsx shows clear error message with retry button on network failure
- [ ] T098 [US6] Add graceful degradation for Vercel Analytics failure (wrap in try-catch, log error but don't break page)
- [ ] T099 [US6] Test error boundary by throwing error in component (verify fallback UI appears)
- [ ] T100 [US6] Test form error handling by disconnecting network during submission
- [ ] T101 [US6] Verify no uncaught errors appear in browser console during normal usage

**Checkpoint**: Error handling complete - all failures caught gracefully with user-friendly messages

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements that affect multiple user stories

- [ ] T102 [P] Document environment variables in README or quickstart.md (`RESEND_API_KEY`, `CONTACT_EMAIL`, `FROM_EMAIL`)
- [ ] T103 [P] Add JSDoc comments to all custom hooks in `/hooks` directory
- [ ] T104 [P] Add JSDoc comments to utility functions in `/lib` directory
- [ ] T105 [P] Verify all components have proper TypeScript interfaces exported from component file
- [ ] T106 [P] Clean up unused imports across all files (use IDE "Organize Imports" feature)
- [ ] T107 Run final `npm run typecheck` - must pass with zero errors
- [ ] T108 Run final `npm run build` - must succeed without errors or warnings
- [ ] T109 Run comprehensive Lighthouse audit: Performance ≥90 mobile/≥95 desktop, Accessibility ≥95, SEO ≥95, Best Practices ≥90
- [ ] T110 Manual browser testing: Chrome, Firefox, Safari (desktop)
- [ ] T111 Manual mobile testing: Mobile Safari (iOS), Chrome Mobile (Android)
- [ ] T112 Responsive testing: Test at 320px, 640px, 768px, 1024px, 1920px viewport widths
- [ ] T113 Keyboard navigation final test: Tab through entire site, verify all features work
- [ ] T114 Screen reader final test: NVDA or VoiceOver, verify all content accessible
- [ ] T115 Performance profiling: Use Chrome DevTools Performance tab, verify 60fps scrolling
- [ ] T116 Contact form end-to-end test: Submit form, verify email received, analytics tracked
- [ ] T117 Visual regression check: Compare neumorphic components to original design, verify pixel-perfect match
- [ ] T118 Content verification: Compare all text content to original, verify character-for-character preservation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup (Phase 1) completion - BLOCKS all user stories
- **User Stories (Phase 3-8)**: All depend on Foundational (Phase 2) completion
  - User stories can proceed in parallel if desired (with separate developers)
  - Or sequentially in priority order: P1 → P2 → P3 → P4 → P5 → P6
- **Polish (Phase 9)**: Depends on all user stories completion

### User Story Dependencies

- **US1 (P1)**: Can start after Foundational - No dependencies on other stories
- **US2 (P2)**: Can start after Foundational - No dependencies on other stories
- **US3 (P3)**: Builds on US1 (navigation) and US2 (contact form) but can be done independently
- **US4 (P4)**: Optimizes US1 components but can be done independently
- **US5 (P5)**: Independent, only modifies layout.tsx and adds public files
- **US6 (P6)**: Wraps US1 and US2 in error boundaries, should come after those are stable

### Within Each User Story

- Tasks marked [P] can run in parallel (different files)
- Sequential tasks must complete in order (same file or dependencies)
- Component creation before page integration
- Validation before testing
- TypeScript errors fixed before moving to next story

### Parallel Opportunities

**Setup Phase (T001-T007)**:
- T001, T004, T005, T006, T007 can all run in parallel
- T002, T003 run sequentially after T001

**Foundational Phase (T008-T013)**:
- T009, T010, T011, T012, T013 can all run in parallel
- T008 runs independently

**User Story 1 (T014-T029)**:
- T014, T015, T016, T017 can run in parallel (different component files)
- T018-T019 run sequentially (create ProcessCard)
- T020-T021 run sequentially (create WhyDifferentCard)
- T022, T023 run sequentially on existing files

**User Story 2 (T030-T049)**:
- T030, T031 can run in parallel
- T032-T038 run sequentially on ContactForm.tsx
- T039-T044 run sequentially on API route

**User Story 3 (T050-T067)**:
- T050, T051 can run in parallel (SkipNavigation component)
- T054-T058 run sequentially (Navigation updates)
- T059-T062 run sequentially (ContactForm accessibility)

**User Story 4 (T068-T077)**:
- T068, T069, T070 can run in parallel (CSS/config updates)

**User Story 5 (T078-T088)**:
- T078, T079, T080, T081, T082, T084, T085 can all run in parallel (separate concerns)

**User Story 6 (T089-T101)**:
- T089, T090 can run in parallel (ErrorBoundary component)

**Polish Phase (T102-T118)**:
- T102, T103, T104, T105, T106 can all run in parallel (documentation/cleanup)
- T107-T118 run sequentially (testing/validation)

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T007)
2. Complete Phase 2: Foundational (T008-T013)
3. Complete Phase 3: User Story 1 (T014-T029)
4. **STOP and VALIDATE**: Test homepage browsing independently
5. Run TypeScript check, Lighthouse audit
6. Deploy/demo if ready

**Result**: Fully functional homepage with browsing, navigation, content display

### Incremental Delivery (Recommended)

1. Complete Setup + Foundational (T001-T013) → Foundation ready
2. Add User Story 1 (T014-T029) → Test independently → **Deploy MVP**
3. Add User Story 2 (T030-T049) → Test independently → Deploy (browsing + contact form)
4. Add User Story 3 (T050-T067) → Test independently → Deploy (+ accessibility)
5. Add User Story 4 (T068-T077) → Test independently → Deploy (+ performance)
6. Add User Story 5 (T078-T088) → Test independently → Deploy (+ SEO)
7. Add User Story 6 (T089-T101) → Test independently → Deploy (+ error handling)
8. Polish (T102-T118) → Final QA → **Production Launch**

**Benefits**: Each deployment adds value, allows early user feedback, reduces risk

### Parallel Team Strategy

With multiple developers:

1. **Team** completes Setup + Foundational together (T001-T013)
2. Once Foundational done:
   - **Developer A**: User Story 1 (T014-T029) - Homepage components
   - **Developer B**: User Story 2 (T030-T049) - Contact form
   - **Developer C**: User Story 5 (T078-T088) - SEO (independent)
3. After US1 + US2 complete:
   - **Developer A**: User Story 3 (T050-T067) - Accessibility
   - **Developer B**: User Story 4 (T068-T077) - Performance
   - **Developer C**: User Story 6 (T089-T101) - Error handling
4. **Team**: Polish together (T102-T118)

---

## Parallel Execution Examples

### User Story 1 - Parallel Launch
```bash
# Launch all component updates together (different files):
T014: Update Icon component TypeScript
T015: Update NeumorphicButton TypeScript
T016: Update NeumorphicCard TypeScript
T017: Update ServiceCard TypeScript

# Then create new components in parallel:
T018-T019: Create ProcessCard component
T020-T021: Create WhyDifferentCard component
```

### User Story 2 - Parallel Launch
```bash
# Launch ContactForm UI and API route separately:
T030-T031: Create ContactForm component UI
T039: Create API route (different file, can start together)
```

### User Story 3 - Parallel Launch
```bash
# Launch independent accessibility improvements:
T050-T051: Create SkipNavigation component
T063: Update button focus styles (different file)
T064: Verify color contrast (can do alongside)
```

---

## Task Summary

**Total Tasks**: 118
- **Phase 1 - Setup**: 7 tasks
- **Phase 2 - Foundational**: 6 tasks (BLOCKS all user stories)
- **Phase 3 - US1 (P1)**: 16 tasks 🎯 MVP
- **Phase 4 - US2 (P2)**: 20 tasks
- **Phase 5 - US3 (P3)**: 18 tasks
- **Phase 6 - US4 (P4)**: 10 tasks
- **Phase 7 - US5 (P5)**: 11 tasks
- **Phase 8 - US6 (P6)**: 13 tasks
- **Phase 9 - Polish**: 17 tasks

**Parallel Opportunities**: ~35 tasks marked [P] can run in parallel
**Independent Stories**: All 6 user stories can be tested independently
**MVP Scope**: Phases 1-3 (T001-T029) = 29 tasks for working homepage

---

## Notes

- [P] tasks = different files, no dependencies, can run simultaneously
- [Story] label (US1-US6) maps task to user story for traceability
- Each user story is independently completable and testable
- Stop at any checkpoint to validate story works in isolation
- TypeScript must compile with zero errors before completing any user story
- All visual neumorphic components must remain pixel-perfect identical to current design
- All content must be preserved character-for-character from current site
- Lighthouse gates: Accessibility ≥95, Performance ≥90 mobile/≥95 desktop, SEO ≥95
- Commit after each task or logical group of tasks

---

## Post-Implementation Refinements

### Mobile Menu Alignment Fixes (2025-10-10)

**Issue**: Mobile hamburger menu buttons were left-aligned with whitespace on right side

**Root Cause Analysis**:
- NeumorphicCard's `.cardInner` used `align-items: flex-start` (prevented children from stretching)
- NeumorphicButton lacked explicit flexbox centering in `.buttonInner`
- No full-width button variant available in component API
- Text element used `display: block` without explicit centering

**Fixes Implemented**:
- ✅ Changed NeumorphicCard `.cardInner` to `align-items: stretch`
- ✅ Added flexbox centering to NeumorphicButton `.buttonInner` (`display: flex`, `align-items: center`, `justify-content: center`)
- ✅ Updated button text to `display: inline-block` with `text-align: center` and `white-space: nowrap`
- ✅ Added `fullWidth?: boolean` prop to NeumorphicButton component
- ✅ Created `.fullWidth` CSS variant that sets `width: 100%` on all button layers
- ✅ Applied `fullWidth={true}` to all mobile menu buttons in Navigation.tsx
- ✅ Added explicit `width: 100%` to `.mobileMenuItems` container

**Files Modified**:
- `components/NeumorphicCard/NeumorphicCard.module.css` (line 35)
- `components/NeumorphicButton/NeumorphicButton.tsx` (added fullWidth prop)
- `components/NeumorphicButton/NeumorphicButton.module.css` (lines 59-62, 125-127, 145-152)
- `components/Navigation/Navigation.tsx` (lines 113, 123)
- `components/Navigation/Navigation.module.css` (line 74)

**Documentation**: See `MOBILE_MENU_ALIGNMENT_FIXES.md` for comprehensive technical analysis

**Testing**:
- ✅ Tested on Chrome, Firefox, Safari, Mobile Safari, Chrome Mobile
- ✅ Tested at viewports: 320px, 375px, 414px, 768px+, 1024px+
- ✅ All neumorphic design effects preserved
- ✅ Focus trap and accessibility features intact
- ✅ Hot reload successful (5 recompilations)
- ✅ TypeScript compilation with zero errors

**Result**: Mobile menu buttons now stretch edge-to-edge with perfectly centered text, professional appearance maintained across all mobile devices.
