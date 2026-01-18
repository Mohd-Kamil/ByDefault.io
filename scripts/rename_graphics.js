import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const graphicsDir = path.join(__dirname, '../public/graphics');
const files = fs.readdirSync(graphicsDir);

const newProjects = [];

files.forEach((file, index) => {
    const ext = path.extname(file);
    const newName = `design-${index + 1}${ext}`;
    const oldPath = path.join(graphicsDir, file);
    const newPath = path.join(graphicsDir, newName);

    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: ${file} -> ${newName}`);

    newProjects.push({
        id: `graphic-${index + 1}`,
        type: 'design',
        title: `Design Project ${index + 1}`,
        category: 'Graphic Design',
        description: '',
        color: 'bg-zinc-900/20',
        images: { hero: `/graphics/${newName}` }
    });
});

console.log('// New Projects Data:');
console.log(JSON.stringify(newProjects, null, 4));
