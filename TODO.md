# TODO - Production Readiness Checklist

This document tracks remaining tasks before the site is ready for production deployment to will.moore.fyi.

## Status: 🟡 In Development

**Last Updated**: 2026-01-22

---

## Critical (Must Complete Before Launch)

### Content

- [ ] **Fill in actual work experience** in `/data/experience.ts`
  - [ ] Add all relevant positions (currently has 4 placeholder entries)
  - [ ] Add real dates, companies, roles
  - [ ] Write achievement descriptions with metrics
  - [ ] List actual technologies used
  - [ ] Consider adding company logos to `/public/logos/`

- [ ] **Write personal bio** in `/data/about.ts`
  - [ ] Replace placeholder paragraphs with real story
  - [ ] Update skills/expertise with actual technologies
  - [ ] Add real interests and hobbies

- [ ] **Verify personal information** in components
  - [ ] Confirm name display in `/components/Hero.tsx`
  - [ ] Verify tagline is current and accurate
  - [ ] Double-check social links (GitHub: willmoorefyi, LinkedIn: willmooreio)
  - [ ] Confirm email address (will@moore.fyi)

### Assets

- [ ] **Profile photo review**
  - [ ] Confirm `/public/avatar.png` is the intended photo
  - [ ] Verify image quality and dimensions
  - [ ] Consider professional headshot if needed

- [ ] **Optional: Add company logos**
  - [ ] Create `/public/logos/` directory
  - [ ] Add company logos (PNG/SVG, ~100-200px)
  - [ ] Uncomment `logo` field in experience entries

### Testing

- [ ] **Build and test locally**
  - [ ] Run `npm run build` successfully
  - [ ] Test from `/out` directory with HTTP server
  - [ ] Verify all sections render correctly
  - [ ] Test dark mode toggle
  - [ ] Test on mobile viewport
  - [ ] Test on tablet viewport
  - [ ] Check all animations work smoothly

- [ ] **Cross-browser testing**
  - [ ] Chrome/Edge
  - [ ] Firefox
  - [ ] Safari
  - [ ] Mobile Safari (iOS)
  - [ ] Mobile Chrome (Android)

### Deployment

- [ ] **S3 bucket setup**
  - [ ] Create S3 bucket: `will.moore.fyi`
  - [ ] Enable static website hosting
  - [ ] Set index document: `index.html`
  - [ ] Set error document: `404.html`
  - [ ] Configure bucket policy for public read access
  - [ ] Upload initial build to test

- [ ] **CloudFront configuration** (recommended)
  - [ ] Create CloudFront distribution
  - [ ] Configure origin as S3 website endpoint
  - [ ] Set alternate domain name: `will.moore.fyi`
  - [ ] Request/attach ACM SSL certificate
  - [ ] Configure custom error responses (404 → /404.html)
  - [ ] Set cache behaviors appropriately

- [ ] **DNS configuration**
  - [ ] Route 53 hosted zone for `moore.fyi`
  - [ ] Create A record (Alias) for `will.moore.fyi`
  - [ ] Point to CloudFront distribution (or S3 if not using CloudFront)
  - [ ] Verify DNS propagation

- [ ] **Initial deployment**
  - [ ] Build final version: `npm run build`
  - [ ] Deploy to S3: `aws s3 sync out/ s3://will.moore.fyi --delete`
  - [ ] Test via domain: https://will.moore.fyi
  - [ ] Verify HTTPS works (if using CloudFront)

---

## Important (Should Complete Soon)

### SEO & Meta

- [ ] **Update metadata** in `/app/layout.tsx`
  - [ ] Write descriptive meta description
  - [ ] Add Open Graph tags for social sharing
  - [ ] Add Twitter Card meta tags
  - [ ] Consider adding favicon

- [ ] **Add structured data**
  - [ ] Add JSON-LD schema for Person
  - [ ] Consider schema for Organization (if applicable)

### Accessibility

- [ ] **Review accessibility**
  - [ ] Verify all images have alt text
  - [ ] Check color contrast ratios
  - [ ] Test keyboard navigation
  - [ ] Verify screen reader compatibility
  - [ ] Check focus states on interactive elements

### Performance

- [ ] **Optimize assets**
  - [ ] Compress profile photo if large (recommended: < 200KB)
  - [ ] Compress company logos if using
  - [ ] Consider WebP format for images

- [ ] **Performance audit**
  - [ ] Run Lighthouse audit
  - [ ] Check Core Web Vitals
  - [ ] Verify page load times
  - [ ] Test on slow 3G network

### Analytics

- [ ] **Set up analytics** (optional)
  - [ ] Google Analytics 4
  - [ ] Plausible Analytics
  - [ ] Or other privacy-friendly alternative
  - [ ] Configure cookie consent if required

---

## Nice to Have (Future Enhancements)

### Features

- [ ] **Add more sections**
  - [ ] Projects portfolio section
  - [ ] Blog/articles section
  - [ ] Publications or talks
  - [ ] Testimonials/recommendations
  - [ ] Contact form (would require serverless function)

- [ ] **Resume download**
  - [ ] Create PDF resume
  - [ ] Add download button
  - [ ] Store PDF in `/public/` directory

- [ ] **Enhanced animations**
  - [ ] Add more micro-interactions
  - [ ] Parallax scrolling effects
  - [ ] Smooth scroll to sections

### Content

- [ ] **Professional photography**
  - [ ] Consider professional headshot
  - [ ] Add candid work photos
  - [ ] Screenshots of projects

- [ ] **Extended bio**
  - [ ] Add "What I'm currently learning"
  - [ ] Add "What I'm excited about"
  - [ ] Link to blog posts or articles

### Infrastructure

- [ ] **Automated deployment**
  - [ ] Set up GitHub Actions workflow
  - [ ] Automate S3 sync on push to main
  - [ ] Automate CloudFront invalidation
  - [ ] Add build status badge to README

- [ ] **Monitoring**
  - [ ] Set up CloudWatch alarms for S3/CloudFront
  - [ ] Configure uptime monitoring (UptimeRobot, Pingdom, etc.)
  - [ ] Error tracking (Sentry for client-side errors)

- [ ] **Backup strategy**
  - [ ] S3 versioning enabled
  - [ ] Backup of source code (already in Git)
  - [ ] Backup of content data files

### Development

- [ ] **Fix dev server issue**
  - [ ] Investigate Turbopack compilation hang
  - [ ] Consider alternative Next.js config
  - [ ] Document workaround in README (already done)

- [ ] **CI/CD improvements**
  - [ ] Add pre-commit hooks (Husky)
  - [ ] Add linting in CI
  - [ ] Add TypeScript checking in CI
  - [ ] Add build verification in CI

---

## Known Issues

### Non-Critical Issues

1. **Dev server hangs during compilation**
   - **Impact**: Medium (development experience)
   - **Workaround**: Use production build for testing
   - **Priority**: Low (not affecting production)

2. **Tailwind CSS downgraded from v4 to v3**
   - **Impact**: Low (v3 is stable and feature-complete)
   - **Future**: Upgrade when v4 is more stable with Next.js 16
   - **Priority**: Low

### Resolved Issues

✅ **Static export configuration** - Completed
✅ **Image optimization for static hosting** - Completed
✅ **Module format (ES modules)** - Completed
✅ **Build process working** - Completed

---

## Launch Checklist

Before announcing the site publicly:

1. ✅ Site builds successfully
2. ⏳ All content is accurate and professional
3. ⏳ All links are working (social media, email)
4. ⏳ Site deployed to S3/CloudFront
5. ⏳ Domain points to site correctly
6. ⏳ HTTPS is working
7. ⏳ Mobile responsive verified
8. ⏳ Dark mode works correctly
9. ⏳ Cross-browser tested
10. ⏳ Performance is acceptable (Lighthouse score > 90)
11. ⏳ SEO metadata is complete
12. ⏳ Accessibility reviewed

---

## Post-Launch

After initial launch:

- [ ] Share on social media (LinkedIn, Twitter)
- [ ] Add to email signature
- [ ] Update GitHub profile
- [ ] Monitor analytics (if implemented)
- [ ] Collect feedback from colleagues/friends
- [ ] Plan content updates (quarterly?)

---

## Notes

### Build Output Location

Static files are generated in `/out` directory after running `npm run build`.

### Content Update Workflow

1. Edit `/data/experience.ts` or `/data/about.ts`
2. Run `npm run build`
3. Test locally: `cd out && python3 -m http.server 3000`
4. Deploy: `aws s3 sync out/ s3://will.moore.fyi --delete`
5. Invalidate CloudFront cache (if using)

### Cost Estimate

- S3: < $0.10/month (storage + requests)
- CloudFront: Free tier (up to 1TB/month)
- Route 53: $0.50/month
- Total: < $1/month

---

**Next Action**: Fill in personal content in `/data/` files
