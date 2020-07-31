"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
var algorithm = __importStar(require("./algorithm"));
var Container = /** @class */ (function () {
    function Container() {
    }
    Object.defineProperty(Container.prototype, "iterator", {
        /**
         * 返回 迭代器 需要子類實現
         */
        get: function () {
            throw new Error("not implemented");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "reverseIterator", {
        /**
         * 返回逆向迭代器
         */
        get: function () {
            throw new Error("not implemented");
        },
        enumerable: false,
        configurable: true
    });
    Container.prototype[Symbol.iterator] = function () {
        return this.iterator;
    };
    /**
     * 遍歷元素
     * @param callback
     */
    Container.prototype.forEach = function (callback) {
        algorithm.forEach(this.iterator, callback);
    };
    /**
     * 轉化數組
     * @param callback
     */
    Container.prototype.map = function (callback) {
        return algorithm.map(this.iterator, callback);
    };
    /**
     * 逆向遍歷元素
     * @param callback
     */
    Container.prototype.reverseForEach = function (callback) {
        algorithm.forEach(this.reverseIterator, callback);
    };
    /**
     * 逆向轉化數組
     * @param callback
     */
    Container.prototype.reverseMap = function (callback) {
        return algorithm.map(this.reverseIterator, callback);
    };
    return Container;
}());
exports.Container = Container;
