'use strict'

// Semigroup: type with a concat method, that is associative

// Associativity
// const res = ('a'.concat('b')).concat('c')
// const res = [1,2].concat(([3,4]).concat([5,6]))

// Addition is a semigroup
// (1 + 1) + 1 == 1 + (1 + 1)

const Sum = x =>
({
    x,
    // Destructuring the Sum type
    concat: ({x: y}) => Sum(x + y),
    inspect: () => `Sum(${x})`,
})

// const res = Sum(1).concat(Sum(2))

const All = x =>
({
    x,
    // Destructuring the Sum type
    concat: ({x: y}) => All(x && y),
    inspect: () => `All(${x})`,
})

true && false // false
true && true // true

// const res = All(true).concat(All(false)) // All(false)

const First = x =>
({
    x,
    // Destructuring the Sum type
    concat: _ => First(x),
    inspect: () => `First(${x})`,
})

const res = First("blah").concat(First("ice cream"))

console.log(res)