describe('json-tools basic functions test suite', () => {

    const jt = require('../json-tools');

    beforeEach(() => {
        jest.resetModules();
    });

    it('tests getting the depth of a simple JSON object', async () => {
        let obj = require('./objects/simple.json');
        expect(jt.getDepth(obj)).toBe(0);
    });

    it('tests getting the depth of a nested JSON object with depth 1', async () => {
        let obj = require('./objects/nested-1.json');
        expect(jt.getDepth(obj)).toBe(1);
    });

    it('tests getting the depth of a JSON with a complex array', async () => {
        let obj = require('./objects/array.json');
        expect(jt.getDepth(obj)).toBe(2);
    });

    it('tests getting the depth of a JSON with a complex array and includeArrays=false', async () => {
        let obj = require('./objects/array.json');
        expect(jt.getDepth(obj, false)).toBe(0);
    });

    it('tests positive isSimple check for a JSON object', async () => {
        let obj = require('./objects/simple.json');
        expect(jt.isSimple(obj)).toBeTruthy();
    });

    it('tests negative isSimple check for a JSON object', async () => {
        let obj = require('./objects/nested-1.json');
        expect(jt.isSimple(obj)).toBeFalsy();
    });

    it('tests positive isSimple check for a JSON object with a complex array (includeArrays=false)', async () => {
        let obj = require('./objects/array.json');
        expect(jt.isSimple(obj, false)).toBeTruthy();
    });

    it('tests negative isSimple check for a JSON object with a complex array (includeArrays=true)', async () => {
        let obj = require('./objects/array.json');
        expect(jt.isSimple(obj)).toBeFalsy();
    });

    it('tests positive isComplex check for a JSON object', async () => {
        let obj = require('./objects/simple.json');
        expect(jt.isComplex(obj)).toBeFalsy();
    });

    it('tests negative isComplex check for a JSON object', async () => {
        let obj = require('./objects/nested-1.json');
        expect(jt.isComplex(obj)).toBeTruthy();
    });

    it('tests positive isComplex check for a JSON object with a complex array (includeArrays=false)', async () => {
        let obj = require('./objects/array.json');
        expect(jt.isComplex(obj, false)).toBeFalsy();
    });

    it('tests negative isComplex check for a JSON object with a complex array (includeArrays=true)', async () => {
        let obj = require('./objects/array.json');
        expect(jt.isComplex(obj)).toBeTruthy();
    });

    it('tests typeStats for a simple JSON object', async () => {
        let obj = require('./objects/simple.json');
        let types = jt.typeStats(obj);
        expect(types instanceof Map).toBeTruthy();
        expect(types.get('string')).toStrictEqual(3);
        expect(types.get('number')).toStrictEqual(1);
    });

    it('tests typeStats for a complex JSON object', async () => {
        let obj = require('./objects/complex.json');
        let types = jt.typeStats(obj);
        expect(types instanceof Map).toBeTruthy();
        expect(types.get('string')).toStrictEqual(8);
        expect(types.get('number')).toStrictEqual(1);
        expect(types.get('object')).toStrictEqual(1);
    });

    it('tests typeStats for a JSON object with only an array as root element', async () => {
        let obj = require('./objects/array.json');
        let types = jt.typeStats(obj);
        expect(types instanceof Map).toBeTruthy();
        expect(types.get('string')).toStrictEqual(5);
        expect(types.get('number')).toStrictEqual(2);
        expect(types.get('object')).toStrictEqual(2);
    });

});