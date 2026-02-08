
import fs from 'fs';
import path from 'path';

const archiveDir = 'C:/Users/User/.gemini/antigravity/brain/5cf58c88-3baa-465e-a27d-4ac2b828fbd4/site_archive/products';
const outputParams = 'C:/Users/User/.gemini/antigravity/scratch/skv-redesign/src/products.json';

// Function to extract text between delimiters
function extractSection(content, startMarker, endMarker) {
    const startIndex = content.indexOf(startMarker);
    if (startIndex === -1) return '';
    const contentStart = startIndex + startMarker.length;
    const endIndex = endMarker ? content.indexOf(endMarker, contentStart) : content.length;
    if (endIndex === -1) return content.substring(contentStart).trim();
    return content.substring(contentStart, endIndex).trim();
}

try {
    const files = fs.readdirSync(archiveDir).filter(f => f.endsWith('.md'));
    const products = files.map(file => {
        const content = fs.readFileSync(path.join(archiveDir, file), 'utf-8');

        // Extract Title (Line starting with # )
        const titleMatch = content.match(/^# (.*)/m);
        const title = titleMatch ? titleMatch[1].trim() : path.basename(file, '.md').replace(/_/g, ' ');

        // Extract Description (Between ## Descrição and ## Produtos relacionados)
        const description = extractSection(content, '## Descrição', '## Produtos relacionados');

        // Extract Short Description (Usually the first paragraph under the title or summary section)
        // We'll take the first non-empty line after title and before ## Descrição for a summary
        // Actually, looking at the archive structure:
        // ## Title
        // Summary line...
        // Description...

        // Let's just use the main description for now, or split it.

        // Determine category based on filename (rough heuristic or manual map)
        // Actually, the archive doesn't explicitly state category in the markdown metadata (since we didn't add frontmatter).
        // But we know 'calcas', 'blusas', 'aventais', 'uniformes', 'camisetas' are Confecção.
        // 'fachadas', 'display', 'adesivacao', 'envelopamento', 'placas', 'windbanner', 'backdrop', 'banners', 'adesivos', 'lonas' are Comunicação Visual.

        let category = 'Comunicação Visual';
        const slug = path.basename(file, '.md');
        if (['calcas_personalizadas', 'blusas_de_moletom_personalizadas', 'aventais_personalizados', 'uniformes_personalizados', 'camisetas_personalizadas'].includes(slug.replace(/-/g, '_'))) {
            category = 'Confecção';
        }

        return {
            id: slug,
            slug: slug.replace(/_/g, '-'),
            title: title,
            category: category,
            description: description,
            // Placeholder image for now, we'll map real ones if we downloaded them, but we didn't download images yet.
            // We will use generate_image later or use placeholders.
            image: `/images/${slug}.jpg`
        };
    });

    fs.writeFileSync(outputParams, JSON.stringify(products, null, 2));
    console.log(`Successfully generated products.json with ${products.length} items.`);

} catch (err) {
    console.error('Error generating products:', err);
    process.exit(1);
}
