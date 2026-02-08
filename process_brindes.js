const fs = require('fs');
const path = require('path');

const SOURCE_DIR = 'C:\\Users\\User\\.gemini\\antigravity\\scratch\\image_scraper\\xbz_images';
const TARGET_DIR = 'C:\\Users\\User\\.gemini\\antigravity\\scratch\\skv-redesign\\public\\images\\products\\brindes';
const JSON_OUTPUT = 'C:\\Users\\User\\.gemini\\antigravity\\scratch\\skv-redesign\\src\\brindes.json';

// Ensure target dir exists
if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
}

const files = fs.readdirSync(SOURCE_DIR);
const products = {};

files.forEach(file => {
    // Skip system files or logos
    if (file.startsWith('.') || file.includes('logo')) return;

    // Regex to extract product code (usually first 5 digits)
    // Examples: 01001-..., 04080-..., 04080b-...
    // We want to group 04080 and 04080b together? 
    // User said: "Os que forem o mesmo numero, coloque dentro do mesmo item."
    // So 04080 and 04080b seem to be variants or related. 
    // However, 04080 might be a cup, 04080b might be a slightly different cup. 
    // Let's group by the first 5 digits for safety, or the full alphanumeric prefix before the first dash.

    // Pattern: ^([a-zA-Z0-9]+)-.*
    const match = file.match(/^([a-zA-Z0-9]+)-/);

    if (match) {
        let code = match[1];
        // Clean code: remove trailing letters if they are just variants? 
        // User said: "Veja que muitos itens tem suas numerações. Preciso que mantenha ela."
        // "Os que forem o mesmo numero, coloque dentro do mesmo item."
        // If I have 01001 and 01001b, are they same? Usually in catalogs, 'b' generic suffix often means updated version or variant.
        // Let's try to strip non-digit characters to group? 
        // Example: 04080 and 04080b -> 04080. 
        // Let's try that.

        let numericCode = code.replace(/\D/g, ''); // Extract just numbers (e.g. 04080 from 04080b)

        if (numericCode.length < 3) {
            // If cleaning results in too short string, fallback to original code
            numericCode = code;
        }

        if (!products[numericCode]) {
            products[numericCode] = {
                id: numericCode,
                title: `Cód. ${numericCode}`, // User wants "Como se fosse um catalogo" with numbers
                images: []
            };
        }

        try {
            const sourcePath = path.join(SOURCE_DIR, file);
            const targetPath = path.join(TARGET_DIR, file);
            fs.copyFileSync(sourcePath, targetPath);
            products[numericCode].images.push(`/images/products/brindes/${file}`);
        } catch (err) {
            fs.appendFileSync('error.log', `Error processing file ${file}: ${err.message}\n`);
            // console.error(`Error processing file ${file}:`, err.message);
        }
    }
});

// Convert objects to array
const productList = Object.values(products).filter(p => p.images.length > 0);

// Sort images within products? 
// Maybe prioritize images that don't have "d1", "d2" etc in name as main image?
productList.forEach(p => {
    p.images.sort((a, b) => {
        // Simple heuristic: shortest filename often main image? 
        // Or filename without 'd1', '_1'.
        const aClean = !a.includes('d') && !a.includes('_');
        const bClean = !b.includes('d') && !b.includes('_');
        if (aClean && !bClean) return -1;
        if (!aClean && bClean) return 1;
        return a.length - b.length;
    });
});

fs.writeFileSync(JSON_OUTPUT, JSON.stringify(productList, null, 2));

console.log(`Processed ${productList.length} products.`);
