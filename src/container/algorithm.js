"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.map = exports.forEach = void 0;
/**
 * 遍歷迭代器
 * @param iterator
 * @param callback
 */
function forEach(iterator, callback) {
    while (true) {
        var element = iterator.next();
        if (element.done) {
            break;
        }
        callback(element.value);
    }
}
exports.forEach = forEach;
/**
 * 將迭代器 轉化爲數組
 * @param iterator
 * @param callback
 */
function map(iterator, callback) {
    var result = new Array();
    forEach(iterator, function (element) {
        result.push(callback(element));
    });
    return result;
}
exports.map = map;
