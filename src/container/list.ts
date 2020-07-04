import { IContainer } from './interface'
import { Container } from "./container"
export class ListElement<T>{
    data: T
    next: ListElement<T> = null
    previous: ListElement<T> = null
}
/**
 * 一個雙向鏈表
 */
export class List<T> extends Container<T> implements IContainer<T> {
    private length_: number = 0
    private first_: ListElement<T> = null
    private last_: ListElement<T> = null
    /**
       * 返回容器中的 元素數量
       */
    get length(): number {
        return this.length_
    }
    /**
     * 返回容器 可容納元素數量
     */
    get capacity(): number {
        return this.length_
    }
    /**
    * 返回容器是否爲空
    */
    get isEmpty(): boolean {
        return this.length_ == 0
    }
    /**
     * 返回容器是否不爲空
     */
    get isNotEmpty(): boolean {
        return this.length_ != 0
    }
    /**
     * 返回迭代器
     */
    get iterator(): Iterator<T> {
        let element = this.first_
        return {
            next(): IteratorResult<T> {
                if (!element) {
                    return {
                        done: true,
                        value: undefined,
                    }
                }
                const value = element.data
                element = element.next
                return {
                    done: false,
                    value: value,
                }
            }
        }
    }
    /**
     * 返回迭代器
     */
    get reverseIterator(): Iterator<T> {
        let element = this.last_
        return {
            next(): IteratorResult<T> {
                if (!element) {
                    return {
                        done: true,
                        value: undefined,
                    }
                }
                const value = element.data
                element = element.previous
                return {
                    done: false,
                    value: value,
                }
            }
        }
    }
    /**
     * 將當前容器 和 指定容器交互
     * @param other 
     */
    swap(other: List<T>): void {
        [this.first_, other.first_] = [other.first_, this.first_];
        [this.last_, other.last_] = [other.last_, this.last_];
        [this.length_, other.length_] = [other.length_, this.length_];
    }
    /**
     * 清空容器內的 所有元素
     */
    clear(callback?: (data: T) => void): void {
        if (this.isEmpty) {
            return
        }
        if (callback) {
            let element = this.first_
            while (element) {
                callback(element.data)
                element = element.next
            }
        }
        this.first_ = null
        this.last_ = null
        this.length_ = 0
    }
    /**
    * 壓入元素尾
    * @param element 
    */
    pushBack(data: T) {
        const current = new ListElement<T>()
        current.data = data
        this.length_++

        current.previous = this.last_
        if (this.last_) {
            this.last_.next = current
        }
        this.last_ = current
        if (!this.first_) {
            this.first_ = current
        }
    }
    /**
     * 壓入元素頭
     */
    pushFront(data: T) {
        const current = new ListElement<T>()
        current.data = data
        this.length_++

        current.next = this.first_
        if (this.first_) {
            this.first_.previous = current
        }
        this.first_ = current
        if (!this.last_) {
            this.last_ = current
        }
    }

    /**
     * 彈出 尾元素 或 null
     */
    popBack(): T {
        if (this.isEmpty) {
            return null
        }
        this.length_--
        const last = this.last_
        this.last_ = last.previous
        if (this.last_) {
            this.last_.next = null
        } else {
            this.first_ = null
        }
        last.previous = null
        return last.data
    }
    /**
     * 彈出 頭元素 或 null
     */
    popFront(): T {
        if (this.isEmpty) {
            return null
        }
        this.length_--
        const first = this.first_
        this.first_ = first.next
        if (this.first_) {
            this.first_.previous = null
        } else {
            this.last_ = null
        }
        first.next = null
        return first.data
    }
    /**
     * 刪除元素
     * @param element 
     */
    erase(element: ListElement<T>): boolean {
        if (element == this.first_) {
            this.popFront()
            return true
        } else if (element == this.last_) {
            this.popBack()
            return true
        }
        if (!element.next || !element.previous || this.length_ < 3) {
            return false
        }
        this.length_--
        element.previous.next = element.next
        element.next.previous = element.previous
        return true
    }
    get first(): ListElement<T> {
        return this.first_
    }
    get last(): ListElement<T> {
        return this.last_
    }
}