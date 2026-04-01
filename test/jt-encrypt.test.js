describe('json-tools encryption functions test suite', () => {

    const { encrypt, decrypt } = require('../json-tools');

    const testKey = '0123456789abcdefghijklmnopqrstuv';

    beforeEach(() => {
        jest.resetModules();
    });

    it('tests string encryption and decryption round-trip', () => {
        let obj = require('./objects/simple.json');
        const originalFirstName = obj.firstName;
        const originalLastName = obj.lastName;
        const originalCity = obj.city;
        encrypt.strings(obj, testKey);
        expect(obj.firstName).not.toStrictEqual(originalFirstName);
        expect(obj.lastName).not.toStrictEqual(originalLastName);
        expect(obj.city).not.toStrictEqual(originalCity);
        expect(obj.firstName.startsWith('ENCRYPTED|')).toBeTruthy();
        expect(obj.lastName.startsWith('ENCRYPTED|')).toBeTruthy();
        expect(obj.city.startsWith('ENCRYPTED|')).toBeTruthy();
        expect(obj.age).toBe(30);
        decrypt(obj, testKey);
        expect(obj.firstName).toStrictEqual(originalFirstName);
        expect(obj.lastName).toStrictEqual(originalLastName);
        expect(obj.city).toStrictEqual(originalCity);
        expect(obj.age).toBe(30);
    });

    it('tests credit card encryption and decryption round-trip', () => {
        let obj = require('./objects/credit-cards.json');
        const originalVisa = obj.visa;
        const originalVisaDots = obj.visaDots;
        const originalVisaWhitespaces = obj.visaWhitespaces;
        const originalVisaWithoutDelimiter = obj.visaWithoutDelimiter;
        const originalAmex = obj.amex;
        const originalAmexDots = obj.amexDots;
        const originalAmexWhitespaces = obj.amexWhitespaces;
        const originalAmexWithoutDelimiter = obj.amexWithoutDelimiter;
        encrypt.creditCards(obj, testKey);
        expect(obj.visa.startsWith('ENCRYPTED|')).toBeTruthy();
        expect(obj.visaDots.startsWith('ENCRYPTED|')).toBeTruthy();
        expect(obj.visaWhitespaces.startsWith('ENCRYPTED|')).toBeTruthy();
        expect(obj.visaWithoutDelimiter.startsWith('ENCRYPTED|')).toBeTruthy();
        expect(obj.amex.startsWith('ENCRYPTED|')).toBeTruthy();
        expect(obj.amexDots.startsWith('ENCRYPTED|')).toBeTruthy();
        expect(obj.amexWhitespaces.startsWith('ENCRYPTED|')).toBeTruthy();
        expect(obj.amexWithoutDelimiter.startsWith('ENCRYPTED|')).toBeTruthy();
        expect(obj.timestamp).toStrictEqual('2025-01-01T12:00:00Z');
        expect(obj.dateEN).toStrictEqual('07/20/2025');
        expect(obj.dateDE).toStrictEqual('20.07.2025');
        expect(obj.price).toStrictEqual('199.99 EUR');
        decrypt(obj, testKey);
        expect(obj.visa).toStrictEqual(originalVisa);
        expect(obj.visaDots).toStrictEqual(originalVisaDots);
        expect(obj.visaWhitespaces).toStrictEqual(originalVisaWhitespaces);
        expect(obj.visaWithoutDelimiter).toStrictEqual(originalVisaWithoutDelimiter);
        expect(obj.amex).toStrictEqual(originalAmex);
        expect(obj.amexDots).toStrictEqual(originalAmexDots);
        expect(obj.amexWhitespaces).toStrictEqual(originalAmexWhitespaces);
        expect(obj.amexWithoutDelimiter).toStrictEqual(originalAmexWithoutDelimiter);
        expect(obj.timestamp).toStrictEqual('2025-01-01T12:00:00Z');
        expect(obj.dateEN).toStrictEqual('07/20/2025');
        expect(obj.dateDE).toStrictEqual('20.07.2025');
        expect(obj.price).toStrictEqual('199.99 EUR');
    });

    it('tests IP address encryption and decryption round-trip', () => {
        let obj = require('./objects/ips.json');
        const originalIp = obj.ip;
        const originalIpv6 = obj.ipv6;
        const originalIpv6Short = obj.ipv6Short;
        const originalInternet = obj.internet;
        const originalInvalidIp = obj.invalidIp;
        encrypt.ipAddresses(obj, testKey);
        expect(obj.ip.startsWith('ENCRYPTED|')).toBeTruthy();
        expect(obj.ipv6.startsWith('ENCRYPTED|')).toBeTruthy();
        expect(obj.ipv6Short.startsWith('ENCRYPTED|')).toBeTruthy();
        expect(obj.internet.startsWith('ENCRYPTED|')).toBeTruthy();
        expect(obj.invalidIp).toStrictEqual(originalInvalidIp);
        decrypt(obj, testKey);
        expect(obj.ip).toStrictEqual(originalIp);
        expect(obj.ipv6).toStrictEqual(originalIpv6);
        expect(obj.ipv6Short).toStrictEqual(originalIpv6Short);
        expect(obj.internet).toStrictEqual(originalInternet);
        expect(obj.invalidIp).toStrictEqual(originalInvalidIp);
    });

    it('tests key regex encryption and decryption round-trip', () => {
        let obj = require('./objects/simple.json');
        const originalFirstName = obj.firstName;
        const originalLastName = obj.lastName;
        encrypt.keyRegex(obj, 'name', testKey);
        expect(obj.firstName.startsWith('ENCRYPTED|')).toBeTruthy();
        expect(obj.lastName.startsWith('ENCRYPTED|')).toBeTruthy();
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual('New York');
        decrypt(obj, testKey);
        expect(obj.firstName).toStrictEqual(originalFirstName);
        expect(obj.lastName).toStrictEqual(originalLastName);
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual('New York');
    });

    it('tests value regex encryption and decryption round-trip', () => {
        let obj = require('./objects/simple.json');
        const originalCity = obj.city;
        encrypt.valueRegex(obj, 'ork', testKey);
        expect(obj.firstName).toStrictEqual('Dow');
        expect(obj.lastName).toStrictEqual('Jones');
        expect(obj.age).toBe(30);
        expect(obj.city.startsWith('ENCRYPTED|')).toBeTruthy();
        decrypt(obj, testKey);
        expect(obj.firstName).toStrictEqual('Dow');
        expect(obj.lastName).toStrictEqual('Jones');
        expect(obj.age).toBe(30);
        expect(obj.city).toStrictEqual(originalCity);
    });

});
