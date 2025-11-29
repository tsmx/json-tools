const fs = require('fs');
const path = require('path');

module.exports.getTextFileContent = (fileName) => {
    const filePath = path.join(__dirname, 'objects', fileName);
    return fs.readFileSync(filePath, 'utf-8');
};