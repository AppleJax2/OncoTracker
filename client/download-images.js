import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'public', 'images');

// Create the directory if it doesn't exist
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const images = [
  {
    name: 'app-screenshot.jpg',
    url: 'https://images.unsplash.com/photo-1600267204088-c0cd5ba2d157?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'pet-owner.jpg',
    url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

// Download each image
images.forEach(image => {
  const filePath = path.join(imagesDir, image.name);
  const file = fs.createWriteStream(filePath);
  
  https.get(image.url, response => {
    response.pipe(file);
    
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${image.name}`);
    });
  }).on('error', err => {
    fs.unlink(filePath, () => {}); // Delete the file if there was an error
    console.error(`Error downloading ${image.name}: ${err.message}`);
  });
}); 