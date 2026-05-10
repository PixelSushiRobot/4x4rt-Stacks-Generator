const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const posterCSS = `
    /* --- Poster Layout Overrides --- */
    :root[data-layout="poster"] .artwork-container {
      height: auto;
      display: flex;
      flex-direction: column;
    }
    
    :root[data-layout="poster"] .poster-title,
    :root[data-layout="poster"] .poster-metadata {
      display: block !important;
    }

    .poster-title {
      position: absolute;
      top: var(--sz-20);
      left: var(--sz-20);
      color: var(--ui-ink);
      text-transform: uppercase;
      z-index: 10;
    }

    .poster-title-label {
      font-size: var(--sz-15);
      margin-bottom: var(--sz-08);
    }
    
    .poster-title-value {
      font-size: var(--sz-30);
    }

    .poster-metadata {
      width: 100%;
      border-top: var(--ui-border-width) solid var(--ui-ink-solid);
      background: var(--ui-bg);
      color: var(--ui-ink);
      text-transform: uppercase;
      margin-bottom: calc(var(--ui-border-width) * -1); /* Collapse bottom border with container */
    }

    .poster-meta-grid {
      display: flex;
      width: 100%;
    }

    .color-cell {
      width: calc(var(--scale-unit) * 156);
      flex-shrink: 0;
      border-right: var(--ui-border-width) solid var(--ui-ink-solid);
      padding: var(--sz-20);
      display: flex;
      align-items: flex-end;
      gap: var(--ui-border-width);
    }

    .poster-color-bar {
      flex: 1 0 0;
      background: var(--bar-color);
    }

    .poster-data-cols {
      flex: 1 0 0;
      display: flex;
      flex-direction: column;
    }

    .poster-row {
      display: flex;
      flex: 1 0 0;
      width: 100%;
    }

    .poster-row:first-child {
      border-bottom: var(--ui-border-width) solid var(--ui-ink-solid);
    }

    .poster-cell {
      padding: var(--sz-20);
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-right: var(--ui-border-width) solid var(--ui-ink-solid);
    }

    .poster-row > .poster-cell:last-child {
      border-right: none;
    }

    .poster-units-container {
      display: flex;
      flex: 0 0 auto;
    }
    
    .poster-units-container > .poster-cell:last-child {
      border-right: none;
    }

    .poster-cell.hug {
      flex: 0 0 auto;
    }
    .poster-cell.fill {
      flex: 1 0 0;
    }

    .meta-label {
      font-size: var(--sz-15);
      margin-bottom: var(--sz-08);
      color: var(--ui-ink-muted);
    }

    .meta-value {
      font-size: var(--sz-30);
      color: var(--ui-ink-solid);
    }
`;

// Find where it was incorrectly injected
const startMarker = '    /* --- Poster Layout Overrides --- */';
const endMarker = '    .meta-value {\n      font-size: var(--sz-30);';
const insertBefore = '  </style>';

// First remove the broken block
const regex = new RegExp(startMarker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\s\\S]*?' + endMarker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'm');
code = code.replace(regex, '');

// Re-inject properly inside <style>
code = code.replace(insertBefore, posterCSS + '  </style>');

// Also fix State.toggleDisplayLayout to set data-layout attribute on root
code = code.replace(
  "appState.displayLayout = appState.displayLayout === 'art' ? 'poster' : 'art';",
  "appState.displayLayout = appState.displayLayout === 'art' ? 'poster' : 'art';\n        document.documentElement.setAttribute('data-layout', appState.displayLayout);"
);

// Also fix State.applyToDOM to sync data-layout attribute
code = code.replace(
  "Render.renderSidebarState();",
  "Render.renderSidebarState();\n        document.documentElement.setAttribute('data-layout', appState.displayLayout);"
);

fs.writeFileSync('index.html', code);
console.log('Fixed CSS injection and added data-layout sync to State');
