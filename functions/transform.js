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