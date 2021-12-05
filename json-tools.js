const jt = require('@tsmx/json-traverse');
const basic = require('./functions/basic');
const obfuscate = require('./functions/obfuscate');

/** @module @tsmx/json-tools */
module.exports = {

    obfuscate: {
        /**
         * Obfuscates all string values in a JSON object by replacing characters (e.g. 'New York' --> 'Ne******')
         * @param {Object} obj the object to obfuscate the strings
         * @param {string} replacement the replacement character (default: '*')
         * @param {number} retain the left-most number of original characters to retain (default: 3)
         * @param {number} minreplace the minimal number of replacement characters to use, also if original string was shorter (default: 3)
         */
        strings: (obj, replacement = '*', retain = 3, minreplace = 3) => {
            obfuscate.obfuscateStrings(jt, obj, replacement, retain, minreplace);
        },
        /**
         * Obfuscates all number values in a JSON object by replacing them with a given string (e.g. 28 --> '***')
         * @param {Object} obj the object to obfuscate the numbers
         * @param {string} replacement the replacement string (default: '***')
         */
        numbers: (obj, replacement = '***') => {
            obfuscate.obfuscateNumbers(jt, obj, replacement);
        },
        /**
         * Obfuscates ip adress values (v4 and v6) in a JSON object by replacing them with a given string (e.g. '10.0.1.17' --> '***')
         * @param {Object} obj the object to obfuscate the ip adress values
         * @param {string} replacement the replacement string (default: '***')
         */
        ips: (obj, replacement = '***') => {
            obfuscate.obfuscateIps(jt, obj, replacement);
        },
        /**
         * Obfuscates credit card values in a JSON object by replacing them with a given string (e.g. '10.0.1.17' --> '***')
         * @param {Object} obj the object to obfuscate the ip adress values
         * @param {string} replacement the replacement string (default: '***')
         */
         creditCards: (obj, replacement = '***') => {
            obfuscate.obfuscateCreditCards(jt, obj, replacement);
        },
        /**
         * Obfuscates all values of a JSON object where the key matches a given RegEx. RegEx check is case-insensitive.
         * @param {Object} obj the object to obfuscate
         * @param {string} pattern the RegEx pattern to use
         * @param {string} replacement the replacement string in case if a RegEx match (default: '***')
         */
        keyRegex: (obj, pattern, replacement = '***') => {
            obfuscate.obfuscateKeyRegex(jt, obj, pattern, replacement);
        },
        /**
         * Obfuscates all values of a JSON object where the value matches a given RegEx. RegEx check is case-insensitive.
         * @param {Object} obj the object to obfuscate
         * @param {string} pattern the RegEx pattern to use
         * @param {string} replacement the replacement string in case if a RegEx match (default: '***')
         */
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
    },
    toMap: (obj) => {
        return basic.toMap(jt, obj);
    }
}