const { validate } = require('../src/index.bs')
const { email } = require('is_js');
const { number, string, list, record, tuple, custom, not, any, exists } = require('../src/validators.bs')

describe('simple', () => {
    test('valid', () => {
        const value = 3;
        const validation = validate(number, value)
        expect(validation).toEqual([])
    })
    test('invalid', () => {
        const value = 'cat';
        const validation = validate(number, value)
        expect(validation).toEqual([{ message: '\"cat\" is not a number', path: '' }])
    })
})

describe('list', () => {
    test('valid', () => {
        const value = [1, 2, 3]
        const schema = list(number)
        const validation = validate(schema, value)
        expect(validation).toEqual([])
    })
    test('invalid', () => {
        const value = ["cat", 2, "dog"]
        const schema = list(number)
        const validation = validate(schema, value)
        expect(validation).toEqual([{ path: '0', message: '\"cat\" is not a number' }, { path: '2', message: '\"dog\" is not a number' }])
    })
})

describe('record', () => {
    test('valid', () => {
        const value = { age: 12, xp: 100 }
        const schema = record({
            age: number,
            xp: number
        })
        const validation = validate(schema, value)
        expect(validation).toEqual([])
    })
    test('invalid: value type', () => {
        const value = { age: 12, xp: "cat" }
        const schema = record({
            age: number,
            xp: number
        })
        const validation = validate(schema, value)
        expect(validation).toEqual([{ path: 'xp', message: "\"cat\" is not a number" }])
    })
    test('invalid: missing key', () => {
        const value = { xp: 100 }
        const schema = record({
            age: number,
            xp: number
        })
        const validation = validate(schema, value)
        expect(validation).toEqual([{ path: '', message: "key: age not found" }])
    })
})

describe('tuple', () => {
    test('valid', () => {
        const value = ["cat", 100]
        const schema = tuple([string, number])
        const validation = validate(schema, value)
        expect(validation).toEqual([])
    })
    test('invalid: index out of range', () => {
        const value = ["cat"]
        const schema = tuple([string, number])
        const validation = validate(schema, value)
        expect(validation).toEqual([{ path: '', message: "index: 1 out of range" }])
    })
    test('invalid: value type', () => {
        const value = ["cat", "dog"]
        const schema = tuple([string, number])
        const validation = validate(schema, value)
        expect(validation).toEqual([{ path: '1', message: "\"dog\" is not a number" }])
    })
})

describe('complex', () => {
    test('valid: list of objects', () => {
        const value = [{ xp: 100 }, { xp: 120 }, { xp: 0 }]
        const schema = list(record({ xp: number }))
        const validation = validate(schema, value)
        expect(validation).toEqual([])
    })
    test('valid: object of list', () => {
        const value = { xp: 100, luckyNumbers: [1, 4, 8] }
        const schema = record({ xp: number, luckyNumbers: list(number) })
        const validation = validate(schema, value)
        expect(validation).toEqual([])
    })
})

describe('custom', () => {
    test('valid', () => {
        const value = 'test@test.com'
        const customValidator = custom({
            validator: email,
            message: val => `${val} is not an email`
        })
        const validation = validate(customValidator, value)
        expect(validation).toEqual([])
    })
    test('invalid', () => {
        const value = 'testtest.com'
        const customValidator = custom({
            validator: email,
            message: val => `${val} is not an email`
        })
        const validation = validate(customValidator, value)
        expect(validation).toEqual([{ path: '', message: 'testtest.com is not an email' }])
    })
})

describe('not', () => {
    test('valid', () => {
        const value = 'cat'
        const validator = not(number)
        const validation = validate(validator, value)
        expect(validation).toEqual([])
    })
    test('invalid', () => {
        const value = 3
        const validator = not(number)
        const validation = validate(validator, value)
        expect(validation).toEqual([{ path: '', message: '3 is a number' }])
    })
})

describe('any', () => {
    test('valid', () => {
        const value = 'cat'
        const validator = any([number, string])
        const validation = validate(validator, value)
        expect(validation).toEqual([])
    })
    test('invalid', () => {
        const value = []
        const validator = any([number, string])
        const validation = validate(validator, value)
        expect(validation).toEqual([
            { path: '', message: '[] is not a number' },
            { path: '', message: '[] is not a string' }
        ])
    })
})

describe('exists', () => {
    test('valid', () => {
        const value = 3
        const validator = exists
        const validation = validate(validator, value)
        expect(validation).toEqual([])
    })
})