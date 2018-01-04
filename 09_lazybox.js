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

// takes a function
const LazyBox = g =>
    ({
        fold: f => f(g()),
        map: f => LazyBox(() => f(g())),
    })

// Church encoding: function that eventually returns a value
const result = LazyBox(() => ' 64 ')
    .map(s => s.trim())
    .map(r => new Number(r))
    .map(i => i + 1)
    .map(i => String.fromCharCode(i))
    .fold(c => c.toLowerCase())

// everything will run only when fold is at the end, like pulling the trigger
// purity by virtue of lazyness, nothing happens so no impure side effects
// a variety of types define map like this, where they have a function inside a not a concrete value
// Promises, Observables

console.log(result)