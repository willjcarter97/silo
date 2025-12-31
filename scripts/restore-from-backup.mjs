/**
 * Restore Script - Reverts files from .bak backups
 * 
 * Usage: node scripts/restore-from-backup.mjs
 * 
 * This script finds all .bak files created by replace-image-urls.mjs
 * and restores the original files.
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

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
 * Find all .bak files recursively
 */
function findBackupFiles(dir) {
  const backups = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory() && !item.name.includes('node_modules')) {
      backups.push(...findBackupFiles(fullPath));
    } else if (item.isFile() && item.name.endsWith('.bak')) {
      backups.push(fullPath);
    }
  }
  
  return backups;
}

/**
 * Restore files from backups
 */
function restoreFiles(backupFiles) {
  let restored = 0;
  
  for (const bakPath of backupFiles) {
    const originalPath = bakPath.replace(/\.bak$/, '');
    const relativePath = path.relative(ROOT_DIR, originalPath);
    
    try {
      // Read backup content
      const backupContent = fs.readFileSync(bakPath, 'utf-8');
      
      // Write to original file
      fs.writeFileSync(originalPath, backupContent);
      
      // Delete backup file
      fs.unlinkSync(bakPath);
      
      log(`   ✓ Restored: ${relativePath}`, 'green');
      restored++;
    } catch (error) {
      log(`   ✗ Failed to restore: ${relativePath} - ${error.message}`, 'red');
    }
  }
  
  return restored;
}

function main() {
  log('\n🔄 Restore from Backup', 'cyan');
  log('═'.repeat(50), 'cyan');
  
  // Find all backup files
  const srcBackups = findBackupFiles(path.join(ROOT_DIR, 'src'));
  const scriptBackups = findBackupFiles(path.join(ROOT_DIR, 'scripts'));
  const allBackups = [...srcBackups, ...scriptBackups];
  
  if (allBackups.length === 0) {
    log('\n⚠️  No backup files (.bak) found.', 'yellow');
    log('   Nothing to restore.', 'reset');
    return;
  }
  
  log(`\n📁 Found ${allBackups.length} backup files\n`, 'blue');
  
  // Restore files
  const restored = restoreFiles(allBackups);
  
  log('\n' + '═'.repeat(50), 'cyan');
  log(`📊 Restored ${restored} files`, 'green');
  log('\n✅ Restore complete! Original Cloudinary URLs have been restored.', 'green');
}

main();

