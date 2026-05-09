const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const scriptStart = content.indexOf('<script>') + '<script>\n'.length;
const scriptEnd = content.indexOf('</script>');
const jsCode = content.substring(scriptStart, scriptEnd);

function extractBetween(code, startMarker, endMarker) {
    const startIdx = code.indexOf(startMarker);
    if (startIdx === -1) throw new Error("Could not find start: " + startMarker);
    const endIdx = endMarker ? code.indexOf(endMarker, startIdx) : code.length;
    if (endIdx === -1) throw new Error("Could not find end: " + endMarker);
    return code.substring(startIdx, endIdx);
}

// Extracting blocks
const b_constants_1 = extractBetween(jsCode, '    const BORDER_WIDTH', '    // A cohesive generative system:');
const b_tokens_1 = extractBetween(jsCode, '    // A cohesive generative system:', '    // Initialize UI colors from data');
const b_init_1 = extractBetween(jsCode, '    // Initialize UI colors from data', '    // --- DETERMINISTIC PRNG (Seed Engine) ---');
const b_utils_1 = extractBetween(jsCode, '    // --- DETERMINISTIC PRNG (Seed Engine) ---', '    // --- SHAPE CATALOG ---');
const b_tokens_2 = extractBetween(jsCode, '    // --- SHAPE CATALOG ---', '    // Every artwork uses a deterministic number of "blocks"');
const b_constants_2 = extractBetween(jsCode, '    // Every artwork uses a deterministic number of "blocks"', '    // GLOBAL STATE LAYER');
const b_state_1 = extractBetween(jsCode, '    // GLOBAL STATE LAYER', '    // --- HELPER FUNCTIONS ---');
const b_utils_2 = extractBetween(jsCode, '    // --- HELPER FUNCTIONS ---', '    // --- CORE GENERATION ALGORITHMS ---');
const b_algorithms_1 = extractBetween(jsCode, '    // --- CORE GENERATION ALGORITHMS ---', '    function generateStack(params) {');
const b_engine = extractBetween(jsCode, '    function generateStack(params) {', '    // --- URL STATE SYNCING ---');
const b_sync_1 = extractBetween(jsCode, '    // --- URL STATE SYNCING ---', '    function formatUnitLabel(units) {');
const b_render_utils = extractBetween(jsCode, '    function formatUnitLabel(units) {', '    function sanitizeHeightState() {');
const b_sync_2 = extractBetween(jsCode, '    function sanitizeHeightState() {', '    // --- STATE MODULE ---');
const b_state_2 = extractBetween(jsCode, '    // --- STATE MODULE ---', '    // --- RENDER MODULE ---');
const b_render_1 = extractBetween(jsCode, '    // --- RENDER MODULE ---', '    // --- CONTROLS MODULE ---');
const b_controls_1 = extractBetween(jsCode, '    // --- CONTROLS MODULE ---', '    // --- INIT SEQUENCE ---');
const b_init_2 = extractBetween(jsCode, '    // --- INIT SEQUENCE ---', null);

const sectionMarker = (title) => `\n    // ==========================================================================\n    // ${title}\n    // ==========================================================================\n`;

const newJs = 
    sectionMarker('1. CONSTANTS & CONFIG') +
    b_constants_1 +
    b_constants_2 +
    
    sectionMarker('2. DESIGN TOKENS') +
    b_tokens_1 +
    b_tokens_2 +
    
    sectionMarker('3. UTILITIES') +
    b_utils_1 +
    b_utils_2 +
    
    sectionMarker('4. ALGORITHMS') +
    b_algorithms_1 +
    
    sectionMarker('5. ENGINE') +
    b_engine +
    
    sectionMarker('6. STATE') +
    b_state_1 +
    b_state_2 +
    
    sectionMarker('7. SYNC') +
    b_sync_1 +
    b_sync_2 +
    
    sectionMarker('8. RENDER') +
    b_render_utils +
    b_render_1 +
    
    sectionMarker('9. CONTROLS') +
    b_controls_1 +
    
    sectionMarker('10. INIT') +
    b_init_1 +
    b_init_2;

const newContent = content.substring(0, scriptStart) + newJs + '\n  ' + content.substring(scriptEnd);
fs.writeFileSync('index.html', newContent);
console.log("Successfully reorganized JS.");
