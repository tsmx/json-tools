const basic = require('./functions/basic');
const obfuscate = require('./functions/obfuscate');

module.exports = (jt) => {
    return {
        obfuscate: {
            strings: (obj, replacement = '*', retain = 3, minreplace = 3) => {
                obfuscate.obfuscateStrings(jt, obj, replacement, retain, minreplace);
            },
            numbers: (obj, replacement = '***') => {
                obfuscate.obfuscateNumbers(jt, obj, replacement);
            },
            keyRegex: (obj, pattern, replacement = '***') => {
                obfuscate.obfuscateKeyRegex(jt, obj, pattern, replacement);
            },
            valueRegex: (obj, pattern, replacement = '***') => {
                obfuscate.obfuscateValueRegex(jt, obj, pattern, replacement);
            }
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