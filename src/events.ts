export interface Event<M> {
    kind: keyof M,
    args: M[keyof M]
}

export type EventStream<M> = AsyncIterable<Event<M>>

export type ElemEventStream = EventStream<HTMLElementEventMap>

let stream: ElemEventStream

async function test() {
    for await (let e of stream) {
        if (e.kind == 'keydown')
            e.args as MouseEvent 
    }
}