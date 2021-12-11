const jt = require('@tsmx/json-traverse');
const basic = require('./functions/basic');
const transform = require('./functions/transform');
const obfuscate = require('./functions/obfuscate');

/** @module @tsmx/json-tools */
module.exports = {

    /**
     * JSON obfuscation functions
     * @namespace
     */
    obfuscate: {
        /**
         * Obfuscates all string values in a JSON object by replacing characters (e.g. 'New York' --> 'Ne******')
         * @param {Object} obj the object to obfuscate the strings
         * @param {string} [replacement=*] the replacement character
         * @param {number} [retain=3] the left-most number of original characters to retain
         * @param {number} [minreplace=3] the minimal number of replacement characters to use, also if original string was shorter
         */
        strings: (obj, replacement = '*', retain = 3, minreplace = 3) => {
            obfuscate.obfuscateStrings(jt, obj, replacement, retain, minreplace);
        },
        /**
         * Obfuscates all number values in a JSON object by replacing them with a given string (e.g. 28 --> '***')
         * @param {Object} obj the object to obfuscate the numbers
         * @param {string} [replacement=***] the replacement string
         */
        numbers: (obj, replacement = '***') => {
            obfuscate.obfuscateNumbers(jt, obj, replacement);
        },
        /**
         * Obfuscates ip adress values (v4 and v6) in a JSON object by replacing them with a given string (e.g. '10.0.1.17' --> '***')
         * @param {Object} obj the object to obfuscate the ip adress values
         * @param {string} [replacement=***] the replacement string
         */
        ipAddresses: (obj, replacement = '***') => {
            obfuscate.obfuscateIpAddresses(jt, obj, replacement);
        },
        /**
         * Obfuscates credit card values in a JSON object by replacing them with a given string (e.g. '4012-8888-8888-1881' --> '***')
         * @param {Object} obj the object to obfuscate the ip adress values
         * @param {string} [replacement=***] the replacement string
         */
        creditCards: (obj, replacement = '***') => {
            obfuscate.obfuscateCreditCards(jt, obj, replacement);
        },
        /**
         * Obfuscates all values of a JSON object where the key matches a given RegEx. RegEx check is case-insensitive.
         * @param {Object} obj the object to obfuscate
         * @param {string} pattern the RegEx pattern to use
         * @param {string} [replacement=***] the replacement string in case if a RegEx match
         */
        keyRegex: (obj, pattern, replacement = '***') => {
            obfuscate.obfuscateKeyRegex(jt, obj, pattern, replacement);
        },
        /**
         * Obfuscates all values of a JSON object where the value matches a given RegEx. RegEx check is case-insensitive.
         * @param {Object} obj the object to obfuscate
         * @param {string} pattern the RegEx pattern to use
         * @param {string} [replacement=***] the replacement string in case if a RegEx match
         */
        valueRegex: (obj, pattern, replacement = '***') => {
            obfuscate.obfuscateValueRegex(jt, obj, pattern, replacement);
        }
    },
    /**
     * JSON transformation functions
     * @namespace
     */
    transform: {
        /**
        * Converts a JSON object to a Map.
        * The returned Map will contain all root-level object property values as entries with their property names as the key.
        * @param {Object} obj the object to be converted to a Map
        * @returns {Map} a Map containing all of the objects properties
        */
        toMap: (obj) => {
            return transform.toMap(jt, obj);
        },
        /**
        * Converts a JSON object to an Array.
        * The returned Array will contain a {key, value} object for all root-level object properties.
        * @param {Object} obj the object to be converted to a Map
        * @returns {Array} an Array containing all of the objects properties
        */
        toArray: (obj) => {
            return transform.toArray(jt, obj);
        },
        /**
         * Converts a JSON object to a properties file string.
         * Nested subobjects and their values are resolved into own props with full dot-separated path
         * as key, e.g. country.name=USA country.code=US.
         * Line endings are '\r\n'.
         * @param {Object} obj the object to be converted to a properties string
         * @param {boolean} [expandArrays=false] if set to true, creates an own property entry for each array element with a zero-based 
         * index, e.g. values.0=7 values.1=13 - 
         * if set to false, the complete array is printed as a comma separated string, e.g. values=7,13
         * @returns {String} a properties file like string
         */
        toProperties: (obj, expandArrays = false) => {
            return transform.toProperties(jt, obj, expandArrays);
        },
        /**
         * Converts a JSON object to a properties file string.
         * Only the root level of the object is considered. 
         * Nested subobjects and their values are not resolved further and printed out as stringified JSON, e.g. country={"name":"USA","code":"US"}.
         * Line endings are '\r\n'.
         * @param {Object} obj the object to be converted to a properties string
         * @param {boolean} [expandArrays=false] if set to true, creates an own property entry for each array element with a zero-based 
         * index, e.g. values.0=7 values.1=13 - 
         * if set to false, the complete array is printed as a comma separated string, e.g. values=7,13
         * @returns {String} a properties file like string
         */
        toPropertiesFlat: (obj, expandArrays = false) => {
            return transform.toPropertiesFlat(jt, obj, expandArrays);
        }
    },
    /**
     * Retrieves the depth (nesting level) of a JSON object. Root level is considered to be zero.
     * @param {Object} obj the object to inspect
     * @param {boolean} [includeArrays=true] sets if objects in arrays should be considered 
     * @returns {number} the zero-based depth of the JSON
     */
    getDepth: (obj, includeArrays = true) => {
        return basic.getDepth(jt, obj, includeArrays);
    },
    /**
     * Checks if a JSON object is simple, meaning it has no nested objects (depth == 0).
     * @param {Object} obj the object to inspect
     * @param {boolean} [includeArrays=true] sets if objects in arrays should be considered
     * @returns {boolean} true, if the JSON is simple
     */
    isSimple: (obj, includeArrays = true) => {
        return basic.isSimple(jt, obj, includeArrays);
    },
    /**
     * Checks if a JSON object is complex, meaning it has nested objects (depth > 0).
     * @param {Object} obj the object to inspect
     * @param {boolean} [includeArrays=true] sets if objects in arrays should be considered
     * @returns {boolean} true, if the JSON is complex
     */
    isComplex: (obj, includeArrays = true) => {
        return basic.isComplex(jt, obj, includeArrays);
    },
    /**
     * Parses all values of an object and returns the number of occurances per type in a Map.
     * Does a deep-parsing including subobjects and array elements. 
     * @param {Object} obj the object to inspect
     * @returns {Map} a Map cotaining the number of occurances for every type, e.g. { 'string' => 3, 'number' => 1 ... }
     */
    typeStats: (obj) => {
        return basic.typeStats(jt, obj);
    }
}