# Deployment Guide

This guide explains how to deploy your personal website to AWS S3 with CloudFront.

## Quick Deploy

Deploy to production with two commands:

```bash
# 1. Authenticate with AWS SSO (required before each deployment)
aws sso login --profile will-aws-admin

# 2. Deploy to production
npm run deploy
```

This will:
1. Build the static site (`npm run build`)
2. Upload all files to S3 bucket `will.moore.fyi` at the root
3. Invalidate CloudFront cache for immediate updates

## Deployment Commands

### Full Deployment (Build + Deploy)
```bash
npm run deploy
```
Builds the site and deploys to S3. **Use this for most deployments.**

### Deploy Only (Skip Build)
```bash
npm run deploy:only
```
Deploys existing `/out` directory to S3 without rebuilding. Useful if you just ran `npm run build`.

## Configuration

Deployment uses the following configuration:

| Setting | Value |
|---------|-------|
| **AWS Profile** | `will-aws-admin` |
| **Region** | `us-east-1` |
| **S3 Bucket** | `will.moore.fyi` |
| **CloudFront Distribution** | `E10BJV5LJCPKIE` |
| **Website URL** | https://will.moore.fyi |

## Prerequisites

### 1. AWS SSO Configuration

Ensure your `~/.aws/config` file has the `will-aws-admin` profile configured for SSO:

```ini
[profile will-aws-admin]
sso_start_url = https://your-org.awsapps.com/start
sso_region = us-east-1
sso_account_id = YOUR_ACCOUNT_ID
sso_role_name = YOUR_ROLE_NAME
region = us-east-1
```

### 2. AWS SSO Authentication

Before each deployment session, authenticate with AWS SSO:

```bash
aws sso login --profile will-aws-admin
```

This will open your browser for authentication. The session typically lasts several hours.

**Tip**: If you get authentication errors during deployment, your SSO session may have expired. Simply run `aws sso login` again.

### 3. AWS Permissions

The `will-aws-admin` profile needs:
- **S3**: `s3:PutObject` on `will.moore.fyi` bucket
- **CloudFront**: `cloudfront:CreateInvalidation` on distribution `E10BJV5LJCPKIE`

## Cache Control Strategy

The deployment script sets appropriate cache headers:

| File Type | Cache Control | Duration |
|-----------|---------------|----------|
| **HTML files** | `max-age=0, must-revalidate` | Always fresh |
| **Static assets** (`_next/*.js`, `_next/*.css`) | `max-age=31536000, immutable` | 1 year (hashed filenames) |
| **Images** | `max-age=31536000, immutable` | 1 year |
| **Other files** | `max-age=3600` | 1 hour |

This ensures:
- ✅ Users always get the latest HTML
- ✅ Static assets are cached aggressively (safe due to hashing)
- ✅ CloudFront invalidation updates content immediately

## Deployment Process

When you run `npm run deploy`:

### 1. Build Phase
```bash
npm run build
```
- Next.js generates static files in `/out` directory
- All pages pre-rendered as HTML
- Assets bundled and optimized

### 2. Upload Phase
```
📦 Uploading to S3...
   Bucket: will.moore.fyi
   Profile: will-aws-admin
   Region: us-east-1

✓ Uploaded: index.html
✓ Uploaded: 404.html
✓ Uploaded: avatar.png
✓ Uploaded: _next/static/chunks/...
✓ Uploaded: logos/aws.svg
...
✅ Upload complete: 150 files uploaded
```

Files are uploaded to the **root** of the bucket:
- `index.html` → https://will.moore.fyi/
- `avatar.png` → https://will.moore.fyi/avatar.png
- `_next/...` → https://will.moore.fyi/_next/...

### 3. Invalidation Phase
```
🔄 Invalidating CloudFront cache...
   Distribution: E10BJV5LJCPKIE

✅ CloudFront invalidation created: I2EXAMPLE
   Status: InProgress
```

CloudFront invalidates `/*` (all paths) to ensure visitors see the latest version.

## Troubleshooting

### Error: "Unable to locate credentials" or "Token has expired"

**Cause**: AWS SSO session has expired or you haven't logged in yet.

**Solution**:
```bash
# Re-authenticate with AWS SSO
aws sso login --profile will-aws-admin

# Then retry deployment
npm run deploy
```

**Tip**: SSO sessions typically last several hours. If you see authentication errors, this is the first thing to check.

### Error: "Build directory 'out' not found"

**Solution**: Run `npm run build` first, or use `npm run deploy` instead of `npm run deploy:only`

### Error: "Access denied to S3 bucket"

**Causes**:
1. AWS SSO session expired (most common)
2. AWS profile not configured
3. Insufficient S3 permissions

**Solution**:
```bash
# 1. First, try re-authenticating with SSO
aws sso login --profile will-aws-admin

# 2. Verify profile exists
aws configure list --profile will-aws-admin

# 3. Test S3 access
aws s3 ls s3://will.moore.fyi --profile will-aws-admin
```

### Error: "CloudFront invalidation failed"

**Impact**: Site deployed successfully, but cached content may not update immediately.

**Solution**:
- Wait 5-10 minutes for TTL to expire
- Or manually create invalidation in AWS Console

### Files Not Updating on Website

**Cause**: Browser cache or CloudFront cache not cleared

**Solutions**:
1. Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. Open in incognito/private window
3. Check CloudFront invalidation status in AWS Console

## Manual Deployment (Alternative)

If npm scripts don't work, deploy manually:

### 1. Build
```bash
npm run build
```

### 2. Upload to S3
```bash
cd out
aws s3 sync . s3://will.moore.fyi \
  --profile will-aws-admin \
  --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "*.html"

# Upload HTML files with different cache
aws s3 sync . s3://will.moore.fyi \
  --profile will-aws-admin \
  --exclude "*" \
  --include "*.html" \
  --cache-control "public, max-age=0, must-revalidate"
```

### 3. Invalidate CloudFront
```bash
aws cloudfront create-invalidation \
  --distribution-id E10BJV5LJCPKIE \
  --paths "/*" \
  --profile will-aws-admin
```

## Deployment Checklist

Before deploying to production:

- [ ] **Authenticate with AWS SSO**: `aws sso login --profile will-aws-admin`
- [ ] Updated content in `/data/experience.ts` and `/data/about.ts`
- [ ] Tested locally with `npm run build` and served from `/out`
- [ ] Checked all links work
- [ ] Verified dark mode works
- [ ] Tested on mobile viewport
- [ ] Reviewed for typos and accuracy

## Continuous Deployment (Future)

Consider setting up GitHub Actions for automatic deployment on push to `main`:

```yaml
# .github/workflows/deploy.yml
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
      - run: npm run deploy
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

## Monitoring

After deployment:
- ✅ Visit https://will.moore.fyi to verify
- ✅ Check CloudWatch for S3 request metrics
- ✅ Monitor CloudFront traffic in AWS Console

## Cost

Estimated monthly cost for personal website:
- **S3 Storage**: ~$0.02 (for ~1 MB)
- **S3 Requests**: ~$0.01
- **CloudFront**: Free tier (up to 1TB transfer)
- **Total**: < $0.05/month

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `aws sso login --profile will-aws-admin` | Authenticate with AWS SSO (required first) |
| `npm run build` | Build static site to `/out` |
| `npm run deploy` | Build and deploy to production |
| `npm run deploy:only` | Deploy without rebuilding |

**Production URL**: https://will.moore.fyi

**Important**: Always run `aws sso login --profile will-aws-admin` before deploying if your session has expired.

For issues, check CloudWatch logs or S3 bucket access logs.
