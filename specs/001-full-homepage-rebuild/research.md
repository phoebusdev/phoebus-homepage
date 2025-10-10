# Technical Implementation Research - Phoebus Homepage Rebuild

Research conducted: 2025-10-09

## 1. NeumorphicNav Simplification

### Current Problem
The current implementation uses 5 different positioning strategies:
- Strategy 1: Immediate update
- Strategy 2: RequestAnimationFrame
- Strategy 3: setTimeout with 50ms delay
- Strategy 4: Window load event listener
- Strategy 5: ResizeObserver with debounced updates

This complexity (lines 27-83 in NeumorphicNav.tsx) creates maintenance burden and potential performance issues.

### Decision
**Use ResizeObserver-only approach with ref callback**

```typescript
const updateSliderPosition = useCallback((index: number) => {
  const activeButton = navRefs.current[index]
  const container = containerRef.current

  if (activeButton && container) {
    const containerRect = container.getBoundingClientRect()
    const buttonRect = activeButton.getBoundingClientRect()

    setSliderStyle({
      left: `${buttonRect.left - containerRect.left}px`,
      width: `${buttonRect.width}px`
    })
  }
}, [])

useEffect(() => {
  const container = containerRef.current
  if (!container) return

  // Initial position
  updateSliderPosition(activeIndex)

  // ResizeObserver for layout changes
  const resizeObserver = new ResizeObserver(() => {
    updateSliderPosition(activeIndex)
  })

  resizeObserver.observe(container)

  return () => {
    resizeObserver.disconnect()
  }
}, [activeIndex, updateSliderPosition])
```

### Rationale
- **ResizeObserver is the modern standard**: Built-in browser API (2025) with excellent support
- **Single responsibility**: One observer handles both initial render and resize events
- **Performance**: No multiple timeouts/RAF calls competing with each other
- **Reliability**: ResizeObserver fires when layout stabilizes, catching all cases including:
  - Initial mount
  - Font loading
  - Dynamic content changes
  - Window resize

### Alternatives Considered
1. **useLayoutEffect only**: Would require manual window resize listener, missing dynamic layout changes
2. **Ref callback with RAF**: Timing issues on slow devices, doesn't handle all resize cases
3. **Multiple strategies (current)**: Over-engineered, potential race conditions, harder to debug

### Implementation Notes
- Remove `mounted` state - unnecessary with this approach
- Remove all setTimeout/RAF/window.addEventListener calls
- Keep ResizeObserver cleanup in effect return
- No debouncing needed - ResizeObserver is already efficient
- Container observation is sufficient (observing individual buttons is overkill)

---

## 2. Focus Trap for Mobile Menu

### Decision
**Use `react-focus-lock` library**

```typescript
import FocusLock from 'react-focus-lock'

<FocusLock disabled={!isMenuOpen}>
  <nav aria-label="Mobile navigation">
    {/* Menu content */}
  </nav>
</FocusLock>
```

### Rationale
- **React 19 compatibility**: While focus-trap-react explicitly supports React 19, react-focus-lock is also compatible
- **Lightweight**: Only 1.5kb bundle size
- **Behavior-based approach**: Watches focus behavior rather than emulating it, works with positive tab indexes
- **Portal support**: Built-in React Portal support
- **Simpler API**: Just wrap content and toggle `disabled` prop

### Alternatives Considered
1. **focus-trap-react**:
   - Larger bundle size
   - More complex API (needs activation/deactivation props)
   - Explicitly mentions React 19 support but more verbose
   - Better for complex nested trap scenarios

2. **Custom implementation**:
   - Would need to handle: finding all tabbable elements, tracking first/last, keyboard listeners, focus restoration
   - Maintenance burden
   - Accessibility edge cases likely missed
   - Not worth 1.5kb savings

### Implementation Notes
- Install: `npm install react-focus-lock`
- Wrap mobile menu content (not the trigger button)
- Use `disabled={!isMenuOpen}` to toggle trap
- Focus automatically returns to trigger on close
- Add `aria-label="Mobile navigation"` for screen reader context
- Consider `returnFocus` prop if custom focus restoration needed

---

## 3. Resend Integration Pattern

### Decision
**Use Server Actions for contact form submission**

```typescript
// app/actions/contact.ts
'use server'

import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed'
    }
  }

  try {
    const { name, email, message } = validatedFields.data

    await resend.emails.send({
      from: 'contact@phoebus.digital',
      to: 'hello@phoebus.digital',
      subject: `Contact form: ${name}`,
      text: `From: ${name} (${email})\n\n${message}`
    })

    return {
      success: true,
      message: 'Message sent successfully!'
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to send message. Please try again.'
    }
  }
}
```

```typescript
// Component usage
'use client'

import { useActionState } from 'react'
import { submitContactForm } from '@/app/actions/contact'

const [state, formAction, isPending] = useActionState(submitContactForm, null)
```

### Rationale
- **Modern Next.js 15 pattern**: Server Actions are the recommended approach in 2025
- **Type safety**: Direct function calls, no manual API route typing
- **Simplified data flow**: No client-server round trip overhead
- **Built-in error handling**: useActionState provides loading states and error management
- **Progressive enhancement**: Forms work without JavaScript
- **Vercel Analytics integration**: Easier to track mutations from Server Actions

### Alternatives Considered
1. **API Route (/app/api/contact/route.ts)**:
   - Use case: External webhooks, third-party integrations
   - More boilerplate (request parsing, response formatting)
   - Better for: RESTful APIs consumed by multiple clients
   - Not needed for simple internal form submission

### Implementation Notes
- Install dependencies: `npm install resend zod`
- Store `RESEND_API_KEY` in `.env.local`
- Use `'use server'` directive at top of action file
- Validate with Zod on server side (don't trust client)
- Pair with client-side HTML5 validation for UX
- Use `useActionState` (React 19) instead of deprecated `useFormState`
- Return structured errors for field-level validation display
- Consider rate limiting (simple: Vercel Edge Config, complex: Upstash Redis)

---

## 4. Vercel Analytics Setup

### Decision
**Install @vercel/analytics with App Router layout integration**

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Rationale
- **Zero configuration**: Works out of the box with default settings
- **Automatic page view tracking**: All routes tracked automatically
- **Development safe**: Doesn't track in development mode
- **Next.js optimized**: Built specifically for Next.js App Router

### Alternatives Considered
1. **Google Analytics**: More complex setup, privacy concerns, slower loading
2. **Plausible/Fathom**: Third-party services, additional cost, external dependencies

### Implementation Notes
- Install: `npm install @vercel/analytics`
- Enable in Vercel Dashboard first (Project Settings → Analytics)
- Place `<Analytics />` component in root layout
- No tracking in `next dev` - deploy to see data
- Custom event tracking (optional):
  ```typescript
  import { track } from '@vercel/analytics'

  track('contact_form_submission', {
    category: 'engagement',
    label: formData.email
  })
  ```
- Appears in Vercel Dashboard under Analytics tab
- Free tier: 100k events/month

---

## 5. LocalBusiness Structured Data

### Decision
**Implement minimal LocalBusiness JSON-LD with Service catalog**

```typescript
// app/layout.tsx or components/StructuredData.tsx
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Phoebus Digital",
  "description": "Digital products built right, delivered fast. We build websites and apps that work exactly as promised.",
  "url": "https://phoebus.digital",
  "telephone": "+1-XXX-XXX-XXXX", // Add if available
  "email": "hello@phoebus.digital",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US" // Minimal for digital-first business
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Digital Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Full-Stack Web Development",
          "description": "Modern web applications with Next.js, React, and cloud deployment"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Mobile App Development",
          "description": "Cross-platform mobile applications"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "API Development",
          "description": "RESTful and GraphQL API design and implementation"
        }
      }
    ]
  },
  "areaServed": {
    "@type": "Country",
    "name": "Worldwide"
  }
}

// In layout
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
/>
```

### Rationale
- **No truly required properties**: Google says add what applies to your business
- **Google recommendations**: Include `@context`, `@type`, `name`, `address` as minimum
- **Digital services consideration**: LocalBusiness appropriate even without physical storefront
- **Service catalog**: `hasOfferCatalog` showcases specific offerings
- **SEO benefit**: Enables rich results in Google Search

### Alternatives Considered
1. **Organization only**: Less specific, misses local business benefits
2. **ProfessionalService**: More generic, less feature-rich in search results
3. **Detailed properties**: Opening hours, geo-coordinates not applicable for digital-first business

### Implementation Notes
- Place in `<head>` via layout.tsx or dedicated component
- Use `dangerouslySetInnerHTML` for JSON-LD script injection
- Validate with Google's Rich Results Test: https://search.google.com/test/rich-results
- Use URL Inspection tool in Google Search Console after deployment
- Update service list as offerings change
- Consider adding `logo` property (1200x675px recommended)
- Add `sameAs` array for social media profiles when available
- For purely digital business, minimal address (country only) is acceptable

---

## 6. Accessible Form Validation

### Decision
**Pre-rendered aria-live regions with on-blur validation + on-submit catch-all**

```typescript
'use client'

import { useActionState } from 'react'
import { submitContactForm } from '@/app/actions/contact'

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, null)
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({})

  const validateField = (name: string, value: string) => {
    let error = ''

    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = 'Please enter a valid email address'
    } else if (name === 'name' && value.length < 2) {
      error = 'Name must be at least 2 characters'
    } else if (name === 'message' && value.length < 10) {
      error = 'Message must be at least 10 characters'
    }

    setClientErrors(prev => ({ ...prev, [name]: error }))
  }

  return (
    <form action={formAction} className="space-y-6">
      {/* Name field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          aria-describedby={clientErrors.name || state?.errors?.name ? 'name-error' : undefined}
          aria-invalid={!!(clientErrors.name || state?.errors?.name)}
          onBlur={(e) => validateField('name', e.target.value)}
          className="mt-1 block w-full"
        />
        {/* Pre-rendered error container */}
        <div
          id="name-error"
          role="alert"
          aria-live="polite"
          className="mt-1 text-sm text-red-600"
        >
          {clientErrors.name || state?.errors?.name?.[0]}
        </div>
      </div>

      {/* Email field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          aria-describedby={clientErrors.email || state?.errors?.email ? 'email-error' : undefined}
          aria-invalid={!!(clientErrors.email || state?.errors?.email)}
          onBlur={(e) => validateField('email', e.target.value)}
          className="mt-1 block w-full"
        />
        <div
          id="email-error"
          role="alert"
          aria-live="polite"
          className="mt-1 text-sm text-red-600"
        >
          {clientErrors.email || state?.errors?.email?.[0]}
        </div>
      </div>

      {/* Message field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          aria-describedby={clientErrors.message || state?.errors?.message ? 'message-error' : undefined}
          aria-invalid={!!(clientErrors.message || state?.errors?.message)}
          onBlur={(e) => validateField('message', e.target.value)}
          className="mt-1 block w-full"
        />
        <div
          id="message-error"
          role="alert"
          aria-live="polite"
          className="mt-1 text-sm text-red-600"
        >
          {clientErrors.message || state?.errors?.message?.[0]}
        </div>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isPending}
        aria-busy={isPending}
      >
        {isPending ? 'Sending...' : 'Send Message'}
      </button>

      {/* Success message */}
      {state?.success && (
        <div role="status" aria-live="polite" className="text-green-600">
          {state.message}
        </div>
      )}
    </form>
  )
}
```

### Rationale
- **Pre-rendered live regions**: Error containers exist in DOM on page load - critical for cross-browser screen reader support
- **aria-live="polite"**: Non-intrusive announcements after user completes action
- **role="alert" equivalent**: Using explicit aria-live for clarity
- **On blur validation**: Less intrusive than on-change, validates after user leaves field
- **Visual + text errors**: WCAG 1.4.1 compliance (not just color)
- **aria-describedby**: Links input to error message
- **aria-invalid**: Programmatically indicates error state

### Alternatives Considered
1. **On-change validation**: Too aggressive, announces while typing, poor UX
2. **On-submit only**: Delayed feedback, user must review entire form
3. **Dynamic aria-live injection**: Doesn't work reliably across screen readers
4. **aria-errormessage**: Poor screen reader support as of 2025

### Implementation Notes
- **Timing strategy**:
  - Client-side: on-blur for immediate feedback
  - Server-side: on-submit for security validation
  - Display both client and server errors (server overrides client)

- **ARIA attributes**:
  - `aria-live="polite"` on error containers (pre-rendered)
  - `aria-describedby` when error exists (links field to error)
  - `aria-invalid="true"` when field has error
  - `role="alert"` or `aria-live` (equivalent if aria-live="assertive")
  - `aria-busy` on submit button during pending state

- **Visual design**:
  - Red text alone not enough - add icon or bold text
  - Error container always present (visibility toggled with content)
  - Minimum contrast ratio 4.5:1 for error text

- **Error message content**:
  - Specific and actionable: "Please enter a valid email address"
  - Not generic: "Invalid input"
  - Polite language, helpful guidance

- **Testing checklist**:
  - Test with NVDA (Windows), JAWS (Windows), VoiceOver (macOS/iOS)
  - Verify errors announced on blur
  - Verify submit errors announced
  - Verify success message announced
  - Check keyboard navigation (tab order)

---

## Summary of Technology Stack Additions

| Technology | Purpose | Installation |
|------------|---------|--------------|
| react-focus-lock | Accessible focus trapping | `npm install react-focus-lock` |
| resend | Email sending | `npm install resend` |
| zod | Schema validation | `npm install zod` |
| @vercel/analytics | Web analytics | `npm install @vercel/analytics` |

**Total bundle impact**: ~50kb (minified + gzipped)
- react-focus-lock: 1.5kb
- resend: ~15kb (server-only)
- zod: ~8kb (server-only)
- @vercel/analytics: ~1kb

**Note**: Server-only packages (resend, zod when used in Server Actions) don't impact client bundle size.

---

## Implementation Priority

1. **High Priority** (Core functionality):
   - Resend integration (contact form)
   - Form validation (accessibility + UX)
   - NeumorphicNav simplification (bug fix)

2. **Medium Priority** (SEO + Analytics):
   - Vercel Analytics setup
   - LocalBusiness structured data

3. **Low Priority** (Enhancement):
   - Focus trap for mobile menu (only if menu is modal-style)

---

## Next Steps

1. Review research findings
2. Create feature specification with `/specify` if using spec-kit
3. Implement changes in order of priority
4. Test accessibility with screen readers
5. Validate structured data with Google tools
6. Deploy and verify analytics tracking

---

*Research compiled from official documentation, WCAG guidelines, and current best practices as of 2025-10-09*
