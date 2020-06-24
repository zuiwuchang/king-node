import { Subject, from } from 'rxjs'
import { Completer } from './completer'
import { takeUntil } from 'rxjs/operators'
import { isNumber } from '../core'
import { Ring } from '../container/ring';
/**
 *  從 channel 讀取到的數據
 */
export interface IChannelResult<T> {
    /**
     * 是否讀取到了數據
     * 
     * 用戶接口只有在 channel 關閉後 ok 才會返回 false
     */
    ok: boolean
    /**
     * 讀取到的數據
     */
    data: T
}
/**
 * 一個 只寫 channel 接口
 */
export interface IWriteChannel<T> {
    close(): boolean
    write(data: T): Promise<undefined>
}
/**
 * 一個 只讀 channel 接口
 */
export interface IReadChannel<T> {
    read(): Promise<IChannelResult<T>>
}

export class Channel<T> implements IWriteChannel<T>, IReadChannel<T>{
    private signalWrite_ = new Subject<boolean>()
    private signalRead_ = new Subject<boolean>()
    private closed_: boolean
    private buffer_: Ring<T>

    /**
     * 緩衝區大小 最小爲1
     * @param capacity 
     */
    constructor(capacity?: number) {
        if (!isNumber(capacity) || isNaN(capacity) || capacity < 1) {
            capacity = 1
        } else {
            capacity = Math.floor(capacity)
        }
        this.buffer_ = new Ring<T>(capacity)
    }
    close(): boolean {
        if (this.closed_) {
            return false
        }
        this.closed_ = true
        this.signalWrite_.complete()
        this.signalRead_.complete()
        return true
    }
    private _write(data: T): boolean {
        const buffer = this.buffer_
        if (buffer.capacity == buffer.length) {
            return false
        }
        buffer.pushBack(data)
        return true
    }
    write(data: T): Promise<undefined> {
        return new Promise<undefined>((resolve, reject) => {
            if (this.closed_) {
                reject(Error('channel closed'))
                return
            }
            if (this._write(data)) {
                this.signalWrite_.next(true)
                resolve()
                return
            }
            const completer = new Completer<undefined>()
            this.signalRead_.pipe(
                takeUntil(from(completer.promise))
            ).subscribe({
                next: () => {
                    if (this._write(data)) {
                        completer.resolve()
                        this.signalWrite_.next(true)
                        resolve()
                        return
                    }
                },
                complete: () => {
                    completer.resolve()
                    reject(Error('send to closed channel'))
                },
            })

        })
    }
    private _read(): IChannelResult<T> {
        const buffer = this.buffer_
        if (buffer.isEmpty) {
            return {
                ok: false,
                data: null,
            }
        }
        return {
            ok: true,
            data: buffer.popFront(),
        }
    }
    read(): Promise<IChannelResult<T>> {
        return new Promise<IChannelResult<T>>((resolve, reject) => {
            const result = this._read()
            if (result.ok) {
                this.signalRead_.next(true)
                resolve(result)
                return
            }
            if (this.closed_) {
                this.signalRead_.next(true)
                resolve(result)
                return
            }
            const completer = new Completer<boolean>()
            this.signalWrite_.pipe(
                takeUntil(from(completer.promise))
            ).subscribe({
                next: () => {
                    const result = this._read()
                    if (result.ok) {
                        this.signalRead_.next(true)
                        completer.resolve(true)
                        resolve(result)
                        return
                    }
                },
                complete: () => {
                    completer.resolve(true)
                    resolve(this._read())
                },
            })
        })
    }
}