const net = require('net');

const ENCRYPTED_PREFIX = 'ENCRYPTED|';

function isEncrypted(value) {
    return typeof value === 'string' && value.startsWith(ENCRYPTED_PREFIX);
}

function encryptedValue(sc, value, key) {
    return ENCRYPTED_PREFIX + sc.encrypt(value, { key });
}

function decryptedValue(sc, value, key) {
    return sc.decrypt(value.slice(ENCRYPTED_PREFIX.length), { key });
}

module.exports.encryptStrings = (jt, sc, obj, key) => {
    const callbacks = {
        processValue: (_key, value, _level, _path, _isObjectRoot, _isArrayElement, cbSetValue) => {
            if (typeof value === 'string') {
                cbSetValue(encryptedValue(sc, value, key));
            }
        }
    };
    jt.traverse(obj, callbacks);
};

module.exports.encryptCreditCards = (jt, sc, obj, key) => {
    const callbacks = {
        processValue: (_key, value, _level, _path, _isObjectRoot, _isArrayElement, cbSetValue) => {
            let stripped = String(value).replace(/\D/g, '');
            if (/^(?:4(?:\d{12}|\d{15}|\d{18})|5[1-5]\d{14}|3[47]\d{13}|(?:22(?:2[1-9]\d{12}|[3-9]\d{13})|2[3-6]\d{14}|27(?:0\d{13}|1\d{13}|20\d{12})))$/.test(stripped)) {
                cbSetValue(encryptedValue(sc, value, key));
            }
        }
    };
    jt.traverse(obj, callbacks);
};

module.exports.encryptIpAddresses = (jt, sc, obj, key) => {
    const callbacks = {
        processValue: (_key, value, _level, _path, _isObjectRoot, _isArrayElement, cbSetValue) => {
            if (net.isIP(value) != 0) {
                cbSetValue(encryptedValue(sc, value, key));
            }
        }
    };
    jt.traverse(obj, callbacks);
};

module.exports.encryptKeyRegex = (jt, sc, obj, pattern, key) => {
    let regEx = new RegExp(pattern, 'i');
    const callbacks = {
        processValue: (k, value, _level, _path, _isObjectRoot, _isArrayElement, cbSetValue) => {
            if (regEx.test(k)) {
                cbSetValue(encryptedValue(sc, value, key));
            }
        }
    };
    jt.traverse(obj, callbacks);
};

module.exports.encryptValueRegex = (jt, sc, obj, pattern, key) => {
    let regEx = new RegExp(pattern, 'i');
    const callbacks = {
        processValue: (_key, value, _level, _path, _isObjectRoot, _isArrayElement, cbSetValue) => {
            if (regEx.test(value)) {
                cbSetValue(encryptedValue(sc, value, key));
            }
        }
    };
    jt.traverse(obj, callbacks);
};

module.exports.decrypt = (jt, sc, obj, key) => {
    const callbacks = {
        processValue: (_key, value, _level, _path, _isObjectRoot, _isArrayElement, cbSetValue) => {
            if (isEncrypted(value)) {
                cbSetValue(decryptedValue(sc, value, key));
            }
        }
    };
    jt.traverse(obj, callbacks);
};
