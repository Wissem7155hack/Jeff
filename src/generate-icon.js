const fs = require('fs');

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="16" fill="#09090a"/>
  <text x="32" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="900" font-size="42" fill="#e12c6a" text-anchor="middle">N</text>
</svg>`;

fs.writeFileSync('public/icon.svg', svgContent);
fs.writeFileSync('public/favicon.svg', svgContent);

console.log('SVG icons written successfully');
