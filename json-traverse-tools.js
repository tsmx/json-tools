const obfuscate = require('./functions/obfuscate');

module.exports = (jt) => {
    return {
        obfuscateStrings: (obj, replacement = '*', retain = 3, minreplace = 3) => {
            jt.traverse(obj, obfuscate.obfuscateStringsCallbacks(replacement, retain, minreplace));
        },
        getDepth: (obj) => {
            let depth = 0;
            jt.traverse(obj, { enterLevel: (level, path) => { if (level > depth) depth = level; } });
            return depth;
        }
    }
}