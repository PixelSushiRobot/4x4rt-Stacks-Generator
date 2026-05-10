const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// 1. Restore watermark visibility in Poster mode
// The watermark should be shown in Poster mode too, but maybe it was hidden because we were planning to draw it in SVG.
// Since we are using HTML DOM for Poster, we should keep the DOM watermark.
code = code.replace(
  "if (appState.displayLayout === 'poster') domWatermark.style.display = 'none';",
  "// Watermark is always shown in both Art and Poster mode\n          domWatermark.style.display = 'block';"
);

// 2. Fix the missing bottom border on the parent canvas
// The .poster-metadata has a negative bottom margin which might be cutting off the container's bottom border.
// We should remove the negative margin and let the container's border-bottom be the final line.
code = code.replace(
  "margin-bottom: calc(var(--ui-border-width) * -1);",
  "/* margin-bottom removed to fix missing bottom border */"
);

fs.writeFileSync('index.html', code);
console.log('Fixed watermark visibility and missing bottom border in Poster layout');
