const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const regex = /--sz-[0-9]+/g;
const matches = content.match(regex) || [];
const counts = {};
for (const match of matches) {
    counts[match] = (counts[match] || 0) + 1;
}

for (const [key, val] of Object.entries(counts)) {
    if (val === 1) {
        console.log("Unused:", key);
    }
}
