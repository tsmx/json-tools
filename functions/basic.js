const determineDepth = (jt, obj) => {
    let depth = 0;
    jt.traverse(obj, { enterLevel: (level, path) => { if (level > depth) depth = level; } });
    return depth;
}

module.exports.getDepth = (jt, obj) => {
    return determineDepth(jt, obj);
}

module.exports.isSimple = (jt, obj) => {
    return determineDepth(jt, obj) === 0;
}

module.exports.isComplex = (jt, obj) => {
    return determineDepth(jt, obj) > 0;
}