describe('json-traverse-tools obfuscation functions test suite', () => {

    const jt = require('@tsmx/json-traverse');
    const jtt = require('../json-traverse-tools')(jt);

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