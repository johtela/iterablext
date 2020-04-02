
export function elementEvents(target: HTMLElement,
    ...kinds: (keyof HTMLElementEventMap)[]): AsyncIterable<Event> {
    const eventBuffer: Event[] = []
    const resolveBuffer: ((item: IteratorResult<Event>) => void)[] = []
    let done = false

    function handler(e: Event) {
        if (done)
            return
        if (resolveBuffer.length > 0)
            resolveBuffer.shift()({ done, value: e })
        else
            eventBuffer.push(e)
    }

    function next(): Promise<IteratorResult<Event>> {
        return new Promise(resolve => {
            if (done)
                resolve({ done, value: undefined })
            else if (eventBuffer.length > 0)
                resolve({ done, value: eventBuffer.shift() })
            else
                resolveBuffer.push(resolve)
        })
    }

    function ret(): Promise<IteratorResult<Event>> {
        done = true
        for (let i = 0; i < kinds.length; i++)
            target.removeEventListener(kinds[i], handler)
        return new Promise(resolve => resolve({ done, value: undefined }))
    }

    function err(e: any): Promise<IteratorResult<Event>> {
        done = true
        return Promise.reject(e)
    }

    for (let i = 0; i < kinds.length; i++)
        target.addEventListener(kinds[i], handler)

    return {
        [Symbol.asyncIterator]() {
            return { next, return: ret, throw: err }
        }
    }
}