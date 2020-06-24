/**
 * 一個異步完成器
 */
export class Completer<T>{
    private promise_: Promise<T>
    private resolve_: (value?: T | PromiseLike<T>) => void
    private reject_: (reason?: any) => void
    constructor() {
        this.promise_ = new Promise<T>((resolve, reject) => {
            this.resolve_ = resolve
            this.reject_ = reject
        });
    }
    /**
     * 返回異步處理的結果
     */
    get promise(): Promise<T> {
        return this.promise_
    }
    /**
     * 以成功完成 異步 處理
     * @param value 
     */
    resolve(value?: T | PromiseLike<T>) {
        this.resolve_(value)
    }
    /**
     * 以失敗完成 異步 處理
     * @param reason 
     */
    reject(reason?: any) {
        this.reject_(reason);
    }
}
export interface WaitResult {
    error: any
    result: any
}
/**
 * 同時 等待多個 Promise 完成
 * 
 */
export class WaitPromise {
    private results_: Array<WaitResult>
    private wait_: number
    private completer_: Completer<Array<WaitResult>>
    private error_: boolean
    constructor(...promises: Array<Promise<any>>) {
        const count = promises.length
        this.wait_ = count
        this.results_ = new Array<WaitResult>(count)

        const completer = new Completer<Array<WaitResult>>()
        this.completer_ = completer
        for (let i = 0; i < count; i++) {
            this._done(completer, promises, i)
        }
    }
    /**
     * 返回異步處理結果
     */
    get promise(): Promise<Array<WaitResult>> {
        return this.completer_.promise
    }
    private _done(completer: Completer<Array<any>>, promises: Array<Promise<any>>, i: number) {
        const promise = promises[i]
        promise.then((data) => {
            this.results_[i] = {
                error: null,
                result: data,
            }
        }, (e) => {
            this.results_[i] = {
                error: e,
                result: null,
            }
            if (!this.error_) {
                this.error_ = true
            }
        }).finally(() => {
            this.wait_--
            if (this.wait_) {
                return
            }
            if (this.error_) {
                completer.reject(this.results_)
            } else {
                completer.resolve(this.results_)
            }
        })
    }
}