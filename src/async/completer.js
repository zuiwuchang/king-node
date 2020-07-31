"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitPromise = exports.Completer = void 0;
/**
 * 一個異步完成器
 */
var Completer = /** @class */ (function () {
    function Completer() {
        var _this = this;
        this.promise_ = new Promise(function (resolve, reject) {
            _this.resolve_ = resolve;
            _this.reject_ = reject;
        });
    }
    Object.defineProperty(Completer.prototype, "promise", {
        /**
         * 返回異步處理的結果
         */
        get: function () {
            return this.promise_;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 以成功完成 異步 處理
     * @param value
     */
    Completer.prototype.resolve = function (value) {
        this.resolve_(value);
    };
    /**
     * 以失敗完成 異步 處理
     * @param reason
     */
    Completer.prototype.reject = function (reason) {
        this.reject_(reason);
    };
    return Completer;
}());
exports.Completer = Completer;
/**
 * 同時 等待多個 Promise 完成
 *
 */
var WaitPromise = /** @class */ (function () {
    function WaitPromise() {
        var promises = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            promises[_i] = arguments[_i];
        }
        var count = promises.length;
        this.wait_ = count;
        this.results_ = new Array(count);
        var completer = new Completer();
        this.completer_ = completer;
        for (var i = 0; i < count; i++) {
            this._done(completer, promises, i);
        }
    }
    Object.defineProperty(WaitPromise.prototype, "promise", {
        /**
         * 返回異步處理結果
         */
        get: function () {
            return this.completer_.promise;
        },
        enumerable: false,
        configurable: true
    });
    WaitPromise.prototype._done = function (completer, promises, i) {
        var _this = this;
        var promise = promises[i];
        promise.then(function (data) {
            _this.results_[i] = {
                error: null,
                result: data,
            };
        }, function (e) {
            _this.results_[i] = {
                error: e,
                result: null,
            };
            if (!_this.error_) {
                _this.error_ = true;
            }
        }).finally(function () {
            _this.wait_--;
            if (_this.wait_) {
                return;
            }
            if (_this.error_) {
                completer.reject(_this.results_);
            }
            else {
                completer.resolve(_this.results_);
            }
        });
    };
    return WaitPromise;
}());
exports.WaitPromise = WaitPromise;
