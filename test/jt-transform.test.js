describe('json-tools transform functions test suite', () => {

    const jt = require('../json-tools');

    beforeEach(() => {
        jest.resetModules();
    });

    it('tests toMap for a simple JSON object', async () => {
        let obj = require('./objects/simple.json');
        let result = jt.transform.toMap(obj);
        expect(result instanceof Map).toBeTruthy();
        expect(result.size).toBe(4);
        expect(result.get('firstName')).toStrictEqual('Dow');
        expect(result.get('lastName')).toStrictEqual('Jones');
        expect(result.get('age')).toStrictEqual(30);
        expect(result.get('city')).toStrictEqual('New York');
    });

    it('tests toMap for a complex JSON object', async () => {
        let obj = require('./objects/complex.json');
        let result = jt.transform.toMap(obj);
        expect(result instanceof Map).toBeTruthy();
        expect(result.size).toBe(6);
        expect(result.get('firstName')).toStrictEqual('Dow');
        expect(result.get('lastName')).toStrictEqual('Jones');
        expect(result.get('age')).toStrictEqual(30);
        expect(result.get('city')).toStrictEqual('New York');
        let subObject = result.get('country');
        expect(subObject).toBeDefined();
        expect(subObject instanceof Object).toBeTruthy();
        expect(subObject.name).toStrictEqual('United States');
        expect(subObject.code).toStrictEqual('US');
        let subArray = result.get('hobbies');
        expect(subArray).toBeDefined();
        expect(Array.isArray(subArray)).toBeTruthy();
        expect(subArray.length).toBe(3);
        expect(subArray[0]).toStrictEqual('travelling');
        expect(subArray[1]).toStrictEqual('reading');
        expect(subArray[2]).toStrictEqual('cooking');
    });

    it('tests toArray for a simple JSON object', async () => {
        let obj = require('./objects/simple.json');
        let result = jt.transform.toArray(obj);
        expect(result instanceof Array).toBeTruthy();
        expect(result.length).toBe(4);
        expect(result[0].key).toStrictEqual('firstName');
        expect(result[0].value).toStrictEqual('Dow');
        expect(result[1].key).toStrictEqual('lastName');
        expect(result[1].value).toStrictEqual('Jones');
        expect(result[2].key).toStrictEqual('age');
        expect(result[2].value).toStrictEqual(30);
        expect(result[3].key).toStrictEqual('city');
        expect(result[3].value).toStrictEqual('New York');
    });

    it('tests toArray for a complex JSON object', async () => {
        let obj = require('./objects/complex.json');
        let result = jt.transform.toArray(obj);
        expect(result instanceof Array).toBeTruthy();
        expect(result.length).toBe(6);
        expect(result[0].key).toStrictEqual('firstName');
        expect(result[0].value).toStrictEqual('Dow');
        expect(result[1].key).toStrictEqual('lastName');
        expect(result[1].value).toStrictEqual('Jones');
        expect(result[2].key).toStrictEqual('age');
        expect(result[2].value).toStrictEqual(30);
        expect(result[3].key).toStrictEqual('city');
        expect(result[3].value).toStrictEqual('New York');
        expect(result[4].key).toStrictEqual('country');
        expect(result[4].value.name).toStrictEqual('United States');
        expect(result[4].value.code).toStrictEqual('US');
        expect(result[5].key).toStrictEqual('hobbies');
        expect(result[5].value instanceof Array).toBeTruthy();
        expect(result[5].value.length).toStrictEqual(3);
        expect(result[5].value[0]).toStrictEqual('travelling');
        expect(result[5].value[1]).toStrictEqual('reading');
        expect(result[5].value[2]).toStrictEqual('cooking');
    });

    it('tests toProperties for a simple JSON object', async () => {
        let obj = require('./objects/simple.json');
        let result = jt.transform.toProperties(obj);
        console.log(result);
        expect(typeof result).toStrictEqual('string');
    });

    it('tests toProperties for a complex JSON object', async () => {
        let obj = require('./objects/complex.json');
        let result = jt.transform.toProperties(obj);
        console.log(result);
        expect(typeof result).toStrictEqual('string');
    });

    it('tests toPropertiesFlat for a simple JSON object', async () => {
        let obj = require('./objects/simple.json');
        let result = jt.transform.toPropertiesFlat(obj);
        console.log(result);
        expect(typeof result).toStrictEqual('string');
    });

    it('tests toPropertiesFlat for a complex JSON object', async () => {
        let obj = require('./objects/complex.json');
        let result = jt.transform.toPropertiesFlat(obj);
        console.log(result);
        expect(typeof result).toStrictEqual('string');
    });

});