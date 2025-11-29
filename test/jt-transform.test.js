describe('json-tools transform functions test suite', () => {

    const { transform } = require('../json-tools');
    const { getTextFileContent } = require('./test-helpers');

    beforeEach(() => {
        jest.resetModules();
    });

    it('tests toMap for a simple JSON object', async () => {
        let obj = require('./objects/simple.json');
        let result = transform.toMap(obj);
        expect(result instanceof Map).toBeTruthy();
        expect(result.size).toBe(4);
        expect(result.get('firstName')).toStrictEqual('Dow');
        expect(result.get('lastName')).toStrictEqual('Jones');
        expect(result.get('age')).toStrictEqual(30);
        expect(result.get('city')).toStrictEqual('New York');
    });

    it('tests toMap for a complex JSON object', async () => {
        let obj = require('./objects/complex.json');
        let result = transform.toMap(obj);
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
        let result = transform.toArray(obj);
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
        let result = transform.toArray(obj);
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
        let result = transform.toProperties(obj);
        expect(typeof result).toStrictEqual('string');
        let output = result.split('\r\n');
        expect(output.length).toBe(4);
        expect(output[0]).toStrictEqual('firstName=Dow');
        expect(output[1]).toStrictEqual('lastName=Jones');
        expect(output[2]).toStrictEqual('age=30');
        expect(output[3]).toStrictEqual('city=New York');
    });

    it('tests toProperties for a complex JSON object', async () => {
        let obj = require('./objects/complex.json');
        let result = transform.toProperties(obj);
        expect(typeof result).toStrictEqual('string');
        let output = result.split('\r\n');
        expect(output.length).toBe(7);
        expect(output[0]).toStrictEqual('firstName=Dow');
        expect(output[1]).toStrictEqual('lastName=Jones');
        expect(output[2]).toStrictEqual('age=30');
        expect(output[3]).toStrictEqual('city=New York');
        expect(output[4]).toStrictEqual('country.name=United States');
        expect(output[5]).toStrictEqual('country.code=US');
        expect(output[6]).toStrictEqual('hobbies=travelling,reading,cooking');
    });

    it('tests toProperties for a complex JSON object with array expanding', async () => {
        let obj = require('./objects/complex.json');
        let result = transform.toProperties(obj, true);
        expect(typeof result).toStrictEqual('string');
        let output = result.split('\r\n');
        expect(output.length).toBe(9);
        expect(output[0]).toStrictEqual('firstName=Dow');
        expect(output[1]).toStrictEqual('lastName=Jones');
        expect(output[2]).toStrictEqual('age=30');
        expect(output[3]).toStrictEqual('city=New York');
        expect(output[4]).toStrictEqual('country.name=United States');
        expect(output[5]).toStrictEqual('country.code=US');
        expect(output[6]).toStrictEqual('hobbies.0=travelling');
        expect(output[7]).toStrictEqual('hobbies.1=reading');
        expect(output[8]).toStrictEqual('hobbies.2=cooking');
    });

    it('tests toPropertiesFlat for a simple JSON object', async () => {
        let obj = require('./objects/simple.json');
        let result = transform.toPropertiesFlat(obj);
        expect(typeof result).toStrictEqual('string');
        let output = result.split('\r\n');
        expect(output.length).toBe(4);
        expect(output[0]).toStrictEqual('firstName=Dow');
        expect(output[1]).toStrictEqual('lastName=Jones');
        expect(output[2]).toStrictEqual('age=30');
        expect(output[3]).toStrictEqual('city=New York');
    });

    it('tests toPropertiesFlat for a complex JSON object', async () => {
        let obj = require('./objects/complex.json');
        let result = transform.toPropertiesFlat(obj);
        expect(typeof result).toStrictEqual('string');
        let output = result.split('\r\n');
        expect(output.length).toBe(6);
        expect(output[0]).toStrictEqual('firstName=Dow');
        expect(output[1]).toStrictEqual('lastName=Jones');
        expect(output[2]).toStrictEqual('age=30');
        expect(output[3]).toStrictEqual('city=New York');
        expect(output[4]).toStrictEqual('country={"name":"United States","code":"US"}');
        expect(output[5]).toStrictEqual('hobbies=travelling,reading,cooking');
    });

    it('tests toPropertiesFlat for an array-only JSON object', async () => {
        let obj = require('./objects/array.json');
        let result = transform.toPropertiesFlat(obj);
        expect(typeof result).toStrictEqual('string');
        let output = result.split('\r\n');
        expect(output.length).toBe(1);
        expect(output[0]).toStrictEqual('testArray=1,2,{"firstName":"Dow","lastName":"Jones",' +
            '"country":{"name":"United States","code":"US"}},four');
    });

    it('tests toPropertiesFlat for an array-only JSON object with array expanding', async () => {
        let obj = require('./objects/array.json');
        let result = transform.toPropertiesFlat(obj, true);
        expect(typeof result).toStrictEqual('string');
        let output = result.split('\r\n');
        expect(output.length).toBe(4);
        expect(output[0]).toStrictEqual('testArray.0=1');
        expect(output[1]).toStrictEqual('testArray.1=2');
        expect(output[2]).toStrictEqual('testArray.2={"firstName":"Dow","lastName":"Jones",' +
            '"country":{"name":"United States","code":"US"}}');
        expect(output[3]).toStrictEqual('testArray.3=four');
    });

    it('tests toLLM for a simple JSON object', async () => {
        let obj = require('./objects/simple.json');
        let result = transform.toLLM(obj);
        expect(typeof result).toStrictEqual('string');
        expect(result).toStrictEqual(getTextFileContent('expected-simple-llm.txt'));
    });

    it('tests toLLM for a very complex JSON object', async () => {
        let obj = require('./objects/very-complex.json');
        let result = transform.toLLM(obj);
        expect(typeof result).toStrictEqual('string');
        expect(result).toStrictEqual(getTextFileContent('expected-very-complex-llm.txt'));
    });

    it('tests toLLM for a JSON object only containing an array', async () => {
        let obj = require('./objects/array.json');
        let result = transform.toLLM(obj);
        expect(typeof result).toStrictEqual('string');
        expect(result).toStrictEqual(getTextFileContent('expected-array-llm.txt'));
    });

    it('tests toLLM for a JSON object with array-in-array scenario 1', async () => {
        let obj = require('./objects/array-in-array-1.json');
        let result = transform.toLLM(obj);
        expect(typeof result).toStrictEqual('string');
        expect(result).toStrictEqual(getTextFileContent('expected-array-in-array-1-llm.txt'));
    });

    it('tests toLLM for a JSON object with array-in-array scenario 2', async () => {
        let obj = require('./objects/array-in-array-2.json');
        let result = transform.toLLM(obj);
        expect(typeof result).toStrictEqual('string');
        expect(result).toStrictEqual(getTextFileContent('expected-array-in-array-2-llm.txt'));
    });

});