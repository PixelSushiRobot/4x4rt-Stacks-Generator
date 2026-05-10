import re

with open('index.html', 'r') as f:
    content = f.read()

# Remove getHugWidth, drawText, renderPosterMetadata, and restore renderArtwork
pattern = re.compile(r'      getHugWidth\(label, value\) \{.*?(?=      renderArtwork\(\) \{)', re.DOTALL)
content = re.sub(pattern, '', content)

# Restore renderArtwork
render_artwork_original = """      renderArtwork() {
        if (!appState.artwork) return;
        const { placements, heightUnits, palette } = appState.artwork;
        const svg = document.getElementById('artwork-svg');
        svg.innerHTML = '';

        const canvasW = appState.aspectRatio === '9:16' ? 562.5 : CANVAS_SIZE;
        const canvasH = CANVAS_SIZE; // Always 1000

        const stackHeightPx = (heightUnits * CELL_STEP) + BORDER_WIDTH;
        const offsetX = Math.round((canvasW - COLUMN_WIDTH) / 2);
        const offsetY = Math.round((canvasH - stackHeightPx) / 2);

        svg.setAttribute('viewBox', `0 0 ${canvasW} ${canvasH}`);
        svg.setAttribute('width', canvasW);
        svg.setAttribute('height', canvasH);

        const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bg.setAttribute('width', canvasW);
        bg.setAttribute('height', canvasH);
        bg.setAttribute('fill', palette.bg);
        svg.appendChild(bg);

        placements.forEach(placement => {
          const shape = SHAPE_CATALOG[placement.id];
          const occupied = new Set(shape.cells.map(cell => `${cell.x},${cell.y}`));

          shape.cells.forEach(cell => {
            const cellX = offsetX + ((placement.x + cell.x) * CELL_STEP);
            const gridY = placement.y + cell.y;
            const cellY = offsetY + ((heightUnits - 1 - gridY) * CELL_STEP);
            const insetLeft = occupied.has(`${cell.x - 1},${cell.y}`) ? 0 : BORDER_WIDTH;
            const insetRight = occupied.has(`${cell.x + 1},${cell.y}`) ? 0 : BORDER_WIDTH;
            const insetTop = occupied.has(`${cell.x},${cell.y + 1}`) ? 0 : BORDER_WIDTH;
            const insetBottom = occupied.has(`${cell.x},${cell.y - 1}`) ? 0 : BORDER_WIDTH;
            const effectiveGapColor = appState.showOutline ? INK_COLOR : palette.bg;

            addRect(svg, cellX, cellY, CELL_SIZE, CELL_SIZE, effectiveGapColor);
            addRect(
              svg,
              cellX + insetLeft,
              cellY + insetTop,
              CELL_SIZE - insetLeft - insetRight,
              CELL_SIZE - insetTop - insetBottom,
              placement.color
            );
          });
        });
      },"""

pattern2 = re.compile(r'      renderArtwork\(\) \{.*?(?=      renderMetadata\(\) \{)', re.DOTALL)
content = re.sub(pattern2, render_artwork_original + '\n\n', content)

with open('index.html', 'w') as f:
    f.write(content)
print("Reverted renderArtwork and removed SVG poster logic")
