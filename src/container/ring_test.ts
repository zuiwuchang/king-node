import { Ring } from './ring'
function arrayString(start: number, count: number): string {
    const result = new Array<number>(count)
    for (let i = 0; i < count; i++) {
        result[i] = start + i
    }
    return result.join(',')
}
function assertArray(assert: Assert, c: Ring<number>, start: number, count: number) {
    const l = c.map<number>((v) => v).join(',')
    const r = arrayString(start, count)
    assert.ok(l == r, `map not equal [${l}] [${r}]`)

    const reverse = c.reverseMap<number>((v) => v).reverse().join(',')
    assert.ok(reverse == r, `reverse not equal [${l}] [${r}]`)

    const at = new Array<number>(c.length)
    for (let i = 0; i < c.length; i++) {
        at[i] = c.at(i)
    }
    assert.ok(at.join(',') == r, `at not equal [${l}] [${r}]`)
}
QUnit.test(`container/ring Ring`, (assert) => {
    const c = new Ring<number>(10)
    assert.ok(c.capacity == 10, "capacity fail")
    assert.ok(c.length == 0, "length fail")
    for (let i = 0; i < 10; i++) {
        c.pushBack(i)
        assert.ok(c.length == i + 1, "length fail")
        assertArray(assert, c, 0, i + 1)
    }
    for (let i = 0; i < 10; i++) {
        c.pushBack(10 + i)
        assert.ok(c.length == 10, "length fail")
        assertArray(assert, c, i + 1, 10)
    }

    for (let i = 0; i < 10; i++) {
        c.pushFront(10 - i - 1)
        assert.ok(c.length == 10, "length fail")
        assertArray(assert, c, 10 - i - 1, 10)
    }
    for (let i = 0; i < 10; i++) {
        c.pushFront(- 1 - i)
        assert.ok(c.length == 10, "length fail")
        assertArray(assert, c, - 1 - i, 10)
    }

    for (let i = 0; i < 10; i++) {
        assert.notOk(c.isEmpty, `isEmpty`)
        assert.ok(c.isNotEmpty, `isNotEmpty`)
        const v = c.popBack()
        assert.ok(v == -1 - i, `popBack`)
    }
    assert.ok(c.isEmpty, `isEmpty`)
    assert.notOk(c.isNotEmpty, `isNotEmpty`)

    for (let i = 0; i < 10; i++) {
        c.pushBack(i)
    }
    for (let i = 0; i < 10; i++) {
        assert.notOk(c.isEmpty, `isEmpty`)
        assert.ok(c.isNotEmpty, `isNotEmpty`)
        const v = c.popFront()
        assert.ok(v == i, `popFront`)
    }
    assert.ok(c.isEmpty, `isEmpty`)
    assert.notOk(c.isNotEmpty, `isNotEmpty`)
})