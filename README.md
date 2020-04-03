# Functional Combinators for Iterables

This library defines canonical list combinators such as `map`, `filter`, and 
`reduce` for objects implementing Iterable interface. The same set of functions
are available for regular and asynchronous iterators. These are being added to
the JS base libraries, but in the meantime they have to be included via npm
package.

Another functionality provided by the library is the 
[EventIterator](src/events.html) class which transform DOM events to 
AsyncIterable. It allows you to process events fired from DOM using a 
`for await` loop.

The library is written with Typescript. So type information is included.

Icon made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>