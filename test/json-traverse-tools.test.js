describe('json-traverse-tools test suite', () => {

    const jt = require('@tsmx/json-traverse');
    const jtt = require('../json-traverse-tools')(jt);

    it('tests getting the depth of a simple JSON object', async () => {
        let obj = require('./objects/simple.json');
        expect(jtt.getDepth(obj)).toBe(0);
    });

});