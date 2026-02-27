import * as async from './async'
export { async }
export { EventIterator } from './events'

export function* concat<T>(...iters: Iterable<T>[]): Iterable<T> {
    for (let i = 0; i < iters.length; ++i)
        for (let item of iters[i])
            yield item
}

export function* map<T, U>(iter: Iterable<T>, mapper: (item: T) => U,
    thisArg: any = undefined): Iterable<U> {
    if (thisArg)
        mapper = mapper.bind(thisArg)
    for (let item of iter)
        yield mapper(item)
}

export function* filter<T>(iter: Iterable<T>, predicate: (item: T) => boolean,
    thisArg: any = undefined): Iterable<T> {
    if (thisArg)
        predicate = predicate.bind(thisArg)
    for (let item of iter)
        if (predicate(item))
            yield item
}

export function reduce<T, U>(iter: Iterable<T>, reducer: (acc: U, curr: T) => U,
    initial: U, thisArg: any = undefined): U {
    if (thisArg)
        reducer = reducer.bind(thisArg)
    let result = initial
    for (let item of iter)
        result = reducer(result, item)
    return result
}

export function* flatMap<T, U>(iter: Iterable<T>,
    mapper: (item: T) => Iterable<U>, thisArg: any = undefined): Iterable<U> {
    if (thisArg)
        mapper = mapper.bind(thisArg)
    for (let outer of iter)
        for (let inner of mapper(outer))
            yield inner
}

export function* zipWith<T, U, V>(iter1: Iterable<T>, iter2: Iterable<U>,
    zipper: (t: T, u: U) => V, thisArg: any = undefined): Iterable<V> {
    if (thisArg)
        zipper = zipper.bind(thisArg)
    let it1 = iter1[Symbol.iterator]()
    let it2 = iter2[Symbol.iterator]()
    while (true) {
        let res1 = it1.next()
        let res2 = it2.next()
        if (res1.done || res2.done)
            break
        yield zipper(res1.value, res2.value)
    }
}

export function* zip<T, U>(iter1: Iterable<T>, iter2: Iterable<U>):
    Iterable<[T, U]> {
    return zipWith(iter1, iter2, (t, u) => [t, u])
}

export function first<T>(iter: Iterable<T>): T | undefined {
    for (let item of iter)
        return item
    return undefined
}

export function* skip<T>(iter: Iterable<T>, skipCount: number): Iterable<T> {
    for (let item of iter)
        if (skipCount > 0)
            skipCount--
        else
            yield item
}

export function* skipWhile<T>(iter: Iterable<T>,
    predicate: (item: T) => boolean, thisArg: any = undefined): Iterable<T> {
    if (thisArg)
        predicate = predicate.bind(thisArg)
    for (let item of iter)
        if (!predicate(item)) {
            yield item
            break
        }
}

export function* take<T>(iter: Iterable<T>, takeCount: number): Iterable<T> {
    for (let item of iter)
        if (takeCount-- > 0)
            yield item
        else
            break
}

export function* takeWhile<T>(iter: Iterable<T>,
    predicate: (item: T) => boolean, thisArg: any = undefined): Iterable<T> {
    if (thisArg)
        predicate = predicate.bind(thisArg)
    for (let item of iter)
        if (predicate(item))
            yield item
        else
            break
}

export function isEmpty<T>(iter: Iterable<T>): boolean {
    return first(iter) !== undefined
}

export function min<T>(iter: Iterable<T>, selector: (item: T) => number,
    thisArg: any = undefined): T | undefined {
    if (thisArg)
        selector = selector.bind(thisArg)
    let result: T | undefined = undefined
    let minValue = Number.MAX_VALUE
    for (let item of iter) {
        let value = selector(item)
        if (value < minValue) {
            minValue = value
            result = item
        }
    }
    return result
}

export function max<T>(iter: Iterable<T>, selector: (item: T) => number,
    thisArg: any = undefined): T | undefined {
    if (thisArg)
        selector = selector.bind(thisArg)
    let result: T | undefined = undefined
    let maxValue = Number.MAX_VALUE
    for (let item of iter) {
        let value = selector(item)
        if (value > maxValue) {
            maxValue = value
            result = item
        }
    }
    return result
}

export function every<T>(iter: Iterable<T>, predicate: (item: T) => boolean,
    thisArg: any = undefined): boolean {
    if (thisArg)
        predicate = predicate.bind(thisArg)
    for (let item of iter)
        if (!predicate(item))
            return false
    return true
}

export function some<T>(iter: Iterable<T>, predicate: (item: T) => boolean,
    thisArg: any = undefined): boolean {
    if (thisArg)
        predicate = predicate.bind(thisArg)
    for (let item of iter)
        if (predicate(item))
            return true
    return false
}

export function forEach<T>(iter: Iterable<T>, action: (item: T) => any,
    thisArg: any = undefined): void {
    if (thisArg)
        action = action.bind(thisArg)
    for (let item of iter)
        action(item)
}