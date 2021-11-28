describe('json-tools basic functions test suite', () => {

    const jt = require('@tsmx/json-traverse');
    const jtt = require('../json-tools')(jt);

    beforeEach(() => {
        jest.resetModules();
    });

    it('tests getting the depth of a simple JSON object', async () => {
        let obj = require('./objects/simple.json');
        expect(jtt.getDepth(obj)).toBe(0);
    });

    it('tests getting the depth of a nested JSON object with depth 1', async () => {
        let obj = require('./objects/nested-1.json');
        expect(jtt.getDepth(obj)).toBe(1);
    });

    it('tests getting the depth of a JSON with a complex array', async () => {
        let obj = require('./objects/array.json');
        expect(jtt.getDepth(obj)).toBe(2);
    });

    it('tests getting the depth of a JSON with a complex array and includeArrays=false', async () => {
        let obj = require('./objects/array.json');
        expect(jtt.getDepth(obj, false)).toBe(0);
    });

    it('tests positive isSimple check for a JSON object', async () => {
        let obj = require('./objects/simple.json');
        expect(jtt.isSimple(obj)).toBeTruthy();
    });

    it('tests negative isSimple check for a JSON object', async () => {
        let obj = require('./objects/nested-1.json');
        expect(jtt.isSimple(obj)).toBeFalsy();
    });

    it('tests positive isSimple check for a JSON object with a complex array (includeArrays=false)', async () => {
        let obj = require('./objects/array.json');
        expect(jtt.isSimple(obj, false)).toBeTruthy();
    });

    it('tests negative isSimple check for a JSON object with a complex array (includeArrays=true)', async () => {
        let obj = require('./objects/array.json');
        expect(jtt.isSimple(obj)).toBeFalsy();
    });

    it('tests positive isComplex check for a JSON object', async () => {
        let obj = require('./objects/simple.json');
        expect(jtt.isComplex(obj)).toBeFalsy();
    });

    it('tests negative isComplex check for a JSON object', async () => {
        let obj = require('./objects/nested-1.json');
        expect(jtt.isComplex(obj)).toBeTruthy();
    });

    it('tests positive isComplex check for a JSON object with a complex array (includeArrays=false)', async () => {
        let obj = require('./objects/array.json');
        expect(jtt.isComplex(obj, false)).toBeFalsy();
    });

    it('tests negative isComplex check for a JSON object with a complex array (includeArrays=true)', async () => {
        let obj = require('./objects/array.json');
        expect(jtt.isComplex(obj)).toBeTruthy();
    });

});