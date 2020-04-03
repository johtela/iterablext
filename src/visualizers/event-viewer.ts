import * as vis from "litscript/lib/visualizer"
import * as ie from ".."

vis.registerVisualizer("event-viewer", eventViewer)

function eventViewer(params: string, parent: HTMLElement) {
    let pre = document.createElement("pre")
    let code = document.createElement("code")
    pre.append(code)
    pre.classList.add("event-viewer")
    parent.append(pre)
    handleEvents(pre, code)
}

async function handleEvents(pre: HTMLElement, code: HTMLElement) {
    let eventIter = new ie.EventIterator<MouseEvent>(pre, 'mousemove', 
        'mousedown', 'mouseup')
    code.innerText =
        "Implementing dragging using EventIterator. Right-click to stop."
    await ie.async.any(eventIter, async e => {
        if (e.type == 'mousedown') {
            if (e.button == 2)
                return true
            code.innerText = `Start dragging at (${e.x}, ${e.y})\n`
            await ie.async.every(eventIter, de => {
                code.innerText = `Dragged to (${de.x}, ${de.y})\n`
                return de.type == 'mousemove'
            })
        }
        else
           code.innerText = `Moved to (${e.x}, ${e.y})\n`
        return false
    })
    code.innerText = "Done!"
}