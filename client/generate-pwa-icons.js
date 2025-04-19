import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Read the SVG file
const svgBuffer = fs.readFileSync(path.join(__dirname, 'public', 'logo.svg'));

// Generate the PWA icons
const sizes = [192, 512];

async function generateIcons() {
  try {
    // Regular icons
    for (const size of sizes) {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(path.join(iconsDir, `pwa-${size}x${size}.png`));
      console.log(`Generated pwa-${size}x${size}.png`);
    }

    // Maskable icon (with padding for safe area)
    await sharp(svgBuffer)
      .resize(512, 512, { 
        fit: 'contain',
        background: { r: 2, g: 132, b: 199, alpha: 1 } // #0284C7
      })
      .png()
      .toFile(path.join(iconsDir, 'maskable-icon.png'));
    console.log('Generated maskable-icon.png');

    console.log('All icons generated successfully');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons(); 