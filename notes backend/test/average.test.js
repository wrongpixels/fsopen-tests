const {average} = require("../utils/for_testing")
const {test, describe} = require("node:test")
const equals = require("assert").strictEqual

describe('average', () => {
    test('of one value is the value itself',
        () => equals(average([1]),1)
    )

    test('of many is calculated right',
    () => equals(average([1,2,3,4,5,6]), 3.5)
    )

    test('of an empty arrays is zero',
        () => equals(average([]), 0)
    )
})

