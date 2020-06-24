export interface IContainer<T> extends Iterable<T> {
    /**
     * 返回容器中的 元素數量
     */
    readonly length: number
    /**
     * 返回容器 可容納元素數量
     */
    readonly capacity: number
    /**
     * 返回容器是否爲空
     */
    readonly isEmpty: boolean
    /**
     * 返回容器是否不爲空
     */
    readonly isNotEmpty: boolean

    /**
     * 返回迭代器
     */
    iterator: Iterator<T>
    /**
     * 遍歷元素
     * @param callback 
     */
    forEach(callback: (element: T) => void): void
    /**
     * 轉化數組
     * @param callback 
     */
    map<U>(callback: (element: T) => U): U[]
    /**
     * 將當前容器 和 指定容器交互
     * @param other 
     */
    swap(other: IContainer<T>): void
    /**
     * 清空容器內的 所有元素
     */
    clear(callback?: (element: T) => void): void
}

export class Container<T> implements Iterable<T>{
    /**
     * 返回 迭代器 需要子類實現
     */
    get iterator(): Iterator<T> {
        throw new Error("not implemented");
    }
    [Symbol.iterator](): Iterator<T> {
        return this.iterator
    }
    /**
     * 遍歷元素
     * @param callback 
     */
    forEach(callback: (element: T) => void): void {
        const iterator = this.iterator
        while (true) {
            const element = iterator.next()
            if (element.done) {
                break
            }
            callback(element.value)
        }
    }
    /**
     * 轉化數組
     * @param callback 
     */
    map<U>(callback: (element: T) => U): Array<U> {
        const result = new Array<U>()
        this.forEach((element) => {
            result.push(callback(element))
        })
        return result
    }
}