import { isNumber, TypeException, RangException, Exception, UnavailableException } from "../core"
import { Completer } from "./completer"
/**
 * 等待異步完成
 */
export class WaitGroup {
    private count_: number = 0
    private completer_: Completer<void>
    /**
     * 增加要等待的異步計數
     * @param count 
     */
    add(count: number) {
        if (!isNumber(count)) {
            throw new TypeException('WaitGroup.add expect number')
        }
        count = Math.floor(count)
        if (count < 1) {
            throw new RangException('count must be greater than 0')
        }
        this.count_ += count
    }
    /**
     * 等待 異步計數 變爲0
     */
    wait(): Promise<void> {
        if (this.completer_) {
            return this.completer_.promise
        }
        if (this.count_ == 0) {
            return Promise.resolve()
        }
        this.completer_ = new Completer<void>()
        return this.completer_.promise
    }
    /**
     * 通知一個異步完成 以便將等待計算 減1
     */
    done() {
        if (!this.count_) {
            throw new UnavailableException('wait count == 0')
        }
        --this.count_
        if (this.count_) {
            return
        }
        if (this.completer_) {
            this.completer_.resolve()
            this.completer_ = null
        }
    }
    /**
     * 使用所有 wait 被喚醒 並重設 WaitGroup
     */
    reset() {
        if (this.completer_) {
            this.completer_.resolve()
            this.completer_ = null
        }
        this.count_ = 0
    }
}
/**
 * 一個 鎖
 */
export class Mutex {
    private _completer: Completer<void>
    /**
     * 加鎖 如果無法競爭到鎖 則等待
     */
    async lock(): Promise<void> {
        while (true) {
            if (this._completer == null) {
                this._completer = new Completer<void>()
                break
            }
            await this._completer.promise
        }
    }
    /**
     * 嘗試加鎖 如果加鎖成功返回true 如果無法競爭到鎖 返回 false
     */
    tryLock(): boolean {
        if (this._completer == null) {
            this._completer = new Completer<void>()
            return true
        }
        return false
    }
    /**
     * 釋放鎖
     */
    unlock() {
        if (this._completer == null) {
            throw new UnavailableException('not locked')
        }

        const completer = this._completer
        this._completer = null
        completer.resolve()
    }
    /**
     * 返回 鎖是否被 鎖定
     */
    get isLocked(): boolean {
        if (this._completer) {
            return true
        }
        return false
    }
    /**
     * 返回 鎖是否沒有被 鎖定
     */
    get isNotLocked(): boolean {
        if (this._completer) {
            return false
        }
        return true
    }
}