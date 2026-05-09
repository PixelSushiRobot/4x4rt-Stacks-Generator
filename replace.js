const fs = require('fs');

const filepath = 'index.html';
let content = fs.readFileSync(filepath, 'utf8');

const scaleVars = `
      /* Modular Scale System */
      --scale-unit: calc(var(--canvas-size) * 0.001);
      --sz-01: calc(var(--scale-unit) * 1);
      --sz-02: calc(var(--scale-unit) * 2);
      --sz-05: calc(var(--scale-unit) * 5);
      --sz-07: calc(var(--scale-unit) * 7);
      --sz-08: calc(var(--scale-unit) * 8);
      --sz-10: calc(var(--scale-unit) * 10);
      --sz-12: calc(var(--scale-unit) * 12);
      --sz-15: calc(var(--scale-unit) * 15);
      --sz-16: calc(var(--scale-unit) * 16);
      --sz-18: calc(var(--scale-unit) * 18);
      --sz-20: calc(var(--scale-unit) * 20);
      --sz-25: calc(var(--scale-unit) * 25);
      --sz-30: calc(var(--scale-unit) * 30);
      --sz-40: calc(var(--scale-unit) * 40);
      --sz-54: calc(var(--scale-unit) * 54);
      --sz-56: calc(var(--scale-unit) * 56);
      --sz-64: calc(var(--scale-unit) * 64);
      --sz-90: calc(var(--scale-unit) * 90);
      --sz-120: calc(var(--scale-unit) * 120);
      --sz-365: calc(var(--scale-unit) * 365);
`;

const rootRegex = /(:root\s*\{[^}]+--canvas-size:[^;]+;)/;
content = content.replace(rootRegex, `$1${scaleVars}`);

content = content.replace(/calc\(var\(--canvas-size\)\s*\*\s*0\.([0-9]+)\)/g, (match, p1) => {
    let val = parseFloat("0." + p1);
    let intVal = Math.round(val * 1000);
    let padded = intVal.toString().padStart(2, '0');
    return `var(--sz-${padded})`;
});

fs.writeFileSync(filepath, content, 'utf8');
console.log('done');
