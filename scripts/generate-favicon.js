// Generate favicon in multiple formats
// This creates a simple HTML canvas version since we don't have complex SVG tools

const fs = require('fs');
const path = require('path');

// Create a simple ICO file content (basic format)
function createSimpleICO() {
  // For now, we'll create a placeholder and recommend using an online converter
  const icoContent = `<!-- 
    To generate favicon.ico from favicon.svg:
    1. Use an online converter like https://convertio.co/svg-ico/
    2. Or use ImageMagick: convert favicon.svg -resize 32x32 favicon.ico
    3. Or use online tool: https://favicon.io/favicon-converter/
  -->`;
  
  fs.writeFileSync(path.join(__dirname, '../public/favicon-generation-note.txt'), icoContent);
}

// Create different sized PNGs by creating HTML and taking screenshots
function createFaviconSizes() {
  const sizes = [16, 32, 48, 96, 144, 192, 512];
  
  sizes.forEach(size => {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400&display=swap');
    body { 
      margin: 0; 
      background: #f5f0e8; 
      width: ${size}px; 
      height: ${size}px; 
      display: flex; 
      align-items: center; 
      justify-content: center;
    }
    .logo {
      font-family: 'Montserrat', sans-serif;
      font-weight: 400;
      font-size: ${Math.floor(size * 0.5625)}px;
      background: linear-gradient(90deg, #707680, #9099a8, #808890, #707680, #a0a8b8, #707680, #9099a8);
      background-size: 120% 100%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: 0.01em;
      filter: drop-shadow(-0.5px -0.5px 0.5px rgba(255, 255, 255, 0.9))
              drop-shadow(0.5px 0.5px 0.5px rgba(60, 65, 75, 0.8))
              drop-shadow(1px 1px 1px rgba(50, 55, 65, 0.3));
    }
  </style>
</head>
<body>
  <div class="logo">pd</div>
</body>
</html>`;
    
    fs.writeFileSync(path.join(__dirname, `../public/favicon-${size}.html`), htmlContent);
  });
  
  console.log('Generated HTML files for favicon conversion. Use a tool like Puppeteer or browser screenshots to convert to PNG.');
}

createSimpleICO();
createFaviconSizes();

console.log('Favicon generation files created. Check public/ directory.');