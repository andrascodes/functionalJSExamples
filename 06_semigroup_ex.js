'use strict'
const { Map } = require("immutable-ext")

// Semigroup: type with a concat method, that is associative
const Sum = x =>
({
    x,
    // Destructuring the Sum type
    concat: ({x: y}) => Sum(x + y),
    inspect: () => `Sum(${x})`,
})

const All = x =>
({
    x,
    // Destructuring the Sum type
    concat: ({x: y}) => All(x && y),
    inspect: () => `All(${x})`,
})

// const res = All(true).concat(All(false)) // All(false)

const First = x =>
({
    x,
    // Destructuring the Sum type
    concat: _ => First(x),
    inspect: () => `First(${x})`,
})

// Game, Nico made two accounts, he want to merge them (combine them)
// whenever we are thinking of combining => Semigroups
// if I can concat all pieces of my data structure then therefore my two data structures are concatenable
const acct1 = Map({
    name: First('Nico'),
    isPaid: All(true),
    points: Sum(10),
    friends: ['Franklin']
})

const acct2 = Map({
    name: First('Nico'),
    isPaid: All(false),
    points: Sum(2),
    friends: ['Gatsby']
})

const res = acct1.concat(acct2)

console.log(res.toJS())