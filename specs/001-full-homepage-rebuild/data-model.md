# Data Model: Full Homepage Rebuild

**Feature**: Full Homepage Rebuild
**Branch**: 001-full-homepage-rebuild
**Created**: 2025-10-09

## Overview

This document defines all data entities used in the homepage rebuild. Since this is a static marketing site with no database, all entities represent TypeScript interfaces for structured data passed between components and APIs.

---

## Core Entities

### Service

Represents a service offering displayed in the services section.

**Properties**:
- `title`: string - Service name (e.g., "Full-Stack Web Applications")
- `icon`: string - Material Symbols icon name (e.g., "language")
- `description`: string - Brief description of the service (2-3 sentences)
- `features`: string[] - Array of key features/capabilities (6 items max for UI)

**Usage**: Rendered in ServiceCard components in the services grid section.

**Validation**:
- title: non-empty string, max 60 characters
- icon: must be valid Material Symbols icon name
- description: non-empty string, max 200 characters
- features: array of 1-6 strings, each max 100 characters

**Example**:
```typescript
{
  title: "Full-Stack Web Applications",
  icon: "language",
  description: "Complete web applications that scale. Built lean but architected for growth. From simple sites to complex multi-tenant platforms.",
  features: [
    "Serverless architecture",
    "Real-time dashboards",
    "PWAs",
    "Global CDN",
    "Multi-tenant SaaS",
    "API-first development"
  ]
}
```

**Source**: `data/services.ts`

---

### ProcessStep

Represents a step in the 4-step development process.

**Properties**:
- `icon`: string - Material Symbols icon name
- `number`: string - Step number ("1", "2", "3", "4")
- `title`: string - Step title (e.g., "Discovery & Reality Check")
- `shortText`: string - Brief summary for collapsed state
- `fullText`: string - Full explanation for expanded state

**Usage**: Rendered in ProcessCard components with expand/collapse animation.

**Validation**:
- icon: must be valid Material Symbols icon name
- number: must be "1", "2", "3", or "4"
- title: non-empty string, max 50 characters
- shortText: non-empty string, max 30 characters
- fullText: non-empty string, max 150 characters

**Example**:
```typescript
{
  icon: "search",
  number: "1",
  title: "Discovery & Reality Check",
  shortText: "Understand your needs",
  fullText: "We figure out what you actually need. If we can talk you out of features you don't need, we will."
}
```

**Source**: `data/processSteps.ts`

---

### DifferentiatorItem

Represents a competitive differentiator in "Why We're Different" section.

**Properties**:
- `icon`: string - Material Symbols icon name
- `title`: string - Differentiator title
- `description`: string - Explanation of the differentiator

**Usage**: Rendered in WhyDifferentCard components in grid layout.

**Validation**:
- icon: must be valid Material Symbols icon name
- title: non-empty string, max 40 characters
- description: non-empty string, max 150 characters

**Example**:
```typescript
{
  icon: "lock_open",
  title: "No Vendor Lock-In",
  description: "You own everything. All code, all accounts, all passwords. Our ideal client never needs us again after launch."
}
```

**Source**: `data/differentiators.ts`

---

### ContactFormData

Represents data submitted through the contact form.

**Properties**:
- `name`: string - Visitor's full name (required)
- `email`: string - Visitor's email address (required, validated)
- `phone`: string | null - Optional phone number
- `projectDescription`: string - Description of the project (required, max 2000 chars)
- `timestamp`: Date - Submission timestamp (generated server-side)

**Usage**: Submitted to `/api/contact` route, validated, then sent via Resend.

**Validation**:
- name: non-empty string, 2-100 characters, no special characters except spaces, hyphens, apostrophes
- email: valid email format (RFC 5322 compliant)
- phone: optional, if provided must match international phone format
- projectDescription: non-empty string, 10-2000 characters
- timestamp: generated server-side, ISO 8601 format

**State Transitions**:
1. `initial` → User opens form modal
2. `editing` → User fills out fields
3. `validating` → Client-side validation runs on blur/submit
4. `submitting` → Form submitted to server
5. `success` → Email sent successfully
6. `error` → Submission failed (network, validation, or server error)

**Example**:
```typescript
{
  name: "Jane Smith",
  email: "jane@example.com",
  phone: "+1-555-123-4567",
  projectDescription: "Looking to build a custom e-commerce platform for our handmade furniture business. Need inventory management, payment processing, and customer portal.",
  timestamp: new Date("2025-10-09T14:30:00Z")
}
```

**Source**: Collected in `components/ContactForm/ContactForm.tsx`, validated in `lib/validation.ts`, processed in `app/api/contact/route.ts`

---

### AnalyticsEvent

Represents a trackable user interaction event for Vercel Analytics.

**Properties**:
- `name`: string - Event name (e.g., "contact_form_submission", "cta_click")
- `properties`: Record<string, string | number | boolean> - Event metadata
- `timestamp`: Date - Event timestamp (auto-generated by Vercel Analytics)

**Usage**: Tracked via `@vercel/analytics` for page views and custom events.

**Validation**:
- name: non-empty string, alphanumeric + underscores only, max 50 characters
- properties: object with string keys, values must be string/number/boolean (no nested objects)
- timestamp: auto-generated by Vercel Analytics

**Standard Events**:
- `contact_form_submission` - When contact form is successfully submitted
  - Properties: `{ formLocation: "hero" | "footer" }`
- `cta_click` - When a CTA button is clicked
  - Properties: `{ buttonText: string, buttonLocation: string }`

**Example**:
```typescript
{
  name: "contact_form_submission",
  properties: {
    formLocation: "hero"
  },
  timestamp: new Date() // auto-generated
}
```

**Source**: Tracked via `lib/analytics.ts` helper functions, sent to Vercel Analytics

---

## Relationships

```
Service (1) ──renders in──> ServiceCard (many)
ProcessStep (1) ──renders in──> ProcessCard (many)
DifferentiatorItem (1) ──renders in──> WhyDifferentCard (many)

ContactFormData (1) ──validates via──> lib/validation.ts
ContactFormData (1) ──submits to──> app/api/contact/route.ts
ContactFormData (1) ──sends via──> Resend API

AnalyticsEvent (many) ──tracks via──> @vercel/analytics
```

**No database relationships** - all data is static or transient (contact form submissions sent via email, not stored).

---

## Type Definitions Location

All TypeScript interfaces will be defined in `/types/index.ts`:

```typescript
// /types/index.ts
export interface Service {
  title: string;
  icon: string;
  description: string;
  features: string[];
}

export interface ProcessStep {
  icon: string;
  number: string;
  title: string;
  shortText: string;
  fullText: string;
}

export interface DifferentiatorItem {
  icon: string;
  title: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string | null;
  projectDescription: string;
  timestamp: Date;
}

export interface AnalyticsEvent {
  name: string;
  properties: Record<string, string | number | boolean>;
  timestamp: Date;
}

export interface ContactFormState {
  status: 'idle' | 'validating' | 'submitting' | 'success' | 'error';
  errors: Partial<Record<keyof ContactFormData, string>>;
  message: string | null;
}
```

---

## Data Sources

| Entity | Source File | Type | Content Preservation |
|--------|------------|------|---------------------|
| Service | `data/services.ts` | Static array | ✅ Content must match character-for-character |
| ProcessStep | `data/processSteps.ts` | Static array | ✅ Content must match character-for-character |
| DifferentiatorItem | `data/differentiators.ts` | Static array | ✅ Content must match character-for-character |
| ContactFormData | User input | Dynamic | N/A - user-generated |
| AnalyticsEvent | User interactions | Dynamic | N/A - system-generated |

---

## Validation Rules Summary

### Email Validation
- Format: RFC 5322 compliant
- Pattern: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Example: `user@example.com`

### Phone Validation (Optional)
- Format: International format with optional country code
- Pattern: `/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/`
- Examples: `+1-555-123-4567`, `555-123-4567`, `(555) 123-4567`

### Text Field Validation
- Name: 2-100 characters, letters/spaces/hyphens/apostrophes only
- Project Description: 10-2000 characters, any printable characters

### Character Limits
- Service title: 60 chars
- Service description: 200 chars
- Service features (each): 100 chars
- Process step title: 50 chars
- Process step short text: 30 chars
- Process step full text: 150 chars
- Differentiator title: 40 chars
- Differentiator description: 150 chars
- Contact form name: 100 chars
- Contact form description: 2000 chars

---

## Notes

- **No database migrations needed** - all entities are TypeScript types, no persistence layer
- **Content preservation critical** - Services, ProcessSteps, and DifferentiatorItems must preserve exact text from current site
- **Validation client + server** - Contact form validated on client for UX, re-validated on server for security
- **Analytics privacy** - No PII (personally identifiable information) sent to Vercel Analytics, only event names and non-identifying properties
