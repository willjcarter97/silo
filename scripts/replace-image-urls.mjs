/**
 * URL Replacement Script
 * 
 * This script reads the image-url-mapping.json file and replaces
 * all old Cloudinary URLs with new Prismic URLs in the source files.
 * 
 * Usage: node scripts/replace-image-urls.mjs
 * 
 * Options:
 *   --dry-run    Preview changes without modifying files
 *   --backup     Create .bak files before modifying
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Configuration
const CONFIG = {
  sourceDir: path.join(ROOT_DIR, 'src'),
  scriptsDir: path.join(ROOT_DIR, 'scripts'),
  mappingFile: path.join(ROOT_DIR, 'scripts', 'image-url-mapping.json'),
  fileExtensions: ['.jsx', '.js', '.tsx', '.ts', '.mjs'],
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const createBackup = args.includes('--backup');

/**
 * Load the URL mapping file
 */
function loadMapping() {
  if (!fs.existsSync(CONFIG.mappingFile)) {
    log('❌ Error: image-url-mapping.json not found!', 'red');
    log('   Run migrate-images-to-prismic.mjs first.', 'yellow');
    process.exit(1);
  }
  
  const content = fs.readFileSync(CONFIG.mappingFile, 'utf-8');
  const mapping = JSON.parse(content);
  
  // Validate mapping - filter out incomplete entries
  const validMapping = {};
  const incompleteUrls = [];
  
  for (const [oldUrl, newValue] of Object.entries(mapping)) {
    // Handle both string URLs and object format
    let newUrl = typeof newValue === 'string' ? newValue : newValue.prismicUrl;
    
    if (newUrl && !newUrl.startsWith('//') && newUrl.startsWith('http')) {
      validMapping[oldUrl] = newUrl;
    } else {
      incompleteUrls.push(oldUrl);
    }
  }
  
  if (incompleteUrls.length > 0) {
    log(`⚠️  Warning: ${incompleteUrls.length} URLs still need Prismic URLs assigned:`, 'yellow');
    incompleteUrls.slice(0, 5).forEach(url => {
      const shortUrl = url.length > 60 ? url.substring(0, 60) + '...' : url;
      log(`   - ${shortUrl}`, 'gray');
    });
    if (incompleteUrls.length > 5) {
      log(`   ... and ${incompleteUrls.length - 5} more`, 'gray');
    }
  }
  
  return validMapping;
}

/**
 * Find all source files
 */
function findSourceFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory() && !item.name.includes('node_modules')) {
      files.push(...findSourceFiles(fullPath));
    } else if (item.isFile() && CONFIG.fileExtensions.some(ext => item.name.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  
  return files;
}

/**
 * Replace URLs in a file
 */
function replaceUrlsInFile(filePath, mapping) {
  const originalContent = fs.readFileSync(filePath, 'utf-8');
  let newContent = originalContent;
  let replacements = 0;
  const changes = [];
  
  for (const [oldUrl, newUrl] of Object.entries(mapping)) {
    // Count occurrences before replacement
    const regex = new RegExp(escapeRegex(oldUrl), 'g');
    const matches = newContent.match(regex);
    
    if (matches) {
      replacements += matches.length;
      changes.push({
        from: oldUrl.substring(0, 50) + '...',
        to: newUrl.substring(0, 50) + '...',
        count: matches.length,
      });
      newContent = newContent.replace(regex, newUrl);
    }
  }
  
  if (replacements > 0) {
    if (!isDryRun) {
      // Create backup if requested
      if (createBackup) {
        fs.writeFileSync(filePath + '.bak', originalContent);
      }
      
      // Write the new content
      fs.writeFileSync(filePath, newContent);
    }
    
    return { modified: true, replacements, changes };
  }
  
  return { modified: false, replacements: 0, changes: [] };
}

/**
 * Escape special regex characters
 */
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Main execution
 */
function main() {
  log('\n🔄 URL Replacement Script', 'cyan');
  log('═'.repeat(50), 'cyan');
  
  if (isDryRun) {
    log('   Running in DRY RUN mode - no files will be modified', 'yellow');
  }
  if (createBackup) {
    log('   Backup mode enabled - .bak files will be created', 'yellow');
  }
  
  // Load mapping
  const mapping = loadMapping();
  const mappingCount = Object.keys(mapping).length;
  
  if (mappingCount === 0) {
    log('\n❌ No valid URL mappings found!', 'red');
    log('   Please update image-url-mapping.json with Prismic URLs.', 'yellow');
    process.exit(1);
  }
  
  log(`\n📄 Loaded ${mappingCount} URL mappings`, 'green');
  
  // Find all source files
  const sourceFiles = [
    ...findSourceFiles(CONFIG.sourceDir),
    ...(fs.existsSync(CONFIG.scriptsDir) ? findSourceFiles(CONFIG.scriptsDir) : []),
  ];
  
  log(`📁 Found ${sourceFiles.length} source files to process\n`, 'blue');
  
  // Process each file
  let totalReplacements = 0;
  let modifiedFiles = 0;
  
  for (const filePath of sourceFiles) {
    const result = replaceUrlsInFile(filePath, mapping);
    
    if (result.modified) {
      const relativePath = path.relative(ROOT_DIR, filePath);
      const action = isDryRun ? 'Would modify' : 'Modified';
      log(`   ✓ ${action}: ${relativePath} (${result.replacements} URLs)`, 'green');
      
      totalReplacements += result.replacements;
      modifiedFiles++;
    }
  }
  
  // Summary
  log('\n' + '═'.repeat(50), 'cyan');
  log('📊 Summary', 'cyan');
  log(`   Files ${isDryRun ? 'that would be ' : ''}modified: ${modifiedFiles}`, 'reset');
  log(`   Total URLs ${isDryRun ? 'that would be ' : ''}replaced: ${totalReplacements}`, 'reset');
  
  if (isDryRun) {
    log('\n💡 Run without --dry-run to apply changes', 'yellow');
  } else if (modifiedFiles > 0) {
    log('\n✅ URL replacement complete!', 'green');
    log('   Remember to test your application to verify all images load correctly.', 'yellow');
  } else {
    log('\n⚠️  No replacements made. Check your mapping file.', 'yellow');
  }
}

main();


