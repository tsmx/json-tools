describe('json-tools obfuscation functions test suite', () => {

    const jt = require('../json-tools');

    const defaultReplacement = '***';
    const customReplacement = 'xxxx';

    beforeEach(() => {
        jest.resetModules();
    });

    it('tests string obfuscation with standard parameters', async () => {
        let obj = require('./objects/simple.json');
        expect(obj.firstName).toStrictEqual('Dow');
        expect(obj.lastName).toStrictEqual('Jones');
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual('New York');
        jt.obfuscate.strings(obj);
        expect(obj.firstName).toStrictEqual('Dow');
        expect(obj.lastName).toStrictEqual('Jon***');
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual('New*****');
    });

    it('tests string obfuscation with custom parameters', async () => {
        let obj = require('./objects/simple.json');
        expect(obj.firstName).toStrictEqual('Dow');
        expect(obj.lastName).toStrictEqual('Jones');
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual('New York');
        jt.obfuscate.strings(obj, 'x', 2, 6);
        expect(obj.firstName).toStrictEqual('Doxxxxxx');
        expect(obj.lastName).toStrictEqual('Joxxxxxx');
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual('Nexxxxxx');
    });

    it('tests number obfuscation with standard parameters', async () => {
        let obj = require('./objects/simple.json');
        expect(obj.firstName).toStrictEqual('Dow');
        expect(obj.lastName).toStrictEqual('Jones');
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual('New York');
        jt.obfuscate.numbers(obj);
        expect(obj.firstName).toStrictEqual('Dow');
        expect(obj.lastName).toStrictEqual('Jones');
        expect(obj.age).toStrictEqual(defaultReplacement);
        expect(obj.city).toStrictEqual('New York');
    });

    it('tests number obfuscation with custom parameters', async () => {
        let obj = require('./objects/simple.json');
        expect(obj.firstName).toStrictEqual('Dow');
        expect(obj.lastName).toStrictEqual('Jones');
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual('New York');
        jt.obfuscate.numbers(obj, customReplacement);
        expect(obj.firstName).toStrictEqual('Dow');
        expect(obj.lastName).toStrictEqual('Jones');
        expect(obj.age).toStrictEqual(customReplacement);
        expect(obj.city).toStrictEqual('New York');
    });

    it('tests obfuscation by key regex matching with standard parameters', async () => {
        let obj = require('./objects/simple.json');
        expect(obj.firstName).toStrictEqual('Dow');
        expect(obj.lastName).toStrictEqual('Jones');
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual('New York');
        jt.obfuscate.keyRegex(obj, 'name');
        expect(obj.firstName).toStrictEqual(defaultReplacement);
        expect(obj.lastName).toStrictEqual(defaultReplacement);
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual('New York');
    });

    it('tests obfuscation by key regex matching with custom parameters', async () => {
        let obj = require('./objects/simple.json');
        expect(obj.firstName).toStrictEqual('Dow');
        expect(obj.lastName).toStrictEqual('Jones');
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual('New York');
        jt.obfuscate.keyRegex(obj, 'name', customReplacement);
        expect(obj.firstName).toStrictEqual(customReplacement);
        expect(obj.lastName).toStrictEqual(customReplacement);
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual('New York');
    });

    it('tests obfuscation by value regex matching with standard parameters', async () => {
        let obj = require('./objects/simple.json');
        expect(obj.firstName).toStrictEqual('Dow');
        expect(obj.lastName).toStrictEqual('Jones');
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual('New York');
        jt.obfuscate.valueRegex(obj, 'ork');
        expect(obj.firstName).toStrictEqual('Dow');
        expect(obj.lastName).toStrictEqual('Jones');
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual(defaultReplacement);
    });

    it('tests obfuscation by value regex matching with custom parameters', async () => {
        let obj = require('./objects/simple.json');
        expect(obj.firstName).toStrictEqual('Dow');
        expect(obj.lastName).toStrictEqual('Jones');
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual('New York');
        jt.obfuscate.valueRegex(obj, 'ork', customReplacement);
        expect(obj.firstName).toStrictEqual('Dow');
        expect(obj.lastName).toStrictEqual('Jones');
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual(customReplacement);
    });

    it('tests obfuscation of IP addresses', async () => {
        let obj = require('./objects/ips.json');
        expect(obj.ip).toStrictEqual('10.1.37.100');
        expect(obj.ipv6).toStrictEqual('2001:0db8:3c4d:0015:0000:0000:1a2f:1a2b');
        expect(obj.ipv6Short).toStrictEqual('2001:db8:3c4d:15::1a2f:1a2b');
        expect(obj.internet).toStrictEqual('0.0.0.0');
        expect(obj.invalidIp).toStrictEqual('192.168.0.1.1');
        jt.obfuscate.ipAddresses(obj);
        expect(obj.ip).toStrictEqual(defaultReplacement);
        expect(obj.ipv6).toStrictEqual(defaultReplacement);
        expect(obj.ipv6Short).toStrictEqual(defaultReplacement);
        expect(obj.internet).toStrictEqual(defaultReplacement);
        expect(obj.invalidIp).toStrictEqual('192.168.0.1.1');
    });

    it('tests obfuscation of IP addresses with custom parameters', async () => {
        let obj = require('./objects/ips.json');
        expect(obj.ip).toStrictEqual('10.1.37.100');
        expect(obj.ipv6).toStrictEqual('2001:0db8:3c4d:0015:0000:0000:1a2f:1a2b');
        expect(obj.ipv6Short).toStrictEqual('2001:db8:3c4d:15::1a2f:1a2b');
        expect(obj.internet).toStrictEqual('0.0.0.0');
        expect(obj.invalidIp).toStrictEqual('192.168.0.1.1');
        jt.obfuscate.ipAddresses(obj, customReplacement);
        expect(obj.ip).toStrictEqual(customReplacement);
        expect(obj.ipv6).toStrictEqual(customReplacement);
        expect(obj.ipv6Short).toStrictEqual(customReplacement);
        expect(obj.internet).toStrictEqual(customReplacement);
        expect(obj.invalidIp).toStrictEqual('192.168.0.1.1');
    });

    it('tests obfuscation of credit card numbers', async () => {
        let obj = require('./objects/credit-cards.json');
        expect(obj.visa).toStrictEqual('4012-8888-8888-1881');
        expect(obj.visaDots).toStrictEqual('4012.8888.8888.1881');
        expect(obj.visaWithoutDelimiter).toStrictEqual('4012888888881881');
        jt.obfuscate.creditCards(obj);
        expect(obj.visa).toStrictEqual(defaultReplacement);
        expect(obj.visaDots).toStrictEqual(defaultReplacement);
        expect(obj.visaWithoutDelimiter).toStrictEqual(defaultReplacement);
    });

    it('tests failed obfuscation of an invalid credit card numbers', async () => {
        let obj = require('./objects/credit-cards-invalid.json');
        expect(obj.visa).toStrictEqual('4012-8888-8888-1881-0110');
        jt.obfuscate.creditCards(obj);
        expect(obj.visa).toStrictEqual('4012-8888-8888-1881-0110');
    });

});