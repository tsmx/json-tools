function getPathString(path) {
    return path.length > 0 ? (path.join('.') + '.') : '';
}

function getValueString(value) {
    if (value instanceof Object === true) {
        return JSON.stringify(value);
    }
    else {
        return value;
    }
}

module.exports.toMap = (jt, obj) => {
    const callbacks = {
        processValue: (key, value, level) => {
            if (level < 1) result.set(key, value);
        }
    };
    let result = new Map();
    jt.traverse(obj, callbacks, true);
    return result;
};

module.exports.toArray = (jt, obj) => {
    const callbacks = {
        processValue: (key, value, level) => {
            if (level < 1) result.push({ key, value });
        }
    };
    let result = new Array();
    jt.traverse(obj, callbacks, true);
    return result;
};

module.exports.toProperties = (jt, obj, expandArrays) => {
    const callbacks = {
        processValue: (key, value, level, path, isObjectRoot) => {
            if (isObjectRoot) return;
            if (Array.isArray(value)) {
                if (!expandArrays) {
                    result.push(getPathString(path) + key + '=' + value.map(x => getValueString(x)).join());
                }
                else {
                    for (let i = 0; i < value.length; i++) {
                        result.push(getPathString(path) + key + '.' + i + '=' + getValueString(value[i]));
                    }
                }
            }
            else {
                result.push(getPathString(path) + key + '=' + value);
            }
        }
    };
    let result = [];
    jt.traverse(obj, callbacks, true);
    return result.join('\r\n');
};

module.exports.toPropertiesFlat = (jt, obj, expandArrays) => {
    const callbacks = {
        processValue: (key, value, level, path, isObjectRoot) => {
            if (level > 0) return;
            if (Array.isArray(value)) {
                if (!expandArrays) {
                    result.push(key + '=' + value.map(x => getValueString(x)).join());
                }
                else {
                    for (let i = 0; i < value.length; i++) {
                        result.push(key + '.' + i + '=' + getValueString(value[i]));
                    }
                }
            }
            else if (isObjectRoot) {
                result.push(key + '=' + JSON.stringify(value));
            }
            else {
                result.push(key + '=' + value);
            }
        }
    };
    let result = [];
    jt.traverse(obj, callbacks, true);
    return result.join('\r\n');
};