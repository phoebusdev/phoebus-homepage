# Quickstart Guide: Phoebus Digital Homepage

**Feature**: Full Homepage Rebuild
**Branch**: 001-full-homepage-rebuild
**Last Updated**: 2025-10-09

## Prerequisites

- **Node.js**: 20 LTS or later
- **npm**: 10.x or later (comes with Node.js)
- **Git**: Latest version
- **Resend Account**: API key required for contact form (sign up at https://resend.com)
- **Vercel Account** (optional): For deployment and analytics

---

## Initial Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd phoebus-homepage

# Checkout the rebuild branch
git checkout 001-full-homepage-rebuild

# Install dependencies
npm install
```

### 2. Environment Configuration

Create `.env.local` file in project root:

```bash
# Required for contact form
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Required for email recipient
CONTACT_EMAIL=your-email@example.com

# Optional: Override from email (defaults to onboarding@resend.dev)
FROM_EMAIL=noreply@yourdomain.com
```

**Get Resend API Key**:
1. Sign up at https://resend.com
2. Navigate to API Keys section
3. Create new API key
4. Copy key to `.env.local`

**Note**: `.env.local` is git-ignored. Never commit API keys to version control.

### 3. Verify Installation

```bash
# Run type checking
npm run typecheck

# Should output: "No errors"

# Start development server
npm run dev

# Open http://localhost:3000
```

---

## Development

### Running the Dev Server

```bash
npm run dev
```

- Server runs on `http://localhost:3000`
- Hot reload enabled (changes appear instantly)
- TypeScript errors show in terminal

### Type Checking

```bash
npm run typecheck
```

**Must pass with zero errors before committing**

### Building for Production

```bash
npm run build
```

Builds optimized production bundle. Runs type checking automatically.

### Testing Contact Form Locally

1. Start dev server: `npm run dev`
2. Fill out contact form on homepage
3. Submit form
4. Check Resend dashboard for sent email
5. Verify email received at `CONTACT_EMAIL` address

**Troubleshooting**:
- **401 Unauthorized**: Check `RESEND_API_KEY` in `.env.local`
- **Email not received**: Check spam folder, verify `CONTACT_EMAIL`
- **Rate limit**: Resend free tier has limits, check dashboard

---

## Project Structure

```
phoebus-homepage/
├── app/                          # Next.js App Router
│   ├── globals.css              # Design system (neumorphic CSS)
│   ├── layout.tsx               # Root layout + metadata
│   ├── page.tsx                 # Homepage
│   ├── error.tsx                # Error boundary
│   └── api/
│       └── contact/
│           └── route.ts         # Contact form API endpoint
├── components/                   # React components
│   ├── ContactForm/             # Contact form modal
│   ├── ErrorBoundary/           # Error boundary wrapper
│   ├── Navigation/              # Main nav + mobile menu
│   ├── NeumorphicButton/        # Button component
│   ├── NeumorphicCard/          # Card component
│   ├── ProcessCard/             # Process step card
│   ├── ServiceCard/             # Service offering card
│   ├── SkipNavigation/          # A11y skip link
│   └── WhyDifferentCard/        # Differentiator card
├── data/                         # Static content
│   ├── services.ts              # Service offerings
│   ├── processSteps.ts          # Process steps
│   ├── differentiators.ts       # Why Different items
│   └── content.ts               # Hero text, etc.
├── types/
│   └── index.ts                 # TypeScript interfaces
├── lib/                          # Utilities
│   ├── validation.ts            # Form validation
│   ├── analytics.ts             # Vercel Analytics helpers
│   └── resend.ts                # Resend client wrapper
├── hooks/                        # Custom React hooks
│   ├── useContactForm.ts        # Form state management
│   ├── useFocusTrap.ts          # Focus trap for modals
│   └── useScrollToSection.ts    # Smooth scroll navigation
├── public/
│   ├── sitemap.xml              # SEO sitemap
│   └── og-image.png             # Social sharing image
├── specs/                        # Feature specifications
│   └── 001-full-homepage-rebuild/
│       ├── spec.md              # Requirements
│       ├── plan.md              # Implementation plan
│       ├── research.md          # Technical decisions
│       ├── data-model.md        # Entity definitions
│       └── quickstart.md        # This file
├── .env.local                    # Environment variables (git-ignored)
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── tailwind.config.ts            # Tailwind config
└── next.config.js                # Next.js config
```

---

## Key Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server (port 3000) |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server (after build) |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Type check without emitting files |

---

## Development Workflow

### Making Changes

1. **Create feature branch** (if not on 001-full-homepage-rebuild):
   ```bash
   git checkout -b your-feature-name
   ```

2. **Make changes** following constitution principles:
   - Preserve neumorphic design system (globals.css)
   - Maintain content character-for-character (data/*.ts)
   - Use TypeScript strict mode (no `any` types)
   - Ensure accessibility (focus states, ARIA labels)

3. **Test changes**:
   ```bash
   npm run typecheck  # Must pass with zero errors
   npm run dev        # Manual browser testing
   ```

4. **Run quality gates** before committing:
   - [ ] TypeScript compiles (`npm run typecheck`)
   - [ ] No console errors in browser
   - [ ] Keyboard navigation works (Tab, Enter, Escape)
   - [ ] Mobile responsive (test at 320px, 768px, 1024px)
   - [ ] Visual design matches neumorphic system

5. **Commit**:
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

### Testing Checklist

**Functionality**:
- [ ] Contact form validates email format
- [ ] Contact form shows error messages
- [ ] Contact form submits successfully
- [ ] Success message appears after submission
- [ ] Navigation smooth scrolls to sections
- [ ] Mobile menu opens/closes correctly
- [ ] Parallax effects work on desktop (disabled on mobile)

**Accessibility**:
- [ ] Tab through entire page (visible focus indicators)
- [ ] Skip navigation link appears on first Tab
- [ ] Press Escape to close mobile menu
- [ ] Screen reader announces sections (test with NVDA/VoiceOver)
- [ ] Form errors announced by screen reader

**Performance**:
- [ ] Page loads in < 3 seconds on 3G throttling
- [ ] No layout shifts during page load
- [ ] Animations smooth at 60fps

**SEO**:
- [ ] View page source - verify meta tags
- [ ] LocalBusiness JSON-LD present in <head>
- [ ] OpenGraph tags present (og:title, og:description, og:image)

---

## Environment Variables

### Required

| Variable | Purpose | Example |
|----------|---------|---------|
| `RESEND_API_KEY` | Resend API authentication | `re_123abc...` |
| `CONTACT_EMAIL` | Email recipient for form submissions | `contact@phoebusdigital.com` |

### Optional

| Variable | Purpose | Default | Example |
|----------|---------|---------|---------|
| `FROM_EMAIL` | Sender email address | `onboarding@resend.dev` | `noreply@phoebusdigital.com` |
| `NODE_ENV` | Environment mode | `development` | `production` |

---

## Troubleshooting

### TypeScript Errors

**Problem**: `npm run typecheck` shows errors

**Solutions**:
1. Check for missing dependencies: `npm install`
2. Delete `.next` folder: `rm -rf .next && npm run dev`
3. Restart TypeScript server in VS Code: Cmd+Shift+P → "Restart TS Server"

### Contact Form Not Working

**Problem**: Form submits but email not sent

**Solutions**:
1. Verify `RESEND_API_KEY` in `.env.local`
2. Check Resend dashboard for API errors
3. Verify email domain verified in Resend (if using custom FROM_EMAIL)
4. Check server logs in terminal for error messages

### Parallax Not Working

**Problem**: Parallax effects not visible

**Solutions**:
1. Parallax disabled on mobile (< 768px) - test on desktop viewport
2. Check browser console for errors
3. Verify `react-scroll-parallax` installed: `npm install react-scroll-parallax`

### Styles Not Updating

**Problem**: CSS changes not reflecting

**Solutions**:
1. Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
2. Clear `.next` cache: `rm -rf .next && npm run dev`
3. Check CSS module file is imported correctly

---

## Next Steps

After initial setup:

1. **Read specs**: Review `/specs/001-full-homepage-rebuild/spec.md`
2. **Review plan**: Check `/specs/001-full-homepage-rebuild/plan.md`
3. **Read constitution**: Understand principles in `.specify/memory/constitution.md`
4. **Start implementing**: Follow task list in `/specs/001-full-homepage-rebuild/tasks.md` (generated via `/speckit.tasks`)

---

## Getting Help

**Documentation**:
- Constitution: `.specify/memory/constitution.md`
- Feature spec: `/specs/001-full-homepage-rebuild/spec.md`
- Implementation plan: `/specs/001-full-homepage-rebuild/plan.md`
- Design system: `DESIGN_SYSTEM.md`

**External Resources**:
- Next.js 15 docs: https://nextjs.org/docs
- Resend docs: https://resend.com/docs
- Vercel Analytics: https://vercel.com/docs/analytics
- WCAG 2.1 guidelines: https://www.w3.org/WAI/WCAG21/quickref/

**Issues**:
- Check existing issues in repository
- Create new issue with reproduction steps
- Tag with `001-full-homepage-rebuild` label
