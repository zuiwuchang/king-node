import { List } from './list'
function arrayString(start: number, count: number): string {
    const result = new Array<number>(count)
    for (let i = 0; i < count; i++) {
        result[i] = start + i
    }
    return result.join(',')
}
function assertArray(assert: Assert, c: List<number>, start: number, count: number) {
    const l = c.map<number>((v) => v).join(',')
    const r = arrayString(start, count)
    assert.ok(l == r, `map not equal [${l}] [${r}]`)

    const reverse = c.reverseMap<number>((v) => v).reverse().join(',')
    assert.ok(reverse == r, `reverse not equal [${reverse}] [${r}]`)

}
QUnit.test(`container/list List`, (assert) => {
    const c = new List<number>()
    assert.equal(c.capacity, 0, "capacity fail")
    assert.equal(c.length, 0, "length fail")
    for (let i = 0; i < 10; i++) {
        c.pushBack(i)
        assert.ok(c.length == i + 1, "length fail")
        assertArray(assert, c, 0, i + 1)
    }
    for (let i = 0; i < 10; i++) {
        const v = c.popFront()
        assert.equal(v, i, "popFront fail")
        c.pushBack(10 + i)
        assert.ok(c.length == 10, "length fail")
        assertArray(assert, c, i + 1, 10)
    }

    for (let i = 0; i < 10; i++) {
        const v = c.popBack()
        assert.equal(v, 10 + 10 - i - 1, "popFront fail")

        c.pushFront(10 - i - 1)
        assert.ok(c.length == 10, "length fail")
        assertArray(assert, c, 10 - i - 1, 10)
    }
    for (let i = 0; i < 10; i++) {
        const v = c.popBack()
        assert.equal(v, 10 - i - 1, "popFront fail")
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