
function objectToString(v: any) {
    return Object.prototype.toString.call(v)
}
export function isNumber(v: any): boolean {
    return typeof v === 'number'
}
export function isString(v: any): boolean {
    return typeof v === 'string'
}
export function isBoolean(v: any): boolean {
    return typeof v === 'boolean'
}
export function isArray(v: any): boolean {
    return Array.isArray(v)
}
export function isUndefined(v: any): boolean {
    return v === undefined
}
export function isNull(v: any): boolean {
    return v === null
}
export function isUndefinedOrNull(v: any): boolean {
    return v === undefined || v === null
}
export function isSymbol(v: any) {
    return typeof v === 'symbol'
}
export function isObject(v: any) {
    return typeof v === 'object' && v !== null;
}
export function isDate(v: any) {
    return isObject(v) && objectToString(v) === '[object Date]'
}
export function isRegExp(v: any) {
    return isObject(v) && objectToString(v) === '[object RegExp]'
}
export function isError(v: any) {
    return isObject(v) &&
        (objectToString(v) === '[object Error]' || v instanceof Error)
}
export function isFunction(v: any) {
    return typeof v === 'function'
}
export function isPrimitive(v: any) {
    return v === null ||
        typeof v === 'boolean' ||
        typeof v === 'number' ||
        typeof v === 'string' ||
        typeof v === 'symbol' ||  // ES6 symbol
        typeof v === 'undefined'
}
const defaultExceptionCode = -1
/**
 * 定義 異常 錯誤代碼
 */
export enum ExceptionCode {
    /**
     * 未知異常
     */
    Unknow = 1,
    /**
     * 型別異常
     */
    Type,
    /**
     * 取值範圍異常
     */
    Rang,
    /**
     * 請求 不可用
     */
    Unavailable,
}
/**
 * 定義 異常基類
 */
export class Exception implements Error {
    /**
     * 
     * @param message 錯誤描述
     * @param code 用戶自定義 錯誤碼
     * @param sys 系統錯誤碼
     */
    constructor(public readonly message: string,
        public readonly code = defaultExceptionCode,
        public readonly name = 'Exception',
        public readonly sys = ExceptionCode.Unknow,
    ) {
    }
}
/**
 * 類型 錯誤
 */
export class TypeException extends Exception {
    constructor(public readonly message: string,
        public readonly code = defaultExceptionCode,
    ) {
        super(message, code, 'TypeException', ExceptionCode.Type)
    }
}
/**
 * 取值範圍錯誤
 */
export class RangException extends Exception {
    constructor(public readonly message: string,
        public readonly code = defaultExceptionCode,
    ) {
        super(message, code, 'RangException', ExceptionCode.Rang)
    }
}
/**
 * 請求不可用
 */
export class UnavailableException extends Exception {
    constructor(public readonly message: string,
        public readonly code = defaultExceptionCode,
    ) {
        super(message, code, 'UnavailableException', ExceptionCode.Unavailable)
    }
}
