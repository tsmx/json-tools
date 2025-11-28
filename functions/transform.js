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

module.exports.toLLM = (jt, obj) => {
    let llmResult = '';
    const arrayMap = new Map();

    function parseArrayIndex(str) {
        const match = /^_(\d+)$/.exec(str);
        if (!match) return null;
        return parseInt(match[1]);
    }

    function getValue(obj, path) {
        if (!path) return obj;
        const properties = path.split('.');
        const prop = properties.shift();
        const index = parseArrayIndex(prop);
        return getValue(obj[(index !== null ? index : prop)], properties.join('.'));
    }
    const callbacks = {
        processValue: (key, value, level, path, isObjectRoot, isArrayElement) => {
            let indent = (' ').repeat(level);
            const arrayName = path.at(-1);
            let arrayLength = 0;
            let belongsToArray = null;
            let arrayIndex = null;
            let isFirstArrayElementEntry = false;
            let arrayInArrayPrefix = ' ';
            if (key === '_0' && isArrayElement) {
                // for every first array element we register the array with a tuple [array.length, 0]
                // the second value of the tuple counts the already processed entries, starts with 0
                arrayLength = getValue(obj, path.join('.')).length;
                arrayMap.set(`${arrayName},${level}`, [arrayLength, 0]);
                // check if there is a direct parent array and we have an array-in-array
                const parentArray = arrayMap.get(`${path.at(-3)},${level - 1}`);
                const isArrayInArray = (path.length > 2 && parentArray !== undefined);
                if (isArrayInArray) {
                    arrayIndex = parseInt(path.at(-2).slice(1));
                    // if the entry for the array itself is the first element of an parent array
                    // it needs a hyphen set in front of it
                    if (parentArray[1] <= arrayIndex) {
                        arrayInArrayPrefix = '-';
                    }
                }
                // important: if it is an array-in-array, the processed entry counter needs to be increased
                if (parentArray) parentArray[1] += 1;
                llmResult += `${isArrayInArray && !llmResult.endsWith('\n') ? '\n' : ''}${indent}${isArrayInArray ? arrayInArrayPrefix : ''}${arrayName}[${arrayLength}]`;
            }
            if (!isArrayElement) {
                // belongsToArray identifies complex types that are within an array 
                // note: isArrayElement is false, only true for simple array elements
                belongsToArray = (path.length > 1 ? arrayMap.get(`${path.at(-2)},${level - 1}`) : undefined);
                if (belongsToArray !== undefined) {
                    arrayIndex = parseInt(path.at(-1).slice(1));
                    if (belongsToArray[1] === arrayIndex) {
                        belongsToArray[1] += 1;
                        isFirstArrayElementEntry = true;
                        llmResult += `${indent}-`;
                    }
                    // print out the complex array member, add newline if its the first entry, omit value if its an object root
                    llmResult += `${!isFirstArrayElementEntry ? `${llmResult.endsWith('\n') ? '' : '\n'}${indent} ` : ''}${key}${isObjectRoot ? '' : `=${value}`}`;
                }
                else {
                    // adjust path length: necessary e.g. for nested object member of anonymous array object members
                    if (path.length > level) indent += (' ').repeat(path.length - level);
                    if (isObjectRoot) {
                        llmResult += `${indent}${key}`;
                    }
                    else {
                        llmResult += `${indent}${key}=${value}\n`;
                    }
                }
            }
            else {
                belongsToArray = arrayMap.get(`${path.at(-1)},${level}`);
                if (belongsToArray !== undefined && !isObjectRoot) {
                    belongsToArray[1] += 1;
                    indent = (' ').repeat(level + 1);
                    if (!llmResult.endsWith('\n')) llmResult += '\n';
                    llmResult += `${indent}-${value}\n`;
                }
            }
        },
        enterLevel: (level) => {
            if (level > 0 && !llmResult.endsWith('\n')) llmResult += '\n';
        },
        exitLevel: (level, path) => {
            if (llmResult.endsWith('\n')) return;
            let belongsToArray = arrayMap.get(`${path.at(-2)},${level - 1}`);
            if (belongsToArray !== undefined && belongsToArray[0] === belongsToArray[1])
                llmResult += '\n';
        }
    };
    jt.traverse(obj, callbacks);
    if (llmResult.endsWith('\n')) llmResult = llmResult.slice(0, -1);
    return llmResult;
};