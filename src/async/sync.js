"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../core");
var completer_1 = require("./completer");
/**
 * 等待異步完成
 */
var WaitGroup = /** @class */ (function () {
    function WaitGroup() {
        this.count_ = 0;
    }
    /**
     * 增加要等待的異步計數
     * @param count
     */
    WaitGroup.prototype.add = function (count) {
        if (!core_1.isNumber(count)) {
            throw new core_1.TypeException('WaitGroup.add expect number');
        }
        count = Math.floor(count);
        if (count < 1) {
            throw new core_1.RangException('count must be greater than 0');
        }
        this.count_ += count;
    };
    /**
     * 等待 異步計數 變爲0
     */
    WaitGroup.prototype.wait = function () {
        if (this.completer_) {
            return this.completer_.promise;
        }
        if (this.count_ == 0) {
            return Promise.resolve();
        }
        this.completer_ = new completer_1.Completer();
        return this.completer_.promise;
    };
    /**
     * 通知一個異步完成 以便將等待計算 減1
     */
    WaitGroup.prototype.done = function () {
        if (!this.count_) {
            throw new core_1.UnavailableException('wait count == 0');
        }
        --this.count_;
        if (this.count_) {
            return;
        }
        if (this.completer_) {
            this.completer_.resolve();
            this.completer_ = null;
        }
    };
    /**
     * 使用所有 wait 被喚醒 並重設 WaitGroup
     */
    WaitGroup.prototype.reset = function () {
        if (this.completer_) {
            this.completer_.resolve();
            this.completer_ = null;
        }
        this.count_ = 0;
    };
    return WaitGroup;
}());
exports.WaitGroup = WaitGroup;
