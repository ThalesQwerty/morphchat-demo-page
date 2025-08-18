import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function copyScssFiles(sourceDir, targetDir) {
  if (!fs.existsSync(sourceDir)) {
    console.log(`Source directory ${sourceDir} does not exist`);
    return;
  }

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  function copyRecursive(src, dest) {
    const items = fs.readdirSync(src);
    
    for (const item of items) {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);
      
      const stat = fs.statSync(srcPath);
      
      if (stat.isDirectory()) {
        if (!fs.existsSync(destPath)) {
          fs.mkdirSync(destPath, { recursive: true });
        }
        copyRecursive(srcPath, destPath);
      } else if (item.endsWith('.scss')) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied: ${srcPath} -> ${destPath}`);
      }
    }
  }

  copyRecursive(sourceDir, targetDir);
}

// Copy SCSS files from src/lib to dist
const sourceDir = path.join(__dirname, '..', 'src', 'lib');
const targetDir = path.join(__dirname, '..', 'dist');

console.log('Copying SCSS files...');
copyScssFiles(sourceDir, targetDir);
console.log('SCSS files copied successfully!');
