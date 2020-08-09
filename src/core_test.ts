import { isString, isNumber, isBoolean } from "./core"

QUnit.test(`core`, (assert) => {
    assert.ok(isString('ok'))
    assert.ok(isNumber(123))
    assert.ok(isBoolean(true))
})