const basic = require('./functions/basic');
const obfuscate = require('./functions/obfuscate');

module.exports = (jt) => {
    return {
        obfuscateStrings: (obj, replacement = '*', retain = 3, minreplace = 3) => {
            obfuscate.obfuscateStrings(jt, obj, replacement, retain, minreplace);
        },
        obfuscateNumbers: (obj, replacement = '***') => {
            obfuscate.obfuscateNumbers(jt, obj, replacement);
        },
        getDepth: (obj) => {
            return basic.getDepth(jt, obj);
        },
        isSimple: (obj) => {
            return basic.isSimple(jt, obj);
        },
        isComplex: (obj) => {
            return basic.isComplex(jt, obj);
        }
    }
}