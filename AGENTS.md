# Agent Development Guide

This document provides context for AI development tools to understand and work with this project effectively.

## Project Overview

**Type**: Personal portfolio website
**Owner**: Will Moore (Software Development Manager at Amazon)
**Domain**: will.moore.fyi
**Status**: In development, ready for content customization
**Deployment**: AWS S3 static hosting + CloudFront CDN

## Task Management: Beads Workflow

This project uses **bd** (beads) for issue tracking across sessions.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --status=in_progress  # Claim work
bd close <id>         # Complete work
bd sync               # Sync with git
```

### Complete Beads Commands

**Finding Work:**
```bash
bd ready                     # Show issues ready to work (no blockers)
bd list --status=open        # All open issues
bd list --status=in_progress # Active work
bd show <id>                 # Detailed issue view with dependencies
```

**Creating & Updating:**
```bash
bd create --title="Summary" --description="Details" --type=task|bug|feature --priority=2
bd update <id> --status=in_progress
bd update <id> --assignee=username
bd close <id>
bd close <id1> <id2> ...     # Close multiple issues efficiently
```

**Dependencies:**
```bash
bd dep add <issue> <depends-on>  # Add dependency
bd blocked                       # Show blocked issues
```

**Project Health:**
```bash
bd stats                     # Project statistics
bd sync --status             # Check sync status
```

## Session Completion Protocol

**CRITICAL**: Before ending ANY work session, complete ALL steps below. Work is NOT complete until `git push` succeeds.

### Mandatory Workflow

1. **File issues for remaining work** - Create beads issues for any follow-up tasks
2. **Run quality gates** (if code changed):
   ```bash
   npm run build    # Build must succeed
   # Add other checks as needed (lint, test)
   ```
3. **Update issue status**:
   ```bash
   bd close <id1> <id2> ...  # Close finished work
   bd sync                    # Sync beads changes
   ```
4. **PUSH TO REMOTE** (MANDATORY):
   ```bash
   git status                 # Check what changed
   git add <files>            # Stage code changes
   git commit -m "message"    # Commit code
   bd sync                    # Final beads sync
   git pull --rebase          # Get latest changes
   git push                   # Push to remote
   git status                 # MUST show "up to date with origin"
   ```
5. **Verify**: All changes committed AND pushed

### Critical Rules

- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve conflicts and retry until it succeeds

## Architecture

### Framework: Next.js 16 (Static Export Mode)

**Static site** configured with `output: 'export'`:
- No server-side rendering
- No API routes
- All pages pre-rendered at build time
- Output directory: `/out`
- Images: `unoptimized: true`

### Key Technologies

- Next.js 16.1.4 (static export)
- React 19.2.3
- Tailwind CSS 3.4.19
- TypeScript 5.9.3
- Framer Motion 12.28.1 (animations)

### Known Issues

1. **Dev Server**: Hangs during compilation with Turbopack
   - **Workaround**: Use production build (`npm run build`) for testing

2. **Tailwind CSS**: Downgraded from v4 to v3 for stability

## Project Structure

### Content Files (Edit These for Content Changes)

- **`/data/experience.ts`**: Work experience timeline
  - Interface: `Experience`
  - Fields: company, role, dates, location, achievements, technologies, logo

- **`/data/about.ts`**: Bio, skills, and interests
  - Interface: `AboutData`
  - Fields: bio paragraphs, skill categories, interests list

### Components (React/TypeScript)

All components are client-side with `'use client'` directive:

1. **`/components/Hero.tsx`**: Profile photo, name, tagline, social links
2. **`/components/About.tsx`**: Bio and skills section
3. **`/components/Experience.tsx`**: Work history timeline
4. **`/components/Footer.tsx`**: Footer with social links
5. **`/components/ThemeToggle.tsx`**: Dark mode toggle

### Pages

- **`/app/page.tsx`**: Home page combining all sections
- **`/app/layout.tsx`**: Root layout with metadata
- **`/app/globals.css`**: Tailwind imports and CSS variables

### Static Assets

- **`/public/avatar.png`**: Profile photo (512x512px recommended)
- **`/public/logos/`**: Optional company logos

## Build & Deployment

### Local Testing

```bash
npm run build
cd out
python3 -m http.server 3000
```

Visit http://localhost:3000

### AWS Deployment

**Automated (recommended):**
```bash
aws sso login --profile will-aws-admin
npm run deploy
```

**Configuration:**
- AWS Profile: `will-aws-admin` (SSO-based)
- S3 Bucket: `will.moore.fyi`
- CloudFront Distribution: `E10BJV5LJCPKIE`
- Region: `us-east-1`

**Note**: AWS SSO sessions expire after several hours. Re-authenticate if deployment fails.

## Development Guidelines

### When Editing Content

1. **Always edit data files**, not components:
   - Work history → `/data/experience.ts`
   - Bio/skills → `/data/about.ts`

2. **Maintain TypeScript interfaces** - Don't break type definitions

3. **Image paths** are relative to `/public`:
   - `/public/avatar.png` → `src="/avatar.png"`
   - Company logos: `/public/logos/company.png` → `logo: "/logos/company.png"`

### When Adding Features

1. **Client components required** for:
   - Framer Motion animations
   - Browser APIs (localStorage, window)
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

#### Change Colors

Edit Tailwind classes in components:
```typescript
// Blue → Purple
"from-blue-600 to-purple-600"

// Custom gradient
"from-orange-500 to-red-500"
```

## Testing Checklist

Before deployment:

- [ ] Content in `/data/` files is accurate
- [ ] Profile photo exists at `/public/avatar.png`
- [ ] Social links point to correct profiles
- [ ] `npm run build` completes successfully
- [ ] `/out` directory contains all files
- [ ] Test locally: dark mode works
- [ ] Test locally: all sections visible
- [ ] Test locally: animations smooth
- [ ] Test locally: mobile responsive
- [ ] All git changes committed and pushed
- [ ] All beads issues updated

## File References

### Critical Configuration (Don't Delete)

- `next.config.mjs` - Next.js export settings
- `tailwind.config.ts` - Tailwind configuration
- `postcss.config.cjs` - PostCSS configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts

### Primary Content Files

- `/data/experience.ts` - Work history
- `/data/about.ts` - Bio and skills
- `/public/avatar.png` - Profile photo
- `/components/Hero.tsx` - Name, tagline, social links
- `/components/Footer.tsx` - Footer content

### Generated (Git Ignored)

- `/out` - Build output
- `/node_modules` - Dependencies
- `/.next` - Next.js build cache

## Common Errors & Solutions

### Dev Server Hangs

**Symptom**: Compilation hangs at "Compiling / ..."
**Solution**: Use production build for testing
```bash
npm run build
cd out && python3 -m http.server 3000
```

### Port Already in Use

**Symptom**: EADDRINUSE: address already in use
**Solution**: Kill process or use different port
```bash
lsof -ti:3000 | xargs kill -9
```

### Images Not Loading in S3

**Symptom**: 404 errors for images
**Solution**:
- Verify `avatar.png` in S3 bucket root
- Check S3 bucket policy allows public read
- Use browser DevTools to check actual paths

### AWS SSO Authentication Failed

**Symptom**: Deployment fails with authentication error
**Solution**: Re-authenticate with SSO
```bash
aws sso login --profile will-aws-admin
```

## Tool Compatibility

This AGENTS.md file is compatible with:
- Claude Code (via CLAUDE.md symlink)
- Cursor IDE
- GitHub Copilot Workspace
- Aider
- Continue.dev
- Any tool that reads project documentation

For tool-specific features, see tool configuration files:
- `.cursorrules` - Cursor IDE specific rules
- `.aider.conf.yml` - Aider specific configuration

## Version History

- **v1.0** - Initial build with Hero, About, Experience, Footer
- **v1.1** - Standardized on AGENTS.md for all agentic tools

## Additional Resources

- See README.md for user-facing documentation
- See TODO.md for known issues and planned work
- See .beads/ directory for issue tracking data
