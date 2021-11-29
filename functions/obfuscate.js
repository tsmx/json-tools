const net = require('net');

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

module.exports.obfuscateIps = (jt, obj, replacement) => {
    const callbacks = {
        processValue: (key, value, level, path, isObjectRoot, isArrayElement, cbSetValue) => {
            if (net.isIP(value)) {
                cbSetValue(replacement);
            }
        }
    }
    jt.traverse(obj, callbacks);
}

module.exports.obfuscateCreditCards = (jt, obj, replacement) => {
    const callbacks = {
        processValue: (key, value, level, path, isObjectRoot, isArrayElement, cbSetValue) => {
            let stripped = String(value).replace(/\D/g, '');
            cbSetValue(stripped);
            if(/^4[0-9]{12}(?:[0-9]{3})?$/.test(stripped)) {
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