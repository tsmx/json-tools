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

module.exports.obfuscateNumbers = (jt, obj, replacement) => {
    const callbacks = {
        processValue: (key, value, level, path, isObjectRoot, isArrayElement, cbSetValue) => {
            if (typeof (value) === 'number') {
                cbSetValue(replacement);
            }
        }
    }
    jt.traverse(obj, callbacks);
}

module.exports.obfuscateKeyRegex = (jt, obj, pattern, replacement) => {
    let regEx = new RegExp(pattern, 'i');
    const callbacks = {
        processValue: (key, value, level, path, isObjectRoot, isArrayElement, cbSetValue) => {
            if (regEx.test(key)) {
                cbSetValue(replacement);
            }
        }
    }
    jt.traverse(obj, callbacks);
}

module.exports.obfuscateValueRegex = (jt, obj, pattern, replacement) => {
    let regEx = new RegExp(pattern, 'i');
    const callbacks = {
        processValue: (key, value, level, path, isObjectRoot, isArrayElement, cbSetValue) => {
            if (regEx.test(value)) {
                cbSetValue(replacement);
            }
        }
    }
    jt.traverse(obj, callbacks);
}