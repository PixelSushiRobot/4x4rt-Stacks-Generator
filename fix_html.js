const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// The multi_replace duplicated `<rect ...` after the poster-metadata block.
const searchBlock = `        </div>
              <rect x="60" y="16" width="24" height="6" />
              <rect x="60" y="24" width="12" height="6" />
              <rect x="72" y="8" width="18" height="6" />
              <rect x="78" y="24" width="12" height="6" />
            </g>
          </svg>
        </div>`;

const replaceBlock = `        </div>`; // Simply remove the duplicated watermark bits!

code = code.replace(searchBlock, replaceBlock);
fs.writeFileSync('index.html', code);
console.log("Fixed malformed HTML");
