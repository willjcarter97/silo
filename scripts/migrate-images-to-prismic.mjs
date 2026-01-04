/**
 * Image Migration Script: Cloudinary → Prismic
 * 
 * This script will:
 * 1. Scan the codebase for all Cloudinary image URLs
 * 2. Download each unique image
 * 3. Upload them to Prismic's Media Library
 * 4. Generate a mapping file for updating the codebase
 * 
 * SETUP:
 * 1. Get your Prismic Write API token from: https://silosite.prismic.io/settings/apps/
 * 2. Create a .env file with: PRISMIC_WRITE_TOKEN=your_token_here
 * 3. Run: node scripts/migrate-images-to-prismic.mjs
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Configuration
const CONFIG = {
  prismicRepo: 'silosite',
  sourceDir: path.join(ROOT_DIR, 'src'),
  scriptsDir: path.join(ROOT_DIR, 'scripts'),
  downloadDir: path.join(ROOT_DIR, 'migrated-images'),
  mappingFile: path.join(ROOT_DIR, 'scripts', 'image-url-mapping.json'),
  cloudinaryPattern: /https:\/\/res\.cloudinary\.com\/[^"'\s)]+\.(png|jpg|jpeg|gif|webp|svg)/gi,
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Step 1: Scan codebase and extract all Cloudinary URLs
 */
function extractCloudinaryUrls() {
  log('\n📋 Step 1: Scanning codebase for Cloudinary URLs...', 'blue');
  
  const urls = new Set();
  const fileExtensions = ['.jsx', '.js', '.tsx', '.ts', '.mjs'];
  
  function scanDirectory(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory() && !item.name.includes('node_modules')) {
        scanDirectory(fullPath);
      } else if (item.isFile() && fileExtensions.some(ext => item.name.endsWith(ext))) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const matches = content.match(CONFIG.cloudinaryPattern);
        
        if (matches) {
          matches.forEach(url => urls.add(url));
        }
      }
    }
  }
  
  // Scan both src and scripts directories
  scanDirectory(CONFIG.sourceDir);
  if (fs.existsSync(CONFIG.scriptsDir)) {
    scanDirectory(CONFIG.scriptsDir);
  }
  
  const urlList = Array.from(urls);
  log(`   Found ${urlList.length} unique Cloudinary URLs`, 'green');
  
  return urlList;
}

/**
 * Step 2: Download all images locally
 */
async function downloadImages(urls) {
  log('\n📥 Step 2: Downloading images...', 'blue');
  
  // Create download directory
  if (!fs.existsSync(CONFIG.downloadDir)) {
    fs.mkdirSync(CONFIG.downloadDir, { recursive: true });
  }
  
  const downloaded = [];
  
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    
    // Create a clean filename from the URL
    // Format: version_originalname.ext (e.g., v1765878090_Vector_1_g3nkgs.png)
    const filename = pathParts.slice(-2).join('_').replace(/[^a-zA-Z0-9._-]/g, '_');
    const localPath = path.join(CONFIG.downloadDir, filename);
    
    try {
      // Check if already downloaded
      if (fs.existsSync(localPath)) {
        log(`   [${i + 1}/${urls.length}] Already exists: ${filename}`, 'yellow');
        downloaded.push({ url, localPath, filename, status: 'cached' });
        continue;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const buffer = await response.arrayBuffer();
      fs.writeFileSync(localPath, Buffer.from(buffer));
      
      log(`   [${i + 1}/${urls.length}] Downloaded: ${filename}`, 'green');
      downloaded.push({ url, localPath, filename, status: 'downloaded' });
      
      // Small delay to be nice to Cloudinary
      await new Promise(r => setTimeout(r, 100));
      
    } catch (error) {
      log(`   [${i + 1}/${urls.length}] Failed: ${filename} - ${error.message}`, 'red');
      downloaded.push({ url, localPath, filename, status: 'failed', error: error.message });
    }
  }
  
  const successCount = downloaded.filter(d => d.status !== 'failed').length;
  log(`   Downloaded ${successCount}/${urls.length} images successfully`, 'green');
  
  return downloaded;
}

/**
 * Step 3: Upload to Prismic Media Library
 * 
 * NOTE: Prismic's Asset API requires the Migration API for programmatic uploads.
 * You'll need a write access token from your Prismic repository settings.
 */
async function uploadToPrismic(downloadedImages, writeToken) {
  log('\n☁️ Step 3: Uploading to Prismic Media Library...', 'blue');
  
  if (!writeToken) {
    log('   ⚠️  No PRISMIC_WRITE_TOKEN found. Generating manual upload guide...', 'yellow');
    return generateManualUploadGuide(downloadedImages);
  }
  
  const uploaded = [];
  const migrationApi = `https://migration.prismic.io`;
  
  for (let i = 0; i < downloadedImages.length; i++) {
    const image = downloadedImages[i];
    
    if (image.status === 'failed') continue;
    
    try {
      // Read the file
      const fileBuffer = fs.readFileSync(image.localPath);
      const fileBlob = new Blob([fileBuffer]);
      
      // Get the correct content type
      const ext = path.extname(image.filename).toLowerCase();
      const contentTypes = {
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
        '.svg': 'image/svg+xml',
      };
      
      // Upload to Prismic Migration API
      const response = await fetch(`${migrationApi}/assets`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${writeToken}`,
          'x-api-key': writeToken,
          'repository': CONFIG.prismicRepo,
          'Content-Type': contentTypes[ext] || 'image/png',
        },
        body: fileBuffer,
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      const result = await response.json();
      
      uploaded.push({
        oldUrl: image.url,
        newUrl: result.url,
        assetId: result.id,
        status: 'uploaded',
      });
      
      log(`   [${i + 1}/${downloadedImages.length}] Uploaded: ${image.filename}`, 'green');
      
      // Rate limiting
      await new Promise(r => setTimeout(r, 500));
      
    } catch (error) {
      log(`   [${i + 1}/${downloadedImages.length}] Failed: ${image.filename} - ${error.message}`, 'red');
      uploaded.push({
        oldUrl: image.url,
        newUrl: null,
        status: 'failed',
        error: error.message,
      });
    }
  }
  
  return uploaded;
}

/**
 * Generate a guide for manual upload if no API token is available
 */
function generateManualUploadGuide(downloadedImages) {
  log('\n📖 Generating manual upload guide...', 'cyan');
  
  const guide = `
================================================================================
                    PRISMIC IMAGE MIGRATION - MANUAL UPLOAD GUIDE
================================================================================

Since no PRISMIC_WRITE_TOKEN was provided, here's how to complete the migration:

STEP 1: Access Prismic Media Library
--------------------------------------
1. Go to: https://silosite.prismic.io/media
2. Log in with your Prismic credentials

STEP 2: Upload Images
--------------------------------------
1. Open the 'migrated-images' folder in this project
2. Select all ${downloadedImages.filter(d => d.status !== 'failed').length} images
3. Drag and drop them into the Prismic Media Library

STEP 3: Get New URLs and Update Mapping
--------------------------------------
After uploading, for each image:
1. Click on the image in Prismic
2. Copy the URL (usually in format: https://images.prismic.io/silosite/...)
3. Update the 'image-url-mapping.json' file with the new URLs

STEP 4: Run the URL Replacement Script
--------------------------------------
Once you've updated the mapping file, run:
  node scripts/replace-image-urls.mjs

This will automatically update all source files with the new Prismic URLs.

================================================================================
                              DOWNLOADED IMAGES
================================================================================

Total images: ${downloadedImages.length}
Successfully downloaded: ${downloadedImages.filter(d => d.status !== 'failed').length}
Failed: ${downloadedImages.filter(d => d.status === 'failed').length}

Location: ${CONFIG.downloadDir}

================================================================================
`;
  
  // Save the guide
  const guidePath = path.join(ROOT_DIR, 'PRISMIC_MIGRATION_GUIDE.txt');
  fs.writeFileSync(guidePath, guide);
  log(`   Guide saved to: PRISMIC_MIGRATION_GUIDE.txt`, 'green');
  
  // Create initial mapping file
  const mapping = downloadedImages.reduce((acc, img) => {
    if (img.status !== 'failed') {
      acc[img.url] = {
        localFile: img.filename,
        prismicUrl: '// TODO: Add Prismic URL after manual upload',
      };
    }
    return acc;
  }, {});
  
  fs.writeFileSync(CONFIG.mappingFile, JSON.stringify(mapping, null, 2));
  log(`   Mapping template saved to: scripts/image-url-mapping.json`, 'green');
  
  return [];
}

/**
 * Step 4: Generate mapping file for URL replacement
 */
function generateMapping(uploadResults, downloadedImages) {
  log('\n📄 Step 4: Generating URL mapping file...', 'blue');
  
  let mapping;
  
  if (uploadResults.length > 0) {
    // If we have upload results, use those
    mapping = uploadResults.reduce((acc, result) => {
      if (result.newUrl) {
        acc[result.oldUrl] = result.newUrl;
      }
      return acc;
    }, {});
  } else {
    // Create a template mapping for manual completion
    mapping = downloadedImages.reduce((acc, img) => {
      if (img.status !== 'failed') {
        acc[img.url] = `// TODO: Replace with Prismic URL for ${img.filename}`;
      }
      return acc;
    }, {});
  }
  
  fs.writeFileSync(CONFIG.mappingFile, JSON.stringify(mapping, null, 2));
  log(`   Mapping saved to: ${CONFIG.mappingFile}`, 'green');
  
  return mapping;
}

/**
 * Generate summary report
 */
function generateReport(urls, downloadedImages, uploadResults) {
  log('\n📊 Migration Summary', 'cyan');
  log('═'.repeat(50), 'cyan');
  log(`   Total Cloudinary URLs found: ${urls.length}`, 'reset');
  log(`   Images downloaded: ${downloadedImages.filter(d => d.status !== 'failed').length}`, 'reset');
  log(`   Images failed to download: ${downloadedImages.filter(d => d.status === 'failed').length}`, 'reset');
  
  if (uploadResults.length > 0) {
    log(`   Images uploaded to Prismic: ${uploadResults.filter(u => u.status === 'uploaded').length}`, 'reset');
    log(`   Images failed to upload: ${uploadResults.filter(u => u.status === 'failed').length}`, 'reset');
  }
  
  log('═'.repeat(50), 'cyan');
  
  // List affected files
  log('\n📁 Files containing Cloudinary URLs:', 'yellow');
  const fileExtensions = ['.jsx', '.js', '.tsx', '.ts', '.mjs'];
  
  function findFilesWithUrls(dir) {
    const files = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory() && !item.name.includes('node_modules')) {
        files.push(...findFilesWithUrls(fullPath));
      } else if (item.isFile() && fileExtensions.some(ext => item.name.endsWith(ext))) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const matches = content.match(CONFIG.cloudinaryPattern);
        
        if (matches) {
          files.push({
            path: path.relative(ROOT_DIR, fullPath),
            count: matches.length,
          });
        }
      }
    }
    
    return files;
  }
  
  const affectedFiles = [
    ...findFilesWithUrls(CONFIG.sourceDir),
    ...(fs.existsSync(CONFIG.scriptsDir) ? findFilesWithUrls(CONFIG.scriptsDir) : []),
  ];
  
  affectedFiles.forEach(f => {
    log(`   - ${f.path} (${f.count} URLs)`, 'reset');
  });
}

// Main execution
async function main() {
  log('\n🚀 Starting Cloudinary → Prismic Migration', 'cyan');
  log('═'.repeat(50), 'cyan');
  
  // Check for write token
  let writeToken = process.env.PRISMIC_WRITE_TOKEN;
  
  // Try to load from .env file if exists
  const envPath = path.join(ROOT_DIR, '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const match = envContent.match(/PRISMIC_WRITE_TOKEN=(.+)/);
    if (match) {
      writeToken = match[1].trim();
    }
  }
  
  // Step 1: Extract URLs
  const urls = extractCloudinaryUrls();
  
  if (urls.length === 0) {
    log('\n✅ No Cloudinary URLs found. Nothing to migrate!', 'green');
    return;
  }
  
  // Step 2: Download images
  const downloadedImages = await downloadImages(urls);
  
  // Step 3: Upload to Prismic (or generate manual guide)
  const uploadResults = await uploadToPrismic(downloadedImages, writeToken);
  
  // Step 4: Generate mapping
  generateMapping(uploadResults, downloadedImages);
  
  // Generate report
  generateReport(urls, downloadedImages, uploadResults);
  
  log('\n✅ Migration process complete!', 'green');
  log('\nNext steps:', 'yellow');
  
  if (!writeToken) {
    log('   1. Review PRISMIC_MIGRATION_GUIDE.txt for manual upload instructions', 'reset');
    log('   2. Upload images from the "migrated-images" folder to Prismic', 'reset');
    log('   3. Update scripts/image-url-mapping.json with new Prismic URLs', 'reset');
    log('   4. Run: node scripts/replace-image-urls.mjs', 'reset');
  } else {
    log('   1. Review scripts/image-url-mapping.json', 'reset');
    log('   2. Run: node scripts/replace-image-urls.mjs to update all source files', 'reset');
  }
}

main().catch(console.error);






