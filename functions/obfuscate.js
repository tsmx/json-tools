const net = require('net');

module.exports.obfuscateStrings = (jt, obj, replacement, retain, minreplace) => {
    const callbacks = {
        processValue: (key, value, level, path, isObjectRoot, isArrayElement, cbSetValue) => {
            if (typeof (value) === 'string' && value.length > retain) {
                cbSetValue(value.substring(0, retain) + replacement.repeat(Math.max(value.length - retain, minreplace)));
            }
        }
    };
    jt.traverse(obj, callbacks);
};

module.exports.obfuscateNumbers = (jt, obj, replacement) => {
    const callbacks = {
        processValue: (key, value, level, path, isObjectRoot, isArrayElement, cbSetValue) => {
            if (typeof (value) === 'number') {
                cbSetValue(replacement);
            }
        }
    };
    jt.traverse(obj, callbacks);
};

module.exports.obfuscateIpAddresses = (jt, obj, replacement) => {
    const callbacks = {
        processValue: (key, value, level, path, isObjectRoot, isArrayElement, cbSetValue) => {
            if (net.isIP(value) != 0) {
                cbSetValue(replacement);
            }
        }
    };
    jt.traverse(obj, callbacks);
};

module.exports.obfuscateCreditCards = (jt, obj, replacement) => {
    const callbacks = {
        processValue: (key, value, level, path, isObjectRoot, isArrayElement, cbSetValue) => {
            let stripped = String(value).replace(/\D/g, '');
            if (/^(?:4(?:\d{12}|\d{15}|\d{18})|5[1-5]\d{14}|3[47]\d{13}|(?:22(?:2[1-9]\d{12}|[3-9]\d{13})|2[3-6]\d{14}|27(?:0\d{13}|1\d{13}|20\d{12})))$/.test(stripped)) {
                cbSetValue(replacement);
            }
        }
    };
    jt.traverse(obj, callbacks);
};

module.exports.obfuscateKeyRegex = (jt, obj, pattern, replacement) => {
    let regEx = new RegExp(pattern, 'i');
    const callbacks = {
        processValue: (key, value, level, path, isObjectRoot, isArrayElement, cbSetValue) => {
            if (regEx.test(key)) {
                cbSetValue(replacement);
            }
        }
    };
    jt.traverse(obj, callbacks);
};

module.exports.obfuscateValueRegex = (jt, obj, pattern, replacement) => {
    let regEx = new RegExp(pattern, 'i');
    const callbacks = {
        processValue: (key, value, level, path, isObjectRoot, isArrayElement, cbSetValue) => {
            if (regEx.test(value)) {
                cbSetValue(replacement);
            }
        }
    };
    jt.traverse(obj, callbacks);
};