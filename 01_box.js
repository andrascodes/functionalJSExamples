'use strict';

// Box: takes an x value, returns an object with a map function.
const Box = x =>
    ({
        // We'll take some function f, and return f(x) in a Box.
        // Apply the f function to the value of Box, then return it in a new Box.
        map: f => Box(f(x)),
        fold: f => f(x),
        inspect: () => `Box(${x})`,
    })

// Map: is composition within a context, in this case Box is our context
const nextCharForNumberString = str =>
    Box(str)
    .map(s => s.trim())
    .map(r => new Number(r))
    .map(i => i + 1)
    .map(i => String.fromCharCode(i))
    .fold(c => c.toLowerCase())

const result = nextCharForNumberString(' 64 ')

console.log(result)