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