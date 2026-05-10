const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// Ensure data-layout is set on init
code = code.replace(
  "State.applyToDOM();",
  "State.applyToDOM();\n    document.documentElement.setAttribute('data-layout', appState.displayLayout);"
);

fs.writeFileSync('index.html', code);
console.log('Added initial data-layout set');
