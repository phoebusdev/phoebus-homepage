# Feature Specification: Full Homepage Rebuild

**Feature Branch**: `001-full-homepage-rebuild`
**Created**: 2025-10-09
**Status**: Draft
**Input**: User description: "Full homepage rebuild: Preserve neumorphic design system and all content while rebuilding on clean foundations. Fix all TypeScript errors, implement WCAG 2.1 AA accessibility, optimize performance for mobile-first (90+ Lighthouse score), add contact form with Resend integration, implement Vercel Analytics, add SEO enhancements (structured data, OpenGraph tags), create error boundaries, and establish production-ready architecture. Must maintain all visual neumorphic components (cards, buttons, text effects), preserve exact content, and follow clean slate reconstruction principles from constitution."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Homepage Browsing & Service Discovery (Priority: P1)

A potential client visits the Phoebus Digital homepage to learn about development services offered. They scroll through the homepage to view service offerings (web applications, mobile apps, e-commerce), understand the development process (4-step process), and learn what differentiates the company. They may navigate between sections using the navigation menu or by scrolling.

**Why this priority**: This is the core value proposition delivery. Without this working perfectly, the site has no purpose. Every visitor needs to browse and understand services.

**Independent Test**: Can be fully tested by loading the homepage, scrolling through all sections, clicking navigation items, and verifying all content displays correctly with visual design intact. Delivers immediate value by showcasing services.

**Acceptance Scenarios**:

1. **Given** a visitor lands on the homepage, **When** they view the hero section, **Then** they see the headline "Digital Products Built Right, Delivered Fast" with neumorphic text styling and two call-to-action buttons
2. **Given** a visitor scrolls to services section, **When** they view service cards, **Then** they see 3 service cards (Full-Stack Web Apps, Mobile Apps, E-commerce) with neumorphic card styling, icons, descriptions, and feature lists
3. **Given** a visitor scrolls to process section, **When** they view process steps, **Then** they see 4 expandable process cards describing Discovery, Free Prototype, Build Phase, and Deploy & Transfer
4. **Given** a visitor scrolls to "Why We're Different" section, **When** they view differentiators, **Then** they see 4 cards explaining No Vendor Lock-In, Fixed Price/Timeline, Built for Growth, and Radical Honesty
5. **Given** a visitor clicks navigation menu items, **When** they select a section, **Then** the page smoothly scrolls to that section and highlights the active menu item
6. **Given** a visitor is on mobile, **When** they tap the hamburger menu, **Then** a mobile menu overlay appears with navigation options
7. **Given** the mobile menu is open, **When** the visitor taps outside the menu or presses Escape key, **Then** the menu closes and focus returns appropriately

---

### User Story 2 - Contact Form Submission (Priority: P2)

A potential client wants to get in touch after viewing services. They click a "Get Your Free Prototype" or "Contact Us" button, fill out a contact form with their name, email, project description, and submit it. They receive immediate feedback on submission success or validation errors.

**Why this priority**: Lead generation is the primary business goal. Without a working contact form, there's no way to convert visitors into clients.

**Independent Test**: Can be tested by clicking CTA buttons, filling out the contact form with valid/invalid data, submitting, and verifying success/error messages appear and email is sent via Resend integration.

**Acceptance Scenarios**:

1. **Given** a visitor clicks "Get Your Free Prototype" button, **When** the button is clicked, **Then** a contact form modal or page appears with fields for Name, Email, Phone (optional), Project Description
2. **Given** a visitor fills out the contact form, **When** they enter invalid email format, **Then** real-time validation shows an error message below the email field
3. **Given** a visitor fills out required fields correctly, **When** they submit the form, **Then** the form shows a loading state and prevents duplicate submissions
4. **Given** form submission is processing, **When** the email is successfully sent, **Then** a success message appears confirming "Thank you! We'll respond within 24 hours" and the form resets
5. **Given** form submission fails due to network error, **When** the error occurs, **Then** an error message appears with a retry button
6. **Given** a visitor submits the form, **When** submission succeeds, **Then** Vercel Analytics tracks a "contact_form_submission" event
7. **Given** a visitor closes the form modal, **When** they press Escape or click outside, **Then** the modal closes and any unsaved form data shows a confirmation prompt if fields were filled

---

### User Story 3 - Accessible Keyboard & Screen Reader Navigation (Priority: P3)

A visitor using keyboard-only navigation or assistive technology (screen reader) navigates the entire homepage. They tab through all interactive elements, activate buttons/links with Enter/Space, navigate the mobile menu, and complete the contact form entirely via keyboard.

**Why this priority**: WCAG 2.1 AA compliance is non-negotiable (legal requirement, brand reputation). Accessibility must work before launch.

**Independent Test**: Can be tested by disconnecting mouse, navigating entire site using only Tab/Shift+Tab/Enter/Space/Escape keys, testing with NVDA or VoiceOver screen reader, and verifying all functionality works and focus indicators are visible.

**Acceptance Scenarios**:

1. **Given** a keyboard user lands on the homepage, **When** they press Tab, **Then** focus moves to the skip navigation link with a visible focus indicator
2. **Given** a keyboard user activates skip navigation, **When** they press Enter, **Then** focus jumps to main content, skipping the navigation menu
3. **Given** a keyboard user tabs through navigation, **When** focus moves to each nav item, **Then** a visible focus ring appears with sufficient contrast (3:1 minimum)
4. **Given** a keyboard user activates a navigation item, **When** they press Enter, **Then** the page scrolls smoothly to that section
5. **Given** a keyboard user opens the mobile menu, **When** the menu opens, **Then** focus automatically moves to the first menu item and focus is trapped within the modal
6. **Given** a keyboard user is in the mobile menu, **When** they press Escape, **Then** the menu closes and focus returns to the hamburger button
7. **Given** a screen reader user navigates sections, **When** they move between sections, **Then** ARIA landmarks (navigation, main, sections with aria-label) are announced correctly
8. **Given** a keyboard user fills out the contact form, **When** they tab through fields, **Then** each field has a visible focus indicator and associated label is read by screen readers
9. **Given** a keyboard user submits the form, **When** validation errors occur, **Then** focus moves to the first error field and error messages are announced by screen readers

---

### User Story 4 - Fast, Smooth Mobile Experience (Priority: P4)

A mobile visitor on a slower connection (3G) or older device accesses the homepage. The page loads quickly (under 3 seconds to interactive), animations are smooth at 60fps, parallax effects are disabled on mobile for performance, and all interactions feel responsive.

**Why this priority**: Mobile-first performance is critical for SEO and user experience. Poor performance loses leads and rankings.

**Independent Test**: Can be tested by loading the site on a mobile device or Chrome DevTools mobile emulation with 3G throttling, checking Lighthouse mobile performance score (target 90+), verifying animations are smooth, and ensuring no layout shifts occur.

**Acceptance Scenarios**:

1. **Given** a mobile visitor loads the homepage on 3G, **When** the page loads, **Then** First Contentful Paint occurs within 1.5 seconds
2. **Given** a mobile visitor loads the homepage, **When** the page becomes interactive, **Then** Time to Interactive is under 3.5 seconds
3. **Given** a mobile visitor scrolls the page, **When** animations trigger, **Then** scrolling remains smooth at 60fps with no jank
4. **Given** a mobile visitor views the page, **When** content loads, **Then** no layout shifts occur (Cumulative Layout Shift = 0)
5. **Given** a mobile visitor interacts with buttons, **When** they tap, **Then** button responds within 100ms with visual feedback
6. **Given** a mobile visitor on viewport < 768px, **When** they scroll, **Then** parallax effects are disabled and only smooth scroll occurs
7. **Given** a mobile visitor loads the page, **When** measuring JavaScript bundle size, **Then** total bundle is under 150KB gzipped

---

### User Story 5 - SEO-Optimized Discovery (Priority: P5)

A potential client searches "custom web development services" on Google. The Phoebus Digital homepage appears in search results with proper title, description, and rich snippets. When they share the homepage link on social media (LinkedIn, Twitter), the link preview shows proper title, description, and image.

**Why this priority**: SEO drives organic traffic. Without proper metadata and structured data, the site won't rank or share well.

**Independent Test**: Can be tested by viewing page source and verifying meta tags, validating structured data with Google Rich Results Test, sharing URL on social platforms, and running Lighthouse SEO audit (target 95+).

**Acceptance Scenarios**:

1. **Given** a search engine crawls the homepage, **When** parsing metadata, **Then** it finds title "Phoebus Digital - Digital Products Built Right, Delivered Fast", description, and canonical URL
2. **Given** a search engine parses the page, **When** extracting structured data, **Then** it finds valid LocalBusiness JSON-LD schema with name, address, services, and contact info
3. **Given** a user shares the homepage on LinkedIn, **When** the platform fetches preview, **Then** OpenGraph tags provide title, description, and featured image
4. **Given** a user shares the homepage on Twitter, **When** the platform fetches preview, **Then** Twitter Card tags provide summary with title, description, and image
5. **Given** Google indexes the homepage, **When** evaluating SEO factors, **Then** Lighthouse SEO score is 95 or higher
6. **Given** a search engine requests sitemap.xml, **When** fetching, **Then** a valid XML sitemap is served listing all pages
7. **Given** search engines crawl the site, **When** analyzing performance, **Then** Core Web Vitals (LCP, FID, CLS) are in "Good" range

---

### User Story 6 - Error Recovery & Resilience (Priority: P6)

A visitor encounters an unexpected error (network failure, component crash, form submission error). The error is caught gracefully, the visitor sees a helpful error message, and they can retry or navigate elsewhere without losing data.

**Why this priority**: Errors happen. Professional error handling differentiates quality development and prevents user frustration.

**Independent Test**: Can be tested by simulating network failures, component errors, and API failures, then verifying error boundaries catch errors, messages are user-friendly, and retry mechanisms work.

**Acceptance Scenarios**:

1. **Given** a component crashes due to runtime error, **When** the error occurs, **Then** an error boundary catches it and displays fallback UI with "Something went wrong" message and retry button
2. **Given** the contact form submission fails, **When** network error occurs, **Then** form shows error message "Failed to send. Please check your connection and try again" with retry button
3. **Given** a visitor's network disconnects while browsing, **When** they try to submit the form, **Then** they see "No connection detected. Please check your network" message
4. **Given** Vercel Analytics fails to load, **When** the script doesn't load, **Then** the page continues to function normally without analytics
5. **Given** a visitor encounters an error, **When** viewing the error message, **Then** any form data they entered is preserved and can be resubmitted
6. **Given** an error boundary is triggered, **When** the visitor clicks retry, **Then** the component re-mounts and attempts to recover

---

### Edge Cases

- What happens when a visitor has JavaScript disabled? (Site should show basic content and form should degrade gracefully with standard HTML form submission)
- How does the site handle extremely long project descriptions in the contact form? (Textarea should have character limit of 2000 with counter, server-side validation enforces limit)
- What happens when email service (Resend) is down during form submission? (Error message appears with alternative contact method: "Service temporarily unavailable. Email us directly at contact@phoebusdigital.com")
- How does the navigation handle section anchors when JavaScript is disabled? (Standard HTML anchor links should work as fallback)
- What happens when a visitor uses an extremely small viewport (< 320px)? (Design should remain functional down to 320px width minimum)
- How does the mobile menu handle rapid open/close interactions? (Debounce toggle to prevent animation glitches, ensure focus management is robust)
- What happens when Vercel Analytics tracking fails or is blocked by ad blockers? (Site continues to function normally, no errors logged to console)
- How does the site handle visitors with reduced motion preferences? (All animations respect prefers-reduced-motion media query, parallax and transitions are disabled)

## Requirements *(mandatory)*

### Functional Requirements

**Design System Preservation**:
- **FR-001**: All neumorphic CSS classes (`.neumorphic-card`, `.plastic-tube-text`, `.neumorphic-text-3d`, `.matter-plastic-light`, `.hero-neumorphic-card`, `.neumorphic-button`, `.icon-neumorphic`) MUST remain functionally identical with no visual changes
- **FR-002**: Cream color palette (`#f5f0e8`, `#f0ebe3`, `#d4cfc7`, `#ffffff` for shadows) MUST NOT be altered
- **FR-003**: All typography treatments (Montserrat font family, plastic-tube-text metallic effect, neumorphic-text-3d raised effect) MUST be preserved exactly
- **FR-004**: Shadow layering techniques and depth effects (box-shadow combinations for cards, buttons, text-shadow for typography) MUST remain visually identical
- **FR-005**: All existing content (hero messaging, service descriptions, process steps, "Why We're Different" items) MUST be preserved character-for-character

**Type Safety & Code Quality**:
- **FR-006**: System MUST compile TypeScript with zero errors using strict mode (`strict: true`)
- **FR-007**: All component props MUST have explicit TypeScript interfaces defined
- **FR-008**: No `any` types MUST be present except where absolutely necessary with documented justification
- **FR-009**: All data structures (services array, processSteps array, whyDifferentItems array) MUST have defined TypeScript interfaces
- **FR-010**: Event handlers MUST have proper type signatures (React.MouseEvent, React.KeyboardEvent, etc.)

**Accessibility (WCAG 2.1 AA)**:
- **FR-011**: All interactive elements (buttons, links, form inputs) MUST have visible focus indicators with minimum 3:1 contrast ratio
- **FR-012**: Skip navigation link MUST be provided to jump to main content
- **FR-013**: Mobile menu MUST implement focus trap when open (focus cannot escape modal)
- **FR-014**: Focus MUST be managed when opening/closing mobile menu (auto-focus first item on open, return to trigger on close)
- **FR-015**: All navigation and interactive elements MUST have ARIA labels where needed (`aria-label`, `aria-expanded`, `aria-controls`, `aria-describedby`)
- **FR-016**: Semantic HTML landmarks MUST be used (`<nav>`, `<main>`, `<section>` with `aria-label`)
- **FR-017**: All form inputs MUST have associated `<label>` elements properly linked via `for` attribute
- **FR-018**: Color contrast MUST meet 4.5:1 minimum for body text and 3:1 for large text
- **FR-019**: Keyboard navigation MUST work for all interactive functionality (Tab, Shift+Tab, Enter, Space, Escape)
- **FR-020**: Reduced motion preferences MUST be respected (all animations disabled when `prefers-reduced-motion: reduce` is set)

**Performance**:
- **FR-021**: Homepage MUST achieve Lighthouse performance score of 90+ on mobile and 95+ on desktop
- **FR-022**: First Contentful Paint (FCP) MUST occur within 1.5 seconds on mobile 3G
- **FR-023**: Time to Interactive (TTI) MUST be under 3.5 seconds on mobile 3G
- **FR-024**: Cumulative Layout Shift (CLS) MUST be 0 (no layout shifts during page load)
- **FR-025**: All animations MUST use only GPU-accelerated CSS properties (`transform`, `opacity`) for 60fps performance
- **FR-026**: Parallax effects MUST be disabled on viewports < 768px for mobile performance
- **FR-027**: Heavy dependencies (react-scroll-parallax) MUST be dynamically imported for code splitting
- **FR-028**: JavaScript bundle size MUST be under 150KB gzipped
- **FR-029**: Images (if added) MUST use Next.js Image component with proper sizing and lazy loading

**Contact Form**:
- **FR-030**: Contact form MUST include fields for Name (required), Email (required), Phone (optional), Project Description (required, max 2000 characters)
- **FR-031**: Form MUST validate email format in real-time and show inline error messages
- **FR-032**: Form MUST validate required fields before submission and prevent submission if invalid
- **FR-033**: Form MUST show loading state during submission (button disabled, loading indicator visible)
- **FR-034**: Form MUST prevent duplicate submissions (disable submit button after first click)
- **FR-035**: Form MUST integrate with Resend API to send emails to configured address
- **FR-036**: Form MUST show success message "Thank you! We'll respond within 24 hours" after successful submission
- **FR-037**: Form MUST show error message with retry button if submission fails
- **FR-038**: Form MUST be accessible via modal/overlay triggered by CTA buttons ("Get Your Free Prototype", "Contact Us")
- **FR-039**: Form modal MUST close on Escape key, clicking outside, or clicking close button
- **FR-040**: Form MUST preserve entered data and show confirmation if visitor tries to close with unsaved changes
- **FR-041**: Form MUST be fully keyboard navigable and screen reader accessible

**Analytics**:
- **FR-042**: Vercel Analytics MUST be integrated for page view tracking
- **FR-043**: Contact form submissions MUST trigger "contact_form_submission" event in Vercel Analytics
- **FR-044**: CTA button clicks MUST be trackable via analytics events
- **FR-045**: Analytics failure MUST NOT break page functionality (graceful degradation)

**SEO Enhancements**:
- **FR-046**: Page MUST have optimized title tag "Phoebus Digital - Digital Products Built Right, Delivered Fast"
- **FR-047**: Page MUST have meta description optimized for "custom web development, mobile app development, e-commerce platforms" keywords
- **FR-048**: Page MUST include LocalBusiness structured data (JSON-LD) with company name, services offered, contact information
- **FR-049**: Page MUST include OpenGraph tags (og:title, og:description, og:image, og:url, og:type) for social sharing
- **FR-050**: Page MUST include Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image) for Twitter sharing
- **FR-051**: Page MUST include canonical URL tag to prevent duplicate content issues
- **FR-052**: Sitemap.xml MUST be generated and served at /sitemap.xml listing all pages
- **FR-053**: Page MUST achieve Lighthouse SEO score of 95 or higher

**Error Handling**:
- **FR-054**: React error boundaries MUST be implemented to catch component errors
- **FR-055**: Error boundaries MUST display user-friendly fallback UI with retry option
- **FR-056**: Network errors during form submission MUST show clear error messages with retry button
- **FR-057**: All errors MUST preserve user's form data for retry
- **FR-058**: Third-party script failures (analytics, fonts) MUST NOT break core functionality

**Component Architecture**:
- **FR-059**: All components MUST be self-contained with `.tsx` and `.module.css` files
- **FR-060**: Components MUST receive data via props, not global state (unless context is explicitly justified)
- **FR-061**: Inline components (ProcessCard, WhyDifferentCard) MUST be extracted to separate component files
- **FR-062**: Unused code (PrototypeButton if unused) MUST be removed
- **FR-063**: Navigation MUST use Next.js Link component for routing instead of useRouter where appropriate
- **FR-064**: NeumorphicNav slider positioning MUST use single robust strategy (not 5 different fallback strategies)
- **FR-065**: Server components MUST be used where appropriate (non-interactive content) for performance
- **FR-066**: Data structures (services, processSteps, whyDifferentItems) MUST be moved to separate `/data` directory with TypeScript interfaces

**Responsive Design**:
- **FR-067**: Homepage MUST be responsive and functional from 320px to 1920px+ viewport widths
- **FR-068**: Mobile breakpoint (< 640px) MUST simplify shadows and reduce animation complexity
- **FR-069**: Tablet breakpoint (640px - 1023px) MUST show appropriate layout adjustments
- **FR-070**: Desktop breakpoint (≥ 1024px) MUST enable parallax effects and full animations
- **FR-071**: Touch targets on mobile MUST be minimum 44x44px for accessibility

### Key Entities

- **Service**: Represents a service offering with title, icon name, description, and list of features (string array). Used to populate service cards in the services section.

- **ProcessStep**: Represents a step in the development process with icon name, step number, title, short text summary, and full text explanation. Used to populate process cards.

- **DifferentiatorItem**: Represents a competitive differentiator with icon name, title, and description. Used to populate "Why We're Different" cards.

- **ContactFormData**: Represents contact form submission data with name, email, phone (optional), project description, timestamp of submission.

- **AnalyticsEvent**: Represents trackable user interaction events with event name, properties (object), and timestamp. Used for Vercel Analytics tracking.

## Success Criteria *(mandatory)*

### Measurable Outcomes

**Accessibility**:
- **SC-001**: Lighthouse accessibility audit score is 95 or higher
- **SC-002**: All interactive elements can be reached and activated using only keyboard (no mouse required)
- **SC-003**: Screen reader successfully announces all content, navigation, and form labels with proper context
- **SC-004**: All focus indicators are visible with minimum 3:1 contrast ratio against background
- **SC-005**: 100% of visitors using keyboard-only navigation can complete the contact form submission

**Performance**:
- **SC-006**: Lighthouse performance score is 90 or higher on mobile (3G throttling) and 95 or higher on desktop
- **SC-007**: First Contentful Paint occurs within 1.5 seconds on mobile 3G connection
- **SC-008**: Time to Interactive is under 3.5 seconds on mobile 3G connection
- **SC-009**: Cumulative Layout Shift score is 0 (no content jumps during page load)
- **SC-010**: Page scrolling maintains 60 frames per second on mobile devices during animations
- **SC-011**: JavaScript bundle size is under 150KB when compressed (gzipped)

**Type Safety & Code Quality**:
- **SC-012**: TypeScript compilation completes with zero errors
- **SC-013**: Zero uses of `any` type except documented exceptions (target: 0 exceptions)
- **SC-014**: 100% of components have defined TypeScript interfaces for props
- **SC-015**: All data structures have explicit TypeScript type definitions

**Functionality**:
- **SC-016**: Contact form successfully sends emails via Resend in under 2 seconds for 95% of submissions
- **SC-017**: Contact form validation catches invalid inputs and displays error messages within 200ms
- **SC-018**: 100% of form submissions with valid data result in successful email delivery
- **SC-019**: Visitors can navigate between all sections using navigation menu with smooth scrolling in under 1 second per section
- **SC-020**: Mobile menu opens and closes within 300ms with proper focus management
- **SC-021**: Error boundaries successfully catch and handle component errors without full page crash

**SEO**:
- **SC-022**: Lighthouse SEO audit score is 95 or higher
- **SC-023**: Google Rich Results Test validates structured data (LocalBusiness schema) with zero errors
- **SC-024**: Social media platforms (LinkedIn, Twitter, Facebook) correctly display title, description, and image when link is shared
- **SC-025**: Sitemap.xml is accessible and validates with zero errors

**Browser Compatibility**:
- **SC-026**: Homepage functions identically on latest versions of Chrome, Firefox, and Safari (desktop)
- **SC-027**: Homepage functions identically on Mobile Safari (iOS) and Chrome Mobile (Android)
- **SC-028**: All features work correctly across viewport widths from 320px to 1920px+

**Analytics**:
- **SC-029**: Vercel Analytics successfully tracks 100% of page views
- **SC-030**: Contact form submissions trigger analytics events with 100% accuracy
- **SC-031**: Analytics script failures do not break any page functionality (graceful degradation)

**Design System Preservation**:
- **SC-032**: Visual appearance of all neumorphic components (cards, buttons, text effects) is pixel-perfect identical to current implementation
- **SC-033**: All existing content text matches character-for-character with current version
- **SC-034**: Color palette values remain unchanged from current implementation

**Error Handling**:
- **SC-035**: Network failures during form submission display clear error messages and allow retry within 1 second
- **SC-036**: Component errors are caught by error boundaries and display fallback UI within 500ms
- **SC-037**: Visitors never see uncaught errors in browser console during normal usage

## Assumptions

1. **Email Service**: Resend API will be used with API key stored in environment variables. Emails will be sent to a configured admin email address.

2. **Analytics**: Vercel Analytics will be used (built-in Next.js integration) rather than Google Analytics or other third-party service. No personally identifiable information (PII) will be collected.

3. **Form Submission**: Contact form will send emails via Resend API directly from the client side (API route). No database storage of submissions is required initially.

4. **Browser Support**: Modern browsers (last 2 versions) are the target. Internet Explorer is not supported.

5. **Hosting**: Site is deployed on Vercel platform, allowing use of Vercel Analytics and edge functions.

6. **Image Assets**: Any images needed for OpenGraph/Twitter cards will be provided or can use placeholder/logo initially.

7. **Contact Information**: Company contact email, address (if needed for structured data), and phone number will be provided or can use placeholder values.

8. **Rate Limiting**: Contact form will implement client-side rate limiting (1 submission per 60 seconds per user) to prevent spam. Server-side rate limiting can be added later.

9. **Email Templates**: Email sent via Resend will use plain text format initially. HTML templates can be added later.

10. **Monitoring**: Error tracking/monitoring service (Sentry, LogRocket) is not included in initial scope but hooks will be prepared for future integration.

11. **Content Management**: All content remains hardcoded in code (no CMS). This is acceptable for a single-page marketing site.

12. **Internationalization**: English-only for initial launch. i18n can be added later if needed.

13. **SSL/HTTPS**: Vercel provides SSL by default; no additional configuration needed.

14. **Domain**: Will use Vercel-provided domain initially; custom domain can be configured later.
