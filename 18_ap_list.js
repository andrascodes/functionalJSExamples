const {List} = require('immutable-ext')

// Run t-shirt with large, medium, small
// then sweater with large, medium, small => nested loops pattern
const merch = () =>
    List.of(x => y => z =>`${x}-${y}-${z}`)
    .ap(List(['t-shirt', 'sweater']))
    .ap(List(['large', 'medium', 'small']))
    .ap(List(['black', 'white']))

// List comprehension pattern

const res = merch()
console.log(res)