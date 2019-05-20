export async function* map<T, U>(iter: AsyncIterable<T>, mapper: (item: T) => U): AsyncIterable<U> {
    for await (let item of iter)
        yield mapper(item)
}

export async function* filter<T>(iter: AsyncIterable<T>, predicate: (item: T) => boolean):
    AsyncIterable<T> {
    for await (let item of iter)
        if (predicate(item))
            yield item
}

export async function reduce<T, U>(iter: AsyncIterable<T>, reducer: (acc: U, curr: T) => U, initial: U):
    Promise<U> {
    let result = initial
    for await (let item of iter)
        result = reducer(result, item)
    return result
}

export async function* zipWith<T, U, V>(iter1: AsyncIterable<T>, iter2: AsyncIterable<U>,
    zipper: (t: T, u: U) => V): AsyncIterable<V> {
    let it1 = iter1[Symbol.asyncIterator]()
    let it2 = iter2[Symbol.asyncIterator]()
    while (true) {
        let res1 = await it1.next()
        let res2 = await it2.next()
        if (res1.done || res2.done)
            break
        yield zipper(res1.value, res2.value)
    }
}

export async function* zip<T, U>(iter1: AsyncIterable<T>, iter2: AsyncIterable<U>):
    AsyncIterable<[T, U]> {
    return zipWith(iter1, iter2, (t, u) => [t, u])
}

export async function first<T>(iter: AsyncIterable<T>): Promise<T> | undefined {
    for await (let item of iter)
        return item
    return undefined
}

export async function* skip<T>(iter: AsyncIterable<T>, skipCount: number): AsyncIterable<T> {
    for await (let item of iter)
        if (skipCount > 0)
            skipCount--
        else
            yield item
}

export async function* take<T>(iter: AsyncIterable<T>, takeCount: number): AsyncIterable<T> {
    for await (let item of iter)
        if (takeCount-- > 0)
            yield item
        else
            break
}

export async function isEmpty<T>(iter: AsyncIterable<T>): Promise<boolean> {
    return first(iter) !== undefined
}

export async function min<T>(iter: AsyncIterable<T>, selector: (item: T) => number):
    Promise<T> | undefined {
    let result: T | undefined = undefined
    let minValue = Number.MAX_VALUE
    for await (let item of iter) {
        let value = selector(item)
        if (value < minValue) {
            minValue = value
            result = item
        }
    }
    return result
}

export async function max<T>(iter: AsyncIterable<T>, selector: (item: T) => number):
    Promise<T> | undefined {
    let result: T | undefined = undefined
    let maxValue = Number.MAX_VALUE
    for await (let item of iter) {
        let value = selector(item)
        if (value > maxValue) {
            maxValue = value
            result = item
        }
    }
    return result
}

export async function every<T>(iter: AsyncIterable<T>, predicate: (item: T) => boolean):
    Promise<boolean> {
    for await (let item of iter)
        if (!predicate(item))
            return false
    return true
}

export async function any<T>(iter: AsyncIterable<T>, predicate: (item: T) => boolean):
    Promise<boolean> {
    for await (let item of iter)
        if (predicate(item))
            return true
    return false
}

export async function toArray<T>(iter: AsyncIterable<T>): Promise<T[]> {
    let res = new Array<T>(100)
    let i = 0
    for await (let item of iter) {
        if (i >= res.length)
            res.length += 100
        res[i++] = item
    }
    res.length = i
    return res
}