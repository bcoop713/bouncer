// const { email } = require('is_js');
const {
    number,
    string,
    list,
    record,
    tuple,
    custom,
    not,
    any,
    all,
    // exists,
    // optional,
    maxStringLength,
    minStringLength,
    validate
} = require('../bundle.js')

fdescribe('simple', () => {
    test('valid', () => {
        const value = 3;
        const validation = validate(number, value)
        expect(validation).toEqual([])
    })
    test('invalid', () => {
        const value = 'cat';
        const validation = validate(number, value)
        expect(validation).toEqual([{ target: 'cat', path: '', name: 'number' }])
    })
})

fdescribe('list', () => {
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
        expect(validation).toEqual([{ path: '0', target: 'cat', name: 'number' }, { path: '2', target: "dog", name: 'number' }])
    })
})

fdescribe('record', () => {
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
        expect(validation).toEqual([{ path: 'xp', name: "number", target: "cat" }])
    })
    test('invalid: missing key', () => {
        const value = { xp: 100 }
        const schema = record({
            age: number,
            xp: number
        })
        const validation = validate(schema, value)
        expect(validation).toEqual([{ path: 'age', name: "key", target: value }])
    })
})

fdescribe('tuple', () => {
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
        expect(validation).toEqual([{ path: '1', name: "index", target: value }])
    })
    test('invalid: value type', () => {
        const value = ["cat", "dog"]
        const schema = tuple([string, number])
        const validation = validate(schema, value)
        expect(validation).toEqual([{ path: '1', name: "number", target: "dog" }])
    })
})

fdescribe('complex', () => {
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

fdescribe('custom', () => {
    test('valid', () => {
        const value = 7
        const customValidator = custom(val => val > 5, 'greater than 5')
        const validation = validate(customValidator, value)
        expect(validation).toEqual([])
    })
    test('invalid', () => {
        const value = 4
        const customValidator = custom(val => val > 5, 'greater than 5')
        const validation = validate(customValidator, value)
        expect(validation).toEqual([{ path: '', name: 'greater than 5', target: 4 }])
    })
})

fdescribe('not', () => {
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
        expect(validation).toEqual([{ path: '', name: 'not number', target: 3 }])
    })
})

fdescribe('any', () => {
    test('valid', () => {
        const value = 'cat'
        const validator = any([number, string])
        const validation = validate(validator, value)
        expect(validation).toEqual([])
    })
    test('invalid', () => {
        const value = true
        const validator = any([number, string])
        const validation = validate(validator, value)
        expect(validation).toEqual([{ path: '', name: 'any: number string', target: true }])
    })
})

fdescribe('minStringLength', () => {
    test('valid', () => {
        const value = 'cat'
        const validator = minStringLength(2)
        const validation = validate(validator, value)
        expect(validation).toEqual([])
    })
    test('invalid', () => {
        const value = 'c'
        const validator = minStringLength(2)
        const validation = validate(validator, value)
        expect(validation).toEqual([{ path: '', name: 'minStringLength: 2', target: 'c' }])
    })
})

fdescribe('maxStringLength', () => {
    test('valid', () => {
        const value = 'cat'
        const validator = maxStringLength(4)
        const validation = validate(validator, value)
        expect(validation).toEqual([])
    })
    test('invalid', () => {
        const value = 'catssuck'
        const validator = maxStringLength(4)
        const validation = validate(validator, value)
        expect(validation).toEqual([{ path: '', name: 'maxStringLength: 4', target: 'catssuck' }])
    })
})

fdescribe('all', () => {
    test('valid', () => {
        const value = 'cat'
        const validator = all([minStringLength(3), maxStringLength(4)])
        const validation = validate(validator, value)
        expect(validation).toEqual([])
    })
    test('invalid', () => {
        const value = 'ca'
        const validator = all([minStringLength(3), maxStringLength(4)])
        const validation = validate(validator, value)
        expect(validation).toEqual([{ path: '', name: 'minStringLength: 3', target: 'ca' }])
    })
})

describe('exists', () => {
    test('valid', () => {
        const value = 3
        const validator = exists
        const validation = validate(validator, value)
        expect(validation).toEqual([])
    })
    test('invalid', () => {
        const value = undefined
        const validator = exists
        const validation = validate(validator, value)
        expect(validation).toEqual([{ path: '', message: 'undefined is a undefined' }])
    })
})

describe('optional', () => {
    test('valid value', () => {
        const value = 3
        const validator = optional(number)
        const validation = validate(validator, value)
        expect(validation).toEqual([])
    })
    test('valid missing', () => {
        const value = null
        const validator = optional(number)
        const validation = validate(validator, value)
        expect(validation).toEqual([])
    })
    test('valid missing key', () => {
        const value = { a: 'cat' }
        const validator = record({ a: string, b: optional(string) })
        const validation = validate(validator, value)
        expect(validation).toEqual([])
    })
    test('invalid key', () => {
        const value = { a: 'cat', b: 3 }
        const validator = record({ a: string, b: optional(string) })
        const validation = validate(validator, value)
        expect(validation).toEqual([
            { path: 'b', message: '3 is a not' },
            { path: 'b', message: '3 is not a string' }
        ])
    })
})

xdescribe('parse', () => {
    test('number', () => {
        const validator = number('any number')
        expect(parse(validator)).toEqual([{
            input: 'number',
            validator: validator.validator,
            type: 'number',
            description: 'Any number'
        }])
    })
})