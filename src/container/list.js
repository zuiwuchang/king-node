"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var container_1 = require("./container");
var ListElement = /** @class */ (function () {
    function ListElement() {
        this.next = null;
        this.previous = null;
    }
    return ListElement;
}());
exports.ListElement = ListElement;
/**
 * 一個雙向鏈表
 */
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.length_ = 0;
        _this.first_ = null;
        _this.last_ = null;
        return _this;
    }
    Object.defineProperty(List.prototype, "length", {
        /**
           * 返回容器中的 元素數量
           */
        get: function () {
            return this.length_;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "capacity", {
        /**
         * 返回容器 可容納元素數量
         */
        get: function () {
            return this.length_;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "isEmpty", {
        /**
        * 返回容器是否爲空
        */
        get: function () {
            return this.length_ == 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "isNotEmpty", {
        /**
         * 返回容器是否不爲空
         */
        get: function () {
            return this.length_ != 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "iterator", {
        /**
         * 返回迭代器
         */
        get: function () {
            var element = this.first_;
            return {
                next: function () {
                    if (!element) {
                        return {
                            done: true,
                            value: undefined,
                        };
                    }
                    var value = element.data;
                    element = element.next;
                    return {
                        done: false,
                        value: value,
                    };
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "reverseIterator", {
        /**
         * 返回迭代器
         */
        get: function () {
            var element = this.last_;
            return {
                next: function () {
                    if (!element) {
                        return {
                            done: true,
                            value: undefined,
                        };
                    }
                    var value = element.data;
                    element = element.previous;
                    return {
                        done: false,
                        value: value,
                    };
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 將當前容器 和 指定容器交互
     * @param other
     */
    List.prototype.swap = function (other) {
        var _a, _b, _c;
        _a = __read([other.first_, this.first_], 2), this.first_ = _a[0], other.first_ = _a[1];
        _b = __read([other.last_, this.last_], 2), this.last_ = _b[0], other.last_ = _b[1];
        _c = __read([other.length_, this.length_], 2), this.length_ = _c[0], other.length_ = _c[1];
    };
    /**
     * 清空容器內的 所有元素
     */
    List.prototype.clear = function (callback) {
        if (this.isEmpty) {
            return;
        }
        if (callback) {
            var element = this.first_;
            while (element) {
                callback(element.data);
                element = element.next;
            }
        }
        this.first_ = null;
        this.last_ = null;
        this.length_ = 0;
    };
    /**
    * 壓入元素尾
    * @param element
    */
    List.prototype.pushBack = function (data) {
        var current = new ListElement();
        current.data = data;
        this.length_++;
        current.previous = this.last_;
        if (this.last_) {
            this.last_.next = current;
        }
        this.last_ = current;
        if (!this.first_) {
            this.first_ = current;
        }
    };
    /**
     * 壓入元素頭
     */
    List.prototype.pushFront = function (data) {
        var current = new ListElement();
        current.data = data;
        this.length_++;
        current.next = this.first_;
        if (this.first_) {
            this.first_.previous = current;
        }
        this.first_ = current;
        if (!this.last_) {
            this.last_ = current;
        }
    };
    /**
     * 彈出 尾元素 或 null
     */
    List.prototype.popBack = function () {
        if (this.isEmpty) {
            return null;
        }
        this.length_--;
        var last = this.last_;
        this.last_ = last.previous;
        if (this.last_) {
            this.last_.next = null;
        }
        else {
            this.first_ = null;
        }
        last.previous = null;
        return last.data;
    };
    /**
     * 彈出 頭元素 或 null
     */
    List.prototype.popFront = function () {
        if (this.isEmpty) {
            return null;
        }
        this.length_--;
        var first = this.first_;
        this.first_ = first.next;
        if (this.first_) {
            this.first_.previous = null;
        }
        else {
            this.last_ = null;
        }
        first.next = null;
        return first.data;
    };
    /**
     * 刪除元素
     * @param element
     */
    List.prototype.erase = function (element) {
        if (element == this.first_) {
            this.popFront();
            return true;
        }
        else if (element == this.last_) {
            this.popBack();
            return true;
        }
        if (!element.next || !element.previous || this.length_ < 3) {
            return false;
        }
        this.length_--;
        element.previous.next = element.next;
        element.next.previous = element.previous;
        return true;
    };
    Object.defineProperty(List.prototype, "first", {
        get: function () {
            return this.first_;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "last", {
        get: function () {
            return this.last_;
        },
        enumerable: true,
        configurable: true
    });
    return List;
}(container_1.Container));
exports.List = List;
