'use strict'

// const add = (x, y) => x + y

// Currying: Preload a function with an argument
// Preload add with the number 1
// const inc = y => add(1, y)

const add = x => (y => x + y)
const inc = add(1)
// const res = inc(2)

const modulo = dvr => (dvd => (dvd % dvr))
const isOdd = modulo(2)

// Xs, A list of Xs, multiple x elements
const map = f => xs => xs.map(f)
const filter = pred => (xs => xs.filter(pred))
const getAllOdds = filter(isOdd)

// The Data argument should come last, so you can keep building up the other functions
const replace = regex => repl => str =>
    str.replace(regex, repl)

const censor = replace(/[aeiou]/ig)('*')
const censorAll = map(censor)

// const res = censorAll(['hello', 'world', 'how', 'are', 'you'])
const res = ['hello', 'world', 'how', 'are', 'you'].map(censor)

console.log(res)

// Functional programming, Declarative programming
// Describing what to do instead of telling the computer how to do it
// Functions are the building blocks, that is where we define how to do something
// We are naming the functions like an action, so like doSomething
// Therefore when we call the function we are telling the computer what to do, not how to do it