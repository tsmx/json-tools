module.exports.toMap = (jt, obj) => {
    const callbacks = {
        processValue: (key, value, level, path, isObjectRoot, isArrayElement, cbSetValue) => {
            if (level < 1) result.set(key, value);
        }
    }
    let result = new Map();
    jt.traverse(obj, callbacks, true);
    return result;
}

module.exports.toArray = (jt, obj) => {
    const callbacks = {
        processValue: (key, value, level, path, isObjectRoot, isArrayElement, cbSetValue) => {
            if (level < 1) result.push({ key, value });
        }
    }
    let result = new Array();
    jt.traverse(obj, callbacks, true);
    return result;
}

module.exports.toProperties = (jt, obj) => {
    const callbacks = {
        processValue: (key, value, level, path, isObjectRoot, isArrayElement, cbSetValue) => {
            if (isObjectRoot) return;
            if (Array.isArray(value)) {
                result.push((path.length > 0 ? (path.join('.') + '.') : '') + key + '=' + value.join());
            }
            else {
                result.push((path.length > 0 ? (path.join('.') + '.') : '') + key + '=' + value);
            }
        }
    }
    let result = [];
    jt.traverse(obj, callbacks, true);
    return result.join('\r\n');
}

module.exports.toPropertiesFlat = (jt, obj) => {
    const callbacks = {
        processValue: (key, value, level, path, isObjectRoot, isArrayElement, cbSetValue) => {
            if (level > 0) return;
            if (Array.isArray(value)) {
                result.push(key + '=' + value.join());
            }
            else if (value instanceof Object === true) {
                result.push(key + '=' + JSON.stringify(value));
            }
            else {
                result.push(key + '=' + value);
            }
        }
    }
    let result = [];
    jt.traverse(obj, callbacks, true);
    return result.join('\r\n');
}