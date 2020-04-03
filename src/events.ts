/**
 * ---
 * {
 *   "visualizers": [
 *     {
 *       "path": "./src/visualizers/event-viewer.ts",
 *       "includeStyles": false
 *     }
 *   ]
 * }
 * ---
 * 
 * # Transforming Events to AsyncIterable
 * 
 * The following code example shows how to use the EventIterator to implement
 * dragging behavior by capturing the `mousemove`, `mousedown` and `mouseup`
 * events. The output of the functions is shown in the grey `<pre>` box below
 * the code. 
 * ```ts
 *  async function handleEvents(pre: HTMLElement, code: HTMLElement) {
 *     let eventIter = new ie.EventIterator<MouseEvent>(pre, 'mousemove', 
 *         'mousedown', 'mouseup')
 *     code.innerText =
 *         "Implementing dragging using EventIterator. Right-click to stop."
 *     await ie.async.any(eventIter, async e => {
 *         if (e.type == 'mousedown') {
 *             if (e.button == 2)
 *                 return true
 *             code.innerText = `Start dragging at (${e.x}, ${e.y})\n`
 *             await ie.async.every(eventIter, de => {
 *                 code.innerText = `Dragged to (${de.x}, ${de.y})\n`
 *                 return de.type == 'mousemove'
 *             })
 *         }
 *         else
 *            code.innerText = `Moved to (${e.x}, ${e.y})\n`
 *         return false
 *     })
 *     code.innerText = "Done!"
 *  }
 * ```
 * 
 * <<v:event-viewer>>
 * 
 */
const EVENT_LIMIT = 10
const WAIT_LIMIT = 10

export class EventIterator<T extends Event> implements AsyncIterable<T>,
    AsyncIterator<T> {
    private used = 0
    private eventBuffer: T[] = []
    private waitBuffer: ((item: IteratorResult<T>) => void)[] = []
    private target: HTMLElement
    private types: (keyof HTMLElementEventMap)[]

    constructor(target: HTMLElement, ...types: (keyof HTMLElementEventMap)[]) {
        this.target = target
        this.types = types
    }

    private addListener() {
        for (let i = 0; i < this.types.length; i++)
            this.target.addEventListener(this.types[i], this.handler)
    }

    private removeListener() {
        for (let i = 0; i < this.types.length; i++)
            this.target.removeEventListener(this.types[i], this.handler)
    }

    private handler = (e: T) => {
        if (!this.used)
            return
        if (this.waitBuffer.length > 0)
            this.waitBuffer.shift()({ done: false, value: e })
        else if (this.eventBuffer.length < EVENT_LIMIT)
            this.eventBuffer.push(e)
        else
            throw Error("Event iterator buffer overflow")
    }

    [Symbol.asyncIterator]() {
        if (this.used++ == 0)
            this.addListener()
        return this
    }

    next(): Promise<IteratorResult<T>> {
        return new Promise(resolve => {
            if (!this.used)
                resolve({ done: true, value: undefined })
            else if (this.eventBuffer.length > 0)
                resolve({ done: false, value: this.eventBuffer.shift() })
            else if (this.waitBuffer.length < WAIT_LIMIT)
                this.waitBuffer.push(resolve)
            else
                Promise.reject("Event iterator wait buffer overflow")
        })
    }

    return(): Promise<IteratorResult<T>> {
        if (--this.used == 0)
            this.removeListener()
        return new Promise(resolve => resolve({ done: true, value: undefined }))
    }

    throw(e: any): Promise<IteratorResult<T>> {
        if (this.used) {
            this.removeListener()
            this.used = 0
        }
        return Promise.reject(e)
    }
}