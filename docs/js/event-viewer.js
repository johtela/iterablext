/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/visualizers/event-viewer.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../AppData/Roaming/npm/node_modules/litscript/lib/visualizer.js":
/*!*************************************************************************************!*\
  !*** C:/Users/johteto/AppData/Roaming/npm/node_modules/litscript/lib/visualizer.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const visualizers = {};
/**
 * ## Registering Visualizers
 *
 * Before you can use a visualizer you need to register it using the function
 * below. Another step that is required is to specify the file where the
 * visualizer resides in the `codeFile` setting of the front matter. The code
 * file can import other modules and it might be written in JavaScript or
 * TypeScript. The bundler transpiles TS modules to JS and packs them to a
 * single file.
 */
function registerVisualizer(name, visual) {
    if (name.match(/\s/))
        throw SyntaxError(`Visualizer name "${name}" contains whitespace.`);
    visualizers[name] = visual;
}
exports.registerVisualizer = registerVisualizer;
/**
 * ## Creating Visualizers
 *
 * It is possible to create your visualizers from scratch by defining a
 * function that implements the signature defined above. However, usually
 * it is easier to use some of the helper functions defined below.
 *
 * The first helper creates a new HTML elemenent and places it under the
 * parent element. You can specify the type of the element, its attributes,
 * and a function that returns the content inside the element. The content
 * is assumed to contain a valid HTML string.
 */
function html(render, tag, attrs) {
    return (input, parent) => {
        let res = document.createElement(tag);
        for (let attr in attrs)
            if (attrs.hasOwnProperty(attr))
                res.setAttribute(attr, attrs[attr]);
        res.innerHTML = render(input);
        parent.appendChild(res);
    };
}
exports.html = html;
/**
 * Armed with the `html` function we can define more helpers that output
 * the result of a function in a specific element with a specific style.
 * The first one shows the result inside a `<pre>` tag which is styled
 * as console ouput.
 */
function console(output) {
    return html(output, 'pre', { class: "console" });
}
exports.console = console;
/**
 * The second function shows a styled error message. The style used here
 * is defined in the default template. It is possible also to import your
 * own style sheets (Less or CSS) in the code files you include. They are
 * separated, compiled and packed by the bundler.
 */
function error(message) {
    return html(_ => message, 'div', { class: "error" });
}
exports.error = error;
/**
 * ## Running Visualizers
 *
 * The `runVisualizer` function is exported as a property of the `window`
 * object. It runs the named visualizer with the given parameters. LiTScript
 * generates code that calls this function from a HTML page.
 */
function runVisualizer(name, params, parentId) {
    return __awaiter(this, void 0, void 0, function* () {
        let parent = document.getElementById(parentId);
        if (!parent)
            throw Error(`Visualizer parent id "${parentId}" not found.`);
        let visualize = visualizers[name] ||
            error(`Visualizer "${name}" is not registered.`);
        try {
            yield visualize(params, parent);
        }
        catch (e) {
            error(`Exception thrown by visualizer "${name}".<BR/>
        ${e.toString()}`)("", parent);
        }
    });
}
if (typeof window !== 'undefined')
    window["runVisualizer"] = runVisualizer;
//# sourceMappingURL=visualizer.js.map

/***/ }),

/***/ "./src/async.ts":
/*!**********************!*\
  !*** ./src/async.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
async function* concat(...iters) {
    for (let i = 0; i < iters.length; ++i)
        for await (let item of iters[i])
            yield item;
}
exports.concat = concat;
async function* map(iter, mapper, thisArg = undefined) {
    if (thisArg)
        mapper = mapper.bind(thisArg);
    for await (let item of iter)
        yield await mapper(item);
}
exports.map = map;
async function* filter(iter, predicate, thisArg = undefined) {
    if (thisArg)
        predicate = predicate.bind(thisArg);
    for await (let item of iter)
        if (await predicate(item))
            yield item;
}
exports.filter = filter;
async function reduce(iter, reducer, initial, thisArg = undefined) {
    if (thisArg)
        reducer = reducer.bind(thisArg);
    let result = initial;
    for await (let item of iter)
        result = await reducer(result, item);
    return result;
}
exports.reduce = reduce;
async function* flatMap(iter, mapper, thisArg = undefined) {
    if (thisArg)
        mapper = mapper.bind(thisArg);
    for await (let outer of iter)
        for await (let inner of mapper(outer))
            yield inner;
}
exports.flatMap = flatMap;
async function* zipWith(iter1, iter2, zipper, thisArg = undefined) {
    if (thisArg)
        zipper = zipper.bind(thisArg);
    let it1 = iter1[Symbol.iterator]();
    let it2 = iter2[Symbol.iterator]();
    while (true) {
        let res1 = it1.next();
        let res2 = it2.next();
        if (res1.done || res2.done)
            break;
        yield await zipper(res1.value, res2.value);
    }
}
exports.zipWith = zipWith;
async function* zip(iter1, iter2) {
    return zipWith(iter1, iter2, (t, u) => [t, u]);
}
exports.zip = zip;
async function first(iter) {
    for await (let item of iter)
        return item;
    return undefined;
}
exports.first = first;
async function* skip(iter, skipCount) {
    for await (let item of iter)
        if (skipCount > 0)
            skipCount--;
        else
            yield item;
}
exports.skip = skip;
async function* skipWhile(iter, predicate, thisArg = undefined) {
    if (thisArg)
        predicate = predicate.bind(thisArg);
    for await (let item of iter)
        if (!await predicate(item)) {
            yield item;
            break;
        }
}
exports.skipWhile = skipWhile;
async function* take(iter, takeCount) {
    for await (let item of iter)
        if (takeCount-- > 0)
            yield item;
        else
            break;
}
exports.take = take;
async function* takeWhile(iter, predicate, thisArg = undefined) {
    if (thisArg)
        predicate = predicate.bind(thisArg);
    for await (let item of iter)
        if (await predicate(item))
            yield item;
        else
            break;
}
exports.takeWhile = takeWhile;
async function isEmpty(iter) {
    return first(iter) !== undefined;
}
exports.isEmpty = isEmpty;
async function min(iter, selector, thisArg = undefined) {
    if (thisArg)
        selector = selector.bind(thisArg);
    let result = undefined;
    let minValue = Number.MAX_VALUE;
    for await (let item of iter) {
        let value = selector(item);
        if (value < minValue) {
            minValue = value;
            result = item;
        }
    }
    return result;
}
exports.min = min;
async function max(iter, selector, thisArg = undefined) {
    if (thisArg)
        selector = selector.bind(thisArg);
    let result = undefined;
    let maxValue = Number.MAX_VALUE;
    for await (let item of iter) {
        let value = selector(item);
        if (value > maxValue) {
            maxValue = value;
            result = item;
        }
    }
    return result;
}
exports.max = max;
async function every(iter, predicate, thisArg = undefined) {
    if (thisArg)
        predicate = predicate.bind(thisArg);
    for await (let item of iter)
        if (!await predicate(item))
            return false;
    return true;
}
exports.every = every;
async function any(iter, predicate, thisArg = undefined) {
    if (thisArg)
        predicate = predicate.bind(thisArg);
    for await (let item of iter)
        if (await predicate(item))
            return true;
    return false;
}
exports.any = any;
async function toArray(iter) {
    let res = new Array(100);
    let i = 0;
    for await (let item of iter) {
        if (i >= res.length)
            res.length += 100;
        res[i++] = item;
    }
    res.length = i;
    return res;
}
exports.toArray = toArray;
async function forEach(iter, action, thisArg = undefined) {
    if (thisArg)
        action = action.bind(thisArg);
    for await (let item of iter)
        action(item);
}
exports.forEach = forEach;


/***/ }),

/***/ "./src/events.ts":
/*!***********************!*\
  !*** ./src/events.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
const EVENT_LIMIT = 10;
const WAIT_LIMIT = 10;
class EventIterator {
    constructor(target, ...types) {
        this.used = 0;
        this.eventBuffer = [];
        this.waitBuffer = [];
        this.handler = (e) => {
            if (!this.used)
                return;
            if (this.waitBuffer.length > 0)
                this.waitBuffer.shift()({ done: false, value: e });
            else if (this.eventBuffer.length < EVENT_LIMIT)
                this.eventBuffer.push(e);
            else
                throw Error("Event iterator buffer overflow");
        };
        this.target = target;
        this.types = types;
    }
    addListener() {
        for (let i = 0; i < this.types.length; i++)
            this.target.addEventListener(this.types[i], this.handler);
    }
    removeListener() {
        for (let i = 0; i < this.types.length; i++)
            this.target.removeEventListener(this.types[i], this.handler);
    }
    [Symbol.asyncIterator]() {
        if (this.used++ == 0)
            this.addListener();
        return this;
    }
    next() {
        return new Promise(resolve => {
            if (!this.used)
                resolve({ done: true, value: undefined });
            else if (this.eventBuffer.length > 0)
                resolve({ done: false, value: this.eventBuffer.shift() });
            else if (this.waitBuffer.length < WAIT_LIMIT)
                this.waitBuffer.push(resolve);
            else
                Promise.reject("Event iterator wait buffer overflow");
        });
    }
    return() {
        if (--this.used == 0)
            this.removeListener();
        return new Promise(resolve => resolve({ done: true, value: undefined }));
    }
    throw(e) {
        if (this.used) {
            this.removeListener();
            this.used = 0;
        }
        return Promise.reject(e);
    }
}
exports.EventIterator = EventIterator;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const async = __webpack_require__(/*! ./async */ "./src/async.ts");
exports.async = async;
var events_1 = __webpack_require__(/*! ./events */ "./src/events.ts");
exports.EventIterator = events_1.EventIterator;
function* concat(...iters) {
    for (let i = 0; i < iters.length; ++i)
        for (let item of iters[i])
            yield item;
}
exports.concat = concat;
function* map(iter, mapper, thisArg = undefined) {
    if (thisArg)
        mapper = mapper.bind(thisArg);
    for (let item of iter)
        yield mapper(item);
}
exports.map = map;
function* filter(iter, predicate, thisArg = undefined) {
    if (thisArg)
        predicate = predicate.bind(thisArg);
    for (let item of iter)
        if (predicate(item))
            yield item;
}
exports.filter = filter;
function reduce(iter, reducer, initial, thisArg = undefined) {
    if (thisArg)
        reducer = reducer.bind(thisArg);
    let result = initial;
    for (let item of iter)
        result = reducer(result, item);
    return result;
}
exports.reduce = reduce;
function* flatMap(iter, mapper, thisArg = undefined) {
    if (thisArg)
        mapper = mapper.bind(thisArg);
    for (let outer of iter)
        for (let inner of mapper(outer))
            yield inner;
}
exports.flatMap = flatMap;
function* zipWith(iter1, iter2, zipper, thisArg = undefined) {
    if (thisArg)
        zipper = zipper.bind(thisArg);
    let it1 = iter1[Symbol.iterator]();
    let it2 = iter2[Symbol.iterator]();
    while (true) {
        let res1 = it1.next();
        let res2 = it2.next();
        if (res1.done || res2.done)
            break;
        yield zipper(res1.value, res2.value);
    }
}
exports.zipWith = zipWith;
function* zip(iter1, iter2) {
    return zipWith(iter1, iter2, (t, u) => [t, u]);
}
exports.zip = zip;
function first(iter) {
    for (let item of iter)
        return item;
    return undefined;
}
exports.first = first;
function* skip(iter, skipCount) {
    for (let item of iter)
        if (skipCount > 0)
            skipCount--;
        else
            yield item;
}
exports.skip = skip;
function* skipWhile(iter, predicate, thisArg = undefined) {
    if (thisArg)
        predicate = predicate.bind(thisArg);
    for (let item of iter)
        if (!predicate(item)) {
            yield item;
            break;
        }
}
exports.skipWhile = skipWhile;
function* take(iter, takeCount) {
    for (let item of iter)
        if (takeCount-- > 0)
            yield item;
        else
            break;
}
exports.take = take;
function* takeWhile(iter, predicate, thisArg = undefined) {
    if (thisArg)
        predicate = predicate.bind(thisArg);
    for (let item of iter)
        if (predicate(item))
            yield item;
        else
            break;
}
exports.takeWhile = takeWhile;
function isEmpty(iter) {
    return first(iter) !== undefined;
}
exports.isEmpty = isEmpty;
function min(iter, selector, thisArg = undefined) {
    if (thisArg)
        selector = selector.bind(thisArg);
    let result = undefined;
    let minValue = Number.MAX_VALUE;
    for (let item of iter) {
        let value = selector(item);
        if (value < minValue) {
            minValue = value;
            result = item;
        }
    }
    return result;
}
exports.min = min;
function max(iter, selector, thisArg = undefined) {
    if (thisArg)
        selector = selector.bind(thisArg);
    let result = undefined;
    let maxValue = Number.MAX_VALUE;
    for (let item of iter) {
        let value = selector(item);
        if (value > maxValue) {
            maxValue = value;
            result = item;
        }
    }
    return result;
}
exports.max = max;
function every(iter, predicate, thisArg = undefined) {
    if (thisArg)
        predicate = predicate.bind(thisArg);
    for (let item of iter)
        if (!predicate(item))
            return false;
    return true;
}
exports.every = every;
function any(iter, predicate, thisArg = undefined) {
    if (thisArg)
        predicate = predicate.bind(thisArg);
    for (let item of iter)
        if (predicate(item))
            return true;
    return false;
}
exports.any = any;
function forEach(iter, action, thisArg = undefined) {
    if (thisArg)
        action = action.bind(thisArg);
    for (let item of iter)
        action(item);
}
exports.forEach = forEach;


/***/ }),

/***/ "./src/visualizers/event-viewer.ts":
/*!*****************************************!*\
  !*** ./src/visualizers/event-viewer.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const vis = __webpack_require__(/*! litscript/lib/visualizer */ "../../../AppData/Roaming/npm/node_modules/litscript/lib/visualizer.js");
const ie = __webpack_require__(/*! .. */ "./src/index.ts");
vis.registerVisualizer("event-viewer", eventViewer);
function eventViewer(params, parent) {
    let pre = document.createElement("pre");
    let code = document.createElement("code");
    pre.append(code);
    pre.classList.add("event-viewer");
    parent.append(pre);
    handleEvents(pre, code);
}
async function handleEvents(pre, code) {
    let eventIter = new ie.EventIterator(pre, 'mousemove', 'mousedown', 'mouseup');
    code.innerText =
        "Implementing dragging using EventIterator. Right-click to stop.";
    await ie.async.any(eventIter, async (e) => {
        if (e.type == 'mousedown') {
            if (e.button == 2)
                return true;
            code.innerText = `Start dragging at (${e.x}, ${e.y})\n`;
            await ie.async.every(eventIter, de => {
                code.innerText = `Dragged to (${de.x}, ${de.y})\n`;
                return de.type == 'mousemove';
            });
        }
        else
            code.innerText = `Moved to (${e.x}, ${e.y})\n`;
        return false;
    });
    code.innerText = "Done!";
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL0M6L1VzZXJzL2pvaHRldG8vQXBwRGF0YS9Sb2FtaW5nL25wbS9ub2RlX21vZHVsZXMvbGl0c2NyaXB0L2xpYi92aXN1YWxpemVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3luYy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlzdWFsaXplcnMvZXZlbnQtdmlld2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRmE7QUFDYjtBQUNBLDJCQUEyQiwrREFBK0QsZ0JBQWdCLEVBQUUsRUFBRTtBQUM5RztBQUNBLG1DQUFtQyxNQUFNLDZCQUE2QixFQUFFLFlBQVksV0FBVyxFQUFFO0FBQ2pHLGtDQUFr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QUUsRUFBRSxDQUFDLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsZUFBZSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUs7Z0JBQ2xELE9BQU8sRUFBRSxDQUFDLElBQUksSUFBSSxXQUFXO1lBQ2pDLENBQUMsQ0FBQztTQUNMOztZQUVFLElBQUksQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUs7UUFDakQsT0FBTyxLQUFLO0lBQ2hCLENBQUMsQ0FBQztJQUNGLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTztBQUM1QixDQUFDIiwiZmlsZSI6ImpzL2V2ZW50LXZpZXdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3Zpc3VhbGl6ZXJzL2V2ZW50LXZpZXdlci50c1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgdmlzdWFsaXplcnMgPSB7fTtcclxuLyoqXHJcbiAqICMjIFJlZ2lzdGVyaW5nIFZpc3VhbGl6ZXJzXHJcbiAqXHJcbiAqIEJlZm9yZSB5b3UgY2FuIHVzZSBhIHZpc3VhbGl6ZXIgeW91IG5lZWQgdG8gcmVnaXN0ZXIgaXQgdXNpbmcgdGhlIGZ1bmN0aW9uXHJcbiAqIGJlbG93LiBBbm90aGVyIHN0ZXAgdGhhdCBpcyByZXF1aXJlZCBpcyB0byBzcGVjaWZ5IHRoZSBmaWxlIHdoZXJlIHRoZVxyXG4gKiB2aXN1YWxpemVyIHJlc2lkZXMgaW4gdGhlIGBjb2RlRmlsZWAgc2V0dGluZyBvZiB0aGUgZnJvbnQgbWF0dGVyLiBUaGUgY29kZVxyXG4gKiBmaWxlIGNhbiBpbXBvcnQgb3RoZXIgbW9kdWxlcyBhbmQgaXQgbWlnaHQgYmUgd3JpdHRlbiBpbiBKYXZhU2NyaXB0IG9yXHJcbiAqIFR5cGVTY3JpcHQuIFRoZSBidW5kbGVyIHRyYW5zcGlsZXMgVFMgbW9kdWxlcyB0byBKUyBhbmQgcGFja3MgdGhlbSB0byBhXHJcbiAqIHNpbmdsZSBmaWxlLlxyXG4gKi9cclxuZnVuY3Rpb24gcmVnaXN0ZXJWaXN1YWxpemVyKG5hbWUsIHZpc3VhbCkge1xyXG4gICAgaWYgKG5hbWUubWF0Y2goL1xccy8pKVxyXG4gICAgICAgIHRocm93IFN5bnRheEVycm9yKGBWaXN1YWxpemVyIG5hbWUgXCIke25hbWV9XCIgY29udGFpbnMgd2hpdGVzcGFjZS5gKTtcclxuICAgIHZpc3VhbGl6ZXJzW25hbWVdID0gdmlzdWFsO1xyXG59XHJcbmV4cG9ydHMucmVnaXN0ZXJWaXN1YWxpemVyID0gcmVnaXN0ZXJWaXN1YWxpemVyO1xyXG4vKipcclxuICogIyMgQ3JlYXRpbmcgVmlzdWFsaXplcnNcclxuICpcclxuICogSXQgaXMgcG9zc2libGUgdG8gY3JlYXRlIHlvdXIgdmlzdWFsaXplcnMgZnJvbSBzY3JhdGNoIGJ5IGRlZmluaW5nIGFcclxuICogZnVuY3Rpb24gdGhhdCBpbXBsZW1lbnRzIHRoZSBzaWduYXR1cmUgZGVmaW5lZCBhYm92ZS4gSG93ZXZlciwgdXN1YWxseVxyXG4gKiBpdCBpcyBlYXNpZXIgdG8gdXNlIHNvbWUgb2YgdGhlIGhlbHBlciBmdW5jdGlvbnMgZGVmaW5lZCBiZWxvdy5cclxuICpcclxuICogVGhlIGZpcnN0IGhlbHBlciBjcmVhdGVzIGEgbmV3IEhUTUwgZWxlbWVuZW50IGFuZCBwbGFjZXMgaXQgdW5kZXIgdGhlXHJcbiAqIHBhcmVudCBlbGVtZW50LiBZb3UgY2FuIHNwZWNpZnkgdGhlIHR5cGUgb2YgdGhlIGVsZW1lbnQsIGl0cyBhdHRyaWJ1dGVzLFxyXG4gKiBhbmQgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGNvbnRlbnQgaW5zaWRlIHRoZSBlbGVtZW50LiBUaGUgY29udGVudFxyXG4gKiBpcyBhc3N1bWVkIHRvIGNvbnRhaW4gYSB2YWxpZCBIVE1MIHN0cmluZy5cclxuICovXHJcbmZ1bmN0aW9uIGh0bWwocmVuZGVyLCB0YWcsIGF0dHJzKSB7XHJcbiAgICByZXR1cm4gKGlucHV0LCBwYXJlbnQpID0+IHtcclxuICAgICAgICBsZXQgcmVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xyXG4gICAgICAgIGZvciAobGV0IGF0dHIgaW4gYXR0cnMpXHJcbiAgICAgICAgICAgIGlmIChhdHRycy5oYXNPd25Qcm9wZXJ0eShhdHRyKSlcclxuICAgICAgICAgICAgICAgIHJlcy5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0cnNbYXR0cl0pO1xyXG4gICAgICAgIHJlcy5pbm5lckhUTUwgPSByZW5kZXIoaW5wdXQpO1xyXG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChyZXMpO1xyXG4gICAgfTtcclxufVxyXG5leHBvcnRzLmh0bWwgPSBodG1sO1xyXG4vKipcclxuICogQXJtZWQgd2l0aCB0aGUgYGh0bWxgIGZ1bmN0aW9uIHdlIGNhbiBkZWZpbmUgbW9yZSBoZWxwZXJzIHRoYXQgb3V0cHV0XHJcbiAqIHRoZSByZXN1bHQgb2YgYSBmdW5jdGlvbiBpbiBhIHNwZWNpZmljIGVsZW1lbnQgd2l0aCBhIHNwZWNpZmljIHN0eWxlLlxyXG4gKiBUaGUgZmlyc3Qgb25lIHNob3dzIHRoZSByZXN1bHQgaW5zaWRlIGEgYDxwcmU+YCB0YWcgd2hpY2ggaXMgc3R5bGVkXHJcbiAqIGFzIGNvbnNvbGUgb3VwdXQuXHJcbiAqL1xyXG5mdW5jdGlvbiBjb25zb2xlKG91dHB1dCkge1xyXG4gICAgcmV0dXJuIGh0bWwob3V0cHV0LCAncHJlJywgeyBjbGFzczogXCJjb25zb2xlXCIgfSk7XHJcbn1cclxuZXhwb3J0cy5jb25zb2xlID0gY29uc29sZTtcclxuLyoqXHJcbiAqIFRoZSBzZWNvbmQgZnVuY3Rpb24gc2hvd3MgYSBzdHlsZWQgZXJyb3IgbWVzc2FnZS4gVGhlIHN0eWxlIHVzZWQgaGVyZVxyXG4gKiBpcyBkZWZpbmVkIGluIHRoZSBkZWZhdWx0IHRlbXBsYXRlLiBJdCBpcyBwb3NzaWJsZSBhbHNvIHRvIGltcG9ydCB5b3VyXHJcbiAqIG93biBzdHlsZSBzaGVldHMgKExlc3Mgb3IgQ1NTKSBpbiB0aGUgY29kZSBmaWxlcyB5b3UgaW5jbHVkZS4gVGhleSBhcmVcclxuICogc2VwYXJhdGVkLCBjb21waWxlZCBhbmQgcGFja2VkIGJ5IHRoZSBidW5kbGVyLlxyXG4gKi9cclxuZnVuY3Rpb24gZXJyb3IobWVzc2FnZSkge1xyXG4gICAgcmV0dXJuIGh0bWwoXyA9PiBtZXNzYWdlLCAnZGl2JywgeyBjbGFzczogXCJlcnJvclwiIH0pO1xyXG59XHJcbmV4cG9ydHMuZXJyb3IgPSBlcnJvcjtcclxuLyoqXHJcbiAqICMjIFJ1bm5pbmcgVmlzdWFsaXplcnNcclxuICpcclxuICogVGhlIGBydW5WaXN1YWxpemVyYCBmdW5jdGlvbiBpcyBleHBvcnRlZCBhcyBhIHByb3BlcnR5IG9mIHRoZSBgd2luZG93YFxyXG4gKiBvYmplY3QuIEl0IHJ1bnMgdGhlIG5hbWVkIHZpc3VhbGl6ZXIgd2l0aCB0aGUgZ2l2ZW4gcGFyYW1ldGVycy4gTGlUU2NyaXB0XHJcbiAqIGdlbmVyYXRlcyBjb2RlIHRoYXQgY2FsbHMgdGhpcyBmdW5jdGlvbiBmcm9tIGEgSFRNTCBwYWdlLlxyXG4gKi9cclxuZnVuY3Rpb24gcnVuVmlzdWFsaXplcihuYW1lLCBwYXJhbXMsIHBhcmVudElkKSB7XHJcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIGxldCBwYXJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJlbnRJZCk7XHJcbiAgICAgICAgaWYgKCFwYXJlbnQpXHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKGBWaXN1YWxpemVyIHBhcmVudCBpZCBcIiR7cGFyZW50SWR9XCIgbm90IGZvdW5kLmApO1xyXG4gICAgICAgIGxldCB2aXN1YWxpemUgPSB2aXN1YWxpemVyc1tuYW1lXSB8fFxyXG4gICAgICAgICAgICBlcnJvcihgVmlzdWFsaXplciBcIiR7bmFtZX1cIiBpcyBub3QgcmVnaXN0ZXJlZC5gKTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB5aWVsZCB2aXN1YWxpemUocGFyYW1zLCBwYXJlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBlcnJvcihgRXhjZXB0aW9uIHRocm93biBieSB2aXN1YWxpemVyIFwiJHtuYW1lfVwiLjxCUi8+XHJcbiAgICAgICAgJHtlLnRvU3RyaW5nKCl9YCkoXCJcIiwgcGFyZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpXHJcbiAgICB3aW5kb3dbXCJydW5WaXN1YWxpemVyXCJdID0gcnVuVmlzdWFsaXplcjtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dmlzdWFsaXplci5qcy5tYXAiLCJleHBvcnQgYXN5bmMgZnVuY3Rpb24qIGNvbmNhdDxUPiguLi5pdGVyczogQXN5bmNJdGVyYWJsZTxUPltdKTpcclxuICAgIEFzeW5jSXRlcmFibGU8VD4ge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVycy5sZW5ndGg7ICsraSlcclxuICAgICAgICBmb3IgYXdhaXQgKGxldCBpdGVtIG9mIGl0ZXJzW2ldKVxyXG4gICAgICAgICAgICB5aWVsZCBpdGVtXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiogbWFwPFQsIFU+KGl0ZXI6IEFzeW5jSXRlcmFibGU8VD4sIFxyXG4gICAgbWFwcGVyOiAoaXRlbTogVCkgPT4gVSB8IFByb21pc2U8VT4sIHRoaXNBcmc6IGFueSA9IHVuZGVmaW5lZCk6IFxyXG4gICAgQXN5bmNJdGVyYWJsZTxVPiB7XHJcbiAgICBpZiAodGhpc0FyZylcclxuICAgICAgICBtYXBwZXIgPSBtYXBwZXIuYmluZCh0aGlzQXJnKVxyXG4gICAgZm9yIGF3YWl0IChsZXQgaXRlbSBvZiBpdGVyKVxyXG4gICAgICAgIHlpZWxkIGF3YWl0IG1hcHBlcihpdGVtKVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24qIGZpbHRlcjxUPihpdGVyOiBBc3luY0l0ZXJhYmxlPFQ+LFxyXG4gICAgcHJlZGljYXRlOiAoaXRlbTogVCkgPT4gYm9vbGVhbiB8IFByb21pc2U8Ym9vbGVhbj4sIFxyXG4gICAgdGhpc0FyZzogYW55ID0gdW5kZWZpbmVkKTogQXN5bmNJdGVyYWJsZTxUPiB7XHJcbiAgICBpZiAodGhpc0FyZylcclxuICAgICAgICBwcmVkaWNhdGUgPSBwcmVkaWNhdGUuYmluZCh0aGlzQXJnKVxyXG4gICAgZm9yIGF3YWl0IChsZXQgaXRlbSBvZiBpdGVyKVxyXG4gICAgICAgIGlmIChhd2FpdCBwcmVkaWNhdGUoaXRlbSkpXHJcbiAgICAgICAgICAgIHlpZWxkIGl0ZW1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZHVjZTxULCBVPihpdGVyOiBBc3luY0l0ZXJhYmxlPFQ+LFxyXG4gICAgcmVkdWNlcjogKGFjYzogVSwgY3VycjogVCkgPT4gVSB8IFByb21pc2U8VT4sIGluaXRpYWw6IFUsIFxyXG4gICAgdGhpc0FyZzogYW55ID0gdW5kZWZpbmVkKTogUHJvbWlzZTxVPiB7XHJcbiAgICBpZiAodGhpc0FyZylcclxuICAgICAgICByZWR1Y2VyID0gcmVkdWNlci5iaW5kKHRoaXNBcmcpXHJcbiAgICBsZXQgcmVzdWx0ID0gaW5pdGlhbFxyXG4gICAgZm9yIGF3YWl0IChsZXQgaXRlbSBvZiBpdGVyKVxyXG4gICAgICAgIHJlc3VsdCA9IGF3YWl0IHJlZHVjZXIocmVzdWx0LCBpdGVtKVxyXG4gICAgcmV0dXJuIHJlc3VsdFxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24qIGZsYXRNYXA8VCwgVT4oaXRlcjogQXN5bmNJdGVyYWJsZTxUPixcclxuICAgIG1hcHBlcjogKGl0ZW06IFQpID0+IEFzeW5jSXRlcmFibGU8VT4sIHRoaXNBcmc6IGFueSA9IHVuZGVmaW5lZCk6XHJcbiAgICBBc3luY0l0ZXJhYmxlPFU+IHtcclxuICAgIGlmICh0aGlzQXJnKVxyXG4gICAgICAgIG1hcHBlciA9IG1hcHBlci5iaW5kKHRoaXNBcmcpXHJcbiAgICBmb3IgYXdhaXQgKGxldCBvdXRlciBvZiBpdGVyKVxyXG4gICAgICAgIGZvciBhd2FpdCAobGV0IGlubmVyIG9mIG1hcHBlcihvdXRlcikpXHJcbiAgICAgICAgICAgIHlpZWxkIGlubmVyXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiogemlwV2l0aDxULCBVLCBWPihpdGVyMTogQXN5bmNJdGVyYWJsZTxUPixcclxuICAgIGl0ZXIyOiBBc3luY0l0ZXJhYmxlPFU+LCB6aXBwZXI6ICh0OiBULCB1OiBVKSA9PiBWIHwgUHJvbWlzZTxWPixcclxuICAgIHRoaXNBcmc6IGFueSA9IHVuZGVmaW5lZCk6IEFzeW5jSXRlcmFibGU8Vj4ge1xyXG4gICAgaWYgKHRoaXNBcmcpXHJcbiAgICAgICAgemlwcGVyID0gemlwcGVyLmJpbmQodGhpc0FyZylcclxuICAgIGxldCBpdDEgPSBpdGVyMVtTeW1ib2wuaXRlcmF0b3JdKClcclxuICAgIGxldCBpdDIgPSBpdGVyMltTeW1ib2wuaXRlcmF0b3JdKClcclxuICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgbGV0IHJlczEgPSBpdDEubmV4dCgpXHJcbiAgICAgICAgbGV0IHJlczIgPSBpdDIubmV4dCgpXHJcbiAgICAgICAgaWYgKHJlczEuZG9uZSB8fCByZXMyLmRvbmUpXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgeWllbGQgYXdhaXQgemlwcGVyKHJlczEudmFsdWUsIHJlczIudmFsdWUpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiogemlwPFQsIFU+KGl0ZXIxOiBBc3luY0l0ZXJhYmxlPFQ+LFxyXG4gICAgaXRlcjI6IEFzeW5jSXRlcmFibGU8VT4pOiBBc3luY0l0ZXJhYmxlPFtULCBVXT4ge1xyXG4gICAgcmV0dXJuIHppcFdpdGgoaXRlcjEsIGl0ZXIyLCAodCwgdSkgPT4gW3QsIHVdKVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmlyc3Q8VD4oaXRlcjogQXN5bmNJdGVyYWJsZTxUPik6IFByb21pc2U8VCB8IHVuZGVmaW5lZD4ge1xyXG4gICAgZm9yIGF3YWl0IChsZXQgaXRlbSBvZiBpdGVyKVxyXG4gICAgICAgIHJldHVybiBpdGVtXHJcbiAgICByZXR1cm4gdW5kZWZpbmVkXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiogc2tpcDxUPihpdGVyOiBBc3luY0l0ZXJhYmxlPFQ+LCBza2lwQ291bnQ6IG51bWJlcik6XHJcbiAgICBBc3luY0l0ZXJhYmxlPFQ+IHtcclxuICAgIGZvciBhd2FpdCAobGV0IGl0ZW0gb2YgaXRlcilcclxuICAgICAgICBpZiAoc2tpcENvdW50ID4gMClcclxuICAgICAgICAgICAgc2tpcENvdW50LS1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHlpZWxkIGl0ZW1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uKiBza2lwV2hpbGU8VD4oaXRlcjogQXN5bmNJdGVyYWJsZTxUPixcclxuICAgIHByZWRpY2F0ZTogKGl0ZW06IFQpID0+IGJvb2xlYW4gfCBQcm9taXNlPGJvb2xlYW4+LCBcclxuICAgIHRoaXNBcmc6IGFueSA9IHVuZGVmaW5lZCk6IEFzeW5jSXRlcmFibGU8VD4ge1xyXG4gICAgaWYgKHRoaXNBcmcpXHJcbiAgICAgICAgcHJlZGljYXRlID0gcHJlZGljYXRlLmJpbmQodGhpc0FyZylcclxuICAgIGZvciBhd2FpdCAobGV0IGl0ZW0gb2YgaXRlcilcclxuICAgICAgICBpZiAoIWF3YWl0IHByZWRpY2F0ZShpdGVtKSkge1xyXG4gICAgICAgICAgICB5aWVsZCBpdGVtXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24qIHRha2U8VD4oaXRlcjogQXN5bmNJdGVyYWJsZTxUPiwgdGFrZUNvdW50OiBudW1iZXIpOlxyXG4gICAgQXN5bmNJdGVyYWJsZTxUPiB7XHJcbiAgICBmb3IgYXdhaXQgKGxldCBpdGVtIG9mIGl0ZXIpXHJcbiAgICAgICAgaWYgKHRha2VDb3VudC0tID4gMClcclxuICAgICAgICAgICAgeWllbGQgaXRlbVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgYnJlYWtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uKiB0YWtlV2hpbGU8VD4oaXRlcjogQXN5bmNJdGVyYWJsZTxUPixcclxuICAgIHByZWRpY2F0ZTogKGl0ZW06IFQpID0+IGJvb2xlYW4gfCBQcm9taXNlPGJvb2xlYW4+LCBcclxuICAgIHRoaXNBcmc6IGFueSA9IHVuZGVmaW5lZCk6IEFzeW5jSXRlcmFibGU8VD4ge1xyXG4gICAgaWYgKHRoaXNBcmcpXHJcbiAgICAgICAgcHJlZGljYXRlID0gcHJlZGljYXRlLmJpbmQodGhpc0FyZylcclxuICAgIGZvciBhd2FpdCAobGV0IGl0ZW0gb2YgaXRlcilcclxuICAgICAgICBpZiAoYXdhaXQgcHJlZGljYXRlKGl0ZW0pKVxyXG4gICAgICAgICAgICB5aWVsZCBpdGVtXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBicmVha1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaXNFbXB0eTxUPihpdGVyOiBBc3luY0l0ZXJhYmxlPFQ+KTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICByZXR1cm4gZmlyc3QoaXRlcikgIT09IHVuZGVmaW5lZFxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbWluPFQ+KGl0ZXI6IEFzeW5jSXRlcmFibGU8VD4sXHJcbiAgICBzZWxlY3RvcjogKGl0ZW06IFQpID0+IG51bWJlciwgdGhpc0FyZzogYW55ID0gdW5kZWZpbmVkKTpcclxuICAgIFByb21pc2U8VCB8IHVuZGVmaW5lZD4ge1xyXG4gICAgaWYgKHRoaXNBcmcpXHJcbiAgICAgICAgc2VsZWN0b3IgPSBzZWxlY3Rvci5iaW5kKHRoaXNBcmcpXHJcbiAgICBsZXQgcmVzdWx0OiBUIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkXHJcbiAgICBsZXQgbWluVmFsdWUgPSBOdW1iZXIuTUFYX1ZBTFVFXHJcbiAgICBmb3IgYXdhaXQgKGxldCBpdGVtIG9mIGl0ZXIpIHtcclxuICAgICAgICBsZXQgdmFsdWUgPSBzZWxlY3RvcihpdGVtKVxyXG4gICAgICAgIGlmICh2YWx1ZSA8IG1pblZhbHVlKSB7XHJcbiAgICAgICAgICAgIG1pblZhbHVlID0gdmFsdWVcclxuICAgICAgICAgICAgcmVzdWx0ID0gaXRlbVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHRcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1heDxUPihpdGVyOiBBc3luY0l0ZXJhYmxlPFQ+LFxyXG4gICAgc2VsZWN0b3I6IChpdGVtOiBUKSA9PiBudW1iZXIsIHRoaXNBcmc6IGFueSA9IHVuZGVmaW5lZCk6XHJcbiAgICBQcm9taXNlPFQgfCB1bmRlZmluZWQ+IHtcclxuICAgIGlmICh0aGlzQXJnKVxyXG4gICAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3IuYmluZCh0aGlzQXJnKVxyXG4gICAgbGV0IHJlc3VsdDogVCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZFxyXG4gICAgbGV0IG1heFZhbHVlID0gTnVtYmVyLk1BWF9WQUxVRVxyXG4gICAgZm9yIGF3YWl0IChsZXQgaXRlbSBvZiBpdGVyKSB7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gc2VsZWN0b3IoaXRlbSlcclxuICAgICAgICBpZiAodmFsdWUgPiBtYXhWYWx1ZSkge1xyXG4gICAgICAgICAgICBtYXhWYWx1ZSA9IHZhbHVlXHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGl0ZW1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBldmVyeTxUPihpdGVyOiBBc3luY0l0ZXJhYmxlPFQ+LFxyXG4gICAgcHJlZGljYXRlOiAoaXRlbTogVCkgPT4gYm9vbGVhbiB8IFByb21pc2U8Ym9vbGVhbj4sIFxyXG4gICAgdGhpc0FyZzogYW55ID0gdW5kZWZpbmVkKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICBpZiAodGhpc0FyZylcclxuICAgICAgICBwcmVkaWNhdGUgPSBwcmVkaWNhdGUuYmluZCh0aGlzQXJnKVxyXG4gICAgZm9yIGF3YWl0IChsZXQgaXRlbSBvZiBpdGVyKVxyXG4gICAgICAgIGlmICghYXdhaXQgcHJlZGljYXRlKGl0ZW0pKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIHJldHVybiB0cnVlXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhbnk8VD4oaXRlcjogQXN5bmNJdGVyYWJsZTxUPixcclxuICAgIHByZWRpY2F0ZTogKGl0ZW06IFQpID0+IGJvb2xlYW4gfCBQcm9taXNlPGJvb2xlYW4+LCBcclxuICAgIHRoaXNBcmc6IGFueSA9IHVuZGVmaW5lZCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgaWYgKHRoaXNBcmcpXHJcbiAgICAgICAgcHJlZGljYXRlID0gcHJlZGljYXRlLmJpbmQodGhpc0FyZylcclxuICAgIGZvciBhd2FpdCAobGV0IGl0ZW0gb2YgaXRlcilcclxuICAgICAgICBpZiAoYXdhaXQgcHJlZGljYXRlKGl0ZW0pKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB0b0FycmF5PFQ+KGl0ZXI6IEFzeW5jSXRlcmFibGU8VD4pOiBQcm9taXNlPFRbXT4ge1xyXG4gICAgbGV0IHJlcyA9IG5ldyBBcnJheTxUPigxMDApXHJcbiAgICBsZXQgaSA9IDBcclxuICAgIGZvciBhd2FpdCAobGV0IGl0ZW0gb2YgaXRlcikge1xyXG4gICAgICAgIGlmIChpID49IHJlcy5sZW5ndGgpXHJcbiAgICAgICAgICAgIHJlcy5sZW5ndGggKz0gMTAwXHJcbiAgICAgICAgcmVzW2krK10gPSBpdGVtXHJcbiAgICB9XHJcbiAgICByZXMubGVuZ3RoID0gaVxyXG4gICAgcmV0dXJuIHJlc1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZm9yRWFjaDxUPihpdGVyOiBBc3luY0l0ZXJhYmxlPFQ+LCBcclxuICAgIGFjdGlvbjogKGl0ZW06IFQpID0+IGFueSwgdGhpc0FyZzogYW55ID0gdW5kZWZpbmVkKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgaWYgKHRoaXNBcmcpXHJcbiAgICAgICAgYWN0aW9uID0gYWN0aW9uLmJpbmQodGhpc0FyZylcclxuICAgIGZvciBhd2FpdCAobGV0IGl0ZW0gb2YgaXRlcilcclxuICAgICAgICBhY3Rpb24oaXRlbSlcclxufSIsIi8qKlxyXG4gKiAtLS1cclxuICoge1xyXG4gKiAgIFwidmlzdWFsaXplcnNcIjogW1xyXG4gKiAgICAge1xyXG4gKiAgICAgICBcInBhdGhcIjogXCIuL3NyYy92aXN1YWxpemVycy9ldmVudC12aWV3ZXIudHNcIixcclxuICogICAgICAgXCJpbmNsdWRlU3R5bGVzXCI6IGZhbHNlXHJcbiAqICAgICB9XHJcbiAqICAgXVxyXG4gKiB9XHJcbiAqIC0tLVxyXG4gKiBcclxuICogIyBUcmFuc2Zvcm1pbmcgRXZlbnRzIHRvIEFzeW5jSXRlcmFibGVcclxuICogXHJcbiAqIFRoZSBmb2xsb3dpbmcgY29kZSBleGFtcGxlIHNob3dzIGhvdyB0byB1c2UgdGhlIEV2ZW50SXRlcmF0b3IgdG8gaW1wbGVtZW50XHJcbiAqIGRyYWdnaW5nIGJlaGF2aW9yIGJ5IGNhcHR1cmluZyB0aGUgYG1vdXNlbW92ZWAsIGBtb3VzZWRvd25gIGFuZCBgbW91c2V1cGBcclxuICogZXZlbnRzLiBUaGUgb3V0cHV0IG9mIHRoZSBmdW5jdGlvbnMgaXMgc2hvd24gaW4gdGhlIGdyZXkgYDxwcmU+YCBib3ggYmVsb3dcclxuICogdGhlIGNvZGUuIFxyXG4gKiBgYGB0c1xyXG4gKiAgYXN5bmMgZnVuY3Rpb24gaGFuZGxlRXZlbnRzKHByZTogSFRNTEVsZW1lbnQsIGNvZGU6IEhUTUxFbGVtZW50KSB7XHJcbiAqICAgICBsZXQgZXZlbnRJdGVyID0gbmV3IGllLkV2ZW50SXRlcmF0b3I8TW91c2VFdmVudD4ocHJlLCAnbW91c2Vtb3ZlJywgXHJcbiAqICAgICAgICAgJ21vdXNlZG93bicsICdtb3VzZXVwJylcclxuICogICAgIGNvZGUuaW5uZXJUZXh0ID1cclxuICogICAgICAgICBcIkltcGxlbWVudGluZyBkcmFnZ2luZyB1c2luZyBFdmVudEl0ZXJhdG9yLiBSaWdodC1jbGljayB0byBzdG9wLlwiXHJcbiAqICAgICBhd2FpdCBpZS5hc3luYy5hbnkoZXZlbnRJdGVyLCBhc3luYyBlID0+IHtcclxuICogICAgICAgICBpZiAoZS50eXBlID09ICdtb3VzZWRvd24nKSB7XHJcbiAqICAgICAgICAgICAgIGlmIChlLmJ1dHRvbiA9PSAyKVxyXG4gKiAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICogICAgICAgICAgICAgY29kZS5pbm5lclRleHQgPSBgU3RhcnQgZHJhZ2dpbmcgYXQgKCR7ZS54fSwgJHtlLnl9KVxcbmBcclxuICogICAgICAgICAgICAgYXdhaXQgaWUuYXN5bmMuZXZlcnkoZXZlbnRJdGVyLCBkZSA9PiB7XHJcbiAqICAgICAgICAgICAgICAgICBjb2RlLmlubmVyVGV4dCA9IGBEcmFnZ2VkIHRvICgke2RlLnh9LCAke2RlLnl9KVxcbmBcclxuICogICAgICAgICAgICAgICAgIHJldHVybiBkZS50eXBlID09ICdtb3VzZW1vdmUnXHJcbiAqICAgICAgICAgICAgIH0pXHJcbiAqICAgICAgICAgfVxyXG4gKiAgICAgICAgIGVsc2VcclxuICogICAgICAgICAgICBjb2RlLmlubmVyVGV4dCA9IGBNb3ZlZCB0byAoJHtlLnh9LCAke2UueX0pXFxuYFxyXG4gKiAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gKiAgICAgfSlcclxuICogICAgIGNvZGUuaW5uZXJUZXh0ID0gXCJEb25lIVwiXHJcbiAqICB9XHJcbiAqIGBgYFxyXG4gKiBcclxuICogPDx2OmV2ZW50LXZpZXdlcj4+XHJcbiAqIFxyXG4gKi9cclxuY29uc3QgRVZFTlRfTElNSVQgPSAxMFxyXG5jb25zdCBXQUlUX0xJTUlUID0gMTBcclxuXHJcbmV4cG9ydCBjbGFzcyBFdmVudEl0ZXJhdG9yPFQgZXh0ZW5kcyBFdmVudD4gaW1wbGVtZW50cyBBc3luY0l0ZXJhYmxlPFQ+LFxyXG4gICAgQXN5bmNJdGVyYXRvcjxUPiB7XHJcbiAgICBwcml2YXRlIHVzZWQgPSAwXHJcbiAgICBwcml2YXRlIGV2ZW50QnVmZmVyOiBUW10gPSBbXVxyXG4gICAgcHJpdmF0ZSB3YWl0QnVmZmVyOiAoKGl0ZW06IEl0ZXJhdG9yUmVzdWx0PFQ+KSA9PiB2b2lkKVtdID0gW11cclxuICAgIHByaXZhdGUgdGFyZ2V0OiBIVE1MRWxlbWVudFxyXG4gICAgcHJpdmF0ZSB0eXBlczogKGtleW9mIEhUTUxFbGVtZW50RXZlbnRNYXApW11cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0YXJnZXQ6IEhUTUxFbGVtZW50LCAuLi50eXBlczogKGtleW9mIEhUTUxFbGVtZW50RXZlbnRNYXApW10pIHtcclxuICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldFxyXG4gICAgICAgIHRoaXMudHlwZXMgPSB0eXBlc1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnR5cGVzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB0aGlzLnRhcmdldC5hZGRFdmVudExpc3RlbmVyKHRoaXMudHlwZXNbaV0sIHRoaXMuaGFuZGxlcilcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZUxpc3RlbmVyKCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50eXBlcy5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLnR5cGVzW2ldLCB0aGlzLmhhbmRsZXIpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVyID0gKGU6IFQpID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMudXNlZClcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgaWYgKHRoaXMud2FpdEJ1ZmZlci5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICB0aGlzLndhaXRCdWZmZXIuc2hpZnQoKSh7IGRvbmU6IGZhbHNlLCB2YWx1ZTogZSB9KVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZXZlbnRCdWZmZXIubGVuZ3RoIDwgRVZFTlRfTElNSVQpXHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRCdWZmZXIucHVzaChlKVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJFdmVudCBpdGVyYXRvciBidWZmZXIgb3ZlcmZsb3dcIilcclxuICAgIH1cclxuXHJcbiAgICBbU3ltYm9sLmFzeW5jSXRlcmF0b3JdKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnVzZWQrKyA9PSAwKVxyXG4gICAgICAgICAgICB0aGlzLmFkZExpc3RlbmVyKClcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG5cclxuICAgIG5leHQoKTogUHJvbWlzZTxJdGVyYXRvclJlc3VsdDxUPj4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnVzZWQpXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHsgZG9uZTogdHJ1ZSwgdmFsdWU6IHVuZGVmaW5lZCB9KVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmV2ZW50QnVmZmVyLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHsgZG9uZTogZmFsc2UsIHZhbHVlOiB0aGlzLmV2ZW50QnVmZmVyLnNoaWZ0KCkgfSlcclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy53YWl0QnVmZmVyLmxlbmd0aCA8IFdBSVRfTElNSVQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLndhaXRCdWZmZXIucHVzaChyZXNvbHZlKVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBQcm9taXNlLnJlamVjdChcIkV2ZW50IGl0ZXJhdG9yIHdhaXQgYnVmZmVyIG92ZXJmbG93XCIpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4oKTogUHJvbWlzZTxJdGVyYXRvclJlc3VsdDxUPj4ge1xyXG4gICAgICAgIGlmICgtLXRoaXMudXNlZCA9PSAwKVxyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKClcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiByZXNvbHZlKHsgZG9uZTogdHJ1ZSwgdmFsdWU6IHVuZGVmaW5lZCB9KSlcclxuICAgIH1cclxuXHJcbiAgICB0aHJvdyhlOiBhbnkpOiBQcm9taXNlPEl0ZXJhdG9yUmVzdWx0PFQ+PiB7XHJcbiAgICAgICAgaWYgKHRoaXMudXNlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKClcclxuICAgICAgICAgICAgdGhpcy51c2VkID0gMFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSlcclxuICAgIH1cclxufSIsImltcG9ydCAqIGFzIGFzeW5jIGZyb20gJy4vYXN5bmMnXHJcbmV4cG9ydCB7IGFzeW5jIH1cclxuZXhwb3J0IHsgRXZlbnRJdGVyYXRvciB9IGZyb20gJy4vZXZlbnRzJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uKiBjb25jYXQ8VD4oLi4uaXRlcnM6IEl0ZXJhYmxlPFQ+W10pOiBJdGVyYWJsZTxUPiB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZXJzLmxlbmd0aDsgKytpKVxyXG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgaXRlcnNbaV0pXHJcbiAgICAgICAgICAgIHlpZWxkIGl0ZW1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uKiBtYXA8VCwgVT4oaXRlcjogSXRlcmFibGU8VD4sIG1hcHBlcjogKGl0ZW06IFQpID0+IFUsXHJcbiAgICB0aGlzQXJnOiBhbnkgPSB1bmRlZmluZWQpOiBJdGVyYWJsZTxVPiB7XHJcbiAgICBpZiAodGhpc0FyZylcclxuICAgICAgICBtYXBwZXIgPSBtYXBwZXIuYmluZCh0aGlzQXJnKVxyXG4gICAgZm9yIChsZXQgaXRlbSBvZiBpdGVyKVxyXG4gICAgICAgIHlpZWxkIG1hcHBlcihpdGVtKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24qIGZpbHRlcjxUPihpdGVyOiBJdGVyYWJsZTxUPiwgcHJlZGljYXRlOiAoaXRlbTogVCkgPT4gYm9vbGVhbixcclxuICAgIHRoaXNBcmc6IGFueSA9IHVuZGVmaW5lZCk6IEl0ZXJhYmxlPFQ+IHtcclxuICAgIGlmICh0aGlzQXJnKVxyXG4gICAgICAgIHByZWRpY2F0ZSA9IHByZWRpY2F0ZS5iaW5kKHRoaXNBcmcpXHJcbiAgICBmb3IgKGxldCBpdGVtIG9mIGl0ZXIpXHJcbiAgICAgICAgaWYgKHByZWRpY2F0ZShpdGVtKSlcclxuICAgICAgICAgICAgeWllbGQgaXRlbVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlPFQsIFU+KGl0ZXI6IEl0ZXJhYmxlPFQ+LCByZWR1Y2VyOiAoYWNjOiBVLCBjdXJyOiBUKSA9PiBVLFxyXG4gICAgaW5pdGlhbDogVSwgdGhpc0FyZzogYW55ID0gdW5kZWZpbmVkKTogVSB7XHJcbiAgICBpZiAodGhpc0FyZylcclxuICAgICAgICByZWR1Y2VyID0gcmVkdWNlci5iaW5kKHRoaXNBcmcpXHJcbiAgICBsZXQgcmVzdWx0ID0gaW5pdGlhbFxyXG4gICAgZm9yIChsZXQgaXRlbSBvZiBpdGVyKVxyXG4gICAgICAgIHJlc3VsdCA9IHJlZHVjZXIocmVzdWx0LCBpdGVtKVxyXG4gICAgcmV0dXJuIHJlc3VsdFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24qIGZsYXRNYXA8VCwgVT4oaXRlcjogSXRlcmFibGU8VD4sXHJcbiAgICBtYXBwZXI6IChpdGVtOiBUKSA9PiBJdGVyYWJsZTxVPiwgdGhpc0FyZzogYW55ID0gdW5kZWZpbmVkKTogSXRlcmFibGU8VT4ge1xyXG4gICAgaWYgKHRoaXNBcmcpXHJcbiAgICAgICAgbWFwcGVyID0gbWFwcGVyLmJpbmQodGhpc0FyZylcclxuICAgIGZvciAobGV0IG91dGVyIG9mIGl0ZXIpXHJcbiAgICAgICAgZm9yIChsZXQgaW5uZXIgb2YgbWFwcGVyKG91dGVyKSlcclxuICAgICAgICAgICAgeWllbGQgaW5uZXJcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uKiB6aXBXaXRoPFQsIFUsIFY+KGl0ZXIxOiBJdGVyYWJsZTxUPiwgaXRlcjI6IEl0ZXJhYmxlPFU+LFxyXG4gICAgemlwcGVyOiAodDogVCwgdTogVSkgPT4gViwgdGhpc0FyZzogYW55ID0gdW5kZWZpbmVkKTogSXRlcmFibGU8Vj4ge1xyXG4gICAgaWYgKHRoaXNBcmcpXHJcbiAgICAgICAgemlwcGVyID0gemlwcGVyLmJpbmQodGhpc0FyZylcclxuICAgIGxldCBpdDEgPSBpdGVyMVtTeW1ib2wuaXRlcmF0b3JdKClcclxuICAgIGxldCBpdDIgPSBpdGVyMltTeW1ib2wuaXRlcmF0b3JdKClcclxuICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgbGV0IHJlczEgPSBpdDEubmV4dCgpXHJcbiAgICAgICAgbGV0IHJlczIgPSBpdDIubmV4dCgpXHJcbiAgICAgICAgaWYgKHJlczEuZG9uZSB8fCByZXMyLmRvbmUpXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgeWllbGQgemlwcGVyKHJlczEudmFsdWUsIHJlczIudmFsdWUpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiogemlwPFQsIFU+KGl0ZXIxOiBJdGVyYWJsZTxUPiwgaXRlcjI6IEl0ZXJhYmxlPFU+KTpcclxuICAgIEl0ZXJhYmxlPFtULCBVXT4ge1xyXG4gICAgcmV0dXJuIHppcFdpdGgoaXRlcjEsIGl0ZXIyLCAodCwgdSkgPT4gW3QsIHVdKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmlyc3Q8VD4oaXRlcjogSXRlcmFibGU8VD4pOiBUIHwgdW5kZWZpbmVkIHtcclxuICAgIGZvciAobGV0IGl0ZW0gb2YgaXRlcilcclxuICAgICAgICByZXR1cm4gaXRlbVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24qIHNraXA8VD4oaXRlcjogSXRlcmFibGU8VD4sIHNraXBDb3VudDogbnVtYmVyKTogSXRlcmFibGU8VD4ge1xyXG4gICAgZm9yIChsZXQgaXRlbSBvZiBpdGVyKVxyXG4gICAgICAgIGlmIChza2lwQ291bnQgPiAwKVxyXG4gICAgICAgICAgICBza2lwQ291bnQtLVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgeWllbGQgaXRlbVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24qIHNraXBXaGlsZTxUPihpdGVyOiBJdGVyYWJsZTxUPixcclxuICAgIHByZWRpY2F0ZTogKGl0ZW06IFQpID0+IGJvb2xlYW4sIHRoaXNBcmc6IGFueSA9IHVuZGVmaW5lZCk6IEl0ZXJhYmxlPFQ+IHtcclxuICAgIGlmICh0aGlzQXJnKVxyXG4gICAgICAgIHByZWRpY2F0ZSA9IHByZWRpY2F0ZS5iaW5kKHRoaXNBcmcpXHJcbiAgICBmb3IgKGxldCBpdGVtIG9mIGl0ZXIpXHJcbiAgICAgICAgaWYgKCFwcmVkaWNhdGUoaXRlbSkpIHtcclxuICAgICAgICAgICAgeWllbGQgaXRlbVxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uKiB0YWtlPFQ+KGl0ZXI6IEl0ZXJhYmxlPFQ+LCB0YWtlQ291bnQ6IG51bWJlcik6IEl0ZXJhYmxlPFQ+IHtcclxuICAgIGZvciAobGV0IGl0ZW0gb2YgaXRlcilcclxuICAgICAgICBpZiAodGFrZUNvdW50LS0gPiAwKVxyXG4gICAgICAgICAgICB5aWVsZCBpdGVtXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBicmVha1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24qIHRha2VXaGlsZTxUPihpdGVyOiBJdGVyYWJsZTxUPixcclxuICAgIHByZWRpY2F0ZTogKGl0ZW06IFQpID0+IGJvb2xlYW4sIHRoaXNBcmc6IGFueSA9IHVuZGVmaW5lZCk6IEl0ZXJhYmxlPFQ+IHtcclxuICAgIGlmICh0aGlzQXJnKVxyXG4gICAgICAgIHByZWRpY2F0ZSA9IHByZWRpY2F0ZS5iaW5kKHRoaXNBcmcpXHJcbiAgICBmb3IgKGxldCBpdGVtIG9mIGl0ZXIpXHJcbiAgICAgICAgaWYgKHByZWRpY2F0ZShpdGVtKSlcclxuICAgICAgICAgICAgeWllbGQgaXRlbVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgYnJlYWtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHk8VD4oaXRlcjogSXRlcmFibGU8VD4pOiBib29sZWFuIHtcclxuICAgIHJldHVybiBmaXJzdChpdGVyKSAhPT0gdW5kZWZpbmVkXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtaW48VD4oaXRlcjogSXRlcmFibGU8VD4sIHNlbGVjdG9yOiAoaXRlbTogVCkgPT4gbnVtYmVyLFxyXG4gICAgdGhpc0FyZzogYW55ID0gdW5kZWZpbmVkKTogVCB8IHVuZGVmaW5lZCB7XHJcbiAgICBpZiAodGhpc0FyZylcclxuICAgICAgICBzZWxlY3RvciA9IHNlbGVjdG9yLmJpbmQodGhpc0FyZylcclxuICAgIGxldCByZXN1bHQ6IFQgfCB1bmRlZmluZWQgPSB1bmRlZmluZWRcclxuICAgIGxldCBtaW5WYWx1ZSA9IE51bWJlci5NQVhfVkFMVUVcclxuICAgIGZvciAobGV0IGl0ZW0gb2YgaXRlcikge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IHNlbGVjdG9yKGl0ZW0pXHJcbiAgICAgICAgaWYgKHZhbHVlIDwgbWluVmFsdWUpIHtcclxuICAgICAgICAgICAgbWluVmFsdWUgPSB2YWx1ZVxyXG4gICAgICAgICAgICByZXN1bHQgPSBpdGVtXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWF4PFQ+KGl0ZXI6IEl0ZXJhYmxlPFQ+LCBzZWxlY3RvcjogKGl0ZW06IFQpID0+IG51bWJlcixcclxuICAgIHRoaXNBcmc6IGFueSA9IHVuZGVmaW5lZCk6IFQgfCB1bmRlZmluZWQge1xyXG4gICAgaWYgKHRoaXNBcmcpXHJcbiAgICAgICAgc2VsZWN0b3IgPSBzZWxlY3Rvci5iaW5kKHRoaXNBcmcpXHJcbiAgICBsZXQgcmVzdWx0OiBUIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkXHJcbiAgICBsZXQgbWF4VmFsdWUgPSBOdW1iZXIuTUFYX1ZBTFVFXHJcbiAgICBmb3IgKGxldCBpdGVtIG9mIGl0ZXIpIHtcclxuICAgICAgICBsZXQgdmFsdWUgPSBzZWxlY3RvcihpdGVtKVxyXG4gICAgICAgIGlmICh2YWx1ZSA+IG1heFZhbHVlKSB7XHJcbiAgICAgICAgICAgIG1heFZhbHVlID0gdmFsdWVcclxuICAgICAgICAgICAgcmVzdWx0ID0gaXRlbVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHRcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGV2ZXJ5PFQ+KGl0ZXI6IEl0ZXJhYmxlPFQ+LCBwcmVkaWNhdGU6IChpdGVtOiBUKSA9PiBib29sZWFuLFxyXG4gICAgdGhpc0FyZzogYW55ID0gdW5kZWZpbmVkKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpc0FyZylcclxuICAgICAgICBwcmVkaWNhdGUgPSBwcmVkaWNhdGUuYmluZCh0aGlzQXJnKVxyXG4gICAgZm9yIChsZXQgaXRlbSBvZiBpdGVyKVxyXG4gICAgICAgIGlmICghcHJlZGljYXRlKGl0ZW0pKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIHJldHVybiB0cnVlXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhbnk8VD4oaXRlcjogSXRlcmFibGU8VD4sIHByZWRpY2F0ZTogKGl0ZW06IFQpID0+IGJvb2xlYW4sXHJcbiAgICB0aGlzQXJnOiBhbnkgPSB1bmRlZmluZWQpOiBib29sZWFuIHtcclxuICAgIGlmICh0aGlzQXJnKVxyXG4gICAgICAgIHByZWRpY2F0ZSA9IHByZWRpY2F0ZS5iaW5kKHRoaXNBcmcpXHJcbiAgICBmb3IgKGxldCBpdGVtIG9mIGl0ZXIpXHJcbiAgICAgICAgaWYgKHByZWRpY2F0ZShpdGVtKSlcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIHJldHVybiBmYWxzZVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZm9yRWFjaDxUPihpdGVyOiBJdGVyYWJsZTxUPiwgYWN0aW9uOiAoaXRlbTogVCkgPT4gYW55LFxyXG4gICAgdGhpc0FyZzogYW55ID0gdW5kZWZpbmVkKTogdm9pZCB7XHJcbiAgICBpZiAodGhpc0FyZylcclxuICAgICAgICBhY3Rpb24gPSBhY3Rpb24uYmluZCh0aGlzQXJnKVxyXG4gICAgZm9yIChsZXQgaXRlbSBvZiBpdGVyKVxyXG4gICAgICAgIGFjdGlvbihpdGVtKVxyXG59IiwiaW1wb3J0ICogYXMgdmlzIGZyb20gXCJsaXRzY3JpcHQvbGliL3Zpc3VhbGl6ZXJcIlxyXG5pbXBvcnQgKiBhcyBpZSBmcm9tIFwiLi5cIlxyXG5cclxudmlzLnJlZ2lzdGVyVmlzdWFsaXplcihcImV2ZW50LXZpZXdlclwiLCBldmVudFZpZXdlcilcclxuXHJcbmZ1bmN0aW9uIGV2ZW50Vmlld2VyKHBhcmFtczogc3RyaW5nLCBwYXJlbnQ6IEhUTUxFbGVtZW50KSB7XHJcbiAgICBsZXQgcHJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInByZVwiKVxyXG4gICAgbGV0IGNvZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY29kZVwiKVxyXG4gICAgcHJlLmFwcGVuZChjb2RlKVxyXG4gICAgcHJlLmNsYXNzTGlzdC5hZGQoXCJldmVudC12aWV3ZXJcIilcclxuICAgIHBhcmVudC5hcHBlbmQocHJlKVxyXG4gICAgaGFuZGxlRXZlbnRzKHByZSwgY29kZSlcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlRXZlbnRzKHByZTogSFRNTEVsZW1lbnQsIGNvZGU6IEhUTUxFbGVtZW50KSB7XHJcbiAgICBsZXQgZXZlbnRJdGVyID0gbmV3IGllLkV2ZW50SXRlcmF0b3I8TW91c2VFdmVudD4ocHJlLCAnbW91c2Vtb3ZlJywgXHJcbiAgICAgICAgJ21vdXNlZG93bicsICdtb3VzZXVwJylcclxuICAgIGNvZGUuaW5uZXJUZXh0ID1cclxuICAgICAgICBcIkltcGxlbWVudGluZyBkcmFnZ2luZyB1c2luZyBFdmVudEl0ZXJhdG9yLiBSaWdodC1jbGljayB0byBzdG9wLlwiXHJcbiAgICBhd2FpdCBpZS5hc3luYy5hbnkoZXZlbnRJdGVyLCBhc3luYyBlID0+IHtcclxuICAgICAgICBpZiAoZS50eXBlID09ICdtb3VzZWRvd24nKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmJ1dHRvbiA9PSAyKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgY29kZS5pbm5lclRleHQgPSBgU3RhcnQgZHJhZ2dpbmcgYXQgKCR7ZS54fSwgJHtlLnl9KVxcbmBcclxuICAgICAgICAgICAgYXdhaXQgaWUuYXN5bmMuZXZlcnkoZXZlbnRJdGVyLCBkZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb2RlLmlubmVyVGV4dCA9IGBEcmFnZ2VkIHRvICgke2RlLnh9LCAke2RlLnl9KVxcbmBcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZS50eXBlID09ICdtb3VzZW1vdmUnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICBjb2RlLmlubmVyVGV4dCA9IGBNb3ZlZCB0byAoJHtlLnh9LCAke2UueX0pXFxuYFxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfSlcclxuICAgIGNvZGUuaW5uZXJUZXh0ID0gXCJEb25lIVwiXHJcbn0iXSwic291cmNlUm9vdCI6IiJ9