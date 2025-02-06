const { test } = require("node:test")
const assert = require("node:assert")

const { reverse } = require("../utils/for_testing")

test('reverse of a', () => reverseThis('a', 'a'))

test('reverse of react', () => reverseThis('react', 'tkaer'))

test('reverse of saippuakauppias', () => reverseThis('saippuakauppias', 'saippuakauppias'))

const reverseThis = (message, expected) => {
    const result = reverse(message);
    assert.strictEqual(result, expected);
}