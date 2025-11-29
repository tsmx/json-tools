describe('json-tools complex use cases test suite', () => {

    const jt = require('../json-tools');
    const { getTextFileContent } = require('./test-helpers');

    beforeEach(() => {
        jest.resetModules();
    });

    it('tests obfuscation of ip addresses and credit card numbers before converting toLLM', async () => {
        let obj = require('./objects/results.json');
        jt.obfuscate.ipAddresses(obj);
        jt.obfuscate.creditCards(obj);
        const result = jt.transform.toLLM(obj);
        expect(typeof result).toStrictEqual('string');
        expect(result).toStrictEqual(getTextFileContent('expected-results-obfuscated-llm.txt'));
    });

});