const fs = require('fs');
const path = require('path');

const SOURCE_DIR = 'C:\\Users\\User\\.gemini\\antigravity\\scratch\\image_scraper\\xbz_images';
const TARGET_DIR = 'C:\\Users\\User\\.gemini\\antigravity\\scratch\\skv-redesign\\public\\images\\products\\brindes';
const JSON_OUTPUT = 'C:\\Users\\User\\.gemini\\antigravity\\scratch\\skv-redesign\\src\\brindes.json';
const FILE_LIST = 'files.txt';

try {
    if (!fs.existsSync(TARGET_DIR)) {
        fs.mkdirSync(TARGET_DIR, { recursive: true });
    }

    const fileContent = fs.readFileSync(FILE_LIST, 'utf8');
    const files = fileContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    console.log(`Found ${files.length} files in list`);

    const products = {};
    let processedCount = 0;

    files.forEach(file => {
        if (file.startsWith('.') || file.includes('logo')) return;

        const match = file.match(/^([a-zA-Z0-9]+)-/);

        if (match) {
            let code = match[1];
            let numericCode = code.replace(/\D/g, ''); // Extract just numbers (e.g. 04080 from 04080b)
            if (numericCode.length < 3) numericCode = code;

            if (!products[numericCode]) {
                products[numericCode] = {
                    id: numericCode,
                    title: `Cód. ${numericCode}`,
                    images: []
                };
            }

            try {
                // SKIP COPYING - PowerShell handles it
                // const sourcePath = path.join(SOURCE_DIR, file);
                // const targetPath = path.join(TARGET_DIR, file);
                // fs.copyFileSync(sourcePath, targetPath);

                products[numericCode].images.push(`/images/products/brindes/${file}`);
                processedCount++;
            } catch (copyErr) {
                // Silent fail for individual file to keep going
                // console.error(`Copy failed for ${file}:`, copyErr.message); 
            }
        }
    });

    const productList = Object.values(products).filter(p => p.images.length > 0);

    // Sort images
    productList.forEach(p => {
        p.images.sort((a, b) => {
            const aClean = !a.includes('d') && !a.includes('_');
            const bClean = !b.includes('d') && !b.includes('_');
            if (aClean && !bClean) return -1;
            if (!aClean && bClean) return 1;
            return a.length - b.length;
        });
    });

    fs.writeFileSync(JSON_OUTPUT, JSON.stringify(productList, null, 2));
    console.log(`Success: Processed ${processedCount} files, created ${productList.length} products.`);

} catch (err) {
    console.error('Fatal error:', err);
}
