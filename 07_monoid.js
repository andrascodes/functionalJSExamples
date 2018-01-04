'use strict'

// 1 + 0 // 1
// 2 + 0 // 2
// x + 0 // x
// 0 is a monoid, a special element

// Monoid: a semigroup with a special element that acts like a neutral identity
// Monoid: if a Semigroup has an empty or zero element, property
// Semigroup: type with a concat method, that is associative
const Sum = x =>
({
    x,
    // Destructuring the Sum type
    concat: ({x: y}) => Sum(x + y),
    inspect: () => `Sum(${x})`,
})

Sum.empty = () => Sum(0)

// const res = Sum.empty().concat(Sum(1)).concat(Sum(2))

const All = x =>
({
    x,
    // Destructuring the Sum type
    concat: ({x: y}) => All(x && y),
    inspect: () => `All(${x})`,
})

All.empty = () => All(true)

// true && false // false
// true && true //true
// false && true // false
// last two keeps the first element

// const res = All.empty().concat(All(true)).concat(All(false))

const First = x =>
({
    x,
    // Destructuring the Sum type
    concat: _ => First(x),
    inspect: () => `First(${x})`,
})

// const res = First('hello').concat(?) // can be anything
// const res = First(?).concat(First('hello')) // this doesn't work
// First for now remains a Semigroup, can't promote it to a Monoid

const sum = xs =>
    xs.reduce((acc, x) => acc + x, 0)

const all = xs =>
    xs.reduce((acc, x) => acc && x, true)

const first = xs =>
    xs.reduce((acc, x) => acc)

// const res = first([1,2,3]) // 1
const res = first([]) // crashes, we don't have any value to return

// Semigroup doesn't have an element to return, it's not a safe operation
// Reduce's starting value should be the given operation's neutral value, identity
// with Monoid we always have something to return, even with none, it's a safe operation

console.log(res)