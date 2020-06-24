import { IContainer } from './interface'
import { Container } from "./container"

/**
 * 一個固定大小的 環
 */
export class Ring<T> extends Container<T> implements IContainer<T> {
    constructor(capacity: number = 0) {
        super()
        capacity = Math.floor(capacity)
        if (capacity < 0) {
            capacity = 0
        }
        if (capacity > 0) {
            this.datas_ = new Array<T>(capacity)
        } else {
            this.datas_ = null
        }
        this.start_ = 0
        this.length_ = 0
        this.capacity_ = capacity
    }
    private datas_: Array<T>
    private start_: number
    private length_: number
    private capacity_: number
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
        return this.capacity_
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
        const datas = this.datas_
        const count = this.length_
        const capacity = this.capacity_
        const start = this.start_
        let i = 0
        return {
            next(): IteratorResult<T> {
                if (i == count) {
                    return {
                        done: true,
                        value: undefined,
                    }
                }
                let index = start + i++
                if (index >= capacity) {
                    index -= capacity
                }
                return {
                    done: false,
                    value: datas[index],
                }
            }
        }
    }
    /**
     * 返回逆向迭代器
     */
    get reverseIterator(): Iterator<T> {
        const datas = this.datas_
        const count = this.length_
        const capacity = this.capacity_
        const start = this.start_
        let i = count - 1
        return {
            next(): IteratorResult<T> {
                if (i < 0) {
                    return {
                        done: true,
                        value: undefined,
                    }
                }
                let index = start + i--
                if (index >= capacity) {
                    index -= capacity
                }
                return {
                    done: false,
                    value: datas[index],
                }
            }
        }
    }
    /**
     * 將當前容器 和 指定容器交互
     * @param other 
     */
    swap(other: Ring<T>): void {
        [this.datas_, other.datas_] = [other.datas_, this.datas_];
        [this.start_, other.start_] = [other.start_, this.start_];
        [this.length_, other.length_] = [other.length_, this.length_];
        [this.capacity_, other.capacity_] = [other.capacity_, this.capacity_];

    }
    /**
     * 清空容器內的 所有元素
     */
    clear(callback?: (element: T) => void): void {
        if (this.length_) {
            const datas = this.datas_
            const capacity = this.capacity_
            const length = this.length_
            let index: number
            for (let i = 0; i < length; i++) {
                if (index == capacity) {
                    index -= capacity
                }
                if (callback) {
                    callback(datas[index])
                }
                datas[index] = null
            }
            this.start_ = 0
            this.length_ = 0
        }
    }
    /**
     * 壓入元素尾
     * @param element 
     */
    pushBack(element: T) {
        const capacity = this.capacity_
        if (!capacity) {
            throw new Error("capacity 0")
        }
        let index = this.start_ + this.length_
        if (index >= capacity) {
            index -= capacity
        }
        this.datas_[index] = element
        if (this.length_ != capacity) {
            this.length_++
        } else {
            this.start_++
            if (this.start_ == capacity) {
                this.start_ = 0
            }
        }
    }

    /**
     * 壓入元素頭
     */
    pushFront(element: T) {
        const capacity = this.capacity_
        if (!capacity) {
            throw new Error("capacity 0")
        }
        this.start_--
        if (this.start_ < 0) {
            this.start_ = capacity - 1
        }
        this.datas_[this.start_] = element
        if (this.length_ != capacity) {
            this.length_++
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
        let index = this.start_ + this.length_
        const capacity = this.capacity_
        if (index >= capacity) {
            index -= capacity
        }
        return this.datas_[index]
    }

    /**
     * 彈出 頭元素 或 null
     */
    popFront(): T {
        if (this.isEmpty) {
            return null
        }
        this.length_--
        const result = this.datas_[this.start_]
        this.start_++
        const capacity = this.capacity_
        if (this.start_ >= capacity) {
            this.start_ -= capacity
        }
        return result
    }
    /**
     * 返回指定索引元素
     * @param index 
     */
    at(index: number): T {
        const count = this.length_
        if (index < 0 || index >= count) {
            throw Error('index out of range')
        }

        const capacity = this.capacity_
        index += this.start_
        if (index >= capacity) {
            index -= capacity
        }

        return this.datas_[index]
    }
}