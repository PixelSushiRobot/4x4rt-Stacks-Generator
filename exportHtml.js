const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const exportInjection = `      downloadPNG() {
        if (appState.displayLayout === 'poster') {
          // Use html2canvas for DOM capture
          if (!window.html2canvas) {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
            script.onload = () => this._capturePosterPNG();
            document.head.appendChild(script);
          } else {
            this._capturePosterPNG();
          }
          return;
        }

        const svg = document.getElementById('artwork-svg');`;

const captureFunction = `      _capturePosterPNG() {
        const container = document.getElementById('artwork-container');
        html2canvas(container, {
          scale: 2, // High resolution
          backgroundColor: null
        }).then(canvas => {
          const a = document.createElement('a');
          a.href = canvas.toDataURL('image/png');
          a.download = \`4x4rt-poster-\${appState.seed}-\${Date.now()}.png\`;
          a.click();
        });
      },

      downloadSVG() {`;

code = code.replace(`      downloadPNG() {\n        const svg = document.getElementById('artwork-svg');`, exportInjection);
code = code.replace(`      downloadSVG() {`, captureFunction);

fs.writeFileSync('index.html', code);
console.log('Injected html2canvas export logic');
