"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var completer_1 = require("./completer");
var operators_1 = require("rxjs/operators");
var core_1 = require("../core");
var ring_1 = require("../container/ring");
/**
 * 用於傳輸數據的 讀寫 通道
 */
var Channel = /** @class */ (function () {
    /**
     * 緩衝區大小 最小爲1
     * @param capacity
     */
    function Channel(capacity) {
        this.signalWrite_ = new rxjs_1.Subject();
        this.signalRead_ = new rxjs_1.Subject();
        if (!core_1.isNumber(capacity) || isNaN(capacity) || capacity < 1) {
            capacity = 1;
        }
        else {
            capacity = Math.floor(capacity);
        }
        this.buffer_ = new ring_1.Ring(capacity);
    }
    /**
     * 關閉 channel
     */
    Channel.prototype.close = function () {
        if (this.closed_) {
            return false;
        }
        this.closed_ = true;
        this.signalWrite_.complete();
        this.signalRead_.complete();
        return true;
    };
    Channel.prototype._write = function (data) {
        var buffer = this.buffer_;
        if (buffer.capacity == buffer.length) {
            return false;
        }
        buffer.pushBack(data);
        return true;
    };
    /**
     * 向 channel 寫入 數據 如果channel 已經關閉 則 拋出異常
     * @param data
     */
    Channel.prototype.write = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.closed_) {
                reject(Error('channel closed'));
                return;
            }
            if (_this._write(data)) {
                _this.signalWrite_.next(true);
                resolve();
                return;
            }
            var completer = new completer_1.Completer();
            _this.signalRead_.pipe(operators_1.takeUntil(rxjs_1.from(completer.promise))).subscribe({
                next: function () {
                    if (_this._write(data)) {
                        completer.resolve();
                        _this.signalWrite_.next(true);
                        resolve();
                        return;
                    }
                },
                complete: function () {
                    completer.resolve();
                    reject(Error('send to closed channel'));
                },
            });
        });
    };
    Channel.prototype._read = function () {
        var buffer = this.buffer_;
        if (buffer.isEmpty) {
            return {
                ok: false,
                data: null,
            };
        }
        return {
            ok: true,
            data: buffer.popFront(),
        };
    };
    /**
     * 從 channel 讀出數據 如果 channel 已經關閉 則 result.ok 將被設置爲 false
     */
    Channel.prototype.read = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var result = _this._read();
            if (result.ok) {
                _this.signalRead_.next(true);
                resolve(result);
                return;
            }
            if (_this.closed_) {
                _this.signalRead_.next(true);
                resolve(result);
                return;
            }
            var completer = new completer_1.Completer();
            _this.signalWrite_.pipe(operators_1.takeUntil(rxjs_1.from(completer.promise))).subscribe({
                next: function () {
                    var result = _this._read();
                    if (result.ok) {
                        _this.signalRead_.next(true);
                        completer.resolve(true);
                        resolve(result);
                        return;
                    }
                },
                complete: function () {
                    completer.resolve(true);
                    resolve(_this._read());
                },
            });
        });
    };
    return Channel;
}());
exports.Channel = Channel;
