const fs = require('fs');
const path = require('path');

const SOURCE_DIR = 'C:\\Users\\User\\.gemini\\antigravity\\scratch\\image_scraper\\xbz_images';
const TARGET_DIR = 'C:\\Users\\User\\.gemini\\antigravity\\scratch\\skv-redesign\\public\\images\\products\\brindes';
const TEST_FILE = '00059_4g-MINIPEN089.jpg';

try {
    console.log('Starting minimal test...');
    if (!fs.existsSync(TARGET_DIR)) {
        fs.mkdirSync(TARGET_DIR, { recursive: true });
    }

    if (!fs.existsSync(path.join(SOURCE_DIR, TEST_FILE))) {
        console.error('Source file not found!');
    } else {
        fs.copyFileSync(path.join(SOURCE_DIR, TEST_FILE), path.join(TARGET_DIR, TEST_FILE));
        console.log('Copy successful!');
    }
} catch (err) {
    console.error('Failed:', err.message);
}
