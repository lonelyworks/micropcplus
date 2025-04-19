// Pre-rendering script for static site generation
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Define the routes to pre-render
const routes = ['/', '/en'];

// Create the output directory
const toAbsolute = (p) => path.resolve(__dirname, p);
const distDir = toAbsolute('./dist');

// Get the template
const templatePath = toAbsolute('./dist/index.html');
const template = fs.readFileSync(templatePath, 'utf-8');

// Language-specific content
const contentByLang = {
  fr: {
    title: 'Micro PC Plus',
    description: 'Micro PC Plus offre des services de vente d\'ordinateurs, de réparations et de support technique à Montréal. Visitez-nous pour tous vos besoins en informatique, mobile et consoles de jeu.',
    canonical: 'https://micropcplus.com',
    ogTitle: 'Micro PC Plus - Vente et Réparation d\'Ordinateurs à Montréal',
    ogDescription: 'Services de vente, réparation et soutien technique pour ordinateurs, mobiles et consoles à Montréal.',
    structuredDescription: 'Services de vente, réparation et soutien technique pour ordinateurs à Montréal'
  },
  en: {
    title: 'Micro PC Plus | Computer Sales & Repair Services',
    description: 'Micro PC Plus offers computer sales, repairs, and tech support services in Montreal. Visit us for all your computer, mobile, and gaming console needs.',
    canonical: 'https://micropcplus.com/en',
    ogTitle: 'Micro PC Plus - Computer Sales & Repair in Montreal',
    ogDescription: 'Computer sales, repair and technical support services for computers, mobile devices and consoles in Montreal.',
    structuredDescription: 'Computer sales, repairs, and tech support services in Montreal'
  }
};

// Function to create an HTML file for each route
for (const route of routes) {
  console.log(`Pre-rendering route: ${route}`);
  
  // Set the correct language based on route
  const lang = route === '/en' ? 'en' : 'fr';
  const content = contentByLang[lang];
  
  // Update language-specific elements
  let routeTemplate = template
    .replace('<html lang="en"', `<html lang="${lang}"`)
    .replace(/<title>.*?<\/title>/, `<title>${content.title}</title>`)
    .replace(/<meta name="description" content=".*?"/, `<meta name="description" content="${content.description}"`)
    .replace(/<link rel="canonical" href=".*?"/, `<link rel="canonical" href="${content.canonical}"`)
    .replace(/<meta property="og:title" content=".*?"/, `<meta property="og:title" content="${content.ogTitle}"`)
    .replace(/<meta property="og:description" content=".*?"/, `<meta property="og:description" content="${content.ogDescription}"`)
    .replace(/<meta property="og:url" content=".*?"/, `<meta property="og:url" content="${content.canonical}"`)
    .replace(/<meta property="og:locale" content=".*?"/, `<meta property="og:locale" content="${lang === 'fr' ? 'fr_CA' : 'en_CA'}"`)
    .replace(/<meta name="twitter:title" content=".*?"/, `<meta name="twitter:title" content="${content.ogTitle}"`)
    .replace(/<meta name="twitter:description" content=".*?"/, `<meta name="twitter:description" content="${content.ogDescription}"`)
    .replace(/<meta name="twitter:url" content=".*?"/, `<meta name="twitter:url" content="${content.canonical}"`);
    
  // Add language initialization script 
  const languageScript = `<script>window.INITIAL_LANGUAGE = "${lang}";</script>`;
  routeTemplate = routeTemplate.replace('</head>', `${languageScript}\n  </head>`);
    
  // Update structured data description
  routeTemplate = routeTemplate.replace(
    /"description": ".*?"/,
    `"description": "${content.structuredDescription}"`
  );
  
  // Create a copy of the index.html for each route
  const outputPath = route === '/' 
    ? path.join(distDir, 'index.html')
    : path.join(distDir, route.substring(1), 'index.html');
  
  // Ensure directory exists
  const dirPath = path.dirname(outputPath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  // Before writing the file
  if (fs.existsSync(outputPath) && fs.statSync(outputPath).isDirectory()) {
    console.error(`Error: Cannot write file at ${outputPath} - it's a directory`);
    continue;
  }
  
  // Write the file
  fs.writeFileSync(outputPath, routeTemplate);
  console.log(`Created static file: ${outputPath}`);
}

console.log('Pre-rendering complete'); 