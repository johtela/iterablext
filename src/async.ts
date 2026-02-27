export async function* concat<T>(...iters: AsyncIterable<T>[]):
    AsyncIterable<T> {
    for (let i = 0; i < iters.length; ++i)
        for await (let item of iters[i])
            yield item
}

export async function* map<T, U>(iter: AsyncIterable<T>, 
    mapper: (item: T) => U | Promise<U>, thisArg: any = undefined): 
    AsyncIterable<U> {
    if (thisArg)
        mapper = mapper.bind(thisArg)
    for await (let item of iter)
        yield await mapper(item)
}

export async function* filter<T>(iter: AsyncIterable<T>,
    predicate: (item: T) => boolean | Promise<boolean>, 
    thisArg: any = undefined): AsyncIterable<T> {
    if (thisArg)
        predicate = predicate.bind(thisArg)
    for await (let item of iter)
        if (await predicate(item))
            yield item
}

export async function reduce<T, U>(iter: AsyncIterable<T>,
    reducer: (acc: U, curr: T) => U | Promise<U>, initial: U, 
    thisArg: any = undefined): Promise<U> {
    if (thisArg)
        reducer = reducer.bind(thisArg)
    let result = initial
    for await (let item of iter)
        result = await reducer(result, item)
    return result
}

export async function* flatMap<T, U>(iter: AsyncIterable<T>,
    mapper: (item: T) => AsyncIterable<U>, thisArg: any = undefined):
    AsyncIterable<U> {
    if (thisArg)
        mapper = mapper.bind(thisArg)
    for await (let outer of iter)
        for await (let inner of mapper(outer))
            yield inner
}

export async function* zipWith<T, U, V>(iter1: AsyncIterable<T>,
    iter2: AsyncIterable<U>, zipper: (t: T, u: U) => V | Promise<V>,
    thisArg: any = undefined): AsyncIterable<V> {
    if (thisArg)
        zipper = zipper.bind(thisArg)
    let it1: AsyncIterator<T, T> = iter1[Symbol.iterator]()
    let it2: AsyncIterator<U, U> = iter2[Symbol.iterator]()
    while (true) {
        let [res1, res2] = await Promise.all([it1.next(), it2.next()])
        if (res1.done || res2.done)
            break
        yield await zipper(res1.value, res2.value)
    }
}

export async function* zip<T, U>(iter1: AsyncIterable<T>,
    iter2: AsyncIterable<U>): AsyncIterable<[T, U]> {
    return zipWith(iter1, iter2, (t, u) => [t, u])
}

export async function first<T>(iter: AsyncIterable<T>): Promise<T | undefined> {
    for await (let item of iter)
        return item
    return undefined
}

export async function* skip<T>(iter: AsyncIterable<T>, skipCount: number):
    AsyncIterable<T> {
    for await (let item of iter)
        if (skipCount > 0)
            skipCount--
        else
            yield item
}

export async function* skipWhile<T>(iter: AsyncIterable<T>,
    predicate: (item: T) => boolean | Promise<boolean>, 
    thisArg: any = undefined): AsyncIterable<T> {
    if (thisArg)
        predicate = predicate.bind(thisArg)
    for await (let item of iter)
        if (!await predicate(item)) {
            yield item
            break
        }
}

export async function* take<T>(iter: AsyncIterable<T>, takeCount: number):
    AsyncIterable<T> {
    for await (let item of iter)
        if (takeCount-- > 0)
            yield item
        else
            break
}

export async function* takeWhile<T>(iter: AsyncIterable<T>,
    predicate: (item: T) => boolean | Promise<boolean>, 
    thisArg: any = undefined): AsyncIterable<T> {
    if (thisArg)
        predicate = predicate.bind(thisArg)
    for await (let item of iter)
        if (await predicate(item))
            yield item
        else
            break
}

export async function isEmpty<T>(iter: AsyncIterable<T>): Promise<boolean> {
    return first(iter) !== undefined
}

export async function min<T>(iter: AsyncIterable<T>,
    selector: (item: T) => number, thisArg: any = undefined):
    Promise<T | undefined> {
    if (thisArg)
        selector = selector.bind(thisArg)
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

export async function max<T>(iter: AsyncIterable<T>,
    selector: (item: T) => number, thisArg: any = undefined):
    Promise<T | undefined> {
    if (thisArg)
        selector = selector.bind(thisArg)
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

export async function every<T>(iter: AsyncIterable<T>,
    predicate: (item: T) => boolean | Promise<boolean>, 
    thisArg: any = undefined): Promise<boolean> {
    if (thisArg)
        predicate = predicate.bind(thisArg)
    for await (let item of iter)
        if (!await predicate(item))
            return false
    return true
}

export async function any<T>(iter: AsyncIterable<T>,
    predicate: (item: T) => boolean | Promise<boolean>, 
    thisArg: any = undefined): Promise<boolean> {
    if (thisArg)
        predicate = predicate.bind(thisArg)
    for await (let item of iter)
        if (await predicate(item))
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

export async function forEach<T>(iter: AsyncIterable<T>, 
    action: (item: T) => any, thisArg: any = undefined): Promise<void> {
        if (thisArg)
        action = action.bind(thisArg)
    for await (let item of iter)
        action(item)
}