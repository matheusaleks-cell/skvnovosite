const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\User\\.gemini\\antigravity\\scratch\\skv-redesign\\src\\brindes.json';

try {
    const content = fs.readFileSync(filePath);
    console.log('File size:', content.length);
    console.log('First 4 bytes:', content.slice(0, 4)); // Check for BOM (EF BB BF)

    const text = fs.readFileSync(filePath, 'utf8');
    JSON.parse(text);
    console.log('JSON is valid.');
} catch (err) {
    console.error('Error:', err.message);
}
