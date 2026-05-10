const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const jsInjection = `        // Populate Poster Metadata
        if (appState.displayLayout === 'poster') {
          document.getElementById('poster-seed').textContent = appState.seed;
          document.getElementById('poster-palette').textContent = palette.name;
          document.getElementById('poster-profile').textContent = activeProfile;
          document.getElementById('poster-form').textContent = appState.showOutline ? 'bound' : 'unbound';
          document.getElementById('poster-limit').textContent = appState.targetBlocks + ' blocks';
          document.getElementById('poster-height').textContent = heightUnits + ' units';
          document.getElementById('poster-shapes').textContent = placements.length;
          
          // Color Bars
          const colorCounts = {};
          palette.colors.forEach(c => colorCounts[c] = 0);
          placements.forEach(p => colorCounts[p.color]++);
          const maxUsage = Math.max(...Object.values(colorCounts));
          
          const colorBarsContainer = document.getElementById('poster-color-bars');
          colorBarsContainer.innerHTML = '';
          palette.colors.forEach(color => {
            const usage = colorCounts[color];
            const bar = document.createElement('div');
            bar.className = 'poster-color-bar';
            bar.style.setProperty('--bar-color', color);
            if (usage === 0) {
              bar.style.height = 'calc(var(--scale-unit) * 16)'; // make it a square
            } else {
              bar.style.height = \`\${(usage / maxUsage) * 100}%\`;
            }
            colorBarsContainer.appendChild(bar);
          });
          
          // Shape Units
          const shapeCounts = placements.reduce((acc, p) => {
            const units = SHAPE_CATALOG[p.id].units;
            acc[units] = (acc[units] || 0) + 1;
            return acc;
          }, {});
          
          const unitsKeys = Object.keys(shapeCounts).map(Number).sort((a, b) => a - b);
          const unitsContainer = document.getElementById('poster-units-container');
          unitsContainer.innerHTML = '';
          unitsKeys.forEach(units => {
            const lbl = formatUnitLabel(units);
            const val = shapeCounts[units];
            const cell = document.createElement('div');
            cell.className = 'poster-cell hug';
            cell.innerHTML = \`<div class="meta-label">\${lbl}</div><div class="meta-value">\${val}</div>\`;
            unitsContainer.appendChild(cell);
          });
        }
`;

const searchStr = `        const shapesList = document.getElementById('shapes-list');`;
code = code.replace(searchStr, jsInjection + "\n" + searchStr);
fs.writeFileSync('index.html', code);
console.log('Injected JS for poster DOM logic');
