const { validate } = require('../src/index.bs')
const { email } = require('is_js');
const { number, list, custom } = require('../src/validators.bs')

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
        expect(validation).toEqual([{ path: '', message: '\"cat\" is not a number' }, { path: '', message: '\"dog\" is not a number' }])
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