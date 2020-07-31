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
    assert.ok(reverse == r, "reverse not equal [" + reverse + "] [" + r + "]");
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
    for (var i_1 = 0; i_1 < 10; i_1++) {
        c.pushBack(i_1);
        assert.ok(c.length == i_1 + 1, "length fail");
        assertArray(assert, c, 0, i_1 + 1);
    }
    for (var i_2 = 0; i_2 < 10; i_2++) {
        c.pushBack(10 + i_2);
        assert.ok(c.length == 10, "length fail");
        assertArray(assert, c, i_2 + 1, 10);
    }
    for (var i_3 = 0; i_3 < 10; i_3++) {
        c.pushFront(10 - i_3 - 1);
        assert.ok(c.length == 10, "length fail");
        assertArray(assert, c, 10 - i_3 - 1, 10);
    }
    for (var i_4 = 0; i_4 < 10; i_4++) {
        c.pushFront(-1 - i_4);
        assert.ok(c.length == 10, "length fail");
        assertArray(assert, c, -1 - i_4, 10);
    }
    for (var i_5 = 0; i_5 < 10; i_5++) {
        assert.notOk(c.isEmpty, "isEmpty");
        assert.ok(c.isNotEmpty, "isNotEmpty");
        var v = c.popBack();
        assert.ok(v == -1 - i_5, "popBack");
    }
    assert.ok(c.isEmpty, "isEmpty");
    assert.notOk(c.isNotEmpty, "isNotEmpty");
    for (var i_6 = 0; i_6 < 10; i_6++) {
        c.pushBack(i_6);
    }
    for (var i_7 = 0; i_7 < 10; i_7++) {
        assert.notOk(c.isEmpty, "isEmpty");
        assert.ok(c.isNotEmpty, "isNotEmpty");
        var v = c.popFront();
        assert.ok(v == i_7, "popFront");
    }
    assert.ok(c.isEmpty, "isEmpty");
    assert.notOk(c.isNotEmpty, "isNotEmpty");
    for (var i_8 = 0; i_8 < 11; i_8++) {
        c.pushBack(i_8);
    }
    var i = 1;
    c.clear(function (v) {
        assert.ok(v == i, "not equal");
        i++;
    });
});
