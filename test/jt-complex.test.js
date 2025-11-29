describe('json-tools complex use cases test suite', () => {

    const fs = require('fs');
    const path = require('path');

    const jt = require('../json-tools');

    beforeEach(() => {
        jest.resetModules();
    });

    const getTextFileContent = (fileName) => {
        const filePath = path.join(__dirname, 'objects', fileName);
        return fs.readFileSync(filePath, 'utf-8');
    };

    it('tests obfuscation of ip addresses and credit card numbers before converting toLLM', async () => {
        let obj = require('./objects/results.json');
        jt.obfuscate.ipAddresses(obj);
        jt.obfuscate.creditCards(obj);
        const result = jt.transform.toLLM(obj);
        expect(typeof result).toStrictEqual('string');
        expect(result).toStrictEqual(getTextFileContent('expected-results-obfuscated-llm.txt'));
    });

});