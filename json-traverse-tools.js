const basic = require('./functions/basic');
const obfuscate = require('./functions/obfuscate');

/** @module @tsmx/json-traverse-tools */
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
        /**
         * Retrieves the depth (nesting level) of a JSON object.
         * @param {Object} obj the object to inspect
         * @param {boolean} includeArrays sets if objects in arrays should be considered (default: true) 
         * @returns the 0-based depth of the JSON
         */
        getDepth: (obj, includeArrays = true) => {
            return basic.getDepth(jt, obj, includeArrays);
        },
        /**
         * Checks if a JSON object is simple, meaning it has no nested objects (depth == 0).
         * @param {Object} obj the object to inspect
         * @param {boolean} includeArrays sets if objects in arrays should be considered (default: true)
         * @returns True, if the JSON is simple.
         */
        isSimple: (obj, includeArrays = true) => {
            return basic.isSimple(jt, obj, includeArrays);
        },
        /**
         * Checks if a JSON object is complex, meaning it has nested objects (depth > 0).
         * @param {Object} obj the object to inspect
         * @param {boolean} includeArrays sets if objects in arrays should be considered (default: true)
         * @returns True, if the JSON is complex.
         */
        isComplex: (obj, includeArrays = true) => {
            return basic.isComplex(jt, obj, includeArrays);
        }
    }
}