const fs = require('fs');
const path = require('path');

const SOURCE_DIR = 'C:\\Users\\User\\.gemini\\antigravity\\scratch\\image_scraper\\xbz_images';
const TARGET_DIR = 'C:\\Users\\User\\.gemini\\antigravity\\scratch\\skv-redesign\\public\\images\\products\\brindes';
const JSON_OUTPUT = 'C:\\Users\\User\\.gemini\\antigravity\\scratch\\skv-redesign\\src\\brindes.json';

console.log('Script started');

try {
    if (!fs.existsSync(SOURCE_DIR)) {
        console.error('Source directory does not exist:', SOURCE_DIR);
        process.exit(1);
    }
    console.log('Source directory exists');

    if (!fs.existsSync(TARGET_DIR)) {
        console.log('Creating target dir');
        fs.mkdirSync(TARGET_DIR, { recursive: true });
    }
    console.log('Target directory ready');

    const files = fs.readdirSync(SOURCE_DIR);
    console.log(`Found ${files.length} files in source`);

    const products = {};
    let processedCount = 0;
    const MAX_FILES = 10; // Process only 10 files for test

    for (const file of files) {
        if (processedCount >= MAX_FILES) break;

        if (file.startsWith('.') || file.includes('logo')) continue;

        console.log(`Processing file: ${file}`);

        const match = file.match(/^([a-zA-Z0-9]+)-/);

        if (match) {
            let code = match[1];
            let numericCode = code.replace(/\D/g, '');
            if (numericCode.length < 3) numericCode = code;

            if (!products[numericCode]) {
                products[numericCode] = {
                    id: numericCode,
                    title: `Cód. ${numericCode}`,
                    images: []
                };
            }

            try {
                const sourcePath = path.join(SOURCE_DIR, file);
                const targetPath = path.join(TARGET_DIR, file);
                console.log(`Copying from ${sourcePath} to ${targetPath}`);
                fs.copyFileSync(sourcePath, targetPath);
                products[numericCode].images.push(`/images/products/brindes/${file}`);
                processedCount++;
            } catch (copyErr) {
                console.error(`Copy failed for ${file}:`, copyErr.message);
            }
        } else {
            console.log(`Skipping file ${file} (no match)`);
        }
    }

    const productList = Object.values(products).filter(p => p.images.length > 0);
    console.log(`Generated ${productList.length} products`);

    fs.writeFileSync(JSON_OUTPUT, JSON.stringify(productList, null, 2));
    console.log('JSON written');

} catch (err) {
    console.error('Fatal error:', err);
}
console.log('Script finished');
