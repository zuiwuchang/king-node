"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ring_1 = require("./ring");
function arrayString(start, count) {
    var result = new Array(count);
    for (var i = 0; i < count; i++) {
        result[i] = start + i;
    }
    return result.join(',');
}
function assertArray(assert, c, start, count) {
    var l = c.map(function (v) { return v; }).join(',');
    var r = arrayString(start, count);
    assert.ok(l == r, "map not equal [" + l + "] [" + r + "]");
    var reverse = c.reverseMap(function (v) { return v; }).reverse().join(',');
    assert.ok(reverse == r, "reverse not equal [" + l + "] [" + r + "]");
    var at = new Array(c.length);
    for (var i = 0; i < c.length; i++) {
        at[i] = c.at(i);
    }
    assert.ok(at.join(',') == r, "at not equal [" + l + "] [" + r + "]");
}
QUnit.test("container/ring Ring", function (assert) {
    var c = new ring_1.Ring(10);
    assert.ok(c.capacity == 10, "capacity fail");
    assert.ok(c.length == 0, "length fail");
    for (var i = 0; i < 10; i++) {
        c.pushBack(i);
        assert.ok(c.length == i + 1, "length fail");
        assertArray(assert, c, 0, i + 1);
    }
    for (var i = 0; i < 10; i++) {
        c.pushBack(10 + i);
        assert.ok(c.length == 10, "length fail");
        assertArray(assert, c, i + 1, 10);
    }
    for (var i = 0; i < 10; i++) {
        c.pushFront(10 - i - 1);
        assert.ok(c.length == 10, "length fail");
        assertArray(assert, c, 10 - i - 1, 10);
    }
    for (var i = 0; i < 10; i++) {
        c.pushFront(-1 - i);
        assert.ok(c.length == 10, "length fail");
        assertArray(assert, c, -1 - i, 10);
    }
    for (var i = 0; i < 10; i++) {
        assert.notOk(c.isEmpty, "isEmpty");
        assert.ok(c.isNotEmpty, "isNotEmpty");
        var v = c.popBack();
        assert.ok(v == -1 - i, "popBack");
    }
    assert.ok(c.isEmpty, "isEmpty");
    assert.notOk(c.isNotEmpty, "isNotEmpty");
    for (var i = 0; i < 10; i++) {
        c.pushBack(i);
    }
    for (var i = 0; i < 10; i++) {
        assert.notOk(c.isEmpty, "isEmpty");
        assert.ok(c.isNotEmpty, "isNotEmpty");
        var v = c.popFront();
        assert.ok(v == i, "popFront");
    }
    assert.ok(c.isEmpty, "isEmpty");
    assert.notOk(c.isNotEmpty, "isNotEmpty");
});
