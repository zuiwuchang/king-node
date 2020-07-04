"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list_1 = require("./list");
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
    assert.ok(reverse == r, "reverse not equal [" + reverse + "] [" + r + "]");
}
QUnit.test("container/list List", function (assert) {
    var c = new list_1.List();
    assert.equal(c.capacity, 0, "capacity fail");
    assert.equal(c.length, 0, "length fail");
    for (var i = 0; i < 10; i++) {
        c.pushBack(i);
        assert.ok(c.length == i + 1, "length fail");
        assertArray(assert, c, 0, i + 1);
    }
    for (var i = 0; i < 10; i++) {
        var v = c.popFront();
        assert.equal(v, i, "popFront fail");
        c.pushBack(10 + i);
        assert.ok(c.length == 10, "length fail");
        assertArray(assert, c, i + 1, 10);
    }
    for (var i = 0; i < 10; i++) {
        var v = c.popBack();
        assert.equal(v, 10 + 10 - i - 1, "popFront fail");
        c.pushFront(10 - i - 1);
        assert.ok(c.length == 10, "length fail");
        assertArray(assert, c, 10 - i - 1, 10);
    }
    for (var i = 0; i < 10; i++) {
        var v = c.popBack();
        assert.equal(v, 10 - i - 1, "popFront fail");
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
