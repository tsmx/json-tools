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

module.exports.toMap = (jt, obj) => {
    let result = new Map();
    jt.traverse(obj, { processValue: (key, value, level, path, isObjectRoot, isArrayElement, cbSetValue) => { result.set(key, value); } }, true);
    return result;
}