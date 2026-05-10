const fs = require('fs');
const code = fs.readFileSync('index.html', 'utf8');

// I need to clean up the HTML at the end of artwork-container.
const startIdx = code.indexOf('<div id="poster-metadata"');
const endIdx = code.indexOf('</main>');
console.log(code.substring(startIdx, endIdx));
