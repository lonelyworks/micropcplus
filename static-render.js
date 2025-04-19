// Full static render script - creates HTML with minimal JS
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import { launch } from 'puppeteer';
import http from 'node:http';
import handler from 'serve-handler';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Define the routes to pre-render
const routes = ['/', '/en'];

// Create the output directory
const toAbsolute = (p) => path.resolve(__dirname, p);
const distDir = toAbsolute('./dist');

// Start a local server to serve the built files
async function startServer() {
  const server = http.createServer((request, response) => {
    return handler(request, response, {
      public: distDir,
      rewrites: [
        { source: '/en/**', destination: '/en/index.html' },
        { source: '/**', destination: '/index.html' }
      ]
    });
  });
  
  await new Promise((resolve) => {
    server.listen(3333, () => {
      console.log('Local server started on http://localhost:3333');
      resolve();
    });
  });
  
  return server;
}

async function renderRoute(route, server) {
  console.log(`Fully rendering route: ${route}`);
  
  // Launch browser with specific args to help with file loading
  const browser = await launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Local server URL instead of file://
  const url = `http://localhost:3333${route}`;
  console.log(`Loading: ${url}`);
  
  try {
    // Navigate with a longer timeout
    await page.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: 60000
    });
    
    console.log('Page loaded, waiting for content...');
    
    // Check if we have a root element with content
    const contentCheck = await page.evaluate(() => {
      const root = document.getElementById('root');
      return root && root.children.length > 0;
    });
    
    if (!contentCheck) {
      console.warn('Warning: #root element not found or empty. Using body content instead.');
    }
    
    // Get the fully rendered HTML
    const content = await page.content();
    console.log('Content retrieved successfully');
    
    // Use JSDOM to parse and manipulate the HTML
    const dom = new JSDOM(content);
    const document = dom.window.document;
    
    // Remove unnecessary scripts
    const scripts = document.querySelectorAll('script');
    scripts.forEach(script => {
      // Remove all scripts for truly static output
      script.parentNode.removeChild(script);
    });
    
    // Get the final HTML
    const staticHtml = dom.serialize();
    
    // Create the output file path
    const outputPath = route === '/' 
      ? path.join(distDir, 'index.html')
      : path.join(distDir, route.substring(1), 'index.html');
    
    // Ensure directory exists
    const dirPath = path.dirname(outputPath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    // Write the static HTML to file
    fs.writeFileSync(outputPath, staticHtml);
    console.log(`Created static file: ${outputPath}`);
  } catch (error) {
    console.error(`Error rendering ${route}:`, error);
  } finally {
    await browser.close();
  }
}

async function main() {
  // Make sure the dist directory exists
  if (!fs.existsSync(distDir)) {
    console.error('Error: dist directory does not exist. Run vite build first.');
    process.exit(1);
  }
  
  // Start local server
  const server = await startServer();
  
  try {
    // Render all routes
    for (const route of routes) {
      await renderRoute(route, server);
    }
    
    console.log('Static rendering complete. The site is now fully static HTML with minimal/no JS.');
  } finally {
    // Close server
    server.close();
  }
}

main().catch(error => {
  console.error('Error during static rendering:', error);
  process.exit(1);
}); 