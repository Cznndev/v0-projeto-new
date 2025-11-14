import fs from 'fs';
import path from 'path';

const colorMappings: Record<string, string> = {
  'bg-nam-navy': 'bg-infinity-charcoal',
  'bg-nam-blue': 'bg-infinity-copper',
  'bg-nam-teal': 'bg-infinity-mint',
  'bg-nam-light': 'bg-infinity-white',
  'text-nam-navy': 'text-infinity-charcoal',
  'text-nam-blue': 'text-infinity-copper',
  'text-nam-teal': 'text-infinity-mint',
  'text-nam-light': 'text-infinity-white',
  'text-nam-gray': 'text-infinity-charcoal',
  'border-nam-teal': 'border-infinity-mint',
  'border-nam-gray': 'border-infinity-charcoal',
  'hover:bg-nam-teal': 'hover:bg-infinity-mint',
  'hover:bg-nam-blue': 'hover:bg-infinity-copper',
  'hover:text-nam-teal': 'hover:text-infinity-mint',
  'focus:border-nam-teal': 'focus:border-infinity-mint',
  'dark:text-nam-light': 'dark:text-infinity-white',
  'dark:bg-nam-gray-dark': 'dark:bg-infinity-charcoal',
};

function replaceInFile(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  let newContent = content;
  
  for (const [oldColor, newColor] of Object.entries(colorMappings)) {
    newContent = newContent.replace(new RegExp(oldColor, 'g'), newColor);
  }
  
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Updated: ${filePath}`);
  }
}

function walkDir(dir: string) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!['node_modules', '.next', '.git'].includes(file)) {
        walkDir(filePath);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
      replaceInFile(filePath);
    }
  }
}

const rootDir = process.cwd();
walkDir(rootDir);
console.log('Color replacement complete!');
