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
Object.defineProperty(exports, "__esModule", { value: true });
function objectToString(v) {
    return Object.prototype.toString.call(v);
}
function isNumber(v) {
    return typeof v === 'number';
}
exports.isNumber = isNumber;
function isString(v) {
    return typeof v === 'string';
}
exports.isString = isString;
function isBoolean(v) {
    return typeof v === 'boolean';
}
exports.isBoolean = isBoolean;
function isArray(v) {
    return Array.isArray(v);
}
exports.isArray = isArray;
function isUndefined(v) {
    return v === undefined;
}
exports.isUndefined = isUndefined;
function isNull(v) {
    return v === null;
}
exports.isNull = isNull;
function isUndefinedOrNull(v) {
    return v === undefined || v === null;
}
exports.isUndefinedOrNull = isUndefinedOrNull;
function isSymbol(v) {
    return typeof v === 'symbol';
}
exports.isSymbol = isSymbol;
function isObject(v) {
    return typeof v === 'object' && v !== null;
}
exports.isObject = isObject;
function isDate(v) {
    return isObject(v) && objectToString(v) === '[object Date]';
}
exports.isDate = isDate;
function isRegExp(v) {
    return isObject(v) && objectToString(v) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
function isError(v) {
    return isObject(v) &&
        (objectToString(v) === '[object Error]' || v instanceof Error);
}
exports.isError = isError;
function isFunction(v) {
    return typeof v === 'function';
}
exports.isFunction = isFunction;
function isPrimitive(v) {
    return v === null ||
        typeof v === 'boolean' ||
        typeof v === 'number' ||
        typeof v === 'string' ||
        typeof v === 'symbol' || // ES6 symbol
        typeof v === 'undefined';
}
exports.isPrimitive = isPrimitive;
var defaultExceptionCode = -1;
/**
 * 定義 異常 錯誤代碼
 */
var ExceptionCode;
(function (ExceptionCode) {
    /**
     * 未知異常
     */
    ExceptionCode[ExceptionCode["Unknow"] = 1] = "Unknow";
    /**
     * 型別異常
     */
    ExceptionCode[ExceptionCode["Type"] = 2] = "Type";
    /**
     * 取值範圍異常
     */
    ExceptionCode[ExceptionCode["Rang"] = 3] = "Rang";
    /**
     * 請求 不可用
     */
    ExceptionCode[ExceptionCode["Unavailable"] = 4] = "Unavailable";
})(ExceptionCode = exports.ExceptionCode || (exports.ExceptionCode = {}));
/**
 * 定義 異常基類
 */
var Exception = /** @class */ (function () {
    /**
     *
     * @param message 錯誤描述
     * @param code 用戶自定義 錯誤碼
     * @param sys 系統錯誤碼
     */
    function Exception(message, code, name, sys) {
        if (code === void 0) { code = defaultExceptionCode; }
        if (name === void 0) { name = 'Exception'; }
        if (sys === void 0) { sys = ExceptionCode.Unknow; }
        this.message = message;
        this.code = code;
        this.name = name;
        this.sys = sys;
    }
    return Exception;
}());
exports.Exception = Exception;
/**
 * 類型 錯誤
 */
var TypeException = /** @class */ (function (_super) {
    __extends(TypeException, _super);
    function TypeException(message, code) {
        if (code === void 0) { code = defaultExceptionCode; }
        var _this = _super.call(this, message, code, 'TypeException', ExceptionCode.Type) || this;
        _this.message = message;
        _this.code = code;
        return _this;
    }
    return TypeException;
}(Exception));
exports.TypeException = TypeException;
/**
 * 取值範圍錯誤
 */
var RangException = /** @class */ (function (_super) {
    __extends(RangException, _super);
    function RangException(message, code) {
        if (code === void 0) { code = defaultExceptionCode; }
        var _this = _super.call(this, message, code, 'RangException', ExceptionCode.Rang) || this;
        _this.message = message;
        _this.code = code;
        return _this;
    }
    return RangException;
}(Exception));
exports.RangException = RangException;
/**
 * 請求不可用
 */
var UnavailableException = /** @class */ (function (_super) {
    __extends(UnavailableException, _super);
    function UnavailableException(message, code) {
        if (code === void 0) { code = defaultExceptionCode; }
        var _this = _super.call(this, message, code, 'UnavailableException', ExceptionCode.Unavailable) || this;
        _this.message = message;
        _this.code = code;
        return _this;
    }
    return UnavailableException;
}(Exception));
exports.UnavailableException = UnavailableException;
