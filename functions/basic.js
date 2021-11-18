module.exports.getDepth = (jt, obj) => {
    let depth = 0;
    jt.traverse(obj, { enterLevel: (level, path) => { if (level > depth) depth = level; } });
    return depth;
}