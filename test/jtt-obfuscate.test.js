describe('json-traverse-tools obfuscation functions test suite', () => {

    const jt = require('@tsmx/json-traverse');
    const jtt = require('../json-traverse-tools')(jt);

    beforeEach(() => {
        jest.resetModules();
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

    it('tests string obfuscation with custom parameters', async () => {
        let obj = require('./objects/simple.json');
        expect(obj.firstName).toStrictEqual('Dow')
        expect(obj.lastName).toStrictEqual('Jones');
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual('New York');
        jtt.obfuscateStrings(obj, 'x', 2, 6);
        expect(obj.firstName).toStrictEqual('Doxxxxxx')
        expect(obj.lastName).toStrictEqual('Joxxxxxx');
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual('Nexxxxxx');
    });

    it('tests number obfuscation with standard parameters', async () => {
        let obj = require('./objects/simple.json');
        expect(obj.firstName).toStrictEqual('Dow')
        expect(obj.lastName).toStrictEqual('Jones');
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual('New York');
        jtt.obfuscateNumbers(obj);
        expect(obj.firstName).toStrictEqual('Dow')
        expect(obj.lastName).toStrictEqual('Jones');
        expect(obj.age).toBe('***');
        expect(obj.city).toStrictEqual('New York');
    });

    it('tests number obfuscation with custom parameters', async () => {
        let obj = require('./objects/simple.json');
        expect(obj.firstName).toStrictEqual('Dow')
        expect(obj.lastName).toStrictEqual('Jones');
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual('New York');
        jtt.obfuscateNumbers(obj, 'xxxx');
        expect(obj.firstName).toStrictEqual('Dow')
        expect(obj.lastName).toStrictEqual('Jones');
        expect(obj.age).toBe('xxxx');
        expect(obj.city).toStrictEqual('New York');
    });

});