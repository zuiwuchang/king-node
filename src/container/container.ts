
import *as  algorithm from "./algorithm";
export class Container<T> implements Iterable<T>{
    /**
     * 返回 迭代器 需要子類實現
     */
    get iterator(): Iterator<T> {
        throw new Error("not implemented");
    }
    /**
     * 返回逆向迭代器
     */
    get reverseIterator(): Iterator<T> {
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
        algorithm.forEach(this.iterator, callback)
    }
    /**
     * 轉化數組
     * @param callback 
     */
    map<U>(callback: (element: T) => U): Array<U> {
        return algorithm.map<T, U>(this.iterator, callback)
    }

    /**
     * 逆向遍歷元素
     * @param callback 
     */
    reverseForEach(callback: (element: T) => void): void {
        algorithm.forEach(this.reverseIterator, callback)
    }
    /**
     * 逆向轉化數組
     * @param callback 
     */
    reverseMap<U>(callback: (element: T) => U): U[] {
        return algorithm.map<T, U>(this.reverseIterator, callback)
    }
}