export interface Event<M> {
    kind: keyof M,
    args: M[keyof M]
}

export type ElemEvent = Event<HTMLElementEventMap>

export function elemEvents(target: HTMLElement, 
    ...kinds: (keyof HTMLElementEventMap)[]): AsyncIterable<ElemEvent> {
    const eventBuffer: ElemEvent[] = []
    const resolveBuffer: 
}