import { expect, test, describe } from 'bun:test'
import {Fizzbuzz} from "../../src/Fizzbuzz/Fizzbuzz.ts";

describe('Fizzbuzz', () => {
    test.each([
        [1, '1'],
        [2, '2'],
        [4, '4'],
    ])(
        'convert integers to strings: %p to %p',
        (number: number, result: string) => {
            expect(Fizzbuzz(number)).toBe(result)
        }
    )

    test.each([
        [6, 'Fizz'],
        [9, 'Fizz'],
        [12, 'Fizz'],
    ])(
        'convert multiples of 3 to "Fizz": %p to %p',
        (number: number, result: string) => {
            expect(Fizzbuzz(number)).toBe(result)
        }
    )

    test.each([
        [10, 'Buzz'],
        [100, 'Buzz'],
    ])(
        'convert multiples of 5 to "Buzz": %p to %p',
        (number: number, result: string) => {
            expect(Fizzbuzz(number)).toBe(result)
        }
    )

    test.each([
        [1, '1'],
        [2, '2'],
        [3, 'Fizz'],
        [4, '4'],
        [5, 'Buzz'],
        [6, 'Fizz'],
        [7, '7'],
        [8, '8'],
        [9, 'Fizz'],
        [10, 'Buzz'],
        [11, '11'],
        [12, 'Fizz'],
        [13, '13'],
        [14, '14'],
        [15, 'FizzBuzz'],
    ])(
        'convert range from 1 to 15: %p to %p',
        (number: number, result: string) => {
            expect(Fizzbuzz(number)).toBe(result)
        }
    )

    test.each([
        null,
        undefined,
        'abc',
        true,
        NaN,
        3.45,
        '123',
    ])(
        'throws an error for non-integer or non-number values: %p',
        (input: any) => {
            expect(() => Fizzbuzz(input)).toThrowError('You must provide an integer number');
        }
    )
})
