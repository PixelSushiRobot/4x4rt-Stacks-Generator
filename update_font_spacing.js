const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// Define the updated CSS properties for poster fonts
const updatedCSS = `
    .poster-title-label {
      font-size: var(--sz-15);
      margin-bottom: var(--sz-08);
      line-height: 1.45;
      letter-spacing: normal;
    }
    
    .poster-title-value {
      font-size: var(--sz-30);
      line-height: 1;
      letter-spacing: normal;
    }

    .meta-label {
      font-size: var(--sz-15);
      margin-bottom: var(--sz-08);
      color: var(--ui-ink-muted);
      line-height: 1.45;
      letter-spacing: normal;
    }

    .meta-value {
      font-size: var(--sz-30);
      color: var(--ui-ink-solid);
      line-height: 1;
      letter-spacing: normal;
    }
`;

// Replace the old specific lines in the style block.
// This is a bit safer than a global regex for this specific fix.

const titleLabelOld = `    .poster-title-label {
      font-size: var(--sz-15);
      margin-bottom: var(--sz-08);
    }`;
const titleValueOld = `    .poster-title-value {
      font-size: var(--sz-30);
    }`;
const metaLabelOld = `    .meta-label {
      font-size: var(--sz-15);
      margin-bottom: var(--sz-08);
      color: var(--ui-ink-muted);
    }`;
const metaValueOld = `    .meta-value {
      font-size: var(--sz-30);
      color: var(--ui-ink-solid);
    }`;

code = code.replace(titleLabelOld, `    .poster-title-label {
      font-size: var(--sz-15);
      margin-bottom: var(--sz-08);
      line-height: 1.45;
    }`);
code = code.replace(titleValueOld, `    .poster-title-value {
      font-size: var(--sz-30);
      line-height: 1;
    }`);
code = code.replace(metaLabelOld, `    .meta-label {
      font-size: var(--sz-15);
      margin-bottom: var(--sz-08);
      color: var(--ui-ink-muted);
      line-height: 1.45;
    }`);
code = code.replace(metaValueOld, `    .meta-value {
      font-size: var(--sz-30);
      color: var(--ui-ink-solid);
      line-height: 1;
    }`);

fs.writeFileSync('index.html', code);
console.log('Updated poster font line-heights to match sidebar spacing');
