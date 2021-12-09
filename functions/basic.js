const determineDepth = (jt, obj, includeArrays) => {
    let depth = 0;
    jt.traverse(obj, { enterLevel: (level, path) => { if (level > depth) depth = level; } }, !includeArrays);
    return depth;
}

module.exports.getDepth = (jt, obj, includeArrays) => {
    return determineDepth(jt, obj, includeArrays);
}

module.exports.isSimple = (jt, obj, includeArrays) => {
    return determineDepth(jt, obj, includeArrays) === 0;
}

module.exports.isComplex = (jt, obj, includeArrays) => {
    return determineDepth(jt, obj, includeArrays) > 0;
}

module.exports.typeStats = (jt, obj) => {
    let types = new Map();
    const callbacks = {
        processValue: (key, value, level, path, isObjectRoot, isArrayElement, cbSetValue) => {
            let t = typeof value;
            if (types.has(t)) {
                types.set(t, types.get(t) + 1);
            }
            else {
                types.set(t, 1);
            }
        }
    }
    jt.traverse(obj, callbacks);
    return types;
}