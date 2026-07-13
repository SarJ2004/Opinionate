const fs = require('fs');
const path = require('path');

const extensions = ['.ts', '.tsx', '.js', '.jsx', '.ejs'];
const ignoreDirs = ['node_modules', '.git', 'dist', 'prisma'];

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        if (ignoreDirs.includes(file)) return;
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(filePath));
        } else {
            if (extensions.includes(path.extname(file))) {
                results.push(filePath);
            }
        }
    });
    return results;
}

const files = [
    ...walk(path.join(__dirname, 'server', 'src')),
    ...walk(path.join(__dirname, 'client', 'src')),
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // First, handle Opinionate to avoid Versoate
    content = content.replace(/Opinionate/g, 'Verso');
    content = content.replace(/opinionate/g, 'verso');
    
    // Then handle Opinion
    content = content.replace(/OpinionType/g, 'VersoType');
    content = content.replace(/fetchOpinion/g, 'fetchVerso');
    content = content.replace(/deleteOpinion/g, 'deleteVerso');
    content = content.replace(/updateOpinion/g, 'updateVerso');
    content = content.replace(/addOpinion/g, 'addVerso');
    content = content.replace(/OpinionItem/g, 'VersoItem');
    content = content.replace(/opinionItem/g, 'versoItem');
    content = content.replace(/OpinionComment/g, 'VersoComment');
    content = content.replace(/opinionComment/g, 'versoComment');
    content = content.replace(/Opinion/g, 'Verso');
    content = content.replace(/opinion/g, 'verso');
    content = content.replace(/OPINION/g, 'VERSO');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
