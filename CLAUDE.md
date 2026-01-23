# CLAUDE.md - LLM Development Guide

This document provides context for LLM tools (like Claude) to understand and work with this project effectively.

## Project Overview

**Type**: Personal portfolio website
**Owner**: Will Moore (Software Development Manager at Amazon)
**Domain**: will.moore.fyi
**Status**: In development, ready for content customization
**Deployment Target**: AWS S3 static hosting (owner is on S3 team)

## Architecture

### Framework: Next.js 16 (Static Export Mode)

This is a **static site** configured with `output: 'export'`:
- No server-side rendering
- No API routes
- All pages pre-rendered at build time
- Output directory: `/out`
- Images: `unoptimized: true` (no server-side image optimization)

### Key Configuration

**next.config.mjs:**
```javascript
{
  output: 'export',
  images: { unoptimized: true }
}
```

**package.json:**
- `type: "module"` (ES modules)
- Next.js 16.1.4
- Tailwind CSS 3.4.19 (downgraded from v4 due to compatibility issues)
- React 19.2.3
- Framer Motion 12.28.1

### Known Issues

1. **Dev Server (npm run dev)**: Hangs during compilation with Turbopack
   - **Workaround**: Use production build for testing (`npm run build`)
   - Not critical since deployment is static

2. **Tailwind CSS**: Originally v4, downgraded to v3 for stability
   - PostCSS config uses `.cjs` extension (CommonJS)
   - Next config uses `.mjs` extension (ES modules)

## Project Structure

### Content Files (Editable Data)

These files contain the site content and should be edited by the user:

- **`/data/experience.ts`**: Work experience timeline
  - TypeScript interface: `Experience`
  - Array: `experiences[]`
  - Fields: company, role, dates, location, achievements, technologies, optional logo

- **`/data/about.ts`**: Bio, skills, and interests
  - TypeScript interface: `AboutData`
  - Object: `aboutData`
  - Fields: bio paragraphs, skill categories, interests list

### Components (React/TypeScript)

All components are client-side with Framer Motion animations:

1. **`/components/Hero.tsx`**
   - Client component (`'use client'`)
   - Profile photo, name, tagline, social links
   - Animated gradient background
   - Image path: `/public/avatar.png`
   - Social links: GitHub (willmoorefyi), LinkedIn (willmooreio), Email (will@moore.fyi)

2. **`/components/About.tsx`**
   - Client component
   - Reads from `/data/about.ts`
   - Two-column layout: bio + skills/interests
   - Scroll-based animations

3. **`/components/Experience.tsx`**
   - Client component
   - Reads from `/data/experience.ts`
   - Vertical timeline design
   - Optional company logos support

4. **`/components/Footer.tsx`**
   - Client component
   - Social links, quick navigation
   - Copyright with dynamic year

5. **`/components/ThemeToggle.tsx`**
   - Client component
   - Dark mode toggle (top-right corner)
   - Uses localStorage and system preferences
   - Requires `'use client'` for browser APIs

### Pages

- **`/app/page.tsx`**: Home page combining all sections
  - Imports: Hero, About, Experience, Footer
  - No server-side logic

- **`/app/layout.tsx`**: Root layout
  - Includes ThemeToggle component
  - Imports global CSS
  - Metadata: title and description

- **`/app/globals.css`**: Tailwind imports and CSS variables
  - Dark mode CSS variables
  - Custom utilities

### Static Assets

- **`/public/avatar.png`**: User's profile photo (512x512px recommended)
- **`/public/logos/`**: Optional company logos (not yet created)

## Build & Deployment

### Build Process

```bash
npm run build
```

**Output**: `/out` directory with:
- `index.html` - Main page
- `404.html` - Error page
- `avatar.png` - Profile photo
- `_next/` - JavaScript, CSS, and assets

### Testing Locally

```bash
npm run build
cd out
python3 -m http.server 3000
```

Visit http://localhost:3000

### Deployment to S3

**Automated deployment (recommended):**

```bash
# 1. Authenticate with AWS SSO (required first)
aws sso login --profile will-aws-admin

# 2. Deploy (builds, uploads, invalidates CloudFront)
npm run deploy
```

**Manual deployment (alternative):**

```bash
aws s3 sync out/ s3://will.moore.fyi --delete
```

**Configuration:**
- AWS Profile: `will-aws-admin` (SSO-based)
- S3 Bucket: `will.moore.fyi`
- CloudFront Distribution: `E10BJV5LJCPKIE`
- Region: `us-east-1`

**Important**: AWS SSO sessions expire after several hours. If deployment fails with authentication errors, re-run `aws sso login --profile will-aws-admin`.

**S3 Configuration Required**:
- Static website hosting enabled
- Index document: `index.html`
- Error document: `404.html`
- Public read access bucket policy

**Optional CloudFront**:
- HTTPS support
- Global CDN
- Custom domain with ACM certificate

## Development Guidelines for LLMs

### When Editing Content

1. **Always edit data files**, not components:
   - Edit `/data/experience.ts` for work history
   - Edit `/data/about.ts` for bio/skills
   - Don't hardcode content in components

2. **Maintain TypeScript interfaces**:
   - Don't break type definitions
   - Follow existing data structure

3. **Image paths are relative to `/public`**:
   - `/public/avatar.png` → `src="/avatar.png"` in Next.js Image
   - Company logos: `/public/logos/company.png` → `logo: "/logos/company.png"`

### When Adding Features

1. **Client components required** for:
   - Framer Motion animations
   - Browser APIs (localStorage, window, etc.)
   - Interactive elements

2. **Test with production build**:
   - Dev server may not work reliably
   - Always run `npm run build` and test from `/out`

3. **Static export limitations**:
   - No server-side rendering
   - No API routes
   - No dynamic routes (unless generated at build time)
   - Images must be unoptimized

### Common Tasks

#### Update Work Experience

Edit `/data/experience.ts`:
```typescript
{
  id: 1,
  company: "Amazon",
  role: "Software Development Manager",
  startDate: "2022-01",
  endDate: "Present",
  location: "Seattle, WA",
  description: "Leading team of 8 engineers...",
  achievements: [
    "Reduced latency by 40%",
    "Launched new feature to 1M users"
  ],
  technologies: ["AWS", "TypeScript", "React"]
}
```

#### Update About Section

Edit `/data/about.ts`:
```typescript
bio: {
  paragraphs: [
    "Your professional story...",
    "Additional context..."
  ]
},
skills: [
  {
    category: "Languages",
    items: ["TypeScript", "Python", "Java"]
  }
],
interests: ["Open Source", "Photography"]
```

#### Add New Section

1. Create component in `/components/NewSection.tsx`
2. Use `'use client'` if using Framer Motion
3. Import and add to `/app/page.tsx`
4. Rebuild: `npm run build`

#### Change Colors

Edit Tailwind classes in components:
```typescript
// Blue → Purple
"from-blue-600 to-purple-600"

// Purple → Pink
"from-purple-600 to-pink-600"

// Custom
"from-orange-500 to-red-500"
```

## Testing Checklist

Before deployment, verify:

- [ ] Content in `/data/` files is accurate
- [ ] Profile photo exists at `/public/avatar.png`
- [ ] Social links point to correct profiles
- [ ] `npm run build` completes successfully
- [ ] `/out` directory contains all files
- [ ] Test locally: dark mode toggle works
- [ ] Test locally: all sections visible
- [ ] Test locally: animations smooth
- [ ] Test locally: mobile responsive

## File References

### Critical Files (Don't Delete)

- `next.config.mjs` - Next.js configuration (export settings)
- `tailwind.config.ts` - Tailwind CSS configuration
- `postcss.config.cjs` - PostCSS configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts

### Editable Content

- `/data/experience.ts` ⭐ **Primary content file**
- `/data/about.ts` ⭐ **Primary content file**
- `/public/avatar.png` ⭐ **Profile photo**
- `/components/Hero.tsx` - For name/tagline/social links
- `/components/Footer.tsx` - For footer content

### Generated (Git Ignore)

- `/out` - Build output
- `/node_modules` - Dependencies
- `/.next` - Next.js build cache

## Dependencies

### Production

- `next@16.1.4` - React framework
- `react@19.2.3` - UI library
- `react-dom@19.2.3` - React DOM renderer
- `framer-motion@12.28.1` - Animation library
- `tailwindcss@3.4.19` - CSS framework
- `lucide-react@0.562.0` - Icon library
- `react-icons@5.5.0` - Social media icons
- `typescript@5.9.3` - Type checking

### Dev Dependencies

None (all production deps for static export)

## Common Errors & Solutions

### Error: "Failed to load next.config.js"

**Cause**: Module format mismatch
**Solution**: Use `.mjs` extension for ES modules

### Error: "EADDRINUSE: address already in use"

**Cause**: Port 3000 already in use
**Solution**: Kill process or use different port

```bash
lsof -ti:3000 | xargs kill -9
```

### Error: Dev server hangs at "Compiling / ..."

**Cause**: Turbopack compilation issue
**Solution**: Use production build for testing

```bash
npm run build
cd out && python3 -m http.server 3000
```

### Error: Images not loading in S3

**Cause**: Incorrect image paths or permissions
**Solution**:
- Verify `avatar.png` in S3 bucket root
- Check S3 bucket policy allows public read
- Use browser DevTools to check 404 errors

## Next Steps

See `TODO.md` for remaining tasks before production deployment.

## Version History

- **v1.0** - Initial build with Hero, About, Experience, Footer
- Current status: Awaiting content customization

## Contact

For questions about this codebase:
- See `README.md` for user documentation
- See `TODO.md` for known issues and planned work
