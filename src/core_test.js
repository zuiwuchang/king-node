"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("./core");
QUnit.test("core", function (assert) {
    assert.ok(core_1.isString('ok'));
    assert.ok(core_1.isNumber(123));
    assert.ok(core_1.isBoolean(true));
});
