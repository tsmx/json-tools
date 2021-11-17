describe('json-traverse-tools test suite', () => {

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

    it('tests string obfuscation with standard parameters', async () => {
        let obj = require('./objects/simple.json');
        expect(obj.firstName).toStrictEqual('Dow')
        expect(obj.lastName).toStrictEqual('Jones');
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual('New York');
        jtt.obfuscateStrings(obj);
        expect(obj.firstName).toStrictEqual('Dow')
        expect(obj.lastName).toStrictEqual('Jon***');
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual('New*****');
    });

});