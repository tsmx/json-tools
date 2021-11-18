describe('json-traverse-tools basic functions test suite', () => {

    const jt = require('@tsmx/json-traverse');
    const jtt = require('../json-traverse-tools')(jt);

    it('tests getting the depth of a simple JSON object', async () => {
        let obj = require('./objects/simple.json');
        expect(jtt.getDepth(obj)).toBe(0);
    });

    it('tests getting the depth of a nested JSON object with depth 1', async () => {
        let obj = require('./objects/nested-1.json');
        expect(jtt.getDepth(obj)).toBe(1);
    });

    it('tests successful isSimple check for a JSON object', async () => {
        let obj = require('./objects/simple.json');
        expect(jtt.isSimple(obj)).toBeTruthy();
    });

    it('tests failed isSimple check for a JSON object', async () => {
        let obj = require('./objects/nested-1.json');
        expect(jtt.isSimple(obj)).toBeFalsy();
    });

    it('tests successful isComplex check for a JSON object', async () => {
        let obj = require('./objects/simple.json');
        expect(jtt.isComplex(obj)).toBeFalsy();
    });

    it('tests failed isComplex check for a JSON object', async () => {
        let obj = require('./objects/nested-1.json');
        expect(jtt.isComplex(obj)).toBeTruthy();
    });

});