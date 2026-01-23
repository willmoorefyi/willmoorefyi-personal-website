#!/usr/bin/env node

/**
 * Deploy personal website to S3
 *
 * Uploads the static build output to S3 bucket and invalidates CloudFront cache.
 * Uses AWS profile: will-aws-admin
 * Bucket: will.moore.fyi
 * Region: us-east-1
 * CloudFront Distribution ID: E10BJV5LJCPKIE
 */

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront';
import { fromIni } from '@aws-sdk/credential-providers';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { lookup } from 'mime-types';

// Configuration
const CONFIG = {
  profile: 'will-aws-admin',
  region: 'us-east-1',
  bucket: 'will.moore.fyi',
  cloudfrontDistributionId: 'E10BJV5LJCPKIE',
  buildDir: 'out',
};

// Cache control settings by file type
const CACHE_CONTROL = {
  html: 'public, max-age=0, must-revalidate',           // HTML files - always fresh
  static: 'public, max-age=31536000, immutable',         // JS, CSS in _next - cache forever
  images: 'public, max-age=31536000, immutable',         // Images - cache forever
  default: 'public, max-age=3600',                       // Everything else - 1 hour
};

/**
 * Get appropriate cache control header for a file
 */
function getCacheControl(filePath) {
  const ext = filePath.split('.').pop().toLowerCase();

  if (ext === 'html') {
    return CACHE_CONTROL.html;
  }

  if (filePath.includes('/_next/') && (ext === 'js' || ext === 'css')) {
    return CACHE_CONTROL.static;
  }

  if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'ico', 'avif'].includes(ext)) {
    return CACHE_CONTROL.images;
  }

  return CACHE_CONTROL.default;
}

/**
 * Recursively get all files in a directory
 */
function getAllFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    if (statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Upload a single file to S3
 */
async function uploadFile(s3Client, localPath, s3Key) {
  const fileContent = readFileSync(localPath);
  const contentType = lookup(localPath) || 'application/octet-stream';
  const cacheControl = getCacheControl(localPath);

  const command = new PutObjectCommand({
    Bucket: CONFIG.bucket,
    Key: s3Key,
    Body: fileContent,
    ContentType: contentType,
    CacheControl: cacheControl,
  });

  await s3Client.send(command);
  console.log(`✓ Uploaded: ${s3Key} (${contentType}, ${cacheControl})`);
}

/**
 * Upload all files from build directory to S3
 */
async function uploadToS3() {
  console.log('\n📦 Uploading to S3...');
  console.log(`   Bucket: ${CONFIG.bucket}`);
  console.log(`   Profile: ${CONFIG.profile}`);
  console.log(`   Region: ${CONFIG.region}\n`);

  // Create S3 client with profile
  const s3Client = new S3Client({
    region: CONFIG.region,
    credentials: fromIni({ profile: CONFIG.profile }),
  });

  // Get all files from build directory
  const files = getAllFiles(CONFIG.buildDir);
  console.log(`Found ${files.length} files to upload\n`);

  // Upload each file
  let uploadCount = 0;
  let errorCount = 0;

  for (const filePath of files) {
    try {
      // Calculate S3 key (relative path from build dir)
      const s3Key = relative(CONFIG.buildDir, filePath).replace(/\\/g, '/');
      await uploadFile(s3Client, filePath, s3Key);
      uploadCount++;
    } catch (error) {
      console.error(`✗ Failed to upload ${filePath}: ${error.message}`);
      errorCount++;
    }
  }

  console.log(`\n✅ Upload complete: ${uploadCount} files uploaded, ${errorCount} errors`);

  if (errorCount > 0) {
    throw new Error(`Upload failed with ${errorCount} errors`);
  }
}

/**
 * Invalidate CloudFront cache
 */
async function invalidateCloudFront() {
  console.log('\n🔄 Invalidating CloudFront cache...');
  console.log(`   Distribution: ${CONFIG.cloudfrontDistributionId}\n`);

  const cloudFrontClient = new CloudFrontClient({
    region: CONFIG.region,
    credentials: fromIni({ profile: CONFIG.profile }),
  });

  const command = new CreateInvalidationCommand({
    DistributionId: CONFIG.cloudfrontDistributionId,
    InvalidationBatch: {
      CallerReference: `personal-website-${Date.now()}`,
      Paths: {
        Quantity: 1,
        Items: ['/*'], // Invalidate everything (root deployment)
      },
    },
  });

  try {
    const response = await cloudFrontClient.send(command);
    console.log(`✅ CloudFront invalidation created: ${response.Invalidation.Id}`);
    console.log(`   Status: ${response.Invalidation.Status}`);
  } catch (error) {
    console.error(`⚠️  CloudFront invalidation failed: ${error.message}`);
    console.error('   Deployment succeeded but cache may not be updated immediately');
  }
}

/**
 * Main deployment function
 */
async function deploy() {
  console.log('🚀 Starting deployment to will.moore.fyi\n');

  try {
    // Check if build directory exists
    try {
      statSync(CONFIG.buildDir);
    } catch {
      throw new Error(`Build directory '${CONFIG.buildDir}' not found. Run 'npm run build' first.`);
    }

    // Upload to S3
    await uploadToS3();

    // Invalidate CloudFront cache
    await invalidateCloudFront();

    console.log('\n✨ Deployment complete!');
    console.log(`🌐 Your website is live at: https://will.moore.fyi\n`);

  } catch (error) {
    console.error('\n❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

// Run deployment
deploy();
