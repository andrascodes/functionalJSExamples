"use strict"

const { Map, List } = require('immutable-ext');

// Monoid
const Sum = x =>
({
    x,
    // Destructuring the Sum type
    concat: ({x: y}) => Sum(x + y),
    inspect: () => `Sum(${x})`,
})

Sum.empty = () => Sum(0)

// const res = List.of(Sum(1), Sum(2), Sum(3))
//     .fold(Sum.empty())
    // .reduce((acc, x) => acc.concat(x), Sum.empty())

// Folding: removal from a type
// Box(3).fold(x => x) // 3
// Right(3).fold(e => e, x => x) // 3
// List: remove the collection from the list, but only take 1 thing out, Summarize the list
// Relying on the Monoid to be inside the collection
// Collection fold: relies on a Monoid

const res = List.of(1,2,3)
    .foldMap(Sum, Sum.empty())
    // .map(x => Sum(x))
    // .fold(Sum.empty())

console.log(res)