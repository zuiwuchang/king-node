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
/**
 * 一個固定大小的 環
 */
var Ring = /** @class */ (function (_super) {
    __extends(Ring, _super);
    function Ring(capacity) {
        if (capacity === void 0) { capacity = 0; }
        var _this = _super.call(this) || this;
        capacity = Math.floor(capacity);
        if (capacity < 0) {
            capacity = 0;
        }
        if (capacity > 0) {
            _this.datas_ = new Array(capacity);
        }
        else {
            _this.datas_ = null;
        }
        _this.start_ = 0;
        _this.length_ = 0;
        _this.capacity_ = capacity;
        return _this;
    }
    Object.defineProperty(Ring.prototype, "length", {
        /**
         * 返回容器中的 元素數量
         */
        get: function () {
            return this.length_;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ring.prototype, "capacity", {
        /**
         * 返回容器 可容納元素數量
         */
        get: function () {
            return this.capacity_;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ring.prototype, "isEmpty", {
        /**
         * 返回容器是否爲空
         */
        get: function () {
            return this.length_ == 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ring.prototype, "isNotEmpty", {
        /**
         * 返回容器是否不爲空
         */
        get: function () {
            return this.length_ != 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ring.prototype, "iterator", {
        /**
         * 返回迭代器
         */
        get: function () {
            var datas = this.datas_;
            var count = this.length_;
            var capacity = this.capacity_;
            var start = this.start_;
            var i = 0;
            return {
                next: function () {
                    if (i == count) {
                        return {
                            done: true,
                            value: undefined,
                        };
                    }
                    var index = start + i++;
                    if (index >= capacity) {
                        index -= capacity;
                    }
                    return {
                        done: false,
                        value: datas[index],
                    };
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ring.prototype, "reverseIterator", {
        /**
         * 返回逆向迭代器
         */
        get: function () {
            var datas = this.datas_;
            var count = this.length_;
            var capacity = this.capacity_;
            var start = this.start_;
            var i = count - 1;
            return {
                next: function () {
                    if (i < 0) {
                        return {
                            done: true,
                            value: undefined,
                        };
                    }
                    var index = start + i--;
                    if (index >= capacity) {
                        index -= capacity;
                    }
                    return {
                        done: false,
                        value: datas[index],
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
    Ring.prototype.swap = function (other) {
        var _a, _b, _c, _d;
        _a = __read([other.datas_, this.datas_], 2), this.datas_ = _a[0], other.datas_ = _a[1];
        _b = __read([other.start_, this.start_], 2), this.start_ = _b[0], other.start_ = _b[1];
        _c = __read([other.length_, this.length_], 2), this.length_ = _c[0], other.length_ = _c[1];
        _d = __read([other.capacity_, this.capacity_], 2), this.capacity_ = _d[0], other.capacity_ = _d[1];
    };
    /**
     * 清空容器內的 所有元素
     */
    Ring.prototype.clear = function (callback) {
        if (this.length_) {
            var datas = this.datas_;
            var capacity = this.capacity_;
            var length_1 = this.length_;
            var index = void 0;
            for (var i = 0; i < length_1; i++) {
                index = this.start_ + i;
                if (index == capacity) {
                    index -= capacity;
                }
                if (callback) {
                    callback(datas[index]);
                }
                datas[index] = null;
            }
            this.start_ = 0;
            this.length_ = 0;
        }
    };
    /**
     * 壓入元素尾
     * @param element
     */
    Ring.prototype.pushBack = function (element) {
        var capacity = this.capacity_;
        if (!capacity) {
            throw new Error("capacity 0");
        }
        var index = this.start_ + this.length_;
        if (index >= capacity) {
            index -= capacity;
        }
        this.datas_[index] = element;
        if (this.length_ != capacity) {
            this.length_++;
        }
        else {
            this.start_++;
            if (this.start_ == capacity) {
                this.start_ = 0;
            }
        }
    };
    /**
     * 壓入元素頭
     */
    Ring.prototype.pushFront = function (element) {
        var capacity = this.capacity_;
        if (!capacity) {
            throw new Error("capacity 0");
        }
        this.start_--;
        if (this.start_ < 0) {
            this.start_ = capacity - 1;
        }
        this.datas_[this.start_] = element;
        if (this.length_ != capacity) {
            this.length_++;
        }
    };
    /**
     * 彈出 尾元素 或 null
     */
    Ring.prototype.popBack = function () {
        if (this.isEmpty) {
            return null;
        }
        this.length_--;
        var index = this.start_ + this.length_;
        var capacity = this.capacity_;
        if (index >= capacity) {
            index -= capacity;
        }
        return this.datas_[index];
    };
    /**
     * 彈出 頭元素 或 null
     */
    Ring.prototype.popFront = function () {
        if (this.isEmpty) {
            return null;
        }
        this.length_--;
        var result = this.datas_[this.start_];
        this.start_++;
        var capacity = this.capacity_;
        if (this.start_ >= capacity) {
            this.start_ -= capacity;
        }
        return result;
    };
    /**
     * 返回指定索引元素
     * @param index
     */
    Ring.prototype.at = function (index) {
        var count = this.length_;
        if (index < 0 || index >= count) {
            throw Error('index out of range');
        }
        var capacity = this.capacity_;
        index += this.start_;
        if (index >= capacity) {
            index -= capacity;
        }
        return this.datas_[index];
    };
    return Ring;
}(container_1.Container));
exports.Ring = Ring;
