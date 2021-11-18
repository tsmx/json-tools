module.exports.obfuscateStrings = (jt, obj, replacement, retain, minreplace) => {
    const callbacks = {
        processValue: (key, value, level, path, isObjectRoot, isArrayElement, cbSetValue) => {
            if (typeof (value) === 'string' && value.length > retain) {
                cbSetValue(value.substr(0, retain) + replacement.repeat(Math.max(value.length - retain, minreplace)));
            }
        }
    }
    jt.traverse(obj, callbacks);
}