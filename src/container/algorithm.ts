/**
 * 遍歷迭代器
 * @param iterator 
 * @param callback 
 */
export function forEach<T>(iterator: Iterator<T>, callback: (element: T) => void): void {
    while (true) {
        const element = iterator.next()
        if (element.done) {
            break
        }
        callback(element.value)
    }
}
/**
 * 將迭代器 轉化爲數組
 * @param iterator 
 * @param callback 
 */
export function map<T, U>(iterator: Iterator<T>, callback: (element: T) => U): Array<U> {
    const result = new Array<U>()
    forEach(iterator, (element) => {
        result.push(callback(element))
    })
    return result
}
