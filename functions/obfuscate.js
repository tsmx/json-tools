module.exports.obfuscateStringsCallbacks = (replacement, retain, minreplace) => {
    return {
        processValue: (key, value, level, path, isObjectRoot, isArrayElement, cbSetValue) => {
            if (typeof (value) === 'string' && value.length > retain) {
                cbSetValue(value.substr(0, retain) + replacement.repeat(Math.max(value.length - retain, minreplace)));
            }
        }
    }
}