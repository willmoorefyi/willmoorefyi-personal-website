# Will Moore - Personal Website

A modern, animated personal portfolio website built with Next.js, configured for static export and S3 hosting.

## Features

✨ **Bold & Modern Design** - Vibrant gradients and smooth animations
🎨 **Dark Mode** - Automatic system detection with manual toggle
📱 **Fully Responsive** - Beautiful on mobile, tablet, and desktop
⚡ **Static Export** - No server required, perfect for S3 hosting
🎭 **Framer Motion** - Smooth scroll-based animations

## Tech Stack

- **Next.js 16** - React framework with static export
- **TypeScript** - Type safety
- **Tailwind CSS 3** - Utility-first styling
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **React Icons** - Social media icons

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development

**Note:** The dev server (`npm run dev`) may have issues with Turbopack compilation. Use production build for testing:

```bash
# Build the static site
npm run build

# Test locally with a simple HTTP server
cd out
python3 -m http.server 3000

# Or use any static server
npx serve out
```

Visit http://localhost:3000 to view the site.

### Production Build

```bash
# Build static site for deployment
npm run build
```

This generates all static files in the `/out` directory, ready for S3 or any static host.

## Project Structure

```
personal-website/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page (combines all sections)
│   ├── layout.tsx         # Root layout with theme toggle
│   └── globals.css        # Global styles and Tailwind imports
├── components/            # React components
│   ├── Hero.tsx          # Hero section with profile photo
│   ├── About.tsx         # About section with bio/skills
│   ├── Experience.tsx    # Work experience timeline
│   ├── Footer.tsx        # Footer with social links
│   └── ThemeToggle.tsx   # Dark mode toggle button
├── data/                  # Content files (EDIT THESE!)
│   ├── experience.ts     # Work experience data
│   └── about.ts          # About section content
├── public/               # Static assets
│   └── avatar.png        # Profile photo
├── out/                  # Generated static site (after build)
└── [config files]        # Next.js, TypeScript, Tailwind configs
```

## Customizing Content

### 1. Work Experience (`/data/experience.ts`)

Edit this file to add your work history:

```typescript
{
  id: 1,
  company: "Company Name",
  role: "Your Role",
  startDate: "2020-01",        // Format: YYYY-MM
  endDate: "Present",          // Or YYYY-MM
  location: "City, State",
  description: "Brief description of your role and team",
  achievements: [
    "Key achievement with metrics (e.g., 'Reduced latency by 40%')",
    "Leadership accomplishment",
    "Technical initiative",
  ],
  technologies: ["AWS", "TypeScript", "React"],
  logo: "/logos/company.png"   // Optional: add company logo
}
```

**Adding Company Logos (Optional):**
1. Create `/public/logos/` directory
2. Add logo images (PNG or SVG)
3. Reference in the `logo` field

### 2. About Section (`/data/about.ts`)

Update your bio, skills, and interests:

```typescript
export const aboutData = {
  bio: {
    paragraphs: [
      "Your story and background...",
      "Additional context...",
    ]
  },
  skills: [
    {
      category: "Languages",
      items: ["TypeScript", "Python", "Go"]
    },
    // Add more categories
  ],
  interests: [
    "Open Source",
    "Photography",
    // Add your interests
  ]
}
```

### 3. Profile Photo

Replace `/public/avatar.png` with your photo:
- Use a square image (recommended: 512x512px or larger)
- Keep filename as `avatar.png`, or update path in `/components/Hero.tsx` (line ~154)

### 4. Personal Information

Update your details in `/components/Hero.tsx` and `/components/Footer.tsx`:
- Name
- Tagline/Title
- Social media links (GitHub, LinkedIn)
- Email address

## Deployment to S3

This site is configured for S3 static hosting.

### Quick Deploy

```bash
# Build the site
npm run build

# Deploy to S3 (replace with your bucket name)
aws s3 sync out/ s3://will.moore.fyi --delete

# Set cache headers for assets
aws s3 sync out/_next/ s3://will.moore.fyi/_next/ \
  --cache-control "public, max-age=31536000, immutable" \
  --delete

# Set cache headers for HTML
aws s3 sync out/ s3://will.moore.fyi \
  --exclude "*" \
  --include "*.html" \
  --cache-control "public, max-age=0, must-revalidate"
```

### S3 Bucket Configuration

#### Enable Static Website Hosting

1. Go to S3 Console → Your bucket → Properties
2. Enable "Static website hosting"
3. Set **Index document**: `index.html`
4. Set **Error document**: `404.html`

#### Bucket Policy (Public Access)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::will.moore.fyi/*"
    }
  ]
}
```

### CloudFront Setup (Recommended)

For HTTPS and global CDN:

1. **Create CloudFront Distribution**
   - Origin: S3 bucket website endpoint
   - Viewer Protocol Policy: Redirect HTTP to HTTPS
   - Alternate Domain Names: `will.moore.fyi`
   - SSL Certificate: Use ACM certificate

2. **Configure Custom Error Responses**
   - Error Code: 404
   - Response Page Path: `/404.html`
   - HTTP Response Code: 404

3. **Route 53 DNS**
   - Create A record (Alias)
   - Point to CloudFront distribution

### Automated Deployment with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to S3

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - run: npm install
      - run: npm run build

      - name: Deploy to S3
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: aws s3 sync out/ s3://will.moore.fyi --delete

      - name: Invalidate CloudFront
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          aws cloudfront create-invalidation \
            --distribution-id YOUR_DISTRIBUTION_ID \
            --paths "/*"
```

## Development Workflow

1. **Edit content** in `/data/` files
2. **Build** with `npm run build`
3. **Test locally** from the `/out` directory
4. **Deploy** to S3
5. **(Optional)** Invalidate CloudFront cache

## Customization

### Colors

The site uses blue → purple → pink gradients. To customize:

```typescript
// In component files, change Tailwind classes:
"from-blue-600 to-purple-600"  // Blue to purple
"from-purple-600 to-pink-600"  // Purple to pink
"from-orange-600 to-red-600"   // Orange to red
```

### Animations

Animations use Framer Motion. Adjust in component files:

```typescript
initial={{ opacity: 0, y: 20 }}     // Starting state
whileInView={{ opacity: 1, y: 0 }}  // End state
transition={{ duration: 0.6 }}      // Timing
```

### Add New Sections

1. Create component in `/components/`
2. Import and add to `/app/page.tsx`
3. Rebuild and deploy

## Troubleshooting

### Dev Server Hanging

The Next.js dev server may hang during compilation with Turbopack. Use production build for testing:

```bash
npm run build
cd out && python3 -m http.server 3000
```

### CSS/JS Not Loading in S3

- Verify all files in `_next/` are uploaded
- Check S3 bucket permissions
- Ensure bucket policy allows public read

### Images Not Showing

- Confirm `avatar.png` is in S3 bucket root
- Check browser DevTools for 404 errors
- Verify image paths in components

### Dark Mode Not Working

The theme toggle uses localStorage and system preferences:
- Check browser console for errors
- Verify `ThemeToggle` component is in layout

## Cost Estimate (AWS)

- **S3 Storage**: ~$0.023/GB/month (site is 1-5 MB)
- **S3 Requests**: Negligible for personal sites
- **CloudFront**: Free tier covers most personal sites
- **Route 53**: $0.50/month per hosted zone

**Total**: Less than $1/month

## License

MIT License - Feel free to use this template for your own site!

## Support

For issues or questions, see `TODO.md` for known limitations and `CLAUDE.md` for LLM-assisted development guidance.
