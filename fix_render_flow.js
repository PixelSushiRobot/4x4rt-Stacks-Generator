const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// The issue is likely that renderDisplayOptions() or renderSidebarState() 
// are being called AFTER renderArtwork() and renderMetadata(), 
// and might be causing state conflicts or missing the latest updates.
// Also, ensuring State.toggleDisplayLayout calls the full render() is better.

code = code.replace(
  `        document.getElementById('layout-row')?.addEventListener('click', () => {
          State.toggleDisplayLayout();
          Render.renderDisplayOptions();
          State.syncURL();
        });`,
  `        document.getElementById('layout-row')?.addEventListener('click', () => {
          State.toggleDisplayLayout();
          Render.render();
          State.syncURL();
        });`
);

// Ensure render() calls everything in a consistent order
// and specifically ensures the metadata populates when switching layouts.
code = code.replace(
  `      render() {
        if (!appState.artwork) return;
        this.renderArtwork();
        this.renderDisplayOptions();
        this.renderSidebarState();
        this.renderMetadata();
      },`,
  `      render() {
        if (!appState.artwork) return;
        this.renderArtwork();
        this.renderMetadata();
        this.renderDisplayOptions();
        this.renderSidebarState();
      },`
);

fs.writeFileSync('index.html', code);
console.log('Synchronized render flow to ensure metadata bar updates on layout toggle');
