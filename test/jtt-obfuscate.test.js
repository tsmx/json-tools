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
        jtt.obfuscate.strings(obj);
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
        jtt.obfuscate.strings(obj, 'x', 2, 6);
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
        jtt.obfuscate.numbers(obj);
        expect(obj.firstName).toStrictEqual('Dow')
        expect(obj.lastName).toStrictEqual('Jones');
        expect(obj.age).toStrictEqual('***');
        expect(obj.city).toStrictEqual('New York');
    });

    it('tests number obfuscation with custom parameters', async () => {
        let obj = require('./objects/simple.json');
        expect(obj.firstName).toStrictEqual('Dow')
        expect(obj.lastName).toStrictEqual('Jones');
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual('New York');
        jtt.obfuscate.numbers(obj, 'xxxx');
        expect(obj.firstName).toStrictEqual('Dow')
        expect(obj.lastName).toStrictEqual('Jones');
        expect(obj.age).toStrictEqual('xxxx');
        expect(obj.city).toStrictEqual('New York');
    });

    it('tests obfuscation by key regex matching with standard parameters', async () => {
        let obj = require('./objects/simple.json');
        expect(obj.firstName).toStrictEqual('Dow')
        expect(obj.lastName).toStrictEqual('Jones');
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual('New York');
        jtt.obfuscate.keyRegex(obj, 'name');
        expect(obj.firstName).toStrictEqual('***')
        expect(obj.lastName).toStrictEqual('***');
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual('New York');
    });

    it('tests obfuscation by key regex matching with custom parameters', async () => {
        let obj = require('./objects/simple.json');
        expect(obj.firstName).toStrictEqual('Dow')
        expect(obj.lastName).toStrictEqual('Jones');
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual('New York');
        jtt.obfuscate.keyRegex(obj, 'name', 'xxxx');
        expect(obj.firstName).toStrictEqual('xxxx')
        expect(obj.lastName).toStrictEqual('xxxx');
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual('New York');
    });

    it('tests obfuscation by value regex matching with standard parameters', async () => {
        let obj = require('./objects/simple.json');
        expect(obj.firstName).toStrictEqual('Dow')
        expect(obj.lastName).toStrictEqual('Jones');
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual('New York');
        jtt.obfuscate.valueRegex(obj, 'ork');
        expect(obj.firstName).toStrictEqual('Dow')
        expect(obj.lastName).toStrictEqual('Jones');
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual('***');
    });

    it('tests obfuscation by value regex matching with custom parameters', async () => {
        let obj = require('./objects/simple.json');
        expect(obj.firstName).toStrictEqual('Dow')
        expect(obj.lastName).toStrictEqual('Jones');
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual('New York');
        jtt.obfuscate.valueRegex(obj, 'ork', 'xxxx');
        expect(obj.firstName).toStrictEqual('Dow')
        expect(obj.lastName).toStrictEqual('Jones');
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual('xxxx');
    });

});